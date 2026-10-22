import { BookMarked, CheckCircle2, Flame } from 'lucide-react'

import { Card, PageHeader, ProgressBar } from '@/components/ui'
import { AccuracyBreakdown } from '@/features/progress/AccuracyBreakdown'
import { ActivityHeatmap } from '@/features/progress/ActivityHeatmap'
import { getBoxDistribution } from '@/features/progress/boxes'
import { BoxDistributionChart } from '@/features/progress/BoxDistributionChart'
import { DailyGoalCard } from '@/features/progress/DailyGoalCard'
import { getLevelProgressSummary, getVocabularyReviewSummary } from '@/features/dashboard/selectors'
import { RecentActivityList } from '@/features/dashboard/RecentActivityList'
import { LevelMark } from '@/features/levels/LevelMark'
import { LEVEL_STYLE } from '@/features/levels/levelTone'
import { useProgressStore } from '@/store/progressStore'
import { useStatsStore } from '@/store/statsStore'
import { CEFR_LEVELS } from '@/types'
import { formatCountAr, LESSON_FORMS, WORD_FORMS } from '@/utils/arabicCount'

export default function ProgressPage() {
  const progress = useProgressStore()
  const days = useStatsStore((state) => state.days)
  const byType = useStatsStore((state) => state.byType)
  const byModule = useStatsStore((state) => state.byModule)

  const totalCompleted = Object.values(progress.lessons).filter((entry) => entry.completed).length
  const totalVocabReviewed = Object.keys(progress.vocabulary).length

  return (
    <div className="space-y-10 pb-6">
      <PageHeader title="التقدّم" description="نظرة عامة على مسيرتك في تعلّم الألمانية." />

      <section aria-label="ملخص" className="grid gap-4 sm:grid-cols-3">
        <StatCard
          icon={Flame}
          value={progress.streakDays}
          labelAr={progress.streakDays === 1 ? 'يوم متتالٍ' : 'أيام متتالية'}
        />
        <StatCard icon={CheckCircle2} value={totalCompleted} labelAr="درساً مكتملاً" />
        <StatCard icon={BookMarked} value={totalVocabReviewed} labelAr="كلمة تمت مراجعتها" />
      </section>

      <DailyGoalCard />

      <ProgressSection title="خريطة نشاطك">
        <ActivityHeatmap stats={{ days }} />
      </ProgressSection>

      <ProgressSection title="دقتك في الإجابة">
        <AccuracyBreakdown stats={{ byType, byModule }} />
      </ProgressSection>

      <ProgressSection title="مراجعة المفردات (صناديق Leitner)">
        <BoxDistributionChart distribution={getBoxDistribution(progress.vocabulary)} />
      </ProgressSection>

      <section className="space-y-4">
        <h2 dir="rtl" className="font-sans text-xl font-bold text-ink">
          التقدّم حسب المستوى
        </h2>
        <Card>
          <ul className="divide-y divide-border">
            {CEFR_LEVELS.map((level) => {
              const summary = getLevelProgressSummary(progress, level)
              const vocabSummary = getVocabularyReviewSummary(progress, level)
              const hasContent = summary.totalLessons > 0
              return (
                <li key={level} dir="rtl" className="flex items-center gap-4 p-4 sm:px-5">
                  <LevelMark level={level} size="md" />
                  <div className="min-w-0 flex-1 space-y-2">
                    {hasContent ? (
                      <>
                        <ProgressBar
                          value={summary.ratio}
                          tone={LEVEL_STYLE[level].tone}
                          label={`التقدّم في المستوى ${level}`}
                        />
                        <p className="tnum text-sm text-ink-muted">
                          {summary.completedLessons}/{formatCountAr(summary.totalLessons, LESSON_FORMS)} ·{' '}
                          {vocabSummary.reviewed}/{formatCountAr(vocabSummary.total, WORD_FORMS)}
                        </p>
                      </>
                    ) : (
                      <p className="text-ink-faint">قريباً</p>
                    )}
                  </div>
                </li>
              )
            })}
          </ul>
        </Card>
      </section>

      <section className="space-y-4">
        <h2 dir="rtl" className="font-sans text-xl font-bold text-ink">
          سجل النشاط
        </h2>
        <RecentActivityList activity={progress.activity} />
      </section>
    </div>
  )
}

/** A titled card holding one analysis (heatmap, accuracy, review boxes). */
function ProgressSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-4">
      <h2 dir="rtl" className="font-sans text-xl font-bold text-ink">
        {title}
      </h2>
      <Card>
        <div className="p-4 sm:p-6">{children}</div>
      </Card>
    </section>
  )
}

/** One headline number with its meaning. The number is the content, so it is set large; no decorative icon tile. */
function StatCard({ icon: Icon, value, labelAr }: { icon: typeof Flame; value: number; labelAr: string }) {
  return (
    <Card>
      <div dir="rtl" className="flex items-center gap-4 p-5">
        <Icon size={26} className="shrink-0 text-accent" aria-hidden="true" />
        <div>
          <p className="display-de tnum text-end text-4xl leading-none font-semibold text-ink">{value}</p>
          <p className="mt-1.5 text-sm text-ink-muted">{labelAr}</p>
        </div>
      </div>
    </Card>
  )
}
