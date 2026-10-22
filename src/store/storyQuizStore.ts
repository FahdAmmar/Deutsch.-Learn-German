import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { zustandStorageEngine } from '@/lib/storage'
import type { CEFRLevel, StoryQuizProgress } from '@/types'

interface StoryQuizState {
  /** Keyed by story id. */
  quizzes: Record<string, StoryQuizProgress>
}

interface StoryQuizActions {
  /** Records one finished quiz. Best accuracy only ever goes up; every finished run counts as an attempt. */
  recordRun: (params: { storyId: string; level: CEFRLevel; accuracy: number }) => void
  /** Replaces all results, e.g. when a backup is imported. */
  replaceQuizzes: (quizzes: Record<string, StoryQuizProgress>) => void
  resetStoryQuizProgress: () => void
}

type StoryQuizStore = StoryQuizState & StoryQuizActions

const initialState: StoryQuizState = { quizzes: {} }

/** Results of the comprehension quizzes on texts and conversations. Separate from lesson progress on purpose. */
export const useStoryQuizStore = create<StoryQuizStore>()(
  persist(
    (set) => ({
      ...initialState,

      recordRun: ({ storyId, level, accuracy }) => {
        const clamped = Math.min(Math.max(accuracy, 0), 1)
        set((state) => {
          const existing = state.quizzes[storyId]
          return {
            quizzes: {
              ...state.quizzes,
              [storyId]: {
                storyId,
                level,
                bestAccuracy: Math.max(existing?.bestAccuracy ?? 0, clamped),
                attempts: (existing?.attempts ?? 0) + 1,
                lastPlayedAt: Date.now(),
              },
            },
          }
        })
      },

      replaceQuizzes: (quizzes) => set({ quizzes }),

      resetStoryQuizProgress: () => set(initialState),
    }),
    {
      name: 'story-quiz-progress',
      storage: {
        getItem: (name) => {
          const value = zustandStorageEngine.getItem(name)
          if (!value) return null
          try {
            return JSON.parse(value)
          } catch {
            // A corrupted entry must never brick the stories — start fresh.
            return null
          }
        },
        setItem: (name, value) => zustandStorageEngine.setItem(name, JSON.stringify(value)),
        removeItem: (name) => zustandStorageEngine.removeItem(name),
      },
    },
  ),
)

export function selectStoryQuizProgress(storyId: string) {
  return (state: StoryQuizStore): StoryQuizProgress | undefined => state.quizzes[storyId]
}
