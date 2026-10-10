import type { ReactNode } from 'react'

import { cn } from '@/lib/cn'

export type EyebrowTone = 'primary' | 'accent' | 'plum'

interface EyebrowProps {
  tone?: EyebrowTone
  icon?: ReactNode
  children: ReactNode
  className?: string
}

const toneClasses: Record<EyebrowTone, string> = {
  primary: 'text-primary',
  accent: 'text-accent',
  plum: 'text-plum',
}

/**
 * A short label introducing a section, e.g. "أهم قاعدة نحوية". Plain sentence-case text —
 * it carries a category, so it needs colour and position, not a pill or tracking.
 */
export function Eyebrow({ tone = 'primary', icon, children, className }: EyebrowProps) {
  return (
    <span className={cn('mb-2 inline-flex items-center gap-2 text-sm font-semibold', toneClasses[tone], className)}>
      {icon}
      {children}
    </span>
  )
}
