import { Mic, Square } from 'lucide-react'

import { Button, Card } from '@/components/ui'
import { cn } from '@/lib/cn'
import { verdictFor, type SpeechComparison } from '@/lib/pronunciation/compare'
import type { RecognitionErrorCode } from '@/services/recognition'
import type { PronunciationItem } from '@/data/pronunciation'

import { GermanWord } from './GermanWord'
import { RECOGNITION_ERROR_AR, VERDICT_AR } from './messages'
import { WordComparison } from './WordComparison'

export interface DrillOutcome {
  comparison: SpeechComparison
  /** What the recogniser wrote down. */
  heard: string
}

interface PronunciationDrillCardProps {
  item: PronunciationItem
  outcome?: DrillOutcome
  /** This card is the one being listened to. */
  listening: boolean
  /** Another card is listening: starting here would cut it short, so the button waits. */
  busy: boolean
  /** The browser can recognise speech; without it the card only plays the text. */
  canRecord: boolean
  error?: RecognitionErrorCode
  onStart: () => void
  onStop: () => void
}

export function PronunciationDrillCard({
  item,
  outcome,
  listening,
  busy,
  canRecord,
  error,
  onStart,
  onStop,
}: PronunciationDrillCardProps) {
  const verdict = outcome ? verdictFor(outcome.comparison) : undefined

  return (
    <Card>
      <div className="flex h-full flex-col gap-4 p-4 sm:p-5">
        <div className="space-y-2">
          <GermanWord word={item.text} size="lg" className="display-de font-semibold text-ink" />
          {item.noteAr ? (
            <p dir="rtl" className="text-sm leading-7 text-ink-muted">
              {item.noteAr}
            </p>
          ) : null}
        </div>

        {canRecord ? (
          <div className="flex flex-wrap items-center gap-3" dir="rtl">
            {listening ? (
              <Button variant="secondary" icon={<Square size={16} aria-hidden="true" />} onClick={onStop}>
                إيقاف
              </Button>
            ) : (
              <Button icon={<Mic size={18} aria-hidden="true" />} onClick={onStart} disabled={busy}>
                {outcome ? 'حاول مجدداً' : 'تحدّث'}
              </Button>
            )}
            {/* A live region, so a screen reader announces that the microphone is open and when it closes. */}
            <p role="status" className={cn('text-sm', listening ? 'font-semibold text-ink' : 'text-ink-muted')}>
              {listening ? 'أستمع إليك الآن… انطق النص كاملاً.' : ''}
            </p>
          </div>
        ) : null}

        {error && RECOGNITION_ERROR_AR[error] ? (
          <p
            role="alert"
            dir="rtl"
            className="rounded-md border border-error/40 bg-error-muted p-3 text-sm leading-7 text-error"
          >
            {RECOGNITION_ERROR_AR[error]}
          </p>
        ) : null}

        {outcome && verdict ? (
          <div className="space-y-3 border-t border-border pt-4" dir="rtl">
            <p className="font-semibold text-ink">
              {VERDICT_AR[verdict]}{' '}
              <span className="tnum text-ink-muted">({Math.round(outcome.comparison.score * 100)}٪)</span>
            </p>
            <WordComparison comparison={outcome.comparison} missingLabel="لم تُسمع" extraLabel="كلمات زائدة سُمعت" />
            <p className="text-sm text-ink-muted">
              ما فهمه البرنامج:{' '}
              <span dir="ltr" lang="de" className="text-ink">
                {outcome.heard || '—'}
              </span>
            </p>
          </div>
        ) : null}
      </div>
    </Card>
  )
}
