import { describe, expect, it } from 'vitest'

import { getStepKeyForPath } from './activeStepKey'

describe('getStepKeyForPath', () => {
  it('turns a lesson, a grammar rule and a text address into their plan step', () => {
    expect(getStepKeyForPath('/lessons/a1/alphabet')).toBe('lesson:a1-m01-l03')
    expect(getStepKeyForPath('/grammar/a1/03-praesens')).toBe('rule:3')
    expect(getStepKeyForPath('/levels/a1/texts/a1-read-02')).toBe('story:a1-read-02')
  })

  it('also recognises the quiz, dictation and role-play pages of a text', () => {
    expect(getStepKeyForPath('/levels/a1/texts/a1-read-02/quiz')).toBe('story:a1-read-02')
    expect(getStepKeyForPath('/levels/a2/texts/dialogue-a2-zuckerfest/diktat')).toBe('story:dialogue-a2-zuckerfest')
  })

  it('knows nothing about other pages, unknown lessons or unknown levels', () => {
    expect(getStepKeyForPath('/dashboard')).toBeUndefined()
    expect(getStepKeyForPath('/levels')).toBeUndefined()
    expect(getStepKeyForPath('/lessons/a1/does-not-exist')).toBeUndefined()
    expect(getStepKeyForPath('/lessons/z9/alphabet')).toBeUndefined()
  })
})
