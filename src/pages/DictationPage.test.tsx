import { act, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import DictationPage from '@/pages/DictationPage'
import { getStory } from '@/lib/stories'
import { soundService } from '@/services/sound'
import { useDictationStore } from '@/store/dictationStore'
import { useSettingsStore } from '@/store/settingsStore'

const speech = vi.hoisted(() => ({
  spoken: [] as Array<{ text: string; pitch?: number }>,
  stop: vi.fn(),
}))

vi.mock('@/services/speech', () => ({
  GERMAN_LOCALE: 'de-DE',
  speechService: {
    isSupported: () => true,
    speak: (text: string, options: { pitch?: number }) => {
      speech.spoken.push({ text, pitch: options.pitch })
    },
    stop: speech.stop,
    getStatus: () => 'idle',
  },
}))

const STORY_ID = 'dialogue-unregelmaessig-informell'
const story = getStory('A1', STORY_ID)!

function renderDictation(path = `/levels/a1/texts/${STORY_ID}/diktat`) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/levels/:level/texts/:itemId/diktat" element={<DictationPage />} />
        <Route path="/levels/:level/texts/:itemId" element={<p>story page</p>} />
        <Route path="/levels/:level" element={<p>level page</p>} />
        <Route path="/levels" element={<p>levels overview</p>} />
      </Routes>
    </MemoryRouter>,
  )
}

/** Only letters, digits and spaces are typed — punctuation is filled in by the app. */
const typeable = (text: string) => text.replace(/[^\p{L}\p{N}\s]/gu, '')

const nextSentenceDelay = () => act(() => vi.advanceTimersByTime(1000))

describe('DictationPage', () => {
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true })
    speech.spoken.length = 0
    speech.stop.mockClear()
    useSettingsStore.getState().resetToDefaults()
    useDictationStore.getState().resetDictationProgress()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  const setup = () => userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
  const getInput = () => screen.getByRole('textbox', { name: 'اكتب الجملة التي تسمعها' })

  it('opens on a "tap to start" step and reads nothing yet', () => {
    renderDictation()
    expect(screen.getByRole('button', { name: /اضغط في أي مكان للبدء/ })).toBeInTheDocument()
    expect(speech.spoken).toHaveLength(0)
  })

  it('reads the first sentence aloud when the learner taps to start', async () => {
    const user = setup()
    renderDictation()
    await user.click(screen.getByRole('button', { name: /اضغط في أي مكان للبدء/ }))
    expect(speech.spoken[0].text).toBe(story.segments[0].text)
    expect(screen.getByText(story.segments[0].ar!)).toBeInTheDocument()
  })

  it('rejects a wrong letter and says so, without moving on', async () => {
    const user = setup()
    renderDictation()
    await user.click(screen.getByRole('button', { name: /اضغط في أي مكان للبدء/ }))
    await user.type(getInput(), 'q')
    expect(screen.getByRole('status')).toHaveTextContent('حرف خاطئ')
    expect(screen.getByText(/الجملة/)).toHaveTextContent('1')
  })

  it('answers a wrong letter with the error tone and a right one with a soft tick', async () => {
    const play = vi.spyOn(soundService, 'play').mockImplementation(() => undefined)
    const user = setup()
    renderDictation()
    await user.click(screen.getByRole('button', { name: /اضغط في أي مكان للبدء/ }))

    await user.type(getInput(), 'q')
    expect(play).toHaveBeenLastCalledWith('wrong')

    await user.type(getInput(), typeable(story.segments[0].text)[0])
    expect(play).toHaveBeenLastCalledWith('key')
    play.mockRestore()
  })

  it('warns when the keyboard is typing Arabic letters', async () => {
    const user = setup()
    renderDictation()
    await user.click(screen.getByRole('button', { name: /اضغط في أي مكان للبدء/ }))
    await user.type(getInput(), 'ب')
    expect(screen.getByRole('alert')).toHaveTextContent('لوحة المفاتيح')
  })

  it('types a whole conversation, shows the result and saves it', async () => {
    const user = setup()
    renderDictation()
    await user.click(screen.getByRole('button', { name: /اضغط في أي مكان للبدء/ }))

    for (const segment of story.segments) {
      await user.type(getInput(), typeable(segment.text))
      await nextSentenceDelay()
    }

    expect(screen.getByRole('heading', { name: 'أكملت الإملاء' })).toBeInTheDocument()
    expect(screen.getAllByText('100%').length).toBeGreaterThan(0)
    // Every sentence was read aloud as it appeared, with the two speakers' voices kept apart.
    expect(speech.spoken.map((entry) => entry.text)).toEqual(story.segments.map((segment) => segment.text))
    expect(new Set(speech.spoken.map((entry) => entry.pitch)).size).toBe(2)

    expect(useDictationStore.getState().stories[STORY_ID]).toMatchObject({ completed: true, bestAccuracy: 1, attempts: 1 })
  })

  it('records the mistakes it counted', async () => {
    const user = setup()
    renderDictation()
    await user.click(screen.getByRole('button', { name: /اضغط في أي مكان للبدء/ }))
    await user.type(getInput(), 'q')

    for (const segment of story.segments) {
      await user.type(getInput(), typeable(segment.text))
      await nextSentenceDelay()
    }

    const saved = useDictationStore.getState().stories[STORY_ID]
    expect(saved.bestAccuracy).toBeLessThan(1)
    expect(screen.getByText('أكثر الأحرف التي أخطأت فيها')).toBeInTheDocument()
  })

  it('starts over from the beginning when asked to try again', async () => {
    const user = setup()
    renderDictation()
    await user.click(screen.getByRole('button', { name: /اضغط في أي مكان للبدء/ }))
    for (const segment of story.segments) {
      await user.type(getInput(), typeable(segment.text))
      await nextSentenceDelay()
    }

    await user.click(screen.getByRole('button', { name: 'أعد المحاولة' }))
    expect(screen.getByRole('button', { name: /اضغط في أي مكان للبدء/ })).toBeInTheDocument()
  })

  it('silences the reader when the page is left', () => {
    const { unmount } = renderDictation()
    unmount()
    expect(speech.stop).toHaveBeenCalled()
  })

  it('redirects an unknown text back to the level page', () => {
    renderDictation('/levels/a1/texts/does-not-exist/diktat')
    expect(screen.getByText('level page')).toBeInTheDocument()
  })

  it('redirects an unknown level to the levels overview', () => {
    renderDictation(`/levels/zz/texts/${STORY_ID}/diktat`)
    expect(screen.getByText('levels overview')).toBeInTheDocument()
  })
})
