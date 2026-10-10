import type { HTMLAttributes } from 'react'

import { cn } from '@/lib/cn'

type CardTone = 'surface' | 'tint' | 'brand'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Marks the whole card as a navigation target. Interaction feedback is a border/colour
   * change only — cards don't lift, so a page full of links stays calm.
   */
  interactive?: boolean
  /**
   * `surface` — bordered panel (default). `tint` — recessed, borderless block for secondary
   * content. `brand` — the one emphasised panel on a screen (e.g. "continue learning").
   */
  tone?: CardTone
}

const toneClasses: Record<CardTone, string> = {
  surface: 'border border-border bg-surface',
  tint: 'bg-surface-sunken',
  brand: 'border border-primary/25 bg-primary-muted',
}

export function Card({ className, children, interactive, tone = 'surface', ...props }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-lg transition-colors duration-200',
        toneClasses[tone],
        interactive && 'hover:border-border-strong',
        interactive && tone === 'brand' && 'hover:border-primary/50',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export function CardHeader({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('border-b border-border p-4 sm:p-5', className)} {...props}>
      {children}
    </div>
  )
}

export function CardBody({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('p-4 sm:p-5', className)} {...props}>
      {children}
    </div>
  )
}
