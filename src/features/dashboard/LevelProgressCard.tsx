import { Link } from 'react-router-dom'

import { ProgressBar } from '@/components/ui'
import type { LevelProgressSummary } from './selectors'
import type { CEFRLevel } from '@/types'

interface LevelProgressCardProps {
  level: CEFRLevel
  summary: LevelProgressSummary
}

export function LevelProgressCard({ level, summary }: LevelProgressCardProps) {
  return (
    <div className="rounded-lg border border-border bg-surface p-4">
      <div dir="rtl" className="mb-3 flex items-center justify-between">
        <h3 className="font-semibold text-ink">التقدّم في المستوى {level}</h3>
        <Link to={`/levels/${level.toLowerCase()}`} className="text-sm text-primary hover:underline">
          عرض التفاصيل
        </Link>
      </div>
      <ProgressBar value={summary.ratio} tone="success" label={`التقدّم في المستوى ${level}`} />
      <p dir="rtl" className="mt-2 text-sm text-ink-muted">
        أكملت {summary.completedLessons} من {summary.totalLessons} درساً
      </p>
    </div>
  )
}
