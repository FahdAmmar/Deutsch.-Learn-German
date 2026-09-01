import { LevelCard } from '@/features/levels/LevelCard'
import { getLessonsForLevel, getModulesForLevel } from '@/lib/curriculum'
import { useProgressStore } from '@/store/progressStore'
import { CEFR_LEVELS } from '@/types'

export default function LevelsPage() {
  const lessons = useProgressStore((state) => state.lessons)

  return (
    <div className="space-y-6 pb-10">
      <header dir="rtl">
        <h1 className="text-2xl font-bold text-ink">المستويات</h1>
        <p className="mt-1 text-ink-muted">تقدّم بشكل منهجي من A1 حتى B2، وكل مستوى يُبنى على ما قبله.</p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2">
        {CEFR_LEVELS.map((level) => {
          const levelLessons = getLessonsForLevel(level)
          const completedLessons = levelLessons.filter((lesson) => lessons[lesson.id]?.completed).length

          return (
            <LevelCard
              key={level}
              level={level}
              totalLessons={levelLessons.length}
              completedLessons={completedLessons}
              moduleCount={getModulesForLevel(level).length}
            />
          )
        })}
      </div>
    </div>
  )
}
