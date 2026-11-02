import { act, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { getExamSet } from '@/data/exam'
import { allItems, correctIndexOf, itemOptions } from '@/lib/exam/score'
import { useExamStore } from '@/store/examStore'
import { useProgressStore } from '@/store/progressStore'
import { useStatsStore } from '@/store/statsStore'

import ExamPage from './ExamPage'

const speak = vi.hoisted(() => vi.fn())
vi.mock('@/services/speech', () => ({
  GERMAN_LOCALE: 'de-DE',
  speechService: { isSupported: () => true, speak, stop: vi.fn(), getStatus: () => 'idle' },
}))

const reading = getExamSet('a1-lesen-1')!
const listening = getExamSet('a1-hoeren-1')!

function renderAt(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/practice/exam" element={<ExamPage />} />
        <Route path="/practice/exam/:setId" element={<ExamPage />} />
      </Routes>
    </MemoryRouter>,
  )
}

/** Picks an answer for a question: the radio of that option inside the question's own group. */
async function answer(user: ReturnType<typeof userEvent.setup>, itemId: string, optionIndex: number) {
  const radios = document.querySelectorAll<HTMLInputElement>(`input[type="radio"][name="${itemId}"]`)
  await user.click(radios[optionIndex])
}

describe('exam page', () => {
  beforeEach(() => {
    window.localStorage.clear()
    useExamStore.setState({ results: {} })
    useStatsStore.getState().resetStats()
    useProgressStore.getState().resetProgress()
    speak.mockReset()
  })
  afterEach(() => {
    vi.useRealTimers()
  })

  it('lists the sets of the level with a way to the writing section', () => {
    renderAt('/practice/exam')
    expect(screen.getByRole('heading', { level: 1, name: 'تدريب بنمط الامتحان' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: new RegExp(reading.titleAr) })).toHaveAttribute('href', `/practice/exam/${reading.id}`)
    expect(screen.getByRole('link', { name: /الكتابة \(Schreiben\)/ })).toHaveAttribute('href', '/practice/writing')
  })

  it('shows a way back for an unknown set', () => {
    renderAt('/practice/exam/nope')
    expect(screen.getByText('لم نجد هذه المجموعة')).toBeInTheDocument()
  })

  it('marks a set: right answers, a wrong one and an empty one, with the explanation of each', async () => {
    const user = userEvent.setup()
    renderAt(`/practice/exam/${reading.id}`)
    await user.click(screen.getByRole('button', { name: 'ابدأ' }))

    const items = allItems(reading)
    // First question right, second wrong, the rest left empty.
    await answer(user, items[0].id, correctIndexOf(items[0]))
    await answer(user, items[1].id, (correctIndexOf(items[1]) + 1) % itemOptions(items[1]).length)
    expect(screen.getByText(`أجبتَ عن 2 من ${items.length}`)).toBeInTheDocument()
    expect(screen.getByText(`بقي ${items.length - 2} دون إجابة، وستُحسب خطأً إن سلّمتَ الآن.`)).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'سلّم الإجابات' }))

    const report = screen.getByRole('region', { name: 'نتيجتك' })
    expect(report).toHaveTextContent(`1 من ${items.length}`)
    expect(report).toHaveTextContent(`تركتَ ${items.length - 2} أسئلة دون إجابة`)
    expect(screen.getByText(items[0].explanationAr)).toBeInTheDocument()

    expect(useExamStore.getState().results[reading.id]).toMatchObject({ attempts: 1, best: 1 / items.length })
    // Only answered questions count towards accuracy.
    const attempts = Object.values(useStatsStore.getState().days).reduce((sum, day) => sum + day.attempts, 0)
    expect(attempts).toBe(2)
  })

  it('limits each recording to two plays in exam mode, and not otherwise', async () => {
    const user = userEvent.setup()
    renderAt(`/practice/exam/${listening.id}`)
    await user.click(screen.getByRole('button', { name: 'ابدأ' }))

    const firstTask = screen.getByRole('region', { name: listening.tasks[0].titleAr })
    const play = within(firstTask).getByRole('button', { name: 'شغّل التسجيل' })
    await user.click(play)
    await user.click(play)
    expect(speak).toHaveBeenCalledTimes(2)
    expect(within(firstTask).getByText('التشغيل 2 من 2')).toBeInTheDocument()
    expect(play).toBeDisabled()
  })

  it('does not limit the plays when exam mode is switched off, and shows no clock', async () => {
    const user = userEvent.setup()
    renderAt(`/practice/exam/${listening.id}`)
    await user.click(screen.getByRole('checkbox', { name: /وضع الامتحان/ }))
    await user.click(screen.getByRole('button', { name: 'ابدأ' }))

    expect(screen.queryByRole('timer')).not.toBeInTheDocument()
    const firstTask = screen.getByRole('region', { name: listening.tasks[0].titleAr })
    const play = within(firstTask).getByRole('button', { name: 'شغّل التسجيل' })
    for (let time = 0; time < 3; time += 1) await user.click(play)
    expect(play).toBeEnabled()
    expect(within(firstTask).getByText('شُغّل 3 مرة')).toBeInTheDocument()
  })

  it('hands in by itself when the time is up', async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true })
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
    renderAt(`/practice/exam/${reading.id}`)
    await user.click(screen.getByRole('button', { name: 'ابدأ' }))
    expect(screen.getByRole('timer')).toHaveTextContent(`${reading.suggestedMinutes}:00`)

    await act(async () => {
      vi.advanceTimersByTime(reading.suggestedMinutes * 60 * 1000 + 1000)
    })
    expect(screen.getByRole('region', { name: 'نتيجتك' })).toBeInTheDocument()
    expect(useExamStore.getState().results[reading.id]?.attempts).toBe(1)
  })

  it('lets the learner try the set again from the start', async () => {
    const user = userEvent.setup()
    renderAt(`/practice/exam/${reading.id}`)
    await user.click(screen.getByRole('button', { name: 'ابدأ' }))
    await user.click(screen.getByRole('button', { name: 'سلّم الإجابات' }))
    await user.click(screen.getByRole('button', { name: 'أعد المحاولة' }))
    await user.click(screen.getByRole('button', { name: 'ابدأ' }))
    expect(screen.getByText(`أجبتَ عن 0 من ${allItems(reading).length}`)).toBeInTheDocument()
  })
})
