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
  primary: 'bg-primary-muted text-primary',
  accent: 'bg-accent-muted text-accent',
  plum: 'bg-plum-muted text-plum',
}

/** Small pill label introducing a section, e.g. "أهم قاعدة نحوية". */
export function Eyebrow({ tone = 'primary', icon, children, className }: EyebrowProps) {
  return (
    <span
      className={cn(
        'mb-4 inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 font-mono text-xs tracking-wide',
        toneClasses[tone],
        className,
      )}
    >
      {icon}
      {children}
    </span>
  )
}
