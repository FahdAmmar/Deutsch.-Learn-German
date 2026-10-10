import type { HTMLAttributes } from 'react'

import { cn } from '@/lib/cn'

export type BadgeTone =
  | 'neutral'
  | 'primary'
  | 'accent'
  | 'plum'
  | 'highlight'
  | 'success'
  | 'error'
  | 'der'
  | 'die'
  | 'das'

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: BadgeTone
}

const toneClasses: Record<BadgeTone, string> = {
  neutral: 'bg-surface-sunken text-ink-muted',
  primary: 'bg-primary-muted text-primary',
  accent: 'bg-accent-muted text-accent',
  plum: 'bg-plum-muted text-plum',
  highlight: 'bg-highlight-muted text-highlight',
  success: 'bg-success-muted text-success',
  error: 'bg-error-muted text-error',
  der: 'bg-der-muted text-der',
  die: 'bg-die-muted text-die',
  das: 'bg-das-muted text-das',
}

export function Badge({ tone = 'neutral', className, children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-semibold leading-5',
        toneClasses[tone],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  )
}
