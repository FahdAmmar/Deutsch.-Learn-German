import type { ReactNode } from 'react'

import { cn } from '@/lib/cn'

interface PageHeaderProps {
  /** The Arabic page title (h1). */
  title: string
  /** Optional German counterpart shown beneath the title. */
  titleDe?: string
  description?: ReactNode
  /** Right-hand (inline-end) slot for page-level actions. */
  actions?: ReactNode
  className?: string
}

/** Shared page opener. One h1 per route, a short plain-language description, optional actions. */
export function PageHeader({ title, titleDe, description, actions, className }: PageHeaderProps) {
  return (
    <header dir="rtl" className={cn('flex flex-wrap items-end justify-between gap-x-6 gap-y-4', className)}>
      <div className="min-w-0 space-y-2">
        <h1 className="text-[1.9rem] leading-tight font-bold text-ink sm:text-4xl">{title}</h1>
        {titleDe ? (
          <p lang="de" dir="ltr" className="display-de text-start text-lg font-medium text-ink-faint">
            {titleDe}
          </p>
        ) : null}
        {description ? <p className="max-w-[58ch] text-[1.0625rem] leading-8 text-ink-muted">{description}</p> : null}
      </div>
      {actions ? <div className="flex shrink-0 items-center gap-2">{actions}</div> : null}
    </header>
  )
}
