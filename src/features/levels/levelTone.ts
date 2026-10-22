import type { BadgeTone } from '@/components/ui'
import type { CEFRLevel } from '@/types'

/** CEFR badge colours from the design system: A1/A2 blue (beginner), B1/B2 amber (intermediate). */
export const LEVEL_TONE: Record<CEFRLevel, BadgeTone> = {
  A1: 'accent',
  A2: 'accent',
  B1: 'plum',
  B2: 'plum',
}

export interface LevelStyle {
  /** Text colour for a level mark on a neutral surface (passes 4.5:1). */
  text: string
  /** Tinted background for a level mark. */
  tint: string
  /** Solid fill for non-text shapes (bars, rings). */
  solid: string
  tone: 'accent' | 'highlight' | 'plum' | 'primary'
}

// Full class names are spelled out so Tailwind can see them at build time.
export const LEVEL_STYLE: Record<CEFRLevel, LevelStyle> = {
  A1: { text: 'text-accent', tint: 'bg-accent-muted', solid: 'bg-accent-vivid', tone: 'accent' },
  A2: { text: 'text-accent', tint: 'bg-accent-muted', solid: 'bg-accent-vivid', tone: 'accent' },
  B1: { text: 'text-plum', tint: 'bg-plum-muted', solid: 'bg-plum-vivid', tone: 'plum' },
  B2: { text: 'text-plum', tint: 'bg-plum-muted', solid: 'bg-plum-vivid', tone: 'plum' },
}
