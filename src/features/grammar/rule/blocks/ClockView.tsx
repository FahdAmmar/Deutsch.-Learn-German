import { Clock3 } from 'lucide-react'
import { useId, useState } from 'react'

import { Button } from '@/components/ui'
import { describeTimeAr, handAngles, nearestFiveMinutes } from '@/lib/clockFace'
import { cn } from '@/lib/cn'
import { formatClock, timeToGerman } from '@/lib/generators/time'
import type { ClockBlock, ClockPreset } from '@/types'

import { SpeakableGerman } from '../SpeakableGerman'

const HOURS = Array.from({ length: 24 }, (_, hour) => hour)
const MINUTES = Array.from({ length: 12 }, (_, step) => step * 5)

const SELECT_CLASS =
  'h-11 w-full rounded-md border-2 border-border bg-surface px-2 text-base text-ink outline-none focus-visible:border-accent'

/** The face: 12 ticks, the four anchor numbers and two hands. Colours come from tokens, so both themes work. */
function ClockFace({ time }: { time: ClockPreset }) {
  const angles = handAngles(time)
  return (
    <svg
      viewBox="0 0 200 200"
      role="img"
      aria-label={`ساعة تُظهر ${formatClock(time)}`}
      className="mx-auto aspect-square w-full max-w-64"
    >
      <circle cx="100" cy="100" r="94" className="fill-surface stroke-border" strokeWidth="4" />
      {Array.from({ length: 12 }, (_, tick) => (
        <line
          key={tick}
          x1="100"
          y1={tick % 3 === 0 ? 14 : 18}
          x2="100"
          y2="26"
          transform={`rotate(${tick * 30} 100 100)`}
          className="stroke-ink-faint"
          strokeWidth={tick % 3 === 0 ? 3 : 1.5}
          strokeLinecap="round"
        />
      ))}
      {[
        { n: '12', x: 100, y: 48 },
        { n: '3', x: 160, y: 108 },
        { n: '6', x: 100, y: 170 },
        { n: '9', x: 40, y: 108 },
      ].map(({ n, x, y }) => (
        <text key={n} x={x} y={y} textAnchor="middle" className="fill-ink font-bold" fontSize="20">
          {n}
        </text>
      ))}
      <line
        x1="100"
        y1="100"
        x2="100"
        y2="52"
        transform={`rotate(${angles.hour} 100 100)`}
        className="stroke-ink"
        strokeWidth="7"
        strokeLinecap="round"
      />
      <line
        x1="100"
        y1="100"
        x2="100"
        y2="30"
        transform={`rotate(${angles.minute} 100 100)`}
        className="stroke-primary"
        strokeWidth="4.5"
        strokeLinecap="round"
      />
      <circle cx="100" cy="100" r="6" className="fill-primary" />
    </svg>
  )
}

/**
 * Set the time on an analog clock and read it two ways: the everyday way (nach / vor / Viertel / halb) and the
 * formal 24-hour way. Wording comes from `timeToGerman`, so "ein Uhr" and "Viertel nach eins" are both right.
 */
export function ClockView({ block }: { block: ClockBlock }) {
  const [time, setTime] = useState<ClockPreset>(block.presets[0])
  const hourId = useId()
  const minuteId = useId()

  const informal = `Es ist ${timeToGerman(time, 'informal')}.`
  const formal = `Es ist ${timeToGerman(time, 'formal')}.`

  return (
    <div className="space-y-5 rounded-lg border border-border bg-surface p-4 shadow-sm sm:p-6">
      <div className="space-y-1">
        <h3 className="flex items-center gap-2 text-base font-bold text-ink">
          <Clock3 size={18} aria-hidden="true" className="text-accent" />
          {block.titleAr}
        </h3>
        {block.captionAr ? <p className="text-sm text-ink-muted">{block.captionAr}</p> : null}
      </div>

      <div className="grid gap-6 md:grid-cols-[minmax(0,16rem)_minmax(0,1fr)] md:items-center">
        <ClockFace time={time} />

        <div className="space-y-5">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label htmlFor={hourId} className="text-sm font-semibold text-ink-muted">
                الساعة
              </label>
              <select
                id={hourId}
                value={time.hour}
                onChange={(event) => setTime({ ...time, hour: Number(event.target.value) })}
                className={SELECT_CLASS}
              >
                {HOURS.map((hour) => (
                  <option key={hour} value={hour}>
                    {String(hour).padStart(2, '0')}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-1">
              <label htmlFor={minuteId} className="text-sm font-semibold text-ink-muted">
                الدقيقة
              </label>
              <select
                id={minuteId}
                value={time.minute}
                onChange={(event) => setTime({ ...time, minute: Number(event.target.value) })}
                className={SELECT_CLASS}
              >
                {MINUTES.map((minute) => (
                  <option key={minute} value={minute}>
                    {String(minute).padStart(2, '0')}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-wrap gap-2" role="group" aria-label="أوقات جاهزة">
            {block.presets.map((preset) => {
              const active = preset.hour === time.hour && preset.minute === time.minute
              return (
                <button
                  key={formatClock(preset)}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setTime(preset)}
                  className={cn(
                    'tnum rounded-full border px-3 py-1.5 font-mono text-sm font-bold transition-colors',
                    active
                      ? 'border-primary bg-primary text-primary-foreground'
                      : 'border-border bg-surface-muted text-ink-muted hover:text-ink',
                  )}
                >
                  <span dir="ltr">{formatClock(preset)}</span>
                </button>
              )
            })}
            <Button variant="outline" size="sm" onClick={() => setTime(nearestFiveMinutes(new Date()))}>
              الآن
            </Button>
          </div>

          <div aria-live="polite" className="space-y-3 rounded-lg bg-surface-muted p-4">
            <p dir="ltr" className="display-de tnum text-4xl font-bold leading-none text-ink">
              {formatClock(time)}
            </p>
            <div className="space-y-2">
              <p className="text-xs font-bold text-accent">غير رسمي — للحياة اليومية</p>
              <SpeakableGerman text={informal} tone="accent" className="text-xl font-semibold text-ink" />
            </div>
            <div className="space-y-2">
              <p className="text-xs font-bold text-primary">رسمي — 24 ساعة</p>
              <SpeakableGerman text={formal} tone="primary" className="text-lg font-semibold text-ink" />
            </div>
            <p className="border-t border-border pt-3 text-sm text-ink-muted">{describeTimeAr(time)}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
