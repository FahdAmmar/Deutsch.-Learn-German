import type { BadgeTone } from '@/components/ui'

const ROTATION: BadgeTone[] = ['accent', 'highlight', 'plum', 'primary']

/** Same category always gets the same colour; different categories spread across the rotation for visual variety. */
export function categoryTone(category: string): BadgeTone {
  let hash = 0
  for (let i = 0; i < category.length; i += 1) {
    hash = (hash * 31 + category.charCodeAt(i)) >>> 0
  }
  return ROTATION[hash % ROTATION.length]
}
