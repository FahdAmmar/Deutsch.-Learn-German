import type { SplitMode } from '@/types'

import { DEFAULT_PHRASE_WORDS, MAX_PHRASE_WORDS, MIN_PHRASE_WORDS } from './limits'

/**
 * Cuts a German text into the parts the learner will memorise and type.
 * Pure — no React, no DOM. Parts are always slices of the learner's own text:
 * nothing is reworded, only whitespace is tidied, so what is typed is exactly
 * what was written.
 */

/**
 * Words whose full stop does not end a sentence. Single letters are handled
 * separately ("z. B.", "d. h.", initials). Words that are also ordinary names
 * or nouns at the end of a sentence (Max, Min …) are deliberately left out.
 */
const ABBREVIATIONS: ReadonlySet<string> = new Set([
  'bzw', 'usw', 'etc', 'ca', 'dr', 'prof', 'nr', 'str', 'hr', 'fr', 'evtl', 'ggf', 'inkl', 'vgl', 'mio', 'mrd', 'tel', 'abb', 'bsp', 'zzgl',
  'z.b', 'd.h', 'u.a', 'u.u', 'i.d.r', 'o.ä', 's.o', 's.u', 'u.v.m', 'u.s.w', 'z.t', 'z.zt',
])

/** A phrase may start with one of these, so a break before them is a natural one. */
const CONJUNCTIONS: ReadonlySet<string> = new Set([
  'und', 'oder', 'aber', 'denn', 'sondern', 'weil', 'dass', 'daß', 'wenn', 'ob', 'als', 'damit', 'obwohl', 'während', 'bevor', 'nachdem', 'bis', 'falls', 'sodass',
])

/** A prepositional phrase ("mit dem Bus", "in Berlin") reads as one unit, so a break just before it is fairly natural. */
const PREPOSITIONS: ReadonlySet<string> = new Set([
  'mit', 'in', 'im', 'auf', 'an', 'am', 'zu', 'zur', 'zum', 'nach', 'bei', 'beim', 'von', 'vom', 'aus', 'für', 'um', 'über', 'unter', 'vor',
  'durch', 'gegen', 'ohne', 'zwischen', 'neben', 'hinter', 'seit', 'wegen',
])

/** Words that cannot end a phrase: they need what follows ("mit | dem Bus", "meine | Familie", "und |"). */
const NEEDS_FOLLOWER: ReadonlySet<string> = new Set([
  ...PREPOSITIONS,
  'und', 'oder', 'aber', 'denn', 'sondern', 'nicht', 'sehr', 'zu',
  'der', 'die', 'das', 'den', 'dem', 'des', 'ein', 'eine', 'einen', 'einem', 'einer', 'eines',
  'kein', 'keine', 'keinen', 'keinem', 'keiner',
  'mein', 'meine', 'meinen', 'meinem', 'meiner', 'dein', 'deine', 'deinen', 'deinem', 'deiner',
  'sein', 'seine', 'seinen', 'seinem', 'seiner', 'ihr', 'ihre', 'ihren', 'ihrem', 'ihrer',
  'unser', 'unsere', 'unseren', 'unserem', 'unserer', 'euer', 'eure',
])

/** Cost of ending a phrase in each situation; the optimiser picks the cheapest way to stay within the limit. */
const BREAK_COST = { punctuation: 0, beforeConjunction: 2, beforePreposition: 3, midPhrase: 8, afterFunctionWord: 20 } as const

