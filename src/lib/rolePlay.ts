import { compareSpeech, type SpeechComparison } from '@/lib/pronunciation/compare'
import { withoutSpecialLetters } from '@/lib/spelling'
import type { Story } from '@/types'

/**
 * The logic of playing one side of a conversation: which lines are the learner's, how a typed answer is
 * compared with the line it should be, and how a whole attempt is summed up. Pure — the screen only
 * shows what this decides.
 */

export type Speaker = 'a' | 'b'

export interface RolePlayLine {
  /** Position in the conversation (0-based). */
  index: number
  speaker: Speaker
  name: string
  de: string
  ar: string
}

export interface RolePlayRole {
  speaker: Speaker
  name: string
}

/** The lines of a conversation; none for a reading text, which has no speakers. */
export function getDialogueLines(story: Story): RolePlayLine[] {
  const lines: RolePlayLine[] = []
  for (const block of story.blocks) {
    if (block.type !== 'line') continue
    lines.push({ index: lines.length, speaker: block.speaker, name: block.name, de: block.segment.text, ar: block.ar })
  }
  return lines
}

/** The two parts a learner can take, in the order they first speak. A conversation with one speaker cannot be played as two parts. */
export function getRoles(lines: readonly RolePlayLine[]): RolePlayRole[] {
  const roles: RolePlayRole[] = []
  for (const line of lines) {
    if (!roles.some((role) => role.speaker === line.speaker)) roles.push({ speaker: line.speaker, name: line.name })
  }
  return roles.length === 2 ? roles : []
}

export const isLearnerLine = (line: RolePlayLine, role: Speaker): boolean => line.speaker === role

/** The lines of the learner's part. */
export const learnerLines = (lines: readonly RolePlayLine[], role: Speaker): RolePlayLine[] => lines.filter((line) => isLearnerLine(line, role))

function wordsOf(text: string): string[] {
  return text.split(/\s+/).filter((word) => word !== '')
}

/**
 * A typed answer compared with the line it should be. Case and punctuation do not count, and neither does
 * writing ä as ae or ß as ss — a keyboard without those keys is not a mistake. The words shown are the
 * line's own, with their umlauts, not the spelling used for the comparison.
 */
export function compareTyped(target: string, typed: string): SpeechComparison {
  const comparison = compareSpeech(withoutSpecialLetters(target), withoutSpecialLetters(typed))
  const original = wordsOf(target)
  return { ...comparison, words: comparison.words.map((entry, position) => ({ ...entry, word: original[position] ?? entry.word })) }
}

/** A line counts as done well when nothing in it was missed or added. */
export const isPerfect = (comparison: SpeechComparison): boolean => comparison.score === 1 && comparison.extra.length === 0

export interface TurnResult {
  index: number
  typed: string
  comparison: SpeechComparison
}

export interface RolePlaySummary {
  /** How many of the learner's lines there were, and how many were answered. */
  total: number
  answered: number
  /** Lines with nothing wrong. */
  perfect: number
  /** The mean score of the answered lines, 0–1; 0 when there are none. */
  average: number
}

export function summarize(results: readonly TurnResult[], total: number): RolePlaySummary {
  const perfect = results.filter((result) => isPerfect(result.comparison)).length
  const average = results.length === 0 ? 0 : results.reduce((sum, result) => sum + result.comparison.score, 0) / results.length
  return { total, answered: results.length, perfect, average }
}

/** The first words of a line, as a nudge for a learner who is stuck: the whole line would be the answer. */
export function hintOf(line: string, count = 2): string {
  const words = wordsOf(line)
  const shown = words.length <= count ? words.slice(0, -1) : words.slice(0, count)
  return [...shown, '…'].join(' ')
}
