import { useMemo } from 'react'

import { useProgressStore } from '@/store/progressStore'

import { getDueVocabulary } from './selectors'

/** Number of vocabulary words due for spaced-repetition review right now. */
export function useDueCount(): number {
  const lessons = useProgressStore((state) => state.lessons)
  const vocabulary = useProgressStore((state) => state.vocabulary)

  return useMemo(() => getDueVocabulary({ lessons, vocabulary }).length, [lessons, vocabulary])
}
