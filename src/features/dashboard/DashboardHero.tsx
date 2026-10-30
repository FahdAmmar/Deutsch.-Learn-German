import { ArrowLeft, ClipboardCheck } from 'lucide-react'
import { Link } from 'react-router-dom'

import { CEFR_LEVEL_INFO } from '@/types'
import type { CEFRLevel, Lesson } from '@/types'
import { formatCountAr, LESSON_FORMS } from '@/utils/arabicCount'

interface DashboardHeroProps {
  level: CEFRLevel
  completedLessons: number
  totalLessons: number
  continueLesson: Lesson | undefined
  hasStarted: boolean
}

/** Opening panel: where the learner stands, and the one thing to do next. Navy, as the design's structural colour. */
export function DashboardHero({ level, completedLessons, totalLessons, continueLesson, hasStarted }: DashboardHeroProps) {
  const info = CEFR_LEVEL_INFO[level]

  return (
    <section
      dir="rtl"
      aria-labelledby="dashboard-hero-title"
      className="relative overflow-hidden rounded-xl bg-primary-container p-6 text-on-primary-container shadow-md sm:p-10"
    >
      <div aria-hidden="true" className="pointer-events-none absolute -start-24 -top-24 h-72 w-72 rounded-full bg-accent/25 blur-3xl" />
      <div className="relative grid gap-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
        <div className="space-y-4">
          <p className="font-heading inline-flex items-center gap-2 rounded-full bg-on-primary-container/10 px-3 py-1 text-xs font-bold tracking-[0.08em]">
            <span dir="ltr">{level}</span>
            <span dir="ltr" lang="de" className="font-medium tracking-normal">
              {info.titleDe}
            </span>
          </p>
          <h1 id="dashboard-hero-title" className="text-[1.9rem] leading-tight font-extrabold sm:text-4xl">
            {hasStarted ? 'مرحباً بعودتك' : 'مرحباً بك في رحلتك مع الألمانية'}
          </h1>
          <p className="max-w-[52ch] text-[1.0625rem] leading-8">
            {totalLessons > 0
              ? `أنجزت ${completedLessons} من ${formatCountAr(totalLessons, LESSON_FORMS)} في هذا المستوى. ${info.descriptionAr}`
              : info.descriptionAr}
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          {continueLesson ? (
            <Link
              to={`/lessons/${continueLesson.level.toLowerCase()}/${continueLesson.slug}`}
              className="inline-flex h-12 items-center gap-2 rounded-md bg-on-primary-container px-6 font-semibold text-primary-container transition-transform active:scale-[0.98]"
            >
              {hasStarted ? 'تابع التعلّم الآن' : 'ابدأ أول درس'}
              <ArrowLeft size={18} aria-hidden="true" />
            </Link>
          ) : null}
          <Link
            to="/placement-test"
            className="inline-flex h-12 items-center gap-2 rounded-md border border-on-primary-container/40 px-5 font-semibold transition-colors hover:bg-on-primary-container/10"
          >
            <ClipboardCheck size={18} aria-hidden="true" />
            اختبر مستواك
          </Link>
        </div>
      </div>
    </section>
  )
}
