import { act, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { structuralViolations } from '@/test/axe'
import { useThemeStore } from '@/store/themeStore'

import { MoreSheet } from './MoreSheet'
import { MOBILE_PRIMARY_IDS, NAV_ITEMS } from './nav-items'

function renderSheet(open = true, onClose = () => undefined) {
  return render(
    <MemoryRouter initialEntries={['/dashboard']}>
      <MoreSheet open={open} onClose={onClose} />
    </MemoryRouter>,
  )
}

const labelOf = (id: string) => NAV_ITEMS.find((item) => item.id === id)?.labelAr

afterEach(() => act(() => useThemeStore.getState().setPreference('system')))

describe('MoreSheet', () => {
  it('renders nothing while closed', () => {
    renderSheet(false)
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('lists exactly the destinations the bottom bar has no room for', () => {
    renderSheet()
    const dialog = screen.getByRole('dialog', { name: 'القائمة' })
    const inSheet = within(within(dialog).getByRole('navigation', { name: 'التنقل الرئيسي' }))
      .getAllByRole('link')
      .map((link) => link.textContent?.replace(/\d+$/, '').trim())

    const expected = NAV_ITEMS.filter((item) => !MOBILE_PRIMARY_IDS.includes(item.id)).map((item) => item.labelAr)
    expect(inSheet).toEqual(expected)
    for (const id of MOBILE_PRIMARY_IDS) expect(inSheet).not.toContain(labelOf(id))
  })

  it('leaves no destination unreachable on a phone: the bar and the sheet together cover every item', () => {
    const inBar = NAV_ITEMS.filter((item) => MOBILE_PRIMARY_IDS.includes(item.id))
    const inSheet = NAV_ITEMS.filter((item) => !MOBILE_PRIMARY_IDS.includes(item.id))
    expect(inBar).toHaveLength(MOBILE_PRIMARY_IDS.length)
    expect(inBar.length + inSheet.length).toBe(NAV_ITEMS.length)
  })

  it('closes with Escape, the close button, the backdrop, and after choosing a destination', async () => {
    const user = userEvent.setup()
    const onClose = vi.fn()
    renderSheet(true, onClose)

    await user.keyboard('{Escape}')
    expect(onClose).toHaveBeenCalledTimes(1)

    await user.click(screen.getByRole('button', { name: 'إغلاق' }))
    expect(onClose).toHaveBeenCalledTimes(2)

    await user.click(screen.getByRole('button', { name: 'إغلاق القائمة' }))
    expect(onClose).toHaveBeenCalledTimes(3)

    await user.click(screen.getByRole('link', { name: /الإعدادات/ }))
    expect(onClose).toHaveBeenCalledTimes(4)
  })

  it('moves focus into the sheet when it opens', () => {
    renderSheet()
    expect(screen.getByRole('dialog')).toContainElement(document.activeElement as HTMLElement)
  })

  it('offers the three theme choices, shows the current one, and applies a tap at once', async () => {
    const user = userEvent.setup()
    renderSheet()
    const group = screen.getByRole('group', { name: 'المظهر' })
    const [light, dark, system] = ['فاتح', 'داكن', 'تلقائي'].map((name) => within(group).getByRole('button', { name }))

    expect(system).toHaveAttribute('aria-pressed', 'true')
    await user.click(dark)
    expect(useThemeStore.getState().preference).toBe('dark')
    expect(dark).toHaveAttribute('aria-pressed', 'true')
    expect(light).toHaveAttribute('aria-pressed', 'false')
    expect(system).toHaveAttribute('aria-pressed', 'false')
  })

  it('has no structural accessibility violations', async () => {
    renderSheet()
    expect(await structuralViolations(screen.getByRole('dialog'))).toEqual([])
  })
})
