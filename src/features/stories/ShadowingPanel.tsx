import { ChevronDown, ChevronLeft, ChevronRight, Mic } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/components/ui'
import { PronunciationDrillCard, type DrillOutcome } from '@/features/pronunciation/PronunciationDrillCard'
import { useSpeechRecognition } from '@/hooks/useSpeechRecognition'
import { bestComparison, verdictFor } from '@/lib/pronunciation/compare'
import type { Story } from '@/types'

interface ShadowingPanelProps {
  story: Story
  /** Called just before the microphone opens, so the story's own audio does not play into it. */
  onBeforeListen: () => void
}

/**
 * Read the text aloud, sentence by sentence, and see which words the browser understood. It reuses the
 * pronunciation drill's card and its comparison. What it measures is whether the learner was understood,
 * not how good the accent is: the recogniser is the browser's, it is a guess, and the panel says so.
 * Results live as long as the page.
 */
export function ShadowingPanel({ story, onBeforeListen }: ShadowingPanelProps) {
  const recognition = useSpeechRecognition()
  const [index, setIndex] = useState(0)
  const [outcomes, setOutcomes] = useState<Record<number, DrillOutcome>>({})

  const segments = story.segments
  const segment = segments[index]
  const understood = Object.values(outcomes).filter((outcome) => verdictFor(outcome.comparison) === 'good').length

  async function listen() {
    onBeforeListen()
    const result = await recognition.start()
    if (!result) return
    const { comparison, heard } = bestComparison(segment.text, [result.transcript, ...result.alternatives])
    setOutcomes((current) => ({ ...current, [index]: { comparison, heard } }))
  }

  function goTo(next: number) {
    recognition.cancel()
    setIndex(Math.min(Math.max(next, 0), segments.length - 1))
  }

  if (segments.length === 0) return null

  return (
    <details className="group rounded-lg border border-border bg-surface">
      <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-3 rounded-lg px-4 py-3 hover:bg-surface-sunken [&::-webkit-details-marker]:hidden">
        <span dir="rtl" className="flex items-center gap-3">
          <Mic size={20} className="text-accent" aria-hidden="true" />
          <span className="space-y-0.5">
            <span className="block font-sans text-base font-bold text-ink">اقرأ بصوتك</span>
            <span className="block text-sm text-ink-muted">اقرأ الجمل بصوت عالٍ، وانظر أي الكلمات فهمها البرنامج.</span>
          </span>
        </span>
        <ChevronDown size={18} aria-hidden="true" className="shrink-0 text-ink-faint motion-safe:transition-transform group-open:rotate-180" />
      </summary>

      <div className="space-y-4 border-t border-border p-4">
        {!recognition.isSupported ? (
          <p dir="rtl" role="note" className="rounded-md border border-border bg-surface-sunken p-3 text-sm leading-7 text-ink-muted">
            متصفحك لا يدعم التعرّف على الكلام. جرّب Chrome أو Edge. يمكنك مع ذلك الاستماع إلى كل جملة بالضغط على زر الصوت.
          </p>
        ) : (
          <p dir="rtl" className="text-sm leading-7 text-ink-muted">
            يقيس هذا التدريب هل فُهمتَ، لا جودة لهجتك: التعرّف على الكلام تخمين من المتصفح، وقد يرسل صوتك إلى خادم لمعالجته.
          </p>
        )}

        <div dir="rtl" className="flex flex-wrap items-center justify-between gap-3">
          <p className="tnum text-sm text-ink-muted" aria-live="polite">
            الجملة {index + 1} من {segments.length}
            {understood > 0 ? ` · فُهمت ${understood} جملة بلا خطأ` : ''}
          </p>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => goTo(index - 1)} disabled={index === 0} icon={<ChevronRight size={16} aria-hidden="true" />}>
              السابقة
            </Button>
            <Button variant="outline" size="sm" onClick={() => goTo(index + 1)} disabled={index === segments.length - 1} icon={<ChevronLeft size={16} aria-hidden="true" />} iconPosition="end">
              التالية
            </Button>
          </div>
        </div>

        <PronunciationDrillCard
          key={segment.index}
          item={{ id: `${story.id}-${segment.index}`, text: segment.text, noteAr: segment.ar }}
          outcome={outcomes[index]}
          listening={recognition.phase === 'listening'}
          busy={false}
          canRecord={recognition.isSupported}
          error={recognition.error ?? undefined}
          onStart={listen}
          onStop={recognition.cancel}
        />
      </div>
    </details>
  )
}
