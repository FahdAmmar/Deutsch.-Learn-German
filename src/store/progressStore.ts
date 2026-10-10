import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { zustandStorageEngine } from '@/lib/storage'
import { computeNextReview } from '@/lib/srs'
import type { CEFRLevel, ProgressState } from '@/types'
import { todayKey, daysBetween } from '@/utils/date'
import { generateId } from '@/utils/id'

const MAX_ACTIVITY_ENTRIES = 50

interface ProgressActions {
  startLesson: (params: { lessonId: string; moduleId: string; level: CEFRLevel }) => void
  completeLesson: (params: { lessonId: string; moduleId: string; level: CEFRLevel; accuracy: number }) => void
  recordVocabularyReview: (vocabularyId: string, correct: boolean) => void
  isLessonCompleted: (lessonId: string) => boolean
  getLessonAccuracy: (lessonId: string) => number | null
  resetProgress: () => void
  /** Wholesale-replaces progress state, used by the Settings import flow after validation. */
  replaceProgress: (nextState: ProgressState) => void
  /**
   * Sets the learner's active level without touching lesson/module
   * pointers — used by the placement test recommendation and manual
   * level switching. Does not fabricate completed-lesson history.
   */
  setCurrentLevel: (level: CEFRLevel) => void
}

type ProgressStore = ProgressState & ProgressActions

const initialState: ProgressState = {
  currentLevel: 'A1',
  currentModuleId: null,
  currentLessonId: null,
  lessons: {},
  vocabulary: {},
  activity: [],
  streakDays: 0,
  lastActivityDate: null,
}

/** Bumps the streak counter based on today's date vs. the last recorded activity day. */
function withStreakUpdate(state: ProgressState): Pick<ProgressState, 'streakDays' | 'lastActivityDate'> {
  const today = todayKey()

  if (state.lastActivityDate === today) {
    return { streakDays: state.streakDays, lastActivityDate: today }
  }

  if (state.lastActivityDate === null) {
    return { streakDays: 1, lastActivityDate: today }
  }

  const gap = daysBetween(state.lastActivityDate, today)
  const streakDays = gap === 1 ? state.streakDays + 1 : 1
  return { streakDays, lastActivityDate: today }
}

export const useProgressStore = create<ProgressStore>()(
  persist(
    (set, get) => ({
      ...initialState,

      startLesson: ({ lessonId, moduleId, level }) => {
        set((state) => {
          const existing = state.lessons[lessonId]
          return {
            currentLevel: level,
            currentModuleId: moduleId,
            currentLessonId: lessonId,
            lessons: {
              ...state.lessons,
              [lessonId]: existing
                ? { ...existing, lastVisitedAt: Date.now() }
                : { lessonId, completed: false, accuracy: 0, lastVisitedAt: Date.now() },
            },
          }
        })
      },

      completeLesson: ({ lessonId, moduleId, level, accuracy }) => {
        set((state) => {
          const streakUpdate = withStreakUpdate(state)
          const entry = {
            id: generateId('activity'),
            lessonId,
            type: 'lesson-completed' as const,
            timestamp: Date.now(),
          }

          return {
            currentLevel: level,
            currentModuleId: moduleId,
            currentLessonId: lessonId,
            lessons: {
              ...state.lessons,
              [lessonId]: {
                lessonId,
                completed: true,
                accuracy,
                completedAt: Date.now(),
                lastVisitedAt: Date.now(),
              },
            },
            activity: [entry, ...state.activity].slice(0, MAX_ACTIVITY_ENTRIES),
            ...streakUpdate,
          }
        })
      },

      recordVocabularyReview: (vocabularyId, correct) => {
        set((state) => {
          const existing = state.vocabulary[vocabularyId]
          // `existing?.boxLevel` can be undefined for entries persisted before
          // spaced repetition existed — treat those as box 0 (new).
          const { boxLevel, nextReviewAt } = computeNextReview(existing?.boxLevel ?? 0, correct)
          return {
            vocabulary: {
              ...state.vocabulary,
              [vocabularyId]: {
                vocabularyId,
                timesReviewed: (existing?.timesReviewed ?? 0) + 1,
                timesCorrect: (existing?.timesCorrect ?? 0) + (correct ? 1 : 0),
                lastReviewedAt: Date.now(),
                boxLevel,
                nextReviewAt,
              },
            },
          }
        })
      },

      isLessonCompleted: (lessonId) => Boolean(get().lessons[lessonId]?.completed),

      getLessonAccuracy: (lessonId) => get().lessons[lessonId]?.accuracy ?? null,

      resetProgress: () => set(initialState),

      replaceProgress: (nextState) => set(nextState),

      setCurrentLevel: (level) => set({ currentLevel: level }),
    }),
    {
      name: 'progress',
      storage: {
        getItem: (name) => {
          const value = zustandStorageEngine.getItem(name)
          return value ? JSON.parse(value) : null
        },
        setItem: (name, value) => zustandStorageEngine.setItem(name, JSON.stringify(value)),
        removeItem: (name) => zustandStorageEngine.removeItem(name),
      },
    },
  ),
)

/** Fraction (0–1) of the given lesson IDs that are marked completed. */
export function selectModuleCompletion(state: ProgressStore, lessonIds: string[]): number {
  if (lessonIds.length === 0) return 0
  const completed = lessonIds.filter((id) => state.lessons[id]?.completed).length
  return completed / lessonIds.length
}
