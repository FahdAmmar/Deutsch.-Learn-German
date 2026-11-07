import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

import { dailySessionParts } from '@/features/practice/dailySession'
import { useDailySessionPlan } from '@/features/practice/useDailySessionPlan'
import { useDailyGoalProgress } from '@/features/progress/useDailyGoalProgress'
import { CEFR_LEVEL_INFO } from '@/types'
import type { CEFRLevel, Lesson } from '@/types'

interface TodayPanelProps {
  level: CEFRLevel
  hasStarted: boolean
  continueLesson: Lesson | undefined
  /** Every word that is due for review, not only the share that today's session holds. */
  dueCount: number
}

const SESSION_HREF = '/practice?session=daily'

// The panel is navy in light mode, so the global focus ring (navy) would vanish on it: its own links draw theirs in the panel's foreground.
const onNavyFocus = 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-on-primary-container'

const primaryAction = `inline-flex h-12 items-center gap-2 rounded-md bg-on-primary-container px-6 font-semibold text-primary-container transition-transform active:scale-[0.98] ${onNavyFocus}`
const secondaryAction = `inline-flex h-12 items-center gap-2 rounded-md border border-on-primary-container/40 px-5 font-semibold transition-colors hover:bg-on-primary-container/10 ${onNavyFocus}`

/**
 * The one loud block of the dashboard. When today's session holds words to keep or topics to strengthen, it leads:
 * what the session is made of and a single way to start it. Until then (a first visit, or only new questions left)
 * the next lesson leads, because questions from a lesson the learner has not met are not a way to begin.
 */
export function TodayPanel({ level, hasStarted, continueLesson, dueCount }: TodayPanelProps) {
  const session = useDailySessionPlan(level)
  const goal = useDailyGoalProgress()
  const parts = dailySessionParts(session)

  const hasSession = session.exercises.length > 0
  const keepsWhatWasLearned = hasStarted && session.due + session.weak > 0
  const lessonLink = continueLesson
    ? { to: `/lessons/${continueLesson.level.toLowerCase()}/${continueLesson.slug}`, label: hasStarted ? 'تابع التعلّم الآن' : 'ابدأ أول درس' }
    : undefined
  const sessionLeads = hasSession && (keepsWhatWasLearned || !lessonLink)
  const primary = sessionLeads ? { to: SESSION_HREF, label: 'ابدأ جلسة اليوم' } : lessonLink
  const sessionIsSecondary = hasSession && hasStarted && !sessionLeads

  return (
    <section
      dir="rtl"
      aria-labelledby="today-title"
      className="space-y-8 rounded-xl bg-primary-container p-6 text-on-primary-container shadow-md sm:p-10"
    >
      <div className="space-y-4">
        <h1 id="today-title" className="text-[1.9rem] leading-tight font-extrabold sm:text-4xl">
          {hasStarted ? 'مرحباً بعودتك' : 'مرحباً بك في رحلتك مع الألمانية'}
        </h1>

        {sessionLeads ? (
          <div className="space-y-2">
            <p className="text-[1.0625rem] leading-8">
              جلسة اليوم جاهزة: <span className="tnum font-bold">{session.exercises.length}</span> سؤالاً
            </p>
            <ul aria-label="مكوّنات الجلسة" className="flex flex-wrap gap-x-6 gap-y-1 text-sm">
              {parts.map((part) => (
                <li key={part} className="tnum">
                  {part}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="max-w-[52ch] text-[1.0625rem] leading-8">{CEFR_LEVEL_INFO[level].descriptionAr}</p>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        {primary ? (
          <Link to={primary.to} className={primaryAction}>
            {primary.label}
            <ArrowLeft size={18} aria-hidden="true" />
          </Link>
        ) : null}

        {sessionIsSecondary ? (
          <Link to={SESSION_HREF} className={secondaryAction}>
            جلسة اليوم
            <span className="tnum rounded-full bg-on-primary-container/15 px-2 py-0.5 text-sm font-bold">{session.exercises.length}</span>
          </Link>
        ) : null}

        {dueCount > 0 ? (
          <Link to="/review" className={secondaryAction}>
            مراجعة بالبطاقات
            <span className="tnum rounded-full bg-on-primary-container/15 px-2 py-0.5 text-sm font-bold">{dueCount}</span>
          </Link>
        ) : null}

        {!hasStarted ? (
          <Link to="/placement-test" className={`px-2 py-3 font-semibold underline underline-offset-4 ${onNavyFocus}`}>
            اختبر مستواك
          </Link>
        ) : null}
      </div>

      <div className="space-y-2">
        <div
          role="progressbar"
          aria-label="الهدف اليومي"
          aria-valuemin={0}
          aria-valuemax={goal.goal}
          aria-valuenow={Math.min(goal.answered, goal.goal)}
          aria-valuetext={`${goal.answered} من ${goal.goal} سؤالاً`}
          className="h-1.5 w-full overflow-hidden rounded-full bg-on-primary-container/20"
        >
          <div className="h-full rounded-full bg-on-primary-container" style={{ width: `${Math.round(goal.ratio * 100)}%` }} />
        </div>
        <p className="tnum text-sm">
          {goal.reached ? `حقّقت هدف اليوم: ${goal.answered} سؤالاً` : `أجبت عن ${goal.answered} من ${goal.goal} سؤالاً اليوم`}
        </p>
      </div>
    </section>
  )
}
