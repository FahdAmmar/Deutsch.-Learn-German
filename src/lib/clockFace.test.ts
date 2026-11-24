import { describe, expect, it } from 'vitest'

import { describeTimeAr, handAngles, nearestFiveMinutes } from './clockFace'
import { timeToGerman } from './generators/time'

describe('handAngles', () => {
  it('points both hands at 12 at midnight and noon', () => {
    expect(handAngles({ hour: 0, minute: 0 })).toEqual({ hour: 0, minute: 0 })
    expect(handAngles({ hour: 12, minute: 0 })).toEqual({ hour: 0, minute: 0 })
  })

  it('puts the minute hand on 6 at half past', () => {
    expect(handAngles({ hour: 3, minute: 30 }).minute).toBe(180)
  })

  it('moves the hour hand halfway to the next hour at half past', () => {
    // 2:30 — halfway between 2 (60°) and 3 (90°)
    expect(handAngles({ hour: 2, minute: 30 }).hour).toBe(75)
  })

  it('shows 14:00 and 02:00 identically — the face has 12 hours', () => {
    expect(handAngles({ hour: 14, minute: 0 })).toEqual(handAngles({ hour: 2, minute: 0 }))
  })
})

describe('describeTimeAr', () => {
  it('glosses the four anchor times', () => {
    expect(describeTimeAr({ hour: 3, minute: 0 })).toBe('الساعة 3 تماماً')
    expect(describeTimeAr({ hour: 3, minute: 15 })).toBe('الساعة 3 والربع')
    expect(describeTimeAr({ hour: 3, minute: 30 })).toBe('الساعة 3 والنصف')
    expect(describeTimeAr({ hour: 3, minute: 45 })).toBe('الساعة 4 إلا ربعاً')
  })

  it('counts minutes after the hour up to 25 and before the next hour from 35', () => {
    expect(describeTimeAr({ hour: 8, minute: 10 })).toBe('الساعة 8 وعشر دقائق')
    expect(describeTimeAr({ hour: 8, minute: 25 })).toBe('الساعة 8 وخمس وعشرين دقيقة')
    expect(describeTimeAr({ hour: 8, minute: 35 })).toBe('الساعة 9 إلا خمس وعشرين دقيقة')
    expect(describeTimeAr({ hour: 8, minute: 50 })).toBe('الساعة 9 إلا عشر دقائق')
  })

  it('wraps the next hour around the face: 11:45 → 12, 23:45 → 12', () => {
    expect(describeTimeAr({ hour: 11, minute: 45 })).toBe('الساعة 12 إلا ربعاً')
    expect(describeTimeAr({ hour: 23, minute: 45 })).toBe('الساعة 12 إلا ربعاً')
  })

  it('reads midnight as 12', () => {
    expect(describeTimeAr({ hour: 0, minute: 0 })).toBe('الساعة 12 تماماً')
  })

  it('falls back to digits for minutes that are not a multiple of 5', () => {
    expect(describeTimeAr({ hour: 7, minute: 7 })).toBe('الساعة 7:07')
  })
})

describe('nearestFiveMinutes', () => {
  it('rounds to the closest multiple of 5', () => {
    expect(nearestFiveMinutes(new Date(2026, 0, 1, 9, 32))).toEqual({ hour: 9, minute: 30 })
    expect(nearestFiveMinutes(new Date(2026, 0, 1, 9, 33))).toEqual({ hour: 9, minute: 35 })
  })

  it('rolls into the next hour and over midnight', () => {
    expect(nearestFiveMinutes(new Date(2026, 0, 1, 9, 58))).toEqual({ hour: 10, minute: 0 })
    expect(nearestFiveMinutes(new Date(2026, 0, 1, 23, 58))).toEqual({ hour: 0, minute: 0 })
  })
})

describe('German wording the clock block relies on (guards the "ein/eins" trap)', () => {
  it('says "ein Uhr" for 1:00 but "eins" after nach / vor / halb', () => {
    expect(timeToGerman({ hour: 1, minute: 0 }, 'informal')).toBe('ein Uhr')
    expect(timeToGerman({ hour: 1, minute: 15 }, 'informal')).toBe('Viertel nach eins')
    expect(timeToGerman({ hour: 12, minute: 30 }, 'informal')).toBe('halb eins')
    expect(timeToGerman({ hour: 12, minute: 45 }, 'informal')).toBe('Viertel vor eins')
  })

  it('says "halb drei" for 2:30 and the 24-hour form for the formal style', () => {
    expect(timeToGerman({ hour: 2, minute: 30 }, 'informal')).toBe('halb drei')
    expect(timeToGerman({ hour: 14, minute: 30 }, 'formal')).toBe('vierzehn Uhr dreißig')
  })
})
