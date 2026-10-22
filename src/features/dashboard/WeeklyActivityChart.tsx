import { cn } from '@/lib/cn'

import type { DayActivity } from './selectors'

const WEEKDAY_AR = ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت']

interface WeeklyActivityChartProps {
  days: readonly DayActivity[]
}

/** The last seven days as bars. Each bar counts lessons started or finished and exercise sets completed that day. */
export function WeeklyActivityChart({ days }: WeeklyActivityChartProps) {
  const max = Math.max(1, ...days.map((day) => day.count))
  const total = days.reduce((sum, day) => sum + day.count, 0)

  return (
    <section dir="rtl" aria-labelledby="weekly-activity-title" className="space-y-5 rounded-lg border border-border bg-surface p-5 shadow-sm sm:p-6">
      <header className="space-y-1">
        <h2 id="weekly-activity-title" className="text-xl font-bold text-ink">
          نشاطك هذا الأسبوع
        </h2>
        <p className="text-sm text-ink-muted">
          {total === 0 ? 'لا نشاط مسجّلاً في آخر سبعة أيام. درس واحد اليوم يبدأ الأسبوع.' : `${total} نشاطاً في آخر سبعة أيام.`}
        </p>
      </header>

      <ol className="flex h-40 items-end gap-2 sm:gap-3">
        {[...days].reverse().map((day) => (
          <li key={day.key} className="flex h-full min-w-0 flex-1 flex-col items-center justify-end gap-2">
            <span className="tnum text-xs font-semibold text-ink-muted">{day.count > 0 ? day.count : ''}</span>
            <div
              role="img"
              aria-label={`${WEEKDAY_AR[day.weekday]}: ${day.count} نشاط`}
              style={{ height: `${Math.max(day.count / max, 0.06) * 100}%` }}
              className={cn('w-full max-w-10 rounded-t-md', day.isToday ? 'bg-primary' : day.count > 0 ? 'bg-accent-vivid' : 'bg-surface-sunken')}
            />
            <span className={cn('text-xs', day.isToday ? 'font-bold text-ink' : 'text-ink-muted')}>{WEEKDAY_AR[day.weekday]}</span>
          </li>
        ))}
      </ol>
    </section>
  )
}
