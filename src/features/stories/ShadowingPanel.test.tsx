import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { getStoriesForLevel } from '@/lib/stories'
import type { ListenOptions, RecognitionResult } from '@/services/recognition'

import { ShadowingPanel } from './ShadowingPanel'

const recognizer = vi.hoisted(() => ({ supported: true, listen: vi.fn<(options?: ListenOptions) => Promise<RecognitionResult>>() }))

vi.mock('@/services/recognition', async (importOriginal) => {
  const original = await importOriginal<typeof import('@/services/recognition')>()
  return { ...original, speechRecognizer: { isSupported: () => recognizer.supported, listen: (options?: ListenOptions) => recognizer.listen(options) } }
})

vi.mock('@/services/speech', () => ({
  GERMAN_LOCALE: 'de-DE',
  speechService: { isSupported: () => true, speak: vi.fn(), stop: vi.fn(), getStatus: () => 'idle' },
}))

const story = getStoriesForLevel('A1').find((candidate) => candidate.kind === 'reading' && candidate.segments.length > 2)!

function renderPanel(onBeforeListen = vi.fn()) {
  render(
    <MemoryRouter>
      <ShadowingPanel story={story} onBeforeListen={onBeforeListen} />
    </MemoryRouter>,
  )
  return onBeforeListen
}

describe('ShadowingPanel', () => {
  beforeEach(() => {
    recognizer.supported = true
    recognizer.listen.mockReset()
  })

  it('starts at the first sentence and says how many there are', () => {
    renderPanel()
    expect(screen.getByText(`الجملة 1 من ${story.segments.length}`, { exact: false })).toBeInTheDocument()
    expect(screen.getByText(story.segments[0].text)).toBeInTheDocument()
  })

  it('stops the story’s own audio before the microphone opens, and marks a sentence read right', async () => {
    recognizer.listen.mockResolvedValue({ transcript: story.segments[0].text, confidence: 0.9, alternatives: [] })
    const user = userEvent.setup()
    const onBeforeListen = renderPanel()

    await user.click(screen.getByRole('button', { name: 'تحدّث' }))

    expect(onBeforeListen).toHaveBeenCalledOnce()
    expect(screen.getByText(/ممتاز/)).toBeInTheDocument()
    expect(screen.getByText(/فُهمت 1 جملة بلا خطأ/)).toBeInTheDocument()
  })

  it('marks the words that were not understood', async () => {
    const words = story.segments[0].text.split(/\s+/)
    recognizer.listen.mockResolvedValue({ transcript: words.slice(1).join(' '), confidence: 0.5, alternatives: [] })
    const user = userEvent.setup()
    renderPanel()

    await user.click(screen.getByRole('button', { name: 'تحدّث' }))

    expect(screen.getByText('لم تُسمع')).toBeInTheDocument()
  })

  it('moves between sentences, and keeps each sentence’s result', async () => {
    recognizer.listen.mockResolvedValue({ transcript: story.segments[0].text, confidence: 0.9, alternatives: [] })
    const user = userEvent.setup()
    renderPanel()
    await user.click(screen.getByRole('button', { name: 'تحدّث' }))

    await user.click(screen.getByRole('button', { name: 'التالية' }))
    expect(screen.getByText(`الجملة 2 من ${story.segments.length}`, { exact: false })).toBeInTheDocument()
    expect(screen.queryByText(/ممتاز/)).not.toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'السابقة' }))
    expect(screen.getByText(/ممتاز/)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'السابقة' })).toBeDisabled()
  })

  it('says so when the browser cannot recognise speech, and offers no microphone', () => {
    recognizer.supported = false
    renderPanel()
    expect(screen.getByRole('note')).toHaveTextContent('متصفحك لا يدعم التعرّف على الكلام')
    expect(screen.queryByRole('button', { name: 'تحدّث' })).not.toBeInTheDocument()
  })

  it('tells the learner what the check measures', () => {
    renderPanel()
    const panel = screen.getByText('اقرأ بصوتك').closest('details') as HTMLElement
    expect(within(panel).getByText(/يقيس هذا التدريب هل فُهمتَ، لا جودة لهجتك/)).toBeInTheDocument()
  })
})
