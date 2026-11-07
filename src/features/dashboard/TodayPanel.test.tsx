import { render, screen, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import type { DailySession } from '@/features/practice/dailySession'
import { getLessonsForLevel } from '@/lib/curriculum'
import { structuralViolations } from '@/test/axe'
import { useSettingsStore } from '@/store/settingsStore'
import { useStatsStore } from '@/store/statsStore'

import { TodayPanel } from './TodayPanel'

// The plan is built from the learner's whole progress; these tests are about how the panel presents a plan, so each
// one hands it the plan it needs. How a plan is built is covered by dailySession.test.ts.
let plan: DailySession = { exercises: [], due: 0, weak: 0, fresh: 0 }
vi.mock('@/features/practice/useDailySessionPlan', () => ({ useDailySessionPlan: () => plan }))

const lesson = getLessonsForLevel('A1')[0]
const exercises = lesson.exercises.slice(0, 4)

function renderPanel(props: Partial<React.ComponentProps<typeof TodayPanel>> = {}) {
  return render(
    <MemoryRouter>
      <TodayPanel level="A1" hasStarted continueLesson={lesson} dueCount={0} {...props} />
    </MemoryRouter>,
  )
}

describe('TodayPanel', () => {
  beforeEach(() => {
    plan = { exercises: [], due: 0, weak: 0, fresh: 0 }
    useStatsStore.getState().resetStats()
  })

  it('leads with the session when it holds words to keep, and says what it is made of', () => {
    plan = { exercises, due: 2, weak: 1, fresh: 1 }
    renderPanel({ dueCount: 31 })

    const start = screen.getByRole('link', { name: 'ابدأ جلسة اليوم' })
    expect(start).toHaveAttribute('href', '/practice?session=daily')
    const parts = within(screen.getByRole('list', { name: 'مكوّنات الجلسة' })).getAllByRole('listitem')
    expect(parts.map((part) => part.textContent)).toEqual(['2 للمراجعة', '1 من نقاط ضعفك', '1 جديدة'])
    // The next lesson is the dashboard's next block, not a second call to action here.
    expect(screen.queryByRole('link', { name: /تابع التعلّم الآن/ })).not.toBeInTheDocument()
  })

  it('leads with the lesson for a first-time learner, even when questions exist', () => {
    plan = { exercises, due: 0, weak: 0, fresh: 4 }
    renderPanel({ hasStarted: false })

    expect(screen.getByRole('link', { name: 'ابدأ أول درس' })).toHaveAttribute('href', `/lessons/a1/${lesson.slug}`)
    expect(screen.queryByRole('link', { name: 'ابدأ جلسة اليوم' })).not.toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'اختبر مستواك' })).toHaveAttribute('href', '/placement-test')
  })

  it('leads with the lesson when only new questions are left, and keeps the session one step away', () => {
    plan = { exercises, due: 0, weak: 0, fresh: 4 }
    renderPanel()

    expect(screen.getByRole('link', { name: 'تابع التعلّم الآن' })).toHaveAttribute('href', `/lessons/a1/${lesson.slug}`)
    expect(screen.getByRole('link', { name: /جلسة اليوم/ })).toHaveAttribute('href', '/practice?session=daily')
    expect(screen.queryByRole('link', { name: 'اختبر مستواك' })).not.toBeInTheDocument()
  })

  it('offers the flashcards only when words are due', () => {
    const { unmount } = renderPanel({ dueCount: 0 })
    expect(screen.queryByRole('link', { name: /مراجعة بالبطاقات/ })).not.toBeInTheDocument()
    unmount()

    renderPanel({ dueCount: 31 })
    expect(screen.getByRole('link', { name: /مراجعة بالبطاقات/ })).toHaveAttribute('href', '/review')
  })

  it('has no action when there is neither a session nor a lesson, and says what the level is for', () => {
    renderPanel({ continueLesson: undefined })

    expect(screen.queryByRole('link', { name: /ابدأ|تابع/ })).not.toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
  })

  it("shows today's goal as a named progress bar, and says when it is reached", () => {
    useSettingsStore.setState((state) => ({ settings: { ...state.settings, dailyGoal: 10 } }))
    renderPanel()

    const bar = screen.getByRole('progressbar', { name: 'الهدف اليومي' })
    expect(bar).toHaveAttribute('aria-valuemax', '10')
    expect(bar).toHaveAttribute('aria-valuenow', '0')
    expect(screen.getByText('أجبت عن 0 من 10 سؤالاً اليوم')).toBeInTheDocument()
  })

  it('has no structural accessibility violations', async () => {
    plan = { exercises, due: 2, weak: 1, fresh: 1 }
    const { container } = renderPanel({ hasStarted: false, dueCount: 3 })
    expect(await structuralViolations(container)).toEqual([])
  })
})
