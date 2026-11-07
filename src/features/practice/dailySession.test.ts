import { describe, expect, it } from 'vitest'

import { getLessonsForLevel, getModulesForLevel } from '@/lib/curriculum'
import { MIN_ATTEMPTS } from './sessions'
import type { ProgressState } from '@/types'

import { buildDailySession, DAILY_MAX, DAILY_MIN, dailySessionParts, dailySessionSize } from './dailySession'

const lessons = getLessonsForLevel('A1')
const levelExercises = lessons.flatMap((lesson) => lesson.exercises)

/** Progress in which the first lesson is finished and nothing in it has been reviewed yet: its words are all due. */
function progressWithFirstLessonDone(): Pick<ProgressState, 'lessons' | 'vocabulary'> {
  const first = lessons[0]
  return {
    lessons: { [first.id]: { lessonId: first.id, completed: true, completedAt: '2026-10-01T10:00:00.000Z', exerciseScore: 0, exerciseTotal: 0 } },
    vocabulary: {},
  } as unknown as Pick<ProgressState, 'lessons' | 'vocabulary'>
}

const noProgress: Pick<ProgressState, 'lessons' | 'vocabulary'> = { lessons: {}, vocabulary: {} }

describe('dailySessionSize', () => {
  it('follows the goal, within limits', () => {
    expect(dailySessionSize(10)).toBe(10)
    expect(dailySessionSize(1)).toBe(DAILY_MIN)
    expect(dailySessionSize(100)).toBe(DAILY_MAX)
  })
})

describe('buildDailySession', () => {
  it('is all new questions for someone with no progress and no mistakes', () => {
    const session = buildDailySession({ progress: noProgress, byModule: {}, goal: 10, levelExercises })
    expect(session.exercises).toHaveLength(10)
    expect(session).toMatchObject({ due: 0, weak: 0, fresh: 10 })
  })

  it('opens with words due for review, at most half the session', () => {
    const session = buildDailySession({ progress: progressWithFirstLessonDone(), byModule: {}, goal: 10, levelExercises })
    expect(session.due).toBeGreaterThan(0)
    expect(session.due).toBeLessThanOrEqual(5)
    expect(session.exercises.slice(0, session.due).every((exercise) => exercise.type === 'vocab-recall')).toBe(true)
    expect(session.exercises).toHaveLength(10)
    expect(session.due + session.weak + session.fresh).toBe(session.exercises.length)
  })

  it('adds questions from the weakest topics, after the review words', () => {
    const module = getModulesForLevel('A1')[0]
    const byModule = { [module.id]: { attempts: MIN_ATTEMPTS + 7, correct: 1 } }
    const session = buildDailySession({ progress: progressWithFirstLessonDone(), byModule, goal: 10, levelExercises })
    expect(session.weak).toBeGreaterThan(0)
    expect(session.weak).toBeLessThanOrEqual(3)
    const weakPart = session.exercises.slice(session.due, session.due + session.weak)
    const moduleIds = new Set(module.lessons.flatMap((lesson) => lesson.exercises.map((exercise) => exercise.id)))
    expect(weakPart.every((exercise) => moduleIds.has(exercise.id))).toBe(true)
  })

  it('never asks the same question twice', () => {
    for (let round = 0; round < 20; round += 1) {
      const module = getModulesForLevel('A1')[0]
      const session = buildDailySession({
        progress: progressWithFirstLessonDone(),
        byModule: { [module.id]: { attempts: 10, correct: 2 } },
        goal: 20,
        levelExercises,
      })
      expect(new Set(session.exercises.map((exercise) => exercise.id)).size).toBe(session.exercises.length)
    }
  })

  it('is as short as the level allows when there are few questions', () => {
    const session = buildDailySession({ progress: noProgress, byModule: {}, goal: 10, levelExercises: levelExercises.slice(0, 3) })
    expect(session.exercises).toHaveLength(3)
  })
})

describe('dailySessionParts', () => {
  it('names each part of the session, in the order the session is played', () => {
    expect(dailySessionParts({ due: 5, weak: 3, fresh: 2 })).toEqual(['5 للمراجعة', '3 من نقاط ضعفك', '2 جديدة'])
  })

  it('leaves out the parts that are empty', () => {
    expect(dailySessionParts({ due: 0, weak: 3, fresh: 0 })).toEqual(['3 من نقاط ضعفك'])
    expect(dailySessionParts({ due: 0, weak: 0, fresh: 0 })).toEqual([])
  })
})
