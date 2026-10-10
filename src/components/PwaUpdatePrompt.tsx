import { RefreshCw, WifiOff } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { registerSW } from 'virtual:pwa-register'

import { Button } from '@/components/ui'

export function PwaUpdatePrompt() {
  const [needRefresh, setNeedRefresh] = useState(false)
  const [offlineReady, setOfflineReady] = useState(false)
  // An imperative handle to trigger the update, not render state — a ref
  // is the correct tool here and avoids an unnecessary extra render.
  const updateSWRef = useRef<((reload?: boolean) => Promise<void>) | null>(null)

  useEffect(() => {
    updateSWRef.current = registerSW({
      onNeedRefresh: () => setNeedRefresh(true),
      onOfflineReady: () => setOfflineReady(true),
    })
  }, [])

  if (needRefresh) {
    return (
      <div
        dir="rtl"
        role="status"
        className="fixed inset-x-4 bottom-20 z-40 flex items-center justify-between gap-3 rounded-lg border border-primary/30 bg-surface p-3 shadow-lg md:inset-x-auto md:end-6 md:bottom-6 md:w-80"
      >
        <div className="flex items-center gap-2.5">
          <RefreshCw size={18} className="shrink-0 text-primary" aria-hidden="true" />
          <p className="text-sm text-ink">يتوفّر تحديث جديد للتطبيق</p>
        </div>
        <Button size="sm" onClick={() => updateSWRef.current?.(true)}>
          تحديث
        </Button>
      </div>
    )
  }

  if (offlineReady) {
    return (
      <div
        dir="rtl"
        role="status"
        className="fixed inset-x-4 bottom-20 z-40 flex items-center gap-2.5 rounded-lg border border-success/30 bg-surface p-3 shadow-lg md:inset-x-auto md:end-6 md:bottom-6 md:w-80"
      >
        <WifiOff size={18} className="shrink-0 text-success" aria-hidden="true" />
        <p className="text-sm text-ink">التطبيق جاهز الآن للعمل بدون اتصال بالإنترنت.</p>
      </div>
    )
  }

  return null
}
