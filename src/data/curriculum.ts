import { CEFR_LEVELS } from '@/types'
import type { CEFRLevel, LevelCurriculum } from '@/types'

type LevelLoader = () => Promise<LevelCurriculum>

/**
 * Where each level's content comes from. A level's content is its own chunk,
 * fetched the first time a screen needs it — the entry bundle never carries
 * lesson data, and a content-only deploy only invalidates the chunk it touches.
 *
 * `null` means the level has no authored content yet; the Levels page shows an
 * honest "coming soon" state for it instead of fabricated lessons. To author a
 * level, add a loader here following the A1/A2 shape (`Module[]` plus reading
 * texts) — nothing else in the app needs to change.
 */
const LEVEL_SOURCES: Record<CEFRLevel, LevelLoader | null> = {
  A1: () => import('./a1').then(({ a1Modules, a1ReadingTexts }) => ({ level: 'A1', modules: a1Modules, readingTexts: a1ReadingTexts })),
  A2: () => import('./a2').then(({ a2Modules, a2ReadingTexts }) => ({ level: 'A2', modules: a2Modules, readingTexts: a2ReadingTexts })),
  B1: null,
  B2: null,
}

const emptyLevel = (level: CEFRLevel): LevelCurriculum => ({ level, modules: [], readingTexts: [] })

const loaded = new Map<CEFRLevel, LevelCurriculum>()
const inFlight = new Map<CEFRLevel, Promise<void>>()
const listeners = new Set<() => void>()
let version = 0
let snapshot: readonly LevelCurriculum[] | null = null

/** Levels that have authored content — known without loading anything, so pages never hardcode it. */
export const LEVELS_WITH_CONTENT: readonly CEFRLevel[] = CEFR_LEVELS.filter((level) => LEVEL_SOURCES[level] !== null)

/** Every level, in CEFR order; levels that are not loaded (yet) appear with no modules. */
export function getCurriculum(): readonly LevelCurriculum[] {
  snapshot ??= CEFR_LEVELS.map((level) => loaded.get(level) ?? emptyLevel(level))
  return snapshot
}

export function isLevelLoaded(level: CEFRLevel): boolean {
  return LEVEL_SOURCES[level] === null || loaded.has(level)
}

/** Fetches a level's content once; concurrent callers share the same request, and a failed fetch can be retried. */
export function loadLevel(level: CEFRLevel): Promise<void> {
  const source = LEVEL_SOURCES[level]
  if (source === null || loaded.has(level)) return Promise.resolve()

  const existing = inFlight.get(level)
  if (existing) return existing

  const request = source()
    .then((entry) => {
      loaded.set(level, entry)
      snapshot = null
      version += 1
      listeners.forEach((listener) => listener())
    })
    .finally(() => inFlight.delete(level))
  inFlight.set(level, request)
  return request
}

export function loadLevels(levels: readonly CEFRLevel[]): Promise<void> {
  return Promise.all(levels.map(loadLevel)).then(() => undefined)
}

export function loadAllLevels(): Promise<void> {
  return loadLevels(LEVELS_WITH_CONTENT)
}

/** For `useSyncExternalStore`: re-render when a level finishes loading. */
export function subscribeToCurriculum(listener: () => void): () => void {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export function getCurriculumVersion(): number {
  return version
}
