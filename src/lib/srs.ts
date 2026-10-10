/**
 * Spaced repetition scheduling for vocabulary review.
 *
 * Uses a Leitner-style box system rather than full SM-2: five boxes with
 * fixed, increasing intervals. A correct answer advances one box (longer
 * gap before the word resurfaces); an incorrect answer drops back to box
 * 0 (reviewed again the next day). This is simpler to reason about and
 * to test than an ease-factor model, while still giving the core benefit
 * of spaced repetition — well-known words are reviewed rarely, shaky ones
 * come back soon.
 */

/** Days until next review, indexed by box level (0–4). */
const INTERVAL_DAYS = [1, 3, 7, 16, 35] as const

export const MAX_BOX_LEVEL = INTERVAL_DAYS.length - 1

const DAY_MS = 24 * 60 * 60 * 1000

export interface SrsSchedule {
  boxLevel: number
  nextReviewAt: number
}

/**
 * Computes the next box level and due date for a vocabulary item after a
 * review. `previousBoxLevel` defaults to 0 for a word reviewed for the
 * first time.
 */
export function computeNextReview(
  previousBoxLevel: number,
  correct: boolean,
  now: number = Date.now(),
): SrsSchedule {
  const boxLevel = correct ? Math.min(previousBoxLevel + 1, MAX_BOX_LEVEL) : 0
  const nextReviewAt = now + INTERVAL_DAYS[boxLevel] * DAY_MS
  return { boxLevel, nextReviewAt }
}

/**
 * Whether a vocabulary item is due for review. A word with no
 * `nextReviewAt` yet (never reviewed) is always due — it's new.
 */
export function isDue(nextReviewAt: number | undefined, now: number = Date.now()): boolean {
  if (nextReviewAt === undefined) return true
  return now >= nextReviewAt
}
