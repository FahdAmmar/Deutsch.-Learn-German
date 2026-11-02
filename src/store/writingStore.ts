import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { MAX_WRITING_CHARS, sanitizeWritingDrafts } from '@/lib/writing/draftSchema'
import { zustandStorageEngine } from '@/lib/storage'
import type { WritingDraft } from '@/types'

interface WritingState {
  /** The learner's text for each writing task, by task id. */
  drafts: Record<string, WritingDraft>
}

interface WritingActions {
  /** Saves the text of a task. Over-long text is cut at the limit. */
  saveText: (taskId: string, text: string) => void
  setCompleted: (taskId: string, completed: boolean) => void
  /** Confirms or un-confirms by hand a point the checker did not find. */
  togglePoint: (taskId: string, pointId: string) => void
  clearDraft: (taskId: string) => void
  /** Replaces every draft, e.g. when a backup is imported. */
  replaceDrafts: (drafts: Record<string, WritingDraft>) => void
}

type WritingStore = WritingState & WritingActions

const emptyDraft = (): WritingDraft => ({ text: '', updatedAt: Date.now(), completed: false, confirmedPointIds: [] })

/**
 * Texts the learner wrote for the guided writing tasks. Kept apart from lesson progress: it is the learner's own
 * work. Stored drafts go through the same sanitiser as a backup file, so a damaged entry never blocks the page.
 */
export const useWritingStore = create<WritingStore>()(
  persist(
    (set) => ({
      drafts: {},

      saveText: (taskId, text) =>
        set((state) => {
          const current = state.drafts[taskId] ?? emptyDraft()
          return {
            drafts: { ...state.drafts, [taskId]: { ...current, text: text.slice(0, MAX_WRITING_CHARS), updatedAt: Date.now() } },
          }
        }),

      setCompleted: (taskId, completed) =>
        set((state) => ({
          drafts: { ...state.drafts, [taskId]: { ...(state.drafts[taskId] ?? emptyDraft()), completed, updatedAt: Date.now() } },
        })),

      togglePoint: (taskId, pointId) =>
        set((state) => {
          const current = state.drafts[taskId] ?? emptyDraft()
          const confirmed = current.confirmedPointIds.includes(pointId)
            ? current.confirmedPointIds.filter((id) => id !== pointId)
            : [...current.confirmedPointIds, pointId]
          return { drafts: { ...state.drafts, [taskId]: { ...current, confirmedPointIds: confirmed } } }
        }),

      clearDraft: (taskId) =>
        set((state) => {
          const { [taskId]: _removed, ...rest } = state.drafts
          return { drafts: rest }
        }),

      replaceDrafts: (drafts) => set({ drafts: sanitizeWritingDrafts(drafts) }),
    }),
    {
      name: 'writing-drafts',
      partialize: (state): WritingState => ({ drafts: state.drafts }),
      storage: {
        getItem: (name) => {
          const value = zustandStorageEngine.getItem(name)
          if (!value) return null
          try {
            const parsed: unknown = JSON.parse(value)
            const stored = typeof parsed === 'object' && parsed !== null ? (parsed as { state?: { drafts?: unknown } }) : {}
            return { state: { drafts: sanitizeWritingDrafts(stored.state?.drafts) } }
          } catch {
            // A corrupted entry must never brick the section — start with no drafts.
            return null
          }
        },
        setItem: (name, value) => zustandStorageEngine.setItem(name, JSON.stringify(value)),
        removeItem: (name) => zustandStorageEngine.removeItem(name),
      },
    },
  ),
)

export type WritingStatus = 'new' | 'draft' | 'done'

/** Where a task stands: nothing written, a draft, or marked done. */
export function selectWritingStatus(taskId: string) {
  return (state: WritingStore): WritingStatus => {
    const draft = state.drafts[taskId]
    if (!draft) return 'new'
    if (draft.completed) return 'done'
    return draft.text.trim().length > 0 ? 'draft' : 'new'
  }
}
