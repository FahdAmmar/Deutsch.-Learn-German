import { CheckCircle2, Circle, Clock } from 'lucide-react'
import { Link } from 'react-router-dom'

import type { Lesson } from '@/types'

interface LessonListItemProps {
  lesson: Lesson
  completed: boolean
}

export function LessonListItem({ lesson, completed }: LessonListItemProps) {
  return (
    <Link
      to={`/lessons/${lesson.level.toLowerCase()}/${lesson.slug}`}
      className="flex items-center justify-between gap-3 px-4 py-3 transition-colors hover:bg-surface-muted"
    >
      <div dir="rtl" className="flex items-center gap-3">
        {completed ? (
          <CheckCircle2 size={20} className="shrink-0 text-success" aria-hidden="true" />
        ) : (
          <Circle size={20} className="shrink-0 text-ink-faint" aria-hidden="true" />
        )}
        <div>
          <p className="font-medium text-ink">{lesson.titleAr}</p>
          <p dir="ltr" lang="de" className="text-sm text-ink-muted">
            {lesson.title}
          </p>
        </div>
      </div>
      <div dir="rtl" className="flex shrink-0 items-center gap-1 text-xs text-ink-faint">
        <Clock size={13} aria-hidden="true" />
        <span>{lesson.estimatedMinutes} د</span>
      </div>
    </Link>
  )
}
