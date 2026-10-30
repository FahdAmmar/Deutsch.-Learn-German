import { describe, expect, it } from 'vitest'

import type { VocabularyItem, VocabularyProgress } from '@/types'

import { MAX_BOX, selectHardWords } from './hardWords'

function item(id: string, word: string, extra: Partial<VocabularyItem> = {}): VocabularyItem {
  return { id, word, partOfSpeech: 'noun', article: 'der', meaningAr: word, level: 'A1', category: 'اختبار', ...extra }
}
function progress(id: string, timesReviewed: number, timesCorrect: number, boxLevel = 0, lastReviewedAt = 1): VocabularyProgress {
  return { vocabularyId: id, timesReviewed, timesCorrect, boxLevel, lastReviewedAt }
}

const vocabulary = [item('a', 'Tisch'), item('b', 'Stuhl'), item('c', 'Lampe', { article: 'die' }), item('d', 'Tisch2', { word: 'Tisch' })]

describe('selectHardWords', () => {
  it('lists a word answered wrong at least twice with most answers wrong', () => {
    const hard = selectHardWords({ vocabularyProgress: { a: progress('a', 4, 1) }, spellingWords: {}, vocabulary })
    expect(hard.map((word) => word.item.id)).toEqual(['a'])
    expect(hard[0]).toMatchObject({ misses: 3, reviews: 4, spellingSlips: 0 })
  })

  it('does not list a word with a single miss, mostly right answers, or a well-retained box', () => {
    const hard = selectHardWords({
      vocabularyProgress: { a: progress('a', 3, 2), b: progress('b', 8, 5), c: progress('c', 6, 1, MAX_BOX + 1) },
      spellingWords: {},
      vocabulary,
    })
    expect(hard).toEqual([])
  })

  it('stops listing a word once its answers turn right', () => {
    const before = selectHardWords({ vocabularyProgress: { a: progress('a', 4, 1) }, spellingWords: {}, vocabulary })
    const after = selectHardWords({ vocabularyProgress: { a: progress('a', 10, 8, 3) }, spellingWords: {}, vocabulary })
    expect(before).toHaveLength(1)
    expect(after).toEqual([])
  })

  it('adds a word that is mistyped repeatedly in dictation, matching its spelling in any case', () => {
    const hard = selectHardWords({ vocabularyProgress: {}, spellingWords: { stuhl: { count: 3 } }, vocabulary })
    expect(hard.map((word) => word.item.id)).toEqual(['b'])
    expect(hard[0].spellingSlips).toBe(3)
  })

  it('ignores a single slip and words the vocabulary does not contain', () => {
    const hard = selectHardWords({ vocabularyProgress: {}, spellingWords: { Stuhl: { count: 1 }, Unbekannt: { count: 9 } }, vocabulary })
    expect(hard).toEqual([])
  })

  it('combines recall misses and spelling slips into one entry, ranked above a recall-only word', () => {
    const hard = selectHardWords({
      vocabularyProgress: { a: progress('a', 4, 1), b: progress('b', 4, 1) },
      spellingWords: { Tisch: { count: 2 } },
      vocabulary,
    })
    expect(hard.map((word) => word.item.id)).toEqual(['a', 'b'])
    expect(hard[0]).toMatchObject({ misses: 3, spellingSlips: 2 })
  })

  it('lists a word taught under two ids once', () => {
    const hard = selectHardWords({ vocabularyProgress: { a: progress('a', 4, 1), d: progress('d', 5, 1) }, spellingWords: {}, vocabulary })
    expect(hard).toHaveLength(1)
    expect(hard[0].item.id).toBe('d')
  })

  it('orders by difficulty, then by most recent, and honours the limit', () => {
    const hard = selectHardWords({
      vocabularyProgress: { b: progress('b', 4, 1, 1, 10), c: progress('c', 4, 1, 1, 20), a: progress('a', 9, 1, 1, 5) },
      spellingWords: {},
      vocabulary,
      limit: 2,
    })
    expect(hard.map((word) => word.item.id)).toEqual(['a', 'c'])
  })
})
