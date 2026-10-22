import { progressExportSchema, type BackupExtras, type ProgressExport } from './progressExportSchema'
import type { LearningStats, ProgressState } from '@/types'

const EXPORT_VERSION = 1 as const

export function serializeProgress(progress: ProgressState, stats?: LearningStats, extras?: BackupExtras): string {
  const payload: ProgressExport = {
    version: EXPORT_VERSION,
    exportedAt: Date.now(),
    progress,
    ...(stats ? { stats } : {}),
    ...(extras ? { extras } : {}),
  }
  return JSON.stringify(payload, null, 2)
}

export interface ProgressBackup {
  progress: ProgressState
  /** Absent in files exported before learning statistics existed. */
  stats?: LearningStats
  /** The learner's own texts and the other progress stores; absent in files exported before they were included. */
  extras?: BackupExtras
}

export type { BackupExtras }

export type ParseBackupResult = { success: true; data: ProgressBackup } | { success: false; error: string }

export type ParseProgressResult =
  | { success: true; data: ProgressState }
  | { success: false; error: string }

/**
 * Parses and validates a backup file. Never throws — always returns a
 * discriminated result so the caller (a Settings-page import button) can show
 * a clear message instead of the app crashing on a malformed or malicious file.
 */
export function parseProgressBackup(raw: string): ParseBackupResult {
  let json: unknown
  try {
    json = JSON.parse(raw)
  } catch {
    return { success: false, error: 'الملف ليس بصيغة JSON صالحة.' }
  }

  const result = progressExportSchema.safeParse(json)
  if (!result.success) {
    return { success: false, error: 'صيغة الملف لا تطابق تنسيق تصدير التقدّم المتوقّع.' }
  }

  return { success: true, data: { progress: result.data.progress, stats: result.data.stats, extras: result.data.extras } }
}

/** Progress only, for callers that do not care about statistics. */
export function parseProgressImport(raw: string): ParseProgressResult {
  const result = parseProgressBackup(raw)
  return result.success ? { success: true, data: result.data.progress } : result
}
