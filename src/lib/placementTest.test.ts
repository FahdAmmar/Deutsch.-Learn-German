import { describe, expect, it } from 'vitest'

import { buildPlacementTest, evaluatePlacement } from './placementTest'

describe('buildPlacementTest', () => {
  it('samples questions from both authored levels (A1 and A2)', () => {
    const questions = buildPlacementTest()
    const levelsSeen = new Set(questions.map((question) => question.sourceLevel))

    expect(levelsSeen.has('A1')).toBe(true)
    expect(levelsSeen.has('A2')).toBe(true)
    expect(levelsSeen.has('B1')).toBe(false)
    expect(levelsSeen.has('B2')).toBe(false)
  })

  it('only includes auto-gradable, unambiguous exercise types', () => {
    const questions = buildPlacementTest()
    const allowedTypes = new Set(['multiple-choice', 'true-false', 'vocab-recall'])

    for (const question of questions) {
      expect(allowedTypes.has(question.exercise.type)).toBe(true)
    }
  })

  it('produces a reasonably short test (not the entire curriculum)', () => {
    const questions = buildPlacementTest()
    expect(questions.length).toBeGreaterThan(0)
    expect(questions.length).toBeLessThanOrEqual(20)
  })

  it('every sampled exercise carries a unique id (safe to key React lists by)', () => {
    const questions = buildPlacementTest()
    const ids = questions.map((question) => question.exercise.id)
    expect(new Set(ids).size).toBe(ids.length)
  })
})

describe('evaluatePlacement', () => {
  it('recommends A1 when the learner fails A1 questions', () => {
    const result = evaluatePlacement([
      { sourceLevel: 'A1', correct: false },
      { sourceLevel: 'A1', correct: false },
      { sourceLevel: 'A1', correct: true },
    ])
    expect(result.recommendedLevel).toBe('A1')
    expect(result.exceedsAvailableContent).toBe(false)
  })

  it('recommends A2 when A1 is passed clearly but A2 is not', () => {
    const result = evaluatePlacement([
      { sourceLevel: 'A1', correct: true },
      { sourceLevel: 'A1', correct: true },
      { sourceLevel: 'A1', correct: true },
      { sourceLevel: 'A2', correct: false },
      { sourceLevel: 'A2', correct: true },
    ])
    expect(result.recommendedLevel).toBe('A2')
  })

  it('recommends the hardest testable level and flags exceedsAvailableContent when everything is passed', () => {
    const result = evaluatePlacement([
      { sourceLevel: 'A1', correct: true },
      { sourceLevel: 'A1', correct: true },
      { sourceLevel: 'A2', correct: true },
      { sourceLevel: 'A2', correct: true },
    ])
    expect(result.recommendedLevel).toBe('A2')
    expect(result.exceedsAvailableContent).toBe(true)
  })

  it('records a correct/total score breakdown per level', () => {
    const result = evaluatePlacement([
      { sourceLevel: 'A1', correct: true },
      { sourceLevel: 'A1', correct: false },
      { sourceLevel: 'A2', correct: true },
    ])
    expect(result.scoresByLevel.A1).toEqual({ correct: 1, total: 2 })
    expect(result.scoresByLevel.A2).toEqual({ correct: 1, total: 1 })
  })

  it('does not include a score entry for a level with no responses', () => {
    const result = evaluatePlacement([{ sourceLevel: 'A1', correct: true }])
    expect(result.scoresByLevel.A2).toBeUndefined()
  })
})
