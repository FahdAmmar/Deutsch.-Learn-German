/** Formats a timestamp as a short relative-time string in Arabic, e.g. "قبل ٥ دقائق". */
export function formatRelativeTimeAr(timestamp: number): string {
  const diffMs = Date.now() - timestamp
  const diffMinutes = Math.floor(diffMs / (1000 * 60))
  const diffHours = Math.floor(diffMinutes / 60)
  const diffDays = Math.floor(diffHours / 24)

  if (diffMinutes < 1) return 'الآن'
  if (diffMinutes < 60) return `قبل ${diffMinutes} ${diffMinutes === 1 ? 'دقيقة' : 'دقائق'}`
  if (diffHours < 24) return `قبل ${diffHours} ${diffHours === 1 ? 'ساعة' : 'ساعات'}`
  if (diffDays < 7) return `قبل ${diffDays} ${diffDays === 1 ? 'يوم' : 'أيام'}`

  return new Date(timestamp).toLocaleDateString('ar-EG', { day: 'numeric', month: 'short' })
}
