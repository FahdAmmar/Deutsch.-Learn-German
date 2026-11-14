import { Check, ChevronDown, ClipboardCheck } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

import { ProgressBar } from '@/components/ui'
import { cn } from '@/lib/cn'
import type { ResolvedChapter, ResolvedStep } from '@/lib/learningPath'
import { CEFR_LEVEL_INFO } from '@/types'
import { formatCountAr, STEP_FORMS } from '@/utils/arabicCount'

import { LevelMark } from './LevelMark'
import { STEP_KIND_LABEL, describeStepCounts, getStepHref, getStepTitles } from './stepInfo'
import { usePlan } from './usePlan'

interface PlanSidelistProps {
  /** The step being read right now (a lesson, a rule or a text page), so the list can say "you are here". */
  activeKey?: string
  /** Called after a link is followed; the drawer uses it to close itself. */
  onNavigate?: () => void
  className?: string
}

interface StepLinkProps {
  step: ResolvedStep
  done: boolean
  isActive: boolean
  isNext: boolean
  onNavigate?: () => void
}

function StepLink({ step, done, isActive, isNext, onNavigate }: StepLinkProps) {
  const titles = getStepTitles(step)
  return (
    <li>
      <Link
        to={getStepHref(step)}
        onClick={onNavigate}
        aria-current={isActive ? 'step' : undefined}
        data-resume={isNext ? 'true' : undefined}
        className={cn(
          'flex items-start gap-2.5 rounded-md px-2.5 py-2 transition-colors',
          isActive ? 'bg-primary-container text-on-primary-container' : 'hover:bg-surface-sunken',
          !isActive && isNext && 'bg-primary-muted',
        )}
      >
        <span
          aria-hidden="true"
          className={cn(
            'mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2',
            done ? 'border-success bg-success text-success-foreground' : isNext || isActive ? 'border-primary' : 'border-rail',
          )}
        >
          {done ? <Check size={10} strokeWidth={4} /> : null}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-[0.95rem] leading-snug font-semibold">
            {titles.ar}
            {done ? <span className="sr-only"> (مكتمل)</span> : null}
          </span>
          <span className={cn('mt-0.5 flex items-baseline justify-between gap-2 text-xs', isActive ? 'text-on-primary-container' : 'text-ink-muted')}>
            <span dir="ltr" lang="de" className="display-de min-w-0 truncate font-normal">
              {titles.de}
            </span>
            <span className="shrink-0 font-semibold">{STEP_KIND_LABEL[step.kind]}</span>
          </span>
        </span>
        {isNext ? <span className="shrink-0 pt-0.5 text-xs font-bold text-primary">التالي</span> : null}
      </Link>
    </li>
  )
}

interface ChapterGroupProps {
  entry: ResolvedChapter
  number: number
  completed: number
  open: boolean
  onToggle: () => void
  completedKeys: ReadonlySet<string>
  activeKey?: string
  resumeKey?: string
  onNavigate?: () => void
}

function ChapterGroup({ entry, number, completed, open, onToggle, completedKeys, activeKey, resumeKey, onNavigate }: ChapterGroupProps) {
  const { chapter, steps } = entry
  const panelId = `plan-chapter-${chapter.id}`
  const finished = completed === steps.length

  return (
    <li>
      <h4>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          aria-controls={panelId}
          className="flex w-full items-center gap-2.5 rounded-md px-2.5 py-2.5 text-start transition-colors hover:bg-surface-sunken"
        >
          <span
            aria-hidden="true"
            className={cn(
              'font-heading tnum flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-extrabold',
              finished ? 'bg-success text-success-foreground' : 'bg-surface-sunken text-ink-muted',
            )}
          >
            {finished ? <Check size={14} strokeWidth={3} /> : number}
          </span>
          <span className="min-w-0 flex-1">
            <span className="block font-bold text-ink">{chapter.titleAr}</span>
            <span dir="ltr" lang="de" className="display-de block truncate text-start text-xs font-normal text-ink-muted">
              {chapter.titleDe}
            </span>
          </span>
          <span className="tnum shrink-0 text-xs font-semibold text-ink-muted">
            <span className="sr-only">أُنجز </span>
            {completed}/{steps.length}
          </span>
          <ChevronDown size={16} aria-hidden="true" className={cn('shrink-0 text-ink-muted transition-transform', open && 'rotate-180')} />
        </button>
      </h4>
      {open ? (
        <div id={panelId} className="space-y-1 pb-2 ps-3">
          {chapter.goalAr ? <p className="px-2.5 pt-1 text-xs leading-6 text-ink-muted">{chapter.goalAr}</p> : null}
          <ol className="space-y-0.5 border-s-2 border-rail ps-1.5">
            {steps.map((step) => (
              <StepLink
                key={step.key}
                step={step}
                done={completedKeys.has(step.key)}
                isActive={step.key === activeKey}
                isNext={step.key === resumeKey}
                onNavigate={onNavigate}
              />
            ))}
          </ol>
          {entry.lessons.length > 0 ? (
            <Link
              to={`/levels/${entry.level.toLowerCase()}/review/${chapter.id}`}
              onClick={onNavigate}
              className="ms-1.5 mt-1 inline-flex items-center gap-2 rounded-md px-2.5 py-1.5 text-sm font-semibold text-primary hover:bg-surface-sunken pointer-coarse:py-3"
            >
              <ClipboardCheck size={15} aria-hidden="true" />
              مراجعة هذا الفصل
              <span className="sr-only"> ({chapter.titleAr})</span>
            </Link>
          ) : null}
        </div>
      ) : null}
    </li>
  )
}

