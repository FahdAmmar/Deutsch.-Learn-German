import { CheckCheck, Eye, EyeOff, ListChecks, RotateCcw, Volume2 } from 'lucide-react'
import { useEffect, useId, useMemo, useRef, useState } from 'react'

import { Badge, Button, SpecialCharsBar } from '@/components/ui'
import { GermanWord } from '@/features/pronunciation/GermanWord'
import { useInsertAtCaret } from '@/hooks/useInsertAtCaret'
import { useSpeech } from '@/hooks/useSpeech'
import { cn } from '@/lib/cn'
import { checkWriting, countWords } from '@/lib/writing/check'
import { MAX_WRITING_CHARS } from '@/lib/writing/draftSchema'
import { useWritingStore } from '@/store/writingStore'
import type { WritingTask } from '@/types'

import { WritingCheckPanel } from './WritingCheckPanel'

const SAVE_DELAY_MS = 600
const NO_POINTS: readonly string[] = []

interface WritingWorkbenchProps {
  task: WritingTask
}

/** The writing screen of one task: the situation, the points, the editor, the check and the model answer. */
export function WritingWorkbench({ task }: WritingWorkbenchProps) {
  const draft = useWritingStore((state) => state.drafts[task.id])
  const saveText = useWritingStore((state) => state.saveText)
  const setCompleted = useWritingStore((state) => state.setCompleted)
  const togglePoint = useWritingStore((state) => state.togglePoint)
  const clearDraft = useWritingStore((state) => state.clearDraft)

  const [text, setText] = useState(draft?.text ?? '')
  const [checked, setChecked] = useState(false)
  const [showModel, setShowModel] = useState(false)
  const { ref: textRef, insert } = useInsertAtCaret<HTMLTextAreaElement>(text, setText)
  const speech = useSpeech()
  const fieldId = useId()

  // Typing is saved after a short pause, and once more when the learner leaves, so nothing is lost.
  const latest = useRef(text)
  useEffect(() => {
    latest.current = text
  })
  const savedText = useRef(draft?.text ?? '')
  useEffect(() => {
    if (text === savedText.current) return
    const timer = window.setTimeout(() => {
      saveText(task.id, text)
      savedText.current = text
    }, SAVE_DELAY_MS)
    return () => window.clearTimeout(timer)
  }, [text, saveText, task.id])
  useEffect(
    () => () => {
      if (latest.current !== savedText.current) saveText(task.id, latest.current)
    },
    [saveText, task.id],
  )

  const confirmedPointIds = draft?.confirmedPointIds ?? NO_POINTS
  const check = useMemo(() => checkWriting(task, text, confirmedPointIds), [task, text, confirmedPointIds])
  const words = countWords(text)
  const completed = draft?.completed ?? false

  function restart() {
    clearDraft(task.id)
    savedText.current = ''
    setText('')
    setChecked(false)
    setShowModel(false)
  }

  return (
    <div className="space-y-6">
      <section aria-labelledby="writing-situation" className="space-y-4 rounded-lg border border-primary/25 bg-primary-muted p-4 sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 id="writing-situation" dir="rtl" className="font-sans text-lg font-bold text-ink">
            المطلوب
          </h2>
          <Badge tone={task.register === 'formal' ? 'plum' : 'accent'}>{task.register === 'formal' ? 'رسمي: Sie' : 'ودّي: du'}</Badge>
        </div>
        <p lang="de" dir="ltr" className="display-de text-start text-lg leading-8 text-ink">
          {task.situationDe}
        </p>
        <p dir="rtl" className="leading-8 text-ink-muted">
          {task.situationAr}
        </p>
        <div dir="rtl" className="space-y-2">
          <h3 className="text-sm font-bold text-ink">اكتب عن هذه النقاط كلها:</h3>
          <ul className="space-y-2">
            {task.points.map((point) => (
              <li key={point.id} className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span lang="de" dir="ltr" className="display-de rounded-sm bg-surface px-2 py-0.5 text-sm font-semibold text-ink">
                  {point.promptDe}
                </span>
                <span className="text-ink-muted">{point.textAr}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <details className="rounded-lg border border-border bg-surface">
        <summary className="flex min-h-12 cursor-pointer items-center gap-2 rounded-lg px-4 py-3 font-sans font-bold text-ink hover:bg-surface-sunken">
          <ListChecks size={18} className="text-ink-faint" aria-hidden="true" />
          <span dir="rtl">جمل تساعدك (اضغط على أي جملة لتسمعها)</span>
        </summary>
        <ul className="grid gap-3 border-t border-border p-4 md:grid-cols-2">
          {task.usefulPhrases.map((phrase) => (
            <li key={phrase.de} className="space-y-1">
              <GermanWord word={phrase.de} />
              <p dir="rtl" className="text-sm text-ink-muted">
                {phrase.ar}
              </p>
            </li>
          ))}
        </ul>
      </details>

      <section className="space-y-3">
        <label htmlFor={fieldId} dir="rtl" className="block font-sans text-lg font-bold text-ink">
          نصّك بالألمانية
        </label>
        <textarea
          id={fieldId}
          ref={textRef}
          value={text}
          onChange={(event) => setText(event.target.value.slice(0, MAX_WRITING_CHARS))}
          lang="de"
          dir="ltr"
          rows={9}
          spellCheck={false}
          autoCapitalize="sentences"
          placeholder={task.register === 'formal' ? 'Sehr geehrte …,' : 'Hallo …,'}
          aria-describedby={`${fieldId}-count`}
          className="display-de w-full resize-y rounded-md border border-border-strong bg-surface px-4 py-3 text-start text-base leading-8 text-ink placeholder:text-ink-faint"
        />
        <SpecialCharsBar onInsert={insert} />
        <p id={`${fieldId}-count`} dir="rtl" className={cn('tnum text-sm', words >= task.minWords ? 'font-semibold text-success' : 'text-ink-muted')}>
          {words} كلمة، والمقترح {task.minWords} على الأقل. يُحفظ نصّك على هذا الجهاز تلقائياً.
        </p>

        <div dir="rtl" className="flex flex-wrap gap-3">
          <Button onClick={() => setChecked(true)} disabled={words === 0} icon={<ListChecks size={18} aria-hidden="true" />}>
            افحص نصّي
          </Button>
          <Button
            variant="outline"
            onClick={() => setShowModel((current) => !current)}
            aria-expanded={showModel}
            icon={showModel ? <EyeOff size={18} aria-hidden="true" /> : <Eye size={18} aria-hidden="true" />}
          >
            {showModel ? 'أخفِ النموذج' : 'أظهر النموذج'}
          </Button>
          <Button
            variant={completed ? 'secondary' : 'outline'}
            onClick={() => setCompleted(task.id, !completed)}
            disabled={words === 0}
            aria-pressed={completed}
            icon={<CheckCheck size={18} aria-hidden="true" />}
          >
            {completed ? 'أنجزتُها (اضغط للتراجع)' : 'علّمها منجَزة'}
          </Button>
          <Button variant="ghost" onClick={restart} disabled={words === 0 && !draft} icon={<RotateCcw size={18} aria-hidden="true" />}>
            ابدأ من جديد
          </Button>
        </div>
      </section>

      {checked && words > 0 ? (
        <WritingCheckPanel task={task} check={check} onTogglePoint={(pointId) => togglePoint(task.id, pointId)} />
      ) : null}

      {showModel ? (
        <section aria-labelledby="writing-model" className="space-y-4 rounded-lg border border-border bg-surface p-4 sm:p-5">
          <div dir="rtl" className="flex flex-wrap items-center justify-between gap-2">
            <h2 id="writing-model" className="font-sans text-lg font-bold text-ink">
              نموذج جواب
            </h2>
            <Button
              variant="outline"
              size="sm"
              onClick={() => (speech.isSpeaking ? speech.stop() : speech.speak(task.modelAnswer.replace(/\n+/g, ' ')))}
              disabled={!speech.isSupported}
              icon={<Volume2 size={16} aria-hidden="true" />}
            >
              {speech.isSpeaking ? 'أوقف' : 'استمع إلى النموذج'}
            </Button>
          </div>
          <p lang="de" dir="ltr" className="display-de text-start text-lg leading-9 whitespace-pre-line text-ink">
            {task.modelAnswer}
          </p>
          <p dir="rtl" className="leading-8 text-ink-muted">
            {task.modelAnswerAr}
          </p>
          <p dir="rtl" className="text-sm leading-7 text-ink-faint">
            هذا جواب واحد من أجوبة صحيحة كثيرة. لا تنسخه، وإنما قارن: كم نقطة غطّيتَ؟ وما الجمل التي تستطيع استعمالها في نصّك المرة القادمة؟
          </p>
        </section>
      ) : null}
    </div>
  )
}
