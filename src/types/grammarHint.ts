import type { GermanArticle } from './vocabulary'

/** The case a hint explains, when one does. */
export type HintCase = 'Dativ' | 'Akkusativ' | 'Genitiv'

/**
 * A short "why this form?" note attached to a phrase of a German sentence,
 * e.g. `zur Arbeit` (zu + der) or `dem Frühstück` (nach + Dativ).
 */
export interface GrammarHint {
  /** Which rule produced the hint — stable, so tests and analytics can refer to it. */
  ruleId: string
  /** Character offsets into the sentence: `text.slice(start, end) === phrase`. */
  start: number
  end: number
  phrase: string
  /** The formula in one line, written left-to-right (e.g. "zu + der → zur"). */
  formula: string
  grammarCase?: HintCase
  /** Brief Arabic explanation (one or two sentences). Uses the `[[German]]` inline markup. */
  noteAr: string
  /** The noun of the phrase and its article, when the vocabulary knows it and it agrees with the form. */
  noun?: { word: string; article: GermanArticle }
}

/** Looks up the article of a noun (`"Frühstück"` → `"das"`), or `undefined` when it is not known for sure. */
export type ArticleLookup = (noun: string) => GermanArticle | undefined
