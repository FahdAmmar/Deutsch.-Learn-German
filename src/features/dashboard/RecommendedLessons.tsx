import { Clock } from 'lucide-react'
import { Link } from 'react-router-dom'

import { LevelMark } from '@/features/levels/LevelMark'
import type { Lesson } from '@/types'

interface RecommendedLessonsProps {
  lessons: readonly Lesson[]
}

/** The next lessons on the learner's path, after the one they are about to continue. */
export function RecommendedLessons({ lessons }: RecommendedLessonsProps) {
  if (lessons.length === 0) return null

  return (
    <section dir="rtl" aria-labelledby="recommended-title" className="space-y-4">
      <h2 id="recommended-title" className="text-xl font-bold text-ink">
        الدروس التالية في مسارك
      </h2>
      <ul className="grid gap-4 md:grid-cols-3">
        {lessons.map((lesson) => (
          <li key={lesson.id}>
            <Link
              to={`/lessons/${lesson.level.toLowerCase()}/${lesson.slug}`}
              className="flex h-full flex-col gap-4 rounded-lg border border-border bg-surface p-5 shadow-sm transition-[border-color,box-shadow] hover:border-border-strong hover:shadow-md"
            >
              <div className="flex items-center justify-between gap-2">
                <LevelMark level={lesson.level} size="sm" />
                <span className="flex items-center gap-1.5 text-xs text-ink-muted">
                  <Clock size={13} aria-hidden="true" />
                  <span className="tnum">{lesson.estimatedMinutes} دقيقة</span>
                </span>
              </div>
              <div className="space-y-1">
                <h3 dir="ltr" lang="de" className="display-de text-start text-xl text-ink">
                  {lesson.title}
                </h3>
                <p className="font-semibold text-ink-muted">{lesson.titleAr}</p>
              </div>
              <p className="mt-auto text-sm text-ink-muted">{lesson.objectivesAr[0]}</p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
