import { numberToGerman } from './numbers'

/**
 * The time of day in the two German ways of saying it. Pure — no React.
 * - informal: the 12-hour clock with "nach", "vor", "Viertel" and "halb" ("halb vier" is 3:30)
 * - formal: the 24-hour clock, "fünfzehn Uhr dreißig" — for timetables, appointments and announcements
 */

export type TimeStyle = 'informal' | 'formal'

export interface ClockTime {
  hour: number
  minute: number
}

/** The hour as a word inside "nach / vor / halb": "eins", never "ein". */
function hourWord(hour: number): string {
  const twelve = hour % 12 === 0 ? 12 : hour % 12
  return numberToGerman(twelve)
}

function nextHour(hour: number): number {
  return (hour + 1) % 24
}

export function timeToGerman({ hour, minute }: ClockTime, style: TimeStyle): string {
  if (!Number.isInteger(hour) || hour < 0 || hour > 23) throw new RangeError(`hour 0–23, got ${hour}`)
  if (!Number.isInteger(minute) || minute < 0 || minute > 59) throw new RangeError(`minute 0–59, got ${minute}`)

  if (style === 'formal') {
    // "ein Uhr", not "eins Uhr": the hour is a prefix of "Uhr".
    const hourText = hour === 1 ? 'ein' : numberToGerman(hour)
    return minute === 0 ? `${hourText} Uhr` : `${hourText} Uhr ${numberToGerman(minute)}`
  }

  if (minute % 5 !== 0) throw new RangeError(`the informal way names only whole 5 minutes, got ${minute}`)
  const here = hourWord(hour)
  const next = hourWord(nextHour(hour))
  switch (minute) {
    case 0:
      return `${hour % 12 === 1 ? 'ein' : here} Uhr`
    case 15:
      return `Viertel nach ${here}`
    case 25:
      return `fünf vor halb ${next}`
    case 30:
      return `halb ${next}`
    case 35:
      return `fünf nach halb ${next}`
    case 45:
      return `Viertel vor ${next}`
    default:
      return minute < 30 ? `${numberToGerman(minute)} nach ${here}` : `${numberToGerman(60 - minute)} vor ${next}`
  }
}

/** "03:05", the way a clock face or a timetable writes it. */
export function formatClock({ hour, minute }: ClockTime): string {
  return `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`
}
