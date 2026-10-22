import { beforeEach, describe, expect, it } from 'vitest'

import { MAX_SAVED_TEXTS } from '@/lib/myText/limits'

import { selectMyText, useMyTextStore, type MyTextDraft } from './myTextStore'

const draft = (overrides: Partial<MyTextDraft> = {}): MyTextDraft => ({
  title: 'Mein Tag',
  text: 'Ich lerne Deutsch.',
  mode: 'phrases',
  maxWords: 6,
  ...overrides,
})

const STORAGE_KEY = 'learn-german:my-texts'

describe('myTextStore', () => {
  beforeEach(() => {
    window.localStorage.clear()
    useMyTextStore.setState({ texts: [] })
  })

  it('adds a text with no results yet, newest first', () => {
    const first = useMyTextStore.getState().addText(draft({ title: 'Eins' }))
    const second = useMyTextStore.getState().addText(draft({ title: 'Zwei' }))

    expect(first).toMatchObject({ title: 'Eins', attempts: 0, bestAccuracy: 0, bestWpm: 0, lastPlayedAt: null })
    expect(useMyTextStore.getState().texts.map((entry) => entry.title)).toEqual(['Zwei', 'Eins'])
    expect(first?.id).not.toBe(second?.id)
  })

  it('refuses a new text once the library is full', () => {
    for (let index = 0; index < MAX_SAVED_TEXTS; index += 1) useMyTextStore.getState().addText(draft())
    expect(useMyTextStore.getState().addText(draft())).toBeNull()
    expect(useMyTextStore.getState().texts).toHaveLength(MAX_SAVED_TEXTS)
  })

  it('counts runs and only ever raises the best accuracy and speed', () => {
    const { id } = useMyTextStore.getState().addText(draft())!
    useMyTextStore.getState().recordRun(id, { accuracy: 0.9, wpm: 20 })
    useMyTextStore.getState().recordRun(id, { accuracy: 0.7, wpm: 35 })

    expect(selectMyText(id)(useMyTextStore.getState())).toMatchObject({ attempts: 2, bestAccuracy: 0.9, bestWpm: 35 })
  })

  it('clamps nonsense results', () => {
    const { id } = useMyTextStore.getState().addText(draft())!
    useMyTextStore.getState().recordRun(id, { accuracy: 4, wpm: -3 })
    expect(selectMyText(id)(useMyTextStore.getState())).toMatchObject({ bestAccuracy: 1, bestWpm: 0 })
  })

  it('keeps the results when only the title or split changes, and clears them when the words change', () => {
    const { id } = useMyTextStore.getState().addText(draft())!
    useMyTextStore.getState().recordRun(id, { accuracy: 0.9, wpm: 20 })

    useMyTextStore.getState().updateText(id, draft({ title: 'Neuer Titel', mode: 'sentences' }))
    expect(selectMyText(id)(useMyTextStore.getState())).toMatchObject({ title: 'Neuer Titel', mode: 'sentences', attempts: 1, bestAccuracy: 0.9 })

    useMyTextStore.getState().updateText(id, draft({ text: 'Ich lerne gern Deutsch.' }))
    expect(selectMyText(id)(useMyTextStore.getState())).toMatchObject({ text: 'Ich lerne gern Deutsch.', attempts: 0, bestAccuracy: 0, lastPlayedAt: null })
  })

  it('removes a text', () => {
    const { id } = useMyTextStore.getState().addText(draft())!
    useMyTextStore.getState().removeText(id)
    expect(useMyTextStore.getState().texts).toEqual([])
  })

  const seedStorage = (texts: unknown[]) => window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ state: { texts }, version: 0 }))
  const storedEntry = (overrides: Record<string, unknown> = {}) => ({
    id: 'seed-1',
    title: 'Gespeichert',
    text: 'Ich lerne Deutsch.',
    mode: 'phrases',
    maxWords: 6,
    createdAt: 1,
    updatedAt: 2,
    attempts: 2,
    bestAccuracy: 0.9,
    bestWpm: 30,
    lastPlayedAt: 5,
    ...overrides,
  })

  it('writes every change to storage', () => {
    useMyTextStore.getState().addText(draft({ title: 'Gespeichert' }))
    expect(window.localStorage.getItem(STORAGE_KEY)).toContain('Gespeichert')
  })

  it('loads the saved texts back, results included', async () => {
    seedStorage([storedEntry()])
    await useMyTextStore.persist.rehydrate()
    // A text saved before the stages existed has none stored: it comes back at the first stage, not yet due.
    expect(useMyTextStore.getState().texts).toEqual([{ ...storedEntry(), stage: 'copy', box: 0, dueAt: null }])
  })

  it('keeps the stage, the review box and the due date of a text that has them', async () => {
    seedStorage([storedEntry({ stage: 'initials', box: 2, dueAt: 12345 })])
    await useMyTextStore.persist.rehydrate()
    expect(useMyTextStore.getState().texts[0]).toMatchObject({ stage: 'initials', box: 2, dueAt: 12345 })
  })

  it('starts with an empty library when storage is corrupted instead of failing', async () => {
    window.localStorage.setItem(STORAGE_KEY, '{not json')
    await useMyTextStore.persist.rehydrate()
    expect(useMyTextStore.getState().texts).toEqual([])
  })

  it('loses only a damaged entry when storage is partly corrupted', async () => {
    seedStorage([storedEntry({ id: 'good' }), { id: 'broken', mode: 'nope' }, storedEntry({ id: 'good-2' })])
    await useMyTextStore.persist.rehydrate()
    expect(useMyTextStore.getState().texts.map((entry) => entry.id)).toEqual(['good', 'good-2'])
  })
})

