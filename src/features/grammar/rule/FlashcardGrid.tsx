import { useState } from 'react'
import { RotateCw } from 'lucide-react'

import { cn } from '@/lib/cn'
import type { RuleFlashcard } from '@/types'

import { RichText } from './RichText'
import { stripMarkup } from '@/lib/richText'

function Flashcard({ card }: { card: RuleFlashcard }) {
  const [flipped, setFlipped] = useState(false)

  return (
    <button
      type="button"
      aria-pressed={flipped}
      aria-label={flipped ? `الإجابة: ${card.backAr}. اضغط للعودة` : `${stripMarkup(card.frontDe)} — اضغط لإظهار الإجابة`}
      onClick={() => setFlipped((value) => !value)}
      className={cn(
        'flex min-h-40 flex-col justify-between gap-3 rounded-lg border p-4 text-start shadow-sm transition-colors',
        flipped ? 'border-accent/40 bg-accent-muted/40' : 'border-border bg-surface hover:border-border-strong',
      )}
    >
      {flipped ? (
        <span className="space-y-2">
          <span className="block leading-relaxed text-ink">
            <RichText text={card.backAr} />
          </span>
          {card.exampleDe ? (
            <span dir="ltr" lang="de" className="block rounded-md bg-surface px-3 py-2 font-de text-sm font-semibold text-ink">
              <RichText text={card.exampleDe} boldAs="mark" />
            </span>
          ) : null}
        </span>
      ) : (
        <span className="space-y-2">
          <span dir="ltr" lang="de" className="block font-de text-lg font-semibold text-ink">
            <RichText text={card.frontDe} boldAs="mark" />
          </span>
          {card.hintAr ? <span className="block text-sm text-ink-muted">{card.hintAr}</span> : null}
        </span>
      )}
      <span className="flex items-center gap-1.5 text-xs text-ink-faint">
        <RotateCw size={12} aria-hidden="true" />
        {flipped ? 'اضغط للعودة' : 'اضغط للقلب'}
      </span>
    </button>
  )
}

export function FlashcardGrid({ cards }: { cards: RuleFlashcard[] }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {cards.map((card, index) => (
        <Flashcard key={index} card={card} />
      ))}
    </div>
  )
}
