import { Link } from 'react-router-dom'

import { ProgressBar } from '@/components/ui'
import { getLevelProgressSummary } from '@/features/dashboard/selectors'
import { useProgressStore } from '@/store/progressStore'
import { CEFR_LEVEL_INFO } from '@/types'

import { Brand } from './Brand'
import { NavList } from './NavList'

/** Footer block: where the learner stands in their current level. */
function LevelFooter() {
  const currentLevel = useProgressStore((state) => state.currentLevel)
  const lessons = useProgressStore((state) => state.lessons)
  const summary = getLevelProgressSummary({ lessons }, currentLevel)

  return (
    <Link
      to={`/levels/${currentLevel.toLowerCase()}`}
      className="block space-y-2 border-t border-border bg-bg-alt p-4 transition-colors hover:bg-surface-sunken"
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

export function Sidebar() {
  return (
    <aside className="fixed inset-y-0 start-0 hidden w-72 flex-col border-e border-border bg-surface shadow-sm md:flex">
      <div className="flex h-16 items-center border-b border-border px-6">
        <Brand />
      </div>
      <NavList />
      <LevelFooter />
    </aside>
  )
}
