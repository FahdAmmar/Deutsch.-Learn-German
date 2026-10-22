import type { CEFRLevel } from './cefr'

/** Grammatical gender/article for German nouns. Kept separate from verbs. */
export type GermanArticle = 'der' | 'die' | 'das'

export type PartOfSpeech =
  | 'noun'
  | 'verb'
  | 'adjective'
  | 'adverb'
  | 'pronoun'
  | 'preposition'
  | 'conjunction'
  | 'number'
  | 'interjection'
  | 'phrase'

export interface VocabularyExample {
  /** Authentic German example sentence. */
  de: string
  /** Arabic translation of the example sentence (meaning-based, not word-for-word). */
  ar: string
}

/**
 * How a noun behaves in the plural, when it is not the ordinary case of having one:
 * - `none`: no plural in normal use (der Hunger, die Milch, the months)
 * - `only`: exists only in the plural (die Eltern)
 * - `name`: a festival or name used without an article and without a plural (Weihnachten)
 */
export type NumberUse = 'none' | 'only' | 'name'

export type VerbAuxiliary = 'haben' | 'sein'

/** The six present-tense forms in the order ich, du, er/sie/es, wir, ihr, sie/Sie. */
export type PresentForms = readonly [string, string, string, string, string, string]

/**
 * What a learner needs to use a verb, beyond its infinitive. Everything the
 * regular pattern can produce is derived (see `lib/verbs.ts`), so only the
 * irregular parts are stored. Forms are those of the verb itself: for a
 * separable verb the prefix is stored once in `separablePrefix` and added when shown.
 */
export interface VerbForms {
  /** Complete present tense, only for verbs the regular pattern cannot produce (stem change, sein, haben, the modals). */
  present?: PresentForms
  /** Third person singular Präteritum of the verb itself ("fuhr"; "stand" for aufstehen). Shown from A2 on. Absent where the verb has none (möchten). */
  praeteritum?: string
  /** Partizip II as it is written in full ("gefahren", "aufgestanden"). Absent where the verb has none (möchten). */
  partizip?: string
  /** Absent where the verb forms no Perfekt of its own (möchten). */
  auxiliary?: VerbAuxiliary
  /** The prefix that moves to the end of the clause: "an" in "anrufen". */
  separablePrefix?: string
}

export interface VocabularyItem {
  id: string
  /** The German word or phrase, without the article (nouns store the article separately). */
  word: string
  /** Required for nouns; article taught together with the noun. */
  article?: GermanArticle
  /** Plural form, shown for nouns when it exists / is educationally relevant. */
  plural?: string
  /** Set for a noun that has no ordinary plural; see `NumberUse`. */
  numberUse?: NumberUse
  /** Forms of a verb that cannot be derived from its infinitive. */
  verb?: VerbForms
  partOfSpeech: PartOfSpeech
  /** Arabic meaning of the word. */
  meaningAr: string
  example?: VocabularyExample
  level: CEFRLevel
  category: string
  /** IPA-lite / pronunciation hint shown alongside the audio button, e.g. syllable split. */
  pronunciationHint?: string
}

export type GenderRuleStrength = 'always' | 'mostly'

/**
 * A tendency that helps guess the article of a noun from its ending or its meaning.
 * Content, not UI: the reference list and the drill both read the same data.
 */
export interface GenderRule {
  id: string
  article: GermanArticle
  strength: GenderRuleStrength
  /** What the rule covers, as the learner reads it: "ما ينتهي بـ ‎-ung‎". */
  titleAr: string
  /** Lowercase endings the rule matches in the written word. */
  endings?: readonly string[]
  /** Exact lowercase words the rule covers, for rules that depend on meaning (days, months, weather). */
  words?: readonly string[]
  /** One line that says why it holds or how far it reaches. */
  noteAr?: string
  /** Nouns shown as examples; they carry the rule's article. */
  examples: readonly string[]
  /** Nouns that break the rule, with their real article. */
  exceptions: ReadonlyArray<{ article: GermanArticle; word: string }>
  /** False for a rule the drill cannot apply by looking at the word alone (it needs to know the noun's meaning). */
  drill: boolean
}
