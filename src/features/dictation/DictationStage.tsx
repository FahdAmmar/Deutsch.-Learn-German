import { ArrowLeft, Headphones, Keyboard, Rabbit, Turtle, Volume2 } from 'lucide-react'
import { useCallback, useEffect, useMemo, useRef, useState, type ChangeEvent, type CompositionEvent, type KeyboardEvent, type ReactNode } from 'react'

import { ProgressBar, Switch } from '@/components/ui'
import { formatSpeed, nextSpeed } from '@/features/stories/speedPresets'
import { useDictation } from '@/hooks/useDictation'
import { isArabicScript } from '@/lib/dictation/engine'
import type { RunStats } from '@/lib/dictation/session'
import { countByKind, type SpellingKindCount } from '@/lib/dictation/spelling'
import { planFor } from '@/lib/dictation/stages'
import { useSettingsStore } from '@/store/settingsStore'
import { useSpellingStore } from '@/store/spellingStore'
import type { DictationSource, FinishedDictationRun, PracticeStage } from '@/types'

import { ChunkRail, MAX_RAIL_PARTS } from './ChunkRail'
import { formatPercent } from './format'
import { SpecialCharsBar } from './SpecialCharsBar'
import { TypingLine } from './TypingLine'

/** What a text is called on screen: the lines of a story are sentences, the parts of the learner's own text are parts. */
export type DictationUnit = 'sentence' | 'part'

const UNIT_WORDS: Record<DictationUnit, { name: string; current: string; correct: string; inputLabel: string }> = {
  sentence: { name: 'الجملة', current: 'الجملة الحالية', correct: 'أحسنت، الجملة صحيحة.', inputLabel: 'اكتب الجملة التي تسمعها' },
  part: { name: 'المقطع', current: 'المقطع الحالي', correct: 'أحسنت، المقطع صحيح.', inputLabel: 'اكتب المقطع الذي تسمعه' },
}

/** How many finished parts stay visible above the one being typed, as context. */
const TRAIL_PARTS = 2

export interface DictationEndContext {
  stats: RunStats
  mistakes: { char: string; count: number }[]
  /** The mistakes of this run grouped by the spelling pattern they belong to, most frequent first. */
  spelling: SpellingKindCount[]
  restart: () => void
}

interface DictationStageProps {
  source: DictationSource
  /** How much help the learner gets; copying the text by default. A different stage is a different dictation: remount with a new key. */
  stage?: PracticeStage
  /** Called once when the last part is typed; the owner of the text saves the result. */
  onFinished: (run: FinishedDictationRun) => void
  /** Title, back link and badges — whatever frames this text. */
  header: ReactNode
  /** The end-of-run screen, shown in place of the typing card. */
  renderEnd: (context: DictationEndContext) => ReactNode
  /** Who is speaking at a given part (conversations only). */
  speakerAt?: (index: number) => string | undefined
  unit?: DictationUnit
}

/**
 * Letter-by-letter dictation of any text: each part is read aloud and typed
 * one letter at a time, with a sound and a flash for every right or wrong
 * letter. A hidden text field receives the keystrokes, so a phone's keyboard
 * opens as soon as the learner taps to start.
 */
