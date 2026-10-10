import type { CEFRLevel } from './cefr'
import type { Exercise } from './exercise'
import type { CommonMistake } from './grammar'

/**
 * Grammar "rules" are the roadmap-ordered, in-depth grammar lessons (the
 * 70 entries of `docs/grammar-roadmap.md`). They are distinct from the
 * short `GrammarTopic` summaries embedded inside curriculum lessons: a
 * rule is a full standalone page (hero → sections → practice → review →
 * quiz → cheat sheet), modelled on the reference lesson designs.
 *
 * All of it is plain typed data. Rendering lives in
 * `src/features/grammar/rule/`.
 *
 * Inline markup allowed inside string fields (parsed by `RichText`, never
 * as HTML):
 *   `**word**`  → emphasised / highlighted
 *   `[[Wort]]`  → an inline German fragment inside Arabic prose (LTR, German font)
 */

/** Semantic colour roles, mapped onto the design tokens — never hex values. */
export type RuleTone = 'primary' | 'accent' | 'plum' | 'highlight' | 'success' | 'error' | 'der' | 'die' | 'das'

export type RuleIcon = 'book' | 'lightbulb' | 'alert' | 'star' | 'link' | 'pencil' | 'check' | 'compass' | 'sparkles'

/** One numbered entry of the grammar roadmap, in the order of the source document. */
export interface GrammarRoadmapEntry {
  /** 1–70, the position in the roadmap. */
  number: number
  level: CEFRLevel
  /** Route slug, `NN-term` (e.g. `03-praesens`). Unique across the whole roadmap. */
  slug: string
  titleAr: string
  termDe: string
}

/* ------------------------------------------------------------------ */
/* Content blocks                                                       */
/* ------------------------------------------------------------------ */

export interface FormulaTag {
  text: string
  tone?: RuleTone
  /** Short Arabic note shown beside the tag. */
  noteAr?: string
}

export interface FormulaBlock {
  kind: 'formula'
  tags: FormulaTag[]
}

export interface RuleBoxBlock {
  kind: 'ruleBox'
  tone: RuleTone
  icon: RuleIcon
  titleAr: string
  bodyAr: string
}

export interface TextBlock {
  kind: 'text'
  paragraphsAr: string[]
}

export interface RuleTableColumn {
  header: string
  /** Language of the cells in this column; German cells are LTR and pronounceable. */
  lang: 'de' | 'ar'
  tone?: RuleTone
}

export interface RuleTableBlock {
  kind: 'table'
  captionAr?: string
  columns: RuleTableColumn[]
  /** Every row must have exactly `columns.length` cells (enforced by the integrity tests). */
  rows: string[][]
  /** Indexes of rows to visually emphasise. */
  emphasisRows?: number[]
}

export interface PatternItem {
  de: string
  ar?: string
}

export interface PatternCard {
  titleAr: string
  subAr?: string
  formula?: string
  tone: RuleTone
  items: PatternItem[]
}

export interface PatternCardsBlock {
  kind: 'patternCards'
  cards: PatternCard[]
}

export interface RuleExample {
  /** German sentence; `**word**` marks the part to highlight. */
  de: string
  ar: string
  noteAr?: string
  /** Small label above the sentence, e.g. "Nominativ". */
  badge?: string
  tone?: RuleTone
}

export interface ExamplesBlock {
  kind: 'examples'
  titleAr?: string
  columns?: 1 | 2
  tone?: RuleTone
  items: RuleExample[]
}

export interface MistakesBlock {
  kind: 'mistakes'
  titleAr?: string
  items: CommonMistake[]
}

export interface DetailsBlock {
  kind: 'details'
  summaryAr: string
  paragraphsAr: string[]
}

export interface SentenceBlock {
  kind: 'sentence'
  tokens: { text: string; role: string }[]
  ar: string
}

export interface CompareMode {
  labelAr: string
  captionAr: string
  parts: { text: string; tone?: RuleTone }[]
}

/** "Try it yourself" toggle: the same sentence shown in two (or more) variants. */
export interface CompareBlock {
  kind: 'compare'
  titleAr: string
  modes: CompareMode[]
}

/** Interactive practice rendered by the shared exercise engine. */
export interface PracticeBlock {
  kind: 'practice'
  titleAr: string
  descriptionAr?: string
  exercises: Exercise[]
}

export type RuleBlock =
  | FormulaBlock
  | RuleBoxBlock
  | TextBlock
  | RuleTableBlock
  | PatternCardsBlock
  | ExamplesBlock
  | MistakesBlock
  | DetailsBlock
  | SentenceBlock
  | CompareBlock
  | PracticeBlock

/* ------------------------------------------------------------------ */
/* Rule                                                                 */
/* ------------------------------------------------------------------ */

export interface RuleSection {
  /** Anchor id, unique within the rule. */
  id: string
  /** Short label in the sticky section navigation. */
  navLabelAr: string
  kickerDe: string
  titleAr: string
  /** Optional German term rendered in the heading's italic accent. */
  titleDe?: string
  introAr: string
  tone: RuleTone
  blocks: RuleBlock[]
}

export interface RuleStat {
  value: string
  labelAr: string
}

export interface RuleFlashcard {
  frontDe: string
  hintAr?: string
  backAr: string
  exampleDe?: string
}

export interface CheatSheetItem {
  /** German pattern, shown LTR. */
  de: string
  /** Arabic meaning / usage note. */
  ar: string
}

export interface GrammarRule {
  /** `gr-NN` — globally unique, used for progress keys. */
  id: string
  number: number
  slug: string
  level: CEFRLevel
  termDe: string
  titleAr: string
  eyebrowAr: string
  taglineAr: string
  stats: RuleStat[]
  heroExample: { de: string; ar: string }
  /** Concrete learning objectives (Arabic). */
  objectivesAr: string[]
  sections: RuleSection[]
  flashcards: RuleFlashcard[]
  /** Final quiz, run by the shared exercise engine. */
  quiz: Exercise[]
  cheatSheet: CheatSheetItem[]
}

/** Per-rule learner progress persisted by `grammarProgressStore`. */
export interface GrammarRuleProgress {
  number: number
  completed: boolean
  bestAccuracy: number
  attempts: number
  lastVisitedAt: number
}
