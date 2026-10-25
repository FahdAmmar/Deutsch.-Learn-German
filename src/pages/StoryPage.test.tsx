import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import StoryPage from '@/pages/StoryPage'
import { getStory } from '@/lib/stories'
import { useSettingsStore } from '@/store/settingsStore'

const speech = vi.hoisted(() => ({
  spoken: [] as Array<{ text: string; rate?: number; pitch?: number }>,
  stop: vi.fn(),
}))

vi.mock('@/services/speech', () => ({
  GERMAN_LOCALE: 'de-DE',
  speechService: {
    isSupported: () => true,
    speak: (text: string, options: { rate?: number; pitch?: number }) => {
      speech.spoken.push({ text, rate: options.rate, pitch: options.pitch })
    },
    stop: speech.stop,
    getStatus: () => 'idle',
  },
}))

function renderStory(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/levels/:level/texts/:itemId" element={<StoryPage />} />
        <Route path="/levels" element={<p>levels overview</p>} />
        <Route path="/levels/:level" element={<p>level page</p>} />
        <Route path="/lessons/:level/:slug" element={<p>lesson page</p>} />
      </Routes>
    </MemoryRouter>,
  )
}

describe('StoryPage — reading text', () => {
  const text = getStory('A1', 'a1-read-01')

  beforeEach(() => {
    speech.spoken.length = 0
    speech.stop.mockClear()
    useSettingsStore.getState().resetToDefaults()
  })

  it('has a story to test', () => {
    expect(text).toBeDefined()
  })

  it('shows the German and Arabic titles, the level, the cover and the audio bar', () => {
    renderStory(`/levels/a1/texts/${text!.id}`)

    expect(screen.getByRole('heading', { level: 1, name: text!.titleDe })).toBeInTheDocument()
    expect(screen.getByText(text!.titleAr)).toBeInTheDocument()
    expect(screen.getByText('A1')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /نصوص ومحادثات A1/ })).toHaveAttribute('href', '/levels/a1?tab=stories')
    const player = screen.getByRole('group', { name: 'مشغّل الصوت' })
    expect(within(player).getByRole('button', { name: 'تشغيل' })).toBeInTheDocument()
    expect(within(player).getByRole('button', { name: 'إعادة من البداية' })).toBeInTheDocument()
    expect(within(player).getByRole('slider', { name: 'التنقّل بين الجمل' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'تشغيل الصوت' })).toBeInTheDocument()
  })

  it('reads the first sentence in German when play is pressed, then offers pause', async () => {
    const user = userEvent.setup()
    renderStory(`/levels/a1/texts/${text!.id}`)

    await user.click(within(screen.getByRole('group', { name: 'مشغّل الصوت' })).getByRole('button', { name: 'تشغيل' }))

    expect(speech.spoken[0].text).toBe(text!.segments[0].text)
    expect(within(screen.getByRole('group', { name: 'مشغّل الصوت' })).getByRole('button', { name: 'إيقاف مؤقت' })).toBeInTheDocument()
  })

  it('starts reading from a sentence the learner clicks, and marks it as current', async () => {
    const user = userEvent.setup()
    renderStory(`/levels/a1/texts/${text!.id}`)

    const third = text!.segments[2].text
    await user.click(screen.getByRole('button', { name: third }))

    expect(speech.spoken[0].text).toBe(third)
    expect(screen.getByRole('button', { name: third })).toHaveAttribute('aria-current', 'true')
  })

  it('keeps the current sentence highlighted in the accent colour even while the pointer is over it', async () => {
    const user = userEvent.setup()
    renderStory(`/levels/a1/texts/${text!.id}`)

    const first = screen.getByRole('button', { name: text!.segments[0].text })
    const second = screen.getByRole('button', { name: text!.segments[1].text })
    await user.click(second)

    expect(second).toHaveClass('bg-accent-muted', 'hover:bg-accent-muted')
    expect(second).not.toHaveClass('hover:bg-surface-sunken')
    // Other sentences only show the subtle hover tint.
    expect(first).toHaveClass('hover:bg-surface-sunken')
    expect(first).not.toHaveClass('bg-accent-muted')
  })

  it('cycles the speed and saves it as the app-wide preference', async () => {
    const user = userEvent.setup()
    renderStory(`/levels/a1/texts/${text!.id}`)

    expect(screen.getByRole('button', { name: /سرعة القراءة ×0\.90/ })).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: /سرعة القراءة/ }))

    expect(useSettingsStore.getState().settings.speechRate).toBe(1)
    expect(screen.getByRole('button', { name: /سرعة القراءة ×1\.00/ })).toBeInTheDocument()
  })

  it('shows the Arabic translations by default and hides them with the translation switch', async () => {
    const user = userEvent.setup()
    renderStory(`/levels/a1/texts/${text!.id}`)

    const firstArabic = text!.blocks[0].type === 'paragraph' ? text!.blocks[0].ar : ''
    expect(screen.getByText(firstArabic)).toBeInTheDocument()

    const toggle = screen.getByRole('button', { name: 'الترجمة العربية' })
    expect(toggle).toHaveAttribute('aria-pressed', 'true')
    await user.click(toggle)

    expect(toggle).toHaveAttribute('aria-pressed', 'false')
    expect(screen.queryByText(firstArabic)).not.toBeInTheDocument()
    expect(useSettingsStore.getState().settings.showTranslations).toBe(false)
  })

  it('marks "dem Frühstück" and "zur Arbeit" with grammar hints that explain why on hover, and can be switched off', async () => {
    const user = userEvent.setup()
    const { container } = renderStory('/levels/a1/texts/a1-read-02')

    const marked = Array.from(container.querySelectorAll('[data-hint-owner]')).map((element) => element.textContent)
    expect(marked).toEqual(expect.arrayContaining(['dem Frühstück', 'zur Arbeit']))

    await user.hover(screen.getByText('zur Arbeit'))
    expect(document.querySelector('[data-hint-popup]')).toHaveTextContent('zu + der → zur')
    await user.unhover(screen.getByText('zur Arbeit'))

    const toggle = screen.getByRole('button', { name: 'تلميحات القواعد' })
    expect(toggle).toHaveAttribute('aria-pressed', 'true')
    await user.click(toggle)

    expect(toggle).toHaveAttribute('aria-pressed', 'false')
    expect(container.querySelectorAll('[data-hint-owner]')).toHaveLength(0)
    expect(useSettingsStore.getState().settings.showGrammarHints).toBe(false)
    // The sentences are still there and still play.
    expect(screen.getByRole('button', { name: /Nach dem Frühstück gehe ich zur Arbeit/ })).toBeInTheDocument()
  })

  it('silences the audio when leaving the page', async () => {
    const user = userEvent.setup()
    const { unmount } = renderStory(`/levels/a1/texts/${text!.id}`)
    await user.click(screen.getByRole('button', { name: 'تشغيل الصوت' }))
    speech.stop.mockClear()

    unmount()
    expect(speech.stop).toHaveBeenCalled()
  })
})

