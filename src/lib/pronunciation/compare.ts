import { numberToGerman } from '@/lib/generators/numbers'

/**
 * Compares what a learner said (as a speech recogniser wrote it down) with what they were asked to say.
 * Pure — no React, no browser. The recogniser is a third party and sometimes writes "3" for "drei" or drops a
 * word, so the comparison reads digits as words, ignores case and punctuation, and says "close" rather than
 * "wrong" for a word one letter away — which is also how a minimal pair (schon / schön) is told apart.
 */

export type WordStatus = 'match' | 'close' | 'wrong' | 'missing'

export interface WordResult {
  /** The word the learner was asked to say. */
  word: string
  status: WordStatus
  /** What was heard in its place; absent for a missing word. */
  heard?: string
}

export interface SpeechComparison {
  /** 0–1: a matched word counts one, a close one half. */
  score: number
  words: WordResult[]
  /** Words that were heard but are not in the target. */
  extra: string[]
}

const PUNCTUATION = /[.,!?;:„“”"'’‚‘()«»–—-]/gu

/** Lowercase, no punctuation, ß as ss, and a number written in digits spelled out. */
export function normalizeWord(word: string): string {
  const cleaned = word.toLowerCase().replace(PUNCTUATION, '').replace(/ß/g, 'ss').trim()
  if (/^\d{1,4}$/.test(cleaned)) return numberToGerman(Number(cleaned))
  return cleaned
}

function tokenize(text: string): string[] {
  return text
    .split(/\s+/)
    .map((word) => word.trim())
    .filter((word) => normalizeWord(word) !== '')
}

/** Edit distance between two words; a distance of 1 is one letter inserted, dropped or changed. */
export function editDistance(a: string, b: string): number {
  const row = Array.from({ length: b.length + 1 }, (_, index) => index)
  for (let i = 1; i <= a.length; i += 1) {
    let diagonal = row[0]
    row[0] = i
    for (let j = 1; j <= b.length; j += 1) {
      const above = row[j]
      row[j] = Math.min(row[j] + 1, row[j - 1] + 1, diagonal + (a[i - 1] === b[j - 1] ? 0 : 1))
      diagonal = above
    }
  }
  return row[b.length]
}

function similarity(target: string, heard: string): WordStatus {
  if (target === heard) return 'match'
  // One letter off in a word of four or more letters is a near miss; in a short word it is a different word.
  return Math.min(target.length, heard.length) >= 4 && editDistance(target, heard) === 1 ? 'close' : 'wrong'
}

const WEIGHT: Record<WordStatus, number> = { match: 1, close: 0.5, wrong: 0, missing: 0 }

/**
 * Aligns the two word lists (so one dropped word does not make every later word wrong), then reads each
 * target word as matched, close, wrong or missing.
 */
export function compareSpeech(target: string, heardText: string): SpeechComparison {
  const targetWords = tokenize(target)
  const heardWords = tokenize(heardText)
  const t = targetWords.map(normalizeWord)
  const h = heardWords.map(normalizeWord)

  // cost[i][j]: cheapest way to align the first i target words with the first j heard words.
  const cost = Array.from({ length: t.length + 1 }, () => new Array<number>(h.length + 1).fill(0))
  for (let i = 0; i <= t.length; i += 1) cost[i][0] = i
  for (let j = 0; j <= h.length; j += 1) cost[0][j] = j
  for (let i = 1; i <= t.length; i += 1) {
    for (let j = 1; j <= h.length; j += 1) {
      const substitution = similarity(t[i - 1], h[j - 1]) === 'wrong' ? 1 : 0
      cost[i][j] = Math.min(cost[i - 1][j] + 1, cost[i][j - 1] + 1, cost[i - 1][j - 1] + substitution)
    }
  }

  const words: WordResult[] = []
  const extra: string[] = []
  let i = t.length
  let j = h.length
  while (i > 0 || j > 0) {
    if (i > 0 && j > 0) {
      const status = similarity(t[i - 1], h[j - 1])
      const step = status === 'wrong' ? 1 : 0
      if (cost[i][j] === cost[i - 1][j - 1] + step) {
        words.push({ word: targetWords[i - 1], status, heard: heardWords[j - 1] })
        i -= 1
        j -= 1
        continue
      }
    }
    if (i > 0 && cost[i][j] === cost[i - 1][j] + 1) {
      words.push({ word: targetWords[i - 1], status: 'missing' })
      i -= 1
    } else {
      extra.push(heardWords[j - 1])
      j -= 1
    }
  }
  words.reverse()
  extra.reverse()

  const score = words.length === 0 ? 0 : words.reduce((sum, entry) => sum + WEIGHT[entry.status], 0) / words.length
  return { score, words, extra }
}

export type SpeechVerdict = 'good' | 'almost' | 'again'

/** What to tell the learner: one miss in a sentence is "almost", and anything above is "again". */
export function verdictFor(comparison: SpeechComparison): SpeechVerdict {
  if (comparison.score >= 0.95 && comparison.extra.length === 0) return 'good'
  return comparison.score >= 0.6 ? 'almost' : 'again'
}

/**
 * The recogniser offers several readings of one utterance; the one closest to the target is the fairest to judge,
 * because the learner said one thing and the recogniser's first guess is only a guess.
 */
export function bestComparison(
  target: string,
  readings: readonly string[],
): { comparison: SpeechComparison; heard: string } {
  const candidates = readings.length > 0 ? readings : ['']
  let best = { comparison: compareSpeech(target, candidates[0]), heard: candidates[0] }
  for (const reading of candidates.slice(1)) {
    const comparison = compareSpeech(target, reading)
    // At an equal score, the reading with fewer words that were not asked for is the closer one.
    const closer =
      comparison.score > best.comparison.score ||
      (comparison.score === best.comparison.score && comparison.extra.length < best.comparison.extra.length)
    if (closer) best = { comparison, heard: reading }
  }
  return best
}
