import { Clock } from 'lucide-react'

import { formatClock } from '@/lib/exam/score'

import { useCountdown } from './useCountdown'

interface ExamTimerProps {
  totalSeconds: number
  /** Called once when the time is up. */
  onElapsed: () => void
}

/** The clock of a running attempt. It exists only while the attempt runs, so every attempt starts a fresh countdown. */
export function ExamTimer({ totalSeconds, onElapsed }: ExamTimerProps) {
  const remaining = useCountdown(totalSeconds, onElapsed)
  return (
    <p className="tnum flex items-center gap-1.5 text-sm font-semibold text-ink" role="timer" aria-label="الوقت المتبقي">
      <Clock size={16} aria-hidden="true" />
      {formatClock(remaining)}
    </p>
  )
}
