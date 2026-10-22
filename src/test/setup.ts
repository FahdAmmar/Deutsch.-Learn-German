import '@testing-library/jest-dom/vitest'

// jsdom has no native matchMedia implementation. Several modules (notably
// themeStore) call it at import time to resolve the initial theme, so a
// default stub must exist before any test file imports them. Individual
// tests can still override this with their own vi.stubGlobal('matchMedia', ...).
if (typeof window !== 'undefined' && !window.matchMedia) {
  window.matchMedia = ((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  })) as unknown as typeof window.matchMedia
}

// Curriculum content is loaded lazily per level in the app. Tests read it
// synchronously, so load every level once before any test file runs.
import { loadAllLevels } from '@/data/curriculum'

await loadAllLevels()
