import { cn } from '@/lib/cn'

interface BrandProps {
  className?: string
  /**
   * `full` — tile, German name and the Arabic name beneath it (sidebar, menu).
   * `header` — the phone top bar: the tile alone, with the German name added from `sm` up. Phones have no room
   * for more, and the bar must never be wider than the screen.
   */
  variant?: 'full' | 'header'
}

/** The wordmark: a navy tile with a D, the German name, and the Arabic name beneath it. */
export function Brand({ className, variant = 'full' }: BrandProps) {
  const isHeader = variant === 'header'

  return (
    <div className={cn('flex shrink-0 items-center gap-3', className)}>
      <svg viewBox="0 0 32 32" aria-hidden="true" className="h-8 w-8 shrink-0">
        <rect width="32" height="32" rx="8" className="fill-primary-container" />
        <path d="M11 8h5.5a8 8 0 0 1 0 16H11z" strokeWidth="2.6" strokeLinejoin="round" className="fill-none stroke-on-primary-container" />
      </svg>
      <div className={cn('flex-col leading-none', isHeader ? 'hidden sm:flex' : 'flex')}>
        <span dir="ltr" lang="de" className="font-heading text-xl font-extrabold tracking-tight text-primary">
          DeutschWelt
        </span>
        {isHeader ? null : (
          <span dir="rtl" className="mt-1 text-xs font-medium text-ink-muted">
            عالم الألمانية
          </span>
        )}
      </div>
      {isHeader ? <span className="sr-only sm:hidden">DeutschWelt — عالم الألمانية</span> : null}
    </div>
  )
}
