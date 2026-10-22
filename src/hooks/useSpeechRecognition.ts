import { useCallback, useEffect, useRef, useState } from 'react'

import { speechRecognizer as defaultRecognizer, RecognitionError } from '@/services/recognition'
import type { RecognitionErrorCode, RecognitionResult, SpeechRecognizer } from '@/services/recognition'

export type RecognitionPhase = 'idle' | 'listening' | 'done' | 'error'

export interface SpeechRecognitionState {
  phase: RecognitionPhase
  result: RecognitionResult | null
  error: RecognitionErrorCode | null
}

interface UseSpeechRecognition extends SpeechRecognitionState {
  isSupported: boolean
  /**
   * Starts listening; a listening already in progress is stopped first. Resolves with what was heard, or with
   * `null` when listening ended without a result (an error, a stop, or a newer listening taking over).
   */
  start: () => Promise<RecognitionResult | null>
  /** Stops listening without a result. */
  cancel: () => void
}

const IDLE: SpeechRecognitionState = { phase: 'idle', result: null, error: null }

/**
 * One listening at a time. A result that arrives after the learner cancelled, started again or left the page is
 * dropped, so a late answer never lands on the wrong card.
 */
export function useSpeechRecognition(recognizer: SpeechRecognizer = defaultRecognizer): UseSpeechRecognition {
  const [state, setState] = useState<SpeechRecognitionState>(IDLE)
  const controller = useRef<AbortController | null>(null)

  const cancel = useCallback(() => {
    controller.current?.abort()
    controller.current = null
    setState((current) => (current.phase === 'listening' ? IDLE : current))
  }, [])

  // Leaving the page must not leave the microphone open.
  useEffect(() => () => controller.current?.abort(), [])

  const start = useCallback(async (): Promise<RecognitionResult | null> => {
    controller.current?.abort()
    const own = new AbortController()
    controller.current = own
    setState({ phase: 'listening', result: null, error: null })
    try {
      const result = await recognizer.listen({ signal: own.signal })
      if (controller.current !== own) return null
      setState({ phase: 'done', result, error: null })
      return result
    } catch (caught) {
      if (controller.current !== own) return null
      const code = caught instanceof RecognitionError ? caught.code : 'unknown'
      // An abort is the learner's own stop, not a failure to report.
      setState(code === 'aborted' ? IDLE : { phase: 'error', result: null, error: code })
      return null
    } finally {
      if (controller.current === own) controller.current = null
    }
  }, [recognizer])

  return { ...state, isSupported: recognizer.isSupported(), start, cancel }
}
