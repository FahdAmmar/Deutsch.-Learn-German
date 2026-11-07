import type { CEFRLevel } from './cefr'

/**
 * One stop on the plan. A chapter is not only lessons: a grammar rule, a
 * reading text and a conversation each have their place in the order, so the
 * learner meets a rule right after the lesson that needs it and reads the
 * text once the rule behind it is known.
 *
 * - `lesson`: a lesson id (`a1-m03-l01`)
 * - `rule`: a grammar-roadmap rule number (`data/grammar/roadmap.ts`)
 * - `reading`: a reading text id (`a1-read-01`)
 * - `conversation`: a standalone conversation id (`dialogue-a1-am-telefon`)
 */
export type PathStep =
  | { kind: 'lesson'; id: string }
  | { kind: 'rule'; number: number }
  | { kind: 'reading'; id: string }
  | { kind: 'conversation'; id: string }

export type PathStepKind = PathStep['kind']

export interface PathChapter {
  id: string
  titleAr: string
  titleDe: string
  /** One line, in Arabic: what the learner can do once the chapter is finished. */
  goalAr: string
  /**
   * Everything the chapter holds, in learning order. Lessons, rules and stories stay where they are
   * authored; this only sequences them.
   */
  steps: PathStep[]
}

export interface LevelPath {
  level: CEFRLevel
  chapters: PathChapter[]
}
