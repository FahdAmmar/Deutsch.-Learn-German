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
}

export function OptionButton({ children, onClick, disabled, state = 'default', dir }: OptionButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      dir={dir}
      className={cn(
        'flex w-full items-center justify-between gap-3 rounded-md border px-4 py-3 text-start transition-colors',
        state === 'default' && 'border-border-strong bg-surface hover:bg-surface-muted',
        state === 'unselected' && 'border-border bg-surface opacity-60',
        state === 'selected-correct' && 'border-success bg-success-muted text-success',
        state === 'selected-incorrect' && 'border-error bg-error-muted text-error',
        state === 'unselected-correct' && 'border-success bg-success-muted text-success',
        'disabled:cursor-not-allowed',
      )}
    >
      <span className="text-sm font-medium">{children}</span>
      {state === 'selected-correct' || state === 'unselected-correct' ? (
        <Check size={18} aria-hidden="true" className="shrink-0" />
      ) : null}
      {state === 'selected-incorrect' ? <X size={18} aria-hidden="true" className="shrink-0" /> : null}
    </button>
  )
}
