import type { WritingRegister, WritingTask } from '@/types'

/** Lower case, and umlauts and ß written out (ä→ae, ö→oe, ü→ue, ß→ss), so "Grüße" and "Gruesse" are the same text. */
export function normalizeForMatch(text: string): string {
  return text.toLowerCase().replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss')
}

/** Words as a learner counts them: pieces separated by spaces that contain a letter or a digit. */
export function countWords(text: string): number {
  return text.split(/\s+/).filter((piece) => /[\p{L}\p{N}]/u.test(piece)).length
}

const GREETING: Record<WritingRegister, RegExp> = {
  informal: /^\s*(hallo|hi|hey|liebe[rn]?|guten (tag|morgen|abend))\b/,
  formal: /^\s*(sehr geehrte[rn]?|guten (tag|morgen|abend))\b/,
}

/** A formal text ends with a formal closing; a message to a friend may end in many ways, so it accepts the usual ones. */
const CLOSING: Record<WritingRegister, RegExp> = {
  informal: /gruesse|gruss|bis (bald|dann|morgen|zum)|tschues|alles gute/,
  formal: /mit freundlichen gruessen|mit freundlichem gruss|hochachtungsvoll/,
}

export interface PointCheck {
  id: string
  /** A pattern for this point matched the text. */
  found: boolean
  /** The learner confirmed the point by hand. */
  confirmed: boolean
}

export interface WritingCheck {
  words: number
  enoughWords: boolean
  greeting: boolean
  closing: boolean
  points: PointCheck[]
  /** Every point is found or confirmed. */
  allPointsCovered: boolean
}

/**
 * Looks for the things a text of this kind needs: a greeting, a closing, every point and enough words.
 * It checks only what can be checked from the letters — it does not judge grammar or style, and a text
 * that says a point in other words simply is not "found". The learner can confirm such a point by hand.
 */
export function checkWriting(task: WritingTask, text: string, confirmedPointIds: readonly string[] = []): WritingCheck {
  const normalized = normalizeForMatch(text)
  const words = countWords(text)
  const points = task.points.map((point): PointCheck => {
    const found = point.patterns.some((pattern) => new RegExp(pattern).test(normalized))
    return { id: point.id, found, confirmed: confirmedPointIds.includes(point.id) }
  })

  return {
    words,
    enoughWords: words >= task.minWords,
    greeting: GREETING[task.register].test(normalized),
    closing: CLOSING[task.register].test(normalized),
    points,
    allPointsCovered: points.every((point) => point.found || point.confirmed),
  }
}
