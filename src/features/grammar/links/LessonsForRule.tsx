import { GraduationCap } from 'lucide-react'
import { Link } from 'react-router-dom'

import type { Lesson } from '@/types'

interface LessonsForRuleProps {
  lessons: readonly Lesson[]
}

/** Links from a grammar rule back to the lessons that practise it in context. */
export function LessonsForRule({ lessons }: LessonsForRuleProps) {
  if (lessons.length === 0) return null

  return (
    <nav aria-labelledby="rule-lessons-heading" dir="rtl" className="space-y-3 rounded-lg bg-surface-sunken p-4">
      <h2 id="rule-lessons-heading" className="flex items-center gap-2 font-sans text-base font-bold text-ink">
        <GraduationCap size={16} aria-hidden="true" />
        تدرّب على هذه القاعدة في الدروس
      </h2>
      <ul className="flex flex-wrap gap-2">
        {lessons.map((lesson) => (
          <li key={lesson.id}>
            <Link
              to={`/lessons/${lesson.level.toLowerCase()}/${lesson.slug}`}
              className="inline-flex items-center gap-2 rounded-md border border-border bg-surface px-3.5 py-2 text-[0.95rem] font-medium text-ink transition-colors hover:border-border-strong focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              <span>{lesson.titleAr}</span>
              <span dir="ltr" lang="de" className="text-xs font-normal text-ink-muted">
                {lesson.level} · {lesson.title}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
