import {
  ACCUSATIVE_MASCULINE,
  ACCUSATIVE_PREPOSITIONS,
  CONTRACTIONS,
  DATIVE_FEMININE,
  DATIVE_MASC_NEUT,
  DATIVE_PLURAL,
  DATIVE_PREPOSITIONS,
  FIXED_PHRASES,
  GENITIVE_MASC_NEUT,
  GENITIVE_PREPOSITIONS,
  MOTION_VERB_FORMS,
  NOTE,
  PLURAL_NUMERALS,
  PREPOSITIONAL_VERB_STEMS,
  TWO_WAY_PREPOSITIONS,
} from '@/data/grammarHints'
import { stripMarkup } from '@/lib/richText'
import type { ArticleLookup, GermanArticle, GrammarHint, HintCase } from '@/types'

/**
 * Finds the forms in a German sentence that make a learner ask "why?" — a
 * contraction ("zur Arbeit"), a Dativ article after a preposition ("nach dem
 * Frühstück"), "einen" for a masculine object — and says why, briefly.
 *
 * Deliberately conservative. A hint is produced only when the form can be
 * explained with certainty from the words around it; ambiguous forms get no
 * hint rather than a doubtful one (see `data/grammarHints.ts`).
 */

interface Token {
  word: string
  lower: string
  start: number
  end: number
}

interface Match {
  hint: GrammarHint
  /** Index of the first token after the phrase. */
  next: number
}

