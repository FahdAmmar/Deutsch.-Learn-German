import { Check, X } from 'lucide-react'

import { InlineMarkup } from '@/components/ui'

interface CommonMistake {
  wrong: string
  correct: string
  explanationAr: string
}

interface CommonMistakesListProps {
  mistakes: CommonMistake[]
}

/** Wrong and right forms stacked and labelled, so the contrast does not depend on colour alone or on an arrow's direction. */
export function CommonMistakesList({ mistakes }: CommonMistakesListProps) {
  return (
    <ul className="divide-y divide-border">
      {mistakes.map((mistake, index) => (
        <li key={index} className="space-y-3 p-4 sm:p-5">
          <dl className="space-y-1.5">
            <div className="flex items-baseline gap-3">
              <dt dir="rtl" className="flex w-16 shrink-0 items-center gap-1.5 text-sm font-semibold text-ink-muted">
                <X size={15} strokeWidth={2.8} className="text-error" aria-hidden="true" />
                خطأ
              </dt>
              <dd dir="ltr" lang="de" className="display-de text-lg font-medium text-ink-muted line-through decoration-error/60">
                {mistake.wrong}
              </dd>
            </div>
            <div className="flex items-baseline gap-3">
              <dt dir="rtl" className="flex w-16 shrink-0 items-center gap-1.5 text-sm font-semibold text-ink">
                <Check size={15} strokeWidth={2.8} className="text-success" aria-hidden="true" />
                صحيح
              </dt>
              <dd dir="ltr" lang="de" className="display-de text-lg font-semibold text-ink">
                {mistake.correct}
              </dd>
            </div>
          </dl>
          <p dir="rtl" className="text-[0.95rem] leading-7 text-ink-muted">
            <InlineMarkup text={mistake.explanationAr} />
          </p>
        </li>
      ))}
    </ul>
  )
}
