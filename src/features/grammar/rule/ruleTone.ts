import type { RuleTone } from '@/types'

/**
 * Maps a semantic tone onto design-token Tailwind classes. Every value is
 * a literal string so Tailwind's scanner picks the classes up; nothing
 * here (or anywhere in the rule renderer) hardcodes a colour, so both
 * themes keep working automatically.
 */
export interface ToneClasses {
  /** Coloured text on the normal surface. */
  text: string
  /** Soft tinted background with its matching text — badges, chips, highlights. */
  soft: string
  /** Solid fill with its foreground — the active state of a toggle. */
  solid: string
  /** Inline-start accent bar for rule boxes (flips correctly in RTL). */
  barStart: string
  /** Top accent bar for cards. */
  barTop: string
  /** Subtle tinted border. */
  border: string
}

export const TONE_CLASSES: Record<RuleTone, ToneClasses> = {
  primary: {
    text: 'text-primary',
    soft: 'bg-primary-muted text-primary',
    solid: 'bg-primary text-primary-foreground',
    barStart: 'border-s-primary',
    barTop: 'border-t-primary',
    border: 'border-primary/30',
  },
  accent: {
    text: 'text-accent',
    soft: 'bg-accent-muted text-accent',
    solid: 'bg-accent text-accent-foreground',
    barStart: 'border-s-accent',
    barTop: 'border-t-accent',
    border: 'border-accent/30',
  },
  plum: {
    text: 'text-plum',
    soft: 'bg-plum-muted text-plum',
    solid: 'bg-plum text-plum-foreground',
    barStart: 'border-s-plum',
    barTop: 'border-t-plum',
    border: 'border-plum/30',
  },
  highlight: {
    text: 'text-highlight',
    soft: 'bg-highlight-muted text-highlight',
    solid: 'bg-highlight text-highlight-foreground',
    barStart: 'border-s-highlight',
    barTop: 'border-t-highlight',
    border: 'border-highlight/30',
  },
  success: {
    text: 'text-success',
    soft: 'bg-success-muted text-success',
    solid: 'bg-success text-success-foreground',
    barStart: 'border-s-success',
    barTop: 'border-t-success',
    border: 'border-success/30',
  },
  error: {
    text: 'text-error',
    soft: 'bg-error-muted text-error',
    solid: 'bg-error text-error-foreground',
    barStart: 'border-s-error',
    barTop: 'border-t-error',
    border: 'border-error/30',
  },
  der: {
    text: 'text-der',
    soft: 'bg-der-muted text-der',
    solid: 'bg-der text-bg',
    barStart: 'border-s-der',
    barTop: 'border-t-der',
    border: 'border-der/30',
  },
  die: {
    text: 'text-die',
    soft: 'bg-die-muted text-die',
    solid: 'bg-die text-bg',
    barStart: 'border-s-die',
    barTop: 'border-t-die',
    border: 'border-die/30',
  },
  das: {
    text: 'text-das',
    soft: 'bg-das-muted text-das',
    solid: 'bg-das text-bg',
    barStart: 'border-s-das',
    barTop: 'border-t-das',
    border: 'border-das/30',
  },
}
