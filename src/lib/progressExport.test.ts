import { describe, expect, it } from 'vitest'

import type { ProgressState } from '@/types'

import { parseProgressBackup, parseProgressImport, serializeProgress } from './progressExport'

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

describe('backup with learning statistics', () => {
  const stats = {
    days: { '2026-10-01': { attempts: 4, correct: 3 } },
    byType: { 'multiple-choice': { attempts: 4, correct: 3 } },
    byModule: { 'a1-m01': { attempts: 4, correct: 3 } },
  }

  it('round-trips statistics and hand-saved words', () => {
    const progress = { ...samples, savedVocabularyIds: ['voc-1', 'voc-9'] }
    const result = parseProgressBackup(serializeProgress(progress, stats))

    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.progress.savedVocabularyIds).toEqual(['voc-1', 'voc-9'])
      expect(result.data.stats).toEqual(stats)
    }
  })

  it('still reads a file exported before statistics existed', () => {
    const result = parseProgressBackup(serializeProgress(samples))
    expect(result.success).toBe(true)
    if (result.success) expect(result.data.stats).toBeUndefined()
  })

  it('rejects statistics with an unknown exercise type', () => {
    const broken = JSON.parse(serializeProgress(samples, stats))
    broken.stats.byType = { 'not-a-type': { attempts: 1, correct: 1 } }
    expect(parseProgressBackup(JSON.stringify(broken)).success).toBe(false)
  })
})

describe('backup with the learner’s own data (extras)', () => {
  const myText = {
    id: 'text-1',
    title: 'Mein Tag',
    text: 'Ich lerne Deutsch.',
    mode: 'phrases' as const,
    maxWords: 6,
    createdAt: 1,
    updatedAt: 2,
    attempts: 1,
    bestAccuracy: 0.9,
    bestWpm: 22,
    lastPlayedAt: 3,
    stage: 'copy' as const,
    box: 0,
    dueAt: null,
  }

  it('round-trips the learner’s texts and the other progress stores', () => {
    const extras = {
      myTexts: [myText],
      dictation: { 'a1-reading-1': { storyId: 'a1-reading-1', level: 'A1' as const, completed: true, bestAccuracy: 0.8, bestWpm: 20, attempts: 2, lastPlayedAt: 5 } },
      grammar: { '3': { number: 3, completed: true, bestAccuracy: 1, attempts: 1, lastVisitedAt: 9 } },
      storyQuiz: { 'a1-reading-1': { storyId: 'a1-reading-1', level: 'A1' as const, bestAccuracy: 0.75, attempts: 1, lastPlayedAt: 7 } },
      spelling: { kinds: { umlaut: 2 }, words: { Mädchen: { count: 2, lastAt: 4, kind: 'umlaut' as const } } },
    }
    const result = parseProgressBackup(serializeProgress(samples, undefined, extras))

    expect(result.success).toBe(true)
    if (result.success) expect(result.data.extras).toEqual(extras)
  })

  it('keeps the valid texts when one entry in the file is damaged', () => {
    const file = JSON.parse(serializeProgress(samples, undefined, { myTexts: [myText] }))
    file.extras.myTexts.push({ id: 'broken', title: 5 }, { ...myText, id: 'text-2', text: '' })
    const result = parseProgressBackup(JSON.stringify(file))

    expect(result.success).toBe(true)
    if (result.success) expect(result.data.extras?.myTexts?.map((entry) => entry.id)).toEqual(['text-1'])
  })

  it('reads a file that has no extras at all', () => {
    const result = parseProgressBackup(serializeProgress(samples))
    expect(result.success).toBe(true)
    if (result.success) expect(result.data.extras).toBeUndefined()
  })

  it('rejects a dictation result with an unknown level', () => {
    const file = JSON.parse(serializeProgress(samples, undefined, { dictation: {} }))
    file.extras.dictation = { x: { storyId: 'x', level: 'C2', completed: true, bestAccuracy: 1, bestWpm: 1, attempts: 1, lastPlayedAt: 1 } }
    expect(parseProgressBackup(JSON.stringify(file)).success).toBe(false)
  })
})
