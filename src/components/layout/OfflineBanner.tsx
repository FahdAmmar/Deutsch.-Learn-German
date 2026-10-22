import { WifiOff } from 'lucide-react'

import { useOnlineStatus } from '@/hooks/useOnlineStatus'

/** A slim notice while the device has no connection, so a failed load or a silent voice is not a mystery. */
export function OfflineBanner() {
  const online = useOnlineStatus()
  if (online) return null

  return (
    <p
      role="status"
      dir="rtl"
      className="flex items-center justify-center gap-2 bg-plum-muted px-4 py-2 text-center text-sm font-medium text-ink"
    >
      <WifiOff size={16} className="shrink-0" aria-hidden="true" />
      أنت غير متصل بالإنترنت. ما حمّلته سابقاً ما زال يعمل، وبعض أصوات النطق قد لا تتوفر.
    </p>
  )
}
