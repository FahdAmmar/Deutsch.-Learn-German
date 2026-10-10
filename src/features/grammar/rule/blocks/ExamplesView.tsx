import { cn } from '@/lib/cn'
import type { ExamplesBlock } from '@/types'

import { RichText } from '../RichText'
import { SpeakableGerman } from '../SpeakableGerman'
import { TONE_CLASSES } from '../ruleTone'

export function ExamplesView({ block }: { block: ExamplesBlock }) {
  const columns = block.columns ?? 2

  return (
    <div className="space-y-3">
      {block.titleAr ? <h3 className="text-base font-bold text-ink">{block.titleAr}</h3> : null}
      <ol className={cn('grid gap-3', columns === 2 && 'md:grid-cols-2')}>
        {block.items.map((example, index) => {
          const tone = example.tone ?? block.tone ?? 'accent'
          return (
            <li
              key={index}
              className="flex flex-col gap-2 rounded-lg border border-border bg-surface p-4 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="flex items-start gap-3">
                <span
                  aria-hidden="true"
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-surface-muted font-mono text-xs font-bold text-ink-faint"
                >
                  {index + 1}
                </span>
                <div className="min-w-0 flex-1 space-y-1.5">
                  {example.badge ? (
                    <span
                      dir="ltr"
                      className={cn(
                        'inline-block rounded-full px-2.5 py-0.5 font-mono text-[11px] font-bold',
                        TONE_CLASSES[tone].soft,
                      )}
                    >
                      {example.badge}
                    </span>
                  ) : null}
                  <div>
                    <SpeakableGerman text={example.de} tone={tone} className="text-lg font-semibold leading-snug text-ink" />
                  </div>
                </div>
              </div>
              <p className="ps-10 text-ink-muted">
                <RichText text={example.ar} />
              </p>
              {example.noteAr ? (
                <p className="ms-10 rounded-md bg-surface-muted px-3 py-2 text-sm text-ink-muted">
                  <RichText text={example.noteAr} />
                </p>
              ) : null}
            </li>
          )
        })}
      </ol>
    </div>
  )
}
