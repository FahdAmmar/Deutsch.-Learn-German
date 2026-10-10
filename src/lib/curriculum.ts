import { curriculum } from '@/data/curriculum'
import { CEFR_LEVELS } from '@/types'
import type { CEFRLevel, Lesson, Module, ReadingText } from '@/types'

export function getLevelCurriculum(level: CEFRLevel) {
  return curriculum.find((entry) => entry.level === level)
}

export function getModulesForLevel(level: CEFRLevel): Module[] {
  return getLevelCurriculum(level)?.modules ?? []
}

/** Levels that have at least one authored module — derived from the data so pages never hardcode this. */
export function getLevelsWithContent(): CEFRLevel[] {
  return CEFR_LEVELS.filter((level) => getModulesForLevel(level).length > 0)
}

export function getModule(level: CEFRLevel, moduleSlug: string): Module | undefined {
  return getModulesForLevel(level).find((module) => module.slug === moduleSlug)
}

export function getModuleById(moduleId: string): Module | undefined {
  for (const entry of curriculum) {
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
  for (const entry of curriculum) {
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

/** The lesson immediately after the given one within its module/level, if any. */
export function getNextLesson(currentLessonId: string): Lesson | undefined {
  const lesson = getLessonById(currentLessonId)
  if (!lesson) return undefined

  const lessonsInLevel = getLessonsForLevel(lesson.level)
  const currentIndex = lessonsInLevel.findIndex((entry) => entry.id === currentLessonId)
  if (currentIndex === -1) return undefined

  return lessonsInLevel[currentIndex + 1]
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
export function getAllVocabulary() {
  return CEFR_LEVELS.flatMap((level) => getVocabularyForLevel(level))
}

/** Every grammar topic across a level's lessons, deduplicated by id. */
export function getGrammarTopicsForLevel(level: CEFRLevel) {
  const seen = new Map<string, NonNullable<ReturnType<typeof getLessonsForLevel>[number]['grammarTopics']>[number]>()
  for (const lesson of getLessonsForLevel(level)) {
    for (const topic of lesson.grammarTopics ?? []) {
      seen.set(topic.id, topic)
    }
  }
  return Array.from(seen.values())
}

/** Every practical-usage dialogue across a level's lessons, in curriculum order. */
export function getDialoguesForLevel(level: CEFRLevel) {
  return getLessonsForLevel(level).flatMap((lesson) => lesson.dialogues ?? [])
}

/** Standalone bilingual reading texts for a level (the "Reading" tab), in curriculum order. */
export function getReadingTextsForLevel(level: CEFRLevel): ReadingText[] {
  return getLevelCurriculum(level)?.readingTexts ?? []
}
