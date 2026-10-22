import type { LucideIcon } from 'lucide-react'

import { Button, Card } from '@/components/ui'

export interface ModeCardProps {
  icon: LucideIcon
  title: string
  description: string
  meta?: string
  actionLabel: string
  onStart: () => void
  /** When set, the mode cannot start yet; this says why and what to do. */
  disabledReason?: string
}

export function ModeCard({
  icon: Icon,
  title,
  description,
  meta,
  actionLabel,
  onStart,
  disabledReason,
}: ModeCardProps) {
  return (
    <Card tone={disabledReason ? 'surface' : 'brand'}>
      <div dir="rtl" className="flex h-full flex-col items-start gap-4 p-5 sm:p-6">
        <Icon size={26} className="text-accent" aria-hidden="true" />
        <div className="space-y-1.5">
          <h3 className="font-sans text-xl font-bold text-ink">{title}</h3>
          <p className="text-ink-muted">{description}</p>
          {meta ? <p className="tnum text-sm font-semibold text-ink">{meta}</p> : null}
        </div>
        <div className="mt-auto w-full space-y-2">
          {/* Several cards share the same action label; the name must say which card the button belongs to. It starts with the visible text. */}
          <Button
            size="lg"
            onClick={onStart}
            disabled={disabledReason !== undefined}
            aria-label={`${actionLabel}: ${title}`}
            className="w-full"
          >
            {actionLabel}
          </Button>
          {disabledReason ? <p className="text-sm text-ink-muted">{disabledReason}</p> : null}
        </div>
      </div>
    </Card>
  )
}
