import { beforeEach, describe, expect, it, vi } from 'vitest'

import { isChunkLoadError, reloadOnceForStaleChunk } from './chunkLoad'
import { appStorage } from './storage'

describe('isChunkLoadError', () => {
  it.each([
    ['Chromium', 'Failed to fetch dynamically imported module: http://localhost:3000/src/pages/GrammarPage.tsx'],
    ['Firefox', 'error loading dynamically imported module: http://localhost:3000/assets/GrammarPage-abc.js'],
    ['Safari', 'Importing a module script failed.'],
    ['Vite preload helper', 'Unable to preload CSS for /assets/GrammarPage-abc.css'],
  ])('recognises the %s wording', (_browser, message) => {
    expect(isChunkLoadError(new TypeError(message))).toBe(true)
  })

  it('accepts a plain string rejection', () => {
    expect(isChunkLoadError('Failed to fetch dynamically imported module: x')).toBe(true)
  })

  it('does not mistake an ordinary error for a chunk failure', () => {
    expect(isChunkLoadError(new Error("Cannot read properties of undefined (reading 'map')"))).toBe(false)
    expect(isChunkLoadError(undefined)).toBe(false)
    expect(isChunkLoadError({ message: 'Failed to fetch dynamically imported module' })).toBe(false)
  })
})

describe('reloadOnceForStaleChunk', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  it('reloads and stamps the time on the first failure', () => {
    const reload = vi.fn()

    expect(reloadOnceForStaleChunk({ now: () => 1_000_000, reload })).toBe(true)
    expect(reload).toHaveBeenCalledTimes(1)
    expect(appStorage.getItem('chunk-reload-at')).toBe('1000000')
  })

  it('refuses a second reload inside the window, so it can never loop', () => {
    const reload = vi.fn()
    reloadOnceForStaleChunk({ now: () => 1_000_000, reload })

    expect(reloadOnceForStaleChunk({ now: () => 1_010_000, reload })).toBe(false)
    expect(reload).toHaveBeenCalledTimes(1)
  })

  it('allows another reload once the window has passed (a later, unrelated deploy)', () => {
    const reload = vi.fn()
    reloadOnceForStaleChunk({ now: () => 1_000_000, reload })

    expect(reloadOnceForStaleChunk({ now: () => 1_031_000, reload })).toBe(true)
    expect(reload).toHaveBeenCalledTimes(2)
  })

  it('never reloads when storage cannot persist the guard', () => {
    const reload = vi.fn()
    const spy = vi.spyOn(appStorage, 'persistent', 'get').mockReturnValue(false)

    expect(reloadOnceForStaleChunk({ now: () => 1_000_000, reload })).toBe(false)
    expect(reload).not.toHaveBeenCalled()
    spy.mockRestore()
  })
})
