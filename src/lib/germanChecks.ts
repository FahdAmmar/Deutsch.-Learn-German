import type { GermanArticle, VocabularyItem } from '@/types'

import { parseInfinitive, presentForms } from './verbs'

/**
 * Mechanical checks on German sentences, used by the content-quality suite.
 *
 * They catch the mistakes a reviewer's eye slides over — a noun written with a small letter, an article
 * that cannot belong to the noun after it, an "example" that never uses its word. They are deliberately
 * conservative: a sentence is only reported when the evidence is unambiguous (the determiner stands
 * directly in front of the noun), so a finding is almost always a real error. What they cannot see
 * (case endings after an adjective, idiom, register) still needs the human review in `lesson-authoring`.
 */

export interface Token {
  text: string
  start: number
  end: number
}

/** Words, with hyphenated compounds (E-Mail, U-Bahn) kept whole. */
const WORD = /\p{L}+(?:-\p{L}+)*/gu

export function tokenize(sentence: string): Token[] {
  return Array.from(sentence.matchAll(WORD), (match) => ({
    text: match[0],
    start: match.index ?? 0,
    end: (match.index ?? 0) + match[0].length,
  }))
}

// ── Nouns ────────────────────────────────────────────────────────────────────

export interface NounReading {
  article: GermanArticle
  plural: boolean
  /** The genitive singular of a masculine or neuter noun (des Tisches, meines Autos): -s / -es is added to the noun. */
  genitive?: boolean
}

/** Every noun surface form (singular and plural) → the readings it can have. */
export type NounIndex = ReadonlyMap<string, readonly NounReading[]>

function pluralForms(plural: string | undefined): string[] {
  if (!plural) return []
  return plural
    .split(/[/,]/)
    .map((form) => form.replace(/\(.*?\)/g, '').trim())
    .filter((form) => form && !form.includes(' ') && form !== '–' && form !== '-')
}

export function buildNounIndex(vocabulary: readonly VocabularyItem[]): NounIndex {
  const index = new Map<string, NounReading[]>()
  const add = (surface: string, reading: NounReading) => {
    const readings = index.get(surface) ?? []
    if (!readings.some((known) => known.article === reading.article && known.plural === reading.plural && known.genitive === reading.genitive)) readings.push(reading)
    index.set(surface, readings)
  }
  for (const item of vocabulary) {
    if (item.partOfSpeech !== 'noun' || !item.article || item.word.includes(' ')) continue
    if (item.numberUse === 'only') {
      add(item.word, { article: 'die', plural: true })
      continue
    }
    add(item.word, { article: item.article, plural: false })
    for (const form of pluralForms(item.plural)) add(form, { article: 'die', plural: true })
    if (item.article !== 'die') {
      add(`${item.word}s`, { article: item.article, plural: false, genitive: true })
      add(`${item.word}es`, { article: item.article, plural: false, genitive: true })
    }
  }
  return index
}

// ── Determiners ──────────────────────────────────────────────────────────────

const DEFINITE: Record<GermanArticle, readonly string[]> = {
  der: ['der', 'den', 'dem', 'des'],
  die: ['die', 'der'],
  das: ['das', 'dem', 'des'],
}
const PLURAL_DEFINITE = ['die', 'der', 'den'] as const

/** `ein`-words: the indefinite article, kein, and the possessives. */
const EIN_STEMS = ['ein', 'kein', 'mein', 'dein', 'sein', 'ihr', 'unser', 'euer'] as const
const EIN_ENDINGS: Record<GermanArticle, readonly string[]> = {
  der: ['', 'en', 'em', 'es'],
  die: ['e', 'er'],
  das: ['', 'em', 'es'],
}
const EIN_PLURAL_ENDINGS = ['e', 'er', 'en'] as const

/** Preposition + article contractions, and the genders they can stand for. */
const CONTRACTIONS: Record<string, readonly GermanArticle[]> = {
  im: ['der', 'das'],
  am: ['der', 'das'],
  zum: ['der', 'das'],
  beim: ['der', 'das'],
  vom: ['der', 'das'],
  zur: ['die'],
  ins: ['das'],
  ans: ['das'],
  aufs: ['das'],
  fürs: ['das'],
  ums: ['das'],
}

