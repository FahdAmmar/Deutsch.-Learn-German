import { beforeEach, describe, expect, it } from 'vitest'

import { useDictationStore } from './dictationStore'

describe('dictationStore', () => {
  beforeEach(() => {
    useDictationStore.getState().resetDictationProgress()
  })

  it('records a first run as completed with its accuracy and speed', () => {
    useDictationStore.getState().recordRun({ storyId: 'a1-read-01', level: 'A1', accuracy: 0.9, wpm: 12.4 })
    expect(useDictationStore.getState().stories['a1-read-01']).toMatchObject({
      completed: true,
      bestAccuracy: 0.9,
      bestWpm: 12,
      attempts: 1,
    })
  })

  it('keeps the best accuracy and WPM across runs and counts every attempt', () => {
    const { recordRun } = useDictationStore.getState()
    recordRun({ storyId: 's', level: 'A1', accuracy: 0.95, wpm: 20 })
    recordRun({ storyId: 's', level: 'A1', accuracy: 0.8, wpm: 30 })
    expect(useDictationStore.getState().stories.s).toMatchObject({ bestAccuracy: 0.95, bestWpm: 30, attempts: 2 })
  })

  it('clamps out-of-range accuracy and negative speed', () => {
    useDictationStore.getState().recordRun({ storyId: 's', level: 'A2', accuracy: 4, wpm: -3 })
    expect(useDictationStore.getState().stories.s).toMatchObject({ bestAccuracy: 1, bestWpm: 0 })
  })

  it('resets', () => {
    useDictationStore.getState().recordRun({ storyId: 's', level: 'A1', accuracy: 1, wpm: 10 })
    useDictationStore.getState().resetDictationProgress()
    expect(useDictationStore.getState().stories).toEqual({})
  })
})
