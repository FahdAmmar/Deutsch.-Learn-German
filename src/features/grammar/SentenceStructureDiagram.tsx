import { useMemo } from 'react'
import { Volume2 } from 'lucide-react'

import { cn } from '@/lib/cn'
import { GERMAN_LOCALE } from '@/services/speech'
import { useSpeech } from '@/hooks/useSpeech'

interface SentenceToken {
  text: string
  /** Grammatical role, in Arabic (e.g. "الفاعل", "الفعل", "المفعول به") — shown as the block's label. */
  role: string
}

interface SentenceStructureDiagramProps {
  tokens: SentenceToken[]
  ar: string
}

const PALETTE = ['primary', 'accent', 'plum', 'success'] as const
type PaletteTone = (typeof PALETTE)[number]

const toneClasses: Record<PaletteTone, string> = {
  primary: 'border-primary/30 bg-primary-muted text-primary',
  accent: 'border-accent/30 bg-accent-muted text-accent',
  plum: 'border-plum/30 bg-plum-muted text-plum',
  success: 'border-success/30 bg-success-muted text-success',
}

/**
 * Renders a German sentence as a row of color-coded blocks, one per word
 * (or word group), each labeled with its grammatical role in Arabic below
 * it — e.g. "Ich   lerne   Deutsch." → الفاعل / الفعل / المفعول به. The
 * same role always gets the same color within one diagram, cycling
 * through a fixed 4-color palette so the visual stays consistent however
 * many distinct roles a sentence has.
 */
export function SentenceStructureDiagram({ tokens, ar }: SentenceStructureDiagramProps) {
  const { speak, isSpeaking } = useSpeech()

  const roleColor = useMemo(() => {
    const map = new Map<string, PaletteTone>()
    let next = 0
    for (const token of tokens) {
      if (!map.has(token.role)) {
        map.set(token.role, PALETTE[next % PALETTE.length])
        next += 1
      }
    }
    return map
  }, [tokens])

  const fullSentence = tokens.map((token) => token.text).join(' ')

  return (
    <div className="rounded-lg border border-border bg-surface p-4">
      <div dir="ltr" className="flex flex-wrap items-end gap-x-2 gap-y-3">
        {tokens.map((token, index) => (
          <div key={index} className="flex flex-col items-center gap-1.5">
            <span
              className={cn(
                'rounded-md border px-3 py-1.5 font-de text-base font-semibold sm:text-lg',
                toneClasses[roleColor.get(token.role) ?? 'primary'],
              )}
            >
              {token.text}
            </span>
            <span dir="rtl" className="text-[11px] leading-none text-ink-faint">
              {token.role}
            </span>
          </div>
        ))}
        <button
          type="button"
          onClick={() => speak(fullSentence, GERMAN_LOCALE)}
          aria-label={`الاستماع إلى نطق: ${fullSentence}`}
          className="mb-6 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border-strong text-primary"
        >
          <Volume2 size={13} className={cn(isSpeaking && 'animate-pulse')} aria-hidden="true" />
        </button>
      </div>
      <p dir="rtl" className="mt-3 text-sm text-ink-muted">
        {ar}
      </p>
    </div>
  )
}
