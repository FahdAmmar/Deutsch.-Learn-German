import { AlertTriangle, WifiOff } from 'lucide-react'
import { useRouteError } from 'react-router-dom'

import { Button } from '@/components/ui'
import { cn } from '@/lib/cn'
import { isChunkLoadError } from '@/lib/chunkLoad'

interface RouteErrorPageProps {
  /** Rendered outside the app shell, so it has to fill the screen itself. */
  standalone?: boolean
}

/**
 * The router's `errorElement`. React Router catches render errors at the
 * route level, *before* the app-root `ErrorBoundary` sees them, and shows its
 * own developer-facing page unless a route provides this instead. Inside the
 * shell the navigation stays usable, so the learner can leave the broken page.
 */
export function RouteErrorPage({ standalone = false }: RouteErrorPageProps) {
  const error = useRouteError()
  const staleChunk = isChunkLoadError(error)
  const Icon = staleChunk ? WifiOff : AlertTriangle

  return (
    <div
      dir="rtl"
      role="alert"
      className={cn(
        'flex flex-col items-center justify-center gap-4 text-center',
        standalone ? 'min-h-dvh bg-bg p-6' : 'min-h-[50vh]',
      )}
    >
      <span
        className={cn(
          'flex h-14 w-14 items-center justify-center rounded-full',
          staleChunk ? 'bg-surface-sunken text-ink-muted' : 'bg-error-muted text-error',
        )}
      >
        <Icon size={26} aria-hidden="true" />
      </span>
      <h1 className="text-xl font-bold text-ink">
        {staleChunk ? 'تعذّر تحميل هذه الصفحة' : 'حدث خطأ غير متوقّع'}
      </h1>
      <p className="max-w-[44ch] text-ink-muted">
        {staleChunk
          ? 'ربما تحدّث التطبيق أو انقطع الاتصال لحظةً. حدّث الصفحة للمتابعة — تقدّمك المحفوظ على هذا الجهاز لن يتأثر.'
          : 'لم نتمكّن من عرض هذه الصفحة. جرّب تحديث الصفحة أو العودة إلى الرئيسية.'}
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button onClick={() => window.location.reload()}>تحديث الصفحة</Button>
        <Button variant="outline" onClick={() => window.location.assign('/dashboard')}>
          العودة إلى الرئيسية
        </Button>
      </div>
    </div>
  )
}
