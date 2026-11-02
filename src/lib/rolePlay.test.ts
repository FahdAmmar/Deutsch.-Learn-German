import { describe, expect, it } from 'vitest'

import { getStoriesForLevel } from '@/lib/stories'
import type { Story } from '@/types'

import { compareTyped, getDialogueLines, getRoles, hintOf, isPerfect, learnerLines, summarize, type RolePlayLine } from './rolePlay'

const dialogue = getStoriesForLevel('A1').find((story) => story.kind === 'dialogue') as Story
const reading = getStoriesForLevel('A1').find((story) => story.kind === 'reading') as Story

const lines: RolePlayLine[] = [
  { index: 0, speaker: 'a', name: 'Anna', de: 'Guten Tag! Wie geht es Ihnen?', ar: 'مرحباً! كيف حالك؟' },
  { index: 1, speaker: 'b', name: 'Tom', de: 'Danke, gut. Und Ihnen?', ar: 'بخير، شكراً. وأنت؟' },
  { index: 2, speaker: 'a', name: 'Anna', de: 'Mir geht es auch gut.', ar: 'أنا أيضاً بخير.' },
]

describe('getDialogueLines', () => {
  it('reads every line of a conversation, in order, with its speaker and both languages', () => {
    const read = getDialogueLines(dialogue)
    expect(read.length).toBe(dialogue.segments.length)
    expect(read.map((line) => line.index)).toEqual(read.map((_, position) => position))
    for (const line of read) {
      expect(line.de).toBeTruthy()
      expect(line.ar).toBeTruthy()
      expect(['a', 'b']).toContain(line.speaker)
    }
  })

  it('finds no lines in a reading text', () => {
    expect(getDialogueLines(reading)).toEqual([])
  })
})

describe('roles', () => {
  it('offers the two speakers by name, in the order they first speak', () => {
    expect(getRoles(lines)).toEqual([
      { speaker: 'a', name: 'Anna' },
      { speaker: 'b', name: 'Tom' },
    ])
  })

  it('offers no role to a conversation with one speaker', () => {
    expect(getRoles(lines.filter((line) => line.speaker === 'a'))).toEqual([])
  })

  it('gives each role the lines of its speaker', () => {
    expect(learnerLines(lines, 'a').map((line) => line.index)).toEqual([0, 2])
    expect(learnerLines(lines, 'b').map((line) => line.index)).toEqual([1])
  })

  it('gives every shipped conversation two roles, so each can be played', () => {
    for (const level of ['A1', 'A2'] as const) {
      for (const story of getStoriesForLevel(level).filter((candidate) => candidate.kind === 'dialogue')) {
        expect(getRoles(getDialogueLines(story)), story.id).toHaveLength(2)
      }
    }
  })
})

describe('compareTyped', () => {
  it('counts the right line as perfect, whatever the case and punctuation', () => {
    expect(isPerfect(compareTyped('Danke, gut. Und Ihnen?', 'danke gut und ihnen'))).toBe(true)
  })

  it('accepts ae, oe, ue and ss for the special letters, and shows the line as written', () => {
    const comparison = compareTyped('Ich möchte ein Brötchen für Fräulein Groß.', 'Ich moechte ein Broetchen fuer Fraeulein Gross')
    expect(comparison.score).toBe(1)
    expect(comparison.words.map((entry) => entry.word)).toEqual(['Ich', 'möchte', 'ein', 'Brötchen', 'für', 'Fräulein', 'Groß.'])
  })

  it('marks a missing word, a wrong word and a word one letter off', () => {
    const comparison = compareTyped('Ich wohne in Berlin', 'Ich wone Hamburg')
    const status = Object.fromEntries(comparison.words.map((entry) => [entry.word, entry.status]))
    expect(status).toMatchObject({ Ich: 'match', wohne: 'close', in: 'missing', Berlin: 'wrong' })
    expect(isPerfect(comparison)).toBe(false)
  })

  it('does not call a line perfect when a word was added', () => {
    expect(isPerfect(compareTyped('Gut, danke', 'Gut danke sehr'))).toBe(false)
  })

  it('scores an empty answer zero', () => {
    expect(compareTyped('Guten Tag', '').score).toBe(0)
  })
})

describe('summarize', () => {
  it('sums up an attempt', () => {
    const results = [
      { index: 0, typed: 'Guten Tag', comparison: compareTyped('Guten Tag', 'Guten Tag') },
      { index: 2, typed: 'Guten', comparison: compareTyped('Guten Tag', 'Guten') },
    ]
    expect(summarize(results, 3)).toEqual({ total: 3, answered: 2, perfect: 1, average: 0.75 })
  })

  it('has no average before anything is answered', () => {
    expect(summarize([], 3)).toEqual({ total: 3, answered: 0, perfect: 0, average: 0 })
  })
})

describe('hintOf', () => {
  it('shows the first words of a line and leaves the rest', () => {
    expect(hintOf('Guten Tag, wie geht es Ihnen?')).toBe('Guten Tag, …')
  })

  it('never gives away a very short line whole', () => {
    expect(hintOf('Danke!')).toBe('…')
    expect(hintOf('Guten Tag')).toBe('Guten …')
  })
})
