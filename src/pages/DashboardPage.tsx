import { ContinueLearningCard } from '@/features/dashboard/ContinueLearningCard'
import { LevelProgressCard } from '@/features/dashboard/LevelProgressCard'
import { RecentActivityList } from '@/features/dashboard/RecentActivityList'
import { ReviewReminderCard } from '@/features/dashboard/ReviewReminderCard'
import {
  getContinueLearningLesson,
  getLevelProgressSummary,
  getModulePath,
  getVocabularyReviewSummary,
} from '@/features/dashboard/selectors'
import { getDueVocabulary } from '@/features/review/selectors'
import { VocabularyReviewCard } from '@/features/dashboard/VocabularyReviewCard'
import { WelcomeHeader } from '@/features/dashboard/WelcomeHeader'
import { useProgressStore } from '@/store/progressStore'

export default function DashboardPage() {
  const progress = useProgressStore()

  const continueLesson = getContinueLearningLesson(progress)
  const levelSummary = getLevelProgressSummary(progress, progress.currentLevel)
  const modulePath = getModulePath(progress, progress.currentLevel, continueLesson?.id)
  const vocabSummary = getVocabularyReviewSummary(progress, progress.currentLevel)
  const dueVocabCount = getDueVocabulary(progress).length

  return (
    <div className="space-y-8 pb-6">
      <WelcomeHeader currentLevel={progress.currentLevel} />

      <ContinueLearningCard lesson={continueLesson} />

      <ReviewReminderCard dueCount={dueVocabCount} />

      <div className="grid items-start gap-6 lg:grid-cols-[3fr_2fr]">
        <LevelProgressCard level={progress.currentLevel} summary={levelSummary} path={modulePath} />

        <div className="space-y-6">
          <VocabularyReviewCard summary={vocabSummary} />
          <section className="space-y-3">
            <h2 dir="rtl" className="font-sans text-lg font-bold text-ink">
              آخر ما أنجزته
            </h2>
            <RecentActivityList activity={progress.activity} />
          </section>
        </div>
      </div>
    </div>
  )
}
