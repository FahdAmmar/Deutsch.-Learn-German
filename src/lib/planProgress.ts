import type { DictationProgress, GrammarRuleProgress, LessonProgress, StoryQuizProgress } from '@/types'

/**
 * A text or a conversation counts as done once the learner has shown they understood it: a
 * comprehension quiz passed at this accuracy (0–1), or the letter-by-letter dictation typed through
 * to the end. Merely opening a page proves nothing, so it does not count.
 */
export const STORY_PASS_ACCURACY = 0.7

export interface PlanProgressSources {
  lessons: Readonly<Record<string, Pick<LessonProgress, 'lessonId' | 'completed'>>>
  /** Grammar rules by roadmap number; `completed` is set once the rule's quiz is passed. */
  rules: Readonly<Record<string, Pick<GrammarRuleProgress, 'completed'>>>
  quizzes: Readonly<Record<string, Pick<StoryQuizProgress, 'bestAccuracy'>>>
  dictations: Readonly<Record<string, Pick<DictationProgress, 'completed'>>>
}

/**
 * Keys (see `stepKey` in `learningPath.ts`) of every plan step the learner has finished, gathered from
 * the three stores that hold lesson, grammar and story progress. Pure, so the rule for "done" is
 * testable without React.
 */
export function getCompletedStepKeys({ lessons, rules, quizzes, dictations }: PlanProgressSources): Set<string> {
  const done = new Set<string>()
  for (const entry of Object.values(lessons)) {
    if (entry.completed) done.add(`lesson:${entry.lessonId}`)
  }
  for (const [number, entry] of Object.entries(rules)) {
    if (entry.completed) done.add(`rule:${number}`)
  }
  for (const [storyId, entry] of Object.entries(quizzes)) {
    if (entry.bestAccuracy >= STORY_PASS_ACCURACY) done.add(`story:${storyId}`)
  }
  for (const [storyId, entry] of Object.entries(dictations)) {
    if (entry.completed) done.add(`story:${storyId}`)
  }
  return done
}
