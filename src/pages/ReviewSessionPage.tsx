import { ClipboardCheck } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import { Button, EmptyState, PageHeader } from '@/components/ui'
import { ExerciseRunner } from '@/features/exercises/ExerciseRunner'
import { buildChapterReview, buildLevelTest } from '@/lib/chapterReview'
import { CEFR_LEVEL_INFO } from '@/types'
import type { CEFRLevel } from '@/types'

interface ReviewSessionPageProps {
  /** `chapter`: /levels/:level/review/:chapterId. `level`: /levels/:level/abschlusstest. */
  kind: 'chapter' | 'level'
}

function parseLevel(value: string | undefined): CEFRLevel | undefined {
  const upper = value?.toUpperCase()
  return upper === 'A1' || upper === 'A2' || upper === 'B1' || upper === 'B2' ? upper : undefined
}

/**
 * Two routes, one page: a review of one chapter of the plan, and the final test of a level. Both only draw from
 * the exercises already authored for the lessons, so every question has its explanation, and the answers feed the
 * same statistics as a lesson's exercises. A new draw is one button away.
 */
export default function ReviewSessionPage({ kind }: ReviewSessionPageProps) {
  const { level: levelParam, chapterId } = useParams<{ level: string; chapterId: string }>()
  const level = parseLevel(levelParam)
  const [draw, setDraw] = useState(0)
  const [finished, setFinished] = useState(false)

  const session = useMemo(() => {
    // `draw` only exists to ask for a fresh random draw.
    void draw
    if (!level) return undefined
    if (kind === 'chapter') {
      const review = chapterId ? buildChapterReview(level, chapterId) : undefined
      return review ? { title: `مراجعة: ${review.chapter.titleAr}`, titleDe: review.chapter.titleDe, exercises: review.exercises, lessons: review.lessons } : undefined
    }
    const test = buildLevelTest(level)
    return test
      ? { title: `الاختبار الختامي: ${CEFR_LEVEL_INFO[level].titleAr}`, titleDe: `Abschlusstest ${level}`, exercises: test.exercises, lessons: test.lessons }
      : undefined
  }, [level, chapterId, kind, draw])

  const back = (
    <Link to="/levels" className="text-sm font-semibold text-primary underline underline-offset-4">
      العودة إلى الخطة
    </Link>
  )

  if (!session) {
    return (
      <EmptyState icon={ClipboardCheck} title="لا توجد أسئلة لهذه المراجعة" action={back}>
        ربما تغيّر الرابط. افتح الخطة واختر فصلاً من القائمة.
      </EmptyState>
    )
  }

  return (
    <div className="space-y-8 pb-6">
      <PageHeader
        title={session.title}
        titleDe={session.titleDe}
        description={`${session.exercises.length} سؤالاً من ${session.lessons.length} دروس، كلها من تمارين الدروس نفسها، لكل سؤال شرحه.`}
        actions={back}
      />
      <ExerciseRunner key={draw} exercises={session.exercises} onComplete={() => setFinished(true)} />
      {finished ? (
        <div dir="rtl" className="flex flex-wrap items-center gap-3">
          <Button
            variant="outline"
            onClick={() => {
              setFinished(false)
              setDraw((value) => value + 1)
            }}
          >
            مراجعة جديدة بأسئلة أخرى
          </Button>
        </div>
      ) : null}
    </div>
  )
}
