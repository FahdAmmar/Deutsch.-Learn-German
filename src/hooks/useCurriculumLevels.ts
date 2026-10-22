import { useCallback, useEffect, useState, useSyncExternalStore } from 'react'

import { getCurriculumVersion, isLevelLoaded, loadLevels, subscribeToCurriculum } from '@/data/curriculum'
import type { CEFRLevel } from '@/types'

export type CurriculumStatus = 'ready' | 'loading' | 'error'

/**
 * Makes sure the given levels' content is loaded and reports whether it is.
 * Screens that read curriculum data synchronously (everything in `lib/curriculum`)
 * render only once this says `ready`.
 */
export function useCurriculumLevels(levels: readonly CEFRLevel[]): { status: CurriculumStatus; retry: () => void } {
  // Re-render when a level finishes loading; the value itself is only a change signal.
  useSyncExternalStore(subscribeToCurriculum, getCurriculumVersion)

  const [failedKey, setFailedKey] = useState<string | null>(null)
  const [attempt, setAttempt] = useState(0)
  const key = levels.join(',')
  const allLoaded = levels.every(isLevelLoaded)

  useEffect(() => {
    if (allLoaded) return
    let cancelled = false
    loadLevels(key ? (key.split(',') as CEFRLevel[]) : []).catch(() => {
      if (!cancelled) setFailedKey(key)
    })
    return () => {
      cancelled = true
    }
  }, [allLoaded, key, attempt])

  const retry = useCallback(() => {
    setFailedKey(null)
    setAttempt((count) => count + 1)
  }, [])

  const status: CurriculumStatus = allLoaded ? 'ready' : failedKey === key ? 'error' : 'loading'
  return { status, retry }
}
