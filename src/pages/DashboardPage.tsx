import { ContinueLearningCard } from '@/features/dashboard/ContinueLearningCard'
import { LevelProgressCard } from '@/features/dashboard/LevelProgressCard'
import { RecentActivityList } from '@/features/dashboard/RecentActivityList'
import {
  getContinueLearningLesson,
  getLevelProgressSummary,
  getVocabularyReviewSummary,
} from '@/features/dashboard/selectors'
import { VocabularyReviewCard } from '@/features/dashboard/VocabularyReviewCard'
import { WelcomeHeader } from '@/features/dashboard/WelcomeHeader'
import { useProgressStore } from '@/store/progressStore'

export default function DashboardPage() {
  const progress = useProgressStore()

  const continueLesson = getContinueLearningLesson(progress)
  const levelSummary = getLevelProgressSummary(progress, progress.currentLevel)
  const vocabSummary = getVocabularyReviewSummary(progress, progress.currentLevel)

  return (
    <div className="space-y-8 pb-10">
      <WelcomeHeader currentLevel={progress.currentLevel} streakDays={progress.streakDays} />

      <section className="space-y-3">
        <h2 dir="rtl" className="text-sm font-semibold text-ink-muted">
          متابعة التعلّم
        </h2>
        <ContinueLearningCard lesson={continueLesson} />
      </section>

      <section className="grid gap-4 sm:grid-cols-2">
        <LevelProgressCard level={progress.currentLevel} summary={levelSummary} />
        <VocabularyReviewCard summary={vocabSummary} />
      </section>

      <section className="space-y-3">
        <h2 dir="rtl" className="text-sm font-semibold text-ink-muted">
          النشاط الأخير
        </h2>
        <RecentActivityList activity={progress.activity} />
      </section>
    </div>
  )
}
