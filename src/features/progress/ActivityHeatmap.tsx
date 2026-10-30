import { useEffect, useRef } from 'react'

import { cn } from '@/lib/cn'
import { buildHeatmap, type HeatmapDay } from '@/lib/stats'
import type { LearningStats } from '@/types'

const WEEKS = 20
/** Saturday first — the start of the week in much of the Arab world. Row labels below follow this order. */
const ROW_LABELS_AR = ['السبت', 'الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة']

const LEVEL_CLASS: Record<HeatmapDay['level'], string> = {
  0: 'bg-surface-sunken',
  1: 'bg-accent-vivid/25',
  2: 'bg-accent-vivid/45',
  3: 'bg-accent-vivid/70',
  4: 'bg-accent-vivid',
}

interface ActivityHeatmapProps {
  stats: Pick<LearningStats, 'days'>
}

/**
 * A GitHub-style calendar of the last 20 weeks: one square per day, darker for
 * more questions answered. The grid is a picture of the pattern; the exact
 * numbers are in each square's tooltip and in the summary line, which is also
 * what a screen reader gets.
 */
export function ActivityHeatmap({ stats }: ActivityHeatmapProps) {
  const columns = buildHeatmap({ days: stats.days, byType: {}, byModule: {} }, { weeks: WEEKS })
  const scrollerRef = useRef<HTMLDivElement>(null)

  const cells = columns.flat()
  const activeDays = cells.filter((day) => day.attempts > 0).length
  const totalAnswers = cells.reduce((sum, day) => sum + day.attempts, 0)

  // The grid runs oldest → newest, left to right; on a narrow screen start at the recent end.
  useEffect(() => {
    const scroller = scrollerRef.current
    if (scroller) scroller.scrollLeft = scroller.scrollWidth
  }, [])

  return (
    <div className="space-y-3">
      <div ref={scrollerRef} dir="ltr" role="region" aria-label="خريطة النشاط اليومي" tabIndex={0} className="overflow-x-auto pb-1">
        <div className="flex w-max gap-2" aria-hidden="true">
          <div className="grid grid-rows-7 gap-[3px] pe-1 text-[0.65rem] leading-none text-ink-faint">
            {ROW_LABELS_AR.map((label, row) => (
              <span key={label} className="flex h-3.5 items-center sm:h-4">
                {row % 2 === 0 ? label : ''}
              </span>
            ))}
          </div>
          <div className="flex gap-[3px]">
            {columns.map((column) => (
              <div key={column[0].day} className="grid grid-rows-7 gap-[3px]">
                {column.map((day) => (
                  <span
                    key={day.day}
                    title={`${day.day}: ${day.attempts} سؤالاً`}
                    className={cn('h-3.5 w-3.5 rounded-[3px] sm:h-4 sm:w-4', LEVEL_CLASS[day.level])}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <p dir="rtl" className="tnum text-sm text-ink-muted">
        {activeDays === 0
          ? 'لا نشاط بعد في آخر 20 أسبوعاً. أجب عن بعض الأسئلة لتبدأ الخريطة بالتلوّن.'
          : `${activeDays} يوماً نشطاً و${totalAnswers} سؤالاً في آخر 20 أسبوعاً.`}
      </p>
    </div>
  )
}
