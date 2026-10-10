import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { useProgressStore } from './progressStore'

const LESSON = { lessonId: 'lesson-1', moduleId: 'module-1', level: 'A1' as const }

describe('progressStore', () => {
  beforeEach(() => {
    useProgressStore.getState().resetProgress()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('starts with no lessons completed', () => {
    expect(useProgressStore.getState().isLessonCompleted(LESSON.lessonId)).toBe(false)
  })

  it('marks a lesson as started without marking it complete', () => {
    useProgressStore.getState().startLesson(LESSON)

    const state = useProgressStore.getState()
    expect(state.currentLessonId).toBe(LESSON.lessonId)
    expect(state.isLessonCompleted(LESSON.lessonId)).toBe(false)
  })

  it('marks a lesson complete and records its accuracy', () => {
    useProgressStore.getState().completeLesson({ ...LESSON, accuracy: 0.8 })

    const state = useProgressStore.getState()
    expect(state.isLessonCompleted(LESSON.lessonId)).toBe(true)
    expect(state.getLessonAccuracy(LESSON.lessonId)).toBe(0.8)
  })

  it('adds a completion entry to the activity log', () => {
    useProgressStore.getState().completeLesson({ ...LESSON, accuracy: 1 })

    const { activity } = useProgressStore.getState()
    expect(activity).toHaveLength(1)
    expect(activity[0]).toMatchObject({ lessonId: LESSON.lessonId, type: 'lesson-completed' })
  })

  it('tracks vocabulary review counts, including correct vs incorrect answers', () => {
    useProgressStore.getState().recordVocabularyReview('voc-1', true)
    useProgressStore.getState().recordVocabularyReview('voc-1', false)

    const entry = useProgressStore.getState().vocabulary['voc-1']
    expect(entry.timesReviewed).toBe(2)
    expect(entry.timesCorrect).toBe(1)
  })

  it('schedules spaced-repetition state (boxLevel/nextReviewAt) on every vocabulary review', () => {
    useProgressStore.getState().recordVocabularyReview('voc-srs', true)
    const afterCorrect = useProgressStore.getState().vocabulary['voc-srs']
    expect(afterCorrect.boxLevel).toBe(1)
    expect(afterCorrect.nextReviewAt).toBeGreaterThan(Date.now())

    useProgressStore.getState().recordVocabularyReview('voc-srs', false)
    const afterIncorrect = useProgressStore.getState().vocabulary['voc-srs']
    expect(afterIncorrect.boxLevel).toBe(0)
  })

  it('starts a streak at 1 on the first day of activity', () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-08-20T10:00:00'))

    useProgressStore.getState().completeLesson({ ...LESSON, accuracy: 1 })

    expect(useProgressStore.getState().streakDays).toBe(1)
  })

  it('increments the streak on the following consecutive day', () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-08-20T10:00:00'))
    useProgressStore.getState().completeLesson({ ...LESSON, accuracy: 1 })

    vi.setSystemTime(new Date('2026-08-21T09:00:00'))
    useProgressStore.getState().completeLesson({ lessonId: 'lesson-2', moduleId: 'module-1', level: 'A1', accuracy: 1 })

    expect(useProgressStore.getState().streakDays).toBe(2)
  })

  it('does not double-count the streak for a second completion on the same day', () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-08-20T10:00:00'))
    useProgressStore.getState().completeLesson({ ...LESSON, accuracy: 1 })
    useProgressStore.getState().completeLesson({ lessonId: 'lesson-2', moduleId: 'module-1', level: 'A1', accuracy: 1 })

    expect(useProgressStore.getState().streakDays).toBe(1)
  })

  it('resets the streak to 1 after a gap of more than one day', () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-08-20T10:00:00'))
    useProgressStore.getState().completeLesson({ ...LESSON, accuracy: 1 })

    vi.setSystemTime(new Date('2026-08-25T10:00:00'))
    useProgressStore.getState().completeLesson({ lessonId: 'lesson-2', moduleId: 'module-1', level: 'A1', accuracy: 1 })

    expect(useProgressStore.getState().streakDays).toBe(1)
  })

  it('resetProgress clears lessons, vocabulary, and activity', () => {
    useProgressStore.getState().completeLesson({ ...LESSON, accuracy: 1 })
    useProgressStore.getState().recordVocabularyReview('voc-1', true)

    useProgressStore.getState().resetProgress()

    const state = useProgressStore.getState()
    expect(Object.keys(state.lessons)).toHaveLength(0)
    expect(Object.keys(state.vocabulary)).toHaveLength(0)
    expect(state.activity).toHaveLength(0)
    expect(state.streakDays).toBe(0)
  })
})
