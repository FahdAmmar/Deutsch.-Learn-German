import { describe, expect, it } from 'vitest'

import { dateToGerman, formatDate, ordinalToGerman } from './dates'
import { confusableNumbers, numberSpellings, numberToGerman } from './numbers'
import { formatPrice, priceToGerman } from './prices'
import { formatClock, timeToGerman } from './time'

describe('numberToGerman', () => {
  it.each([
    [0, 'null'],
    [1, 'eins'],
    [2, 'zwei'],
    [7, 'sieben'],
    [11, 'elf'],
    [12, 'zwölf'],
    [13, 'dreizehn'],
    [16, 'sechzehn'],
    [17, 'siebzehn'],
    [20, 'zwanzig'],
    [21, 'einundzwanzig'],
    [30, 'dreißig'],
    [31, 'einunddreißig'],
    [60, 'sechzig'],
    [66, 'sechsundsechzig'],
    [70, 'siebzig'],
    [77, 'siebenundsiebzig'],
    [99, 'neunundneunzig'],
    [100, 'hundert'],
    [101, 'hunderteins'],
    [111, 'hundertelf'],
    [121, 'hunderteinundzwanzig'],
    [200, 'zweihundert'],
    [315, 'dreihundertfünfzehn'],
    [999, 'neunhundertneunundneunzig'],
    [1000, 'eintausend'],
    [1001, 'eintausendeins'],
    [1100, 'eintausendeinhundert'],
    [2000, 'zweitausend'],
    [2024, 'zweitausendvierundzwanzig'],
    [1999, 'eintausendneunhundertneunundneunzig'],
    [9999, 'neuntausendneunhundertneunundneunzig'],
  ])('%i → %s', (n, word) => {
    expect(numberToGerman(n)).toBe(word)
  })

  it('refuses what it cannot write', () => {
    expect(() => numberToGerman(-1)).toThrow(RangeError)
    expect(() => numberToGerman(10_000)).toThrow(RangeError)
    expect(() => numberToGerman(1.5)).toThrow(RangeError)
  })

  it('offers the other correct spellings, so a typed answer is not wrongly rejected', () => {
    expect(numberSpellings(100)).toEqual(expect.arrayContaining(['hundert', 'einhundert']))
    expect(numberSpellings(121)).toEqual(expect.arrayContaining(['hunderteinundzwanzig', 'einhunderteinundzwanzig']))
    expect(numberSpellings(1000)).toEqual(expect.arrayContaining(['eintausend', 'tausend']))
    expect(numberSpellings(24)).toEqual(['vierundzwanzig'])
  })
})

describe('confusableNumbers', () => {
  it('pairs the teens with the tens, in both directions', () => {
    expect(confusableNumbers(13, 100)).toContain(30)
    expect(confusableNumbers(16, 100)).toContain(60)
    expect(confusableNumbers(70, 100)).toContain(17)
  })

  it('swaps the digits of a two-digit number, except one made of a repeated digit', () => {
    expect(confusableNumbers(24, 100)).toContain(42)
    expect(confusableNumbers(33, 100)).not.toContain(33)
  })

  it('stays in range, never includes the number itself and has no duplicate', () => {
    for (const n of [0, 5, 13, 24, 50, 99, 100]) {
      const found = confusableNumbers(n, 100)
      expect(found).not.toContain(n)
      expect(new Set(found).size).toBe(found.length)
      for (const candidate of found) expect(candidate >= 0 && candidate <= 100).toBe(true)
    }
  })
})

