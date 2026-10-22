import { BOX_INTERVAL_DAYS, isDue } from '@/lib/srs'
import type { VocabularyProgress } from '@/types'

export interface BoxSlot {
  /** Leitner box, 0-based. */
  box: number
  /** Days until a word in this box is shown again. */
  intervalDays: number
  count: number
}

export interface BoxDistribution {
  boxes: BoxSlot[]
  /** Words that have been reviewed at least once. */
  total: number
  /** Of those, how many are due for review right now. */
  due: number
}

/** How many reviewed words sit in each Leitner box — the shape of what the learner has memorised. */
export function getBoxDistribution(vocabulary: Readonly<Record<string, VocabularyProgress>>, now: number = Date.now()): BoxDistribution {
  const boxes: BoxSlot[] = BOX_INTERVAL_DAYS.map((intervalDays, box) => ({ box, intervalDays, count: 0 }))
  let total = 0
  let due = 0

  for (const entry of Object.values(vocabulary)) {
    // Entries saved before spaced repetition existed have no box: they count as box 0.
    const box = Math.min(Math.max(entry.boxLevel ?? 0, 0), boxes.length - 1)
    boxes[box].count += 1
    total += 1
    if (isDue(entry.nextReviewAt, now)) due += 1
  }

  return { boxes, total, due }
}
