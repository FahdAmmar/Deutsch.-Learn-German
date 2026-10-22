import { act, renderHook } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import {
  RecognitionError,
  type ListenOptions,
  type RecognitionResult,
  type SpeechRecognizer,
} from '@/services/recognition'

import { useSpeechRecognition } from './useSpeechRecognition'

/** A recogniser the test settles by hand, so each listening can be answered, failed or left hanging. */
function controlledRecognizer() {
  const pending: Array<{
    options: ListenOptions | undefined
    resolve: (result: RecognitionResult) => void
    reject: (error: unknown) => void
  }> = []
  const recognizer: SpeechRecognizer = {
    isSupported: () => true,
    listen: (options) =>
      new Promise<RecognitionResult>((resolve, reject) => {
        pending.push({ options, resolve, reject })
      }),
  }
  return { recognizer, pending }
}

const heard = (transcript: string): RecognitionResult => ({ transcript, confidence: 0.9, alternatives: [] })

describe('useSpeechRecognition', () => {
  it('goes from listening to the result', async () => {
    const { recognizer, pending } = controlledRecognizer()
    const { result } = renderHook(() => useSpeechRecognition(recognizer))
    expect(result.current.phase).toBe('idle')

    let done!: Promise<RecognitionResult | null>
    act(() => {
      done = result.current.start()
    })
    expect(result.current.phase).toBe('listening')

    let returned: RecognitionResult | null = null
    await act(async () => {
      pending[0].resolve(heard('hallo'))
      returned = await done
    })
    expect(returned).toMatchObject({ transcript: 'hallo' })
    expect(result.current).toMatchObject({ phase: 'done', result: { transcript: 'hallo' } })
  })

  it('reports why listening failed, as a code the screen can act on', async () => {
    const { recognizer, pending } = controlledRecognizer()
    const { result } = renderHook(() => useSpeechRecognition(recognizer))

    let done!: Promise<RecognitionResult | null>
    act(() => {
      done = result.current.start()
    })
    await act(async () => {
      pending[0].reject(new RecognitionError('not-allowed'))
      await done
    })
    expect(result.current).toMatchObject({ phase: 'error', error: 'not-allowed' })
  })

  it('treats a stop by the learner as going back to idle, not as an error', async () => {
    const { recognizer, pending } = controlledRecognizer()
    const { result } = renderHook(() => useSpeechRecognition(recognizer))

    let done!: Promise<RecognitionResult | null>
    act(() => {
      done = result.current.start()
    })
    act(() => result.current.cancel())
    expect(pending[0].options?.signal?.aborted).toBe(true)
    await act(async () => {
      pending[0].reject(new RecognitionError('aborted'))
      await done
    })
    expect(result.current.phase).toBe('idle')
  })

  it('drops the answer of a listening that was replaced by a newer one', async () => {
    const { recognizer, pending } = controlledRecognizer()
    const { result } = renderHook(() => useSpeechRecognition(recognizer))

    let first!: Promise<RecognitionResult | null>
    let second!: Promise<RecognitionResult | null>
    act(() => {
      first = result.current.start()
    })
    act(() => {
      second = result.current.start()
    })
    expect(pending[0].options?.signal?.aborted).toBe(true)

    await act(async () => {
      pending[1].resolve(heard('zweite'))
      await second
      pending[0].resolve(heard('erste'))
      await first
    })
    expect(result.current.result?.transcript).toBe('zweite')
    // The replaced listening hands back nothing, so its answer cannot land on the wrong card.
    await expect(first).resolves.toBeNull()
  })

  it('stops listening when the page is left', () => {
    const { recognizer, pending } = controlledRecognizer()
    const { result, unmount } = renderHook(() => useSpeechRecognition(recognizer))
    act(() => {
      void result.current.start()
    })
    unmount()
    expect(pending[0].options?.signal?.aborted).toBe(true)
  })
})
