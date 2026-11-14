import { Check, Mic, MicOff, Volume2, X } from 'lucide-react'
import { useState } from 'react'

import { Button, Card } from '@/components/ui'
import { useSpeech } from '@/hooks/useSpeech'
import { useSpeechRecognition } from '@/hooks/useSpeechRecognition'
import { checkSpeaking, type SpeakingCheck } from '@/lib/speakingCheck'
import { GERMAN_LOCALE } from '@/services/speech'
import type { SpeakingTask } from '@/types'

interface SpeakingWorkbenchProps {
  task: SpeakingTask
}

const ERROR_MESSAGES: Record<string, string> = {
  'not-allowed': 'لم يُسمح باستعمال الميكروفون. يمكنك أن تكتب ما قلته في الصندوق.',
  'no-speech': 'لم نسمع شيئاً. حاول مرة أخرى أو اكتب ما قلته.',
}

/** The cue card of a task: what the learner has to cover, shown while they prepare. */
function TaskCard({ task }: { task: SpeakingTask }) {
  if (task.kind === 'talk') {
    return (
      <ul dir="ltr" lang="de" className="flex flex-wrap gap-2">
        {task.cues.map((cue) => (
          <li key={cue.cueDe} className="display-de rounded-md border border-border bg-surface-sunken px-3 py-1.5 font-semibold text-ink">
            {cue.cueDe}
          </li>
        ))}
      </ul>
    )
  }
  if (task.kind === 'question') {
    return (
      <p dir="ltr" lang="de" className="display-de text-2xl font-bold text-ink">
        {task.topicDe} <span className="text-ink-faint">–</span> {task.questionWord}?
      </p>
    )
  }
  return (
    <div className="space-y-1">
      <p dir="rtl" className="text-ink">
        {task.situationAr}
      </p>
      <p dir="ltr" lang="de" className="display-de text-2xl font-bold text-ink">
        {task.cueDe}
      </p>
    </div>
  )
}

function CheckList({ check }: { check: SpeakingCheck }) {
  return (
    <div dir="rtl" className="space-y-3" role="status">
      <p className="font-sans text-lg font-bold text-ink">
        {check.ok ? 'وجدنا كل ما طُلب. أحسنت!' : `وجدنا ${check.passed} من ${check.items.length}. قارن مع النموذج وجرّب مرة أخرى.`}
      </p>
      <ul className="space-y-1.5">
        {check.items.map((item) => (
          <li key={item.labelAr} className="flex items-center gap-2 text-ink">
            {item.ok ? (
              <Check size={16} strokeWidth={2.8} className="shrink-0 text-success" aria-hidden="true" />
            ) : (
              <X size={16} strokeWidth={2.8} className="shrink-0 text-error" aria-hidden="true" />
            )}
            <span>
              {item.labelAr}
              <span className="sr-only">{item.ok ? ': وُجد' : ': لم يُوجد'}</span>
            </span>
          </li>
        ))}
      </ul>
      <p className="text-sm leading-7 text-ink-muted">
        الفحص يبحث عن النقاط المطلوبة فقط، فقد يفوته جواب صحيح بصياغة أخرى، وقد يخطئ التعرّف على الصوت. اعتبره تلميحاً لا درجة.
      </p>
    </div>
  )
}

/**
 * One speaking task: read the card, speak (or type what you said), then check against what the task asks and
 * compare with a model you can also listen to. Nothing is stored: it is practice, and the results live as long as
 * the page. Speech recognition is the browser's, so typing is always available instead.
 */
export function SpeakingWorkbench({ task }: SpeakingWorkbenchProps) {
  const recognition = useSpeechRecognition()
  const speech = useSpeech()
  const [text, setText] = useState('')
  const [check, setCheck] = useState<SpeakingCheck | null>(null)
  const [showModel, setShowModel] = useState(false)

  async function listen() {
    speech.stop?.()
    const result = await recognition.start()
    if (!result) return
    setText((current) => (current.trim() === '' ? result.transcript : `${current.trim()} ${result.transcript}`))
    setCheck(null)
  }

  const modelText = task.model.map((line) => line.de).join(' ')

  return (
    <div className="space-y-6">
      <Card className="space-y-4 p-5">
        <p dir="rtl" className="leading-8 text-ink">
          {task.promptAr}
        </p>
        <TaskCard task={task} />
      </Card>

      <Card className="space-y-4 p-5">
        <div dir="rtl" className="flex flex-wrap items-center gap-3">
          {recognition.isSupported ? (
            recognition.phase === 'listening' ? (
              <Button variant="danger" icon={<MicOff size={18} aria-hidden="true" />} onClick={recognition.cancel}>
                أوقف الاستماع
              </Button>
            ) : (
              <Button variant="primary" icon={<Mic size={18} aria-hidden="true" />} onClick={listen}>
                تحدّث الآن
              </Button>
            )
          ) : (
            <p role="note" className="text-sm leading-7 text-ink-muted">
              متصفحك لا يدعم التعرّف على الكلام (جرّب Chrome أو Edge). اكتب ما كنت ستقوله في الصندوق.
            </p>
          )}
          {recognition.phase === 'listening' ? <span className="text-sm font-semibold text-primary">نستمع إليك…</span> : null}
          {recognition.phase === 'error' && recognition.error ? (
            <span role="alert" className="text-sm text-error">
              {ERROR_MESSAGES[recognition.error] ?? 'تعذّر التعرّف على الكلام. يمكنك أن تكتب ما قلته.'}
            </span>
          ) : null}
        </div>

        <div className="space-y-2">
          <label htmlFor="speaking-text" dir="rtl" className="block font-semibold text-ink">
            ما قلته (يمكنك تعديله أو كتابته)
          </label>
          <textarea
            id="speaking-text"
            dir="ltr"
            lang="de"
            rows={4}
            value={text}
            onChange={(event) => {
              setText(event.target.value)
              setCheck(null)
            }}
            className="display-de w-full rounded-md border border-border-strong bg-surface p-3 text-lg text-ink focus-visible:outline-2 focus-visible:outline-primary"
          />
        </div>

        <div dir="rtl" className="flex flex-wrap gap-3">
          <Button variant="primary" disabled={text.trim() === ''} onClick={() => setCheck(checkSpeaking(task, text))}>
            تحقّق
          </Button>
          <Button variant="outline" onClick={() => setShowModel((value) => !value)} aria-expanded={showModel}>
            {showModel ? 'أخفِ النموذج' : 'اعرض النموذج'}
          </Button>
        </div>

        {check ? <CheckList check={check} /> : null}
      </Card>

      {showModel ? (
        <Card tone="tint" className="space-y-3 p-5">
          <div dir="rtl" className="flex items-center justify-between gap-3">
            <h2 className="font-sans text-lg font-bold text-ink">نموذج للمقارنة</h2>
            <Button
              variant="outline"
              size="sm"
              disabled={!speech.isSupported}
              icon={<Volume2 size={16} aria-hidden="true" />}
              onClick={() => speech.speak(modelText, GERMAN_LOCALE)}
            >
              استمع
            </Button>
          </div>
          <ul className="space-y-3">
            {task.model.map((line) => (
              <li key={line.de} className="space-y-0.5">
                <p dir="ltr" lang="de" className="display-de text-lg font-semibold text-ink">
                  {line.de}
                </p>
                <p dir="rtl" className="text-ink-muted">
                  {line.ar}
                </p>
              </li>
            ))}
          </ul>
        </Card>
      ) : null}
    </div>
  )
}
