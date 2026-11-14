import { Link } from 'react-router-dom'

import { ProgressBar } from '@/components/ui'
import { getLevelProgressSummary } from '@/features/dashboard/selectors'
import { cn } from '@/lib/cn'
import { useProgressStore } from '@/store/progressStore'
import { CEFR_LEVEL_INFO } from '@/types'

interface LevelFooterProps {
  /** `sidebar` — a full-width strip closing the sidebar. `card` — a bordered card inside the phone's "More" sheet. */
  variant?: 'sidebar' | 'card'
  onNavigate?: () => void
}

/** Where the learner stands in their current level: the level, a progress bar and the lesson count. Leads to the plan. */
export function LevelFooter({ variant = 'sidebar', onNavigate }: LevelFooterProps) {
  const currentLevel = useProgressStore((state) => state.currentLevel)
  const lessons = useProgressStore((state) => state.lessons)
  const summary = getLevelProgressSummary({ lessons }, currentLevel)

  return (
    <Link
      to="/levels"
      onClick={onNavigate}
      className={cn(
        'block space-y-2 bg-bg-alt p-4 transition-colors hover:bg-surface-sunken active:bg-surface-sunken',
        variant === 'sidebar' ? 'border-t border-border' : 'rounded-lg border border-border',
      )}
    >
      <div className="flex items-baseline justify-between gap-2">
        <span className="font-heading text-sm font-bold text-ink">{currentLevel}</span>
        <span dir="rtl" className="text-xs text-ink-muted">
          {CEFR_LEVEL_INFO[currentLevel].titleAr}
        </span>
      </div>
      <ProgressBar value={summary.ratio} size="sm" label={`التقدّم في المستوى ${currentLevel}`} />
      <p dir="rtl" className="tnum text-xs text-ink-muted">
        {summary.completedLessons} من {summary.totalLessons} دروس
      </p>
    </Link>
  )
}
