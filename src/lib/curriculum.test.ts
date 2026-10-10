import { describe, expect, it } from 'vitest'

import {
  getDialoguesForLevel,
  getGrammarTopicsForLevel,
  getLesson,
  getLessonsForLevel,
  getModulesForLevel,
  getNextLesson,
  getVocabularyForLevel,
} from './curriculum'

describe('curriculum helpers (against real A1 data)', () => {
  it('returns all authored A1 modules in order', () => {
    const modules = getModulesForLevel('A1')
    expect(modules.map((module) => module.slug)).toEqual([
      'grundlagen',
      'alltag',
      'grundgrammatik',
      'zuhause',
      'koerper-und-gesundheit',
      'modalverben',
      'negation',
      'possessivartikel',
      'unregelmaessige-verben',
      'trennbare-verben',
      'praepositionen-mit-festem-kasus',
      'perfekt',
      'imperativ',
      'einkaufen-und-pluralbildung',
      'wetter',
      'wegbeschreibung',
      'freizeit-und-hobbys',
      'kleidung',
      'essen-und-trinken',
      'haeufigkeitsadverbien',
    ])
  })

  it('returns content for A2 now that its first module is authored, but leaves B1/B2 empty', () => {
    expect(getModulesForLevel('A2').length).toBeGreaterThan(0)
    expect(getModulesForLevel('B1')).toEqual([])
    expect(getModulesForLevel('B2')).toEqual([])
  })

  it('flattens all lessons for a level across its modules', () => {
    const lessons = getLessonsForLevel('A1')
    expect(lessons.length).toBeGreaterThanOrEqual(14)
    expect(lessons.every((lesson) => lesson.level === 'A1')).toBe(true)
  })

  it('finds a lesson by its slug within a level', () => {
    const lesson = getLesson('A1', 'begruessungen')
    expect(lesson).toBeDefined()
    expect(lesson?.title).toBe('Begrüßungen')
  })

  it('returns undefined for a lesson slug that does not exist', () => {
    expect(getLesson('A1', 'does-not-exist')).toBeUndefined()
  })

  it('chains to the next lesson within the same module', () => {
    const first = getLesson('A1', 'begruessungen')
    expect(first).toBeDefined()
    const next = getNextLesson(first!.id)
    expect(next?.slug).not.toBe(first!.slug)
    expect(next?.level).toBe('A1')
  })

  it('chains across a module boundary to the first lesson of the next module', () => {
    const lessons = getLessonsForLevel('A1')
    const lastOfFirstModule = getModulesForLevel('A1')[0].lessons.at(-1)!
    const next = getNextLesson(lastOfFirstModule.id)

    const firstOfSecondModule = getModulesForLevel('A1')[1].lessons[0]
    expect(next?.id).toBe(firstOfSecondModule.id)
    expect(lessons).toContainEqual(next)
  })

  it('returns undefined when asking for the lesson after the very last one', () => {
    const modules = getModulesForLevel('A1')
    const lastLesson = modules.at(-1)!.lessons.at(-1)!
    expect(getNextLesson(lastLesson.id)).toBeUndefined()
  })

  it('deduplicates vocabulary items that appear in more than one lesson', () => {
    const vocabulary = getVocabularyForLevel('A1')
    const ids = vocabulary.map((item) => item.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('deduplicates grammar topics across lessons', () => {
    const topics = getGrammarTopicsForLevel('A1')
    const ids = topics.map((topic) => topic.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('collects dialogues across a level\'s lessons', () => {
    const dialogues = getDialoguesForLevel('A1')
    expect(dialogues.length).toBeGreaterThan(0)
    expect(dialogues.every((dialogue) => dialogue.level === 'A1')).toBe(true)
  })

  it('returns an empty dialogue list for a level with no content', () => {
    expect(getDialoguesForLevel('B1')).toEqual([])
  })
})
