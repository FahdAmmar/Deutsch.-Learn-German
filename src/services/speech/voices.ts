import type { VoiceInfo } from './types'

function normalise(tag: string): string {
  return tag.replace('_', '-').toLowerCase()
}

function primaryLanguage(tag: string): string {
  return normalise(tag).split('-')[0]
}

/** Neural / "natural" voices sound far better than the default engine; the engines advertise it only in the name. */
const QUALITY_NAME = /natural|neural|premium|enhanced|wavenet/i

/** How good a match a voice is for a language — higher is better. 0 means it cannot speak the language. */
export function scoreVoice(voice: VoiceInfo, language: string): number {
  if (primaryLanguage(voice.lang) !== primaryLanguage(language)) return 0
  let score = 1
  if (normalise(voice.lang) === normalise(language)) score += 3
  if (QUALITY_NAME.test(voice.name)) score += 3
  if (/online/i.test(voice.name)) score += 1
  return score
}

/**
 * Picks the voice to speak `language` with. A voice the learner chose wins, but
 * only if it speaks that language (a German sentence read by an Arabic voice
 * is unintelligible); otherwise the best-scoring voice for the language, or
 * `undefined` to let the browser use its own default.
 */
export function chooseVoice<T extends VoiceInfo>(voices: readonly T[], language: string, preferredURI: string | null): T | undefined {
  if (preferredURI) {
    const preferred = voices.find((voice) => voice.voiceURI === preferredURI)
    if (preferred && scoreVoice(preferred, language) > 0) return preferred
  }

  let best: T | undefined
  let bestScore = 0
  for (const voice of voices) {
    const score = scoreVoice(voice, language)
    if (score > bestScore) {
      best = voice
      bestScore = score
    }
  }
  return best
}

/** Voices that speak a language, best first, for a picker. */
export function voicesForLanguage<T extends VoiceInfo>(voices: readonly T[], language: string): T[] {
  return voices
    .filter((voice) => scoreVoice(voice, language) > 0)
    .sort((a, b) => scoreVoice(b, language) - scoreVoice(a, language) || a.name.localeCompare(b.name))
}
