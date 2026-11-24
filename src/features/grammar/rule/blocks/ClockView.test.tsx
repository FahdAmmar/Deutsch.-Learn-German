import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import type { ClockBlock } from '@/types'

import { ClockView } from './ClockView'

vi.mock('@/hooks/useSpeech', () => ({
  useSpeech: () => ({ speak: vi.fn(), stop: vi.fn(), isSpeaking: false, isSupported: true, error: null }),
}))

const block: ClockBlock = {
  kind: 'clock',
  titleAr: 'اضبط الساعة',
  presets: [
    { hour: 14, minute: 30 },
    { hour: 1, minute: 0 },
  ],
}

describe('ClockView', () => {
  it('starts on the first preset and says it both ways', () => {
    render(<ClockView block={block} />)
    expect(screen.getByRole('img', { name: 'ساعة تُظهر 14:30' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Es ist halb drei\./ })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Es ist vierzehn Uhr dreißig\./ })).toBeInTheDocument()
  })

  it('states in Arabic that "halb drei" is 2:30, not 3:30', () => {
    render(<ClockView block={block} />)
    expect(screen.getByText('الساعة 2 والنصف')).toBeInTheDocument()
  })

  it('says "ein Uhr" for one o\'clock, not "eins Uhr"', async () => {
    render(<ClockView block={block} />)
    await userEvent.click(screen.getByRole('button', { name: '01:00' }))
    // At 1:00 the everyday and the formal way coincide, so both lines read "Es ist ein Uhr."
    expect(screen.getAllByRole('button', { name: /Es ist ein Uhr\./ })).toHaveLength(2)
    expect(screen.queryByRole('button', { name: /eins Uhr/ })).not.toBeInTheDocument()
  })

  it('uses "eins" after Viertel nach once the minutes change', async () => {
    render(<ClockView block={block} />)
    await userEvent.click(screen.getByRole('button', { name: '01:00' }))
    await userEvent.selectOptions(screen.getByLabelText('الدقيقة'), '15')
    expect(screen.getByRole('button', { name: /Es ist Viertel nach eins\./ })).toBeInTheDocument()
  })

  it('marks the active preset as pressed', async () => {
    render(<ClockView block={block} />)
    expect(screen.getByRole('button', { name: '14:30' })).toHaveAttribute('aria-pressed', 'true')
    await userEvent.click(screen.getByRole('button', { name: '01:00' }))
    expect(screen.getByRole('button', { name: '01:00' })).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByRole('button', { name: '14:30' })).toHaveAttribute('aria-pressed', 'false')
  })
})
