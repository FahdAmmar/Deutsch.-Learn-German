import { Check, Clock } from 'lucide-react'
import { Link } from 'react-router-dom'

import { cn } from '@/lib/cn'
import type { Lesson } from '@/types'

interface LessonListItemProps {
  lesson: Lesson
  completed: boolean
  /** The lesson the learner would resume with. */
  isNext?: boolean
}

export function LessonListItem({ lesson, completed, isNext }: LessonListItemProps) {
  return (
    <Link
      to={`/lessons/${lesson.level.toLowerCase()}/${lesson.slug}`}
      className="flex items-center gap-3 px-4 py-3.5 transition-colors hover:bg-surface-sunken/60 sm:px-5"
    >
      <span
        aria-hidden="true"
        className={cn(
          'flex h-6 w-6 shrink-0 items-center justify-center rounded-full',
          completed && 'bg-success text-success-foreground',
          !completed && isNext && 'border-2 border-accent',
          !completed && !isNext && 'border-2 border-rail',
        )}
      >
        {completed ? <Check size={14} strokeWidth={3} /> : isNext ? <span className="h-2 w-2 rounded-full bg-accent-vivid" /> : null}
      </span>

      <span dir="rtl" className="min-w-0 flex-1">
        <span className="block font-semibold text-ink">{lesson.titleAr}</span>
        <span dir="ltr" lang="de" className="display-de block text-end text-sm font-normal text-ink-faint">
          {lesson.title}
        </span>
      </span>

      <span dir="rtl" className="flex shrink-0 items-center gap-1.5 text-xs text-ink-muted">
        {completed ? <span className="sr-only">مكتمل،</span> : null}
        <Clock size={13} aria-hidden="true" />
        <span className="tnum">{lesson.estimatedMinutes} د</span>
      </span>
    </Link>
  )
}
