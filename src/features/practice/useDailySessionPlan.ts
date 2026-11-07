import { useMemo } from 'react'

import { getLessonsForLevel } from '@/lib/curriculum'
import { useProgressStore } from '@/store/progressStore'
import { useSettingsStore } from '@/store/settingsStore'
import { useStatsStore } from '@/store/statsStore'
import type { CEFRLevel } from '@/types'

import { buildDailySession } from './dailySession'
import type { DailySession } from './dailySession'

/**
 * Today's session for a level, planned from the learner's own progress. The plan is rebuilt only when what it is
 * made from changes, so a screen can say what is in the session before the learner starts it.
 */
export function useDailySessionPlan(level: CEFRLevel): DailySession {
  const byModule = useStatsStore((state) => state.byModule)
  const dailyGoal = useSettingsStore((state) => state.settings.dailyGoal)
  const lessons = useProgressStore((state) => state.lessons)
  const vocabulary = useProgressStore((state) => state.vocabulary)
  const savedVocabularyIds = useProgressStore((state) => state.savedVocabularyIds)

  const levelExercises = useMemo(() => getLessonsForLevel(level).flatMap((lesson) => lesson.exercises), [level])

  return useMemo(
    () => buildDailySession({ progress: { lessons, vocabulary, savedVocabularyIds }, byModule, goal: dailyGoal, levelExercises }),
    [lessons, vocabulary, savedVocabularyIds, byModule, dailyGoal, levelExercises],
  )
}
