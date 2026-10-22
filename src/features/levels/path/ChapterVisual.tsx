import { useState } from 'react'

import { GERMAN_ALPHABET } from '@/data/alphabet'
import { WEEKDAYS, weekdayIndex } from '@/data/weekdays'
import { GermanWord } from '@/features/pronunciation/GermanWord'
import { LetterTile } from '@/features/pronunciation/LetterTile'
import { useSpeech } from '@/hooks/useSpeech'
import { cn } from '@/lib/cn'
import type { PathChapter } from '@/types'

/** Level-1 card that every chapter illustration sits on. */
function Panel({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn('rounded-lg border border-border bg-surface p-4 shadow-sm sm:p-5', className)}>{children}</div>
}

function LettersVisual() {
  const { speak, isSpeaking, isSupported } = useSpeech()
  const [activeGlyph, setActiveGlyph] = useState<string | null>(null)

  return (
    <Panel>
      <ul dir="ltr" className="grid grid-cols-6 gap-1.5 sm:grid-cols-8 lg:grid-cols-10">
        {GERMAN_ALPHABET.map((letter) => (
          <li key={letter.glyph}>
            <LetterTile
              letter={letter}
              active={isSpeaking && activeGlyph === letter.glyph}
              disabled={!isSupported}
              onPress={(pressed) => {
                setActiveGlyph(pressed.glyph)
                speak(pressed.spoken)
              }}
            />
          </li>
        ))}
      </ul>
      <p className="mt-3 text-sm text-ink-muted">
        {isSupported
          ? 'اضغط على أي حرف لتسمع اسمه. المظلَّلة بالأصفر حروف خاصة بالألمانية: ä وö وü وß.'
          : 'النطق الصوتي غير مدعوم في هذا المتصفح. المظلَّلة بالأصفر حروف خاصة بالألمانية: ä وö وü وß.'}
      </p>
    </Panel>
  )
}

/** A clock at 2:30. It carries the one thing Arabic speakers get wrong first: "halb drei" is 2:30, not 3:30. */
function HalbDreiClock() {
  return (
    <svg viewBox="0 0 120 120" role="img" aria-label="ساعة تُظهر الثانية والنصف، أي 2:30" className="h-28 w-28 shrink-0">
      <circle cx="60" cy="60" r="56" strokeWidth="2" className="fill-surface stroke-border-strong" />
      {Array.from({ length: 12 }, (_, index) => (
        <line
          key={index}
          x1="60"
          y1="8"
          x2="60"
          y2={index % 3 === 0 ? 17 : 13}
          transform={`rotate(${index * 30} 60 60)`}
          strokeWidth={index % 3 === 0 ? 2.5 : 1.5}
          strokeLinecap="round"
          className="stroke-ink-muted"
        />
      ))}
      <line x1="60" y1="60" x2="60" y2="34" transform="rotate(75 60 60)" strokeWidth="5" strokeLinecap="round" className="stroke-primary" />
      <line x1="60" y1="60" x2="60" y2="18" transform="rotate(180 60 60)" strokeWidth="3" strokeLinecap="round" className="stroke-accent-vivid" />
      <circle cx="60" cy="60" r="4" className="fill-ink" />
    </svg>
  )
}

