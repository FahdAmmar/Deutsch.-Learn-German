import { describe, expect, it } from 'vitest'

import { getLessonById } from '@/lib/curriculum'

import { CONTRASTIVE_NOTES, getContrastiveNotes } from './contrastive'

describe('notes for Arabic speakers', () => {
  it('have unique ids', () => {
    const ids = CONTRASTIVE_NOTES.map((note) => note.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('belong to lessons that exist', () => {
    for (const note of CONTRASTIVE_NOTES) {
      expect(note.lessonIds.length, note.id).toBeGreaterThan(0)
      for (const lessonId of note.lessonIds) expect(getLessonById(lessonId), `${note.id} → ${lessonId}`).toBeDefined()
    }
  })

  it('show either a wrong/right pair or words to hear, and the pair really differs', () => {
    for (const note of CONTRASTIVE_NOTES) {
      const hasPair = note.wrong !== undefined && note.correct !== undefined
      expect(hasPair || (note.examples?.length ?? 0) > 0, note.id).toBe(true)
      if (hasPair) expect(note.wrong, note.id).not.toBe(note.correct)
      expect(note.titleAr.trim(), note.id).not.toBe('')
      expect(note.bodyAr.trim().length, note.id).toBeGreaterThan(40)
    }
  })

  it('finds the notes of a lesson, and none for a lesson without any', () => {
    expect(getContrastiveNotes('a1-m03-l01').map((note) => note.id)).toEqual(['copula'])
    expect(getContrastiveNotes('a1-m01-l03').length).toBeGreaterThanOrEqual(5)
    expect(getContrastiveNotes('a1-m04-l01')).toEqual([])
  })
})
