import { useEffect, useRef, useState } from 'react'

/**
 * Seconds left, counting down from the moment the component that uses it is mounted. Calls `onElapsed` once at zero.
 * The deadline is a clock time, not a count of ticks, so a background tab or a slow timer cannot make the learner
 * lose or gain time. Mount a fresh component for each attempt and the clock starts again.
 */
export function useCountdown(totalSeconds: number, onElapsed: () => void): number {
  const [remaining, setRemaining] = useState(totalSeconds)
  const elapsed = useRef(onElapsed)
  useEffect(() => {
    elapsed.current = onElapsed
  })

  useEffect(() => {
    const deadline = Date.now() + totalSeconds * 1000
    const timer = window.setInterval(() => {
      const left = Math.max(0, Math.ceil((deadline - Date.now()) / 1000))
      setRemaining(left)
      if (left === 0) {
        window.clearInterval(timer)
        elapsed.current()
      }
    }, 250)
    return () => window.clearInterval(timer)
  }, [totalSeconds])

  return remaining
}