describe('StoryPage — conversation', () => {
  beforeEach(() => {
    speech.spoken.length = 0
    useSettingsStore.getState().resetToDefaults()
  })

  it('shows speakers, reads each line with its speaker pitch, and links back to the lesson', async () => {
    const user = userEvent.setup()
    const story = getStory('A1', 'dialogue-wohnung-informell')!
    renderStory('/levels/a1/texts/dialogue-wohnung-informell')

    expect(screen.getByRole('heading', { level: 1, name: 'Im Wohnzimmer' })).toBeInTheDocument()
    expect(screen.getByText('ترتيب غرفة المعيشة')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /من درس/ })).toHaveAttribute('href', expect.stringMatching(/^\/lessons\/a1\//))

    const lines = story.blocks.filter((block) => block.type === 'line')
    await user.click(screen.getByRole('button', { name: lines[1].segment.text }))
    expect(speech.spoken[0]).toMatchObject({ text: lines[1].segment.text, pitch: lines[1].segment.pitch })
  })

  it('works for A2 conversations as well', () => {
    renderStory('/levels/a2/texts/dialogue-wohnungssuche-formell')
    expect(screen.getByRole('heading', { level: 1, name: 'Die Wohnungsbesichtigung' })).toBeInTheDocument()
  })
})

describe('StoryPage — repeating', () => {
  const text = getStory('A1', 'a1-read-01')!
  const sentence = (index: number) => screen.getByRole('button', { name: text.segments[index].text })

  beforeEach(() => {
    speech.spoken.length = 0
    speech.stop.mockClear()
    useSettingsStore.getState().resetToDefaults()
  })

  it('offers the repeat button, off at first, and cycles sentence → passage → off', async () => {
    const user = userEvent.setup()
    renderStory(`/levels/a1/texts/${text.id}`)

    const repeat = () => screen.getByRole('button', { name: /^التكرار:/ })
    expect(repeat()).toHaveAccessibleName('التكرار: إيقاف. اضغط للتغيير')

    await user.click(repeat())
    expect(repeat()).toHaveAccessibleName('التكرار: الجملة. اضغط للتغيير')
    await user.click(repeat())
    expect(repeat()).toHaveAccessibleName('التكرار: مقطع. اضغط للتغيير')
    await user.click(repeat())
    expect(repeat()).toHaveAccessibleName('التكرار: إيقاف. اضغط للتغيير')
  })

  it('chooses a passage with two taps, tints its sentences and says which sentences repeat', async () => {
    const user = userEvent.setup()
    const { container } = renderStory(`/levels/a1/texts/${text.id}`)
    const repeat = screen.getByRole('button', { name: /^التكرار:/ })
    const tinted = () => Array.from(container.querySelectorAll('[data-in-range]')).map((element) => element.textContent)

    await user.click(repeat)
    await user.click(repeat)
    expect(screen.getByRole('status')).toHaveTextContent('اضغط على أول جملة في المقطع')

    await user.click(sentence(1))
    expect(screen.getByRole('status')).toHaveTextContent('اضغط على آخر جملة في المقطع')
    expect(tinted()).toEqual([text.segments[1].text])

    await user.click(sentence(2))
    expect(screen.getByRole('status')).toHaveTextContent('المقطع المكرَّر: الجمل 2–3')
    expect(tinted()).toEqual([text.segments[1].text, text.segments[2].text])
    expect(speech.spoken[speech.spoken.length - 1].text).toBe(text.segments[1].text)
  })

  it('forgets the passage when the repeat is switched off', async () => {
    const user = userEvent.setup()
    const { container } = renderStory(`/levels/a1/texts/${text.id}`)
    const repeat = screen.getByRole('button', { name: /^التكرار:/ })

    await user.click(repeat)
    await user.click(repeat)
    await user.click(sentence(0))
    await user.click(sentence(1))
    expect(container.querySelectorAll('[data-in-range]')).toHaveLength(2)

    await user.click(repeat)
    expect(container.querySelectorAll('[data-in-range]')).toHaveLength(0)
    expect(screen.queryByText(/المقطع المكرَّر/)).not.toBeInTheDocument()
  })

  it('tints the chosen lines of a conversation too', async () => {
    const user = userEvent.setup()
    const dialogue = getStory('A1', 'dialogue-wohnung-informell')!
    const lines = dialogue.blocks.filter((block) => block.type === 'line')
    const { container } = renderStory('/levels/a1/texts/dialogue-wohnung-informell')
    const repeat = screen.getByRole('button', { name: /^التكرار:/ })

    await user.click(repeat)
    await user.click(repeat)
    await user.click(screen.getByRole('button', { name: lines[0].segment.text }))
    await user.click(screen.getByRole('button', { name: lines[1].segment.text }))

    expect(container.querySelectorAll('li [data-in-range]')).toHaveLength(2)
  })
})

describe('StoryPage — unknown addresses', () => {
  it('sends an unknown story back to its level', () => {
    renderStory('/levels/a1/texts/nope')
    expect(screen.getByText('level page')).toBeInTheDocument()
  })

  it('sends an unknown level back to the levels overview', () => {
    renderStory('/levels/z9/texts/anything')
    expect(screen.getByText('levels overview')).toBeInTheDocument()
  })
})
