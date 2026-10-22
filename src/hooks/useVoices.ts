import { useEffect, useState } from 'react'

import { speechService, type VoiceInfo } from '@/services/speech'

/** The speech engine's voices. Browsers load them asynchronously, so the list fills in after the first render. */
export function useVoices(): VoiceInfo[] {
  const [voices, setVoices] = useState<VoiceInfo[]>(() => speechService.getVoices())

  useEffect(() => {
    const refresh = () => setVoices(speechService.getVoices())
    refresh()
    return speechService.onVoicesChanged(refresh)
  }, [])

  return voices
}
