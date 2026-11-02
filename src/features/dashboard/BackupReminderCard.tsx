import { Download } from 'lucide-react'
import { useEffect, useState } from 'react'

import { Button, Card } from '@/components/ui'
import { MIN_LESSONS_FOR_REMINDER, shouldRemindBackup } from '@/lib/backupReminder'
import { downloadBackup } from '@/store/backupDownload'
import { useBackupReminderStore } from '@/store/backupReminderStore'
import { useProgressStore } from '@/store/progressStore'

/**
 * Progress is kept in this browser only, so clearing its data (or changing device) would lose it. After a few lessons
 * the card first stays quiet for a week, then asks for a backup file, and asks again when the last one is two weeks old.
 */
export function BackupReminderCard() {
  const completedLessons = useProgressStore((state) => Object.values(state.lessons).filter((lesson) => lesson.completed).length)
  const { armedAt, lastExportAt, snoozedUntil, arm, snooze } = useBackupReminderStore()
  // The clock is read once when the card appears: the reminder is about days, not about what happens while the page is open.
  const [now] = useState(() => Date.now())

  useEffect(() => {
    if (completedLessons >= MIN_LESSONS_FOR_REMINDER) arm()
  }, [completedLessons, arm])

  if (!shouldRemindBackup({ now, completedLessons, armedAt, lastExportAt, snoozedUntil })) return null

  return (
    <Card tone="tint">
      <div dir="rtl" className="space-y-3 p-4 sm:px-5">
        <div className="flex items-start gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-primary-muted text-primary">
            <Download size={22} aria-hidden="true" />
          </span>
          <div className="min-w-0 space-y-1">
            <p className="font-semibold text-ink">احفظ نسخة من تقدّمك</p>
            <p className="text-sm leading-7 text-ink-muted">
              تقدّمك محفوظ في هذا المتصفح فقط، فإن مسحتَ بياناته أو انتقلتَ إلى جهاز آخر ضاع. حمّل ملفاً احتياطياً الآن، ويمكنك استعادته
              من الإعدادات.
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button size="sm" onClick={downloadBackup} icon={<Download size={16} aria-hidden="true" />}>
            حمّل نسخة الآن
          </Button>
          <Button size="sm" variant="ghost" onClick={() => snooze()}>
            ذكّرني بعد أسبوع
          </Button>
        </div>
      </div>
    </Card>
  )
}
