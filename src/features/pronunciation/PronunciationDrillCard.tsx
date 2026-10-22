import { Check, EqualApproximately, Mic, Minus, Square, X } from 'lucide-react'

import { Button, Card } from '@/components/ui'
import { cn } from '@/lib/cn'
import { verdictFor, type SpeechComparison, type WordStatus } from '@/lib/pronunciation/compare'
import type { RecognitionErrorCode } from '@/services/recognition'
import type { PronunciationItem } from '@/data/pronunciation'

import { GermanWord } from './GermanWord'

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

const VERDICT_AR = {
  good: 'ممتاز! نطقك مطابق للمطلوب.',
  almost: 'قريب جداً. راجع الكلمات الموسومة وأعد المحاولة.',
  again: 'حاول مرة أخرى بتمهّل، وابدأ بالاستماع إلى النطق.',
} as const

const ERROR_AR: Record<RecognitionErrorCode, string> = {
  unsupported: 'متصفحك لا يدعم التعرّف على الكلام.',
  'not-allowed': 'لم يُسمح باستخدام الميكروفون. فعّل الإذن من إعدادات المتصفح ثم حاول مجدداً.',
  'no-microphone': 'لم يُعثر على ميكروفون في هذا الجهاز.',
  'no-speech': 'لم أسمع شيئاً. اقترب من الميكروفون وحاول مجدداً.',
  network: 'يحتاج التعرّف على الكلام إلى اتصال بالإنترنت.',
  aborted: '',
  unknown: 'تعذّر التعرّف على الكلام. حاول مرة أخرى.',
}

/** Each word carries its status in words and in an icon, so the result never depends on colour alone. */
const WORD_STATUS: Record<WordStatus, { label: string; icon: typeof Check; className: string }> = {
  match: { label: 'صحيحة', icon: Check, className: 'bg-success-muted text-success' },
  close: { label: 'قريبة', icon: EqualApproximately, className: 'bg-accent-muted text-ink' },
  wrong: { label: 'مختلفة', icon: X, className: 'bg-error-muted text-error' },
  missing: { label: 'لم تُسمع', icon: Minus, className: 'bg-surface-sunken text-ink-muted' },
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

        {error && ERROR_AR[error] ? (
          <p
            role="alert"
            dir="rtl"
            className="rounded-md border border-error/40 bg-error-muted p-3 text-sm leading-7 text-error"
          >
            {ERROR_AR[error]}
          </p>
        ) : null}

        {outcome && verdict ? (
          <div className="space-y-3 border-t border-border pt-4" dir="rtl">
            <p className="font-semibold text-ink">
              {VERDICT_AR[verdict]}{' '}
              <span className="tnum text-ink-muted">({Math.round(outcome.comparison.score * 100)}٪)</span>
            </p>
            <ul dir="ltr" className="flex flex-wrap gap-2">
              {outcome.comparison.words.map((entry, index) => {
                const status = WORD_STATUS[entry.status]
                const Icon = status.icon
                return (
                  <li
                    key={`${entry.word}-${index}`}
                    lang="de"
                    className={cn(
                      'flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-base font-medium',
                      status.className,
                    )}
                  >
                    <Icon size={14} strokeWidth={2.8} aria-hidden="true" />
                    <span>{entry.word}</span>
                    <span dir="rtl" lang="ar" className="text-xs font-normal">
                      {status.label}
                    </span>
                  </li>
                )
              })}
            </ul>
            {outcome.comparison.extra.length > 0 ? (
              <p className="text-sm text-ink-muted">
                كلمات زائدة سُمعت:{' '}
                <span dir="ltr" lang="de">
                  {outcome.comparison.extra.join(' ')}
                </span>
              </p>
            ) : null}
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
