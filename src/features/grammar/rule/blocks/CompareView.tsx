import { useState } from 'react'

import { cn } from '@/lib/cn'
import type { CompareBlock } from '@/types'

import { TONE_CLASSES } from '../ruleTone'

/** "Try it yourself": flip one sentence between variants and watch the coloured slots change. */
export function CompareView({ block }: { block: CompareBlock }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const mode = block.modes[activeIndex]

  return (
    <div className="space-y-4 rounded-lg border border-border bg-surface p-4 shadow-sm sm:p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-base font-bold text-ink">{block.titleAr}</h3>
        <div role="group" aria-label={block.titleAr} className="inline-flex rounded-md border border-border bg-surface-muted p-1">
          {block.modes.map((item, index) => (
            <button
              key={index}
              type="button"
              aria-pressed={index === activeIndex}
              onClick={() => setActiveIndex(index)}
              className={cn(
                'rounded-sm px-3 py-1.5 text-sm font-semibold transition-colors',
                index === activeIndex ? 'bg-surface text-primary shadow-sm' : 'text-ink-muted hover:text-ink',
              )}
            >
              {item.labelAr}
            </button>
          ))}
        </div>
      </div>

      <p dir="ltr" lang="de" className="flex flex-wrap items-center gap-2 rounded-md bg-surface-muted p-4 font-de text-lg font-semibold">
        {mode.parts.map((part, index) => (
          <span
            key={index}
            className={cn('rounded-md px-3 py-1.5', part.tone ? TONE_CLASSES[part.tone].soft : 'bg-surface text-ink')}
          >
            {part.text}
          </span>
        ))}
      </p>

      <p aria-live="polite" className="text-sm text-ink-muted">
        {mode.captionAr}
      </p>
    </div>
  )
}
