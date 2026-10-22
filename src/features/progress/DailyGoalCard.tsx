import { Target } from 'lucide-react'

import { Card } from '@/components/ui'
import { answersOn } from '@/lib/stats'
import { useSettingsStore } from '@/store/settingsStore'
import { useStatsStore } from '@/store/statsStore'

const RADIUS = 42
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

/** Today's questions against the daily goal, as a ring with the numbers beside it (the ring alone would say nothing to a screen reader). */
export function DailyGoalCard() {
  const goal = useSettingsStore((state) => state.settings.dailyGoal)
  const days = useStatsStore((state) => state.days)
  const answered = answersOn({ days, byType: {}, byModule: {} })
  const reached = answered >= goal
  const ratio = Math.min(answered / goal, 1)

  return (
    <Card>
      <div dir="rtl" className="flex items-center gap-5 p-5">
        <div
          role="progressbar"
          aria-label="الهدف اليومي"
          aria-valuemin={0}
          aria-valuemax={goal}
          aria-valuenow={Math.min(answered, goal)}
          aria-valuetext={`${answered} من ${goal} سؤالاً`}
          className="relative h-24 w-24 shrink-0"
        >
          <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90" aria-hidden="true">
            <circle cx="50" cy="50" r={RADIUS} fill="none" strokeWidth="9" className="stroke-ink/10" />
            <circle
              cx="50"
              cy="50"
              r={RADIUS}
              fill="none"
              strokeWidth="9"
              strokeLinecap="round"
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={CIRCUMFERENCE * (1 - ratio)}
              className={reached ? 'stroke-success transition-[stroke-dashoffset] duration-500' : 'stroke-accent-vivid transition-[stroke-dashoffset] duration-500'}
            />
          </svg>
          <span className="display-de tnum absolute inset-0 flex items-center justify-center text-xl font-semibold text-ink">
            {Math.min(answered, goal)}
            <span className="text-sm font-normal text-ink-faint">/{goal}</span>
          </span>
        </div>

        <div className="space-y-1">
          <p className="flex items-center gap-2 font-sans text-lg font-bold text-ink">
            <Target size={18} className="text-accent" aria-hidden="true" />
            الهدف اليومي
          </p>
          <p className="text-ink-muted">
            {reached
              ? `حقّقت هدف اليوم${answered > goal ? ` وزدت عليه بـ ${answered - goal}` : ''}. أحسنت!`
              : `باقٍ ${goal - answered} سؤالاً لتحقيق هدف اليوم.`}
          </p>
        </div>
      </div>
    </Card>
  )
}