describe('timeToGerman', () => {
  it.each([
    [{ hour: 15, minute: 0 }, 'drei Uhr'],
    [{ hour: 13, minute: 0 }, 'ein Uhr'],
    [{ hour: 0, minute: 0 }, 'zwölf Uhr'],
    [{ hour: 12, minute: 0 }, 'zwölf Uhr'],
    [{ hour: 3, minute: 5 }, 'fünf nach drei'],
    [{ hour: 3, minute: 10 }, 'zehn nach drei'],
    [{ hour: 3, minute: 15 }, 'Viertel nach drei'],
    [{ hour: 3, minute: 20 }, 'zwanzig nach drei'],
    [{ hour: 3, minute: 25 }, 'fünf vor halb vier'],
    [{ hour: 3, minute: 30 }, 'halb vier'],
    [{ hour: 3, minute: 35 }, 'fünf nach halb vier'],
    [{ hour: 3, minute: 40 }, 'zwanzig vor vier'],
    [{ hour: 15, minute: 45 }, 'Viertel vor vier'],
    [{ hour: 3, minute: 50 }, 'zehn vor vier'],
    [{ hour: 3, minute: 55 }, 'fünf vor vier'],
    [{ hour: 12, minute: 30 }, 'halb eins'],
    [{ hour: 13, minute: 5 }, 'fünf nach eins'],
    [{ hour: 11, minute: 30 }, 'halb zwölf'],
    [{ hour: 23, minute: 45 }, 'Viertel vor zwölf'],
  ])('informal %j → %s', (time, text) => {
    expect(timeToGerman(time, 'informal')).toBe(text)
  })

  it.each([
    [{ hour: 15, minute: 30 }, 'fünfzehn Uhr dreißig'],
    [{ hour: 15, minute: 0 }, 'fünfzehn Uhr'],
    [{ hour: 0, minute: 5 }, 'null Uhr fünf'],
    [{ hour: 9, minute: 5 }, 'neun Uhr fünf'],
    [{ hour: 1, minute: 1 }, 'ein Uhr eins'],
    [{ hour: 23, minute: 59 }, 'dreiundzwanzig Uhr neunundfünfzig'],
  ])('formal %j → %s', (time, text) => {
    expect(timeToGerman(time, 'formal')).toBe(text)
  })

  it('refuses an invalid time and the informal way for minutes it does not name', () => {
    expect(() => timeToGerman({ hour: 24, minute: 0 }, 'formal')).toThrow(RangeError)
    expect(() => timeToGerman({ hour: 3, minute: 7 }, 'informal')).toThrow(RangeError)
  })

  it('writes the clock face with two digits', () => {
    expect(formatClock({ hour: 3, minute: 5 })).toBe('03:05')
  })
})

describe('dates', () => {
  it.each([
    [1, 'erste'],
    [2, 'zweite'],
    [3, 'dritte'],
    [7, 'siebte'],
    [8, 'achte'],
    [12, 'zwölfte'],
    [19, 'neunzehnte'],
    [20, 'zwanzigste'],
    [21, 'einundzwanzigste'],
    [30, 'dreißigste'],
    [31, 'einunddreißigste'],
  ])('ordinal %i → %s', (n, word) => {
    expect(ordinalToGerman(n)).toBe(word)
  })

  it('says the nominative with "der" and the dative with "am" and -n', () => {
    expect(dateToGerman(1, 1, 'nominative')).toBe('der erste Januar')
    expect(dateToGerman(3, 10, 'dative')).toBe('am dritten Oktober')
    expect(dateToGerman(31, 12, 'dative')).toBe('am einunddreißigsten Dezember')
    expect(dateToGerman(8, 3, 'nominative')).toBe('der achte März')
  })

  it('writes the date with two digits and dots', () => {
    expect(formatDate(3, 10)).toBe('03.10.')
  })

  it('refuses a day or month out of range', () => {
    expect(() => ordinalToGerman(32)).toThrow(RangeError)
    expect(() => dateToGerman(1, 13, 'dative')).toThrow(RangeError)
  })
})

describe('prices', () => {
  it.each([
    [350, 'drei Euro fünfzig'],
    [99, 'neunundneunzig Cent'],
    [100, 'ein Euro'],
    [1205, 'zwölf Euro fünf'],
    [1, 'ein Cent'],
    [101, 'ein Euro eins'],
    [2000, 'zwanzig Euro'],
    [1999, 'neunzehn Euro neunundneunzig'],
  ])('%i cents → %s', (cents, text) => {
    expect(priceToGerman(cents)).toBe(text)
  })

  it('writes the price with a comma and the euro sign after', () => {
    expect(formatPrice(350)).toBe('3,50 €')
    expect(formatPrice(99)).toBe('0,99 €')
    expect(formatPrice(1205)).toBe('12,05 €')
  })

  it('refuses a price it cannot say', () => {
    expect(() => priceToGerman(0)).toThrow(RangeError)
  })
})
