import { BookOpen, Check, Clock } from 'lucide-react'
import { Link } from 'react-router-dom'

import { cn } from '@/lib/cn'
import { getGrammarRulesForLesson } from '@/lib/grammarLinks'
import { grammarRulePath, isRulePublished } from '@/lib/grammarRoadmap'
import type { Lesson } from '@/types'

interface PathLessonRowProps {
  lesson: Lesson
  completed: boolean
  /** The lesson the learner would resume with. */
  isNext: boolean
}

/** One lesson on a chapter's rail, with direct links to the grammar rules it practises. */
export function PathLessonRow({ lesson, completed, isNext }: PathLessonRowProps) {
  const rules = getGrammarRulesForLesson(lesson.id).filter((entry) => isRulePublished(entry.number))

  return (
    <li className="relative ps-7">
      <span
        aria-hidden="true"
        className={cn(
          'absolute -start-[13px] top-3.5 flex h-6 w-6 items-center justify-center rounded-full border-2',
          completed && 'border-success bg-success text-success-foreground',
          !completed && isNext && 'border-primary bg-surface',
          !completed && !isNext && 'border-rail bg-bg',
        )}
      >
        {completed ? <Check size={14} strokeWidth={3} /> : isNext ? <span className="h-2 w-2 rounded-full bg-primary" /> : null}
      </span>

      <Link
        to={`/lessons/${lesson.level.toLowerCase()}/${lesson.slug}`}
        className={cn(
          'flex items-center gap-3 rounded-md px-3 py-2.5 transition-colors hover:bg-surface-sunken',
          isNext && 'bg-primary-muted hover:bg-primary-muted',
        )}
      >
        <span className="min-w-0 flex-1">
          <span className="block font-semibold text-ink">
            {lesson.titleAr}
            {completed ? <span className="sr-only"> (مكتمل)</span> : null}
          </span>
          <span dir="ltr" lang="de" className="display-de block text-end text-sm font-normal text-ink-muted">
            {lesson.title}
          </span>
        </span>
        {isNext ? <span className="shrink-0 text-sm font-semibold text-primary">التالي</span> : null}
        <span className="flex shrink-0 items-center gap-1.5 text-xs text-ink-muted">
          <Clock size={13} aria-hidden="true" />
          <span className="tnum">{lesson.estimatedMinutes} د</span>
        </span>
      </Link>

      {rules.length > 0 ? (
        <ul aria-label={`قواعد مرتبطة بدرس ${lesson.titleAr}`} className="flex flex-wrap gap-1.5 px-3 pb-2.5">
          {rules.map((entry) => (
            <li key={entry.number}>
              <Link
                to={grammarRulePath(entry)}
                className="inline-flex items-center gap-1.5 rounded-sm border border-border bg-surface px-2.5 py-1 text-sm text-ink-muted transition-colors hover:border-border-strong hover:text-ink"
              >
                <BookOpen size={13} aria-hidden="true" />
                <span>{entry.titleAr}</span>
                <span dir="ltr" lang="de" className="text-xs">
                  {entry.termDe}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
    </li>
  )
}
