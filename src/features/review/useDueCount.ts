import { useEffect, useMemo, useSyncExternalStore } from 'react'

import { getCurriculumVersion, loadAllLevels, subscribeToCurriculum } from '@/data/curriculum'
import { useProgressStore } from '@/store/progressStore'

import { getDueVocabulary } from './selectors'

/**
 * Number of vocabulary words due for spaced-repetition review right now.
 * The count is shown in the app shell, outside any screen that waits for the
 * curriculum, so it loads the content itself (in the background, and only for
 * someone who has finished a lesson) and recounts once it arrives.
 */
export function useDueCount(): number {
  const lessons = useProgressStore((state) => state.lessons)
  const vocabulary = useProgressStore((state) => state.vocabulary)
  const savedVocabularyIds = useProgressStore((state) => state.savedVocabularyIds)
  const curriculumVersion = useSyncExternalStore(subscribeToCurriculum, getCurriculumVersion)
  const hasProgress = Object.keys(lessons).length > 0 || (savedVocabularyIds?.length ?? 0) > 0

  useEffect(() => {
    if (hasProgress) loadAllLevels().catch(() => undefined)
  }, [hasProgress])

  // `curriculumVersion` is a dependency on purpose: the count must be recomputed when content loads.
  // oxlint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(() => getDueVocabulary({ lessons, vocabulary, savedVocabularyIds }).length, [lessons, vocabulary, savedVocabularyIds, curriculumVersion])
}
