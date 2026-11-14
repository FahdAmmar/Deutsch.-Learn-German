import { Target } from 'lucide-react'

import { InlineMarkup } from '@/components/ui'
import { getCanDoStatements } from '@/data/canDo'

interface CanDoListProps {
  lessonId: string
}

/**
 * What the learner can actually do after the lesson ("أستطيع أن …"), in the manner of the CEFR can-do descriptors.
 * The objectives above say what the lesson covers; these say what the learner can do with it. A lesson without
 * statements renders nothing.
 */
export function CanDoList({ lessonId }: CanDoListProps) {
  const statements = getCanDoStatements(lessonId)
  if (statements.length === 0) return null

  return (
    <div dir="rtl" className="rounded-lg border border-border bg-surface p-4 sm:p-5">
      <h3 className="flex items-center gap-2 font-sans text-base font-bold text-ink">
        <Target size={18} className="shrink-0 text-accent" aria-hidden="true" />
        بعد هذا الدرس
      </h3>
      <ul className="mt-3 space-y-2">
        {statements.map((statement) => (
          <li key={statement} className="leading-8 text-ink">
            <InlineMarkup text={statement} />
          </li>
        ))}
      </ul>
    </div>
  )
}
