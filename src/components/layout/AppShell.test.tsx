import { act, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { describe, expect, it } from 'vitest'

import { AppShell } from './AppShell'

function renderShell() {
  render(
    <MemoryRouter initialEntries={['/dashboard']}>
      <Routes>
        <Route element={<AppShell />}>
          <Route path="/dashboard" element={<input aria-label="حقل نصي" />} />
        </Route>
      </Routes>
    </MemoryRouter>,
  )
}

describe('AppShell search', () => {
  it('opens search from the header button and closes it with Escape', async () => {
    const user = userEvent.setup()
    renderShell()

    await user.click(screen.getByRole('button', { name: 'بحث' }))
    expect(await screen.findByRole('dialog', { name: 'بحث' })).toBeInTheDocument()

    await user.keyboard('{Escape}')
    expect(screen.queryByRole('dialog', { name: 'بحث' })).not.toBeInTheDocument()
  })

  it('opens with Ctrl+K', async () => {
    const user = userEvent.setup()
    renderShell()

    await user.keyboard('{Control>}k{/Control}')
    expect(await screen.findByRole('dialog', { name: 'بحث' })).toBeInTheDocument()
  })

  it('opens with "/" but not while typing in a field', async () => {
    const user = userEvent.setup()
    renderShell()

    await user.click(screen.getByRole('textbox', { name: 'حقل نصي' }))
    await user.keyboard('/')
    expect(screen.queryByRole('dialog', { name: 'بحث' })).not.toBeInTheDocument()

    await user.click(document.body)
    await user.keyboard('/')
    expect(await screen.findByRole('dialog', { name: 'بحث' })).toBeInTheDocument()
  })
})

describe('AppShell offline notice', () => {
  function setOnline(value: boolean) {
    Object.defineProperty(window.navigator, 'onLine', { configurable: true, value })
    window.dispatchEvent(new Event(value ? 'online' : 'offline'))
  }

  it('appears when the connection drops and goes away when it returns', async () => {
    renderShell()
    expect(screen.queryByText(/أنت غير متصل بالإنترنت/)).not.toBeInTheDocument()

    await act(async () => setOnline(false))
    expect(screen.getByText(/أنت غير متصل بالإنترنت/)).toBeInTheDocument()

    await act(async () => setOnline(true))
    expect(screen.queryByText(/أنت غير متصل بالإنترنت/)).not.toBeInTheDocument()
  })
})
