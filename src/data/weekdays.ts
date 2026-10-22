export interface Weekday {
  short: string
  full: string
  ar: string
  /** Saturday and Sunday are das Wochenende. */
  weekend: boolean
}

/** Monday first: German calendars start the week on Montag. */
export const WEEKDAYS: readonly Weekday[] = [
  { short: 'Mo', full: 'Montag', ar: 'الاثنين', weekend: false },
  { short: 'Di', full: 'Dienstag', ar: 'الثلاثاء', weekend: false },
  { short: 'Mi', full: 'Mittwoch', ar: 'الأربعاء', weekend: false },
  { short: 'Do', full: 'Donnerstag', ar: 'الخميس', weekend: false },
  { short: 'Fr', full: 'Freitag', ar: 'الجمعة', weekend: false },
  { short: 'Sa', full: 'Samstag', ar: 'السبت', weekend: true },
  { short: 'So', full: 'Sonntag', ar: 'الأحد', weekend: true },
]

/** Index into WEEKDAYS (Monday = 0) for a JavaScript date, whose own `getDay()` starts on Sunday. */
export function weekdayIndex(date: Date): number {
  return (date.getDay() + 6) % 7
}
