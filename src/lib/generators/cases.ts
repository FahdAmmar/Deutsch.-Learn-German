import type { GermanArticle } from '@/types'

/**
 * The case paradigms the drills are made from: which article a noun takes in each case, which ending an
 * adjective takes after it, and how a noun itself changes (dative plural -n, genitive -(e)s).
 *
 * Pure — no React, no data. Every table is a complete, closed set (4 cases × 4 columns) and a test pins
 * each cell, so a typo here cannot reach a learner. Only A1–A2 material lives here: definite and
 * indefinite articles, kein-, and the adjective endings after them (no adjective without an article).
 */

export const GERMAN_CASES = ['nominativ', 'akkusativ', 'dativ', 'genitiv'] as const
export type GermanCase = (typeof GERMAN_CASES)[number]

/** A column of the paradigm: the three genders in the singular, and the plural for all of them. */
export type Column = 'm' | 'f' | 'n' | 'pl'
export type Gender = 'm' | 'f' | 'n'
export type GrammaticalNumber = 'singular' | 'plural'

/** der-words (definite), ein-words (indefinite), and kein- (negative: ein-endings, with a plural). */
export type DeterminerKind = 'definite' | 'indefinite' | 'negative'

type Paradigm<T> = Record<GermanCase, Record<Column, T>>

const NO_PLURAL = undefined

const DEFINITE: Paradigm<string> = {
  nominativ: { m: 'der', f: 'die', n: 'das', pl: 'die' },
  akkusativ: { m: 'den', f: 'die', n: 'das', pl: 'die' },
  dativ: { m: 'dem', f: 'der', n: 'dem', pl: 'den' },
  genitiv: { m: 'des', f: 'der', n: 'des', pl: 'der' },
}

/** `ein` has no plural: a plural noun then stands without an article. */
const INDEFINITE: Paradigm<string | undefined> = {
  nominativ: { m: 'ein', f: 'eine', n: 'ein', pl: NO_PLURAL },
  akkusativ: { m: 'einen', f: 'eine', n: 'ein', pl: NO_PLURAL },
  dativ: { m: 'einem', f: 'einer', n: 'einem', pl: NO_PLURAL },
  genitiv: { m: 'eines', f: 'einer', n: 'eines', pl: NO_PLURAL },
}

const NEGATIVE: Paradigm<string> = {
  nominativ: { m: 'kein', f: 'keine', n: 'kein', pl: 'keine' },
  akkusativ: { m: 'keinen', f: 'keine', n: 'kein', pl: 'keine' },
  dativ: { m: 'keinem', f: 'keiner', n: 'keinem', pl: 'keinen' },
  genitiv: { m: 'keines', f: 'keiner', n: 'keines', pl: 'keiner' },
}

/** Adjective endings after an article that shows the case (der, die, das, den, dem …). */
const ENDING_AFTER_DEFINITE: Paradigm<string> = {
  nominativ: { m: 'e', f: 'e', n: 'e', pl: 'en' },
  akkusativ: { m: 'en', f: 'e', n: 'e', pl: 'en' },
  dativ: { m: 'en', f: 'en', n: 'en', pl: 'en' },
  genitiv: { m: 'en', f: 'en', n: 'en', pl: 'en' },
}

/** After ein- / kein- the ending carries the case wherever the article is bare (ein, ein): -er and -es. */
const ENDING_AFTER_EIN: Paradigm<string> = {
  nominativ: { m: 'er', f: 'e', n: 'es', pl: 'en' },
  akkusativ: { m: 'en', f: 'e', n: 'es', pl: 'en' },
  dativ: { m: 'en', f: 'en', n: 'en', pl: 'en' },
  genitiv: { m: 'en', f: 'en', n: 'en', pl: 'en' },
}

export const CASE_LABEL_AR: Record<GermanCase, string> = {
  nominativ: 'Nominativ (الفاعل)',
  akkusativ: 'Akkusativ (المفعول به المباشر)',
  dativ: 'Dativ (المفعول غير المباشر)',
  genitiv: 'Genitiv (الإضافة)',
}

export const CASE_NAME: Record<GermanCase, string> = {
  nominativ: 'Nominativ',
  akkusativ: 'Akkusativ',
  dativ: 'Dativ',
  genitiv: 'Genitiv',
}

