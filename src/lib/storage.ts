/**
 * Persistence abstraction. This is the *only* module allowed to touch
 * `localStorage` directly — everything else (Zustand stores, features)
 * goes through here, or through Zustand's `persist` middleware configured
 * with the storage engine exported below.
 *
 * Falls back to an in-memory Map when localStorage is unavailable (private
 * browsing, disabled storage, SSR) so the app never crashes because of it.
 */

const NAMESPACE = 'learn-german'

function keyFor(key: string): string {
  return `${NAMESPACE}:${key}`
}

function isLocalStorageAvailable(): boolean {
  try {
    const testKey = `${NAMESPACE}:__probe__`
    window.localStorage.setItem(testKey, '1')
    window.localStorage.removeItem(testKey)
    return true
  } catch {
    return false
  }
}

const memoryFallback = new Map<string, string>()
const hasLocalStorage = typeof window !== 'undefined' && isLocalStorageAvailable()

export const appStorage = {
  getItem(key: string): string | null {
    try {
      if (hasLocalStorage) return window.localStorage.getItem(keyFor(key))
      return memoryFallback.get(keyFor(key)) ?? null
    } catch {
      return null
    }
  },

  setItem(key: string, value: string): void {
    try {
      if (hasLocalStorage) {
        window.localStorage.setItem(keyFor(key), value)
        return
      }
      memoryFallback.set(keyFor(key), value)
    } catch {
      // Storage can fail (quota exceeded, disabled) — never let that crash the app.
      memoryFallback.set(keyFor(key), value)
    }
  },

  removeItem(key: string): void {
    try {
      if (hasLocalStorage) {
        window.localStorage.removeItem(keyFor(key))
        return
      }
      memoryFallback.delete(keyFor(key))
    } catch {
      memoryFallback.delete(keyFor(key))
    }
  },
}

/** Adapter matching the interface Zustand's `persist` middleware expects. */
export const zustandStorageEngine = {
  getItem: (name: string) => appStorage.getItem(name),
  setItem: (name: string, value: string) => appStorage.setItem(name, value),
  removeItem: (name: string) => appStorage.removeItem(name),
}
