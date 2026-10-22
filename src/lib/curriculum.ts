import { getCurriculum, LEVELS_WITH_CONTENT } from '@/data/curriculum'
import { CEFR_LEVELS } from '@/types'
import type { CEFRLevel, Lesson, LevelCurriculum, Module, ReadingText, VocabularyItem } from '@/types'

import { getNextLessonInPath } from './learningPath'

export function getLevelCurriculum(level: CEFRLevel) {
  return getCurriculum().find((entry) => entry.level === level)
}

export function getModulesForLevel(level: CEFRLevel): Module[] {
  return getLevelCurriculum(level)?.modules ?? []
}

/** Levels that have authored content. Known up front (it does not depend on what has been loaded). */
export function getLevelsWithContent(): CEFRLevel[] {
  return [...LEVELS_WITH_CONTENT]
}

export function getModule(level: CEFRLevel, moduleSlug: string): Module | undefined {
  return getModulesForLevel(level).find((module) => module.slug === moduleSlug)
}

export function getModuleById(moduleId: string): Module | undefined {
  for (const entry of getCurriculum()) {
    const found = entry.modules.find((module) => module.id === moduleId)
    if (found) return found
  }
  return undefined
}

/** All lessons for a level, in curriculum order (module order, then lesson order within it). */
export function getLessonsForLevel(level: CEFRLevel): Lesson[] {
  return getModulesForLevel(level).flatMap((module) => module.lessons)
}

export function getLesson(level: CEFRLevel, lessonSlug: string): Lesson | undefined {
  return getLessonsForLevel(level).find((lesson) => lesson.slug === lessonSlug)
}

export function getLessonById(lessonId: string): Lesson | undefined {
  for (const entry of getCurriculum()) {
    for (const module of entry.modules) {
      const found = module.lessons.find((lesson) => lesson.id === lessonId)
      if (found) return found
    }
  }
  return undefined
}

/** Total lesson count across every module in a level — used for level-card progress. */
export function getTotalLessonCount(level: CEFRLevel): number {
  return getLessonsForLevel(level).length
}

/** The lesson that follows the given one on its level's learning path (falls back to module order for levels without a hand-made path). */
export function getNextLesson(currentLessonId: string): Lesson | undefined {
  const lesson = getLessonById(currentLessonId)
  return lesson ? getNextLessonInPath(lesson) : undefined
}

/** Every vocabulary item across a level's lessons, deduplicated by id. */
export function getVocabularyForLevel(level: CEFRLevel) {
  const seen = new Map<string, ReturnType<typeof getLessonsForLevel>[number]['vocabulary'][number]>()
  for (const lesson of getLessonsForLevel(level)) {
    for (const item of lesson.vocabulary) {
      seen.set(item.id, item)
    }
  }
  return Array.from(seen.values())
}

/** Every vocabulary item across every level — used to pool plausible distractors for review sessions. */
/** The vocabulary of a level and of every level below it: A2 builds on A1, so its drills may use both. */
export function getCumulativeVocabulary(level: CEFRLevel) {
  return CEFR_LEVELS.slice(0, CEFR_LEVELS.indexOf(level) + 1).flatMap((each) => getVocabularyForLevel(each))
}

export function getAllVocabulary() {
  return CEFR_LEVELS.flatMap((level) => getVocabularyForLevel(level))
}

/** Every practical-usage dialogue across a level's lessons, in curriculum order. */
export function getDialoguesForLevel(level: CEFRLevel) {
  return getLessonsForLevel(level).flatMap((lesson) => lesson.dialogues ?? [])
}

/** Standalone bilingual reading texts for a level (the "Reading" tab), in curriculum order. */
export function getReadingTextsForLevel(level: CEFRLevel): ReadingText[] {
  return getLevelCurriculum(level)?.readingTexts ?? []
}

let exerciseIndex: { source: readonly LevelCurriculum[]; lessons: Map<string, Lesson> } | null = null

/**
 * The lesson an exercise belongs to, so a mistake can link back to where it
 * was taught. Exercises that live elsewhere (grammar-rule quizzes, generated
 * review questions) belong to no lesson and return `undefined`.
 */
export function getLessonByExerciseId(exerciseId: string): Lesson | undefined {
  const source = getCurriculum()
  // The curriculum snapshot changes identity whenever a level loads, which rebuilds the index.
  if (exerciseIndex?.source !== source) {
    const lessons = new Map<string, Lesson>()
    for (const entry of source) {
      for (const module of entry.modules) {
        for (const lesson of module.lessons) {
          for (const exercise of lesson.exercises) lessons.set(exercise.id, lesson)
        }
      }
    }
    exerciseIndex = { source, lessons }
  }
  return exerciseIndex.lessons.get(exerciseId)
}

let vocabularyIndex: { source: readonly LevelCurriculum[]; items: Map<string, VocabularyItem> } | null = null

/** One vocabulary item by id, across the levels loaded so far. */
export function getVocabularyById(vocabularyId: string): VocabularyItem | undefined {
  const source = getCurriculum()
  if (vocabularyIndex?.source !== source) {
    const items = new Map<string, VocabularyItem>()
    for (const entry of source) {
      for (const module of entry.modules) {
        for (const lesson of module.lessons) {
          for (const item of lesson.vocabulary) items.set(item.id, item)
        }
      }
    }
    vocabularyIndex = { source, items }
  }
  return vocabularyIndex.items.get(vocabularyId)
}