/** The question that finds the case in a sentence. */
export const CASE_QUESTION: Record<GermanCase, string> = {
  nominativ: 'Wer? / Was?',
  akkusativ: 'Wen? / Was?',
  dativ: 'Wem?',
  genitiv: 'Wessen?',
}

export const GENDER_OF_ARTICLE: Record<GermanArticle, Gender> = { der: 'm', die: 'f', das: 'n' }

export function columnOf(gender: Gender, number: GrammaticalNumber): Column {
  return number === 'plural' ? 'pl' : gender
}

/** The determiner in front of a noun; `undefined` where there is none (`ein` in the plural). */
export function determiner(kind: DeterminerKind, caseName: GermanCase, column: Column): string | undefined {
  const table = kind === 'definite' ? DEFINITE : kind === 'indefinite' ? INDEFINITE : NEGATIVE
  return table[caseName][column]
}

/** Every distinct determiner of a kind, across all cases and columns — the pool wrong answers come from. */
export function allDeterminers(kind: DeterminerKind): string[] {
  const forms = new Set<string>()
  for (const caseName of GERMAN_CASES) {
    for (const column of ['m', 'f', 'n', 'pl'] as const) {
      const form = determiner(kind, caseName, column)
      if (form) forms.add(form)
    }
  }
  return [...forms]
}

/** The ending an adjective takes: after der-words, or after ein-words (which includes kein-). */
export function adjectiveEnding(kind: DeterminerKind, caseName: GermanCase, column: Column): string {
  return (kind === 'definite' ? ENDING_AFTER_DEFINITE : ENDING_AFTER_EIN)[caseName][column]
}

/** The four endings an adjective can have in the drills — the options of a multiple-choice question. */
export const ADJECTIVE_ENDINGS = ['e', 'en', 'er', 'es'] as const

// ── Nouns ────────────────────────────────────────────────────────────────────

export interface DeclinableNoun {
  word: string
  article: GermanArticle
  plural: string
  /** The genitive singular of a masculine or neuter noun (Tisches, Kindes). Feminine nouns do not change. */
  genitive?: string
}

/** The dative plural adds -n unless the plural already ends in -n or -s: Kinder → Kindern, Frauen, Autos. */
export function dativePlural(plural: string): string {
  return /[ns]$/.test(plural) ? plural : `${plural}n`
}

export function nounForm(noun: DeclinableNoun, caseName: GermanCase, number: GrammaticalNumber): string {
  if (number === 'plural') return caseName === 'dativ' ? dativePlural(noun.plural) : noun.plural
  if (caseName !== 'genitiv') return noun.word
  const gender = GENDER_OF_ARTICLE[noun.article]
  if (gender === 'f') return noun.word
  if (!noun.genitive) throw new Error(`The genitive of "${noun.word}" is not in the data.`)
  return noun.genitive
}

export interface NounPhraseOptions {
  kind: DeterminerKind
  caseName: GermanCase
  number: GrammaticalNumber
  /** The base form of an adjective (groß), which is declined to fit. */
  adjective?: string
}

/**
 * A noun phrase in full ("den großen Tisch"), or `undefined` where the combination does not exist (an
 * indefinite article in the plural).
 */
export function nounPhrase(noun: DeclinableNoun, { kind, caseName, number, adjective }: NounPhraseOptions): string | undefined {
  const column = columnOf(GENDER_OF_ARTICLE[noun.article], number)
  const article = determiner(kind, caseName, column)
  if (article === undefined) return undefined
  const parts = [article]
  if (adjective) parts.push(adjective + adjectiveEnding(kind, caseName, column))
  parts.push(nounForm(noun, caseName, number))
  return parts.join(' ')
}

/** "der ← den": what the article was in the nominative, and what it became. Empty when nothing changed. */
export function articleChangeAr(kind: DeterminerKind, caseName: GermanCase, column: Column): string {
  const nominative = determiner(kind, 'nominativ', column)
  const form = determiner(kind, caseName, column)
  if (!nominative || !form) return ''
  return nominative === form ? `لا تتغيّر الأداة هنا (${form})` : `${nominative} ← ${form}`
}