const OPENING_PUNCTUATION = /^[„"“«‚'([]+/u

export function countWords(text: string): number {
  return text.split(/\s+/).filter(Boolean).length
}

function clampWords(value: number): number {
  return Math.min(Math.max(Math.round(value), MIN_PHRASE_WORDS), MAX_PHRASE_WORDS)
}

/** Whether the sentence-ending mark found after `before` really ends a sentence. `after` is what follows the whitespace. */
function endsSentence(before: string, mark: string, after: string): boolean {
  if (/[!?]/u.test(mark)) return true

  // "… und dann" — a sentence does not start in lower case.
  const next = after.replace(OPENING_PUNCTUATION, '')[0]
  if (next !== undefined && /\p{Ll}/u.test(next)) return false

  // Only a lone full stop can belong to an abbreviation, an initial or a number.
  if (mark !== '.') return true

  const token = before.split(/\s+/).pop()?.replace(OPENING_PUNCTUATION, '') ?? ''
  // "am 3. Oktober", "der 2. Weltkrieg": an ordinal is far more common than a sentence ending on a digit.
  if (/^\d+$/u.test(token)) return false
  // "z. B.", "d. h.", "J. Müller".
  if (Array.from(token).length === 1 && /\p{L}/u.test(token)) return false
  return !ABBREVIATIONS.has(token.toLowerCase())
}

function splitSentences(paragraph: string): string[] {
  const sentences: string[] = []
  const mark = /([.!?…]+)(["”“»«'’)\]]*)(\s+)/gu
  let start = 0
  let match: RegExpExecArray | null
  while ((match = mark.exec(paragraph)) !== null) {
    const afterMark = match.index + match[0].length
    if (!endsSentence(paragraph.slice(start, match.index), match[1], paragraph.slice(afterMark))) continue
    sentences.push(paragraph.slice(start, match.index + match[1].length + match[2].length).trim())
    start = afterMark
  }
  const rest = paragraph.slice(start).trim()
  if (rest) sentences.push(rest)
  return sentences.filter(Boolean)
}

function tidy(value: string): string {
  return value.replace(/\s+/g, ' ').trim()
}

function splitIntoSentences(text: string): string[] {
  // A blank line ends a paragraph and with it a sentence; a single line break is just a wrapped line.
  return text
    .split(/\n\s*\n/)
    .map(tidy)
    .filter(Boolean)
    .flatMap(splitSentences)
}

function splitIntoLines(text: string): string[] {
  return text.split('\n').map(tidy).filter(Boolean)
}

const bareWord = (word: string) => word.replace(/^[„"“«‚'([]+|[.,;:!?"”“»«')\]]+$/gu, '').toLowerCase()

/** How awkward it is to end a phrase after `words[index]` (lower is better). */
function breakCost(words: readonly string[], index: number): number {
  const word = words[index]
  if (/[,;:]$/u.test(word) || word === '–' || word === '—') return BREAK_COST.punctuation

  const next = words[index + 1]
  const nextWord = next === undefined ? '' : bareWord(next)
  if (CONJUNCTIONS.has(nextWord)) return BREAK_COST.beforeConjunction
  if (NEEDS_FOLLOWER.has(bareWord(word))) return BREAK_COST.afterFunctionWord
  if (PREPOSITIONS.has(nextWord)) return BREAK_COST.beforePreposition
  return BREAK_COST.midPhrase
}

function shortnessCost(length: number): number {
  return length === 1 ? 3 : length === 2 ? 1.5 : 0
}

/**
 * Splits one sentence into phrases of at most `maxWords` words. Chosen by a
 * small optimisation rather than a greedy cut: commas and semicolons are the
 * best places to break, then the word before "und", "weil", "dass" … or before
 * a preposition; a break in the middle of a phrase is a last resort, and a break
 * after an article, preposition or "und" is never chosen when anything else fits. Parts stay balanced and fewer is
 * better, so "Ich lerne Deutsch, weil ich in Berlin arbeiten möchte." breaks
 * at the comma instead of after the sixth word.
 */
function splitIntoPhrases(sentence: string, maxWords: number): string[] {
  const words = sentence.split(' ').filter(Boolean)
  if (words.length <= maxWords) return [sentence]

  const total = words.length
  const cost = new Array<number>(total + 1).fill(Infinity)
  const from = new Array<number>(total + 1).fill(0)
  cost[0] = 0

  for (let end = 1; end <= total; end += 1) {
    for (let length = 1; length <= Math.min(maxWords, end); length += 1) {
      const begin = end - length
      const phraseCost =
        cost[begin] +
        1 +
        (end < total ? breakCost(words, end - 1) : 0) +
        shortnessCost(length) +
        0.15 * (maxWords - length) ** 2
      if (phraseCost < cost[end]) {
        cost[end] = phraseCost
        from[end] = begin
      }
    }
  }

  const phrases: string[] = []
  for (let end = total; end > 0; end = from[end]) phrases.unshift(words.slice(from[end], end).join(' '))
  return phrases
}

/** The parts of `text`, in order. Never empty strings; an empty or whitespace-only text gives no parts. */
export function splitText(text: string, mode: SplitMode, maxWords: number = DEFAULT_PHRASE_WORDS): string[] {
  const normalised = text.replace(/\r\n?/g, '\n')
  switch (mode) {
    case 'lines':
      return splitIntoLines(normalised)
    case 'sentences':
      return splitIntoSentences(normalised)
    case 'phrases': {
      const limit = clampWords(maxWords)
      return splitIntoSentences(normalised).flatMap((sentence) => splitIntoPhrases(sentence, limit))
    }
  }
}
