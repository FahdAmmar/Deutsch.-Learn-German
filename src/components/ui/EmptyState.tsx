import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'

import { cn } from '@/lib/cn'

interface EmptyStateProps {
  icon?: LucideIcon
  title: string
  /** What the person can do next, in plain words. */
  children?: ReactNode
  action?: ReactNode
  className?: string
}

/** An empty screen is an invitation to act: say what is missing and what to do about it. */
export function EmptyState({ icon: Icon, title, children, action, className }: EmptyStateProps) {
  return (
    <div
      dir="rtl"
      className={cn('flex flex-col items-center gap-3 rounded-lg bg-surface-sunken px-6 py-10 text-center', className)}
    >
      {Icon ? <Icon size={26} className="text-ink-faint" aria-hidden="true" /> : null}
      <p className="font-semibold text-ink">{title}</p>
      {children ? <p className="max-w-[44ch] text-ink-muted">{children}</p> : null}
      {action}
    </div>
  )
}
