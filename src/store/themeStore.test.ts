import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { useThemeStore } from './themeStore'

function mockMatchMedia(prefersDark: boolean) {
  vi.stubGlobal(
    'matchMedia',
    vi.fn().mockImplementation((query: string) => ({
      matches: query.includes('dark') ? prefersDark : false,
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    })),
  )
}

describe('themeStore', () => {
  beforeEach(() => {
    document.documentElement.classList.remove('dark')
    mockMatchMedia(false)
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('applies the dark class to <html> when preference is set to dark', () => {
    useThemeStore.getState().setPreference('dark')

    expect(useThemeStore.getState().resolvedTheme).toBe('dark')
    expect(document.documentElement.classList.contains('dark')).toBe(true)
  })

  it('removes the dark class when preference is set to light', () => {
    useThemeStore.getState().setPreference('dark')
    useThemeStore.getState().setPreference('light')

    expect(useThemeStore.getState().resolvedTheme).toBe('light')
    expect(document.documentElement.classList.contains('dark')).toBe(false)
  })

  it('resolves "system" against the OS preference at the time it is set', () => {
    mockMatchMedia(true)
    useThemeStore.getState().setPreference('system')

    expect(useThemeStore.getState().resolvedTheme).toBe('dark')
    expect(document.documentElement.classList.contains('dark')).toBe(true)
  })

  it('syncWithSystem updates resolvedTheme only while preference is "system"', () => {
    useThemeStore.getState().setPreference('light')
    mockMatchMedia(true)

    useThemeStore.getState().syncWithSystem()

    // Preference is explicitly "light", so a system change should be ignored.
    expect(useThemeStore.getState().resolvedTheme).toBe('light')
  })

  it('syncWithSystem does apply changes when preference is "system"', () => {
    mockMatchMedia(false)
    useThemeStore.getState().setPreference('system')
    expect(useThemeStore.getState().resolvedTheme).toBe('light')

    mockMatchMedia(true)
    useThemeStore.getState().syncWithSystem()

    expect(useThemeStore.getState().resolvedTheme).toBe('dark')
  })

  it('points every theme-color tag at the theme shown, even when the OS prefers the other one', () => {
    for (const media of ['(prefers-color-scheme: light)', '(prefers-color-scheme: dark)']) {
      const tag = document.createElement('meta')
      tag.setAttribute('name', 'theme-color')
      tag.setAttribute('media', media)
      document.head.append(tag)
    }
    const colors = () => [...document.querySelectorAll('meta[name="theme-color"]')].map((tag) => tag.getAttribute('content'))

    mockMatchMedia(false) // the OS is light, the learner picks dark
    useThemeStore.getState().setPreference('dark')
    expect(colors()).toEqual(['#101216', '#101216'])

    useThemeStore.getState().setPreference('light')
    expect(colors()).toEqual(['#f8fafc', '#f8fafc'])

    document.querySelectorAll('meta[name="theme-color"]').forEach((tag) => tag.remove())
  })
})
