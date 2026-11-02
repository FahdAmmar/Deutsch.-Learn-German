import { describe, expect, it } from 'vitest'

import { acceptedOrders, isOrderCorrect } from './orderingCheck'

describe('isOrderCorrect', () => {
  it('accepts the named order and nothing else when there is no alternative', () => {
    const exercise = { correctOrder: [2, 0, 1] }
    expect(isOrderCorrect(exercise, [2, 0, 1])).toBe(true)
    expect(isOrderCorrect(exercise, [0, 1, 2])).toBe(false)
  })

  it('accepts a listed alternative as well', () => {
    const exercise = { correctOrder: [0, 1, 2, 3], acceptedOrders: [[0, 1, 3, 2]] }
    expect(isOrderCorrect(exercise, [0, 1, 3, 2])).toBe(true)
    expect(isOrderCorrect(exercise, [0, 1, 2, 3])).toBe(true)
    expect(isOrderCorrect(exercise, [1, 0, 2, 3])).toBe(false)
  })

  it('does not accept a placement that is only a prefix of a right order', () => {
    expect(isOrderCorrect({ correctOrder: [0, 1, 2] }, [0, 1])).toBe(false)
  })

  it('lists the named order first', () => {
    expect(acceptedOrders({ correctOrder: [1, 0], acceptedOrders: [[0, 1]] })).toEqual([[1, 0], [0, 1]])
  })
})
