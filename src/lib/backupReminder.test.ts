import { describe, expect, it } from 'vitest'

import { FIRST_REMINDER_AFTER_DAYS, MIN_LESSONS_FOR_REMINDER, REPEAT_REMINDER_AFTER_DAYS, shouldRemindBackup, snoozeUntil } from './backupReminder'

const DAY = 24 * 60 * 60 * 1000
const NOW = 100 * DAY
const base = { now: NOW, completedLessons: MIN_LESSONS_FOR_REMINDER, armedAt: null, lastExportAt: null, snoozedUntil: null }

describe('shouldRemindBackup', () => {
  it('stays quiet while there is little progress to lose', () => {
    expect(shouldRemindBackup({ ...base, completedLessons: MIN_LESSONS_FOR_REMINDER - 1, armedAt: NOW - 30 * DAY })).toBe(false)
  })

  it('waits a week after progress first became worth saving, and not before that', () => {
    expect(shouldRemindBackup({ ...base, armedAt: null })).toBe(false)
    expect(shouldRemindBackup({ ...base, armedAt: NOW - (FIRST_REMINDER_AFTER_DAYS - 1) * DAY })).toBe(false)
    expect(shouldRemindBackup({ ...base, armedAt: NOW - FIRST_REMINDER_AFTER_DAYS * DAY })).toBe(true)
  })

  it('asks again only when the last backup is two weeks old', () => {
    const armedAt = NOW - 60 * DAY
    expect(shouldRemindBackup({ ...base, armedAt, lastExportAt: NOW - (REPEAT_REMINDER_AFTER_DAYS - 1) * DAY })).toBe(false)
    expect(shouldRemindBackup({ ...base, armedAt, lastExportAt: NOW - REPEAT_REMINDER_AFTER_DAYS * DAY })).toBe(true)
  })

  it('does not ask for a first backup of someone who already made one', () => {
    expect(shouldRemindBackup({ ...base, armedAt: NOW - 60 * DAY, lastExportAt: NOW - DAY })).toBe(false)
  })

  it('is silent while snoozed and returns when the snooze ends', () => {
    const due = { ...base, armedAt: NOW - 30 * DAY }
    expect(shouldRemindBackup({ ...due, snoozedUntil: snoozeUntil(NOW) })).toBe(false)
    expect(shouldRemindBackup({ ...due, snoozedUntil: NOW - 1 })).toBe(true)
  })
})
