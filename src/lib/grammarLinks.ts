import { LESSON_GRAMMAR_LINKS } from '@/data/grammar/lessonLinks'
import { getRoadmapEntries } from '@/lib/grammarRoadmap'
import { getLessonsForLevel } from '@/lib/curriculum'
import { CEFR_LEVELS } from '@/types'
import type { GrammarRoadmapEntry, Lesson } from '@/types'

/** Roadmap rules a lesson practises, in roadmap (learning) order. */
export function getGrammarRulesForLesson(lessonId: string): GrammarRoadmapEntry[] {
  const numbers = LESSON_GRAMMAR_LINKS[lessonId]
  if (!numbers) return []
  return getRoadmapEntries().filter((entry) => numbers.includes(entry.number))
}

/** Lessons that practise a roadmap rule, in curriculum order. */
export function getLessonsForGrammarRule(ruleNumber: number): Lesson[] {
  const lessonIds = Object.entries(LESSON_GRAMMAR_LINKS)
    .filter(([, numbers]) => numbers.includes(ruleNumber))
    .map(([lessonId]) => lessonId)
  const linked = new Set(lessonIds)
  return CEFR_LEVELS.flatMap((level) => getLessonsForLevel(level)).filter((lesson) => linked.has(lesson.id))
}
