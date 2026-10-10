import type { BadgeTone } from '@/components/ui'
import type { CEFRLevel } from '@/types'

/** Each level gets its own badge colour so the app reads as a progression (A1 → B2), not four identical grey tiles. */
export const LEVEL_TONE: Record<CEFRLevel, BadgeTone> = {
  A1: 'accent',
  A2: 'highlight',
  B1: 'plum',
  B2: 'primary',
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
  A2: { text: 'text-highlight', tint: 'bg-highlight-muted', solid: 'bg-highlight', tone: 'highlight' },
  B1: { text: 'text-plum', tint: 'bg-plum-muted', solid: 'bg-plum-vivid', tone: 'plum' },
  B2: { text: 'text-primary', tint: 'bg-primary-muted', solid: 'bg-primary', tone: 'primary' },
}
