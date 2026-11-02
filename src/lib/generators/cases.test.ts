import { describe, expect, it } from 'vitest'

import {
  adjectiveEnding,
  allDeterminers,
  articleChangeAr,
  columnOf,
  dativePlural,
  determiner,
  GERMAN_CASES,
  nounForm,
  nounPhrase,
  type Column,
  type DeterminerKind,
  type GermanCase,
} from './cases'

const COLUMNS: readonly Column[] = ['m', 'f', 'n', 'pl']

/** One row per case, in the order m, f, n, pl. */
function row(kind: DeterminerKind, caseName: GermanCase): (string | undefined)[] {
  return COLUMNS.map((column) => determiner(kind, caseName, column))
}

describe('determiner paradigms', () => {
  it('has the definite article in every case', () => {
    expect(row('definite', 'nominativ')).toEqual(['der', 'die', 'das', 'die'])
    expect(row('definite', 'akkusativ')).toEqual(['den', 'die', 'das', 'die'])
    expect(row('definite', 'dativ')).toEqual(['dem', 'der', 'dem', 'den'])
    expect(row('definite', 'genitiv')).toEqual(['des', 'der', 'des', 'der'])
  })

  it('has the indefinite article, which has no plural', () => {
    expect(row('indefinite', 'nominativ')).toEqual(['ein', 'eine', 'ein', undefined])
    expect(row('indefinite', 'akkusativ')).toEqual(['einen', 'eine', 'ein', undefined])
    expect(row('indefinite', 'dativ')).toEqual(['einem', 'einer', 'einem', undefined])
    expect(row('indefinite', 'genitiv')).toEqual(['eines', 'einer', 'eines', undefined])
  })

  it('has kein-, which takes the endings of ein and adds a plural', () => {
    expect(row('negative', 'nominativ')).toEqual(['kein', 'keine', 'kein', 'keine'])
    expect(row('negative', 'akkusativ')).toEqual(['keinen', 'keine', 'kein', 'keine'])
    expect(row('negative', 'dativ')).toEqual(['keinem', 'keiner', 'keinem', 'keinen'])
    expect(row('negative', 'genitiv')).toEqual(['keines', 'keiner', 'keines', 'keiner'])
  })

  it('lists each distinct determiner once', () => {
    expect(allDeterminers('definite').sort()).toEqual(['das', 'dem', 'den', 'der', 'des', 'die'])
    expect(allDeterminers('indefinite').sort()).toEqual(['ein', 'eine', 'einem', 'einen', 'einer', 'eines'])
  })
})

describe('adjective endings', () => {
  it('follows the table after der-words: -e in five cells, -en everywhere else', () => {
    const table = GERMAN_CASES.map((caseName) => COLUMNS.map((column) => adjectiveEnding('definite', caseName, column)))
    expect(table).toEqual([
      ['e', 'e', 'e', 'en'],
      ['en', 'e', 'e', 'en'],
      ['en', 'en', 'en', 'en'],
      ['en', 'en', 'en', 'en'],
    ])
  })

  it('follows the table after ein-words: -er and -es where the article is bare', () => {
    const table = GERMAN_CASES.map((caseName) => COLUMNS.map((column) => adjectiveEnding('indefinite', caseName, column)))
    expect(table).toEqual([
      ['er', 'e', 'es', 'en'],
      ['en', 'e', 'es', 'en'],
      ['en', 'en', 'en', 'en'],
      ['en', 'en', 'en', 'en'],
    ])
  })

  it('gives kein- the endings of ein-', () => {
    for (const caseName of GERMAN_CASES) {
      for (const column of COLUMNS) {
        expect(adjectiveEnding('negative', caseName, column)).toBe(adjectiveEnding('indefinite', caseName, column))
      }
    }
  })
})

describe('nouns', () => {
  const tisch = { word: 'Tisch', article: 'der', plural: 'Tische', genitive: 'Tisches' } as const
  const frau = { word: 'Frau', article: 'die', plural: 'Frauen' } as const

  it('adds -n to a dative plural that does not end in -n or -s', () => {
    expect(dativePlural('Kinder')).toBe('Kindern')
    expect(dativePlural('Tische')).toBe('Tischen')
    expect(dativePlural('Frauen')).toBe('Frauen')
    expect(dativePlural('Autos')).toBe('Autos')
  })

  it('declines a masculine noun through the four cases', () => {
    expect(nounForm(tisch, 'nominativ', 'singular')).toBe('Tisch')
    expect(nounForm(tisch, 'akkusativ', 'singular')).toBe('Tisch')
    expect(nounForm(tisch, 'dativ', 'singular')).toBe('Tisch')
    expect(nounForm(tisch, 'genitiv', 'singular')).toBe('Tisches')
    expect(nounForm(tisch, 'dativ', 'plural')).toBe('Tischen')
  })

  it('leaves a feminine noun unchanged in the genitive', () => {
    expect(nounForm(frau, 'genitiv', 'singular')).toBe('Frau')
  })

  it('refuses a masculine genitive it has no form for, instead of guessing', () => {
    expect(() => nounForm({ word: 'Hund', article: 'der', plural: 'Hunde' }, 'genitiv', 'singular')).toThrow()
  })

  it('writes whole noun phrases', () => {
    expect(nounPhrase(tisch, { kind: 'definite', caseName: 'akkusativ', number: 'singular' })).toBe('den Tisch')
    expect(nounPhrase(tisch, { kind: 'definite', caseName: 'dativ', number: 'plural' })).toBe('den Tischen')
    expect(nounPhrase(frau, { kind: 'indefinite', caseName: 'dativ', number: 'singular' })).toBe('einer Frau')
    expect(nounPhrase(tisch, { kind: 'indefinite', caseName: 'akkusativ', number: 'singular', adjective: 'neu' })).toBe('einen neuen Tisch')
    expect(nounPhrase(tisch, { kind: 'indefinite', caseName: 'nominativ', number: 'singular', adjective: 'neu' })).toBe('ein neuer Tisch')
    expect(nounPhrase(tisch, { kind: 'negative', caseName: 'nominativ', number: 'plural', adjective: 'neu' })).toBe('keine neuen Tische')
    expect(nounPhrase(tisch, { kind: 'indefinite', caseName: 'nominativ', number: 'plural' })).toBeUndefined()
  })

  it('maps gender and number to a column', () => {
    expect(columnOf('m', 'singular')).toBe('m')
    expect(columnOf('f', 'plural')).toBe('pl')
  })

  it('says what the article became', () => {
    expect(articleChangeAr('definite', 'akkusativ', 'm')).toBe('der ← den')
    expect(articleChangeAr('definite', 'akkusativ', 'f')).toContain('لا تتغيّر')
    expect(articleChangeAr('indefinite', 'dativ', 'pl')).toBe('')
  })
})
