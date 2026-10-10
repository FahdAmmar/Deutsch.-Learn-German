import { CheckCircle2, XCircle } from 'lucide-react'

import { InlineMarkup } from '@/components/ui'
import { cn } from '@/lib/cn'

interface FeedbackBannerProps {
  correct: boolean
  explanationAr: string
}

/** Shown right after an answer. It slides in because it is the direct result of the learner's action. */
export function FeedbackBanner({ correct, explanationAr }: FeedbackBannerProps) {
  return (
    <div
      dir="rtl"
      role="status"
      className={cn(
        'flex animate-[pop-in_220ms_ease-out_both] items-start gap-3 rounded-md p-4',
        correct ? 'bg-success-muted' : 'bg-error-muted',
      )}
    >
      {correct ? (
        <CheckCircle2 size={22} className="mt-0.5 shrink-0 text-success" aria-hidden="true" />
      ) : (
        <XCircle size={22} className="mt-0.5 shrink-0 text-error" aria-hidden="true" />
      )}
      <div className="space-y-1">
        <p className={cn('font-bold', correct ? 'text-success' : 'text-error')}>
          {correct ? 'إجابة صحيحة!' : 'إجابة غير صحيحة'}
        </p>
        <p className="leading-7 text-ink">
          <InlineMarkup text={explanationAr} />
        </p>
      </div>
    </div>
  )
}
