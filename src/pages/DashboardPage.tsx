import { ContinueLearningCard } from '@/features/dashboard/ContinueLearningCard'
import { DashboardHero } from '@/features/dashboard/DashboardHero'
import { RecentActivityList } from '@/features/dashboard/RecentActivityList'
import { RecommendedLessons } from '@/features/dashboard/RecommendedLessons'
import { ReviewReminderCard } from '@/features/dashboard/ReviewReminderCard'
import {
  getContinueLearningLesson,
  getLevelProgressSummary,
  getVocabularyReviewSummary,
  getWeeklyActivity,
} from '@/features/dashboard/selectors'
import { SpecialLetters } from '@/features/dashboard/SpecialLetters'
import { StatTiles } from '@/features/dashboard/StatTiles'
import { VocabularyReviewCard } from '@/features/dashboard/VocabularyReviewCard'
import { WeeklyActivityChart } from '@/features/dashboard/WeeklyActivityChart'
import { shouldShowOnboarding } from '@/features/onboarding/shouldShowOnboarding'
import { WelcomeCard } from '@/features/onboarding/WelcomeCard'
import { DailyGoalCard } from '@/features/progress/DailyGoalCard'
import { getDueVocabulary } from '@/features/review/selectors'
import { getPathLessons } from '@/lib/learningPath'
import { useProgressStore } from '@/store/progressStore'
import { useSettingsStore } from '@/store/settingsStore'

const RECOMMENDED_COUNT = 3

export default function DashboardPage() {
  const progress = useProgressStore()
  const onboardingDone = useSettingsStore((state) => state.settings.onboardingDone)

  const continueLesson = getContinueLearningLesson(progress)
  const levelSummary = getLevelProgressSummary(progress, progress.currentLevel)
  const vocabSummary = getVocabularyReviewSummary(progress, progress.currentLevel)
  const dueVocabCount = getDueVocabulary(progress).length
  const weeklyActivity = getWeeklyActivity(progress.activity)
  const recommended = getPathLessons(progress.currentLevel)
    .filter((lesson) => lesson.id !== continueLesson?.id && !progress.lessons[lesson.id]?.completed)
    .slice(0, RECOMMENDED_COUNT)

  return (
    <div className="space-y-8 pb-6">
      {shouldShowOnboarding(onboardingDone, progress) ? <WelcomeCard /> : null}

      <DashboardHero
        level={progress.currentLevel}
        completedLessons={levelSummary.completedLessons}
        totalLessons={levelSummary.totalLessons}
        continueLesson={continueLesson}
        hasStarted={levelSummary.completedLessons > 0 || progress.activity.length > 0}
      />

      <StatTiles
        level={progress.currentLevel}
        levelRatio={levelSummary.ratio}
        completedLessons={levelSummary.completedLessons}
        totalLessons={levelSummary.totalLessons}
        reviewedWords={vocabSummary.reviewed}
        totalWords={vocabSummary.total}
        streakDays={progress.streakDays}
      />

      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <ContinueLearningCard lesson={continueLesson} />
        <div className="space-y-4">
          <DailyGoalCard />
          <ReviewReminderCard dueCount={dueVocabCount} />
          <VocabularyReviewCard summary={vocabSummary} />
        </div>
      </div>

      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <WeeklyActivityChart days={weeklyActivity} />
        <section className="space-y-3">
          <h2 dir="rtl" className="text-xl font-bold text-ink">
            آخر ما أنجزته
          </h2>
          <RecentActivityList activity={progress.activity} />
        </section>
      </div>

      <RecommendedLessons lessons={recommended} />

      <SpecialLetters />
    </div>
  )
}
