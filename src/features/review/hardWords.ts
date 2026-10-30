import type { VocabularyItem, VocabularyProgress } from '@/types'

/**
 * A word counts as hard when the learner keeps getting it wrong:
 * - in recall exercises and spaced review: at least {@link MIN_MISSES} wrong answers, fewer than
 *   {@link MAX_ACCURACY} of all answers right, and not yet well retained (Leitner box {@link MAX_BOX} or lower);
 * - in spelling practice (dictation): mistyped at least {@link MIN_SPELLING_SLIPS} times.
 * Nothing is stored for this list: it is read from the progress that already exists, so a word leaves it
 * by itself once its answers turn right — the accuracy rises, the box climbs, the slip count falls to zero.
 */
export const MIN_MISSES = 2
export const MAX_ACCURACY = 0.6
export const MAX_BOX = 2
export const MIN_SPELLING_SLIPS = 2

export interface HardWord {
  item: VocabularyItem
  /** Wrong answers in recall exercises and reviews. */
  misses: number
  /** All recall answers given (right and wrong). */
  reviews: number
  /** Times the word was mistyped in dictation and spelling practice. */
  spellingSlips: number
  /** Higher means harder; the list is ordered by it. */
  score: number
}

interface SelectInput {
  vocabularyProgress: Readonly<Record<string, VocabularyProgress>>
  /** Mistyped words by their spelling, as the spelling store keeps them. */
  spellingWords: Readonly<Record<string, { count: number }>>
  vocabulary: readonly VocabularyItem[]
  limit?: number
}

function dedupeKey(item: VocabularyItem): string {
  return `${item.article ?? ''}|${item.word.toLowerCase()}`
}

function scoreOf(word: Pick<HardWord, 'misses' | 'spellingSlips'>, box: number): number {
  return word.misses * 2 + word.spellingSlips * 2 + (box === 0 ? 1 : 0)
}

export function selectHardWords({ vocabularyProgress, spellingWords, vocabulary, limit = 30 }: SelectInput): HardWord[] {
  const byId = new Map(vocabulary.map((item) => [item.id, item]))
  const found = new Map<string, HardWord>()

  for (const progress of Object.values(vocabularyProgress)) {
    const item = byId.get(progress.vocabularyId)
    if (!item || progress.timesReviewed <= 0) continue
    const misses = Math.max(0, progress.timesReviewed - progress.timesCorrect)
    const accuracy = progress.timesCorrect / progress.timesReviewed
    if (misses < MIN_MISSES || accuracy >= MAX_ACCURACY || (progress.boxLevel ?? 0) > MAX_BOX) continue
    found.set(item.id, { item, misses, reviews: progress.timesReviewed, spellingSlips: 0, score: 0 })
  }

  // A spelling slip belongs to a vocabulary word when the typed target is that word (any case).
  const byWord = new Map<string, VocabularyItem>()
  for (const item of vocabulary) {
    const key = item.word.toLowerCase()
    // Prefer the entry the learner has actually worked with when a word is taught under two ids.
    if (!byWord.has(key) || vocabularyProgress[item.id]) byWord.set(key, item)
  }
  for (const [spelled, entry] of Object.entries(spellingWords)) {
    if (entry.count < MIN_SPELLING_SLIPS) continue
    const item = byWord.get(spelled.trim().toLowerCase())
    if (!item) continue
    const existing = found.get(item.id)
    const reviews = vocabularyProgress[item.id]?.timesReviewed ?? 0
    found.set(item.id, { item, misses: existing?.misses ?? 0, reviews: existing?.reviews ?? reviews, spellingSlips: (existing?.spellingSlips ?? 0) + entry.count, score: 0 })
  }

  // The same word taught under two ids is listed once, under whichever has the higher score.
  const best = new Map<string, HardWord>()
  for (const word of found.values()) {
    const scored = { ...word, score: scoreOf(word, vocabularyProgress[word.item.id]?.boxLevel ?? 0) }
    const key = dedupeKey(word.item)
    const known = best.get(key)
    if (!known || scored.score > known.score) best.set(key, scored)
  }

  return [...best.values()]
    .sort((a, b) => b.score - a.score || (vocabularyProgress[b.item.id]?.lastReviewedAt ?? 0) - (vocabularyProgress[a.item.id]?.lastReviewedAt ?? 0))
    .slice(0, limit)
}
