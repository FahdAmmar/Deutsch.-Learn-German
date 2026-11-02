import { describe, expect, it } from 'vitest'

import { CONTRAST_GROUPS, MINIMAL_PAIRS } from '@/data/minimalPairs'

import { buildMinimalPairDrill, buildPairQuestion, getMinimalPairsForLevel } from './minimalPairDrill'

describe('minimal pair data', () => {
  it('has unique ids', () => {
    expect(new Set(MINIMAL_PAIRS.map((pair) => pair.id)).size).toBe(MINIMAL_PAIRS.length)
  })

  it('pairs two different words, compared the way a listener hears them', () => {
    for (const pair of MINIMAL_PAIRS) {
      expect(pair.a.word.toLowerCase(), pair.id).not.toBe(pair.b.word.toLowerCase())
      expect(pair.a.meaningAr, pair.id).not.toBe(pair.b.meaningAr)
    }
  })

  it('gives every pair a contrast group that exists, and every group at least one pair', () => {
    const groupIds = new Set(CONTRAST_GROUPS.map((group) => group.id))
    for (const pair of MINIMAL_PAIRS) expect(groupIds.has(pair.contrast), pair.id).toBe(true)
    for (const group of CONTRAST_GROUPS) {
      expect(MINIMAL_PAIRS.some((pair) => pair.contrast === group.id), group.id).toBe(true)
    }
  })

  it('writes nouns with a capital letter and everything else in lower case', () => {
    for (const pair of MINIMAL_PAIRS) {
      for (const entry of [pair.a, pair.b]) {
        const startsUpper = entry.word[0] === entry.word[0].toUpperCase()
        // Wien is a proper noun without an article; every other capitalised word carries one.
        if (entry.article) expect(startsUpper, `${pair.id}: ${entry.word}`).toBe(true)
        else if (entry.word !== 'Wien') expect(startsUpper, `${pair.id}: ${entry.word}`).toBe(false)
      }
    }
  })
})

describe('minimal pair drill', () => {
  it('offers A1 learners only the A1 pairs, and A2 learners both', () => {
    expect(getMinimalPairsForLevel('A1').every((pair) => pair.level === 'A1')).toBe(true)
    expect(getMinimalPairsForLevel('A2').length).toBe(MINIMAL_PAIRS.length)
  })

  it('asks the listener to pick the spoken word out of the pair', () => {
    const pair = MINIMAL_PAIRS[0]
    const question = buildPairQuestion(pair, false)
    expect(question.audioText).toBe(pair.b.word)
    expect(question.options).toHaveLength(2)
    expect(question.options[question.correctIndex]).toBe(pair.b.word)
    expect(new Set(question.options).size).toBe(2)
  })

  it('builds a session in which each pair appears once, with unique ids', () => {
    const session = buildMinimalPairDrill('A2', 100)
    expect(session).toHaveLength(MINIMAL_PAIRS.length)
    expect(new Set(session.map((exercise) => exercise.id)).size).toBe(session.length)
  })
})
