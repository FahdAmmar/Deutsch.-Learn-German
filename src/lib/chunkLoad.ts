import { appStorage } from '@/lib/storage'

/**
 * Each browser words "a dynamic `import()` could not be loaded" differently.
 * The page that failed is named in the message, but the cause is rarely that
 * page's own code: it is usually a stale tab (a new deploy removed the old
 * hashed chunk, or the dev server re-optimised its dependencies) or a
 * dropped connection.
 */
const CHUNK_LOAD_ERROR_PATTERNS: readonly RegExp[] = [
  /Failed to fetch dynamically imported module/i, // Chromium
  /error loading dynamically imported module/i, // Firefox
  /Importing a module script failed/i, // Safari
  /Unable to preload CSS/i, // Vite's preload helper
]

export function isChunkLoadError(error: unknown): boolean {
  const message = error instanceof Error ? error.message : typeof error === 'string' ? error : ''
  return CHUNK_LOAD_ERROR_PATTERNS.some((pattern) => pattern.test(message))
}

const RELOAD_STAMP_KEY = 'chunk-reload-at'
/** A second failure inside this window means a reload did not help — stop and show the error. */
const RELOAD_WINDOW_MS = 30_000

interface ReloadOptions {
  now?: () => number
  reload?: () => void
}

/**
 * Reloads the page at most once per `RELOAD_WINDOW_MS`, so a stale tab heals
 * itself without ever being able to enter a reload loop. Returns whether a
 * reload was started.
 *
 * Without persistent storage the stamp would vanish on reload and the guard
 * could not work, so in that case no automatic reload happens at all.
 */
export function reloadOnceForStaleChunk({
  now = Date.now,
  reload = () => window.location.reload(),
}: ReloadOptions = {}): boolean {
  if (!appStorage.persistent) return false

  const current = now()
  const last = Number(appStorage.getItem(RELOAD_STAMP_KEY))
  if (last > 0 && current - last < RELOAD_WINDOW_MS) return false

  appStorage.setItem(RELOAD_STAMP_KEY, String(current))
  reload()
  return true
}
