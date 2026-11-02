import { z } from 'zod'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { snoozeUntil } from '@/lib/backupReminder'
import { zustandStorageEngine } from '@/lib/storage'

const stateSchema = z.object({
  armedAt: z.number().nullable(),
  lastExportAt: z.number().nullable(),
  snoozedUntil: z.number().nullable(),
})

type ReminderState = z.infer<typeof stateSchema>

interface ReminderActions {
  /** The learner now has progress worth saving. Only the first call counts: it starts the wait before the first reminder. */
  arm: (now?: number) => void
  /** A backup file was just downloaded. */
  markExported: (now?: number) => void
  /** "Remind me later". */
  snooze: (now?: number) => void
}

const initialState: ReminderState = { armedAt: null, lastExportAt: null, snoozedUntil: null }

/**
 * When to remind about a backup. It describes this device and this learner's habits, not their learning, so it is
 * kept out of the backup file itself.
 */
export const useBackupReminderStore = create<ReminderState & ReminderActions>()(
  persist(
    (set) => ({
      ...initialState,
      arm: (now = Date.now()) => set((state) => (state.armedAt === null ? { armedAt: now } : state)),
      markExported: (now = Date.now()) => set({ lastExportAt: now, snoozedUntil: null }),
      snooze: (now = Date.now()) => set({ snoozedUntil: snoozeUntil(now) }),
    }),
    {
      name: 'backup-reminder',
      partialize: (state): ReminderState => ({ armedAt: state.armedAt, lastExportAt: state.lastExportAt, snoozedUntil: state.snoozedUntil }),
      storage: {
        getItem: (name) => {
          const value = zustandStorageEngine.getItem(name)
          if (!value) return null
          try {
            const parsed = JSON.parse(value) as { state?: unknown }
            const checked = stateSchema.safeParse(parsed.state)
            return checked.success ? { state: checked.data } : null
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
