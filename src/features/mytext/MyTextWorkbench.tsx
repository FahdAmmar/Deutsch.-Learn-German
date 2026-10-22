import { Play } from 'lucide-react'
import { useId, useMemo, useState } from 'react'

import { Button } from '@/components/ui'
import { cn } from '@/lib/cn'
import { DEFAULT_PHRASE_WORDS, MAX_PHRASE_WORDS, MAX_SAVED_TEXTS, MAX_TEXT_CHARS, MIN_PHRASE_WORDS } from '@/lib/myText/limits'
import { splitText } from '@/lib/myText/split'
import { cleanText, validateMyTextInput } from '@/lib/myText/validate'
import { useMyTextStore } from '@/store/myTextStore'
import type { MyText, SplitMode } from '@/types'

import { ChunkPreview } from './ChunkPreview'
import { SAMPLE_TEXT, SAMPLE_TITLE } from './sampleText'

const MODES: readonly { value: SplitMode; label: string; hint: string }[] = [
  { value: 'phrases', label: 'عبارات قصيرة', hint: 'الأنسب للحفظ' },
  { value: 'sentences', label: 'جملة جملة', hint: 'كل جملة مقطع' },
  { value: 'lines', label: 'سطرًا سطرًا', hint: 'كما قسّمتَه أنت' },
]

const fieldClass =
  'w-full rounded-lg border bg-surface px-4 text-ink placeholder:text-ink-faint transition-colors focus-visible:border-primary focus-visible:outline-none'

interface MyTextWorkbenchProps {
  /** The saved text being edited; `null` for a new one. Give the component a new `key` to load another. */
  editing: MyText | null
  onCancelEdit: () => void
  /** The text was saved; `startNow` is true when the learner chose to go straight to the dictation. */
  onSaved: (id: string, startNow: boolean) => void
}

/**
 * Where the learner enters a text and chooses how to cut it. The parts are
 * recomputed on every keystroke and shown next to the editor, so the effect
 * of each choice is visible before anything is saved.
 */
