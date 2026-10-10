import { cn } from '@/lib/cn'
import type { PatternCardsBlock } from '@/types'

import { RichText } from '../RichText'
import { SpeakableGerman } from '../SpeakableGerman'
import { TONE_CLASSES } from '../ruleTone'

export function PatternCardsView({ block }: { block: PatternCardsBlock }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {block.cards.map((card, index) => {
        const tone = TONE_CLASSES[card.tone]
        return (
          <article
            key={index}
            className={cn('flex flex-col gap-3 rounded-lg border border-border border-t-4 bg-surface p-4 shadow-sm', tone.barTop)}
          >
            <header className="space-y-1">
              <h3 className="text-base font-bold text-ink">{card.titleAr}</h3>
              {card.subAr ? <p className="text-sm text-ink-muted">{card.subAr}</p> : null}
            </header>

            {card.formula ? (
              <p dir="ltr" className={cn('rounded-md px-3 py-1.5 font-mono text-xs font-bold', tone.soft)}>
                {card.formula}
              </p>
            ) : null}

            <ul className="divide-y divide-border">
              {card.items.map((item, itemIndex) => (
                <li key={itemIndex} className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5 py-1.5">
                  <SpeakableGerman text={item.de} tone={card.tone} className="font-semibold text-ink" />
                  {item.ar ? (
                    <span className="text-sm text-ink-muted">
                      <RichText text={item.ar} />
                    </span>
                  ) : null}
                </li>
              ))}
            </ul>
          </article>
        )
      })}
    </div>
  )
}
