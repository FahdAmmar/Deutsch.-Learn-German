import { describe, expect, it } from 'vitest'

import { getCurriculum, getCurriculumVersion, isLevelLoaded, LEVELS_WITH_CONTENT, loadAllLevels, loadLevel, subscribeToCurriculum } from './curriculum'

describe('curriculum registry', () => {
  it('knows which levels have content without loading anything', () => {
    expect(LEVELS_WITH_CONTENT).toEqual(['A1', 'A2'])
  })

  it('reports every CEFR level, with content only where it is authored', async () => {
    await loadAllLevels()
    const byLevel = Object.fromEntries(getCurriculum().map((entry) => [entry.level, entry.modules.length]))

    expect(Object.keys(byLevel)).toEqual(['A1', 'A2', 'B1', 'B2'])
    expect(byLevel.A1).toBeGreaterThan(0)
    expect(byLevel.A2).toBeGreaterThan(0)
    expect(byLevel.B1).toBe(0)
    expect(byLevel.B2).toBe(0)
  })

  it('treats a level with no authored content as already loaded', () => {
    expect(isLevelLoaded('B1')).toBe(true)
    expect(isLevelLoaded('B2')).toBe(true)
  })

  it('loading a level twice does nothing the second time', async () => {
    await loadLevel('A1')
    const before = getCurriculumVersion()
    const snapshot = getCurriculum()

    await loadLevel('A1')

    expect(getCurriculumVersion()).toBe(before)
    expect(getCurriculum()).toBe(snapshot)
  })

  it('gives the same snapshot until something changes, so subscribers can compare by identity', () => {
    expect(getCurriculum()).toBe(getCurriculum())
  })

  it('lets a listener subscribe and unsubscribe', () => {
    const unsubscribe = subscribeToCurriculum(() => undefined)
    expect(typeof unsubscribe).toBe('function')
    unsubscribe()
  })
})
