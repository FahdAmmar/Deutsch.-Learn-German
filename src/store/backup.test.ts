import { beforeEach, describe, expect, it } from 'vitest'

import { parseProgressBackup } from '@/lib/progressExport'

import { applyBackup, createBackupJson, describeExtras } from './backup'
import { useDictationStore } from './dictationStore'
import { useGrammarProgressStore } from './grammarProgressStore'
import { useMyTextStore } from './myTextStore'
import { useProgressStore } from './progressStore'
import { useStatsStore } from './statsStore'
import { useStoryQuizStore } from './storyQuizStore'

function resetEverything() {
  window.localStorage.clear()
  useProgressStore.getState().resetProgress()
  useStatsStore.getState().resetStats()
  useMyTextStore.setState({ texts: [] })
  useDictationStore.setState({ stories: {} })
  useGrammarProgressStore.setState({ rules: {} })
  useStoryQuizStore.setState({ quizzes: {} })
}

describe('backup of every learner store', () => {
  beforeEach(resetEverything)

  it('carries the learner’s own texts and results from one device to another', () => {
    useMyTextStore.getState().addText({ title: 'Mein Tag', text: 'Ich lerne Deutsch.', mode: 'sentences', maxWords: 6 })
    useDictationStore.getState().recordRun({ storyId: 'a1-reading-1', level: 'A1', accuracy: 0.9, wpm: 20 })
    useGrammarProgressStore.getState().recordQuizResult(3, 1)
    useStoryQuizStore.getState().recordRun({ storyId: 'a1-reading-1', level: 'A1', accuracy: 0.75 })
    const json = createBackupJson()

    resetEverything()
    const parsed = parseProgressBackup(json)
    expect(parsed.success).toBe(true)
    if (!parsed.success) return
    applyBackup(parsed.data)

    expect(useMyTextStore.getState().texts.map((entry) => entry.title)).toEqual(['Mein Tag'])
    expect(useDictationStore.getState().stories['a1-reading-1']?.bestAccuracy).toBe(0.9)
    expect(useGrammarProgressStore.getState().rules['3']?.completed).toBe(true)
    expect(useStoryQuizStore.getState().quizzes['a1-reading-1']?.attempts).toBe(1)
  })

  it('leaves this device’s texts alone when an older file does not carry any', () => {
    useMyTextStore.getState().addText({ title: 'Bleibt', text: 'Das bleibt hier.', mode: 'lines', maxWords: 6 })
    const older = JSON.parse(createBackupJson())
    delete older.extras

    const parsed = parseProgressBackup(JSON.stringify(older))
    expect(parsed.success).toBe(true)
    if (!parsed.success) return
    applyBackup(parsed.data)

    expect(useMyTextStore.getState().texts.map((entry) => entry.title)).toEqual(['Bleibt'])
  })

  it('names what a file carries, in plain words', () => {
    expect(describeExtras(undefined)).toEqual([])
    expect(describeExtras({ myTexts: [], dictation: {} })).toEqual(['نصوصك الخاصة (0)', 'نتائج الإملاء'])
  })
})
