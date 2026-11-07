import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

import { getNextPathLevel, getNextPlanStep, getPlanStepLevel } from '@/lib/learningPath'
import { CEFR_LEVEL_INFO } from '@/types'

import { StepKindBadge } from './StepKindBadge'
import { getStepHref, getStepTitles } from './stepInfo'

const CARD =
  'flex items-center gap-3 rounded-lg border border-primary bg-primary-muted p-4 text-ink transition-colors hover:border-border-strong'

/**
 * "What comes next on the plan", shown at the end of a lesson, a grammar rule or a text. The plan is one
 * sequence, so after a lesson the next stop may be its rule, and after a rule the text that uses it.
 * Renders nothing for a step that is not on the plan (a rule of a level that has no plan yet).
 */
export function NextInPlan({ stepKey }: { stepKey: string }) {
  const stepLevel = getPlanStepLevel(stepKey)
  if (!stepLevel) return null

  const next = getNextPlanStep(stepKey)
  if (next) {
    const titles = getStepTitles(next.step)
    return (
      <nav dir="rtl" aria-label="الخطوة التالية في الخطة" className="w-full max-w-xl space-y-1.5 text-start">
        <p className="text-sm text-ink-muted">
          الخطوة التالية في الخطة
          {next.startsChapter ? <span className="font-semibold text-ink"> · فصل جديد: {next.chapter.chapter.titleAr}</span> : null}
        </p>
        <Link to={getStepHref(next.step)} className={CARD}>
          <StepKindBadge kind={next.step.kind} />
          <span className="min-w-0 flex-1">
            <span className="block font-semibold">{titles.ar}</span>
            <span dir="ltr" lang="de" className="display-de block text-end text-sm font-normal text-ink-muted">
              {titles.de}
            </span>
          </span>
          <ArrowLeft size={18} aria-hidden="true" className="shrink-0" />
        </Link>
      </nav>
    )
  }

  // Nothing after it on the levels that are loaded: either the plan goes on in the next level, or this is the end.
  const nextLevel = getNextPathLevel(stepLevel)
  return (
    <nav dir="rtl" aria-label="الخطوة التالية في الخطة" className="w-full max-w-xl">
      <Link to="/levels" className={CARD}>
        <span className="min-w-0 flex-1 font-semibold">
          {nextLevel ? `تابع الخطة في ${CEFR_LEVEL_INFO[nextLevel].titleAr}` : 'العودة إلى الخطة'}
        </span>
        <ArrowLeft size={18} aria-hidden="true" className="shrink-0" />
      </Link>
    </nav>
  )
}
