import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { beforeEach, describe, expect, it } from 'vitest'

import LevelDetailPage from '@/pages/LevelDetailPage'
import LevelsPage from '@/pages/LevelsPage'
import { useProgressStore } from '@/store/progressStore'

function renderWithRoutes(initialPath: string) {
  return render(
    <MemoryRouter initialEntries={[initialPath]}>
      <Routes>
        <Route path="/levels" element={<LevelsPage />} />
        <Route path="/levels/:level" element={<LevelDetailPage />} />
      </Routes>
    </MemoryRouter>,
  )
}

describe('level navigation', () => {
  beforeEach(() => {
    useProgressStore.getState().resetProgress()
  })

  it('lists all four CEFR levels on the overview page', () => {
    renderWithRoutes('/levels')

    expect(screen.getByText('A1')).toBeInTheDocument()
    expect(screen.getByText('A2')).toBeInTheDocument()
    expect(screen.getByText('B1')).toBeInTheDocument()
    expect(screen.getByText('B2')).toBeInTheDocument()
  })

  it('marks levels without content yet as coming soon', () => {
    renderWithRoutes('/levels')
    // A2/B1/B2 have no modules yet in this codebase.
    expect(screen.getAllByText('قريباً').length).toBeGreaterThan(0)
  })

  it('renders the module and lesson list for A1', () => {
    renderWithRoutes('/levels/a1')

    expect(screen.getByText(/Grundlagen/)).toBeInTheDocument()
    expect(screen.getByText('Begrüßungen')).toBeInTheDocument()
  })

  it('redirects to /levels when given an invalid level slug', () => {
    renderWithRoutes('/levels/z9')

    expect(screen.getByText('A1')).toBeInTheDocument()
    expect(screen.queryByText(/Grundlagen/)).not.toBeInTheDocument()
  })

  it('shows a coming-soon message for a valid level with no modules', () => {
    renderWithRoutes('/levels/b1')
    expect(screen.getByText(/قيد الإعداد/)).toBeInTheDocument()
  })

  it('renders the module and lesson list for A2 now that it has content', () => {
    renderWithRoutes('/levels/a2')
    expect(screen.getByText(/Vergleiche/)).toBeInTheDocument()
    expect(screen.getByText('Komparativ und Superlativ')).toBeInTheDocument()
  })

  it('defaults to the Lessons tab and switches to Grammar and Conversation on demand', async () => {
    const user = userEvent.setup()
    renderWithRoutes('/levels/a1')

    // Lessons tab is the default view.
    expect(screen.getByText('Begrüßungen')).toBeInTheDocument()

    await user.click(screen.getByRole('tab', { name: 'القواعد' }))
    expect(screen.queryByText('Begrüßungen')).not.toBeInTheDocument()
    expect(screen.getAllByText(/حروف الجر ذات الاتجاهين|Dativpronomen|sein — Präsens/).length).toBeGreaterThan(0)

    await user.click(screen.getByRole('tab', { name: 'محادثة' }))
    expect(screen.getByText('ترتيب غرفة المعيشة')).toBeInTheDocument()
  })
})
