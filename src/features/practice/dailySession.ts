import { buildVocabRecallExercise } from '@/features/review/buildVocabRecallExercise'
import { getDueVocabulary } from '@/features/review/selectors'
import type { AnswerCounter, Exercise, ProgressState } from '@/types'
import { shuffle } from '@/utils/shuffle'

import { buildWeakSpotSession } from './sessions'

/** The least and the most questions one daily session holds, whatever the goal: a goal of 100 is spread over the day. */
export const DAILY_MIN = 5
export const DAILY_MAX = 20

/** The share of the session given to words due for review, and to the topics the learner is weakest in. */
const DUE_SHARE = 0.5
const WEAK_SHARE = 0.3

export interface DailySessionInput {
  progress: Pick<ProgressState, 'lessons' | 'vocabulary'> & Partial<Pick<ProgressState, 'savedVocabularyIds'>>
  byModule: Readonly<Record<string, AnswerCounter>>
  /** The learner's daily goal, in questions. */
  goal: number
  /** Questions from the lessons of the level being studied: they fill what review and weak spots do not. */
  levelExercises: readonly Exercise[]
}

export interface DailySession {
  exercises: Exercise[]
  /** How the session is made up, for telling the learner what is in it. */
  due: number
  weak: number
  fresh: number
}

/** How many questions today's session holds. */
export function dailySessionSize(goal: number): number {
  return Math.min(Math.max(Math.round(goal), DAILY_MIN), DAILY_MAX)
}

/**
 * One session for the day, in three parts and in this order: words due for spaced repetition (so what is
 * about to be forgotten comes first), then questions from the topics the learner gets wrong most, then new
 * questions from the level's lessons. A part that has nothing to give leaves its room to the next, so the
 * session is as long as the goal asks whenever the level has enough questions. No question appears twice.
 */
export function buildDailySession({ progress, byModule, goal, levelExercises }: DailySessionInput): DailySession {
  const size = dailySessionSize(goal)
  const due = getDueVocabulary(progress, Math.ceil(size * DUE_SHARE)).map(buildVocabRecallExercise)

  const weak = buildWeakSpotSession(byModule, Math.floor(size * WEAK_SHARE)).exercises.slice(0, size - due.length)
  const used = new Set(weak.map((exercise) => exercise.id))

  const fresh = shuffle(levelExercises.filter((exercise) => !used.has(exercise.id))).slice(0, Math.max(0, size - due.length - weak.length))

  return { exercises: [...due, ...weak, ...fresh], due: due.length, weak: weak.length, fresh: fresh.length }
}

/** What today's session is made of, one phrase per non-empty part: "5 للمراجعة", "3 من نقاط ضعفك", "2 جديدة". */
export function dailySessionParts(session: Pick<DailySession, 'due' | 'weak' | 'fresh'>): string[] {
  return [
    session.due > 0 ? `${session.due} للمراجعة` : null,
    session.weak > 0 ? `${session.weak} من نقاط ضعفك` : null,
    session.fresh > 0 ? `${session.fresh} جديدة` : null,
  ].filter((part): part is string => part !== null)
}
