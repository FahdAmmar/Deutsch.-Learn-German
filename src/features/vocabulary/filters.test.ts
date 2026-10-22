import { describe, expect, it } from 'vitest'

import type { VocabularyItem } from '@/types'

import { DEFAULT_FILTERS, filterVocabulary } from './filters'

const word = (id: string, text: string, extra: Partial<VocabularyItem> = {}): VocabularyItem => ({
  id,
  word: text,
  partOfSpeech: 'noun',
  meaningAr: `معنى ${text}`,
  level: 'A1',
  category: 'أساسيات',
  ...extra,
})

const ITEMS: VocabularyItem[] = [
  word('tisch', 'Tisch', { article: 'der' }),
  word('lampe', 'Lampe', { article: 'die', category: 'البيت' }),
  word('buch', 'Buch', { article: 'das' }),
  word('lernen', 'lernen', { partOfSpeech: 'verb' }),
]

const none = new Set<string>()

describe('filterVocabulary', () => {
  it('keeps curriculum order by default', () => {
    expect(filterVocabulary(ITEMS, DEFAULT_FILTERS, { learnedIds: none, savedIds: none }).map((item) => item.id)).toEqual(['tisch', 'lampe', 'buch', 'lernen'])
  })

  it('filters by article, and "none" selects the words that take no article', () => {
    const context = { learnedIds: none, savedIds: none }
    expect(filterVocabulary(ITEMS, { ...DEFAULT_FILTERS, article: 'die' }, context).map((item) => item.id)).toEqual(['lampe'])
    expect(filterVocabulary(ITEMS, { ...DEFAULT_FILTERS, article: 'none' }, context).map((item) => item.id)).toEqual(['lernen'])
  })

  it('finds words by German or Arabic text, ignoring case', () => {
    const context = { learnedIds: none, savedIds: none }
    expect(filterVocabulary(ITEMS, { ...DEFAULT_FILTERS, query: 'TISCH' }, context)).toHaveLength(1)
    expect(filterVocabulary(ITEMS, { ...DEFAULT_FILTERS, query: 'معنى' }, context)).toHaveLength(4)
  })

  it('shows only hand-saved words for the saved filter', () => {
    const result = filterVocabulary(ITEMS, { ...DEFAULT_FILTERS, status: 'saved' }, { learnedIds: none, savedIds: new Set(['buch']) })
    expect(result.map((item) => item.id)).toEqual(['buch'])
  })

  it('"new" leaves out words already taught or saved', () => {
    const result = filterVocabulary(ITEMS, { ...DEFAULT_FILTERS, status: 'new' }, { learnedIds: new Set(['tisch']), savedIds: new Set(['lampe']) })
    expect(result.map((item) => item.id)).toEqual(['buch', 'lernen'])
  })

  it('sorts alphabetically with German collation without mutating the input', () => {
    const result = filterVocabulary(ITEMS, { ...DEFAULT_FILTERS, sort: 'alphabetical' }, { learnedIds: none, savedIds: none })
    expect(result.map((item) => item.id)).toEqual(['buch', 'lampe', 'lernen', 'tisch'])
    expect(ITEMS[0].id).toBe('tisch')
  })

  it('combines filters', () => {
    const result = filterVocabulary(ITEMS, { ...DEFAULT_FILTERS, category: 'البيت', article: 'die' }, { learnedIds: none, savedIds: none })
    expect(result.map((item) => item.id)).toEqual(['lampe'])
  })
})