export function DictationStage({ source, stage = 'copy', onFinished, header, renderEnd, speakerAt, unit = 'sentence' }: DictationStageProps) {
  const recordSlips = useSpellingStore((store) => store.recordSlips)
  // Every text, whoever owns it, feeds the same record of the learner's spelling weak spots.
  const handleFinished = useCallback(
    (run: FinishedDictationRun) => {
      recordSlips(run.slips ?? [])
      onFinished(run)
    },
    [recordSlips, onFinished],
  )
  const plan = planFor(stage)
  const dictation = useDictation(source, handleFinished, { given: plan.given, autoSpeak: plan.autoSpeak })
  const { state, segment, total, stats } = dictation
  const { phase, engine } = state
  const words = UNIT_WORDS[unit]

  const settings = useSettingsStore((store) => store.settings)
  const setShowTranslations = useSettingsStore((store) => store.setShowTranslations)
  const setHideText = useSettingsStore((store) => store.setDictationHideText)
  const setAcceptTransliteration = useSettingsStore((store) => store.setDictationAcceptTransliteration)
  const setSoundEffects = useSettingsStore((store) => store.setSoundEffects)
  const setSpeechRate = useSettingsStore((store) => store.setSpeechRate)
  const showTranslations = settings.showTranslations ?? true
  // The learner's own setting hides the text too; a stage can hide it for them, never the other way round.
  const hideText = settings.dictationHideText || plan.reveal !== 'text'
  const hasTranslations = useMemo(() => source.segments.some((part) => part.ar), [source.segments])

  const inputRef = useRef<HTMLInputElement>(null)
  const [focused, setFocused] = useState(false)
  const [arabicKeyboard, setArabicKeyboard] = useState(false)

  const { press, replay, start, clearPending } = dictation

  const handleChar = useCallback(
    (char: string) => {
      setArabicKeyboard(isArabicScript(char))
      press(char)
    },
    [press],
  )

  const handleStart = () => {
    // Focus inside the tap itself: that is what lets a phone open its keyboard.
    inputRef.current?.focus()
    start()
  }

  // Keystrokes arrive through a field we empty after reading, so it never fills up. During an IME
  // composition (dead keys, some phone keyboards) wait for the committed text instead.
  const flush = (input: HTMLInputElement) => {
    for (const char of Array.from(input.value)) handleChar(char)
    input.value = ''
  }
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if ((event.nativeEvent as InputEvent).isComposing) return
    flush(event.currentTarget)
  }
  const handleCompositionEnd = (event: CompositionEvent<HTMLInputElement>) => flush(event.currentTarget)
  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Backspace') clearPending()
  }

  // Ctrl/⌘ + Enter replays the part, whichever element has focus.
  useEffect(() => {
    if (phase !== 'typing') return
    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Enter' && (event.ctrlKey || event.metaKey)) {
        event.preventDefault()
        replay()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [phase, replay])

  const speakerName = speakerAt?.(state.index)
  const statusMessage = state.sentenceDone ? words.correct : engine.lastError ? 'حرف خاطئ، حاول مرة أخرى.' : ''
  const progress = (state.index + (state.sentenceDone ? 1 : 0)) / total
  const trail = source.segments.slice(Math.max(0, state.index - TRAIL_PARTS), state.index)
  const SpeedIcon = settings.speechRate > 1 ? Rabbit : Turtle

  return (
    <div dir="ltr" className="mx-auto w-full max-w-3xl space-y-5 pb-4">
      {header}

      {phase !== 'finished' ? (
        <div className="space-y-2.5">
          <div dir="rtl" className="flex items-center justify-between gap-3 text-sm text-ink-muted">
            <span>
              {words.name} <span className="tnum font-semibold text-ink">{Math.min(state.index + 1, total)}</span> من <span className="tnum">{total}</span>
            </span>
            {phase === 'typing' ? (
              <span>
                متبقٍّ نحو <span className="tnum font-semibold text-ink">{dictation.minutesLeft}</span> د
              </span>
            ) : null}
          </div>
          {total <= MAX_RAIL_PARTS ? (
            <ChunkRail total={total} current={state.index} currentDone={state.sentenceDone} />
          ) : (
            <ProgressBar value={progress} label="تقدّم الإملاء" tone="accent" size="sm" />
          )}
        </div>
      ) : null}

      <div className="relative">
        {/* Receives every keystroke. Invisible but real: focusable, labelled, and covering the card so a tap anywhere opens the keyboard. */}
        {phase !== 'finished' ? (
          <input
            ref={inputRef}
            type="text"
            defaultValue=""
            onChange={handleChange}
            onCompositionEnd={handleCompositionEnd}
            onKeyDown={handleKeyDown}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            onPaste={(event) => event.preventDefault()}
            lang="de"
            autoCapitalize="off"
            autoCorrect="off"
            autoComplete="off"
            spellCheck={false}
            enterKeyHint="next"
            aria-label={words.inputLabel}
            className="absolute inset-0 z-0 size-full cursor-text rounded-xl opacity-0"
          />
        ) : null}

        {phase === 'intro' ? (
          <IntroPanel onStart={handleStart} />
        ) : phase === 'typing' ? (
          <section
            aria-label={words.current}
            className="pointer-events-none relative z-10 space-y-5 rounded-xl border border-border bg-surface p-5 sm:p-8"
          >
            {speakerName ? <p className="text-sm font-semibold text-ink-muted">{speakerName}</p> : null}

            {/* What was typed just before, so the text is seen assembling. Already heard and typed, so hidden from screen readers. */}
            {trail.length > 0 ? (
              <p aria-hidden="true" dir="ltr" lang="de" className="display-de line-clamp-2 text-start text-base leading-7 font-medium text-ink-faint">
                {trail.map((part) => part.text).join(' ')}
              </p>
            ) : null}

            <div className="min-h-24">
              {!hideText ? <span className="sr-only" lang="de">{segment.text}</span> : null}
              <div aria-hidden="true">
                <TypingLine
                  engine={engine}
                  hideText={hideText}
                  initialsOnly={plan.reveal === 'initials'}
                  showHint={dictation.showHint}
                  done={state.sentenceDone}
                />
              </div>
            </div>

            {showTranslations && segment.ar ? (
              <p dir="rtl" className="border-s-2 border-border-strong ps-3 text-[1.02rem] leading-8 text-ink-muted">
                {segment.ar}
              </p>
            ) : null}

            <div dir="rtl" className="flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4 text-sm text-ink-muted">
              <span className="tnum flex items-center gap-3">
                <span>
                  <span className="font-semibold text-ink">{stats.wpm}</span> WPM
                </span>
                <span>
                  دقة <span className="font-semibold text-ink">{formatPercent(stats.accuracy)}</span>
                </span>
              </span>
              {!focused ? (
                <span className="flex items-center gap-1.5 text-accent">
                  <Keyboard size={15} aria-hidden="true" />
                  اضغط لفتح لوحة المفاتيح
                </span>
              ) : null}
            </div>

            <p role="status" className="sr-only">
              {statusMessage}
            </p>
          </section>
        ) : (
          renderEnd({ stats, mistakes: dictation.mistakes, spelling: countByKind(state.slips), restart: dictation.restart })
        )}
      </div>

      {phase === 'typing' ? (
        <div className="space-y-4">
          {arabicKeyboard ? (
            <p dir="rtl" role="alert" className="rounded-md bg-error-muted px-3 py-2 text-center text-sm text-error">
              تكتب بحروف عربية. بدّل لوحة المفاتيح إلى الإنجليزية أو الألمانية.
            </p>
          ) : null}
          {dictation.audioError ? (
            <p dir="rtl" role="status" className="rounded-md bg-surface px-3 py-2 text-center text-sm text-error ring-1 ring-border">
              {dictation.audioSupported ? `تعذّر تشغيل الصوت. يمكنك المتابعة بقراءة ${words.name}.` : `النطق الصوتي غير مدعوم في هذا المتصفح. يمكنك المتابعة بقراءة ${words.name}.`}
            </p>
          ) : null}

          <SpecialCharsBar onInsert={handleChar} />

          <div className="flex flex-wrap items-center justify-center gap-2">
            <button
              type="button"
              onClick={replay}
              disabled={!dictation.audioSupported}
              className="inline-flex h-11 items-center gap-2 rounded-md border border-border-strong px-4 text-[0.95rem] font-semibold text-ink transition-colors hover:bg-surface-sunken disabled:pointer-events-none disabled:opacity-45"
            >
              <Volume2 size={18} aria-hidden="true" />
              <span dir="rtl">أعد الاستماع</span>
              <kbd className="hidden rounded border border-border bg-surface-sunken px-1.5 py-0.5 font-mono text-xs text-ink-muted md:inline">Ctrl + Enter</kbd>
            </button>
            <button
              type="button"
              onClick={() => setSpeechRate(nextSpeed(settings.speechRate))}
              aria-label={`سرعة القراءة ${formatSpeed(settings.speechRate)}. اضغط للتغيير`}
              className="tnum inline-flex h-11 items-center gap-1.5 rounded-md bg-surface-sunken px-3 text-sm font-semibold text-ink transition-colors hover:bg-border"
            >
              <SpeedIcon size={16} className="text-accent" aria-hidden="true" />
              {formatSpeed(settings.speechRate)}
            </button>
          </div>

          <ul dir="rtl" className="divide-y divide-border rounded-lg border border-border bg-surface">
            <Option id="dictation-sound" label="أصوات الحرف الصحيح والخاطئ" checked={settings.soundEffects} onChange={setSoundEffects} />
            {hasTranslations ? (
              <Option id="dictation-translation" label="إظهار الترجمة العربية" checked={showTranslations} onChange={setShowTranslations} />
            ) : null}
            <Option
              id="dictation-hide-text"
              label="إخفاء النص الألماني (إملاء حقيقي من السمع)"
              checked={settings.dictationHideText}
              onChange={setHideText}
            />
            <Option
              id="dictation-transliteration"
              label="قبول ae وoe وue وss بدل ä وö وü وß"
              checked={settings.dictationAcceptTransliteration}
              onChange={setAcceptTransliteration}
            />
          </ul>
        </div>
      ) : null}
    </div>
  )
}

