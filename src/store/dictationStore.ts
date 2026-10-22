import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { zustandStorageEngine } from '@/lib/storage'
import type { CEFRLevel, DictationProgress } from '@/types'

interface DictationState {
  /** Keyed by story id (reading-text and conversation ids are unique across the curriculum). */
  stories: Record<string, DictationProgress>
}

interface DictationActions {
  /** Records one finished run. Completion is sticky; best accuracy and best WPM only ever go up. */
  recordRun: (params: { storyId: string; level: CEFRLevel; accuracy: number; wpm: number }) => void
  /** Replaces all results, e.g. when a backup is imported. */
  replaceStories: (stories: Record<string, DictationProgress>) => void
  resetDictationProgress: () => void
}

type DictationStore = DictationState & DictationActions

const initialState: DictationState = { stories: {} }

/**
 * Progress of the letter-by-letter dictation mode. Separate from the lesson
 * `progressStore` on purpose — different key space, and no giant store.
 */
export const useDictationStore = create<DictationStore>()(
  persist(
    (set) => ({
      ...initialState,

      recordRun: ({ storyId, level, accuracy, wpm }) => {
        const clampedAccuracy = Math.min(Math.max(accuracy, 0), 1)
        const safeWpm = Math.max(0, Math.round(wpm))
        set((state) => {
          const existing = state.stories[storyId]
          return {
            stories: {
              ...state.stories,
              [storyId]: {
                storyId,
                level,
                completed: true,
                bestAccuracy: Math.max(existing?.bestAccuracy ?? 0, clampedAccuracy),
                bestWpm: Math.max(existing?.bestWpm ?? 0, safeWpm),
                attempts: (existing?.attempts ?? 0) + 1,
                lastPlayedAt: Date.now(),
              },
            },
          }
        })
      },

      replaceStories: (stories) => set({ stories }),

      resetDictationProgress: () => set(initialState),
    }),
    {
      name: 'dictation-progress',
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

export function selectDictationProgress(storyId: string) {
  return (state: DictationStore): DictationProgress | undefined => state.stories[storyId]
}
