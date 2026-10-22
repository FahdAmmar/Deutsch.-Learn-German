import { Link } from 'react-router-dom'

import { Button } from '@/components/ui'
import { cn } from '@/lib/cn'

import type { BoxDistribution } from './boxes'

interface BoxDistributionChartProps {
  distribution: BoxDistribution
}

/** The five Leitner boxes as bars: the further right a word sits, the better it is remembered and the less often it returns. */
export function BoxDistributionChart({ distribution }: BoxDistributionChartProps) {
  const { boxes, total, due } = distribution

  if (total === 0) {
    return (
      <p dir="rtl" className="text-ink-muted">
        لم تراجع أي كلمة بعد. تظهر هنا كلمات دروسك المكتملة بعد أول مراجعة لها.
      </p>
    )
  }

  const tallest = Math.max(1, ...boxes.map((slot) => slot.count))

  return (
    <div className="space-y-4">
      <ol dir="rtl" className="grid grid-cols-5 gap-2 sm:gap-3">
        {boxes.map((slot) => (
          <li key={slot.box} className="flex flex-col items-center gap-2">
            <span className="tnum text-sm font-semibold text-ink">{slot.count}</span>
            <div className="flex h-28 w-full items-end">
              <div
                role="img"
                aria-label={`الصندوق ${slot.box + 1}: ${slot.count} كلمة`}
                style={{ height: `${Math.max(slot.count / tallest, slot.count > 0 ? 0.08 : 0.03) * 100}%` }}
                className={cn('w-full rounded-t-md', slot.count > 0 ? 'bg-accent-vivid' : 'bg-surface-sunken')}
              />
            </div>
            <span className="text-center text-xs leading-tight text-ink-muted">
              الصندوق {slot.box + 1}
              <br />
              {slot.intervalDays === 1 ? 'كل يوم' : `كل ${slot.intervalDays} ${slot.intervalDays <= 10 ? 'أيام' : 'يوماً'}`}
            </span>
          </li>
        ))}
      </ol>

      <div dir="rtl" className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-ink-muted">
          {total} كلمة تمت مراجعتها، منها {due} جاهزة للمراجعة الآن.
        </p>
        {due > 0 ? (
          <Link to="/review">
            <Button size="sm">راجع الآن</Button>
          </Link>
        ) : null}
      </div>
    </div>
  )
}
