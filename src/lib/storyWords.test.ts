import { describe, expect, it } from 'vitest'

import type { VocabularyItem } from '@/types'

import { findStoryWords } from './storyWords'

function item(overrides: Partial<VocabularyItem> & Pick<VocabularyItem, 'word' | 'partOfSpeech'>): VocabularyItem {
  return { id: `voc-${overrides.word}`, meaningAr: 'معنى', level: 'A1', category: 'اختبار', ...overrides }
}

const vocabulary: VocabularyItem[] = [
  item({ word: 'Frühstück', partOfSpeech: 'noun', article: 'das', plural: 'Frühstücke' }),
  item({ word: 'Tisch', partOfSpeech: 'noun', article: 'der', plural: 'Tische' }),
  item({ word: 'Essen', partOfSpeech: 'noun', article: 'das', numberUse: 'none' }),
  item({ word: 'essen', partOfSpeech: 'verb', verb: { present: ['esse', 'isst', 'isst', 'essen', 'esst', 'essen'], praeteritum: 'aß', partizip: 'gegessen', auxiliary: 'haben' } }),
  item({ word: 'aufstehen', partOfSpeech: 'verb', verb: { praeteritum: 'stand', partizip: 'aufgestanden', auxiliary: 'sein', separablePrefix: 'auf' } }),
  item({ word: 'stehen', partOfSpeech: 'verb', verb: { praeteritum: 'stand', partizip: 'gestanden', auxiliary: 'haben' } }),
  item({ word: 'sein', partOfSpeech: 'verb', verb: { present: ['bin', 'bist', 'ist', 'sind', 'seid', 'sind'], praeteritum: 'war', partizip: 'gewesen', auxiliary: 'sein' } }),
  item({ word: 'gesund', partOfSpeech: 'adjective' }),
  item({ word: 'heute', partOfSpeech: 'adverb' }),
  item({ word: 'ich', partOfSpeech: 'pronoun' }),
  item({ word: 'Rad fahren', partOfSpeech: 'phrase' }),
]
const words = (...sentences: string[]) => findStoryWords(sentences, vocabulary).map((word) => word.item.word)

describe('findStoryWords', () => {
  it('finds nouns in singular, plural and with a case ending, once each', () => {
    expect(words('Der Tisch steht im Zimmer.')).toContain('Tisch')
    expect(words('Zwei Tische stehen dort.')).toContain('Tisch')
    expect(words('Der Tisch ist alt. Der Tisch ist neu.')).toEqual(['Tisch'])
  })

  it('counts a word per sentence, not per form', () => {
    const [entry] = findStoryWords(['Der Tisch ist alt.', 'Die Tische sind neu.'], vocabulary)
    expect(entry.count).toBe(2)
  })

  it('finds a conjugated verb, including an irregular one', () => {
    expect(words('Er isst gern Fisch.')).toEqual(['essen'])
  })

  it('does not take a capitalised noun for a verb, nor a verb for a noun', () => {
    expect(words('Wir wollen essen.')).toEqual(['essen'])
    expect(words('Das Essen ist gut.')).toEqual(['Essen'])
  })

  it('finds a separable verb only when its prefix is in the sentence', () => {
    expect(words('Ich stehe um sieben auf.')).toEqual(expect.arrayContaining(['aufstehen']))
    expect(words('Ich stehe am Fenster.')).toEqual(['stehen'])
    expect(words('Ich bin um sieben aufgestanden.')).toEqual(['aufstehen'])
  })

  it('finds a declined adjective', () => {
    expect(words('Das ist gesundes Essen.')).toEqual(expect.arrayContaining(['gesund']))
  })

  it('finds a phrase only when its words stand together', () => {
    expect(words('Wir wollen morgen Rad fahren.')).toEqual(['Rad fahren'])
    expect(words('Das Rad fährt nicht.')).toEqual([])
  })

  it('leaves out pronouns, sein/haben/werden and everything the vocabulary lacks', () => {
    expect(words('Ich bin heute müde.')).toEqual(['heute'])
  })

  it('lists words in the order they first appear', () => {
    expect(words('Heute esse ich am Tisch.')).toEqual(['heute', 'essen', 'Tisch'])
  })

  it('treats the same word taught under two ids as one entry that remembers both ids', () => {
    const twice = [...vocabulary, item({ id: 'voc-tisch-2', word: 'Tisch', partOfSpeech: 'noun', article: 'der', plural: 'Tische' })]
    const [entry] = findStoryWords(['Der Tisch ist alt.'], twice)
    expect(entry.ids).toEqual(['voc-Tisch', 'voc-tisch-2'])
  })
})
