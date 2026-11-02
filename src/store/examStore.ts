import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { sanitizeExamResults } from '@/lib/exam/resultSchema'
import { zustandStorageEngine } from '@/lib/storage'
import type { ExamResult } from '@/types'

interface ExamState {
  /** How the learner did on each exam-style set, by set id. */
  results: Record<string, ExamResult>
}

interface ExamActions {
  /** Records a finished attempt: attempts count up and the best score only ever goes up. `ratio` is 0–1. */
  recordAttempt: (setId: string, ratio: number, now?: number) => void
  /** Replaces every result, e.g. when a backup is imported. */
  replaceResults: (results: Record<string, ExamResult>) => void
}

export const useExamStore = create<ExamState & ExamActions>()(
  persist(
    (set) => ({
      results: {},

      recordAttempt: (setId, ratio, now = Date.now()) => {
        const safe = Math.min(Math.max(ratio, 0), 1)
        set((state) => {
          const previous = state.results[setId]
          return {
            results: {
              ...state.results,
              [setId]: {
                attempts: (previous?.attempts ?? 0) + 1,
                best: Math.max(previous?.best ?? 0, safe),
                last: safe,
                lastAt: now,
              },
            },
          }
        })
      },

      replaceResults: (results) => set({ results: sanitizeExamResults(results) }),
    }),
    {
      name: 'exam-results',
      partialize: (state): ExamState => ({ results: state.results }),
      storage: {
        getItem: (name) => {
          const value = zustandStorageEngine.getItem(name)
          if (!value) return null
          try {
            const parsed: unknown = JSON.parse(value)
            const stored = typeof parsed === 'object' && parsed !== null ? (parsed as { state?: { results?: unknown } }) : {}
            return { state: { results: sanitizeExamResults(stored.state?.results) } }
          } catch {
            return null
          }
        },
        setItem: (name, value) => zustandStorageEngine.setItem(name, JSON.stringify(value)),
        removeItem: (name) => zustandStorageEngine.removeItem(name),
      },
    },
  ),
)
