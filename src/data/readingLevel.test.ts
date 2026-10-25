import { describe, expect, it } from 'vitest'

import { splitSentences } from '@/lib/sentences'

import { a1Conversations } from './a1/conversations'
import { a1ReadingTexts } from './a1/reading'
import { a2ReadingTexts } from './a2/reading'

/**
 * Stories must not run ahead of the course: an A1 story stays in the present
 * tense and in main clauses (subordinate clauses, Präteritum and the
 * Komparativ are taught in A2).
 */
const A2_ONLY_MARKERS: readonly [RegExp, string][] = [
  [/\b(weil|dass|wenn|obwohl|damit|als ob)\b/i, 'subordinate clause'],
  [/\b(war|waren|hatte|hatten|konnte|konnten|musste|wollte|wurde)\b/i, 'Präteritum'],
  [/\b(besser|mehr|weniger|größer|kleiner|älter|am (?:besten|liebsten|meisten))\b/i, 'comparison'],
  [/\b(des|eines)\s+\p{Lu}/u, 'Genitiv'],
  [/\bwerde[n]?\b|\bwirst\b|\bwird\b/i, 'Futur'],
]

describe('reading stories follow the CEFR progression', () => {
  const a1Sentences = [
    ...a1ReadingTexts.flatMap((text) => text.paragraphs.flatMap((paragraph) => splitSentences(paragraph.de).map((sentence) => ({ id: text.id, sentence })))),
    ...a1Conversations.flatMap((conversation) => conversation.lines.flatMap((line) => splitSentences(line.de).map((sentence) => ({ id: conversation.id, sentence })))),
  ]

  it.each(A2_ONLY_MARKERS)('no A1 story or conversation uses %s (%s)', (marker) => {
    const offenders = a1Sentences.filter(({ sentence }) => marker.test(sentence)).map(({ id, sentence }) => `${id}: ${sentence}`)
    expect(offenders).toEqual([])
  })

  it('every story has a level that matches its list, an id with its level, and a unique slug', () => {
    for (const [level, texts] of [['A1', a1ReadingTexts], ['A2', a2ReadingTexts]] as const) {
      expect(new Set(texts.map((text) => text.slug)).size).toBe(texts.length)
      for (const text of texts) {
        expect(text.level).toBe(level)
        expect(text.id.startsWith(`${level.toLowerCase()}-read-`)).toBe(true)
      }
    }
  })

  it('there is plenty to read: at least seventeen A1 and eighteen A2 stories, each of a few paragraphs', () => {
    expect(a1ReadingTexts.length).toBeGreaterThanOrEqual(17)
    expect(a2ReadingTexts.length).toBeGreaterThanOrEqual(18)
    for (const text of [...a1ReadingTexts, ...a2ReadingTexts]) expect(text.paragraphs.length).toBeGreaterThanOrEqual(4)
  })
})