/**
 * The whole A1 → A2 plan as ONE list: every lesson, grammar rule, reading text and conversation, in the order
 * they are to be studied. Chapters only group the list (they open and close); there is no map, no tiles, no
 * second level of navigation. Used as the page of `/levels` and as the drawer opened from any page.
 */
export function PlanSidelist({ activeKey, onNavigate, className }: PlanSidelistProps) {
  const plan = usePlan()
  const focusKey = activeKey ?? plan.resumeStep?.key

  // The chapter being read (or the next one to do) starts open; the learner opens the others.
  const [open, setOpen] = useState<ReadonlySet<string>>(() => {
    const holder = plan.levels.flatMap((level) => level.chapters).find((entry) => entry.steps.some((step) => step.key === focusKey))
    return new Set(holder ? [holder.chapter.id] : [])
  })
  const toggle = (id: string) =>
    setOpen((previous) => {
      const next = new Set(previous)
      if (!next.delete(id)) next.add(id)
      return next
    })
  const allChapterIds = plan.levels.flatMap((level) => level.chapters.map((entry) => entry.chapter.id))
  const allOpen = allChapterIds.length > 0 && allChapterIds.every((id) => open.has(id))

  if (plan.levels.length === 0) return null
  const ratio = plan.totalSteps === 0 ? 0 : plan.completedSteps / plan.totalSteps

  return (
    <nav dir="rtl" aria-label="خطة الدراسة من A1 إلى A2" className={cn('space-y-4', className)}>
      <div className="space-y-2">
        <ProgressBar value={ratio} label="التقدّم في الخطة" size="sm" tone={ratio === 1 ? 'success' : 'primary'} />
        <p className="tnum flex items-center justify-between gap-2 text-sm text-ink-muted">
          <span>
            أنجزت {plan.completedSteps} من {formatCountAr(plan.totalSteps, STEP_FORMS)}
          </span>
          <button
            type="button"
            onClick={() => setOpen(allOpen ? new Set() : new Set(allChapterIds))}
            className="relative pointer-coarse:before:absolute pointer-coarse:before:-inset-x-2 pointer-coarse:before:-inset-y-3 font-semibold text-primary underline-offset-4 hover:underline"
          >
            {allOpen ? 'طيّ الكل' : 'فتح الكل'}
          </button>
        </p>
      </div>

      {plan.levels.map((level) => (
        <section key={level.level} aria-labelledby={`plan-level-${level.level}`} className="space-y-1">
          <div className="flex items-center gap-2.5 border-b border-border px-2.5 pb-2">
            <LevelMark level={level.level} size="sm" />
            <div className="min-w-0 flex-1">
              <h3 id={`plan-level-${level.level}`} className="font-bold text-ink">
                {CEFR_LEVEL_INFO[level.level].titleAr}
              </h3>
              <p className="text-xs text-ink-muted">{describeStepCounts(level.counts)}</p>
            </div>
            <span className="tnum shrink-0 text-xs font-semibold text-ink-muted">
              {level.completedSteps}/{level.totalSteps}
            </span>
          </div>
          <ol className="space-y-0.5">
            {level.chapters.map((entry, index) => (
              <ChapterGroup
                key={entry.chapter.id}
                entry={entry}
                number={level.startNumber + index}
                completed={level.chapterProgress[index].completed}
                open={open.has(entry.chapter.id)}
                onToggle={() => toggle(entry.chapter.id)}
                completedKeys={plan.completedKeys}
                activeKey={activeKey}
                resumeKey={plan.resumeStep?.key}
                onNavigate={onNavigate}
              />
            ))}
          </ol>
          <Link
            to={`/levels/${level.level.toLowerCase()}/abschlusstest`}
            onClick={onNavigate}
            className="mx-2.5 mt-2 flex items-center gap-2 rounded-md border border-border px-3 py-2 text-sm font-semibold text-ink transition-colors hover:border-border-strong pointer-coarse:py-3"
          >
            <ClipboardCheck size={16} aria-hidden="true" />
            الاختبار الختامي لمستوى {level.level}
          </Link>
        </section>
      ))}
    </nav>
  )
}
