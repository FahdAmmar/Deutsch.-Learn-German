import { describe, expect, it } from 'vitest'

import { LEVEL_PATHS } from '@/data/paths'
import { getLessonsForLevel, getNextLesson } from '@/lib/curriculum'
import { getChapterProgress, getLevelChapters, getNextLessonInPath, getPathLessons } from '@/lib/learningPath'

describe('A1 learning path', () => {
  const placedIds = (LEVEL_PATHS.A1?.chapters ?? []).flatMap((chapter) => chapter.lessonIds)

  it('places every A1 lesson exactly once, so no lesson drops out of the path', () => {
    const lessonIds = getLessonsForLevel('A1').map((lesson) => lesson.id)
    expect([...placedIds].sort()).toEqual([...lessonIds].sort())
    expect(new Set(placedIds).size).toBe(placedIds.length)
  })

  it('has no chapter without lessons and needs no catch-all chapter', () => {
    const chapters = getLevelChapters('A1')
    expect(chapters.every((entry) => entry.lessons.length > 0)).toBe(true)
    expect(chapters.some((entry) => entry.chapter.id === 'weitere-lektionen')).toBe(false)
  })

  it('teaches letters, then days and time, then the grammar foundation', () => {
    const order = getPathLessons('A1').map((lesson) => lesson.slug)
    const at = (slug: string) => order.indexOf(slug)
    expect(at('alphabet')).toBeGreaterThan(-1)
    expect(at('alphabet')).toBeLessThan(at('wochentage-monate'))
    expect(at('wochentage-monate')).toBeLessThan(at('uhrzeit'))
    expect(at('uhrzeit')).toBeLessThan(at('personalpronomen'))
    expect(at('personalpronomen')).toBeLessThan(at('sein'))
  })

  it('introduces sein and haben before the lessons that rely on them (Familie, Berufe)', () => {
    const order = getPathLessons('A1').map((lesson) => lesson.slug)
    expect(order.indexOf('sein')).toBeLessThan(order.indexOf('familie'))
    expect(order.indexOf('haben')).toBeLessThan(order.indexOf('familie'))
  })

  it('follows the path, not module order, for the next lesson', () => {
    expect(getNextLesson('a1-m01-l04')?.id).toBe('a1-m02-l05')
    expect(getNextLesson('a1-m02-l05')?.id).toBe('a1-m02-l04')
    expect(getNextLesson('a1-m02-l04')?.id).toBe('a1-m02-l03')
    expect(getNextLesson('a1-m02-l03')?.id).toBe('a1-m01-l05')
  })

  it('has no next lesson after the last one', () => {
    const last = getPathLessons('A1').at(-1)
    expect(last).toBeDefined()
    expect(last && getNextLessonInPath(last)).toBeUndefined()
  })
})

describe('A2 learning path', () => {
  const placedIds = (LEVEL_PATHS.A2?.chapters ?? []).flatMap((chapter) => chapter.lessonIds)

  it('places every A2 lesson exactly once, so no lesson drops out of the path', () => {
    const lessonIds = getLessonsForLevel('A2').map((lesson) => lesson.id)
    expect([...placedIds].sort()).toEqual([...lessonIds].sort())
    expect(new Set(placedIds).size).toBe(placedIds.length)
  })

  it('has no chapter without lessons and needs no catch-all chapter', () => {
    const chapters = getLevelChapters('A2')
    expect(chapters.every((entry) => entry.lessons.length > 0)).toBe(true)
    expect(chapters.some((entry) => entry.chapter.id === 'weitere-lektionen')).toBe(false)
  })

  it('teaches reflexive verbs before the vocabulary lessons that use them', () => {
    const order = getPathLessons('A2').map((lesson) => lesson.slug)
    const reflexive = order.indexOf('reflexive-verben')
    expect(reflexive).toBeGreaterThan(-1)
    for (const slug of ['arbeit-und-beruf', 'zeit-und-ablauf', 'aemter-und-formulare', 'freizeit-und-medien', 'gesundheit-und-krankheit', 'gefuehle-und-charakter', 'urlaub-und-hotel']) {
      expect(order.indexOf(slug), slug).toBeGreaterThan(reflexive)
    }
  })

  it('teaches subordinate clauses before the relative clauses that build on them', () => {
    const order = getPathLessons('A2').map((lesson) => lesson.slug)
    expect(order.indexOf('nebensaetze')).toBeLessThan(order.indexOf('relativsaetze'))
  })

  it('follows the path, not module order, for the next lesson', () => {
    expect(getNextLesson('a2-m04-l01')?.id).toBe('a2-m15-l12')
    expect(getNextLesson('a2-m15-l10')?.id).toBe('a2-m03-l01')
  })

  it('has no next lesson after the last one', () => {
    const last = getPathLessons('A2').at(-1)
    expect(last && getNextLessonInPath(last)).toBeUndefined()
  })
})

describe('levels without a hand-made path', () => {
  it('fall back to one chapter per module, in module order', () => {
    // A2 has a hand-made path today, so take it away for this test to exercise the fallback.
    const handMade = LEVEL_PATHS.A2
    delete LEVEL_PATHS.A2
    try {
      const chapters = getLevelChapters('A2')
      expect(chapters.length).toBeGreaterThan(0)
      expect(chapters.flatMap((entry) => entry.lessons).map((lesson) => lesson.id)).toEqual(getLessonsForLevel('A2').map((lesson) => lesson.id))
    } finally {
      LEVEL_PATHS.A2 = handMade
    }
  })

  it('return no chapters for a level with no content', () => {
    expect(getLevelChapters('B1')).toEqual([])
  })
})

describe('getChapterProgress', () => {
  it('marks exactly one chapter as current: the one holding the first unfinished lesson', () => {
    const chapters = getLevelChapters('A1')
    const done = new Set(chapters[0].lessons.map((lesson) => lesson.id))
    const progress = getChapterProgress(chapters, done)
    expect(progress[0].state).toBe('done')
    expect(progress[1].state).toBe('current')
    expect(progress.filter((entry) => entry.state === 'current')).toHaveLength(1)
  })

  it('prefers the chapter of the lesson the learner is on', () => {
    const chapters = getLevelChapters('A1')
    const progress = getChapterProgress(chapters, new Set(), 'a1-m03-l01')
    expect(progress[3].state).toBe('current')
  })
})
