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

// Node >= 25 ships its own Web Storage globals. Without `--localstorage-file`
// the built-in `localStorage` getter returns `undefined`, and Vitest's jsdom
// environment does not replace globals that already exist on Node's `global`.
// Result: `window.localStorage` is undefined in tests on Node 25/26 although it
// works on Node 22. Re-point the storage globals at jsdom's own implementation
// (exposed by Vitest as `globalThis.jsdom`) so tests behave the same on every
// supported Node version. Each test file gets a fresh jsdom, so no state leaks.
const jsdomWindow = (globalThis as unknown as { jsdom?: { window: Record<string, unknown> } }).jsdom?.window
if (jsdomWindow) {
  for (const name of ['localStorage', 'sessionStorage', 'Storage'] as const) {
    if (!(name in jsdomWindow)) continue
    Object.defineProperty(globalThis, name, {
      configurable: true,
      get: () => jsdomWindow[name],
      set: (value: unknown) => {
        Object.defineProperty(globalThis, name, { configurable: true, writable: true, value })
      },
    })
  }
}

// Curriculum content is loaded lazily per level in the app. Tests read it
// synchronously, so load every level once before any test file runs.
import { loadAllLevels } from '@/data/curriculum'

await loadAllLevels()
