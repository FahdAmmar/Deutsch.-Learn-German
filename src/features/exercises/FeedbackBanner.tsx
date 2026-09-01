import { CheckCircle2, XCircle } from 'lucide-react'

import { cn } from '@/lib/cn'

interface FeedbackBannerProps {
  correct: boolean
  explanationAr: string
}

export function FeedbackBanner({ correct, explanationAr }: FeedbackBannerProps) {
  return (
    <div
      dir="rtl"
      role="status"
      className={cn(
        'flex items-start gap-2.5 rounded-md border p-3.5 text-sm',
        correct ? 'border-success bg-success-muted text-success' : 'border-error bg-error-muted text-error',
      )}
    >
      {correct ? (
        <CheckCircle2 size={18} className="mt-0.5 shrink-0" aria-hidden="true" />
      ) : (
        <XCircle size={18} className="mt-0.5 shrink-0" aria-hidden="true" />
      )}
      <div className="space-y-1">
        <p className="font-semibold">{correct ? 'إجابة صحيحة!' : 'إجابة غير صحيحة'}</p>
        <p className="text-ink-muted">{explanationAr}</p>
      </div>
    </div>
  )
}
