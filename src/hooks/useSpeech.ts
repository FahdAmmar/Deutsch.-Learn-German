import { useCallback, useEffect, useRef, useState } from 'react'

import { GERMAN_LOCALE, speechService } from '@/services/speech'
import { useSettingsStore } from '@/store/settingsStore'

interface UseSpeechResult {
  /** True while this particular hook instance's utterance is playing. */
  isSpeaking: boolean
  isSupported: boolean
  error: string | null
  speak: (text: string, language?: string) => void
  stop: () => void
}

/**
 * Speaks German (or other) text via the speech service, tracking
 * play/error state local to the calling component. Multiple components
 * can use this simultaneously; starting a new utterance anywhere stops
 * whatever was playing before (handled by the underlying service).
 */
export function useSpeech(): UseSpeechResult {
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const speechRate = useSettingsStore((state) => state.settings.speechRate)
  const isMounted = useRef(true)

  useEffect(
    () => () => {
      isMounted.current = false
    },
    [],
  )

  const speak = useCallback(
    (text: string, language: string = GERMAN_LOCALE) => {
      setError(null)
      speechService.speak(text, {
        language,
        rate: speechRate,
        onStart: () => {
          if (isMounted.current) setIsSpeaking(true)
        },
        onEnd: () => {
          if (isMounted.current) setIsSpeaking(false)
        },
        onError: (message) => {
          if (isMounted.current) {
            setIsSpeaking(false)
            setError(message)
          }
        },
      })
    },
    [speechRate],
  )

  const stop = useCallback(() => {
    speechService.stop()
    setIsSpeaking(false)
  }, [])

  return {
    isSpeaking,
    isSupported: speechService.isSupported(),
    error,
    speak,
    stop,
  }
}
