import { cn } from '@/lib/cn'

type ProgressTone = 'primary' | 'success' | 'accent' | 'plum' | 'highlight'

interface ProgressBarProps {
  /** 0–1 */
  value: number
  label?: string
  className?: string
  tone?: ProgressTone
  size?: 'sm' | 'md'
}

const toneClasses: Record<ProgressTone, string> = {
  primary: 'bg-primary',
  success: 'bg-success',
  accent: 'bg-accent-vivid',
  plum: 'bg-plum-vivid',
  highlight: 'bg-highlight',
}

export function ProgressBar({ value, label, className, tone = 'primary', size = 'md' }: ProgressBarProps) {
  const percent = Math.round(Math.min(Math.max(value, 0), 1) * 100)

  return (
    <div className={cn('w-full', className)}>
      <div
        role="progressbar"
        aria-valuenow={percent}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label}
        className={cn('w-full overflow-hidden rounded-full bg-ink/10', size === 'sm' ? 'h-1.5' : 'h-2.5')}
      >
        <div
          className={cn(
            'h-full rounded-full transition-[width] duration-500 ease-out ltr:origin-left rtl:origin-right',
            'animate-[fill-in_700ms_cubic-bezier(0.2,0.8,0.2,1)_both]',
            toneClasses[tone],
          )}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  )
}
