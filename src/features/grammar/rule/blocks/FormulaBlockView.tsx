import { Fragment } from 'react'

import { cn } from '@/lib/cn'
import type { FormulaBlock } from '@/types'

import { RichText } from '../RichText'
import { TONE_CLASSES } from '../ruleTone'

export function FormulaBlockView({ block }: { block: FormulaBlock }) {
  return (
    <div
      dir="ltr"
      className="flex flex-wrap items-center gap-2 rounded-md border border-dashed border-border-strong bg-surface-muted p-4 font-mono text-sm font-bold"
    >
      {block.tags.map((tag, index) => (
        <Fragment key={index}>
          {index > 0 ? (
            <span aria-hidden="true" className="text-ink-faint">
              →
            </span>
          ) : null}
          <span
            className={cn(
              'rounded-md px-3 py-1.5',
              tag.tone ? TONE_CLASSES[tag.tone].soft : 'border border-border bg-surface text-ink-muted',
            )}
          >
            {tag.text}
            {tag.noteAr ? (
              // Physical `ml-2`, not logical `ms-2`: this span's own dir="rtl"
              // would otherwise resolve inline-start against ITS direction
              // (the right edge), leaving no visible gap from the German
              // text to its left inside this always-ltr formula bar.
              <span dir="rtl" className="ml-2 font-sans text-xs font-normal opacity-80">
                <RichText text={tag.noteAr} />
              </span>
            ) : null}
          </span>
        </Fragment>
      ))}
    </div>
  )
}
