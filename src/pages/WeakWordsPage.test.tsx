import { act, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import WeakWordsPage from '@/pages/WeakWordsPage'
import { soundService } from '@/services/sound'
import { useSettingsStore } from '@/store/settingsStore'
import { useSpellingStore } from '@/store/spellingStore'

const speech = vi.hoisted(() => ({ spoken: [] as string[] }))

vi.mock('@/services/speech', () => ({
  GERMAN_LOCALE: 'de-DE',
  speechService: {
    isSupported: () => true,
    speak: (text: string) => {
      speech.spoken.push(text)
    },
    stop: vi.fn(),
    getStatus: () => 'idle',
  },
}))

function renderPage() {
  return render(
    <MemoryRouter initialEntries={['/my-text/weak-words']}>
      <Routes>
        <Route path="/my-text/weak-words" element={<WeakWordsPage />} />
        <Route path="/my-text" element={<p>my texts</p>} />
      </Routes>
    </MemoryRouter>,
  )
}

const nextPartDelay = () => act(() => vi.advanceTimersByTime(1000))
const getInput = () => screen.getByRole('textbox', { name: 'اكتب المقطع الذي تسمعه' })

describe('WeakWordsPage', () => {
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true })
    window.localStorage.clear()
    speech.spoken.length = 0
    useSettingsStore.getState().resetToDefaults()
    useSpellingStore.getState().resetSpelling()
    vi.spyOn(soundService, 'play').mockImplementation(() => undefined)
  })

  afterEach(() => {
    vi.restoreAllMocks()
    vi.useRealTimers()
  })

  it('says what to do when there are no hard words yet', () => {
    renderPage()
    expect(screen.getByText('لا توجد كلمات صعبة الآن')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'اكتب نصاً وتدرّب عليه' })).toHaveAttribute('href', '/my-text')
  })

  it('dictates the hard words, most mistakes first, and takes one off each word typed right', async () => {
    useSpellingStore.getState().recordSlips(
      [
        { kind: 'umlaut', word: 'Mädchen', expected: 'ä', typed: 'a' },
        { kind: 'umlaut', word: 'Tür', expected: 'ü', typed: 'u' },
        { kind: 'umlaut', word: 'Tür', expected: 'ü', typed: 'u' },
      ],
      1,
    )
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
    renderPage()

    expect(screen.getByRole('heading', { level: 1, name: 'كلماتي الصعبة' })).toBeInTheDocument()
    expect(screen.getByText('2 كلمة')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /اضغط في أي مكان للبدء/ }))
    expect(speech.spoken).toEqual(['Tür'])

    await user.type(getInput(), 'Tür')
    await nextPartDelay()
    await user.type(getInput(), 'Mädchen')
    // The last part stays in view for a moment, then the run is over and its result is saved.
    await nextPartDelay()

    // Both were typed without a slip: Tür had two marks and keeps one, Mädchen had one and leaves the list.
    const { words } = useSpellingStore.getState()
    expect(words['Tür'].count).toBe(1)
    expect(words['Mädchen']).toBeUndefined()
    // The end screen is still there: the page did not restart with the changed list.
    expect(screen.getByRole('heading', { name: 'أكملت الإملاء' })).toBeInTheDocument()
  })
})
