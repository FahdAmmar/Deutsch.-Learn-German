import { ClipboardCheck } from 'lucide-react'
import { Link } from 'react-router-dom'

import { PageHeader, RouteItem, RouteList } from '@/components/ui'
import type { RouteState } from '@/components/ui'
import { LevelCard } from '@/features/levels/LevelCard'
import { getLessonsForLevel, getModulesForLevel } from '@/lib/curriculum'
import { useProgressStore } from '@/store/progressStore'
import { CEFR_LEVELS } from '@/types'

export default function LevelsPage() {
  const lessons = useProgressStore((state) => state.lessons)
  const currentLevel = useProgressStore((state) => state.currentLevel)

  const levels = CEFR_LEVELS.map((level) => {
    const levelLessons = getLessonsForLevel(level)
    const completedLessons = levelLessons.filter((lesson) => lessons[lesson.id]?.completed).length
    const hasContent = levelLessons.length > 0
    const finished = hasContent && completedLessons === levelLessons.length
    const state: RouteState = !hasContent ? 'locked' : finished ? 'done' : level === currentLevel ? 'current' : 'upcoming'

    return {
      level,
      totalLessons: levelLessons.length,
      completedLessons,
      moduleCount: getModulesForLevel(level).length,
      state,
    }
  })

  return (
    <div className="space-y-8 pb-6">
      <PageHeader
        title="المستويات"
        description="تقدّم بشكل منهجي من A1 حتى B2، وكل مستوى يُبنى على ما قبله."
        actions={
          <Link
            to="/placement-test"
            className="inline-flex items-center gap-2 rounded-md border border-border-strong px-4 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-surface-sunken"
          >
            <ClipboardCheck size={17} aria-hidden="true" />
            لست متأكداً من مستواك؟ اختبر نفسك
          </Link>
        }
      />

      <RouteList dir="rtl">
        {levels.map((entry, index) => (
          <RouteItem key={entry.level} state={entry.state} last={index === levels.length - 1}>
            <LevelCard
              level={entry.level}
              totalLessons={entry.totalLessons}
              completedLessons={entry.completedLessons}
              moduleCount={entry.moduleCount}
              isCurrent={entry.state === 'current'}
            />
          </RouteItem>
        ))}
      </RouteList>
    </div>
  )
}
