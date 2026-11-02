import { Volume2 } from 'lucide-react'

import { Badge, Button } from '@/components/ui'
import { cn } from '@/lib/cn'
import { itemOptions, itemPrompt } from '@/lib/exam/score'
import type { ExamItem, ExamTask } from '@/types'

/** Arabic helper shown beside richtig / falsch so the two words are never in doubt. */
const TRUE_FALSE_AR = ['صحيح', 'خطأ'] as const

interface ItemFieldsetProps {
  item: ExamItem
  position: number
  chosen: number | undefined
  onChoose: (index: number) => void
}

function ItemFieldset({ item, position, chosen, onChoose }: ItemFieldsetProps) {
  const options = itemOptions(item)
  return (
    <fieldset className="space-y-3">
      <legend lang="de" dir="ltr" className="display-de text-start text-base leading-8 font-semibold text-ink">
        {position}. {itemPrompt(item)}
      </legend>
      <div className="grid gap-2 sm:grid-cols-3">
        {options.map((option, index) => {
          const selected = chosen === index
          return (
            <label
              key={option}
              className={cn(
                'flex min-h-12 cursor-pointer items-center gap-3 rounded-md border px-4 py-2 transition-colors',
                'has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2',
                selected ? 'border-primary bg-primary-muted' : 'border-border-strong bg-surface hover:bg-surface-sunken',
              )}
            >
              <input
                type="radio"
                name={item.id}
                checked={selected}
                onChange={() => onChoose(index)}
                className="size-4 shrink-0 accent-[var(--color-primary)]"
              />
              <span lang="de" dir="ltr" className="display-de text-start text-ink">
                {option}
              </span>
              {item.kind === 'true-false' ? (
                <span dir="rtl" className="ms-auto text-sm text-ink-muted">
                  {TRUE_FALSE_AR[index]}
                </span>
              ) : null}
            </label>
          )
        })}
      </div>
    </fieldset>
  )
}

interface ExamTaskViewProps {
  task: ExamTask
  /** The number of the first question of this task within the whole set. */
  firstPosition: number
  answers: Readonly<Record<string, number>>
  onChoose: (itemId: string, index: number) => void
  /** Hören only: plays used so far, the most allowed (undefined = unlimited) and the play action. */
  playsUsed: number
  maxPlays: number | undefined
  speaking: boolean
  speechSupported: boolean
  onPlay: () => void
}

/** One text or recording and its questions. */
export function ExamTaskView({
  task,
  firstPosition,
  answers,
  onChoose,
  playsUsed,
  maxPlays,
  speaking,
  speechSupported,
  onPlay,
}: ExamTaskViewProps) {
  const outOfPlays = maxPlays !== undefined && playsUsed >= maxPlays && !speaking

  return (
    <section aria-labelledby={`${task.id}-title`} className="space-y-5 rounded-lg border border-border bg-surface p-4 sm:p-5">
      <div dir="rtl" className="flex flex-wrap items-center gap-2">
        <h2 id={`${task.id}-title`} className="font-sans text-lg font-bold text-ink">
          {task.titleAr}
        </h2>
        <Badge tone="neutral">
          <span lang="de" dir="ltr">
            {task.kindDe}
          </span>
        </Badge>
      </div>

      {task.textDe ? (
        <p
          lang="de"
          dir="ltr"
          className="display-de rounded-md bg-surface-sunken p-4 text-start text-lg leading-9 whitespace-pre-line text-ink"
        >
          {task.textDe}
        </p>
      ) : null}

      {task.audioDe ? (
        speechSupported ? (
          <div dir="rtl" className="flex flex-wrap items-center gap-3 rounded-md bg-surface-sunken p-4">
            <Button
              onClick={onPlay}
              disabled={outOfPlays}
              icon={<Volume2 size={18} aria-hidden="true" />}
              aria-label={speaking ? 'أعد تشغيل التسجيل' : 'شغّل التسجيل'}
            >
              {speaking ? 'يُقرأ الآن…' : 'شغّل التسجيل'}
            </Button>
            <span className="tnum text-sm text-ink-muted">
              {maxPlays === undefined ? `شُغّل ${playsUsed} مرة` : `التشغيل ${Math.min(playsUsed, maxPlays)} من ${maxPlays}`}
            </span>
          </div>
        ) : (
          <div dir="rtl" className="space-y-2 rounded-md bg-surface-sunken p-4">
            <p className="text-sm text-ink-muted">متصفحك لا يدعم النطق الصوتي، فهذا هو نص التسجيل لتقرأه بدل أن تسمعه:</p>
            <p lang="de" dir="ltr" className="display-de text-start text-lg leading-9 text-ink">
              {task.audioDe}
            </p>
          </div>
        )
      ) : null}

      <div className="space-y-5">
        {task.items.map((item, index) => (
          <ItemFieldset
            key={item.id}
            item={item}
            position={firstPosition + index}
            chosen={answers[item.id]}
            onChoose={(choice) => onChoose(item.id, choice)}
          />
        ))}
      </div>
    </section>
  )
}
