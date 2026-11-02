import { Check, EqualApproximately, Minus, X } from 'lucide-react'

import { cn } from '@/lib/cn'
import type { SpeechComparison, WordStatus } from '@/lib/pronunciation/compare'

/** Each word carries its status in words and in an icon, so the result never depends on colour alone. */
const WORD_STATUS: Record<WordStatus, { label: string; icon: typeof Check; className: string }> = {
  match: { label: 'صحيحة', icon: Check, className: 'bg-success-muted text-success' },
  close: { label: 'قريبة', icon: EqualApproximately, className: 'bg-accent-muted text-ink' },
  wrong: { label: 'مختلفة', icon: X, className: 'bg-error-muted text-error' },
  missing: { label: 'غائبة', icon: Minus, className: 'bg-surface-sunken text-ink-muted' },
}

interface WordComparisonProps {
  comparison: SpeechComparison
  /** What the learner's answer lacked, in the learner's words: "لم تُسمع" for speech, "غائبة" for typing. */
  missingLabel?: string
  /** The lead-in to the words that were not asked for. */
  extraLabel?: string
}

/** The words of the target sentence, each marked as right, close, different or missing; then any words that were not asked for. */
export function WordComparison({ comparison, missingLabel, extraLabel = 'كلمات زائدة' }: WordComparisonProps) {
  return (
    <>
      <ul dir="ltr" className="flex flex-wrap gap-2">
        {comparison.words.map((entry, index) => {
          const status = WORD_STATUS[entry.status]
          const Icon = status.icon
          return (
            <li
              key={`${entry.word}-${index}`}
              lang="de"
              className={cn('flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-base font-medium', status.className)}
            >
              <Icon size={14} strokeWidth={2.8} aria-hidden="true" />
              <span>{entry.word}</span>
              <span dir="rtl" lang="ar" className="text-xs font-normal">
                {entry.status === 'missing' && missingLabel ? missingLabel : status.label}
              </span>
            </li>
          )
        })}
      </ul>
      {comparison.extra.length > 0 ? (
        <p className="text-sm text-ink-muted">
          {extraLabel}:{' '}
          <span dir="ltr" lang="de">
            {comparison.extra.join(' ')}
          </span>
        </p>
      ) : null}
    </>
  )
}
