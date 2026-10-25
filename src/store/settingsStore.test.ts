import { beforeEach, describe, expect, it } from 'vitest'

import { DEFAULT_PREFERENCES } from '@/types/settings'

import { useSettingsStore } from './settingsStore'

const STORAGE_KEY = 'learn-german:preferences'

describe('settingsStore', () => {
  beforeEach(() => {
    window.localStorage.clear()
    useSettingsStore.getState().resetToDefaults()
  })

  it('fills preferences added after the user saved their settings from the defaults', async () => {
    // Shape written by an earlier version: no `showTranslations`.
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ state: { settings: { autoPlayPronunciation: true, speechRate: 1.2, reducedMotion: true } }, version: 0 }),
    )

    await useSettingsStore.persist.rehydrate()

    const { settings } = useSettingsStore.getState()
    expect(settings.speechRate).toBe(1.2)
    expect(settings.autoPlayPronunciation).toBe(true)
    expect(settings.reducedMotion).toBe(true)
    expect(settings.showTranslations).toBe(DEFAULT_PREFERENCES.showTranslations)
    expect(settings.showTranslations).toBe(true)
  })

  it('turns grammar hints on for a learner whose saved settings predate them, and persists the choice', async () => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ state: { settings: { speechRate: 1.1 } }, version: 0 }))
    await useSettingsStore.persist.rehydrate()
    expect(useSettingsStore.getState().settings.showGrammarHints).toBe(true)

    useSettingsStore.getState().setShowGrammarHints(false)
    expect(useSettingsStore.getState().settings.showGrammarHints).toBe(false)
    expect(window.localStorage.getItem(STORAGE_KEY)).toContain('"showGrammarHints":false')
  })

  it('turns the lock-screen controls on for a learner whose saved settings predate them, and persists the choice', async () => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ state: { settings: { speechRate: 1.1 } }, version: 0 }))
    await useSettingsStore.persist.rehydrate()
    expect(useSettingsStore.getState().settings.lockScreenControls).toBe(true)

    useSettingsStore.getState().setLockScreenControls(false)
    expect(useSettingsStore.getState().settings.lockScreenControls).toBe(false)
    expect(window.localStorage.getItem(STORAGE_KEY)).toContain('"lockScreenControls":false')
  })

  it('persists the translation preference', () => {
    useSettingsStore.getState().setShowTranslations(false)
    expect(useSettingsStore.getState().settings.showTranslations).toBe(false)
    expect(window.localStorage.getItem(STORAGE_KEY)).toContain('"showTranslations":false')
  })
})
