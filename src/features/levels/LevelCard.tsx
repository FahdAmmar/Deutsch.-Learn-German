import { ArrowLeft, Lock } from 'lucide-react'
import { Link } from 'react-router-dom'

import { Badge, Button, Card, CardBody, ProgressBar } from '@/components/ui'
import { CEFR_LEVEL_INFO } from '@/types'
import type { CEFRLevel } from '@/types'

interface LevelCardProps {
  level: CEFRLevel
  totalLessons: number
  completedLessons: number
  moduleCount: number
}

export function LevelCard({ level, totalLessons, completedLessons, moduleCount }: LevelCardProps) {
  const info = CEFR_LEVEL_INFO[level]
  const hasContent = totalLessons > 0
  const ratio = hasContent ? completedLessons / totalLessons : 0
  const started = completedLessons > 0

  return (
    <Card className={!hasContent ? 'opacity-70' : undefined}>
      <CardBody className="flex flex-col gap-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <Badge tone="primary" className="text-sm">
                {level}
              </Badge>
              {!hasContent ? <Badge tone="neutral">قريباً</Badge> : null}
            </div>
            <h3 dir="ltr" lang="de" className="mt-2 text-lg font-bold text-ink">
              {info.titleDe}
            </h3>
            <p dir="rtl" className="text-sm font-medium text-ink-muted">
              {info.titleAr}
            </p>
          </div>
        </div>

        <p dir="rtl" className="text-sm leading-relaxed text-ink-muted">
          {info.descriptionAr}
        </p>

        {hasContent ? (
          <>
            <ProgressBar value={ratio} label={`التقدّم في المستوى ${level}`} />
            <div dir="rtl" className="flex items-center justify-between text-xs text-ink-faint">
              <span>
                {moduleCount} {moduleCount === 1 ? 'وحدة' : 'وحدات'} · {totalLessons} درساً
              </span>
              <span>{Math.round(ratio * 100)}٪</span>
            </div>
          </>
        ) : (
          <div dir="rtl" className="flex items-center gap-2 text-sm text-ink-faint">
            <Lock size={14} aria-hidden="true" />
            <span>المحتوى قيد الإعداد</span>
          </div>
        )}

        <Link to={hasContent ? `/levels/${level.toLowerCase()}` : '#'} aria-disabled={!hasContent}>
          <Button
            variant={hasContent ? 'primary' : 'outline'}
            disabled={!hasContent}
            className="w-full"
            icon={<ArrowLeft size={16} aria-hidden="true" />}
            iconPosition="end"
          >
            {!hasContent ? 'قريباً' : started ? 'متابعة' : 'ابدأ الآن'}
          </Button>
        </Link>
      </CardBody>
    </Card>
  )
}
