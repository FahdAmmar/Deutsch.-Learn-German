import { todayKey } from '@/utils/date'
import { downloadTextFile } from '@/utils/download'

import { createBackupJson } from './backup'
import { useBackupReminderStore } from './backupReminderStore'

/** Downloads every learner store as one JSON file, and notes the time so the reminder knows the backup is fresh. */
export function downloadBackup(): void {
  downloadTextFile(`learn-german-progress-${todayKey()}.json`, createBackupJson(), 'application/json')
  useBackupReminderStore.getState().markExported()
}
