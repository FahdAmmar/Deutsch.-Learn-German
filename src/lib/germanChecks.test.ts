import { describe, expect, it } from 'vitest'

import type { VocabularyItem } from '@/types'

import { buildAmbiguousWords, buildNounIndex, checkArticleAgreement, exampleUsesWord, findLowercaseNouns, tokenize, verbForms } from './germanChecks'

function item(overrides: Partial<VocabularyItem> & Pick<VocabularyItem, 'word' | 'partOfSpeech'>): VocabularyItem {
  return { id: `voc-${overrides.word}`, meaningAr: 'معنى', level: 'A1', category: 'اختبار', ...overrides }
}

const vocabulary: VocabularyItem[] = [
  item({ word: 'Termin', partOfSpeech: 'noun', article: 'der', plural: 'Termine' }),
  item({ word: 'Arzt', partOfSpeech: 'noun', article: 'der', plural: 'Ärzte' }),
  item({ word: 'Arbeit', partOfSpeech: 'noun', article: 'die', numberUse: 'none' }),
  item({ word: 'Kind', partOfSpeech: 'noun', article: 'das', plural: 'Kinder' }),
  item({ word: 'Auto', partOfSpeech: 'noun', article: 'das', plural: 'Autos' }),
  item({ word: 'Eltern', partOfSpeech: 'noun', article: 'die', numberUse: 'only' }),
  item({ word: 'Reise', partOfSpeech: 'noun', article: 'die', plural: 'Reisen' }),
  item({ word: 'reisen', partOfSpeech: 'verb', verb: { praeteritum: 'reiste', partizip: 'gereist', auxiliary: 'sein' } }),
  item({ word: 'essen', partOfSpeech: 'verb', verb: { present: ['esse', 'isst', 'isst', 'essen', 'esst', 'essen'], praeteritum: 'aß', partizip: 'gegessen', auxiliary: 'haben' } }),
  item({ word: 'aufstehen', partOfSpeech: 'verb', verb: { praeteritum: 'stand', partizip: 'aufgestanden', auxiliary: 'sein', separablePrefix: 'auf' } }),
  item({ word: 'Platz nehmen', partOfSpeech: 'phrase' }),
  item({ word: 'gesund', partOfSpeech: 'adjective' }),
]
const nouns = buildNounIndex(vocabulary)
const ambiguous = buildAmbiguousWords(vocabulary)
const articleErrors = (sentence: string) => checkArticleAgreement(sentence, nouns).map((finding) => `${finding.determiner} ${finding.noun}`)

describe('tokenize', () => {
  it('keeps hyphenated compounds whole and ignores punctuation', () => {
    expect(tokenize('Ich fahre mit der U-Bahn, bitte!').map((token) => token.text)).toEqual(['Ich', 'fahre', 'mit', 'der', 'U-Bahn', 'bitte'])
  })
})

describe('checkArticleAgreement', () => {
  it('accepts every article that fits the noun, in every case', () => {
    for (const sentence of ['Der Termin ist wichtig.', 'Ich habe den Termin.', 'Ich komme zum Termin.', 'Ich habe einen Termin.', 'Mein Termin ist heute.', 'Ich gehe zur Arbeit.', 'Das Kind schläft.', 'Ich sehe die Termine.']) {
      expect(articleErrors(sentence), sentence).toEqual([])
    }
  })

  it('catches an article of the wrong gender', () => {
    expect(articleErrors('Ich habe das Termin.')).toEqual(['das Termin'])
    expect(articleErrors('Die Arzt ist nett.')).toEqual(['Die Arzt'])
    expect(articleErrors('Ich habe eine Termin.')).toEqual(['eine Termin'])
  })

  it('catches a contraction of the wrong gender', () => {
    expect(articleErrors('Ich gehe zur Arzt.')).toEqual(['zur Arzt'])
    expect(articleErrors('Ich gehe zum Arbeit.')).toEqual(['zum Arbeit'])
  })

  it('treats plural forms as plural: a plural cannot take "ein"', () => {
    expect(articleErrors('Das sind die Kinder.')).toEqual([])
    expect(articleErrors('Das sind meine Kinder.')).toEqual([])
    expect(articleErrors('Das sind ein Kinder.')).toEqual(['ein Kinder'])
  })

  it('accepts the genitive of a masculine or neuter noun', () => {
    expect(articleErrors('Die Farbe des Autos gefällt mir.')).toEqual([])
    expect(articleErrors('Die Farbe meines Autos gefällt mir.')).toEqual([])
  })

  it('accepts a plural-only noun with its plural article', () => {
    expect(articleErrors('Die Eltern sind da.')).toEqual([])
    expect(articleErrors('Das Eltern sind da.')).toEqual(['Das Eltern'])
  })

  it('judges nothing when an adjective or other word stands between article and noun', () => {
    expect(articleErrors('Ich habe einen guten Termin.')).toEqual([])
  })

  it('does not treat a spelling that is only a possible genitive as a noun (Ei + s = Eis)', () => {
    const withEi = buildNounIndex([item({ word: 'Ei', partOfSpeech: 'noun', article: 'das', plural: 'Eier' })])
    expect(checkArticleAgreement('Ich nehme ein Eis.', withEi)).toEqual([])
  })
})

