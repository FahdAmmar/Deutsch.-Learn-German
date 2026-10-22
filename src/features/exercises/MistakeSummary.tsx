import { BookOpen } from 'lucide-react'
import { Link, useInRouterContext } from 'react-router-dom'

import { digestExercise } from '@/lib/exerciseSummary'
import { getLessonByExerciseId } from '@/lib/curriculum'
import type { Exercise, Lesson } from '@/types'

/** More than this many mistakes are summarised as "and N more" so the card stays scannable. */
const MAX_LISTED = 5

interface MistakeSummaryProps {
  mistakes: readonly Exercise[]
}

/** The end-of-session list of what went wrong: the question, the right answer, and where it was taught. */
export function MistakeSummary({ mistakes }: MistakeSummaryProps) {
  const inRouter = useInRouterContext()
  if (mistakes.length === 0) return null

  const listed = mistakes.slice(0, MAX_LISTED)
  const hidden = mistakes.length - listed.length

  const lessons = new Map<string, Lesson>()
  for (const exercise of mistakes) {
    const lesson = getLessonByExerciseId(exercise.id)
    if (lesson) lessons.set(lesson.id, lesson)
  }

  return (
    <section dir="rtl" aria-label="أخطاء هذه الجلسة" className="w-full max-w-xl space-y-3 text-start">
      <h3 className="font-sans text-base font-bold text-ink">ما أخطأت فيه</h3>
      <ul className="space-y-2">
        {listed.map((exercise) => {
          const digest = digestExercise(exercise)
          return (
            <li key={exercise.id} className="rounded-md bg-surface-sunken p-3.5">
              <p
                lang={digest.promptLanguage}
                dir={digest.promptLanguage === 'de' ? 'ltr' : 'rtl'}
                className="font-medium text-ink"
              >
                {digest.prompt}
              </p>
              <p className="mt-1 text-sm text-ink-muted">
                الإجابة الصحيحة:{' '}
                <bdi lang={digest.answerLanguage} className="font-semibold text-success">
                  {digest.answer}
                </bdi>
              </p>
            </li>
          )
        })}
      </ul>
      {hidden > 0 ? <p className="text-sm text-ink-muted">و{hidden} أخرى.</p> : null}

      {inRouter && lessons.size > 0 ? (
        <div className="flex flex-wrap gap-2 pt-1">
          {[...lessons.values()].map((lesson) => (
            <Link
              key={lesson.id}
              to={`/lessons/${lesson.level.toLowerCase()}/${lesson.slug}`}
              className="inline-flex items-center gap-1.5 rounded-full border border-border-strong px-3 py-1.5 text-sm font-semibold text-primary transition-colors hover:bg-surface-sunken"
            >
              <BookOpen size={15} aria-hidden="true" />
              راجع الدرس: {lesson.titleAr}
            </Link>
          ))}
        </div>
      ) : null}
    </section>
  )
}