export function MyTextWorkbench({ editing, onCancelEdit, onSaved }: MyTextWorkbenchProps) {
  const addText = useMyTextStore((store) => store.addText)
  const updateText = useMyTextStore((store) => store.updateText)

  const [title, setTitle] = useState(editing?.title ?? '')
  const [text, setText] = useState(editing?.text ?? '')
  const [mode, setMode] = useState<SplitMode>(editing?.mode ?? 'phrases')
  const [maxWords, setMaxWords] = useState(editing?.maxWords ?? DEFAULT_PHRASE_WORDS)
  const [errors, setErrors] = useState<{ title?: string; text?: string; form?: string }>({})

  const ids = { title: useId(), text: useId(), words: useId() }

  const chunks = useMemo(() => splitText(cleanText(text), mode, maxWords), [text, mode, maxWords])
  const overLimit = text.length > MAX_TEXT_CHARS

  const save = (startNow: boolean) => {
    const result = validateMyTextInput({ title, text })
    if (!result.ok) {
      setErrors(result.errors)
      return
    }
    const draft = { ...result.value, mode, maxWords }
    if (editing) {
      updateText(editing.id, draft)
      onSaved(editing.id, startNow)
      return
    }
    const created = addText(draft)
    if (!created) {
      setErrors({ form: `وصلت إلى الحد الأقصى (${MAX_SAVED_TEXTS} نصًا). احذف نصًا من قائمتك لتضيف غيره.` })
      return
    }
    onSaved(created.id, startNow)
  }

  return (
    <div id="my-text-editor" className="grid items-start gap-6 lg:grid-cols-2">
      <form
        dir="rtl"
        noValidate
        onSubmit={(event) => {
          event.preventDefault()
          save(true)
        }}
        className="min-w-0 space-y-5 rounded-xl border border-border bg-surface p-5 sm:p-6"
      >
        <h2 className="text-xl font-bold text-ink">{editing ? 'تعديل النص' : 'أضف نصًا جديدًا'}</h2>

        <div className="space-y-1.5">
          <label htmlFor={ids.title} className="text-sm font-semibold text-ink">
            العنوان <span className="font-normal text-ink-faint">(اختياري)</span>
          </label>
          <input
            id={ids.title}
            type="text"
            dir="auto"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            aria-invalid={errors.title !== undefined}
            aria-describedby={errors.title ? `${ids.title}-error` : undefined}
            className={cn(fieldClass, 'h-11', errors.title ? 'border-error' : 'border-border-strong')}
          />
          {errors.title ? (
            <p id={`${ids.title}-error`} role="alert" className="text-sm text-error">
              {errors.title}
            </p>
          ) : null}
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between gap-3">
            <label htmlFor={ids.text} className="text-sm font-semibold text-ink">
              النص الألماني
            </label>
            {!editing && text.trim() === '' ? (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setTitle(SAMPLE_TITLE)
                  setText(SAMPLE_TEXT)
                  setErrors({})
                }}
              >
                جرّب نصًا جاهزًا
              </Button>
            ) : null}
          </div>
          <textarea
            id={ids.text}
            lang="de"
            dir="ltr"
            rows={9}
            spellCheck={false}
            value={text}
            onChange={(event) => setText(event.target.value)}
            placeholder="Schreibe oder füge hier deinen Text ein …"
            aria-invalid={errors.text !== undefined || overLimit}
            aria-describedby={errors.text ? `${ids.text}-error` : `${ids.text}-count`}
            className={cn(fieldClass, 'resize-y py-3 text-base leading-7', errors.text || overLimit ? 'border-error' : 'border-border-strong')}
          />
          <div className="flex items-start justify-between gap-3">
            {errors.text ? (
              <p id={`${ids.text}-error`} role="alert" className="text-sm text-error">
                {errors.text}
              </p>
            ) : (
              <span />
            )}
            <p id={`${ids.text}-count`} dir="ltr" className={cn('tnum shrink-0 text-xs', overLimit ? 'font-semibold text-error' : 'text-ink-faint')}>
              {text.length} / {MAX_TEXT_CHARS}
            </p>
          </div>
        </div>

        <fieldset className="space-y-2">
          <legend className="text-sm font-semibold text-ink">طريقة التقسيم</legend>
          <div className="grid grid-cols-3 gap-2">
            {MODES.map((option) => (
              <label key={option.value} className="block cursor-pointer">
                <input
                  type="radio"
                  name="my-text-split-mode"
                  value={option.value}
                  checked={mode === option.value}
                  onChange={() => setMode(option.value)}
                  className="peer sr-only"
                />
                <span className="flex h-full flex-col gap-0.5 rounded-lg border border-border bg-surface p-3 text-center transition-colors peer-checked:border-accent peer-checked:bg-accent-muted peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-primary hover:border-border-strong">
                  <span className="text-sm font-semibold text-ink">{option.label}</span>
                  <span className="text-xs text-ink-muted">{option.hint}</span>
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        {mode === 'phrases' ? (
          <div className="space-y-2">
            <label htmlFor={ids.words} className="flex items-center justify-between gap-3 text-sm font-semibold text-ink">
              <span>أطول مقطع</span>
              <span className="tnum text-accent">{maxWords} كلمات</span>
            </label>
            <input
              id={ids.words}
              type="range"
              min={MIN_PHRASE_WORDS}
              max={MAX_PHRASE_WORDS}
              step={1}
              value={maxWords}
              onChange={(event) => setMaxWords(Number(event.target.value))}
              aria-valuetext={`${maxWords} كلمات`}
              className="w-full accent-accent"
            />
            <p className="text-xs text-ink-muted">كلما قلّ العدد صارت المقاطع أقصر وأسهل في الحفظ.</p>
          </div>
        ) : null}

        {errors.form ? (
          <p role="alert" className="rounded-md bg-error-muted px-3 py-2 text-sm text-error">
            {errors.form}
          </p>
        ) : null}

        <div className="flex flex-wrap items-center gap-3">
          <Button onClick={() => save(true)} icon={<Play size={18} aria-hidden="true" />}>
            احفظ وابدأ الإملاء
          </Button>
          <Button variant="outline" onClick={() => save(false)}>
            احفظ فقط
          </Button>
          {editing ? (
            <Button variant="ghost" onClick={onCancelEdit}>
              إلغاء التعديل
            </Button>
          ) : null}
        </div>
      </form>

      <ChunkPreview chunks={chunks} />
    </div>
  )
}
