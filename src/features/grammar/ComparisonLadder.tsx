import { ArrowLeft, Volume2 } from 'lucide-react'

import { cn } from '@/lib/cn'
import { GERMAN_LOCALE } from '@/services/speech'
import { useSpeech } from '@/hooks/useSpeech'
import type { AdjectiveComparison, AdjectiveComparisonExample } from '@/types'

interface ComparisonLadderProps {
  adjectives: AdjectiveComparison[]
}

/**
 * Reuses the app's teal / amber / plum accent triad to mark the three
 * degrees of comparison consistently, the same way der/die/das get a
 * fixed hue — one more place colour carries grammatical meaning.
 */
export function ComparisonLadder({ adjectives }: ComparisonLadderProps) {
  return (
    <div className="space-y-4">
      {adjectives.map((adj) => (
        <div key={adj.positiv} className="rounded-xl border border-border bg-surface p-4 shadow-sm sm:p-5">
          <div dir="rtl" className="mb-3 flex items-center justify-between text-sm">
            <span className="font-semibold text-ink">{adj.meaningAr}</span>
            <div className="flex items-center gap-1.5">
              {adj.hasUmlaut ? <Tag tone="accent">Umlaut</Tag> : null}
              {adj.irregular ? <Tag tone="plum">شاذ</Tag> : null}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Step label="Positiv" word={adj.positiv} tone="primary" />
            <ArrowLeft size={16} className="shrink-0 text-ink-faint" aria-hidden="true" />
            <Step label="Komparativ" word={adj.komparativ} tone="accent" />
            <ArrowLeft size={16} className="shrink-0 text-ink-faint" aria-hidden="true" />
            <Step label="Superlativ" word={adj.superlativ} tone="plum" />
          </div>

          <div dir="rtl" className="mt-4 space-y-2 border-t border-border pt-3">
            <ExampleLine example={adj.examplePositiv} tone="primary" />
            <ExampleLine example={adj.exampleKomparativ} tone="accent" />
            <ExampleLine example={adj.exampleSuperlativ} tone="plum" />
          </div>
        </div>
      ))}
    </div>
  )
}

type Tone = 'primary' | 'accent' | 'plum'

const toneClasses: Record<Tone, string> = {
  primary: 'bg-primary-muted text-primary',
  accent: 'bg-accent-muted text-accent',
  plum: 'bg-plum-muted text-plum',
}

function Tag({ tone, children }: { tone: Tone; children: string }) {
  return <span className={cn('rounded-full px-2.5 py-0.5 text-xs font-semibold', toneClasses[tone])}>{children}</span>
}

function Step({ label, word, tone }: { label: string; word: string; tone: Tone }) {
  return (
    <div className={cn('rounded-lg px-3 py-2 text-center', toneClasses[tone])}>
      <p dir="ltr" className="font-mono text-[10px] uppercase tracking-wide opacity-80">
        {label}
      </p>
      <p dir="ltr" className="font-de font-semibold">
        {word}
      </p>
    </div>
  )
}

function ExampleLine({ example, tone }: { example: AdjectiveComparisonExample; tone: Tone }) {
  const { speak, isSpeaking } = useSpeech()
  return (
    <p className="flex flex-wrap items-baseline gap-2 text-sm">
      <button
        type="button"
        dir="ltr"
        onClick={() => speak(example.sentence, GERMAN_LOCALE)}
        className={cn('inline-flex items-center gap-1.5 font-de hover:underline', toneClasses[tone].split(' ')[1])}
      >
        <Volume2 size={12} className={cn(isSpeaking && 'animate-pulse')} aria-hidden="true" />
        {example.sentence}
      </button>
      <span className="text-ink-muted">— {example.ar}</span>
    </p>
  )
}
