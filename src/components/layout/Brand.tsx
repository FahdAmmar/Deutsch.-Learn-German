import { cn } from '@/lib/cn'

/** The wordmark. German on the first line, the Arabic name beneath it. */
export function Brand({ className }: { className?: string }) {
  return (
    <div className={cn('flex flex-col items-start leading-none', className)}>
      <span dir="ltr" lang="de" className="display-de text-[1.65rem] font-bold text-ink">
        Deutsch<span className="text-accent">.</span>
      </span>
      <span dir="rtl" className="mt-1.5 text-xs font-medium text-ink-faint">
        تعلّم الألمانية
      </span>
    </div>
  )
}
