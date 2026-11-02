import { beforeEach, describe, expect, it } from 'vitest'

import { parseProgressBackup } from '@/lib/progressExport'

import { applyBackup, createBackupJson, describeExtras } from './backup'
import { useDictationStore } from './dictationStore'
import { useExamStore } from './examStore'
import { useGrammarProgressStore } from './grammarProgressStore'
import { useMyTextStore } from './myTextStore'
import { useProgressStore } from './progressStore'
import { useSpellingStore } from './spellingStore'
import { useStatsStore } from './statsStore'
import { useStoryQuizStore } from './storyQuizStore'
import { useWritingStore } from './writingStore'

function resetEverything() {
  window.localStorage.clear()
  useProgressStore.getState().resetProgress()
  useStatsStore.getState().resetStats()
  useMyTextStore.setState({ texts: [] })
  useDictationStore.setState({ stories: {} })
  useGrammarProgressStore.setState({ rules: {} })
  useStoryQuizStore.setState({ quizzes: {} })
  useSpellingStore.getState().resetSpelling()
  useWritingStore.setState({ drafts: {} })
  useExamStore.setState({ results: {} })
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

  it('carries the writing drafts, the exam results and the spelling weak spots too', () => {
    useWritingStore.getState().saveText('a1-write-01-einladung', 'Hallo Anna,')
    useWritingStore.getState().setCompleted('a1-write-01-einladung', true)
    useExamStore.getState().recordAttempt('a1-lesen-1', 0.75, 5000)
    useSpellingStore.getState().recordSlips([{ kind: 'umlaut', word: 'schön', expected: 'ö', typed: 'o' }], 1000)
    const json = createBackupJson()

    resetEverything()
    const parsed = parseProgressBackup(json)
    expect(parsed.success).toBe(true)
    if (!parsed.success) return
    applyBackup(parsed.data)

    const draft = useWritingStore.getState().drafts['a1-write-01-einladung']
    expect(draft?.text).toBe('Hallo Anna,')
    expect(draft?.completed).toBe(true)
    expect(useSpellingStore.getState().words['schön']?.count).toBe(1)
    expect(useExamStore.getState().results['a1-lesen-1']).toEqual({ attempts: 1, best: 0.75, last: 0.75, lastAt: 5000 })
    expect(describeExtras(parsed.data.extras)).toEqual(expect.arrayContaining(['نقاط ضعفك في الإملاء', 'نصوص الكتابة (1)']))
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
