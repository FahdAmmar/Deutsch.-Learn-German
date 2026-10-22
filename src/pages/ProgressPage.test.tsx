import { render, screen, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { beforeEach, describe, expect, it } from 'vitest'

import ProgressPage from '@/pages/ProgressPage'
import { getModulesForLevel } from '@/lib/curriculum'
import { useProgressStore } from '@/store/progressStore'
import { useSettingsStore } from '@/store/settingsStore'
import { useStatsStore } from '@/store/statsStore'
import { todayKey } from '@/utils/date'

function renderPage() {
  return render(
    <MemoryRouter>
      <ProgressPage />
    </MemoryRouter>,
  )
}

describe('ProgressPage', () => {
  beforeEach(() => {
    useProgressStore.getState().resetProgress()
    useStatsStore.getState().resetStats()
    useSettingsStore.getState().resetToDefaults()
  })

  it('invites the learner to start when there is no data', () => {
    renderPage()
    expect(screen.getByText(/لا نشاط بعد في آخر 20 أسبوعاً/)).toBeInTheDocument()
    expect(screen.getByText(/لا توجد إجابات مسجّلة بعد/)).toBeInTheDocument()
    expect(screen.getByText(/لم تراجع أي كلمة بعد/)).toBeInTheDocument()
  })

  it('shows progress towards the daily goal', () => {
    useSettingsStore.getState().setDailyGoal(10)
    const store = useStatsStore.getState()
    for (let count = 0; count < 4; count += 1) store.recordAnswer({ type: 'matching', correct: true })

    renderPage()

    const goal = screen.getByRole('progressbar', { name: 'الهدف اليومي' })
    expect(goal).toHaveAttribute('aria-valuenow', '4')
    expect(goal).toHaveAttribute('aria-valuemax', '10')
    expect(screen.getByText(/باقٍ 6 سؤالاً/)).toBeInTheDocument()
  })

  it('celebrates a reached goal', () => {
    useSettingsStore.getState().setDailyGoal(5)
    for (let count = 0; count < 5; count += 1) useStatsStore.getState().recordAnswer({ type: 'matching', correct: true })

    renderPage()
    expect(screen.getByText(/حقّقت هدف اليوم/)).toBeInTheDocument()
  })

  it('breaks accuracy down by exercise type and by topic, weakest topic first', () => {
    const [first, second] = getModulesForLevel('A1')
    useStatsStore.getState().replaceStats({
      days: { [todayKey()]: { attempts: 20, correct: 12 } },
      byType: { 'multiple-choice': { attempts: 12, correct: 9 }, 'fill-blank': { attempts: 8, correct: 3 } },
      byModule: { [first.id]: { attempts: 6, correct: 6 }, [second.id]: { attempts: 5, correct: 1 } },
    })

    renderPage()

    const byType = screen.getByRole('list', { name: 'الدقة حسب نوع التمرين' })
    expect(within(byType).getByText('اختيار من متعدد')).toBeInTheDocument()
    expect(within(byType).getByText(/75%/)).toBeInTheDocument()

    const byTopic = within(screen.getByRole('list', { name: 'الدقة حسب الموضوع' })).getAllByRole('listitem')
    expect(byTopic[0]).toHaveTextContent(second.titleAr)
    expect(byTopic[1]).toHaveTextContent(first.titleAr)
    expect(screen.getByRole('link', { name: 'تدرّب على نقاط ضعفك' })).toHaveAttribute('href', '/practice')
  })

  it('shows how many reviewed words sit in each Leitner box', () => {
    useProgressStore.getState().recordVocabularyReview('w1', true)
    useProgressStore.getState().recordVocabularyReview('w2', false)

    renderPage()
    expect(screen.getByRole('img', { name: 'الصندوق 2: 1 كلمة' })).toBeInTheDocument()
    expect(screen.getByRole('img', { name: 'الصندوق 1: 1 كلمة' })).toBeInTheDocument()
  })
})
