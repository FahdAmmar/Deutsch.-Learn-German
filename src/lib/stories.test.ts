import { describe, expect, it } from 'vitest'

import { getReadingTextsForLevel, getDialoguesForLevel } from '@/lib/curriculum'
import { getStoriesForLevel, getStory } from '@/lib/stories'
import { splitSentences } from '@/lib/sentences'
import type { CEFRLevel } from '@/types'

const LEVELS_WITH_STORIES: CEFRLevel[] = ['A1', 'A2']

describe('stories', () => {
  for (const level of LEVELS_WITH_STORIES) {
    describe(level, () => {
      const stories = getStoriesForLevel(level)

      it('includes every reading text and every conversation, texts first', () => {
        const texts = getReadingTextsForLevel(level)
        const dialogues = getDialoguesForLevel(level)
        expect(stories).toHaveLength(texts.length + dialogues.length)
        expect(stories.slice(0, texts.length).every((story) => story.kind === 'reading')).toBe(true)
        expect(stories.slice(texts.length).every((story) => story.kind === 'dialogue')).toBe(true)
      })

      it('has unique ids, so a story can be addressed by URL', () => {
        const ids = stories.map((story) => story.id)
        expect(new Set(ids).size).toBe(ids.length)
      })

      it('gives every story German and Arabic titles (conversations need an authored German title)', () => {
        for (const dialogue of getDialoguesForLevel(level)) {
          expect(dialogue.titleDe?.trim(), `${dialogue.id} needs a titleDe`).toBeTruthy()
        }
        for (const story of stories) {
          expect(story.titleDe.trim()).not.toBe('')
          expect(story.titleAr.trim()).not.toBe('')
        }
      })

      it('numbers audio segments 0..n-1 in playback order, with no empty segment', () => {
        for (const story of stories) {
          expect(story.segments.length, story.id).toBeGreaterThan(0)
          story.segments.forEach((segment, position) => {
            expect(segment.index, `${story.id}#${position}`).toBe(position)
            expect(segment.text.trim(), `${story.id}#${position}`).not.toBe('')
          })
        }
      })

      it('splits reading paragraphs into sentences without losing or reordering any text', () => {
        for (const text of getReadingTextsForLevel(level)) {
          const story = getStory(level, text.id)
          expect(story).toBeDefined()
          const paragraphs = story!.blocks.filter((block) => block.type === 'paragraph')
          expect(paragraphs).toHaveLength(text.paragraphs.length)
          paragraphs.forEach((block, i) => {
            expect(block.segments.map((segment) => segment.text).join(' ')).toBe(splitSentences(text.paragraphs[i].de).join(' '))
            // Every sentence starts like a sentence: a capital, a digit or an opening quote.
            for (const segment of block.segments) expect(segment.text, `${text.id} §${i}`).toMatch(/^[A-ZÄÖÜ0-9„"“«]/)
          })
        }
      })

      it('makes one audio segment per conversation line, with the speaker pitches set', () => {
        for (const dialogue of getDialoguesForLevel(level)) {
          const story = getStory(level, dialogue.id)!
          expect(story.segments).toHaveLength(dialogue.lines.length)
          expect(story.segments.map((segment) => segment.text)).toEqual(dialogue.lines.map((line) => line.de))
          expect(story.segments.every((segment) => typeof segment.pitch === 'number')).toBe(true)
        }
      })
    })
  }

  it('returns undefined for an unknown id and for levels without content', () => {
    expect(getStory('A1', 'does-not-exist')).toBeUndefined()
    expect(getStoriesForLevel('B1')).toEqual([])
  })
})
