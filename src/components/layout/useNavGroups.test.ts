import { describe, expect, it } from 'vitest'

import { NAV_GROUPS, NAV_ITEMS } from './nav-items'
import { resolveNavGroups } from './useNavGroups'

function activeIds(pathname: string, search = '') {
  return resolveNavGroups(pathname, search, 'A2')
    .flatMap((group) => group.items)
    .filter((item) => item.isActive)
    .map((item) => item.id)
}

describe('navigation groups', () => {
  it('holds every item once, and no item is the "next lesson" whose destination changes with progress', () => {
    const ids = NAV_ITEMS.map((item) => item.id)
    expect(new Set(ids).size).toBe(ids.length)
    expect(ids).not.toContain('lesson')
    expect(NAV_ITEMS.filter((item) => item.dynamic).map((item) => item.id)).toEqual(['reading'])
  })

  it('gives every item a destination', () => {
    for (const item of NAV_ITEMS) expect(item.to ?? item.dynamic).toBeTruthy()
  })

  it('keeps the groups in the order of a study session: today, learn, practise, then the learner\'s own record', () => {
    expect(NAV_GROUPS.map((group) => group.id)).toEqual(['today', 'learn', 'practice', 'me'])
  })
})

describe('resolveNavGroups', () => {
  it('lights exactly one item for a route', () => {
    expect(activeIds('/dashboard')).toEqual(['dashboard'])
    expect(activeIds('/grammar/a1/01-personalpronomen')).toEqual(['grammar'])
    expect(activeIds('/practice/writing')).toEqual(['practice'])
    expect(activeIds('/review')).toEqual(['review'])
  })

  it('keeps "Levels" lit on a level page and on a lesson, which belongs to a level', () => {
    expect(activeIds('/levels')).toEqual(['levels'])
    expect(activeIds('/levels/a1')).toEqual(['levels'])
    expect(activeIds('/lessons/a1/tagesablauf')).toEqual(['levels'])
  })

  it('lights "Reading" instead of "Levels" on the texts tab', () => {
    expect(activeIds('/levels/a1', '?tab=stories')).toEqual(['reading'])
  })

  it('opens the texts of the learner\'s own level from "Reading"', () => {
    const reading = resolveNavGroups('/dashboard', '', 'B1')
      .flatMap((group) => group.items)
      .find((item) => item.id === 'reading')
    expect(reading?.href).toBe('/levels/b1?tab=stories')
  })
})
