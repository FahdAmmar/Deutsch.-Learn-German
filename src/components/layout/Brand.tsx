import { cn } from '@/lib/cn'

/** The wordmark: a navy tile with a D, the German name, and the Arabic name beneath it. */
export function Brand({ className }: { className?: string }) {
  return (
    <div className={cn('flex items-center gap-3', className)}>
      <svg viewBox="0 0 32 32" aria-hidden="true" className="h-8 w-8 shrink-0">
        <rect width="32" height="32" rx="8" className="fill-primary-container" />
        <path d="M11 8h5.5a8 8 0 0 1 0 16H11z" strokeWidth="2.6" strokeLinejoin="round" className="fill-none stroke-on-primary-container" />
      </svg>
      <div className="flex flex-col leading-none">
        <span dir="ltr" lang="de" className="font-heading text-xl font-extrabold tracking-tight text-primary">
          DeutschWelt
        </span>
        <span dir="rtl" className="mt-1 text-xs font-medium text-ink-muted">
          عالم الألمانية
        </span>
      </div>
    </div>
  )
}
