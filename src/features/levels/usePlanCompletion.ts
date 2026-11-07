import { useMemo } from 'react'

import { getCompletedStepKeys } from '@/lib/planProgress'
import { useDictationStore } from '@/store/dictationStore'
import { useGrammarProgressStore } from '@/store/grammarProgressStore'
import { useProgressStore } from '@/store/progressStore'
import { useStoryQuizStore } from '@/store/storyQuizStore'

/**
 * The plan steps the learner has finished. Lesson, grammar and story progress live in separate
 * stores on purpose; this joins them for the screens that show the whole plan. Each store is read
 * through its own slice, so an unrelated change elsewhere does not re-render the plan.
 */
export function usePlanCompletion(): ReadonlySet<string> {
  const lessons = useProgressStore((state) => state.lessons)
  const rules = useGrammarProgressStore((state) => state.rules)
  const quizzes = useStoryQuizStore((state) => state.quizzes)
  const dictations = useDictationStore((state) => state.stories)

  return useMemo(() => getCompletedStepKeys({ lessons, rules, quizzes, dictations }), [lessons, rules, quizzes, dictations])
}
