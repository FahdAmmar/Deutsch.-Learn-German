import type { BadgeTone } from './Badge'

/** Maps a German article to the badge tone used for it everywhere in the app. */
export function articleToTone(article: 'der' | 'die' | 'das'): BadgeTone {
  return article
}
