import { InlineMarkup } from '@/components/ui'
import type { RuleTone } from '@/types'

import { TONE_CLASSES } from './ruleTone'

interface RichTextProps {
  text: string
  /** How `**bold**` segments are drawn: plain emphasis, or a tinted highlight (used on German sentences). */
  boldAs?: 'strong' | 'mark'
  tone?: RuleTone
  /** The text is a German phrase or sentence: its der / die / das are coloured. */
  german?: boolean
}

/** Grammar-rule flavour of `InlineMarkup`: highlights take the rule's tone colour. */
export function RichText({ text, boldAs = 'strong', tone = 'accent', german = false }: RichTextProps) {
  return <InlineMarkup text={text} boldAs={boldAs} markClassName={TONE_CLASSES[tone].soft} german={german} />
}
