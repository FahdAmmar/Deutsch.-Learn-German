import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { EMPTY_STATS, withAnswer, type RecordedAnswer } from '@/lib/stats'
import { zustandStorageEngine } from '@/lib/storage'
import type { LearningStats } from '@/types'

interface StatsActions {
  recordAnswer: (answer: RecordedAnswer) => void
  /** Wholesale-replaces the stats — used by the backup import, and reset. */
  replaceStats: (stats: LearningStats) => void
  resetStats: () => void
}

type StatsStore = LearningStats & StatsActions

export const useStatsStore = create<StatsStore>()(
  persist(
    (set) => ({
      ...EMPTY_STATS,

      recordAnswer: (answer) => set((state) => withAnswer(state, answer)),

      replaceStats: (stats) => set({ days: stats.days, byType: stats.byType, byModule: stats.byModule }),

      resetStats: () => set(EMPTY_STATS),
    }),
    {
      name: 'stats',
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

/** Just the data part of the store, for export. */
export function selectStats(state: StatsStore): LearningStats {
  return { days: state.days, byType: state.byType, byModule: state.byModule }
}
