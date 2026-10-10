import type { ReactNode } from 'react'
import { Check, X } from 'lucide-react'

import { cn } from '@/lib/cn'

interface OptionButtonProps {
  children: ReactNode
  onClick: () => void
  disabled?: boolean
  /** Set once the exercise has been answered, to reveal correct/incorrect styling. */
  state?: 'default' | 'selected-correct' | 'selected-incorrect' | 'unselected-correct' | 'unselected'
  dir?: 'ltr' | 'rtl'
  /** Short label (e.g. "A") shown in a badge at the start. Decorative: the accessible name stays the option text. */
  marker?: string
}

export function OptionButton({ children, onClick, disabled, state = 'default', dir, marker }: OptionButtonProps) {
  const isCorrect = state === 'selected-correct' || state === 'unselected-correct'
  const isWrong = state === 'selected-incorrect'

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      dir={dir}
      className={cn(
        'flex min-h-12 w-full items-center gap-3 rounded-md border-2 px-3.5 py-2.5 text-start transition-colors',
        state === 'default' && 'border-border bg-surface hover:border-accent/60 hover:bg-surface-sunken/50',
        state === 'unselected' && 'border-border bg-surface opacity-55',
        isCorrect && 'border-success bg-success-muted',
        isWrong && 'border-error bg-error-muted',
        'disabled:cursor-default',
      )}
    >
      {marker ? (
        <span
          aria-hidden="true"
          className={cn(
            'flex h-7 w-7 shrink-0 items-center justify-center rounded-sm text-sm font-bold',
            isCorrect ? 'bg-success text-success-foreground' : isWrong ? 'bg-error text-error-foreground' : 'bg-surface-sunken text-ink-muted',
          )}
        >
          {marker}
        </span>
      ) : null}
      <span className="flex-1 text-[1.05rem] font-medium text-ink">{children}</span>
      {isCorrect ? <Check size={20} aria-hidden="true" className="shrink-0 text-success" strokeWidth={2.6} /> : null}
      {isWrong ? <X size={20} aria-hidden="true" className="shrink-0 text-error" strokeWidth={2.6} /> : null}
    </button>
  )
}