const WORD = /\p{L}+(?:[-'’]\p{L}+)*/gu
const WHITESPACE_ONLY = /^\s+$/
const STARTS_UPPERCASE = /^\p{Lu}/u

/** Capitalised words that are not nouns: formal "Sie" and the like. */
const CAPITALISED_NON_NOUNS = new Set([
  'sie', 'ihnen', 'ihr', 'ihre', 'ihren', 'ihrem', 'ihrer', 'ihres', 'ich', 'er', 'es', 'wir', 'du', 'dir', 'dich', 'mir', 'mich', 'man', 'uns', 'euch',
])

/** Words that end like an adjective but cannot sit between an article and its noun. */
const NOT_ADJECTIVES = new Set([
  'eine', 'keine', 'meine', 'deine', 'seine', 'unsere', 'eure', 'diese', 'jede', 'wenn', 'dann', 'denn', 'dass', 'ohne', 'gerne', 'heute', 'morgen', 'neben', 'oben', 'unten', 'immer',
])

const MAX_ADJECTIVES = 2

function tokenize(text: string): Token[] {
  return Array.from(text.matchAll(WORD), (match) => {
    const start = match.index ?? 0
    return { word: match[0], lower: match[0].toLowerCase(), start, end: start + match[0].length }
  })
}

function isNoun(token: Token): boolean {
  return STARTS_UPPERCASE.test(token.word) && token.word.length > 1 && !CAPITALISED_NON_NOUNS.has(token.lower)
}

function isAdjacent(text: string, left: Token, right: Token): boolean {
  return WHITESPACE_ONLY.test(text.slice(left.end, right.start))
}

interface NounPhrase {
  /** Index of the noun token. */
  nounIndex: number
}

/**
 * The noun that follows at `from`, allowing up to two adjectives in between
 * ("im neuen Haus"). Only words with the ending the case demands count as
 * adjectives, and everything has to be written without punctuation between.
 */
function readNounPhrase(text: string, tokens: readonly Token[], from: number, adjectiveEnding: 'en' | 'e'): NounPhrase | undefined {
  let index = from
  for (let adjectives = 0; adjectives <= MAX_ADJECTIVES; adjectives += 1) {
    const token = tokens[index]
    // `from` is always after the determiner, so there is a token before `index` to be adjacent to.
    if (!token || !isAdjacent(text, tokens[index - 1], token)) return undefined
    if (isNoun(token)) return { nounIndex: index }

    const looksLikeAdjective =
      !STARTS_UPPERCASE.test(token.word) && token.word.length >= 4 && token.lower.endsWith(adjectiveEnding) && !NOT_ADJECTIVES.has(token.lower)
    if (!looksLikeAdjective) return undefined
    index += 1
  }
  return undefined
}

/** Looks the noun up as written, then without a Genitiv ending ("Parks" → "Park"). */
function lookupWithGenitive(lookup: ArticleLookup, word: string): GermanArticle | undefined {
  return lookup(word) ?? lookup(word.replace(/e?s$/, ''))
}

function nounInfo(noun: Token, expected: readonly GermanArticle[], lookup: ArticleLookup | undefined, genitive = false): GrammarHint['noun'] {
  if (!lookup) return undefined
  const article = genitive ? lookupWithGenitive(lookup, noun.word) : lookup(noun.word)
  return article && expected.includes(article) ? { word: noun.word, article } : undefined
}

function buildHint(
  text: string,
  ruleId: string,
  first: Token,
  last: Token,
  formula: string,
  noteAr: string,
  grammarCase?: HintCase,
  noun?: GrammarHint['noun'],
): GrammarHint {
  return { ruleId, start: first.start, end: last.end, phrase: text.slice(first.start, last.end), formula, grammarCase, noteAr, noun }
}

interface Context {
  text: string
  tokens: readonly Token[]
  lookup: ArticleLookup | undefined
  /** The sentence has a verb of movement or placing ("gehen", "stellen"). */
  hasMotionVerb: boolean
  /** The sentence has a verb that binds its own preposition ("denken an"). */
  hasPrepositionalVerb: boolean
}

function previousToken(context: Context, index: number): Token | undefined {
  const previous = context.tokens[index - 1]
  return previous && isAdjacent(context.text, previous, context.tokens[index]) ? previous : undefined
}

const COORDINATORS = new Set(['und', 'oder', 'sowie', 'aber', 'sondern'])
const ALL_PREPOSITIONS: readonly string[] = [...DATIVE_PREPOSITIONS, ...ACCUSATIVE_PREPOSITIONS, ...TWO_WAY_PREPOSITIONS, ...GENITIVE_PREPOSITIONS]
const MAX_COORDINATION_DISTANCE = 7

interface Governor {
  /** The word right before the phrase — or, after "und"/"oder", the preposition of the phrase before it. */
  token: Token | undefined
  /** The phrase follows "und"/"oder" and no preposition could be found for it: better to say nothing. */
  unresolved: boolean
}

/**
 * What governs the phrase starting at `index`. Usually the word before it; in
 * "zwischen dem Bad und dem Arbeitszimmer" the second phrase is governed by
 * the preposition of the first.
 */
function governorOf(context: Context, index: number): Governor {
  const previous = previousToken(context, index)
  if (!previous || !COORDINATORS.has(previous.lower)) return { token: previous, unresolved: false }

  for (let position = index - 2; position >= Math.max(0, index - MAX_COORDINATION_DISTANCE); position -= 1) {
    const candidate = context.tokens[position]
    if (!isAdjacent(context.text, candidate, context.tokens[position + 1])) break
    if (ALL_PREPOSITIONS.includes(candidate.lower)) return { token: candidate, unresolved: false }
  }
  return { token: undefined, unresolved: true }
}

// ---- matchers -----------------------------------------------------------------

function matchFixedPhrase(context: Context, index: number): Match | undefined {
  const { text, tokens } = context
  for (const rule of FIXED_PHRASES) {
    const span = tokens.slice(index, index + rule.words.length)
    if (span.length !== rule.words.length) continue

    const matches = span.every((token, position) => {
      if (position > 0 && !isAdjacent(text, span[position - 1], token)) return false
      const expected = rule.words[position]
      // Only the very first word of the sentence may be capitalised differently.
      const capitalisedAtStart = index === 0 && position === 0 && token.word === expected.charAt(0).toUpperCase() + expected.slice(1)
      return token.word === expected || capitalisedAtStart
    })
    if (!matches) continue

    return {
      hint: buildHint(text, `fixed:${rule.id}`, span[0], span[span.length - 1], rule.formula, rule.noteAr, rule.grammarCase),
      next: index + rule.words.length,
    }
  }
  return undefined
}

const CONTRACTION_ARTICLES: Readonly<Record<'dem' | 'der' | 'das', readonly GermanArticle[]>> = {
  dem: ['der', 'das'],
  der: ['die'],
  das: ['das'],
}

function matchContraction(context: Context, index: number): Match | undefined {
  const { text, tokens, lookup } = context
  const token = tokens[index]
  const rule = CONTRACTIONS[token.lower]
  if (!rule || (token.word !== token.lower && index > 0)) return undefined

  // "am" also builds the superlative ("am besten"), so it is only a contraction directly before a noun.
  const following = tokens[index + 1]
  const phrase =
    token.lower === 'am'
      ? following && isAdjacent(text, token, following) && isNoun(following)
        ? { nounIndex: index + 1 }
        : undefined
      : readNounPhrase(text, tokens, index + 1, rule.article === 'das' ? 'e' : 'en')
  if (!phrase) return undefined

  const noun = tokens[phrase.nounIndex]
  return {
    hint: buildHint(
      text,
      'contraction',
      token,
      noun,
      `${rule.preposition} + ${rule.article} → ${token.lower}`,
      rule.noteAr,
      rule.grammarCase,
      nounInfo(noun, CONTRACTION_ARTICLES[rule.article], lookup),
    ),
    next: phrase.nounIndex + 1,
  }
}

/** The token as a lowercase word when it is one of `list`, else `undefined` — e.g. the preposition that comes before. */
function wordIn(list: readonly string[], token: Token | undefined): string | undefined {
  return token !== undefined && list.includes(token.lower) ? token.lower : undefined
}

function matchGenitive(context: Context, index: number): Match | undefined {
  const { text, tokens, lookup } = context
  const token = tokens[index]
  const source = GENITIVE_MASC_NEUT[token.lower]
  if (!source) return undefined

  const phrase = readNounPhrase(text, tokens, index + 1, 'en')
  if (!phrase) return undefined

  const preposition = wordIn(GENITIVE_PREPOSITIONS, governorOf(context, index).token)
  const noun = tokens[phrase.nounIndex]
  return {
    hint: buildHint(
      text,
      'genitive',
      token,
      noun,
      preposition ? `${preposition} + Genitiv → ${token.lower}` : `${source} → ${token.lower} (Genitiv)`,
      preposition ? NOTE.genitiveAfterPreposition(preposition, token.lower, source) : NOTE.genitive(token.lower, source),
      'Genitiv',
      nounInfo(noun, ['der', 'das'], lookup, true),
    ),
    next: phrase.nounIndex + 1,
  }
}

function matchDativeMasculineNeutral(context: Context, index: number): Match | undefined {
  const { text, tokens, lookup } = context
  const token = tokens[index]
  const source = DATIVE_MASC_NEUT[token.lower]
  if (!source) return undefined

  const { token: previous, unresolved } = governorOf(context, index)
  // After a Genitiv or Akkusativ preposition this form cannot be right, so say nothing.
  if (unresolved || wordIn(ACCUSATIVE_PREPOSITIONS, previous) || wordIn(GENITIVE_PREPOSITIONS, previous)) return undefined

  const phrase = readNounPhrase(text, tokens, index + 1, 'en')
  if (!phrase) return undefined

  const dativePreposition = wordIn(DATIVE_PREPOSITIONS, previous)
  const twoWayPreposition = wordIn(TWO_WAY_PREPOSITIONS, previous)

  let formula = `${token.lower} = Dativ`
  let note = NOTE.dativeMasculineNeutral(token.lower)
  if (dativePreposition) {
    formula = `${dativePreposition} + Dativ → ${token.lower}`
    note = NOTE.dativeAfterDativePrep(dativePreposition, token.lower, source)
  } else if (twoWayPreposition) {
    formula = `${twoWayPreposition} + Dativ → ${token.lower}`
    note = NOTE.dativeAfterTwoWay(twoWayPreposition, token.lower, source)
  }

  const noun = tokens[phrase.nounIndex]
  return {
    hint: buildHint(text, 'dative-masc-neut', token, noun, formula, note, 'Dativ', nounInfo(noun, ['der', 'das'], lookup)),
    next: phrase.nounIndex + 1,
  }
}

function matchDativeFeminine(context: Context, index: number): Match | undefined {
  const { text, tokens, lookup } = context
  const token = tokens[index]
  const source = DATIVE_FEMININE[token.lower]
  const previous = governorOf(context, index).token
  const dativePreposition = wordIn(DATIVE_PREPOSITIONS, previous)
  const twoWayPreposition = wordIn(TWO_WAY_PREPOSITIONS, previous)
  const preposition = dativePreposition ?? twoWayPreposition
  // "der", "einer", "meiner"… mean many things; only directly after a preposition are they certainly feminine Dativ.
  if (!source || !preposition) return undefined

  const phrase = readNounPhrase(text, tokens, index + 1, 'en')
  if (!phrase) return undefined

  const note = dativePreposition
    ? NOTE.dativeFeminineAfterDativePrep(preposition, token.lower, source)
    : NOTE.dativeFeminineAfterTwoWay(preposition, token.lower, source)

  const noun = tokens[phrase.nounIndex]
  return {
    hint: buildHint(text, 'dative-feminine', token, noun, `${preposition} + Dativ → ${token.lower}`, note, 'Dativ', nounInfo(noun, ['die'], lookup)),
    next: phrase.nounIndex + 1,
  }
}

/** "den", "meinen"… — Dativ plural, Akkusativ masculine, or neither, depending on what stands before. */
function matchEnForms(context: Context, index: number): Match | undefined {
  const { text, tokens, lookup } = context
  const token = tokens[index]
  const dativePlural = DATIVE_PLURAL[token.lower]
  const accusativeSource = ACCUSATIVE_MASCULINE[token.lower]
  if (!dativePlural && !accusativeSource) return undefined

  const previous = governorOf(context, index).token
  const phrase = readNounPhrase(text, tokens, index + 1, 'en')
  if (!phrase) return undefined
  const noun = tokens[phrase.nounIndex]

  const dativePreposition = wordIn(DATIVE_PREPOSITIONS, previous)
  if (dativePlural && dativePreposition) {
    return {
      hint: buildHint(
        text,
        'dative-plural',
        token,
        noun,
        `${dativePreposition} + Dativ Plural → ${token.lower}`,
        NOTE.dativePlural(dativePreposition, token.lower),
        'Dativ',
      ),
      next: phrase.nounIndex + 1,
    }
  }

  const accusativePreposition = wordIn(ACCUSATIVE_PREPOSITIONS, previous)
  if (accusativeSource && accusativePreposition) {
    return {
      hint: buildHint(
        text,
        'accusative-masculine',
        token,
        noun,
        `${accusativePreposition} + Akkusativ → ${token.lower}`,
        NOTE.accusativeAfterAccusativePrep(accusativePreposition, token.lower, accusativeSource),
        'Akkusativ',
        nounInfo(noun, ['der'], lookup),
      ),
      next: phrase.nounIndex + 1,
    }
  }

  // "den Park" after a two-way preposition is Akkusativ only with a verb of movement and a noun known to be masculine
  // (otherwise it may be a Dativ plural: "in den Ferien").
  const twoWayPreposition = wordIn(TWO_WAY_PREPOSITIONS, previous)
  if (token.lower === 'den' && twoWayPreposition && hasMovement(context)) {
    const masculine = nounInfo(noun, ['der'], lookup)
    if (masculine) {
      return {
        hint: buildHint(
          text,
          'accusative-direction',
          token,
          noun,
          `${twoWayPreposition} + Akkusativ → den`,
          NOTE.accusativeDirectionMasculine(twoWayPreposition, 'den', 'der'),
          'Akkusativ',
          masculine,
        ),
        next: phrase.nounIndex + 1,
      }
    }
    return undefined
  }

  // "einen" has no other reading: it is always masculine Akkusativ.
  if (token.lower === 'einen' && !dativePreposition) {
    const directlyBefore = previousToken(context, index)
    const esGibt = directlyBefore?.lower === 'gibt' || (directlyBefore?.lower === 'es' && tokens[index - 2]?.lower === 'gibt')
    return {
      hint: buildHint(
        text,
        'accusative-masculine',
        token,
        noun,
        'ein → einen (Akkusativ)',
        esGibt ? NOTE.accusativeAfterEsGibt('einen', 'ein') : NOTE.accusativeMasculine('einen', 'ein'),
        'Akkusativ',
        nounInfo(noun, ['der'], lookup),
      ),
      next: phrase.nounIndex + 1,
    }
  }

  return undefined
}

/**
 * The sentence moves something somewhere. The verb may come after the
 * preposition ("Wir sind in die Kantine gegangen"), so its position does not matter.
 */
function hasMovement(context: Context): boolean {
  return context.hasMotionVerb && !context.hasPrepositionalVerb
}

/** "in die Stadt", "auf das Dach": a two-way preposition + die/das after a verb of movement → Akkusativ. */
function matchDirection(context: Context, index: number): Match | undefined {
  const { text, tokens, lookup } = context
  const token = tokens[index]
  if (token.lower !== 'die' && token.lower !== 'das') return undefined

  const preposition = wordIn(TWO_WAY_PREPOSITIONS, governorOf(context, index).token)
  if (!preposition || !hasMovement(context)) return undefined

  const phrase = readNounPhrase(text, tokens, index + 1, 'e')
  if (!phrase) return undefined

  const noun = tokens[phrase.nounIndex]
  const article = token.lower
  return {
    hint: buildHint(
      text,
      'accusative-direction',
      token,
      noun,
      `${preposition} + Akkusativ → ${article}`,
      NOTE.accusativeDirection(preposition, `${preposition} ${text.slice(token.start, noun.end)}`),
      'Akkusativ',
      nounInfo(noun, [article], lookup),
    ),
    next: phrase.nounIndex + 1,
  }
}

/** "seit zwei Monaten": a Dativ preposition + a number puts the plural noun into the Dativ, which ends in -n. */
function matchNumberPlural(context: Context, index: number): Match | undefined {
  const { text, tokens } = context
  const token = tokens[index]
  if (!PLURAL_NUMERALS.includes(token.lower)) return undefined

  const previous = previousToken(context, index)
  if (!previous || !(DATIVE_PREPOSITIONS.includes(previous.lower) || previous.lower === 'vor')) return undefined

  const noun = tokens[index + 1]
  if (!noun || !isAdjacent(text, token, noun) || !isNoun(noun) || !noun.word.endsWith('n')) return undefined

  return {
    hint: buildHint(
      text,
      'dative-number',
      token,
      noun,
      `${previous.lower} + Dativ Plural → ${noun.word}`,
      NOTE.dativePluralNumber(previous.lower, noun.word),
      'Dativ',
    ),
    next: index + 2,
  }
}

const MATCHERS: readonly ((context: Context, index: number) => Match | undefined)[] = [
  matchFixedPhrase,
  matchContraction,
  matchGenitive,
  matchDativeMasculineNeutral,
  matchDativeFeminine,
  matchEnForms,
  matchDirection,
  matchNumberPlural,
]

/**
 * The grammar hints of one sentence (or any short German text), in reading
 * order, never overlapping. `lookupArticle` is optional: with it a hint also
 * names the noun's article ("das Frühstück"), which is what makes "dem" clear.
 */
export function findGrammarHints(text: string, lookupArticle?: ArticleLookup): GrammarHint[] {
  const tokens = tokenize(text)
  const context: Context = {
    text,
    tokens,
    lookup: lookupArticle,
    hasMotionVerb: tokens.some((token) => MOTION_VERB_FORMS.includes(token.lower)),
    hasPrepositionalVerb: tokens.some((token) => PREPOSITIONAL_VERB_STEMS.some((stem) => token.lower.startsWith(stem))),
  }

  const hints: GrammarHint[] = []
  let index = 0
  while (index < tokens.length) {
    let match: Match | undefined
    for (const matcher of MATCHERS) {
      match = matcher(context, index)
      if (match) break
    }
    if (match) {
      hints.push(match.hint)
      index = match.next
    } else {
      index += 1
    }
  }
  return hints
}

export type HintedPart = { type: 'text'; text: string } | { type: 'hint'; text: string; hint: GrammarHint }

/** The text cut into plain runs and hinted phrases, ready to render. Joining the parts gives back `text`. */
export function splitByHints(text: string, hints: readonly GrammarHint[]): HintedPart[] {
  const parts: HintedPart[] = []
  let cursor = 0
  for (const hint of hints) {
    if (hint.start > cursor) parts.push({ type: 'text', text: text.slice(cursor, hint.start) })
    parts.push({ type: 'hint', text: text.slice(hint.start, hint.end), hint })
    cursor = hint.end
  }
  if (cursor < text.length) parts.push({ type: 'text', text: text.slice(cursor) })
  return parts
}

/** The hints as plain text, for a screen reader: "dem Frühstück: …". */
export function describeHints(hints: readonly GrammarHint[]): string {
  return hints.map((hint) => `${hint.phrase}: ${stripMarkup(hint.noteAr)}`).join(' ')
}
