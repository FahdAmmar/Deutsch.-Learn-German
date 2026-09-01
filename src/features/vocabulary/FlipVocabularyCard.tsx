import { useState } from 'react'
import { Volume2 } from 'lucide-react'

import { articleToTone, Badge } from '@/components/ui'
import { cn } from '@/lib/cn'
import { GERMAN_LOCALE } from '@/services/speech'
import { useSpeech } from '@/hooks/useSpeech'
import type { VocabularyItem } from '@/types'

interface FlipVocabularyCardProps {
  item: VocabularyItem
}

/**
 * Visually mirrors the source lesson pages' flip-card vocab grid, but
 * swaps content on click rather than using a 3D rotateY transform — a
 * screen reader only ever encounters the currently-visible face's text.
 * The flip trigger and the pronunciation button are kept as sibling
 * buttons (never nested) so both stay independently focusable.
 */
export function FlipVocabularyCard({ item }: FlipVocabularyCardProps) {
  const [flipped, setFlipped] = useState(false)
  const { speak, isSpeaking } = useSpeech()

  return (
    <div
      className={cn(
        'relative h-[150px] rounded-lg border transition-colors',
        flipped ? 'border-plum bg-plum text-plum-foreground' : 'border-border bg-surface hover:border-border-strong',
      )}
    >
      <button
        type="button"
        aria-pressed={flipped}
        aria-label={flipped ? `إخفاء معنى ${item.word}` : `عرض معنى ${item.word}`}
        onClick={() => setFlipped((prev) => !prev)}
        className="flex h-full w-full flex-col items-center justify-center gap-1.5 p-4 text-center"
      >
        {flipped ? (
          <>
            {item.article ? <p className="font-mono text-[11px] opacity-75">{item.article}</p> : null}
            <p dir="rtl" className="text-base font-semibold">
              {item.meaningAr}
            </p>
            {item.pronunciationHint ? (
              <p dir="ltr" className="font-mono text-xs opacity-70">
                {item.pronunciationHint}
              </p>
            ) : null}
          </>
        ) : (
          <p dir="ltr" lang="de" className="text-lg font-semibold text-ink">
            {item.word}
          </p>
        )}
      </button>

      {item.article && !flipped ? (
        <Badge tone={articleToTone(item.article)} className="pointer-events-none absolute start-2.5 top-2.5">
          {item.article}
        </Badge>
      ) : null}

      <button
        type="button"
        onClick={() => speak(item.word, GERMAN_LOCALE)}
        aria-label={`الاستماع إلى نطق: ${item.word}`}
        className={cn(
          'absolute bottom-2.5 start-2.5 flex h-7 w-7 items-center justify-center rounded-full border',
          flipped ? 'border-white/30 bg-white/10' : 'border-border text-primary',
        )}
      >
        <Volume2 size={14} className={cn(isSpeaking && 'animate-pulse')} aria-hidden="true" />
      </button>
    </div>
  )
}
