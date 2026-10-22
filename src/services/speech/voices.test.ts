import { describe, expect, it } from 'vitest'

import type { VoiceInfo } from './types'
import { chooseVoice, voicesForLanguage } from './voices'

const voice = (voiceURI: string, name: string, lang: string, localService = true): VoiceInfo => ({ voiceURI, name, lang, localService })

const VOICES: VoiceInfo[] = [
  voice('en', 'Microsoft Zira', 'en-US'),
  voice('de-basic', 'Microsoft Hedda', 'de-DE'),
  voice('de-at', 'Microsoft Michael', 'de-AT'),
  voice('de-natural', 'Microsoft Conrad Online (Natural) - German (Germany)', 'de-DE', false),
  voice('ar', 'Microsoft Hamed Online (Natural)', 'ar-SA', false),
]

describe('chooseVoice', () => {
  it('prefers a natural German voice over the plain one when nothing is chosen', () => {
    expect(chooseVoice(VOICES, 'de-DE', null)?.voiceURI).toBe('de-natural')
  })

  it('prefers an exact locale match over another German locale', () => {
    const plain = VOICES.filter((entry) => !entry.name.includes('Natural'))
    expect(chooseVoice(plain, 'de-DE', null)?.voiceURI).toBe('de-basic')
  })

  it('honours the learner’s choice', () => {
    expect(chooseVoice(VOICES, 'de-DE', 'de-basic')?.voiceURI).toBe('de-basic')
  })

  it('ignores a chosen voice that cannot speak the language', () => {
    // An Arabic voice reading German would be unintelligible.
    expect(chooseVoice(VOICES, 'de-DE', 'ar')?.voiceURI).toBe('de-natural')
  })

  it('falls back to automatic when the chosen voice is no longer installed', () => {
    expect(chooseVoice(VOICES, 'de-DE', 'gone')?.voiceURI).toBe('de-natural')
  })

  it('returns nothing when no voice speaks the language, leaving the browser default', () => {
    expect(chooseVoice([voice('en', 'Zira', 'en-US')], 'de-DE', null)).toBeUndefined()
  })
})

describe('voicesForLanguage', () => {
  it('lists only voices that speak the language, best first', () => {
    expect(voicesForLanguage(VOICES, 'de-DE').map((entry) => entry.voiceURI)).toEqual(['de-natural', 'de-basic', 'de-at'])
  })
})
