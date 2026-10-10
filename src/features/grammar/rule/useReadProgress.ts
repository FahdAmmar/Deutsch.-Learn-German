import { useEffect, useState } from 'react'

/** Fraction (0–1) of the page scrolled, updated at most once per animation frame. */
export function useReadProgress(): number {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let frame = 0

    function measure() {
      frame = 0
      const scrollable = document.documentElement.scrollHeight - window.innerHeight
      setProgress(scrollable > 0 ? Math.min(Math.max(window.scrollY / scrollable, 0), 1) : 0)
    }

    function onScroll() {
      if (frame === 0) frame = window.requestAnimationFrame(measure)
    }

    measure()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame !== 0) window.cancelAnimationFrame(frame)
    }
  }, [])

  return progress
}
