import { Check, Lock } from 'lucide-react'

import { ProgressBar } from '@/components/ui'
import { cn } from '@/lib/cn'
import type { CEFRLevel } from '@/types'

import { LEVEL_STYLE } from './levelTone'

export type TrackState = 'done' | 'current' | 'upcoming' | 'locked'

export interface TrackLevel {
  level: CEFRLevel
  ratio: number
  state: TrackState
}

const STATE_LABEL: Record<TrackState, string> = {
  done: 'مكتمل',
  current: 'قيد التعلّم',
  upcoming: 'التالي',
  locked: 'قريباً',
}

/** The CEFR ladder as one strip: A1 to B2, each stage with its own progress and state. */
export function PathTrack({ levels }: { levels: readonly TrackLevel[] }) {
  return (
    <ol dir="rtl" aria-label="مراحل المسار" className="grid grid-cols-4 gap-2 rounded-lg border border-border bg-surface p-4 shadow-sm sm:gap-4 sm:p-6">
      {levels.map((entry) => (
        <li key={entry.level} aria-current={entry.state === 'current' ? 'step' : undefined} className="min-w-0 space-y-2.5">
          <ProgressBar
            value={entry.state === 'locked' ? 0 : entry.ratio}
            tone={entry.state === 'done' ? 'success' : LEVEL_STYLE[entry.level].tone}
            label={`التقدّم في المستوى ${entry.level}`}
          />
          <div className="flex items-center gap-1.5">
            <span
              dir="ltr"
              className={cn(
                'font-heading text-lg font-extrabold tracking-[0.04em]',
                entry.state === 'current' ? 'text-primary' : entry.state === 'locked' ? 'text-ink-faint' : 'text-ink',
              )}
            >
              {entry.level}
            </span>
            {entry.state === 'done' ? <Check size={15} strokeWidth={3} aria-hidden="true" className="text-success" /> : null}
            {entry.state === 'locked' ? <Lock size={14} aria-hidden="true" className="text-ink-faint" /> : null}
          </div>
          <p className="truncate text-xs text-ink-muted">{STATE_LABEL[entry.state]}</p>
        </li>
      ))}
    </ol>
  )
}
