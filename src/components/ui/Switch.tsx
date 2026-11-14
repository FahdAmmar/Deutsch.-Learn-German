import { cn } from '@/lib/cn'

interface SwitchProps {
  checked: boolean
  onChange: (checked: boolean) => void
  label: string
  id?: string
}

/**
 * Bidi-safe toggle: the thumb is positioned with logical `start-*`/`end-*`
 * utilities rather than a `translateX` transform, so it lands on the
 * correct physical side automatically in both LTR and RTL without any
 * direction-specific overrides.
 *
 * The visible track is 28px high, so a transparent `before` layer extends the tappable area to 48px.
 */
export function Switch({ checked, onChange, label, id }: SwitchProps) {
  return (
    <button
      type="button"
      id={id}
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={cn(
        'relative inline-flex h-7 w-12 shrink-0 items-center rounded-full transition-colors before:absolute before:-inset-x-1 before:-inset-y-2.5',
        checked ? 'bg-accent' : 'border-2 border-border-strong bg-surface-sunken',
      )}
    >
      <span
        className={cn(
          'absolute h-5 w-5 rounded-full transition-colors',
          checked ? 'end-1 bg-accent-foreground' : 'start-1 bg-ink-faint',
        )}
      />
    </button>
  )
}
