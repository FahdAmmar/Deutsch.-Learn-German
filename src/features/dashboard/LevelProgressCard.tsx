import { Link } from 'react-router-dom'

import { Card, ProgressBar, RouteItem, RouteList } from '@/components/ui'
import { LevelMark } from '@/features/levels/LevelMark'
import { formatCountAr, LESSON_FORMS, MODULE_FORMS } from '@/utils/arabicCount'
import type { CEFRLevel } from '@/types'

import type { LevelProgressSummary, ModuleStep } from './selectors'

interface LevelProgressCardProps {
  level: CEFRLevel
  summary: LevelProgressSummary
  path: ModuleStep[]
}

/** How many upcoming modules to preview after the current one. */
const UPCOMING_PREVIEW = 3

/** "Where you are in this level": the next few modules on the route, not all twenty. */
export function LevelProgressCard({ level, summary, path }: LevelProgressCardProps) {
  const currentIndex = path.findIndex((step) => step.state === 'current')
  const anchor = currentIndex >= 0 ? currentIndex : path.length
  const doneBefore = path.slice(0, anchor).filter((step) => step.state === 'done')
  const lastDone = doneBefore[doneBefore.length - 1]
  const earlierDone = doneBefore.length - (lastDone ? 1 : 0)
  const ahead = path.slice(anchor, anchor + 1 + UPCOMING_PREVIEW)

  const visible = [...(lastDone ? [lastDone] : []), ...ahead]
  const levelPath = `/levels/${level.toLowerCase()}`

  return (
    <Card>
      <div dir="rtl" className="space-y-5 p-5">
        <div className="space-y-3">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <LevelMark level={level} size="sm" />
              <h2 className="font-sans text-lg font-bold text-ink">مسارك في هذا المستوى</h2>
            </div>
            <Link to={levelPath} className="text-sm font-semibold text-accent hover:underline">
              كل الوحدات
            </Link>
          </div>
          <ProgressBar value={summary.ratio} tone="accent" label={`التقدّم في المستوى ${level}`} />
          <p className="tnum text-sm text-ink-muted">
            أكملت {summary.completedLessons} من {formatCountAr(summary.totalLessons, LESSON_FORMS)}
          </p>
        </div>

        {visible.length > 0 ? (
          <RouteList>
            {earlierDone > 0 ? (
              <RouteItem state="done" className="pb-4">
                <p className="pt-0.5 text-sm text-ink-muted">
                  أنجزت {formatCountAr(earlierDone, MODULE_FORMS)} قبل ذلك
                </p>
              </RouteItem>
            ) : null}
            {visible.map((step, index) => (
              <RouteItem
                key={step.module.id}
                state={step.state}
                marker={step.module.order}
                last={index === visible.length - 1}
              >
                <div className="flex items-baseline justify-between gap-3">
                  <div className="min-w-0">
                    <p className={step.state === 'current' ? 'font-bold text-ink' : 'font-medium text-ink'}>
                      {step.module.titleAr}
                    </p>
                    <p dir="ltr" lang="de" className="display-de truncate text-start text-sm font-normal text-ink-faint">
                      {step.module.title}
                    </p>
                  </div>
                  <span className="tnum shrink-0 text-xs text-ink-muted">
                    {step.completedLessons}/{step.totalLessons}
                  </span>
                </div>
              </RouteItem>
            ))}
          </RouteList>
        ) : null}
      </div>
    </Card>
  )
}
