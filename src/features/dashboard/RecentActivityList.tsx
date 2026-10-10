import { CheckCircle2, History } from 'lucide-react'
import { Link } from 'react-router-dom'

import { Card, EmptyState } from '@/components/ui'
import { getLessonById } from '@/lib/curriculum'
import type { ActivityEntry } from '@/types'
import { formatRelativeTimeAr } from '@/utils/relativeTime'

interface RecentActivityListProps {
  activity: ActivityEntry[]
}

export function RecentActivityList({ activity }: RecentActivityListProps) {
  if (activity.length === 0) {
    return (
      <EmptyState icon={History} title="لم تُكمل أي درس بعد">
        أكمل درسك الأول وسيظهر هنا سجلّ ما أنجزته.
      </EmptyState>
    )
  }

  return (
    <Card>
      <ul className="divide-y divide-border">
        {activity.slice(0, 6).map((entry) => {
          const lesson = getLessonById(entry.lessonId)
          return (
            <li key={entry.id}>
              <Link
                to={lesson ? `/lessons/${lesson.level.toLowerCase()}/${lesson.slug}` : '#'}
                className="flex items-center justify-between gap-3 px-4 py-3.5 transition-colors hover:bg-surface-sunken/60"
              >
                <div dir="rtl" className="flex min-w-0 items-center gap-3">
                  <CheckCircle2 size={18} className="shrink-0 text-success" aria-hidden="true" />
                  <span className="truncate text-ink">{lesson?.titleAr ?? 'درس محذوف'}</span>
                </div>
                <span dir="rtl" className="shrink-0 text-xs text-ink-faint">
                  {formatRelativeTimeAr(entry.timestamp)}
                </span>
              </Link>
            </li>
          )
        })}
      </ul>
    </Card>
  )
}
