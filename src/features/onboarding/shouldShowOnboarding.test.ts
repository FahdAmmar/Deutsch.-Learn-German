import { describe, expect, it } from 'vitest'

import { shouldShowOnboarding } from './shouldShowOnboarding'

const empty = { lessons: {}, activity: [], vocabulary: {} }

describe('shouldShowOnboarding', () => {
  it('shows for a brand-new learner', () => {
    expect(shouldShowOnboarding(false, empty)).toBe(true)
  })

  it('does not show once it was completed or skipped', () => {
    expect(shouldShowOnboarding(true, empty)).toBe(false)
  })

  it('never shows to someone who already has progress', () => {
    expect(shouldShowOnboarding(false, { ...empty, lessons: { a: { lessonId: 'a', completed: false, accuracy: 0, lastVisitedAt: 1 } } })).toBe(false)
    expect(shouldShowOnboarding(false, { ...empty, activity: [{ id: '1', lessonId: 'a', type: 'lesson-started', timestamp: 1 }] })).toBe(false)
  })
})
