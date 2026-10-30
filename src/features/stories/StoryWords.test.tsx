import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it } from 'vitest'

import { getStoriesForLevel } from '@/lib/stories'
import { useProgressStore } from '@/store/progressStore'
import type { Story } from '@/types'

import { StoryWords } from './StoryWords'

/** A tiny text whose words are all in the A1 curriculum, so the panel has something to list. */
function smallStory(): Story {
  const text = 'Der Tisch ist im Zimmer. Ich trinke Wasser.'
  return {
    kind: 'reading',
    id: 'test-story',
    level: 'A1',
    titleDe: 'Test',
    titleAr: 'اختبار',
    blocks: [],
    segments: text.split('. ').map((sentence, index) => ({ index, text: sentence.endsWith('.') ? sentence : `${sentence}.` })),
  }
}

describe('StoryWords', () => {
  beforeEach(() => {
    useProgressStore.getState().resetProgress()
  })

  it('lists curriculum words from the text and saves one to review on click', async () => {
    const user = userEvent.setup()
    render(<StoryWords story={smallStory()} />)

    expect(screen.getByRole('heading', { name: /كلمات هذا النص/ })).toBeInTheDocument()
    const add = screen.getByRole('button', { name: /إضافة Tisch إلى المراجعة/ })
    expect(add).toHaveAttribute('aria-pressed', 'false')

    await user.click(add)

    expect(useProgressStore.getState().savedVocabularyIds).toHaveLength(1)
    expect(screen.getByRole('button', { name: /إزالة Tisch من المراجعة/ })).toHaveAttribute('aria-pressed', 'true')
  })

  it('adds every word at once with "add all" and never removes one that was already saved', async () => {
    const user = userEvent.setup()
    render(<StoryWords story={smallStory()} />)
    await user.click(screen.getByRole('button', { name: /إضافة Tisch إلى المراجعة/ }))
    const savedBefore = useProgressStore.getState().savedVocabularyIds ?? []

    await user.click(screen.getByRole('button', { name: /أضف الكل/ }))

    const savedAfter = useProgressStore.getState().savedVocabularyIds ?? []
    expect(savedAfter.length).toBeGreaterThan(savedBefore.length)
    for (const id of savedBefore) expect(savedAfter).toContain(id)
    expect(new Set(savedAfter).size).toBe(savedAfter.length)
    expect(screen.getByText(/كل كلمات النص في مراجعتك/)).toBeInTheDocument()
  })

  it('shows nothing for a text with no curriculum words', () => {
    const story: Story = { ...smallStory(), segments: [{ index: 0, text: 'Xyzzy plugh.' }] }
    const { container } = render(<StoryWords story={story} />)
    expect(container).toBeEmptyDOMElement()
  })

  it('works on a real level-A1 text', () => {
    const story = getStoriesForLevel('A1')[0]
    render(<StoryWords story={story} />)
    expect(screen.getAllByRole('listitem').length).toBeGreaterThan(0)
  })
})
