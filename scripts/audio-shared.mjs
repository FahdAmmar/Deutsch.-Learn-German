import { createHash } from 'node:crypto'

/** The file name (without extension) a text's recording is saved under: a short hash of its normalised text. */
export function audioId(normalizedText) {
  return createHash('sha1').update(normalizedText, 'utf8').digest('hex').slice(0, 12)
}

export const AUDIO_EXTENSIONS = ['mp3', 'ogg', 'wav', 'm4a']
