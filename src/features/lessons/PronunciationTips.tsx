import { Volume2 } from 'lucide-react'

import { Card, InlineMarkup } from '@/components/ui'
import { useSpeech } from '@/hooks/useSpeech'
import { cn } from '@/lib/cn'
import { GERMAN_LOCALE } from '@/services/speech'
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
    <Card>
      <div className="space-y-2 p-4 sm:p-5">
        <h3 dir="rtl" className="font-sans text-base font-bold text-ink">
          <InlineMarkup text={tip.titleAr} />
        </h3>
        <p dir="rtl" className="text-[0.95rem] leading-7 text-ink-muted">
          <InlineMarkup text={tip.bodyAr} />
        </p>
        {tip.example ? (
          <button
            type="button"
            dir="ltr"
            lang="de"
            onClick={() => speak(tip.example!, GERMAN_LOCALE)}
            aria-label={`الاستماع إلى: ${tip.example}`}
            className="display-de inline-flex items-center gap-2 rounded-md bg-surface-sunken px-3 py-2 text-base font-medium text-ink hover:text-accent"
          >
            <Volume2 size={16} className={cn('text-accent', isSpeaking && 'animate-pulse')} aria-hidden="true" />
            {tip.example}
          </button>
        ) : null}
      </div>
    </Card>
  )
}
