import { Volume2 } from 'lucide-react'

import { useSpeech } from '@/hooks/useSpeech'
import { cn } from '@/lib/cn'
import { GERMAN_LOCALE } from '@/services/speech'
import type { RuleTone, TileGridBlock, TileItem } from '@/types'

import { TONE_CLASSES } from '../ruleTone'

/** Literal class strings so Tailwind's scanner finds them; narrow screens always show fewer columns. */
const COLUMN_CLASSES: Record<NonNullable<TileGridBlock['columns']>, string> = {
  2: 'grid-cols-2',
  3: 'grid-cols-2 sm:grid-cols-3',
  4: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4',
  5: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-5',
  6: 'grid-cols-3 sm:grid-cols-4 lg:grid-cols-6',
}

/** Compounds like `einunddreißigste` get a smaller size so they stay in one piece instead of breaking mid-word. */
const LONG_WORD = 12

function Tile({ item, tone }: { item: TileItem; tone: RuleTone }) {
  const { speak, isSpeaking, isSupported } = useSpeech()
  const toneClasses = TONE_CLASSES[item.tone ?? tone]

  return (
    <li>
      <button
        type="button"
        disabled={!isSupported}
        onClick={() => speak(item.de, GERMAN_LOCALE)}
        aria-label={`الاستماع إلى نطق: ${item.de} — ${item.ar}`}
        className={cn(
          'relative flex h-full w-full flex-col items-center justify-center gap-1 rounded-lg border border-border bg-surface px-2 py-3.5 text-center shadow-sm transition',
          'hover:border-primary/40 hover:shadow-md disabled:cursor-default disabled:hover:shadow-sm',
          isSpeaking && 'border-primary bg-primary-muted',
        )}
      >
        {isSupported ? (
          <Volume2
            size={13}
            aria-hidden="true"
            className={cn('absolute end-2 top-2 text-ink-faint', isSpeaking && 'animate-pulse text-primary')}
          />
        ) : null}
        <span dir="ltr" className={cn('display-de tnum text-2xl font-bold leading-none', toneClasses.text)}>
          {item.mark}
        </span>
        <span
          dir="ltr"
          lang="de"
          className={cn(
            'font-de font-semibold text-ink [overflow-wrap:anywhere]',
            item.de.length > LONG_WORD ? 'text-sm' : 'text-base',
          )}
        >
          {item.de}
        </span>
        <span className="text-sm text-ink-muted">{item.ar}</span>
        {item.exampleDe ? (
          <span dir="ltr" lang="de" className="font-de text-xs italic text-ink-faint">
            {item.exampleDe}
          </span>
        ) : null}
      </button>
    </li>
  )
}

/** Vocabulary learned as a set — numbers, weekdays, months, ordinals. Tap a tile to hear it. */
export function TileGridView({ block }: { block: TileGridBlock }) {
  const tone = block.tone ?? 'accent'

  return (
    <div className="space-y-3">
      {block.titleAr ? <h3 className={cn('text-base font-bold', TONE_CLASSES[tone].text)}>{block.titleAr}</h3> : null}
      <ul className={cn('grid gap-2.5 sm:gap-3', COLUMN_CLASSES[block.columns ?? 4])}>
        {block.items.map((item, index) => (
          <Tile key={`${item.mark}-${item.de}-${index}`} item={item} tone={tone} />
        ))}
      </ul>
    </div>
  )
}
