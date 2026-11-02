import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { getWritingTask } from '@/data/writing'
import { useProgressStore } from '@/store/progressStore'
import { useWritingStore } from '@/store/writingStore'

import WritingPage from './WritingPage'
import WritingTaskPage from './WritingTaskPage'

vi.mock('@/services/speech', () => ({
  GERMAN_LOCALE: 'de-DE',
  speechService: { isSupported: () => true, speak: vi.fn(), stop: vi.fn(), getStatus: () => 'idle' },
}))

const task = getWritingTask('a1-write-01-einladung')!

function renderAt(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/practice/writing" element={<WritingPage />} />
        <Route path="/practice/writing/:taskId" element={<WritingTaskPage />} />
      </Routes>
    </MemoryRouter>,
  )
}

describe('writing pages', () => {
  beforeEach(() => {
    window.localStorage.clear()
    useWritingStore.setState({ drafts: {} })
    useProgressStore.getState().resetProgress()
  })

  it('lists the tasks of the level, each linking to its own page', () => {
    renderAt('/practice/writing')
    expect(screen.getByRole('heading', { level: 1, name: 'الكتابة الموجّهة' })).toBeInTheDocument()
    const link = screen.getByRole('link', { name: new RegExp(task.titleAr) })
    expect(link).toHaveAttribute('href', `/practice/writing/${task.id}`)
  })

  it('shows a way back for an unknown task instead of a blank page', () => {
    renderAt('/practice/writing/does-not-exist')
    expect(screen.getByText('لم نجد هذه المهمة')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'كل مهام الكتابة' })).toHaveAttribute('href', '/practice/writing')
  })

  it('counts the words, checks the text and shows what was found and what was not', async () => {
    const user = userEvent.setup()
    renderAt(`/practice/writing/${task.id}`)

    const field = screen.getByRole('textbox', { name: 'نصّك بالألمانية' })
    expect(screen.getByRole('button', { name: 'افحص نصّي' })).toBeDisabled()

    await user.type(field, 'Hallo Anna, am Samstag um 18 Uhr ist die Party.')
    expect(screen.getByText(/^10 كلمة/)).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'افحص نصّي' }))
    const report = screen.getByRole('region', { name: 'نتيجة الفحص' })
    expect(report).toHaveTextContent('متى الحفلة؟')
    // "when" is found; "where" and "bring" are not, and the learner can confirm them by hand.
    expect(report.textContent?.match(/وجدتُ ما يدلّ عليها/g)).toHaveLength(1)
    const confirmations = screen.getAllByRole('button', { name: 'عبّرتُ عنها بكلمات أخرى' })
    expect(confirmations).toHaveLength(2)

    await user.click(confirmations[0])
    expect(screen.getByRole('button', { name: 'أكّدتَ أنها موجودة' })).toHaveAttribute('aria-pressed', 'true')
    expect(useWritingStore.getState().drafts[task.id]?.confirmedPointIds).toHaveLength(1)
  })

  it('reveals the model answer and hides it again', async () => {
    const user = userEvent.setup()
    renderAt(`/practice/writing/${task.id}`)

    expect(screen.queryByRole('heading', { name: 'نموذج جواب' })).not.toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'أظهر النموذج' }))
    expect(screen.getByRole('heading', { name: 'نموذج جواب' })).toBeInTheDocument()
    expect(screen.getByText(/Ich lade dich zu meiner Party ein\./, { selector: 'p' })).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'أخفِ النموذج' }))
    expect(screen.queryByRole('heading', { name: 'نموذج جواب' })).not.toBeInTheDocument()
  })

  it('keeps the text when the learner leaves the page and comes back', async () => {
    const user = userEvent.setup()
    const first = renderAt(`/practice/writing/${task.id}`)
    await user.type(screen.getByRole('textbox', { name: 'نصّك بالألمانية' }), 'Hallo Anna')
    first.unmount()

    renderAt(`/practice/writing/${task.id}`)
    expect(screen.getByRole('textbox', { name: 'نصّك بالألمانية' })).toHaveValue('Hallo Anna')
  })

  it('marks a task as done and shows it on the list', async () => {
    const user = userEvent.setup()
    const first = renderAt(`/practice/writing/${task.id}`)
    await user.type(screen.getByRole('textbox', { name: 'نصّك بالألمانية' }), 'Hallo Anna')
    await user.click(screen.getByRole('button', { name: 'علّمها منجَزة' }))
    first.unmount()

    renderAt('/practice/writing')
    const card = screen.getByRole('link', { name: new RegExp(task.titleAr) })
    expect(card).toHaveTextContent('منجَزة')
  })
})
