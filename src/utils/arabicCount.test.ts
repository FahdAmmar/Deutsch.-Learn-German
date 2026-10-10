import { describe, expect, it } from 'vitest'

import { DAY_FORMS, formatCountAr, LESSON_FORMS, MODULE_FORMS, WORD_FORMS } from './arabicCount'

describe('formatCountAr', () => {
  it('uses the singular for one and the dual for two', () => {
    expect(formatCountAr(1, MODULE_FORMS)).toBe('وحدة واحدة')
    expect(formatCountAr(2, MODULE_FORMS)).toBe('وحدتان')
  })

  it('uses the plural for 3–10', () => {
    expect(formatCountAr(3, LESSON_FORMS)).toBe('3 دروس')
    expect(formatCountAr(10, WORD_FORMS)).toBe('10 كلمات')
  })

  it('switches to the singular accusative from 11 upwards', () => {
    expect(formatCountAr(11, DAY_FORMS)).toBe('11 يوماً')
    expect(formatCountAr(20, MODULE_FORMS)).toBe('20 وحدة')
    expect(formatCountAr(31, LESSON_FORMS)).toBe('31 درساً')
  })

  it('treats zero like a plural count', () => {
    expect(formatCountAr(0, LESSON_FORMS)).toBe('0 دروس')
  })
})
