import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { zustandStorageEngine } from '@/lib/storage'
import type { ResolvedTheme, ThemePreference } from '@/types/settings'

interface ThemeState {
  /** What the user asked for: light, dark, or "follow the system". */
  preference: ThemePreference
  /** What's actually applied: light or dark, after resolving "system". */
  resolvedTheme: ResolvedTheme
  setPreference: (preference: ThemePreference) => void
  /**
   * Internal: re-reads the OS theme and applies it, but only while the
   * user's preference is "system". Called by the media-query listener in
   * `initThemeSystemListener`. Not intended to be called from components.
   */
  syncWithSystem: () => void
}

function getSystemTheme(): ResolvedTheme {
  if (typeof window === 'undefined') return 'light'
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function applyThemeToDocument(theme: ResolvedTheme): void {
  if (typeof document === 'undefined') return
  document.documentElement.classList.toggle('dark', theme === 'dark')
}

export const useThemeStore = create<ThemeState>()(
  persist<ThemeState, [], [], Pick<ThemeState, 'preference'>>(
    (set, get) => ({
      preference: 'system',
      resolvedTheme: getSystemTheme(),

      setPreference: (preference) => {
        const resolvedTheme = preference === 'system' ? getSystemTheme() : preference
        applyThemeToDocument(resolvedTheme)
        set({ preference, resolvedTheme })
      },

      syncWithSystem: () => {
        if (get().preference !== 'system') return
        const resolvedTheme = getSystemTheme()
        applyThemeToDocument(resolvedTheme)
        set({ resolvedTheme })
      },
    }),
    {
      name: 'theme',
      storage: {
        getItem: (name) => {
          const value = zustandStorageEngine.getItem(name)
          return value ? JSON.parse(value) : null
        },
        setItem: (name, value) => zustandStorageEngine.setItem(name, JSON.stringify(value)),
        removeItem: (name) => zustandStorageEngine.removeItem(name),
      },
      partialize: (state) => ({ preference: state.preference }),
      onRehydrateStorage: () => (state) => {
        if (!state) return
        const resolvedTheme = state.preference === 'system' ? getSystemTheme() : state.preference
        applyThemeToDocument(resolvedTheme)
        state.resolvedTheme = resolvedTheme
      },
    },
  ),
)

/**
 * Wires up the OS-level `prefers-color-scheme` listener so the app follows
 * system changes live when the user's preference is "system". Call once
 * from the app root; returns an unsubscribe function for cleanup.
 */
export function initThemeSystemListener(): () => void {
  if (typeof window === 'undefined') return () => {}

  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
  const handleChange = () => useThemeStore.getState().syncWithSystem()

  mediaQuery.addEventListener('change', handleChange)
  return () => mediaQuery.removeEventListener('change', handleChange)
}
