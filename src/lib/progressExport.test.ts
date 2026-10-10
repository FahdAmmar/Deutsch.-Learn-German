import { describe, expect, it } from 'vitest'

import type { ProgressState } from '@/types'

import { parseProgressImport, serializeProgress } from './progressExport'

const samples: ProgressState = {
  currentLevel: 'A1',
  currentModuleId: 'a1-m01',
  currentLessonId: 'a1-m01-l01',
  lessons: {
    'a1-m01-l01': { lessonId: 'a1-m01-l01', completed: true, accuracy: 0.8, lastVisitedAt: 1000 },
  },
  vocabulary: {
    'voc-1': { vocabularyId: 'voc-1', timesReviewed: 2, timesCorrect: 1, lastReviewedAt: 1000, boxLevel: 1, nextReviewAt: 2000 },
  },
  activity: [{ id: 'activity_1', lessonId: 'a1-m01-l01', type: 'lesson-completed', timestamp: 1000 }],
  streakDays: 3,
  lastActivityDate: '2026-01-01',
}

describe('serializeProgress / parseProgressImport round trip', () => {
  it('serializes then parses back to an equivalent progress state', () => {
    const json = serializeProgress(samples)
    const result = parseProgressImport(json)

    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data).toEqual(samples)
    }
  })

  it('includes a version and export timestamp in the serialized payload', () => {
    const json = serializeProgress(samples)
    const parsed = JSON.parse(json)
    expect(parsed.version).toBe(1)
    expect(typeof parsed.exportedAt).toBe('number')
  })
})

describe('parseProgressImport error handling', () => {
  it('rejects text that is not valid JSON', () => {
    const result = parseProgressImport('not json at all {{{')
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error).toMatch(/JSON/)
    }
  })

  it('rejects valid JSON that does not match the progress schema', () => {
    const result = parseProgressImport(JSON.stringify({ hello: 'world' }))
    expect(result.success).toBe(false)
  })

  it('rejects a payload with an unsupported version', () => {
    const badPayload = { version: 99, exportedAt: Date.now(), progress: samples }
    const result = parseProgressImport(JSON.stringify(badPayload))
    expect(result.success).toBe(false)
  })

  it('rejects a progress object with an invalid CEFR level', () => {
    const badPayload = {
      version: 1,
      exportedAt: Date.now(),
      progress: { ...samples, currentLevel: 'Z9' },
    }
    const result = parseProgressImport(JSON.stringify(badPayload))
    expect(result.success).toBe(false)
  })

  it('accepts vocabulary entries missing boxLevel/nextReviewAt (pre-SRS exports)', () => {
    const legacyPayload = {
      version: 1,
      exportedAt: Date.now(),
      progress: {
        ...samples,
        vocabulary: {
          'voc-1': { vocabularyId: 'voc-1', timesReviewed: 2, timesCorrect: 1, lastReviewedAt: 1000 },
        },
      },
    }
    const result = parseProgressImport(JSON.stringify(legacyPayload))
    expect(result.success).toBe(true)
  })

  it('never throws, even on completely malformed input', () => {
    expect(() => parseProgressImport('')).not.toThrow()
    expect(() => parseProgressImport('null')).not.toThrow()
    expect(() => parseProgressImport('42')).not.toThrow()
  })
})
