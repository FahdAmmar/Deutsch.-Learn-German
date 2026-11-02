import { ArrowLeft, Check, Lightbulb, Mic, RotateCcw, Square, Volume2 } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

import { Button, Card, SpecialCharsBar } from '@/components/ui'
import { RECOGNITION_ERROR_AR, VERDICT_AR } from '@/features/pronunciation/messages'
import { WordComparison } from '@/features/pronunciation/WordComparison'
import { useInsertAtCaret } from '@/hooks/useInsertAtCaret'
import { useSpeechRecognition } from '@/hooks/useSpeechRecognition'
import { cn } from '@/lib/cn'
import { bestComparison, verdictFor } from '@/lib/pronunciation/compare'
import {
  compareTyped,
  hintOf,
  isLearnerLine,
  isPerfect,
  learnerLines,
  summarize,
  type RolePlayLine,
  type RolePlayRole,
  type Speaker,
  type TurnResult,
} from '@/lib/rolePlay'

import { useSpeakLine } from './useSpeakLine'

interface RolePlayStageProps {
  lines: readonly RolePlayLine[]
  roles: readonly RolePlayRole[]
  role: Speaker
  /** Where "back to the conversation" goes. */
  backTo: string
  onChangeRole: (role: Speaker) => void
}

/**
 * One side of a conversation, played. The other speaker's lines are read aloud; for each line of the
 * learner's part the Arabic is shown and the German is typed or spoken, then compared word by word with
 * the line. Nothing here is stored: it is practice, and the results live as long as the page.
 */
