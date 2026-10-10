import { getModulesForLevel } from '@/lib/curriculum'
import { CEFR_LEVELS } from '@/types'
import type { CEFRLevel, Exercise } from '@/types'

const QUESTIONS_PER_LEVEL = 6
const CHECKPOINT_COUNT = 3
/** Only auto-gradable, unambiguous types belong in a placement test — no typing/ordering judgment calls. */
const ELIGIBLE_TYPES: Exercise['type'][] = ['multiple-choice', 'true-false', 'vocab-recall']

/**
 * Levels a placement test can currently route a learner into — i.e. levels
 * with authored content. Derived from the curriculum rather than hardcoded,
 * so this automatically extends once B1/B2 exist.
 */
function getTestableLevels(): CEFRLevel[] {
  return CEFR_LEVELS.filter((level) => getModulesForLevel(level).length > 0)
}

export interface PlacementQuestion {
  exercise: Exercise
  sourceLevel: CEFRLevel
}

/**
 * Picks `CHECKPOINT_COUNT` modules spread evenly across a level (start,
 * middle, end — not just the first few, which would only test the
 * easiest material) and pulls eligible exercises from each one's first
 * lesson.
 */
function sampleQuestionsForLevel(level: CEFRLevel): PlacementQuestion[] {
  const modules = getModulesForLevel(level)
  if (modules.length === 0) return []

  const checkpointCount = Math.min(CHECKPOINT_COUNT, modules.length)
  const indices = Array.from({ length: checkpointCount }, (_, i) =>
    checkpointCount === 1 ? 0 : Math.round((i * (modules.length - 1)) / (checkpointCount - 1)),
  )
  const uniqueIndices = Array.from(new Set(indices))

  const questions: PlacementQuestion[] = []
  for (const moduleIndex of uniqueIndices) {
    const lesson = modules[moduleIndex]?.lessons[0]
    if (!lesson) continue
    const eligible = lesson.exercises.filter((exercise) => ELIGIBLE_TYPES.includes(exercise.type))
    const perModule = Math.ceil(QUESTIONS_PER_LEVEL / uniqueIndices.length)
    for (const exercise of eligible.slice(0, perModule)) {
      questions.push({ exercise, sourceLevel: level })
    }
  }
  return questions.slice(0, QUESTIONS_PER_LEVEL)
}

/** Builds the full placement test: a spread of questions across every testable level. */
export function buildPlacementTest(): PlacementQuestion[] {
  return getTestableLevels().flatMap((level) => sampleQuestionsForLevel(level))
}

export interface PlacementResponse {
  sourceLevel: CEFRLevel
  correct: boolean
}

export interface PlacementResult {
  recommendedLevel: CEFRLevel
  scoresByLevel: Partial<Record<CEFRLevel, { correct: number; total: number }>>
  /** True when the learner aced every testable level — there's nothing harder to place them into yet. */
  exceedsAvailableContent: boolean
}

const PASS_THRESHOLD = 0.7

/**
 * Recommends a starting level from placement responses. Walks the
 * testable levels from easiest to hardest and recommends the first one
 * the learner did *not* clearly pass — i.e. the first level with material
 * actually worth their time. If they pass everything, recommend the
 * hardest testable level and flag that they've outgrown it.
 */
export function evaluatePlacement(responses: PlacementResponse[]): PlacementResult {
  const testableLevels = getTestableLevels()
  const scoresByLevel: PlacementResult['scoresByLevel'] = {}

  for (const level of testableLevels) {
    const levelResponses = responses.filter((response) => response.sourceLevel === level)
    if (levelResponses.length === 0) continue
    scoresByLevel[level] = {
      correct: levelResponses.filter((response) => response.correct).length,
      total: levelResponses.length,
    }
  }

  for (const level of testableLevels) {
    const score = scoresByLevel[level]
    if (!score) continue
    if (score.correct / score.total < PASS_THRESHOLD) {
      return { recommendedLevel: level, scoresByLevel, exceedsAvailableContent: false }
    }
  }

  const hardestLevel = testableLevels[testableLevels.length - 1]
  return { recommendedLevel: hardestLevel, scoresByLevel, exceedsAvailableContent: true }
}