describe('findLowercaseNouns', () => {
  it('finds a known noun written small in the middle of a sentence', () => {
    expect(findLowercaseNouns('Ich gehe zur arbeit.', nouns, ambiguous)).toEqual(['arbeit'])
    expect(findLowercaseNouns('Er sagt: ich habe einen termin.', nouns, ambiguous)).toEqual(['termin'])
  })

  it('does not mind the first word of a sentence', () => {
    expect(findLowercaseNouns('Arbeit macht Spaß. Termin ist morgen.', nouns, ambiguous)).toEqual([])
  })

  it('leaves alone a small word that is also a verb form of the vocabulary', () => {
    expect(findLowercaseNouns('Am liebsten reise ich mit meiner Familie.', nouns, ambiguous)).toEqual([])
  })

  it('does not call a genitive spelling a noun (abends, morgens)', () => {
    const withAbend = buildNounIndex([item({ word: 'Abend', partOfSpeech: 'noun', article: 'der', plural: 'Abende' })])
    expect(findLowercaseNouns('Ich lese oft abends.', withAbend, new Set())).toEqual([])
  })
})

describe('verbForms', () => {
  it('lists present, Präteritum, Partizip II, imperative and zu-infinitive spellings', () => {
    const forms = verbForms(vocabulary.find((entry) => entry.word === 'aufstehen') as VocabularyItem)
    expect(forms).toEqual(expect.arrayContaining(['aufstehen', 'stehe', 'stehst', 'steht', 'stand', 'aufgestanden', 'aufzustehen']))
  })
})

describe('exampleUsesWord', () => {
  const find = (word: string) => vocabulary.find((entry) => entry.word === word) as VocabularyItem

  it('finds a noun in singular, plural and genitive', () => {
    expect(exampleUsesWord(find('Termin'), 'Ich habe einen Termin.')).toBe(true)
    expect(exampleUsesWord(find('Termin'), 'Die Termine sind wichtig.')).toBe(true)
    expect(exampleUsesWord(find('Auto'), 'Die Farbe des Autos ist rot.')).toBe(true)
  })

  it('rejects an example that does not contain the noun (a compound is not the word)', () => {
    expect(exampleUsesWord(find('Arzt'), 'Ich habe Termine.')).toBe(false)
    expect(exampleUsesWord(find('Arbeit'), 'Das ist eine Arbeitsstelle.')).toBe(false)
  })

  it('finds a conjugated, irregular or separated verb', () => {
    expect(exampleUsesWord(find('essen'), 'Er isst gern Fisch.')).toBe(true)
    expect(exampleUsesWord(find('aufstehen'), 'Ich stehe um sieben auf.')).toBe(true)
    expect(exampleUsesWord(find('essen'), 'Er trinkt gern Wasser.')).toBe(false)
  })

  it('finds a phrase by all its words, in any form', () => {
    expect(exampleUsesWord(find('Platz nehmen'), 'Nehmen Sie bitte Platz!')).toBe(true)
    expect(exampleUsesWord(find('Platz nehmen'), 'Nehmen Sie bitte.')).toBe(false)
  })

  it('finds a declined adjective', () => {
    expect(exampleUsesWord(find('gesund'), 'Das ist gesunde Nahrung.')).toBe(true)
  })
})
