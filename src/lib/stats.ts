import type { AnswerCounter, ExerciseType, LearningStats } from '@/types'
import { todayKey } from '@/utils/date'

/** Days of per-day history kept — a little over a year, enough for the heatmap and a year-in-review. */
export const MAX_DAYS_KEPT = 400

export const EMPTY_STATS: LearningStats = { days: {}, byType: {}, byModule: {} }

function bump(counter: AnswerCounter | undefined, correct: boolean): AnswerCounter {
  return { attempts: (counter?.attempts ?? 0) + 1, correct: (counter?.correct ?? 0) + (correct ? 1 : 0) }
}

export interface RecordedAnswer {
  type: ExerciseType
  correct: boolean
  /** The module (topic) the exercise belongs to, when it belongs to a lesson. */
  moduleId?: string
  /** Local day key; defaults to today. */
  day?: string
}

/** Returns new stats with one answer counted. Pure — the store owns persistence. */
export function withAnswer(stats: LearningStats, answer: RecordedAnswer): LearningStats {
  const day = answer.day ?? todayKey()
  const days = { ...stats.days, [day]: bump(stats.days[day], answer.correct) }

  const keys = Object.keys(days)
  if (keys.length > MAX_DAYS_KEPT) {
    keys.sort()
    for (const old of keys.slice(0, keys.length - MAX_DAYS_KEPT)) delete days[old]
  }

  return {
    days,
    byType: { ...stats.byType, [answer.type]: bump(stats.byType[answer.type], answer.correct) },
    byModule: answer.moduleId
      ? { ...stats.byModule, [answer.moduleId]: bump(stats.byModule[answer.moduleId], answer.correct) }
      : stats.byModule,
  }
}

/** Accuracy 0–1, or `null` when nothing has been answered yet (so the UI shows "no data", not 0%). */
export function accuracyOf(counter: AnswerCounter | undefined): number | null {
  if (!counter || counter.attempts === 0) return null
  return counter.correct / counter.attempts
}

/** Answers counted for one day. */
export function answersOn(stats: LearningStats, day: string = todayKey()): number {
  return stats.days[day]?.attempts ?? 0
}

export interface HeatmapDay {
  day: string
  attempts: number
  /** 0 (none) to 4 (most) — relative to the busiest day in the window, so a light week still shows texture. */
  level: 0 | 1 | 2 | 3 | 4
}

function shiftDay(day: string, offset: number): string {
  const date = new Date(`${day}T00:00:00`)
  date.setDate(date.getDate() + offset)
  return todayKey(date)
}

/**
 * The last `weeks` weeks as columns of 7 days, oldest week first, each week
 * starting on `weekStartsOn` (0 = Sunday … 6 = Saturday). Days after `today`
 * are omitted from the final column rather than padded.
 */
export function buildHeatmap(
  stats: LearningStats,
  options: { weeks?: number; today?: string; weekStartsOn?: number } = {},
): HeatmapDay[][] {
  const weeks = options.weeks ?? 20
  const today = options.today ?? todayKey()
  const weekStartsOn = options.weekStartsOn ?? 6 // Saturday: the first day of the week in much of the Arab world

  const todayWeekday = new Date(`${today}T00:00:00`).getDay()
  const sinceWeekStart = (todayWeekday - weekStartsOn + 7) % 7
  const firstDay = shiftDay(today, -(sinceWeekStart + (weeks - 1) * 7))

  const total = (weeks - 1) * 7 + sinceWeekStart + 1
  const attempts = Array.from({ length: total }, (_, index) => stats.days[shiftDay(firstDay, index)]?.attempts ?? 0)
  const busiest = Math.max(1, ...attempts)

  const columns: HeatmapDay[][] = []
  for (let index = 0; index < total; index += 1) {
    const count = attempts[index]
    const level = count === 0 ? 0 : (Math.min(4, Math.ceil((count / busiest) * 4)) as 1 | 2 | 3 | 4)
    const column = Math.floor(index / 7)
    columns[column] ??= []
    columns[column].push({ day: shiftDay(firstDay, index), attempts: count, level })
  }
  return columns
}
