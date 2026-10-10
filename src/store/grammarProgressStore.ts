import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { zustandStorageEngine } from '@/lib/storage'
import type { GrammarRuleProgress } from '@/types'

/** A rule counts as completed once its final quiz reaches this accuracy (0–1). */
export const GRAMMAR_PASS_ACCURACY = 0.7

interface GrammarProgressState {
  /** Keyed by the rule's roadmap number (as a string, since JSON object keys are strings). */
  rules: Record<string, GrammarRuleProgress>
}

interface GrammarProgressActions {
  visitRule: (number: number) => void
  /** Records a finished quiz attempt. Completion is sticky; `bestAccuracy` only ever goes up. */
  recordQuizResult: (number: number, accuracy: number) => void
  resetGrammarProgress: () => void
}

type GrammarProgressStore = GrammarProgressState & GrammarProgressActions

const initialState: GrammarProgressState = { rules: {} }

function emptyProgress(number: number): GrammarRuleProgress {
  return { number, completed: false, bestAccuracy: 0, attempts: 0, lastVisitedAt: Date.now() }
}

/**
 * Progress for the roadmap-ordered grammar rules. Kept separate from the
 * lesson `progressStore` on purpose: it is a different curriculum with a
 * different key space, and one giant store is an explicit non-goal.
 */
export const useGrammarProgressStore = create<GrammarProgressStore>()(
  persist(
    (set) => ({
      ...initialState,

      visitRule: (number) => {
        set((state) => {
          const existing = state.rules[number] ?? emptyProgress(number)
          return { rules: { ...state.rules, [number]: { ...existing, lastVisitedAt: Date.now() } } }
        })
      },

      recordQuizResult: (number, accuracy) => {
        const clamped = Math.min(Math.max(accuracy, 0), 1)
        set((state) => {
          const existing = state.rules[number] ?? emptyProgress(number)
          return {
            rules: {
              ...state.rules,
              [number]: {
                ...existing,
                attempts: existing.attempts + 1,
                bestAccuracy: Math.max(existing.bestAccuracy, clamped),
                completed: existing.completed || clamped >= GRAMMAR_PASS_ACCURACY,
                lastVisitedAt: Date.now(),
              },
            },
          }
        })
      },

      resetGrammarProgress: () => set(initialState),
    }),
    {
      name: 'grammar-progress',
      storage: {
        getItem: (name) => {
          const value = zustandStorageEngine.getItem(name)
          if (!value) return null
          try {
            return JSON.parse(value)
          } catch {
            // A corrupted entry must never brick the grammar section — start fresh.
            return null
          }
        },
        setItem: (name, value) => zustandStorageEngine.setItem(name, JSON.stringify(value)),
        removeItem: (name) => zustandStorageEngine.removeItem(name),
      },
    },
  ),
)

export function selectRuleCompleted(number: number) {
  return (state: GrammarProgressStore): boolean => Boolean(state.rules[number]?.completed)
}

export function selectRuleProgress(number: number) {
  return (state: GrammarProgressStore): GrammarRuleProgress | undefined => state.rules[number]
}