describe('myTextStore — stages and review', () => {
  beforeEach(() => {
    window.localStorage.clear()
    useMyTextStore.setState({ texts: [] })
  })

  const add = () => useMyTextStore.getState().addText({ title: 'Mein Tag', text: 'Ich lerne Deutsch.', mode: 'sentences', maxWords: 6 })!
  const current = (id: string) => useMyTextStore.getState().texts.find((entry) => entry.id === id)!

  it('starts at the first stage, not due', () => {
    const text = add()
    expect(current(text.id)).toMatchObject({ stage: 'copy', box: 0, dueAt: null })
  })

  it('moves up a stage after a pass of that stage, and stays after a miss', () => {
    const { id } = add()
    useMyTextStore.getState().recordRun(id, { accuracy: 0.8, wpm: 20 })
    expect(current(id).stage).toBe('copy')

    useMyTextStore.getState().recordRun(id, { accuracy: 0.95, wpm: 20 })
    expect(current(id).stage).toBe('cloze')
  })

  it('does not move the text up for a run at a different stage than the one it has reached', () => {
    const { id } = add()
    useMyTextStore.getState().recordRun(id, { accuracy: 1, wpm: 20 }, 'memory')
    expect(current(id).stage).toBe('copy')
    expect(current(id).attempts).toBe(1)
  })

  it('schedules the review once the text is passed from memory', () => {
    const { id } = add()
    for (let pass = 0; pass < 4; pass += 1) useMyTextStore.getState().recordRun(id, { accuracy: 1, wpm: 20 })
    const text = current(id)
    expect(text.stage).toBe('memory')
    expect(text.box).toBe(1)
    expect(text.dueAt).toBeGreaterThan(Date.now())
  })

  it('goes back to the first stage when the words of the text change, but not for a new title', () => {
    const { id } = add()
    useMyTextStore.getState().recordRun(id, { accuracy: 1, wpm: 20 })
    expect(current(id).stage).toBe('cloze')

    useMyTextStore.getState().updateText(id, { title: 'Neuer Titel', text: 'Ich lerne Deutsch.', mode: 'sentences', maxWords: 6 })
    expect(current(id).stage).toBe('cloze')

    useMyTextStore.getState().updateText(id, { title: 'Neuer Titel', text: 'Ich lerne Arabisch.', mode: 'sentences', maxWords: 6 })
    expect(current(id)).toMatchObject({ stage: 'copy', box: 0, dueAt: null, attempts: 0 })
  })
})
