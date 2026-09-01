import type { ReactNode } from 'react'

import { Eyebrow, type EyebrowTone } from './Eyebrow'

interface SectionHeaderProps {
  eyebrow: ReactNode
  eyebrowTone?: EyebrowTone
  title: string
  subtitle?: ReactNode
  className?: string
}

export function SectionHeader({ eyebrow, eyebrowTone, title, subtitle, className }: SectionHeaderProps) {
  return (
    <div dir="rtl" className={className}>
      <Eyebrow tone={eyebrowTone}>{eyebrow}</Eyebrow>
      <h2 className="text-2xl font-bold text-ink sm:text-[1.7rem]">{title}</h2>
      {subtitle ? <p className="mt-3 max-w-[62ch] text-ink-muted leading-relaxed">{subtitle}</p> : null}
    </div>
  )
}
