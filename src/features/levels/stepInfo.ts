import type { ResolvedStep } from '@/lib/learningPath'
import { grammarRulePath } from '@/lib/grammarRoadmap'
import type { PathStepKind } from '@/types'
import { CONVERSATION_FORMS, formatCountAr, LESSON_FORMS, RULE_FORMS, TEXT_FORMS } from '@/utils/arabicCount'

/** What a step is called to the learner. */
export const STEP_KIND_LABEL: Record<PathStepKind, string> = {
  lesson: 'درس',
  rule: 'قاعدة',
  reading: 'نص',
  conversation: 'محادثة',
}

/** Where a step opens. */
export function getStepHref(step: ResolvedStep): string {
  switch (step.kind) {
    case 'lesson':
      return `/lessons/${step.lesson.level.toLowerCase()}/${step.lesson.slug}`
    case 'rule':
      return grammarRulePath(step.rule)
    case 'reading':
    case 'conversation':
      return `/levels/${step.story.level.toLowerCase()}/texts/${step.story.id}`
  }
}

/** The Arabic and German titles of a step. */
export function getStepTitles(step: ResolvedStep): { ar: string; de: string } {
  switch (step.kind) {
    case 'lesson':
      return { ar: step.lesson.titleAr, de: step.lesson.title }
    case 'rule':
      return { ar: step.rule.titleAr, de: step.rule.termDe }
    case 'reading':
    case 'conversation':
      return { ar: step.story.titleAr, de: step.story.titleDe }
  }
}

/** "6 دروس · 3 قواعد · نصان · محادثة واحدة": what a chapter or a level holds, skipping what it does not. */
export function describeStepCounts(counts: Record<PathStepKind, number>): string {
  return [
    counts.lesson > 0 ? formatCountAr(counts.lesson, LESSON_FORMS) : '',
    counts.rule > 0 ? formatCountAr(counts.rule, RULE_FORMS) : '',
    counts.reading > 0 ? formatCountAr(counts.reading, TEXT_FORMS) : '',
    counts.conversation > 0 ? formatCountAr(counts.conversation, CONVERSATION_FORMS) : '',
  ]
    .filter(Boolean)
    .join(' · ')
}
