import { progressExportSchema, type ProgressExport } from './progressExportSchema'
import type { ProgressState } from '@/types'

const EXPORT_VERSION = 1 as const

export function serializeProgress(progress: ProgressState): string {
  const payload: ProgressExport = {
    version: EXPORT_VERSION,
    exportedAt: Date.now(),
    progress,
  }
  return JSON.stringify(payload, null, 2)
}

export type ParseProgressResult =
  | { success: true; data: ProgressState }
  | { success: false; error: string }

/**
 * Parses and validates a progress export file. Never throws — always
 * returns a discriminated result so the caller (a Settings-page import
 * button) can show a clear message instead of the app crashing on a
 * malformed or malicious file.
 */
export function parseProgressImport(raw: string): ParseProgressResult {
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

  return { success: true, data: result.data.progress }
}
