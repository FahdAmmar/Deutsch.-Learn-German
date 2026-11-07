import { BackupReminderCard } from '@/features/dashboard/BackupReminderCard'
import { ContinueLearningCard } from '@/features/dashboard/ContinueLearningCard'
import { RecentActivityList } from '@/features/dashboard/RecentActivityList'
import { RecommendedLessons } from '@/features/dashboard/RecommendedLessons'
import {
  getContinueLearningLesson,
  getLevelProgressSummary,
  getVocabularyReviewSummary,
  getWeeklyActivity,
} from '@/features/dashboard/selectors'
import { SpecialLetters } from '@/features/dashboard/SpecialLetters'
import { ProgressStrip } from '@/features/dashboard/ProgressStrip'
import { TodayPanel } from '@/features/dashboard/TodayPanel'
import { WeeklyActivityChart } from '@/features/dashboard/WeeklyActivityChart'
import { shouldShowOnboarding } from '@/features/onboarding/shouldShowOnboarding'
import { WelcomeCard } from '@/features/onboarding/WelcomeCard'
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

      <TodayPanel
        level={progress.currentLevel}
        hasStarted={levelSummary.completedLessons > 0 || progress.activity.length > 0}
        continueLesson={continueLesson}
        dueCount={dueVocabCount}
      />

      <ProgressStrip
        level={progress.currentLevel}
        levelRatio={levelSummary.ratio}
        completedLessons={levelSummary.completedLessons}
        totalLessons={levelSummary.totalLessons}
        reviewedWords={vocabSummary.reviewed}
        totalWords={vocabSummary.total}
        streakDays={progress.streakDays}
      />

      <BackupReminderCard />

      <ContinueLearningCard lesson={continueLesson} />

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
