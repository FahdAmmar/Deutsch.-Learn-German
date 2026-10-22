import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { beforeEach, describe, expect, it } from 'vitest'

import { useSpellingStore } from '@/store/spellingStore'

import { SpellingWeakSpots } from './SpellingWeakSpots'

const renderPanel = () =>
  render(
    <MemoryRouter>
      <SpellingWeakSpots />
    </MemoryRouter>,
  )

describe('SpellingWeakSpots', () => {
  beforeEach(() => {
    window.localStorage.clear()
    useSpellingStore.getState().resetSpelling()
  })

  it('shows nothing until a dictation has left mistakes', () => {
    const { container } = renderPanel()
    expect(container).toBeEmptyDOMElement()
  })

  it('names the pattern that costs most, with its tip, and offers the hard words', () => {
    useSpellingStore.getState().recordSlips([
      { kind: 'umlaut', word: 'Mädchen', expected: 'ä', typed: 'a' },
      { kind: 'umlaut', word: 'Tür', expected: 'ü', typed: 'u' },
      { kind: 'capital', word: 'Tisch', expected: 'T', typed: 't' },
    ])
    renderPanel()

    expect(screen.getByRole('heading', { name: 'نقاط ضعفك الإملائية' })).toBeInTheDocument()
    expect(screen.getByText('النقاط فوق الحروف (ä ö ü)')).toBeInTheDocument()
    expect(screen.getByText(/schon ≠ schön/)).toBeInTheDocument()
    expect(screen.getByText('Mädchen')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'تدرّب على كلماتي الصعبة' })).toHaveAttribute('href', '/my-text/weak-words')
  })

  it('clears the record on request, and the panel goes away', async () => {
    useSpellingStore.getState().recordSlips([{ kind: 'umlaut', word: 'Tür', expected: 'ü', typed: 'u' }])
    const user = userEvent.setup()
    const { container } = renderPanel()

    await user.click(screen.getByRole('button', { name: 'مسح السجل' }))
    expect(container).toBeEmptyDOMElement()
    expect(useSpellingStore.getState().words).toEqual({})
  })
})
