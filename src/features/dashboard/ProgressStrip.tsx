import type { ReactNode } from 'react'

import { LevelMark } from '@/features/levels/LevelMark'
import { CEFR_LEVEL_INFO } from '@/types'
import type { CEFRLevel } from '@/types'

interface ProgressStripProps {
  level: CEFRLevel
  levelRatio: number
  completedLessons: number
  totalLessons: number
  reviewedWords: number
  totalWords: number
  streakDays: number
}

function Figure({ label, caption, children }: { label: ReactNode; caption: ReactNode; children: ReactNode }) {
  return (
    <div className="space-y-1">
      <dt className="flex items-center gap-2 text-sm font-medium text-ink-muted">{label}</dt>
      <dd className="space-y-1">
        <span className="font-heading tnum block text-3xl leading-none font-extrabold text-ink">{children}</span>
        <span className="block text-sm text-ink-muted">{caption}</span>
      </dd>
    </div>
  )
}

/** Where the learner stands, as four numbers from their own progress. The numbers are the content: no tiles, no icons. */
export function ProgressStrip({
  level,
  levelRatio,
  completedLessons,
  totalLessons,
  reviewedWords,
  totalWords,
  streakDays,
}: ProgressStripProps) {
  const unit = streakDays === 1 ? 'يوم' : 'أيام'

  return (
    <section aria-label="ملخّص تقدّمك" dir="rtl" className="border-y border-border py-6">
      <dl className="grid grid-cols-2 gap-x-6 gap-y-6 lg:grid-cols-4">
        <Figure
          label={
            <>
              <LevelMark level={level} size="sm" />
              المستوى الحالي
            </>
          }
          caption={
            <span dir="ltr" lang="de" className="block text-start">
              {CEFR_LEVEL_INFO[level].titleDe}
            </span>
          }
        >
          {Math.round(levelRatio * 100)}%
        </Figure>

        <Figure label="الدروس المنجزة" caption="في هذا المستوى">
          {completedLessons}
          <span className="text-lg font-semibold text-ink-muted"> / {totalLessons}</span>
        </Figure>

        <Figure label="المفردات المراجَعة" caption="من مفردات المستوى">
          {reviewedWords}
          <span className="text-lg font-semibold text-ink-muted"> / {totalWords}</span>
        </Figure>

        <Figure label="سلسلة التعلّم" caption={streakDays > 0 ? 'أيام متتالية من التعلّم' : 'أكمل درساً اليوم لتبدأ سلسلتك'}>
          {streakDays}
          <span className="text-lg font-semibold text-ink-muted"> {unit}</span>
        </Figure>
      </dl>
    </section>
  )
}