function TimeVisual() {
  const { speak, isSupported } = useSpeech()
  const todayIndex = weekdayIndex(new Date())
  const [selectedIndex, setSelectedIndex] = useState(todayIndex)
  const selected = WEEKDAYS[selectedIndex]

  return (
    <Panel className="grid gap-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
      <div className="space-y-3">
        <ol dir="ltr" className="grid grid-cols-7 gap-1.5">
          {WEEKDAYS.map((day, index) => (
            <li key={day.short}>
              <button
                type="button"
                onClick={() => {
                  setSelectedIndex(index)
                  speak(day.full)
                }}
                disabled={!isSupported}
                aria-label={`${day.full}، ${day.ar}`}
                aria-pressed={index === selectedIndex}
                aria-current={index === todayIndex ? 'date' : undefined}
                className={cn(
                  'display-de flex h-12 w-full items-center justify-center rounded-sm border text-lg transition-colors',
                  day.weekend ? 'border-transparent bg-marker text-marker-foreground' : 'border-border-strong bg-surface text-ink hover:bg-primary-muted',
                  index === todayIndex && 'ring-2 ring-accent ring-offset-1 ring-offset-surface',
                  index === selectedIndex && 'outline-2 outline-offset-2 outline-ink',
                  'disabled:cursor-not-allowed disabled:opacity-60',
                )}
              >
                {day.short}
              </button>
            </li>
          ))}
        </ol>
        <p aria-live="polite" className="flex flex-wrap items-baseline gap-x-3">
          <span lang="de" dir="ltr" className="display-de text-xl text-ink">
            {selected.full}
          </span>
          <span dir="rtl" className="text-ink-muted">
            {selected.ar}
            {selected.weekend ? ' · Wochenende' : ''}
          </span>
        </p>
        <p className="text-sm text-ink-muted">الإطار يدلّ على اليوم الحالي، والأصفر على عطلة نهاية الأسبوع. الأسبوع الألماني يبدأ بالاثنين.</p>
      </div>

      <div className="flex items-center gap-4 border-t border-border pt-5 md:border-s md:border-t-0 md:ps-6 md:pt-0">
        <HalbDreiClock />
        <div className="space-y-1.5">
          <GermanWord word="Es ist halb drei." size="md" />
          <p className="text-sm text-ink-muted">
            الساعة <span className="tnum">2:30</span>: halb تعني نصفاً قبل الساعة القادمة، لا بعد الحالية.
          </p>
        </div>
      </div>
    </Panel>
  )
}

const SENTENCE_PARTS = [
  { de: 'Ich', roleAr: 'الفاعل', block: 'bg-primary-muted text-primary border-primary' },
  { de: 'lerne', roleAr: 'الفعل', block: 'bg-accent-muted text-accent border-accent-vivid' },
  { de: 'Deutsch', roleAr: 'المفعول به', block: 'bg-plum-muted text-plum border-plum-vivid' },
] as const

function SentenceVisual() {
  return (
    <Panel className="space-y-4">
      <ol dir="ltr" className="flex flex-wrap items-start gap-2">
        {SENTENCE_PARTS.map((part) => (
          <li key={part.de} className="space-y-1.5 text-center">
            <span lang="de" className={cn('display-de block rounded-sm border-b-4 px-4 py-2 text-xl', part.block)}>
              {part.de}
            </span>
            <span dir="rtl" className="block text-sm text-ink-muted">
              {part.roleAr}
            </span>
          </li>
        ))}
        <li aria-hidden="true" className="display-de self-start py-2 text-xl text-ink-muted">
          .
        </li>
      </ol>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <GermanWord word="Ich lerne Deutsch." size="md" />
        <p className="text-sm text-ink-muted">الجملة الأساسية: فاعل، ثم فعل، ثم مفعول به.</p>
      </div>
    </Panel>
  )
}

function PhraseVisual({ sample }: { sample: { de: string; ar: string } }) {
  return (
    <Panel className="space-y-1.5">
      <GermanWord word={sample.de} size="lg" className="display-de" />
      <p className="text-ink-muted">{sample.ar}</p>
    </Panel>
  )
}

/** The illustration that opens a chapter: a small interactive preview of what the chapter teaches. */
export function ChapterVisual({ chapter }: { chapter: PathChapter }) {
  switch (chapter.visual) {
    case 'letters':
      return <LettersVisual />
    case 'time':
      return <TimeVisual />
    case 'sentence':
      return <SentenceVisual />
    case 'phrase':
      return chapter.sample ? <PhraseVisual sample={chapter.sample} /> : null
    default:
      return null
  }
}
