import { CheckCircle2, History } from 'lucide-react'
import { Link } from 'react-router-dom'

import { getLessonById } from '@/lib/curriculum'
import type { ActivityEntry } from '@/types'
import { formatRelativeTimeAr } from '@/utils/relativeTime'

interface RecentActivityListProps {
  activity: ActivityEntry[]
}

export function RecentActivityList({ activity }: RecentActivityListProps) {
  if (activity.length === 0) {
    return (
      <div dir="rtl" className="flex flex-col items-center gap-2 rounded-lg border border-dashed border-border p-6 text-center">
        <History size={22} className="text-ink-faint" aria-hidden="true" />
        <p className="text-sm text-ink-muted">لم تُكمل أي درس بعد. ابدأ أول درس لك اليوم!</p>
      </div>
    )
  }

  return (
    <ul className="divide-y divide-border rounded-lg border border-border bg-surface">
      {activity.slice(0, 6).map((entry) => {
        const lesson = getLessonById(entry.lessonId)
        return (
          <li key={entry.id}>
            <Link
              to={lesson ? `/lessons/${lesson.level.toLowerCase()}/${lesson.slug}` : '#'}
              className="flex items-center justify-between gap-3 px-4 py-3 hover:bg-surface-muted"
            >
              <div dir="rtl" className="flex items-center gap-2.5">
                <CheckCircle2 size={16} className="shrink-0 text-success" aria-hidden="true" />
                <span className="text-sm text-ink">{lesson?.titleAr ?? 'درس محذوف'}</span>
              </div>
              <span dir="rtl" className="shrink-0 text-xs text-ink-faint">
                {formatRelativeTimeAr(entry.timestamp)}
              </span>
            </Link>
          </li>
        )
      })}
    </ul>
  )
}
