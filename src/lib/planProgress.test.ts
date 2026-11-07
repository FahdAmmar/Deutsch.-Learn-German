import { describe, expect, it } from 'vitest'

import { getCompletedStepKeys, STORY_PASS_ACCURACY } from './planProgress'

const empty = { lessons: {}, rules: {}, quizzes: {}, dictations: {} }

describe('getCompletedStepKeys', () => {
  it('has nothing done before the learner has done anything', () => {
    expect(getCompletedStepKeys(empty).size).toBe(0)
  })

  it('counts a lesson only once it is completed, not merely opened', () => {
    const done = getCompletedStepKeys({
      ...empty,
      lessons: { 'a1-m01-l01': { lessonId: 'a1-m01-l01', completed: true }, 'a1-m01-l02': { lessonId: 'a1-m01-l02', completed: false } },
    })
    expect([...done]).toEqual(['lesson:a1-m01-l01'])
  })

  it('counts a grammar rule by its roadmap number once it is completed', () => {
    const done = getCompletedStepKeys({ ...empty, rules: { '3': { completed: true }, '4': { completed: false } } })
    expect([...done]).toEqual(['rule:3'])
  })

  it('counts a text once its comprehension quiz is passed, and not before', () => {
    const done = getCompletedStepKeys({
      ...empty,
      quizzes: {
        'a1-read-01': { bestAccuracy: STORY_PASS_ACCURACY },
        'a1-read-02': { bestAccuracy: STORY_PASS_ACCURACY - 0.01 },
      },
    })
    expect(done.has('story:a1-read-01')).toBe(true)
    expect(done.has('story:a1-read-02')).toBe(false)
  })

  it('counts a conversation once its dictation is typed through to the end', () => {
    const done = getCompletedStepKeys({
      ...empty,
      dictations: { 'dialogue-a1-am-telefon': { completed: true }, 'dialogue-a1-im-hotel': { completed: false } },
    })
    expect([...done]).toEqual(['story:dialogue-a1-am-telefon'])
  })

  it('counts a story once even when both its quiz and its dictation are done', () => {
    const done = getCompletedStepKeys({
      ...empty,
      quizzes: { 'a1-read-01': { bestAccuracy: 1 } },
      dictations: { 'a1-read-01': { completed: true } },
    })
    expect(done.size).toBe(1)
  })
})
