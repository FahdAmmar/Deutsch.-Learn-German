import { beforeEach, describe, expect, it } from 'vitest'

import { GRAMMAR_PASS_ACCURACY, useGrammarProgressStore } from './grammarProgressStore'

describe('grammarProgressStore', () => {
  beforeEach(() => {
    useGrammarProgressStore.getState().resetGrammarProgress()
  })

  it('starts empty', () => {
    expect(useGrammarProgressStore.getState().rules).toEqual({})
  })

  it('records a visit without marking the rule complete', () => {
    useGrammarProgressStore.getState().visitRule(1)
    const progress = useGrammarProgressStore.getState().rules[1]
    expect(progress?.completed).toBe(false)
    expect(progress?.attempts).toBe(0)
  })

  it('does not complete a rule below the pass mark', () => {
    useGrammarProgressStore.getState().recordQuizResult(1, GRAMMAR_PASS_ACCURACY - 0.1)
    expect(useGrammarProgressStore.getState().rules[1]?.completed).toBe(false)
  })

  it('completes a rule at the pass mark', () => {
    useGrammarProgressStore.getState().recordQuizResult(1, GRAMMAR_PASS_ACCURACY)
    expect(useGrammarProgressStore.getState().rules[1]?.completed).toBe(true)
  })

  it('keeps completion and best accuracy when a later attempt is worse', () => {
    const { recordQuizResult } = useGrammarProgressStore.getState()
    recordQuizResult(1, 0.9)
    recordQuizResult(1, 0.2)
    const progress = useGrammarProgressStore.getState().rules[1]
    expect(progress?.completed).toBe(true)
    expect(progress?.bestAccuracy).toBe(0.9)
    expect(progress?.attempts).toBe(2)
  })

  it('clamps out-of-range accuracy values', () => {
    useGrammarProgressStore.getState().recordQuizResult(2, 5)
    expect(useGrammarProgressStore.getState().rules[2]?.bestAccuracy).toBe(1)
  })

  it('tracks rules independently', () => {
    useGrammarProgressStore.getState().recordQuizResult(1, 1)
    expect(useGrammarProgressStore.getState().rules[2]).toBeUndefined()
  })
})
