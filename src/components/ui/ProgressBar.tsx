import { cn } from '@/lib/cn'

interface ProgressBarProps {
  /** 0–1 */
  value: number
  label?: string
  className?: string
  tone?: 'primary' | 'success' | 'accent'
}

const toneClasses = {
  primary: 'bg-primary',
  success: 'bg-success',
  accent: 'bg-accent',
}

export function ProgressBar({ value, label, className, tone = 'primary' }: ProgressBarProps) {
  const percent = Math.round(Math.min(Math.max(value, 0), 1) * 100)

  return (
    <div className={cn('w-full', className)}>
      <div
        role="progressbar"
        aria-valuenow={percent}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label}
        className="h-2 w-full overflow-hidden rounded-sm bg-surface-muted"
      >
        <div
          className={cn('h-full rounded-sm transition-[width] duration-300', toneClasses[tone])}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  )
}
