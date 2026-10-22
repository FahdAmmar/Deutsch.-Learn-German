import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { zustandStorageEngine } from '@/lib/storage'
import { spellingProgressSchema, type SpellingProgress, type WeakWord } from '@/lib/spellingSchema'
import type { SpellingKind, SpellingSlip } from '@/types'

/** More than this would turn "your hard words" into the whole text; the lowest counts and the oldest go first. */
export const MAX_WEAK_WORDS = 40

interface SpellingActions {
  /** Adds the mistakes of a finished run: each kind's total, and each mistyped word. */
  recordSlips: (slips: readonly SpellingSlip[], now?: number) => void
  /**
   * After practising words: a word typed without a slip counts one less, and leaves the list at zero.
   * `slipped` are the words that went wrong in this run, which `recordSlips` has already counted.
   */
  recordPractice: (practiced: readonly string[], slipped: readonly string[]) => void
  /** Replaces everything, e.g. when a backup is imported. */
  replaceSpelling: (progress: SpellingProgress) => void
  resetSpelling: () => void
}

type SpellingStore = SpellingProgress & SpellingActions

const initialState: SpellingProgress = { kinds: {}, words: {} }

function trim(words: Record<string, WeakWord>): Record<string, WeakWord> {
  const entries = Object.entries(words)
  if (entries.length <= MAX_WEAK_WORDS) return words
  const kept = entries.sort(([, a], [, b]) => b.count - a.count || b.lastAt - a.lastAt).slice(0, MAX_WEAK_WORDS)
  return Object.fromEntries(kept)
}

export const useSpellingStore = create<SpellingStore>()(
  persist(
    (set) => ({
      ...initialState,

      recordSlips: (slips, now = Date.now()) => {
        if (slips.length === 0) return
        set((state) => {
          const kinds = { ...state.kinds }
          const words = { ...state.words }
          for (const slip of slips) {
            kinds[slip.kind] = (kinds[slip.kind] ?? 0) + 1
            if (slip.word) words[slip.word] = { count: (words[slip.word]?.count ?? 0) + 1, lastAt: now, kind: slip.kind }
          }
          return { kinds, words: trim(words) }
        })
      },

      recordPractice: (practiced, slipped) => {
        const wrong = new Set(slipped)
        set((state) => {
          const words = { ...state.words }
          for (const word of practiced) {
            const entry = words[word]
            if (!entry || wrong.has(word)) continue
            if (entry.count <= 1) delete words[word]
            else words[word] = { ...entry, count: entry.count - 1 }
          }
          return { words }
        })
      },

      replaceSpelling: ({ kinds, words }) => set({ kinds, words: trim(words) }),

      resetSpelling: () => set(initialState),
    }),
    {
      name: 'spelling-weak-spots',
      storage: {
        getItem: (name) => {
          const value = zustandStorageEngine.getItem(name)
          if (!value) return null
          try {
            const parsed = JSON.parse(value) as { state?: unknown; version?: number }
            // A damaged or older entry must never brick the page: keep it only when it reads as what we wrote.
            const checked = spellingProgressSchema.safeParse(parsed.state)
            return checked.success ? { ...parsed, state: checked.data } : null
          } catch {
            return null
          }
        },
        setItem: (name, value) => zustandStorageEngine.setItem(name, JSON.stringify(value)),
        removeItem: (name) => zustandStorageEngine.removeItem(name),
      },
      // Only the data is kept, never the actions.
      partialize: (state) => ({ kinds: state.kinds, words: state.words }),
    },
  ),
)

/** The words to practise first: most mistakes, then most recent. */
export function selectWeakWords(state: SpellingProgress, limit = 12): Array<{ word: string } & WeakWord> {
  return Object.entries(state.words)
    .map(([word, entry]) => ({ word, ...entry }))
    .sort((a, b) => b.count - a.count || b.lastAt - a.lastAt)
    .slice(0, limit)
}

export function selectKindCounts(state: SpellingProgress): Array<{ kind: SpellingKind; count: number }> {
  return (Object.entries(state.kinds) as Array<[SpellingKind, number]>)
    .filter(([, count]) => count > 0)
    .map(([kind, count]) => ({ kind, count }))
    .sort((a, b) => b.count - a.count)
}
