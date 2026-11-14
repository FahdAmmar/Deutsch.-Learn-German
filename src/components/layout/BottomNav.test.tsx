import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'

import { structuralViolations } from '@/test/axe'

import { BottomNav } from './BottomNav'

function renderBar(path: string, onOpenMore = () => undefined) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <BottomNav onOpenMore={onOpenMore} />
    </MemoryRouter>,
  )
}

describe('BottomNav', () => {
  it('holds the four everyday destinations in order, then a "More" button', () => {
    renderBar('/dashboard')
    const bar = screen.getByRole('navigation', { name: 'التنقل السريع' })

    expect(within(bar).getAllByRole('link').map((link) => link.textContent?.trim())).toEqual(['اليوم', 'المستويات', 'القواعد', 'التمارين'])
    expect(within(bar).getByRole('button', { name: /المزيد/ })).toBeInTheDocument()
  })

  it('marks the current page, and only it', () => {
    renderBar('/grammar')
    const current = screen.getAllByRole('link').filter((link) => link.getAttribute('aria-current') === 'page')
    expect(current).toHaveLength(1)
    expect(current[0]).toHaveTextContent('القواعد')
  })

  it('keeps "Levels" marked while a lesson is open, as the sidebar does', () => {
    renderBar('/lessons/a1/tagesablauf')
    expect(screen.getByRole('link', { current: 'page' })).toHaveTextContent('المستويات')
  })

  it('opens the "More" sheet', async () => {
    const onOpenMore = vi.fn()
    renderBar('/dashboard', onOpenMore)
    await userEvent.setup().click(screen.getByRole('button', { name: /المزيد/ }))
    expect(onOpenMore).toHaveBeenCalledOnce()
  })

  it('has no structural accessibility violations', async () => {
    const { container } = renderBar('/dashboard')
    expect(await structuralViolations(container)).toEqual([])
  })
})
