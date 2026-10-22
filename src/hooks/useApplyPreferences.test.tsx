import { render } from '@testing-library/react'
import { act } from 'react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { speechService } from '@/services/speech'
import { useSettingsStore } from '@/store/settingsStore'

import { useApplyPreferences } from './useApplyPreferences'

function Probe() {
  useApplyPreferences()
  return null
}

describe('useApplyPreferences', () => {
  beforeEach(() => {
    useSettingsStore.getState().resetToDefaults()
  })

  afterEach(() => {
    document.documentElement.removeAttribute('style')
    document.documentElement.classList.remove('high-contrast', 'reduce-motion')
    vi.restoreAllMocks()
  })

  it('scales the root font size with the text-size setting', () => {
    render(<Probe />)
    expect(document.documentElement.style.fontSize).toBe('100%')

    act(() => useSettingsStore.getState().setTextScale('large'))
    expect(document.documentElement.style.fontSize).toBe('112.5%')

    act(() => useSettingsStore.getState().setTextScale('xlarge'))
    expect(document.documentElement.style.fontSize).toBe('125%')
  })

  it('toggles the high-contrast and reduced-motion classes', () => {
    render(<Probe />)

    act(() => {
      useSettingsStore.getState().setHighContrast(true)
      useSettingsStore.getState().setReducedMotion(true)
    })
    expect(document.documentElement.classList.contains('high-contrast')).toBe(true)
    expect(document.documentElement.classList.contains('reduce-motion')).toBe(true)

    act(() => useSettingsStore.getState().setHighContrast(false))
    expect(document.documentElement.classList.contains('high-contrast')).toBe(false)
  })

  it('hands the chosen voice to the speech service', () => {
    const setPreferredVoice = vi.spyOn(speechService, 'setPreferredVoice')
    render(<Probe />)

    act(() => useSettingsStore.getState().setPreferredVoiceURI('voice-1'))
    expect(setPreferredVoice).toHaveBeenLastCalledWith('voice-1')
  })
})
