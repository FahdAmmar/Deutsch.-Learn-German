import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import type { TileGridBlock } from '@/types'

import { TileGridView } from './TileGridView'

const speak = vi.fn()
vi.mock('@/hooks/useSpeech', () => ({
  useSpeech: () => ({ speak, stop: vi.fn(), isSpeaking: false, isSupported: true, error: null }),
}))

const block: TileGridBlock = {
  kind: 'tileGrid',
  titleAr: 'أيام الأسبوع',
  columns: 3,
  items: [
    { mark: 'Mo', de: 'Montag', ar: 'الاثنين' },
    { mark: '3.', de: 'dritte', ar: 'الثالث', exampleDe: 'am dritten Juli' },
  ],
}

describe('TileGridView', () => {
  beforeEach(() => speak.mockClear())

  it('shows the heading and every tile with its mark, German word and Arabic meaning', () => {
    render(<TileGridView block={block} />)
    expect(screen.getByRole('heading', { name: 'أيام الأسبوع' })).toBeInTheDocument()
    expect(screen.getByText('Mo')).toBeInTheDocument()
    expect(screen.getByText('Montag')).toBeInTheDocument()
    expect(screen.getByText('الاثنين')).toBeInTheDocument()
    expect(screen.getByText('am dritten Juli')).toBeInTheDocument()
  })

  it('speaks the German word in de-DE when a tile is tapped', async () => {
    render(<TileGridView block={block} />)
    await userEvent.click(screen.getByRole('button', { name: /Montag/ }))
    expect(speak).toHaveBeenCalledWith('Montag', 'de-DE')
  })

  it('gives each tile an accessible name that includes the meaning', () => {
    render(<TileGridView block={block} />)
    expect(screen.getByRole('button', { name: 'الاستماع إلى نطق: dritte — الثالث' })).toBeInTheDocument()
  })
})
