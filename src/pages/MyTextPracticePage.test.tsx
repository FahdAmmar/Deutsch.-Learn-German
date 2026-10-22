import { act, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { afterEach, beforeEach, describe, expect, it, vi, type MockInstance } from 'vitest'

import MyTextPracticePage from '@/pages/MyTextPracticePage'
import { soundService } from '@/services/sound'
import { useMyTextStore } from '@/store/myTextStore'
import { useSettingsStore } from '@/store/settingsStore'
import { useSpellingStore } from '@/store/spellingStore'

const speech = vi.hoisted(() => ({ spoken: [] as string[], stop: vi.fn() }))

vi.mock('@/services/speech', () => ({
  GERMAN_LOCALE: 'de-DE',
  speechService: {
    isSupported: () => true,
    speak: (text: string) => {
      speech.spoken.push(text)
    },
    stop: speech.stop,
    getStatus: () => 'idle',
  },
}))

/** Two parts: "Guten Morgen!" (12 typeable letters) and "Wie geht es dir?" (15). */
const TEXT = 'Guten Morgen! Wie geht es dir?'
const typeable = (text: string) => text.replace(/[^\p{L}\p{N}\s]/gu, '')

function renderPractice(id: string) {
  return render(
    <MemoryRouter initialEntries={[`/my-text/${id}`]}>
      <Routes>
        <Route path="/my-text/:id" element={<MyTextPracticePage />} />
        <Route path="/my-text" element={<p>my texts</p>} />
      </Routes>
    </MemoryRouter>,
  )
}

const nextPartDelay = () => act(() => vi.advanceTimersByTime(1000))
const getInput = () => screen.getByRole('textbox', { name: 'اكتب المقطع الذي تسمعه' })
const start = (user: ReturnType<typeof userEvent.setup>) => user.click(screen.getByRole('button', { name: /اضغط في أي مكان للبدء/ }))

describe('MyTextPracticePage', () => {
  let play: MockInstance<typeof soundService.play>
  let id: string

  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true })
    window.localStorage.clear()
    speech.spoken.length = 0
    speech.stop.mockClear()
    useSettingsStore.getState().resetToDefaults()
    useMyTextStore.setState({ texts: [] })
    useSpellingStore.getState().resetSpelling()
    id = useMyTextStore.getState().addText({ title: 'Begrüßung', text: TEXT, mode: 'sentences', maxWords: 6 })!.id
    play = vi.spyOn(soundService, 'play').mockImplementation(() => undefined)
  })

  afterEach(() => {
    play.mockRestore()
    vi.useRealTimers()
  })

  const setup = () => userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
  const cues = () => play.mock.calls.map(([cue]) => cue)

  it('shows the title and how many parts there are, and reads the first part when started', async () => {
    const user = setup()
    renderPractice(id)

    expect(screen.getByRole('heading', { level: 1, name: 'Begrüßung' })).toBeInTheDocument()
    expect(screen.getByText('2 مقطع')).toBeInTheDocument()
    expect(speech.spoken).toHaveLength(0)

    await start(user)
    expect(speech.spoken).toEqual(['Guten Morgen!'])
    expect(screen.getByText(/المقطع/)).toHaveTextContent('1')
  })

  it('does not offer a translation toggle, since the learner\'s own text has none', async () => {
    const user = setup()
    renderPractice(id)
    await start(user)
    expect(screen.queryByRole('switch', { name: 'إظهار الترجمة العربية' })).not.toBeInTheDocument()
    expect(screen.getByRole('switch', { name: 'أصوات الحرف الصحيح والخاطئ' })).toBeInTheDocument()
  })

  it('ticks for every right letter, chimes at the end of a part and plays the finale at the end of the text', async () => {
    const user = setup()
    renderPractice(id)
    await start(user)

    await user.type(getInput(), typeable('Guten Morgen!'))
    expect(cues()).toEqual([...Array(11).fill('key'), 'correct'])

    await nextPartDelay()
    await user.type(getInput(), typeable('Wie geht es dir?'))
    expect(cues()).toEqual([...Array(11).fill('key'), 'correct', ...Array(14).fill('key'), 'complete'])
  })

  it('plays the error tone for a wrong letter, rejects it, and carries on from the same letter', async () => {
    const user = setup()
    renderPractice(id)
    await start(user)

    await user.type(getInput(), 'q')
    expect(cues()).toEqual(['wrong'])
    expect(screen.getByRole('status')).toHaveTextContent('حرف خاطئ')

    await user.type(getInput(), 'G')
    expect(cues()).toEqual(['wrong', 'key'])
  })

  it('answers every wrong press, even several in a row', async () => {
    const user = setup()
    renderPractice(id)
    await start(user)

    await user.type(getInput(), 'xyz')
    expect(cues()).toEqual(['wrong', 'wrong', 'wrong'])
  })

  it('stays silent when sound effects are switched off', async () => {
    const user = setup()
    useSettingsStore.getState().setSoundEffects(false)
    renderPractice(id)
    await start(user)

    await user.type(getInput(), 'qG')
    expect(play).not.toHaveBeenCalled()
  })

  it('can switch the sounds off from the options, without replaying an old sound', async () => {
    const user = setup()
    renderPractice(id)
    await start(user)
    await user.type(getInput(), 'G')
    expect(cues()).toEqual(['key'])

    await user.click(screen.getByRole('switch', { name: 'أصوات الحرف الصحيح والخاطئ' }))
    expect(useSettingsStore.getState().settings.soundEffects).toBe(false)
    await user.type(getInput(), 'u')
    expect(cues()).toEqual(['key'])
  })

  it('shows the part just finished above the one being typed', async () => {
    const user = setup()
    renderPractice(id)
    await start(user)
    await user.type(getInput(), typeable('Guten Morgen!'))
    await nextPartDelay()

    expect(screen.getByText('Guten Morgen!', { selector: 'p[aria-hidden="true"]' })).toBeInTheDocument()
  })

  it('finishes with the results, and saves them against this text', async () => {
    const user = setup()
    renderPractice(id)
    await start(user)

    await user.type(getInput(), typeable('Guten Morgen!'))
    await nextPartDelay()
    await user.type(getInput(), typeable('Wie geht es dir?'))
    await nextPartDelay()

    expect(screen.getByRole('heading', { name: 'أكملت الإملاء' })).toBeInTheDocument()
    expect(screen.getAllByText('100%').length).toBeGreaterThan(0)
    expect(useMyTextStore.getState().texts[0]).toMatchObject({ attempts: 1, bestAccuracy: 1 })
    // The back link in the header and the button in the results both lead to the list.
    const links = screen.getAllByRole('link', { name: 'نصوصي' })
    expect(links).toHaveLength(2)
    for (const link of links) expect(link).toHaveAttribute('href', '/my-text')
  })

  it('counts mistakes against accuracy and keeps the best result when the text is tried again', async () => {
    const user = setup()
    renderPractice(id)
    await start(user)

    await user.type(getInput(), 'q')
    await user.type(getInput(), typeable('Guten Morgen!'))
    await nextPartDelay()
    await user.type(getInput(), typeable('Wie geht es dir?'))
    await nextPartDelay()

    const first = useMyTextStore.getState().texts[0]
    expect(first.attempts).toBe(1)
    expect(first.bestAccuracy).toBeLessThan(1)
    expect(screen.getByText('أكثر الأحرف التي أخطأت فيها')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'أعد المحاولة' }))
    await start(user)
    await user.type(getInput(), typeable('Guten Morgen!'))
    await nextPartDelay()
    await user.type(getInput(), typeable('Wie geht es dir?'))
    await nextPartDelay()

    expect(useMyTextStore.getState().texts[0]).toMatchObject({ attempts: 2, bestAccuracy: 1 })
  })

  it('names the kind of mistake on the result screen and keeps it for the learner’s weak spots', async () => {
    const user = setup()
    renderPractice(id)
    await start(user)

    // "g" where "G" belongs is a capital letter missed; the second wrong press on the same cell is not counted again.
    await user.type(getInput(), 'g')
    await user.type(getInput(), 'q')
    await user.type(getInput(), 'G')
    await user.type(getInput(), typeable('Guten Morgen!').slice(1))
    await nextPartDelay()
    await user.type(getInput(), typeable('Wie geht es dir?'))
    await nextPartDelay()

    expect(screen.getByText('ما نوع أخطائك؟')).toBeInTheDocument()
    expect(screen.getByText('الأحرف الكبيرة')).toBeInTheDocument()
    const { words, kinds } = useSpellingStore.getState()
    expect(words['Guten']).toMatchObject({ count: 1, kind: 'capital' })
    expect(kinds).toEqual({ capital: 1 })
  })

  describe('stages', () => {
    it('opens at the stage the text has reached, and moves the text up after a clean run at it', async () => {
      const user = setup()
      renderPractice(id)
      expect(screen.getByRole('radio', { name: /نسخ/ })).toBeChecked()
      await start(user)

      await user.type(getInput(), typeable('Guten Morgen!'))
      await nextPartDelay()
      await user.type(getInput(), typeable('Wie geht es dir?'))
      await nextPartDelay()

      expect(useMyTextStore.getState().texts[0]).toMatchObject({ stage: 'cloze', attempts: 1 })
    })

    it('in the cloze stage, passes over the given words and asks only for the others', async () => {
      useMyTextStore.setState({ texts: useMyTextStore.getState().texts.map((entry) => ({ ...entry, stage: 'cloze' as const })) })
      const user = setup()
      renderPractice(id)
      expect(screen.getByRole('radio', { name: /إكمال الفراغات/ })).toBeChecked()
      await start(user)

      // "Guten Morgen!": "Guten" is given, so only "Morgen" is typed; the "!" fills itself.
      await user.type(getInput(), 'Morgen')
      await nextPartDelay()
      // "Wie geht es dir?": "Wie" and "es" are given, so "geht" and "dir" are typed, without the spaces between.
      await user.type(getInput(), 'gehtdir')
      await nextPartDelay()

      expect(screen.getByRole('heading', { name: 'أكملت الإملاء' })).toBeInTheDocument()
      expect(useMyTextStore.getState().texts[0]).toMatchObject({ stage: 'initials', attempts: 1, bestAccuracy: 1 })
    })

    it('does not move the text up for a run at an easier stage than the one it has reached', async () => {
      useMyTextStore.setState({ texts: useMyTextStore.getState().texts.map((entry) => ({ ...entry, stage: 'cloze' as const })) })
      const user = setup()
      renderPractice(id)
      await user.click(screen.getByRole('radio', { name: /نسخ/ }))
      await start(user)

      await user.type(getInput(), typeable('Guten Morgen!'))
      await nextPartDelay()
      await user.type(getInput(), typeable('Wie geht es dir?'))
      await nextPartDelay()

      expect(useMyTextStore.getState().texts[0]).toMatchObject({ stage: 'cloze', attempts: 1 })
    })

    it('from memory, does not read the part aloud by itself, but still can on request', async () => {
      useMyTextStore.setState({ texts: useMyTextStore.getState().texts.map((entry) => ({ ...entry, stage: 'memory' as const })) })
      const user = setup()
      renderPractice(id)
      await start(user)

      expect(speech.spoken).toEqual([])
      await user.type(getInput(), typeable('Guten Morgen!'))
      await nextPartDelay()
      expect(speech.spoken).toEqual([])
    })

    it('from memory, schedules the review after a clean run', async () => {
      useMyTextStore.setState({ texts: useMyTextStore.getState().texts.map((entry) => ({ ...entry, stage: 'memory' as const })) })
      const user = setup()
      renderPractice(id)
      await start(user)

      await user.type(getInput(), typeable('Guten Morgen!'))
      await nextPartDelay()
      await user.type(getInput(), typeable('Wie geht es dir?'))
      await nextPartDelay()

      const text = useMyTextStore.getState().texts[0]
      expect(text.box).toBe(1)
      expect(text.dueAt).toBeGreaterThan(Date.now())
    })
  })

  it('goes back to the list for a text that does not exist', () => {
    renderPractice('does-not-exist')
    expect(screen.getByText('my texts')).toBeInTheDocument()
  })

  it('silences the reader when the page is left', () => {
    const { unmount } = renderPractice(id)
    unmount()
    expect(speech.stop).toHaveBeenCalled()
  })
})
