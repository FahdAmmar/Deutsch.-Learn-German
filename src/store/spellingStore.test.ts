import { beforeEach, describe, expect, it } from 'vitest'

import type { SpellingSlip } from '@/types'

import { MAX_WEAK_WORDS, selectKindCounts, selectWeakWords, useSpellingStore } from './spellingStore'

const slip = (word: string, kind: SpellingSlip['kind'] = 'umlaut'): SpellingSlip => ({ kind, word, expected: 'ä', typed: 'a' })

describe('spellingStore', () => {
  beforeEach(() => {
    window.localStorage.clear()
    useSpellingStore.getState().resetSpelling()
  })

  it('counts each kind and each mistyped word', () => {
    useSpellingStore.getState().recordSlips([slip('Mädchen'), slip('Mädchen'), slip('Straße', 'eszett')], 100)

    const state = useSpellingStore.getState()
    expect(selectKindCounts(state)).toEqual([
      { kind: 'umlaut', count: 2 },
      { kind: 'eszett', count: 1 },
    ])
    expect(selectWeakWords(state)[0]).toMatchObject({ word: 'Mädchen', count: 2, lastAt: 100, kind: 'umlaut' })
  })

  it('puts the word with most mistakes first, then the most recent', () => {
    const store = useSpellingStore.getState()
    store.recordSlips([slip('alt')], 1)
    store.recordSlips([slip('neu')], 2)
    store.recordSlips([slip('viel'), slip('viel')], 0)

    expect(selectWeakWords(useSpellingStore.getState()).map((entry) => entry.word)).toEqual(['viel', 'neu', 'alt'])
  })

  it('takes one off a word typed right, and drops it at zero — but never one that slipped again', () => {
    const store = useSpellingStore.getState()
    store.recordSlips([slip('Mädchen'), slip('Mädchen'), slip('Tür')], 1)

    store.recordPractice(['Mädchen', 'Tür'], ['Tür'])

    const words = useSpellingStore.getState().words
    expect(words['Mädchen'].count).toBe(1)
    expect(words['Tür'].count).toBe(1)

    store.recordPractice(['Mädchen'], [])
    expect(useSpellingStore.getState().words['Mädchen']).toBeUndefined()
  })

  it('keeps the list to a size worth practising, dropping the least stubborn words', () => {
    const slips = Array.from({ length: MAX_WEAK_WORDS + 5 }, (_, index) => slip(`Wort${index}`))
    useSpellingStore.getState().recordSlips([...slips, slip('Wort0')], 1)

    const words = useSpellingStore.getState().words
    expect(Object.keys(words)).toHaveLength(MAX_WEAK_WORDS)
    expect(words['Wort0'].count).toBe(2)
  })

  it('records nothing for a run without mistakes', () => {
    useSpellingStore.getState().recordSlips([])
    expect(useSpellingStore.getState().words).toEqual({})
  })

  it('starts fresh from a damaged stored entry', async () => {
    window.localStorage.setItem('spelling-weak-spots', JSON.stringify({ state: { kinds: { umlaut: 'many' }, words: 3 }, version: 0 }))
    await useSpellingStore.persist.rehydrate()
    expect(useSpellingStore.getState().words).toEqual({})
  })
})
