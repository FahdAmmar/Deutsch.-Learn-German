import { useEffect, useState } from 'react'

import { cn } from '@/lib/cn'

export interface LessonSectionLink {
  /** Id of the heading element the link jumps to. */
  id: string
  label: string
}

interface LessonSectionNavProps {
  sections: LessonSectionLink[]
  /** `bar` — scrolling chips under the header (phones/tablets). `rail` — sticky list beside the content (large screens). */
  variant: 'bar' | 'rail'
}

/** Which section heading is currently nearest the top of the viewport. Falls back to the first section where IntersectionObserver is unavailable (jsdom). */
function useActiveSection(ids: string[]): string | undefined {
  const [active, setActive] = useState<string | undefined>(ids[0])
  const key = ids.join('|')

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return
    const elements = key
      .split('|')
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null)
    if (elements.length === 0) return

    const visible = new Set<string>()
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id)
          else visible.delete(entry.target.id)
        }
        // The first heading in document order that is inside the observation band wins.
        const first = elements.find((element) => visible.has(element.id))
        if (first) setActive(first.id)
      },
      { rootMargin: '-110px 0px -65% 0px' },
    )
    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [key])

  return active
}

/**
 * "In this lesson" — jump links to each section, marking the one in view. Render the `bar`
 * variant above the lesson body and the `rail` variant in a sticky side column; each
 * variant hides itself at the breakpoint where the other takes over.
 */
export function LessonSectionNav({ sections, variant }: LessonSectionNavProps) {
  const active = useActiveSection(sections.map((section) => section.id))

  if (variant === 'bar') {
    return (
      <nav
        aria-label="أقسام الدرس"
        className="sticky top-14 z-10 -mx-4 border-b border-border bg-bg/95 backdrop-blur lg:hidden"
      >
        <ul className="flex gap-2 overflow-x-auto px-4 py-2.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {sections.map((section) => (
            <li key={section.id} className="shrink-0">
              <a
                href={`#${section.id}`}
                aria-current={active === section.id ? 'location' : undefined}
                className={cn(
                  'block rounded-full px-3.5 py-1.5 text-sm font-semibold whitespace-nowrap transition-colors',
                  active === section.id ? 'bg-ink text-bg' : 'bg-surface-sunken text-ink-muted hover:text-ink',
                )}
              >
                {section.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    )
  }

  return (
    <nav aria-label="أقسام الدرس" className="sticky top-8 hidden self-start lg:block">
      <p dir="rtl" className="mb-3 text-sm font-bold text-ink">
        في هذا الدرس
      </p>
      <ul dir="rtl" className="space-y-0.5 border-s-2 border-rail">
        {sections.map((section) => (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              aria-current={active === section.id ? 'location' : undefined}
              className={cn(
                '-ms-0.5 block border-s-2 py-1.5 ps-4 text-sm transition-colors',
                active === section.id ? 'border-accent font-bold text-ink' : 'border-transparent text-ink-muted hover:text-ink',
              )}
            >
              {section.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
