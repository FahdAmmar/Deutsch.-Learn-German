import { ArrowLeft, BookCheck, ClipboardCheck, Languages, Library } from 'lucide-react'
import { Link } from 'react-router-dom'

import { Button, PageHeader } from '@/components/ui'
import { PlanSidelist } from '@/features/levels/PlanSidelist'
import { StepKindBadge } from '@/features/levels/StepKindBadge'
import { getStepHref, getStepTitles } from '@/features/levels/stepInfo'
import { usePlan } from '@/features/levels/usePlan'
import { getAllVocabulary } from '@/lib/curriculum'
import { useProgressStore } from '@/store/progressStore'
import { CEFR_LEVEL_INFO } from '@/types'

/**
 * Levels: the one plan. A single list holds everything to study from A1 to A2 — lessons, grammar rules, reading
 * texts, conversations — in order. Beside it, the step to continue with.
 */
export default function LevelsPage() {
  const plan = usePlan()
  const vocabulary = useProgressStore((state) => state.vocabulary)
  const knownWords = Object.keys(vocabulary).length
  const allWords = getAllVocabulary().length
  const resume = plan.resumeStep
  const resumeTitles = resume ? getStepTitles(resume) : undefined

  return (
    <div className="space-y-8 pb-6">
      <PageHeader
        title="الخطة الشاملة: من A1 إلى A2"
        titleDe="Der Gesamtplan A1 → A2"
        description="قائمة واحدة متسلسلة بكل ما تدرسه: الدروس والقواعد والنصوص والمحادثات، بالترتيب الذي يحتاجه المتعلّم. افتح أي فصل لترى خطواته."
      />

      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,27rem)_minmax(0,1fr)]">
        <section
          aria-labelledby="plan-list-title"
          className="rounded-lg border border-border bg-surface p-4 shadow-sm lg:sticky lg:top-24 lg:max-h-[calc(100dvh-7.5rem)] lg:overflow-y-auto"
        >
          <h2 id="plan-list-title" className="sr-only">
            قائمة الخطة
          </h2>
          <PlanSidelist />
        </section>

        <aside dir="rtl" className="order-first space-y-4 lg:order-none">
          {resume && resumeTitles ? (
            <section aria-labelledby="resume-title" className="space-y-3 rounded-lg border border-t-4 border-border border-t-primary-container bg-surface p-5 shadow-sm">
              <h2 id="resume-title" className="text-lg font-bold text-ink">
                {plan.completedSteps > 0 ? 'تابع من حيث توقفت' : 'ابدأ من هنا'}
              </h2>
              <div className="flex items-center gap-3">
                <StepKindBadge kind={resume.kind} />
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-ink">{resumeTitles.ar}</p>
                  <p dir="ltr" lang="de" className="display-de text-end text-sm font-normal text-ink-muted">
                    {resumeTitles.de}
                  </p>
                </div>
              </div>
              <Link to={getStepHref(resume)} className="block sm:inline-block">
                <Button className="w-full sm:w-auto" icon={<ArrowLeft size={17} aria-hidden="true" />} iconPosition="end">
                  {plan.completedSteps > 0 ? 'تابع' : 'ابدأ'}
                </Button>
              </Link>
            </section>
          ) : (
            <section className="rounded-lg border border-border bg-surface p-5 shadow-sm">
              <p className="font-bold text-ink">أكملت كل خطوات الخطة. أحسنت!</p>
            </section>
          )}

          <section aria-labelledby="path-stats-title" className="space-y-4 rounded-lg border border-border bg-surface p-5 shadow-sm">
            <h2 id="path-stats-title" className="text-lg font-bold text-ink">
              إحصائيات الخطة
            </h2>
            <dl className="space-y-3">
              <div className="flex items-center gap-3 rounded-md bg-bg p-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-md bg-accent-muted text-accent">
                  <BookCheck size={18} aria-hidden="true" />
                </span>
                <div>
                  <dt className="text-sm text-ink-muted">خطوات الخطة المنجزة</dt>
                  <dd className="font-heading tnum text-xl font-extrabold text-ink">
                    {plan.completedSteps} <span className="text-sm font-semibold text-ink-muted">/ {plan.totalSteps}</span>
                  </dd>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-md bg-bg p-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-md bg-plum-muted text-plum">
                  <Languages size={18} aria-hidden="true" />
                </span>
                <div>
                  <dt className="text-sm text-ink-muted">المفردات المراجَعة</dt>
                  <dd className="font-heading tnum text-xl font-extrabold text-ink">
                    {knownWords} <span className="text-sm font-semibold text-ink-muted">/ {allWords}</span>
                  </dd>
                </div>
              </div>
            </dl>
          </section>

          <section aria-labelledby="library-title" className="space-y-3 rounded-lg border border-border bg-surface p-5 shadow-sm">
            <h2 id="library-title" className="flex items-center gap-2 text-lg font-bold text-ink">
              <Library size={18} aria-hidden="true" />
              مكتبة النصوص والمحادثات
            </h2>
            <p className="text-sm text-ink-muted">كل النصوص والمحادثات موجودة في الخطة، وهنا تجدها مجمّعة لكل مستوى.</p>
            <ul className="flex flex-wrap gap-2">
              {plan.levels.map((level) => (
                <li key={level.level}>
                  <Link
                    to={`/levels/${level.level.toLowerCase()}?tab=stories`}
                    className="inline-flex items-center rounded-md border border-border bg-bg px-3 py-1.5 text-sm font-semibold text-ink transition-colors hover:border-border-strong"
                  >
                    {CEFR_LEVEL_INFO[level.level].titleAr}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="text-sm text-ink-muted">محتوى المستويين B1 وB2 قيد الإعداد وسيُضاف إلى الخطة عند جاهزيته.</p>
          </section>

          <section aria-labelledby="placement-title" className="space-y-3 rounded-lg bg-primary-container p-5 text-on-primary-container shadow-md">
            <ClipboardCheck size={22} aria-hidden="true" />
            <h2 id="placement-title" className="text-lg font-bold">
              هل لديك معرفة سابقة بالألمانية؟
            </h2>
            <p className="text-sm leading-7">اختبر نفسك بأسئلة من منهج المنصة، ونقترح عليك المستوى المناسب للبدء منه.</p>
            <Link
              to="/placement-test"
              className="inline-flex h-11 w-full items-center justify-center rounded-md bg-on-primary-container px-5 font-semibold text-primary-container transition-transform active:scale-[0.98]"
            >
              ابدأ اختبار تحديد المستوى
            </Link>
          </section>
        </aside>
      </div>
    </div>
  )
}