function einForm(stem: string, ending: string): string {
  // euer drops its inner e before an ending: euer, eure, euren.
  return stem === 'euer' && ending ? `eur${ending}` : `${stem}${ending}`
}

/** The determiners that may stand directly in front of a noun with this reading. */
function allowedDeterminers(reading: NounReading): Set<string> {
  const allowed = new Set<string>()
  if (reading.genitive) {
    allowed.add('des')
    for (const stem of EIN_STEMS) allowed.add(einForm(stem, 'es'))
    return allowed
  }
  if (reading.plural) {
    for (const form of PLURAL_DEFINITE) allowed.add(form)
    for (const stem of EIN_STEMS) {
      if (stem === 'ein') continue // there is no plural of "ein"
      for (const ending of EIN_PLURAL_ENDINGS) allowed.add(einForm(stem, ending))
    }
    return allowed
  }
  for (const form of DEFINITE[reading.article]) allowed.add(form)
  for (const stem of EIN_STEMS) for (const ending of EIN_ENDINGS[reading.article]) allowed.add(einForm(stem, ending))
  for (const [contraction, genders] of Object.entries(CONTRACTIONS)) if (genders.includes(reading.article)) allowed.add(contraction)
  return allowed
}

/** Every word that can be a determiner for some noun — if the word before a noun is not one of these, nothing is checked. */
const ALL_DETERMINERS: ReadonlySet<string> = (() => {
  const all = new Set<string>()
  for (const article of ['der', 'die', 'das'] as const) {
    for (const plural of [false, true]) for (const form of allowedDeterminers({ article, plural })) all.add(form)
    for (const form of allowedDeterminers({ article, plural: false, genitive: true })) all.add(form)
  }
  return all
})()

export interface ArticleFinding {
  noun: string
  determiner: string
  /** What would be correct for the noun's gender, e.g. "der/den/dem/des". */
  expected: string
}

/** Articles that cannot belong to the noun right after them, e.g. "das Termin" or "zur Arzt". */
export function checkArticleAgreement(sentence: string, nouns: NounIndex): ArticleFinding[] {
  const tokens = tokenize(sentence)
  const findings: ArticleFinding[] = []
  for (let position = 1; position < tokens.length; position += 1) {
    const readings = nouns.get(tokens[position].text)
    // A surface that is only a possible genitive (Ei + s = Eis) may be another word altogether: nothing to judge.
    if (!readings || readings.every((reading) => reading.genitive)) continue
    const previous = tokens[position - 1]
    // Only a determiner standing directly in front of the noun is evidence.
    if (sentence.slice(previous.end, tokens[position].start).trim() !== '') continue
    const determiner = previous.text.toLowerCase()
    if (!ALL_DETERMINERS.has(determiner)) continue
    const allowed = new Set<string>()
    for (const reading of readings) for (const form of allowedDeterminers(reading)) allowed.add(form)
    if (allowed.has(determiner)) continue
    findings.push({
      noun: tokens[position].text,
      determiner: previous.text,
      expected: readings.map((reading) => (reading.plural ? 'die (plural)' : reading.genitive ? `${reading.article} (genitive)` : reading.article)).join(' / '),
    })
  }
  return findings
}

// ── Capitalisation ───────────────────────────────────────────────────────────

