import { Volume2 } from 'lucide-react'

import { GERMAN_LOCALE } from '@/services/speech'
import { useSpeech } from '@/hooks/useSpeech'
import { cn } from '@/lib/cn'
import type { PronunciationTip } from '@/types'

interface PronunciationTipsProps {
  tips: PronunciationTip[]
}

export function PronunciationTips({ tips }: PronunciationTipsProps) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {tips.map((tip, index) => (
        <TipCard key={index} tip={tip} />
      ))}
    </div>
  )
}

function TipCard({ tip }: { tip: PronunciationTip }) {
  const { speak, isSpeaking } = useSpeech()

  return (
    <div className="rounded-lg border border-border bg-surface p-4">
      <h4 dir="rtl" className="mb-1.5 font-semibold text-ink">
        {tip.titleAr}
      </h4>
      <p dir="rtl" className="text-sm leading-relaxed text-ink-muted">
        {tip.bodyAr}
      </p>
      {tip.example ? (
        <button
          type="button"
          dir="ltr"
          onClick={() => speak(tip.example!, GERMAN_LOCALE)}
          className="mt-2 inline-flex items-center gap-1.5 font-de text-sm text-primary hover:underline"
        >
          <Volume2 size={13} className={cn(isSpeaking && 'animate-pulse')} aria-hidden="true" />
          {tip.example}
        </button>
      ) : null}
    </div>
  )
}
