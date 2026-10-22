import { beforeEach, describe, expect, it } from 'vitest'

import { useStoryQuizStore } from './storyQuizStore'

describe('storyQuizStore', () => {
  beforeEach(() => useStoryQuizStore.getState().resetStoryQuizProgress())

  it('records a first run', () => {
    useStoryQuizStore.getState().recordRun({ storyId: 's', level: 'A1', accuracy: 0.7 })
    expect(useStoryQuizStore.getState().quizzes.s).toMatchObject({ bestAccuracy: 0.7, attempts: 1 })
  })

  it('keeps the best accuracy and counts every attempt', () => {
    const { recordRun } = useStoryQuizStore.getState()
    recordRun({ storyId: 's', level: 'A1', accuracy: 0.9 })
    recordRun({ storyId: 's', level: 'A1', accuracy: 0.5 })
    expect(useStoryQuizStore.getState().quizzes.s).toMatchObject({ bestAccuracy: 0.9, attempts: 2 })
  })

  it('clamps out-of-range accuracy', () => {
    useStoryQuizStore.getState().recordRun({ storyId: 's', level: 'A2', accuracy: 3 })
    expect(useStoryQuizStore.getState().quizzes.s.bestAccuracy).toBe(1)
  })
})