/** A token that begins a sentence (or a quotation), where a capital is expected whatever the word is. */
export function startsSentence(sentence: string, token: Token): boolean {
  const before = sentence.slice(0, token.start).trimEnd()
  return before === '' || /[.!?:…„“"«»(]$/u.test(before)
}

/**
 * Nouns written with a small initial in the middle of a sentence ("ich gehe zur arbeit").
 * `ambiguous` holds lower-case words that are also something else (essen, reise, frage), which cannot be judged.
 */
export function findLowercaseNouns(sentence: string, nouns: NounIndex, ambiguous: ReadonlySet<string>): string[] {
  const found: string[] = []
  for (const token of tokenize(sentence)) {
    const first = token.text[0]
    if (first === first.toUpperCase() || startsSentence(sentence, token)) continue
    const capitalised = `${first.toUpperCase()}${token.text.slice(1)}`
    // A genitive spelling (Abend + s) does not make `abends` a noun: it is also the adverb "in the evening".
    const isNoun = nouns.get(capitalised)?.some((reading) => !reading.genitive) ?? false
    if (isNoun && !ambiguous.has(token.text)) found.push(token.text)
  }
  return found
}

/** Lower-case words that look like a noun in small letters but are a verb form, adjective or other word of the vocabulary. */
export function buildAmbiguousWords(vocabulary: readonly VocabularyItem[]): Set<string> {
  const words = new Set<string>()
  for (const item of vocabulary) {
    if (item.partOfSpeech === 'noun') continue
    for (const part of item.word.split(/\s+/)) words.add(part.toLowerCase())
    if (item.partOfSpeech !== 'verb') continue
    for (const form of verbForms(item)) words.add(form)
  }
  return words
}

// ── Does an example really use its word? ─────────────────────────────────────

/** Every spelling a verb takes in a sentence: infinitive, present, Präteritum, Partizip II, imperative, zu-infinitive. */
export function verbForms(item: VocabularyItem): string[] {
  const parsed = parseInfinitive(item)
  const infinitive = item.word.trim().split(/\s+/).find((part) => part !== 'sich') ?? item.word
  const present = presentForms(item)
  const forms = new Set<string>([infinitive, ...present, parsed.verb])
  if (item.verb?.praeteritum) forms.add(item.verb.praeteritum)
  if (item.verb?.partizip) forms.add(item.verb.partizip)
  // du-imperative: the ich-form without its final e (lerne → lern), plus the e-form itself and the ihr-form.
  const ich = present[0]
  if (ich) {
    forms.add(ich.endsWith('e') ? ich.slice(0, -1) : ich)
    forms.add(ich)
  }
  forms.add(present[4])
  if (parsed.prefix) forms.add(`${parsed.prefix}zu${parsed.verb}`)
  return Array.from(forms, (form) => form.toLowerCase())
}

export function nounSurfaces(item: VocabularyItem): string[] {
  const surfaces = new Set<string>([item.word, ...pluralForms(item.plural)])
  for (const form of [...surfaces]) {
    // genitive singular (-s, -es) and dative plural (-n) are spellings of the same noun
    surfaces.add(`${form}s`)
    surfaces.add(`${form}es`)
    surfaces.add(`${form}n`)
    surfaces.add(`${form}en`)
  }
  return [...surfaces]
}

/** Verbs whose forms are too irregular to match by stem; a phrase containing one is judged by its other words. */
const IRREGULAR_PARTS = new Set(['haben', 'sein', 'werden', 'sich'])

/** Whether some token is this word, a declined/conjugated form of it, or shares its stem. */
function tokenMatches(part: string, lowered: readonly string[]): boolean {
  const stem = part.length > 4 ? part.slice(0, part.length - 2) : part
  return lowered.some((token) => token === part || token.startsWith(part) || token.startsWith(stem))
}

/** Whether a vocabulary item's own example sentence actually contains the item (in some form). */
export function exampleUsesWord(item: VocabularyItem, sentence: string): boolean {
  const tokens = tokenize(sentence).map((token) => token.text)
  const lowered = tokens.map((token) => token.toLowerCase())
  if (item.partOfSpeech === 'noun' && item.article && !item.word.includes(' ')) {
    const surfaces = new Set(nounSurfaces(item))
    return tokens.some((token) => surfaces.has(token))
  }
  if (item.partOfSpeech === 'noun' && item.word.includes('/')) {
    // "Lehrer / Lehrerin": the example may use either form, in any case
    const variants = item.word.split('/').map((variant) => variant.trim().toLowerCase()).filter(Boolean)
    return lowered.some((token) => variants.some((variant) => token === variant || token === `${variant}n` || token === `${variant}s`))
  }
  if (item.partOfSpeech === 'verb' && !item.word.replace(/^sich /, '').includes(' ')) {
    const forms = new Set(verbForms(item))
    return lowered.some((token) => forms.has(token))
  }
  // A phrase ("Platz nehmen", "so ... wie", "spazieren gehen"): every word of it must be there, in some form.
  const parts = item.word
    .toLowerCase()
    .split(/\s*(?:\.{2,}|…|\/|\s)\s*/u)
    .map((part) => part.replace(/[^\p{L}-]/gu, ''))
    .filter((part) => part && !IRREGULAR_PARTS.has(part))
  return parts.length > 0 && parts.every((part) => tokenMatches(part, lowered))
}
