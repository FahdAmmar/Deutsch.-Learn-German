import { AlertTriangle, BookOpen, CheckCircle2, Compass, Lightbulb, Link2, PencilLine, Sparkles, Star } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

import { cn } from '@/lib/cn'
import type { RuleBoxBlock, RuleIcon } from '@/types'

import { RichText } from '../RichText'
import { TONE_CLASSES } from '../ruleTone'

const ICONS: Record<RuleIcon, LucideIcon> = {
  book: BookOpen,
  lightbulb: Lightbulb,
  alert: AlertTriangle,
  star: Star,
  link: Link2,
  pencil: PencilLine,
  check: CheckCircle2,
  compass: Compass,
  sparkles: Sparkles,
}

export function RuleBoxView({ block }: { block: RuleBoxBlock }) {
  const tone = TONE_CLASSES[block.tone]
  const Icon = ICONS[block.icon]

  return (
    <div
      className={cn(
        'flex items-start gap-4 rounded-lg border border-border border-s-4 bg-surface p-4 shadow-sm sm:p-5',
        tone.barStart,
      )}
    >
      <span className={cn('flex h-10 w-10 shrink-0 items-center justify-center rounded-md', tone.soft)}>
        <Icon size={20} aria-hidden="true" />
      </span>
      <div className="min-w-0 space-y-1.5">
        <h3 className="text-base font-bold text-ink">{block.titleAr}</h3>
        <p className="leading-relaxed text-ink-muted">
          <RichText text={block.bodyAr} />
        </p>
      </div>
    </div>
  )
}
