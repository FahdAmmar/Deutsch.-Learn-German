import { lazy, type ComponentType } from 'react'

import { isChunkLoadError, reloadOnceForStaleChunk } from '@/lib/chunkLoad'

interface DefaultExport<P extends object> {
  default: ComponentType<P>
}

/** Exported separately from `lazyWithReload` so the loading logic can be tested without rendering. */
export function loadWithReload<P extends object>(
  load: () => Promise<DefaultExport<P>>,
  reload: () => boolean = reloadOnceForStaleChunk,
): Promise<DefaultExport<P>> {
  return load().catch((error: unknown) => {
    if (isChunkLoadError(error) && reload()) {
      // The page is reloading: never settle, so Suspense keeps showing its
      // loader instead of flashing an error for a moment first.
      return new Promise<DefaultExport<P>>(() => {})
    }
    // Not a stale-chunk problem, or a reload already happened and did not help:
    // let the route's error screen explain it.
    throw error
  })
}

/** `React.lazy` that recovers from a stale tab by reloading once (see `reloadOnceForStaleChunk`). */
export function lazyWithReload<P extends object>(load: () => Promise<DefaultExport<P>>) {
  return lazy(() => loadWithReload(load))
}
