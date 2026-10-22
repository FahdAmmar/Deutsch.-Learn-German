import type { SoundCue } from '@/services/sound/types'

import type { LastKey } from './session'

/**
 * Which sound answers a judged key press. A right letter is a soft tick (it
 * has to keep up with fast typing), finishing a part is a short chime, the
 * last part of the text is the full fanfare, and a wrong letter is the low
 * tone — never silence, so a mistake is heard as well as seen.
 */
export function soundCueFor({ outcome, finalSegment }: LastKey): SoundCue {
  switch (outcome) {
    case 'wrong':
      return 'wrong'
    case 'complete':
      return finalSegment ? 'complete' : 'correct'
    case 'correct':
    case 'partial':
      return 'key'
  }
}
