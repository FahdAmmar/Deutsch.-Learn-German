import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes, useLocation } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'

import SearchDialog from './SearchDialog'

function Location() {
  const location = useLocation()
  return <p data-testid="location">{location.pathname + location.search}</p>
}

function renderDialog(onClose = vi.fn()) {
  render(
    <MemoryRouter initialEntries={['/dashboard']}>
      <Routes>
        <Route path="*" element={<Location />} />
      </Routes>
      <SearchDialog onClose={onClose} />
    </MemoryRouter>,
  )
  return onClose
}

describe('SearchDialog', () => {
  it('focuses the search field when it opens', () => {
    renderDialog()
    expect(screen.getByRole('combobox')).toHaveFocus()
  })

  it('lists matches as the learner types and opens the highlighted one with Enter', async () => {
    const user = userEvent.setup()
    const onClose = renderDialog()

    await user.type(screen.getByRole('combobox'), 'der tisch')

    const options = screen.getAllByRole('option')
    expect(options[0]).toHaveTextContent('der Tisch')
    expect(options[0]).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByRole('combobox')).toHaveAttribute('aria-activedescendant', options[0].id)

    await user.keyboard('{Enter}')

    expect(onClose).toHaveBeenCalled()
    expect(screen.getByTestId('location')).toHaveTextContent(/^\/vocabulary\?level=a1&q=Tisch/)
  })

  it('moves the highlight with the arrow keys', async () => {
    const user = userEvent.setup()
    renderDialog()

    await user.type(screen.getByRole('combobox'), 'a')
    await user.keyboard('{ArrowDown}')

    const options = screen.getAllByRole('option')
    expect(options[1]).toHaveAttribute('aria-selected', 'true')
    await user.keyboard('{ArrowUp}')
    expect(options[0]).toHaveAttribute('aria-selected', 'true')
  })

  it('says so when nothing matches', async () => {
    const user = userEvent.setup()
    renderDialog()

    await user.type(screen.getByRole('combobox'), 'qqqqzzzz')

    expect(screen.getByRole('status')).toHaveTextContent('لا نتائج')
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
  })

  it('closes with Escape', async () => {
    const user = userEvent.setup()
    const onClose = renderDialog()

    await user.keyboard('{Escape}')

    expect(onClose).toHaveBeenCalled()
  })
})
