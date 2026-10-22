import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { progressAfterRun } from '@/lib/dictation/stages'
import { MAX_SAVED_TEXTS } from '@/lib/myText/limits'
import { sanitizeStoredTexts } from '@/lib/myText/validate'
import { zustandStorageEngine } from '@/lib/storage'
import type { FinishedDictationRun, MyText, PracticeStage, SplitMode } from '@/types'

export interface MyTextDraft {
  title: string
  text: string
  mode: SplitMode
  maxWords: number
}

interface MyTextState {
  /** Newest first. */
  texts: MyText[]
}

interface MyTextActions {
  /** Saves a new text. Returns it, or `null` when the library is full. Input is expected to be validated already. */
  addText: (draft: MyTextDraft) => MyText | null
  /** Changes a text. Its results are cleared when the words change — they belonged to the old text. */
  updateText: (id: string, draft: MyTextDraft) => void
  removeText: (id: string) => void
  /** Records one finished dictation: attempts count up, best accuracy and best speed only ever go up. */
  /**
   * Saves a finished run. `stage` is the stage that was practised; it counts toward moving up only when it is
   * the stage the text has reached, and defaults to that one.
   */
  recordRun: (id: string, run: FinishedDictationRun, stage?: PracticeStage) => void
  /** Replaces the whole library, e.g. when a backup is imported. */
  replaceTexts: (texts: MyText[]) => void
}

type MyTextStore = MyTextState & MyTextActions

function createId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') return crypto.randomUUID()
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`
}

/**
 * The learner's own texts for dictation practice. Kept apart from the lesson
 * progress stores: these are the learner's content, not curriculum progress.
 */
export const useMyTextStore = create<MyTextStore>()(
  persist(
    (set, get) => ({
      texts: [],

      addText: (draft) => {
        if (get().texts.length >= MAX_SAVED_TEXTS) return null
        const now = Date.now()
        const created: MyText = {
          id: createId(),
          ...draft,
          createdAt: now,
          updatedAt: now,
          attempts: 0,
          bestAccuracy: 0,
          bestWpm: 0,
          lastPlayedAt: null,
          stage: 'copy',
          box: 0,
          dueAt: null,
        }
        set((state) => ({ texts: [created, ...state.texts] }))
        return created
      },

      updateText: (id, draft) =>
        set((state) => ({
          texts: state.texts.map((entry) => {
            if (entry.id !== id) return entry
            const sameWords = entry.text === draft.text
            return {
              ...entry,
              ...draft,
              updatedAt: Date.now(),
              // New words are a new text: the results and the stage reached belonged to the old one.
              ...(sameWords ? {} : { attempts: 0, bestAccuracy: 0, bestWpm: 0, lastPlayedAt: null, stage: 'copy' as const, box: 0, dueAt: null }),
            }
          }),
        })),

      removeText: (id) => set((state) => ({ texts: state.texts.filter((entry) => entry.id !== id) })),

      replaceTexts: (texts) => set({ texts: sanitizeStoredTexts(texts) }),

      recordRun: (id, { accuracy, wpm }, stage) => {
        const safeAccuracy = Math.min(Math.max(accuracy, 0), 1)
        const safeWpm = Math.max(0, Math.round(wpm))
        const now = Date.now()
        set((state) => ({
          texts: state.texts.map((entry) =>
            entry.id === id
              ? {
                  ...entry,
                  attempts: entry.attempts + 1,
                  bestAccuracy: Math.max(entry.bestAccuracy, safeAccuracy),
                  bestWpm: Math.max(entry.bestWpm, safeWpm),
                  lastPlayedAt: now,
                  ...progressAfterRun(entry, stage ?? entry.stage, safeAccuracy, now),
                }
              : entry,
          ),
        }))
      },
    }),
    {
      name: 'my-texts',
      partialize: (state): MyTextState => ({ texts: state.texts }),
      storage: {
        getItem: (name) => {
          const value = zustandStorageEngine.getItem(name)
          if (!value) return null
          try {
            const parsed: unknown = JSON.parse(value)
            const stored = typeof parsed === 'object' && parsed !== null ? (parsed as { state?: { texts?: unknown } }) : {}
            return { state: { texts: sanitizeStoredTexts(stored.state?.texts) } }
          } catch {
            // A corrupted entry must never brick the section — start with an empty library.
            return null
          }
        },
        setItem: (name, value) => zustandStorageEngine.setItem(name, JSON.stringify(value)),
        removeItem: (name) => zustandStorageEngine.removeItem(name),
      },
    },
  ),
)

export function selectMyText(id: string | undefined) {
  return (state: MyTextStore): MyText | undefined => state.texts.find((entry) => entry.id === id)
}
