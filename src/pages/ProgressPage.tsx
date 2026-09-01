import { BookMarked, CheckCircle2, Flame } from 'lucide-react'

import { Card, CardBody, ProgressBar } from '@/components/ui'
import { getLevelProgressSummary, getVocabularyReviewSummary } from '@/features/dashboard/selectors'
import { RecentActivityList } from '@/features/dashboard/RecentActivityList'
import { useProgressStore } from '@/store/progressStore'
import { CEFR_LEVELS } from '@/types'

export default function ProgressPage() {
  const progress = useProgressStore()

  const totalCompleted = Object.values(progress.lessons).filter((entry) => entry.completed).length
  const totalVocabReviewed = Object.keys(progress.vocabulary).length

  return (
    <div className="space-y-8 pb-10">
      <header dir="rtl">
        <h1 className="text-2xl font-bold text-ink">التقدّم</h1>
        <p className="mt-1 text-ink-muted">نظرة عامة على مسيرتك في تعلّم الألمانية.</p>
      </header>

      <section className="grid gap-4 sm:grid-cols-3">
        <StatCard icon={Flame} tone="accent" value={progress.streakDays} labelAr={progress.streakDays === 1 ? 'يوم متتالٍ' : 'أيام متتالية'} />
        <StatCard icon={CheckCircle2} tone="success" value={totalCompleted} labelAr="درساً مكتملاً" />
        <StatCard icon={BookMarked} tone="der" value={totalVocabReviewed} labelAr="كلمة تمت مراجعتها" />
      </section>

      <section className="space-y-3">
        <h2 dir="rtl" className="text-sm font-semibold text-ink-muted">
          التقدّم حسب المستوى
        </h2>
        <div className="space-y-3">
          {CEFR_LEVELS.map((level) => {
            const summary = getLevelProgressSummary(progress, level)
            const vocabSummary = getVocabularyReviewSummary(progress, level)
            return (
              <Card key={level}>
                <CardBody className="space-y-2">
                  <div dir="rtl" className="flex items-center justify-between text-sm">
                    <span className="font-semibold text-ink">{level}</span>
                    <span className="text-ink-muted">
                      {summary.totalLessons === 0
                        ? 'قريباً'
                        : `${summary.completedLessons}/${summary.totalLessons} درساً · ${vocabSummary.reviewed}/${vocabSummary.total} كلمة`}
                    </span>
                  </div>
                  <ProgressBar value={summary.ratio} />
                </CardBody>
              </Card>
            )
          })}
        </div>
      </section>

      <section className="space-y-3">
        <h2 dir="rtl" className="text-sm font-semibold text-ink-muted">
          سجل النشاط
        </h2>
        <RecentActivityList activity={progress.activity} />
      </section>
    </div>
  )
}

function StatCard({
  icon: Icon,
  value,
  labelAr,
  tone,
}: {
  icon: typeof Flame
  value: number
  labelAr: string
  tone: 'accent' | 'success' | 'der'
}) {
  const toneClasses = {
    accent: 'bg-accent-muted text-accent',
    success: 'bg-success-muted text-success',
    der: 'bg-der-muted text-der',
  }

  return (
    <Card>
      <CardBody dir="rtl" className="flex items-center gap-3">
        <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${toneClasses[tone]}`}>
          <Icon size={20} aria-hidden="true" />
        </span>
        <div>
          <p className="text-xl font-bold text-ink">{value}</p>
          <p className="text-xs text-ink-muted">{labelAr}</p>
        </div>
      </CardBody>
    </Card>
  )
}