export function RolePlayStage({ lines, roles, role, backTo, onChangeRole }: RolePlayStageProps) {
  const speak = useSpeakLine()
  const recognition = useSpeechRecognition()
  const [step, setStep] = useState(0)
  const [results, setResults] = useState<TurnResult[]>([])
  const [typed, setTyped] = useState('')
  const [hinted, setHinted] = useState(false)
  const { ref: inputRef, insert } = useInsertAtCaret<HTMLInputElement>(typed, setTyped)

  const finished = step >= lines.length
  const line = finished ? undefined : lines[step]
  const mine = line !== undefined && isLearnerLine(line, role)
  const myCount = useMemo(() => learnerLines(lines, role).length, [lines, role])
  const result = results.find((entry) => entry.index === step)
  const partner = roles.find((candidate) => candidate.speaker !== role)

  // A new line of the learner's part is answered at once, so the field is ready for typing.
  useEffect(() => {
    if (mine && !result) inputRef.current?.focus()
  }, [mine, result, step, inputRef])

  function goTo(next: number) {
    recognition.cancel()
    setStep(next)
    setTyped('')
    setHinted(false)
    // The click that brought us here is what lets the browser play sound, so the other speaker's line is read now.
    const upcoming = lines[next]
    if (upcoming && !isLearnerLine(upcoming, role)) speak(upcoming)
  }

  function record(turn: TurnResult) {
    setResults((current) => [...current.filter((entry) => entry.index !== turn.index), turn])
  }

  function check() {
    if (!line || !typed.trim()) return
    record({ index: step, typed, comparison: compareTyped(line.de, typed) })
  }

  async function speakAnswer() {
    if (!line) return
    const heard = await recognition.start()
    if (!heard) return
    const best = bestComparison(line.de, [heard.transcript, ...heard.alternatives])
    record({ index: step, typed: best.heard, comparison: best.comparison })
  }

  function restart(nextRole: Speaker = role) {
    recognition.cancel()
    setResults([])
    setStep(0)
    setTyped('')
    setHinted(false)
    onChangeRole(nextRole)
    const first = lines[0]
    if (first && !isLearnerLine(first, nextRole)) speak(first)
  }

  const summary = summarize(results, myCount)
  const verdict = result ? verdictFor(result.comparison) : undefined

  return (
    <div className="space-y-6">
      <div dir="rtl" className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-border bg-surface p-4">
        <p className="text-ink">
          دورك: <strong className="font-semibold">{roles.find((candidate) => candidate.speaker === role)?.name}</strong>
          <span className="text-ink-muted"> — والطرف الآخر: {partner?.name}</span>
        </p>
        <p className="tnum text-sm text-ink-muted" role="status">
          {finished ? 'انتهت المحادثة' : `السطر ${step + 1} من ${lines.length}`}
        </p>
      </div>

      {/* What has been said so far. */}
      <ol dir="ltr" aria-label="ما قيل حتى الآن" className="space-y-3">
        {lines.slice(0, step).map((previous) => {
          const own = isLearnerLine(previous, role)
          return (
            <li key={previous.index} className={cn('flex', own ? 'justify-end' : 'justify-start')}>
              <div className={cn('max-w-[85%] space-y-1 rounded-lg px-4 py-2.5', own ? 'bg-accent-muted' : 'bg-surface-sunken')}>
                <p className="text-xs font-semibold text-ink-muted">{previous.name}</p>
                <p lang="de" className="display-de text-base text-ink">
                  {previous.de}
                </p>
                <p dir="rtl" lang="ar" className="text-sm text-ink-muted">
                  {previous.ar}
                </p>
              </div>
            </li>
          )
        })}
      </ol>

      {line && !mine ? (
        <Card>
          <div className="space-y-3 p-5" dir="ltr">
            <p className="text-xs font-semibold text-ink-muted">{line.name}</p>
            <p lang="de" className="display-de text-xl text-ink">
              {line.de}
            </p>
            <p dir="rtl" lang="ar" className="text-ink-muted">
              {line.ar}
            </p>
            <div dir="rtl" className="flex flex-wrap items-center gap-3">
              <Button variant="outline" size="sm" icon={<Volume2 size={16} aria-hidden="true" />} onClick={() => speak(line)}>
                استمع مرة أخرى
              </Button>
              <Button size="sm" onClick={() => goTo(step + 1)}>
                حان دوري
              </Button>
            </div>
          </div>
        </Card>
      ) : null}

      {line && mine ? (
        <Card tone="brand">
          <div className="space-y-4 p-5" dir="rtl">
            <p className="text-sm font-semibold text-ink-muted">دورك — قل بالألمانية:</p>
            <p lang="ar" className="text-xl font-semibold text-ink">
              {line.ar}
            </p>

            {!result ? (
              <>
                <input
                  ref={inputRef}
                  type="text"
                  value={typed}
                  onChange={(event) => setTyped(event.target.value)}
                  onKeyDown={(event) => event.key === 'Enter' && check()}
                  dir="ltr"
                  lang="de"
                  aria-label="اكتب الجملة بالألمانية"
                  className="h-12 w-full rounded-md border-2 border-border-strong bg-surface px-3 text-lg outline-none focus-visible:border-accent"
                />
                <SpecialCharsBar onInsert={insert} />
                {hinted ? (
                  <p dir="ltr" lang="de" className="text-sm text-ink-muted">
                    تلميح: <span className="font-semibold text-ink">{hintOf(line.de)}</span>
                  </p>
                ) : null}
                <div className="flex flex-wrap items-center gap-3">
                  <Button onClick={check} disabled={!typed.trim()} icon={<Check size={16} aria-hidden="true" />}>
                    تحقّق
                  </Button>
                  {recognition.isSupported ? (
                    recognition.phase === 'listening' ? (
                      <Button variant="secondary" onClick={recognition.cancel} icon={<Square size={16} aria-hidden="true" />}>
                        إيقاف
                      </Button>
                    ) : (
                      <Button variant="outline" onClick={speakAnswer} icon={<Mic size={16} aria-hidden="true" />}>
                        قلها بصوتك
                      </Button>
                    )
                  ) : null}
                  {!hinted ? (
                    <Button variant="ghost" onClick={() => setHinted(true)} icon={<Lightbulb size={16} aria-hidden="true" />}>
                      تلميح
                    </Button>
                  ) : null}
                </div>
                <p role="status" className="text-sm text-ink-muted">
                  {recognition.phase === 'listening' ? 'أستمع إليك الآن…' : ''}
                </p>
                {recognition.error && RECOGNITION_ERROR_AR[recognition.error] ? (
                  <p role="alert" className="rounded-md border border-error/40 bg-error-muted p-3 text-sm leading-7 text-error">
                    {RECOGNITION_ERROR_AR[recognition.error]}
                  </p>
                ) : null}
              </>
            ) : (
              <div className="space-y-3">
                <p className="font-semibold text-ink">
                  {verdict ? VERDICT_AR[verdict] : ''} <span className="tnum text-ink-muted">({Math.round(result.comparison.score * 100)}٪)</span>
                </p>
                <WordComparison comparison={result.comparison} missingLabel="غائبة" />
                <p dir="ltr" lang="de" className="text-sm text-ink-muted">
                  إجابتك: <span className="text-ink">{result.typed || '—'}</span>
                </p>
                <p dir="ltr" lang="de" className="text-sm text-ink-muted">
                  الجملة الصحيحة: <span className="font-semibold text-success">{line.de}</span>
                </p>
                <div className="flex flex-wrap items-center gap-3">
                  <Button variant="outline" size="sm" icon={<Volume2 size={16} aria-hidden="true" />} onClick={() => speak(line)}>
                    استمع
                  </Button>
                  <Button size="sm" onClick={() => goTo(step + 1)} icon={<ArrowLeft size={16} aria-hidden="true" />}>
                    {step + 1 >= lines.length ? 'أنهِ المحادثة' : 'التالي'}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </Card>
      ) : null}

      {finished ? (
        <Card tone="brand">
          <div dir="rtl" className="space-y-4 p-5 sm:p-6">
            <h2 className="font-sans text-2xl font-bold text-ink">أنهيت المحادثة</h2>
            <p className="text-ink">
              أجبت عن <span className="tnum font-semibold">{summary.answered}</span> من <span className="tnum font-semibold">{summary.total}</span> جملة من دورك:{' '}
              <span className="tnum font-semibold">{summary.perfect}</span> منها بلا أي خطأ، ومتوسط الدقة{' '}
              <span className="tnum font-semibold">{Math.round(summary.average * 100)}٪</span>.
            </p>
            {results.some((entry) => !isPerfect(entry.comparison)) ? (
              <div className="space-y-2">
                <p className="font-semibold text-ink">جمل تستحق إعادة:</p>
                <ul dir="ltr" className="space-y-1.5">
                  {results
                    .filter((entry) => !isPerfect(entry.comparison))
                    .sort((a, b) => a.index - b.index)
                    .map((entry) => (
                      <li key={entry.index} lang="de" className="display-de rounded-md bg-surface-sunken px-3 py-2 text-base text-ink">
                        {lines[entry.index].de}
                      </li>
                    ))}
                </ul>
              </div>
            ) : null}
            <div className="flex flex-wrap items-center gap-3">
              <Button onClick={() => restart()} icon={<RotateCcw size={16} aria-hidden="true" />}>
                أعد المحاولة
              </Button>
              {partner ? (
                <Button variant="outline" onClick={() => restart(partner.speaker)}>
                  العب دور {partner.name}
                </Button>
              ) : null}
              <Link to={backTo} className="inline-flex h-11 items-center rounded-md px-3 font-semibold text-accent underline-offset-4 hover:underline">
                العودة إلى المحادثة
              </Link>
            </div>
          </div>
        </Card>
      ) : null}
    </div>
  )
}
