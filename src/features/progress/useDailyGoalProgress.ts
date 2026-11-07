import { answersOn } from '@/lib/stats'
import { useSettingsStore } from '@/store/settingsStore'
import { useStatsStore } from '@/store/statsStore'

export interface DailyGoalProgress {
  goal: number
  /** Questions answered today. */
  answered: number
  reached: boolean
  /** Share of the goal done, held at 1 once it is reached. */
  ratio: number
}

/** Today's questions against the learner's daily goal — one definition for every screen that shows it. */
export function useDailyGoalProgress(): DailyGoalProgress {
  const goal = useSettingsStore((state) => state.settings.dailyGoal)
  const days = useStatsStore((state) => state.days)
  const answered = answersOn({ days, byType: {}, byModule: {} })

  return { goal, answered, reached: answered >= goal, ratio: Math.min(answered / goal, 1) }
}
