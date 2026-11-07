import { render, screen, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'

import { structuralViolations } from '@/test/axe'

import { NavList } from './NavList'

function renderNav(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <NavList />
    </MemoryRouter>,
  )
}

describe('NavList', () => {
  it('sets the learning and practising items under their own headings', () => {
    renderNav('/dashboard')

    const learn = screen.getByRole('group', { name: 'تعلّم' })
    expect(within(learn).getAllByRole('link').map((link) => link.textContent?.replace(/\s*A\d|B\d/, '').trim())).toEqual(['المستويات', 'القواعد', 'المفردات'])

    const practise = screen.getByRole('group', { name: 'تدريب' })
    expect(within(practise).getAllByRole('link').map((link) => link.textContent?.trim())).toEqual(
      expect.arrayContaining(['القراءة', 'التمارين', 'النطق', 'نصوصي']),
    )
  })

  it('marks the current page, and only it', () => {
    renderNav('/grammar')
    const current = screen.getAllByRole('link').filter((link) => link.getAttribute('aria-current') === 'page')
    expect(current).toHaveLength(1)
    expect(current[0]).toHaveTextContent('القواعد')
  })

  it('keeps "Levels" marked while a lesson is open', () => {
    renderNav('/lessons/a1/tagesablauf')
    expect(screen.getByRole('link', { current: 'page' })).toHaveTextContent('المستويات')
  })

  it('has no structural accessibility violations', async () => {
    const { container } = renderNav('/dashboard')
    expect(await structuralViolations(container)).toEqual([])
  })
})
