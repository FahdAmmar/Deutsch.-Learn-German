const DAY_MS = 24 * 60 * 60 * 1000

/** Progress is worth protecting from this many completed lessons on. */
export const MIN_LESSONS_FOR_REMINDER = 3
/** After first having something worth saving, wait this long before the first reminder. */
export const FIRST_REMINDER_AFTER_DAYS = 7
/** After a backup was downloaded, remind again once it is this old. */
export const REPEAT_REMINDER_AFTER_DAYS = 14
/** "Remind me later" hides the card for this long. */
export const SNOOZE_DAYS = 7

export interface BackupReminderInput {
  now: number
  completedLessons: number
  /** When the learner first had something worth saving; null before that. */
  armedAt: number | null
  /** When a backup file was last downloaded; null if never. */
  lastExportAt: number | null
  snoozedUntil: number | null
}

/**
 * Whether to remind the learner to download a backup. Progress lives only in this browser, so clearing its data
 * would erase it. The reminder stays quiet until there is progress worth keeping, waits a week before the first
 * one, and then returns when the last backup is two weeks old. "Remind me later" hides it for a week.
 */
export function shouldRemindBackup({ now, completedLessons, armedAt, lastExportAt, snoozedUntil }: BackupReminderInput): boolean {
  if (completedLessons < MIN_LESSONS_FOR_REMINDER) return false
  if (snoozedUntil !== null && now < snoozedUntil) return false
  if (lastExportAt !== null) return now - lastExportAt >= REPEAT_REMINDER_AFTER_DAYS * DAY_MS
  return armedAt !== null && now - armedAt >= FIRST_REMINDER_AFTER_DAYS * DAY_MS
}

export const snoozeUntil = (now: number): number => now + SNOOZE_DAYS * DAY_MS
