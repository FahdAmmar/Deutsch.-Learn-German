import type { ClockTime } from './generators/time'

/**
 * Geometry and wording for the lesson clock. Pure — no React, no `Date.now()` — so it can be tested exactly.
 * The German itself comes from `generators/time.ts`; this file only draws the face and glosses it in Arabic.
 */

export interface HandAngles {
  /** Degrees clockwise from 12 o'clock. */
  hour: number
  minute: number
}

/** The hour hand creeps with the minutes (30° per hour + ½° per minute); the minute hand turns 6° per minute. */
export function handAngles({ hour, minute }: ClockTime): HandAngles {
  return { hour: (hour % 12) * 30 + minute * 0.5, minute: minute * 6 }
}

/** The 12-hour number on the clock face for a 0–23 hour (0 and 12 → 12). */
function faceHour(hour: number): number {
  return hour % 12 === 0 ? 12 : hour % 12
}

const MINUTES_AR: Readonly<Record<number, string>> = {
  5: 'خمس دقائق',
  10: 'عشر دقائق',
  20: 'عشرين دقيقة',
  25: 'خمس وعشرين دقيقة',
}

/**
 * The time the way an Arabic speaker would gloss it: "الساعة 3 والنصف", "الساعة 4 إلا ربعاً".
 * This is the contrast the lesson teaches — "halb drei" is 2:30, which the gloss states plainly.
 * Minutes that are not a multiple of 5 fall back to the digits, so the function never throws in the UI.
 */
export function describeTimeAr({ hour, minute }: ClockTime): string {
  const here = faceHour(hour)
  const next = faceHour(hour + 1)

  if (minute === 0) return `الساعة ${here} تماماً`
  if (minute === 15) return `الساعة ${here} والربع`
  if (minute === 30) return `الساعة ${here} والنصف`
  if (minute === 45) return `الساعة ${next} إلا ربعاً`
  if (minute % 5 !== 0) return `الساعة ${here}:${String(minute).padStart(2, '0')}`

  return minute < 30 ? `الساعة ${here} و${MINUTES_AR[minute]}` : `الساعة ${next} إلا ${MINUTES_AR[60 - minute]}`
}

/** The nearest time in 5-minute steps — what the "now" button sets. 23:58 rolls over to 00:00. */
export function nearestFiveMinutes(date: Date): ClockTime {
  const totalMinutes = date.getHours() * 60 + date.getMinutes()
  const rounded = Math.round(totalMinutes / 5) * 5
  const wrapped = rounded % (24 * 60)
  return { hour: Math.floor(wrapped / 60), minute: wrapped % 60 }
}
