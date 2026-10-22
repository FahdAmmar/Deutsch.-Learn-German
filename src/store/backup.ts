import { parseProgressBackup, serializeProgress, type ProgressBackup } from '@/lib/progressExport'
import type { BackupExtras } from '@/lib/progressExportSchema'

import { useDictationStore } from './dictationStore'
import { useGrammarProgressStore } from './grammarProgressStore'
import { useMyTextStore } from './myTextStore'
import { useProgressStore } from './progressStore'
import { selectStats, useStatsStore } from './statsStore'
import { useStoryQuizStore } from './storyQuizStore'

/**
 * The one place that knows which stores make up a learner's backup. A new
 * store that holds something the learner would miss is added here (and to
 * `backupExtrasSchema`) — nothing else needs to change.
 */
export function collectExtras(): BackupExtras {
  return {
    myTexts: useMyTextStore.getState().texts,
    dictation: useDictationStore.getState().stories,
    grammar: useGrammarProgressStore.getState().rules,
    storyQuiz: useStoryQuizStore.getState().quizzes,
  }
}

export function createBackupJson(): string {
  return serializeProgress(useProgressStore.getState(), selectStats(useStatsStore.getState()), collectExtras())
}

/** What a backup file carries beyond lesson progress, in the words shown to the learner before they confirm. */
export function describeExtras(extras: BackupExtras | undefined): string[] {
  if (!extras) return []
  const parts: string[] = []
  if (extras.myTexts) parts.push(`نصوصك الخاصة (${extras.myTexts.length})`)
  if (extras.dictation) parts.push('نتائج الإملاء')
  if (extras.grammar) parts.push('تقدّم القواعد')
  if (extras.storyQuiz) parts.push('نتائج اختبارات النصوص')
  return parts
}

/**
 * Applies a parsed backup. Lesson progress and statistics are replaced as a
 * whole; every other part is replaced only when the file carries it, so an
 * older file never wipes what this device already holds for that part.
 */
export function applyBackup(backup: ProgressBackup): void {
  useProgressStore.getState().replaceProgress(backup.progress)
  // A file from before statistics existed carries none: start them fresh rather than mixing in this device's old numbers.
  useStatsStore.getState().replaceStats(backup.stats ?? { days: {}, byType: {}, byModule: {} })

  const { extras } = backup
  if (!extras) return
  if (extras.myTexts) useMyTextStore.getState().replaceTexts(extras.myTexts)
  if (extras.dictation) useDictationStore.getState().replaceStories(extras.dictation)
  if (extras.grammar) useGrammarProgressStore.getState().replaceRules(extras.grammar)
  if (extras.storyQuiz) useStoryQuizStore.getState().replaceQuizzes(extras.storyQuiz)
}

export { parseProgressBackup }