function IntroPanel({ onStart }: { onStart: () => void }) {
  const steps = [
    { icon: Headphones, label: 'استمع واقرأ' },
    { icon: Keyboard, label: 'اكتبها حرفًا حرفًا' },
    { icon: ArrowLeft, label: 'انتقل إلى التالي' },
  ]

  return (
    <button
      type="button"
      onClick={onStart}
      dir="rtl"
      className="relative z-10 grid min-h-72 w-full place-items-center rounded-xl border border-border bg-surface p-6 text-center transition-colors hover:border-border-strong"
    >
      <span className="space-y-5">
        <span className="block space-y-1">
          <span className="block font-sans text-2xl font-bold text-ink">اضغط في أي مكان للبدء</span>
          <span className="block text-sm text-ink-muted">ستفتح لوحة المفاتيح تلقائيًا</span>
        </span>
        <span className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-ink-muted">
          {steps.map(({ icon: Icon, label }, index) => (
            <span key={label} className="flex items-center gap-2">
              <span className="tnum grid size-6 place-items-center rounded-full bg-accent-muted text-xs font-bold text-accent">{index + 1}</span>
              <Icon size={16} className="text-accent" aria-hidden="true" />
              {label}
            </span>
          ))}
        </span>
      </span>
    </button>
  )
}

interface OptionProps {
  id: string
  label: string
  checked: boolean
  onChange: (checked: boolean) => void
}

function Option({ id, label, checked, onChange }: OptionProps) {
  return (
    <li className="flex items-center justify-between gap-4 px-4 py-3">
      <label htmlFor={id} className="text-sm text-ink">
        {label}
      </label>
      <Switch id={id} label={label} checked={checked} onChange={onChange} />
    </li>
  )
}
