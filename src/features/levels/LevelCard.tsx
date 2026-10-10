import { ArrowLeft, Lock } from 'lucide-react'
import { Link } from 'react-router-dom'

import { Badge, Button, Card, ProgressBar } from '@/components/ui'
import { CEFR_LEVEL_INFO } from '@/types'
import type { CEFRLevel } from '@/types'
import { formatCountAr, LESSON_FORMS, MODULE_FORMS } from '@/utils/arabicCount'

import { LevelMark } from './LevelMark'
import { LEVEL_STYLE } from './levelTone'

interface LevelCardProps {
  level: CEFRLevel
  totalLessons: number
  completedLessons: number
  moduleCount: number
  /** The level the learner is working on now: gets the emphasised treatment. */
  isCurrent?: boolean
}

export function LevelCard({ level, totalLessons, completedLessons, moduleCount, isCurrent }: LevelCardProps) {
  const info = CEFR_LEVEL_INFO[level]
  const hasContent = totalLessons > 0
  const ratio = hasContent ? completedLessons / totalLessons : 0
  const started = completedLessons > 0
  const finished = hasContent && completedLessons === totalLessons
  const actionLabel = finished ? 'مراجعة المستوى' : started ? 'متابعة' : 'ابدأ المستوى'

  return (
    <Card tone={isCurrent ? 'brand' : hasContent ? 'surface' : 'tint'}>
      <div dir="rtl" className="space-y-4 p-5 sm:p-6">
        <div className="flex items-start gap-4">
          <LevelMark level={level} size="lg" muted={!hasContent} />
          <div className="min-w-0 flex-1">
            <h2
              lang="de"
              dir="ltr"
              className="display-de text-end text-xl font-semibold text-ink [overflow-wrap:anywhere] sm:text-2xl"
            >
              {info.titleDe}
            </h2>
            <p className="mt-0.5 font-semibold text-ink-muted">{info.titleAr}</p>
          </div>
        </div>

        <p className="text-ink-muted">{info.descriptionAr}</p>

        {hasContent ? (
          <>
            <div className="space-y-2">
              <ProgressBar value={ratio} tone={LEVEL_STYLE[level].tone} label={`التقدّم في المستوى ${level}`} />
              <div className="tnum flex items-center justify-between text-sm text-ink-muted">
                <span>
                  {formatCountAr(moduleCount, MODULE_FORMS)} · {formatCountAr(totalLessons, LESSON_FORMS)}
                </span>
                <span className="font-semibold text-ink">{Math.round(ratio * 100)}%</span>
              </div>
            </div>

            <Link to={`/levels/${level.toLowerCase()}`} className="block sm:inline-block">
              <Button
                variant={isCurrent ? 'primary' : 'outline'}
                className="w-full sm:w-auto"
                icon={<ArrowLeft size={17} aria-hidden="true" />}
                iconPosition="end"
              >
                {actionLabel}
              </Button>
            </Link>
          </>
        ) : (
          <p className="flex flex-wrap items-center gap-2.5 text-sm text-ink-muted">
            <Badge>قريباً</Badge>
            <span className="flex items-center gap-1.5">
              <Lock size={15} aria-hidden="true" />
              المحتوى قيد الإعداد
            </span>
          </p>
        )}
      </div>
    </Card>
  )
}
