import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

import { Button, ProgressBar } from '@/components/ui'
import { CEFR_LEVEL_INFO } from '@/types'
import type { CEFRLevel, Lesson } from '@/types'
import { formatCountAr, LESSON_FORMS, MODULE_FORMS } from '@/utils/arabicCount'

import { LevelMark } from './LevelMark'
import { LEVEL_STYLE } from './levelTone'

interface LevelHeaderProps {
  level: CEFRLevel
  moduleCount: number
  totalLessons: number
  completedLessons: number
  /** First unfinished lesson in the level, if any. */
  nextLesson?: Lesson
}

export function LevelHeader({ level, moduleCount, totalLessons, completedLessons, nextLesson }: LevelHeaderProps) {
  const info = CEFR_LEVEL_INFO[level]
  const ratio = totalLessons === 0 ? 0 : completedLessons / totalLessons

  return (
    <header dir="rtl" className="space-y-5">
      <div className="flex items-start gap-4">
        <LevelMark level={level} size="lg" />
        <div className="min-w-0 space-y-1">
          <h1 className="text-[1.9rem] leading-tight font-bold text-ink sm:text-4xl">{info.titleAr}</h1>
          <p lang="de" dir="ltr" className="display-de text-end text-lg font-medium text-ink-faint">
            {info.titleDe}
          </p>
        </div>
      </div>

      {totalLessons > 0 ? (
        <div className="space-y-4">
          <div className="max-w-xl space-y-2">
            <ProgressBar value={ratio} tone={LEVEL_STYLE[level].tone} label={`التقدّم في المستوى ${level}`} />
            <p className="tnum text-sm text-ink-muted">
              أكملت {completedLessons} من {formatCountAr(totalLessons, LESSON_FORMS)} في {formatCountAr(moduleCount, MODULE_FORMS)}
            </p>
          </div>

          {nextLesson ? (
            <Link to={`/lessons/${nextLesson.level.toLowerCase()}/${nextLesson.slug}`} className="inline-block">
              <Button icon={<ArrowLeft size={17} aria-hidden="true" />} iconPosition="end">
                {completedLessons > 0 ? 'تابع من حيث توقفت' : 'ابدأ أول درس'}
              </Button>
            </Link>
          ) : null}
        </div>
      ) : null}
    </header>
  )
}
