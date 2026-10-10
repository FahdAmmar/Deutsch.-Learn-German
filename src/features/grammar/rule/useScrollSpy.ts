import { useEffect, useState } from 'react'

/**
 * Returns the id of the section currently crossing the reading band near
 * the top of the viewport. Degrades to "no active section" where
 * IntersectionObserver is unavailable (e.g. jsdom) instead of throwing.
 */
export function useScrollSpy(ids: readonly string[]): string | null {
  const [activeId, setActiveId] = useState<string | null>(null)
  const key = ids.join('|')

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return

    const visible = new Set<string>()
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id)
          else visible.delete(entry.target.id)
        }
        // Document order decides ties, so the earliest visible section wins.
        const first = key.split('|').find((id) => visible.has(id))
        if (first) setActiveId(first)
      },
      { rootMargin: '-15% 0px -65% 0px' },
    )

    for (const id of key.split('|')) {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    }
    return () => observer.disconnect()
  }, [key])

  return activeId
}
