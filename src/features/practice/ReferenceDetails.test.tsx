import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import { preparePrint } from '@/lib/printPrep'

import { ReferenceDetails } from './ReferenceDetails'

function renderPanel() {
  return render(
    <main>
      <ReferenceDetails title="العنوان" description="الوصف">
        <p>المحتوى الثقيل</p>
      </ReferenceDetails>
    </main>,
  )
}

describe('ReferenceDetails', () => {
  it('shows its title and description, and holds back its content until it is opened', () => {
    renderPanel()
    expect(screen.getByText('العنوان')).toBeInTheDocument()
    expect(screen.getByText('الوصف')).toBeInTheDocument()
    expect(screen.queryByText('المحتوى الثقيل')).not.toBeInTheDocument()
  })

  it('renders its content when opened, and keeps it when closed again', async () => {
    const user = userEvent.setup()
    renderPanel()
    await user.click(screen.getByText('العنوان'))
    expect(await screen.findByText('المحتوى الثقيل')).toBeInTheDocument()
    await user.click(screen.getByText('العنوان'))
    expect(screen.getByText('المحتوى الثقيل')).toBeInTheDocument()
  })

  it('renders its content at once when the page is printed, before any event of the browser could', () => {
    renderPanel()
    const restore = preparePrint()
    // Nothing awaited: the print is laid out right after `beforeprint` returns.
    expect(screen.getByText('المحتوى الثقيل')).toBeInTheDocument()
    restore()
  })
})
