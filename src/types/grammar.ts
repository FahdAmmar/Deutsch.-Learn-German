import type { CEFRLevel } from './cefr'

export interface GrammarExample {
  de: string
  ar: string
  /** Optional word-by-word gloss used to highlight sentence structure, e.g. ['Ich', 'lerne', 'Deutsch']. */
  tokens?: { text: string; role: string }[]
}

export interface GrammarTableRow {
  label: string
  values: string[]
}

export interface GrammarTable {
  caption?: string
  headers: string[]
  rows: GrammarTableRow[]
}

export interface CommonMistake {
  wrong: string
  correct: string
  explanationAr: string
}

export interface AdjectiveComparisonExample {
  sentence: string
  ar: string
}

/** One adjective's three degrees (Positiv / Komparativ / Superlativ), used by the ComparisonLadder component. */
export interface AdjectiveComparison {
  positiv: string
  komparativ: string
  superlativ: string
  meaningAr: string
  /** Whether the comparative/superlative take an Umlaut (a→ä, o→ö, u→ü). */
  hasUmlaut: boolean
  /** Whether this adjective is fully irregular (gut, viel, gern, hoch, nah). */
  irregular?: boolean
  examplePositiv: AdjectiveComparisonExample
  exampleKomparativ: AdjectiveComparisonExample
  exampleSuperlativ: AdjectiveComparisonExample
}

export interface GrammarTopic {
  id: string
  slug: string
  level: CEFRLevel
  titleDe: string
  titleAr: string
  /** Short one-line concept summary in Arabic, shown before the full rule. */
  conceptAr: string
  /** The rule, explained in Arabic. */
  ruleAr: string
  tables?: GrammarTable[]
  examples: GrammarExample[]
  exceptionsAr?: string[]
  commonMistakes?: CommonMistake[]
}
