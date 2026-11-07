import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { useGrammarProgressStore } from '@/store/grammarProgressStore'
import { useProgressStore } from '@/store/progressStore'

import { PlanSidelist } from './PlanSidelist'

function renderList(props: Parameters<typeof PlanSidelist>[0] = {}) {
  return render(
    <MemoryRouter>
      <PlanSidelist {...props} />
    </MemoryRouter>,
  )
}

describe('PlanSidelist', () => {
  beforeEach(() => {
    useProgressStore.getState().resetProgress()
    useGrammarProgressStore.setState({ rules: {} })
  })

  it('marks the step being read and opens its chapter', () => {
    renderList({ activeKey: 'rule:12' })

    const current = screen.getByRole('link', { current: 'step' })
    expect(current).toHaveAttribute('href', expect.stringMatching(/^\/grammar\/a1\//))
    // Its chapter is open, and no other chapter is.
    expect(screen.getAllByRole('button', { expanded: true })).toHaveLength(1)
  })

  it('opens the chapter to continue with when no step is being read', () => {
    renderList()

    const open = screen.getAllByRole('button', { expanded: true })
    expect(open).toHaveLength(1)
    expect(open[0]).toHaveTextContent('البداية')
  })

  it('folds a chapter again, and opens or folds every chapter at once', async () => {
    const user = userEvent.setup()
    renderList()

    await user.click(screen.getByRole('button', { name: /البداية/ }))
    expect(screen.queryAllByRole('button', { expanded: true })).toHaveLength(0)

    await user.click(screen.getByRole('button', { name: 'فتح الكل' }))
    expect(screen.getAllByRole('button', { expanded: true })).toHaveLength(19)
    await user.click(screen.getByRole('button', { name: 'طيّ الكل' }))
    expect(screen.queryAllByRole('button', { expanded: true })).toHaveLength(0)
  })

  it('counts a grammar rule as done once its quiz is passed', () => {
    useGrammarProgressStore.setState({ rules: { '1': { number: 1, completed: true, bestAccuracy: 1, attempts: 1, lastVisitedAt: Date.now() } } })
    renderList({ activeKey: 'lesson:a1-m01-l05' })

    const list = screen.getByRole('navigation', { name: 'خطة الدراسة من A1 إلى A2' })
    // Grammar-Fundament: Personalpronomen lesson, then its rule.
    expect(within(list).getAllByRole('link').some((link) => link.getAttribute('href')?.startsWith('/grammar/a1/') && link.textContent?.includes('مكتمل'))).toBe(true)
  })

  it('calls onNavigate when a link is followed, so a drawer can close', async () => {
    const user = userEvent.setup()
    const onNavigate = vi.fn()
    renderList({ onNavigate })

    await user.click(screen.getByRole('link', { name: /Begrüßungen/ }))
    expect(onNavigate).toHaveBeenCalledTimes(1)
  })
})
