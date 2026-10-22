import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { speechService } from '@/services/speech'
import { useSettingsStore } from '@/store/settingsStore'

import { VoicePicker } from './VoicePicker'

const VOICES = [
  { voiceURI: 'en-1', name: 'Microsoft Zira', lang: 'en-US', localService: true },
  { voiceURI: 'de-1', name: 'Microsoft Hedda', lang: 'de-DE', localService: true },
  { voiceURI: 'de-2', name: 'Microsoft Conrad Online (Natural)', lang: 'de-DE', localService: false },
  { voiceURI: 'ar-1', name: 'Microsoft Hamed', lang: 'ar-SA', localService: false },
]

describe('VoicePicker', () => {
  beforeEach(() => {
    useSettingsStore.getState().resetToDefaults()
    vi.stubGlobal('speechSynthesis', {
      getVoices: () => VOICES,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      speak: vi.fn(),
      cancel: vi.fn(),
    })
  })

  afterEach(() => {
    vi.unstubAllGlobals()
    vi.restoreAllMocks()
  })

  it('lists only the German voices, with an automatic choice selected by default', () => {
    render(<VoicePicker />)

    const radios = screen.getAllByRole('radio')
    expect(radios).toHaveLength(3) // automatic + two German voices
    expect(screen.queryByText('Microsoft Zira')).not.toBeInTheDocument()
    expect(screen.queryByText('Microsoft Hamed')).not.toBeInTheDocument()
    expect(radios[0]).toBeChecked()
  })

  it('puts the best-sounding voice first', () => {
    render(<VoicePicker />)
    const rows = screen.getAllByRole('listitem')
    expect(within(rows[1]).getByText(/Conrad Online/)).toBeInTheDocument()
  })

  it('remembers the chosen voice, and goes back to automatic', async () => {
    const user = userEvent.setup()
    render(<VoicePicker />)

    await user.click(screen.getByRole('radio', { name: /Hedda/ }))
    expect(useSettingsStore.getState().settings.preferredVoiceURI).toBe('de-1')

    await user.click(screen.getByRole('radio', { name: /تلقائي/ }))
    expect(useSettingsStore.getState().settings.preferredVoiceURI).toBeNull()
  })

  it('pins a favourite to the top of the list', async () => {
    const user = userEvent.setup()
    render(<VoicePicker />)

    await user.click(screen.getByRole('button', { name: /إضافة إلى المفضلة: Microsoft Hedda/ }))

    expect(useSettingsStore.getState().settings.favoriteVoiceURIs).toEqual(['de-1'])
    const rows = screen.getAllByRole('listitem')
    expect(within(rows[1]).getByText(/Hedda/)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /إزالة من المفضلة: Microsoft Hedda/ })).toHaveAttribute('aria-pressed', 'true')
  })

  it('previews a voice without choosing it', async () => {
    const speak = vi.spyOn(speechService, 'speak').mockImplementation(() => undefined)
    const user = userEvent.setup()
    render(<VoicePicker />)

    await user.click(screen.getByRole('button', { name: /استمع إلى الصوت Microsoft Hedda/ }))

    expect(speak).toHaveBeenCalledWith(expect.any(String), expect.objectContaining({ language: 'de-DE', voiceURI: 'de-1' }))
    expect(useSettingsStore.getState().settings.preferredVoiceURI).toBeNull()
  })

  it('explains what to do when the browser has no German voice', () => {
    vi.stubGlobal('speechSynthesis', { getVoices: () => [VOICES[0]], addEventListener: vi.fn(), removeEventListener: vi.fn() })
    render(<VoicePicker />)
    expect(screen.getByText(/لم يجد المتصفح أي صوت ألماني/)).toBeInTheDocument()
  })
})
