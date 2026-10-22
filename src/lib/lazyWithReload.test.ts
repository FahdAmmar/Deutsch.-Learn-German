import { describe, expect, it, vi } from 'vitest'

import { loadWithReload } from './lazyWithReload'

const Page = () => null
const chunkError = () =>
  new TypeError('Failed to fetch dynamically imported module: http://localhost:3000/src/pages/GrammarPage.tsx')

describe('loadWithReload', () => {
  it('resolves with the module when the import succeeds, without reloading', async () => {
    const reload = vi.fn(() => true)

    await expect(loadWithReload(() => Promise.resolve({ default: Page }), reload)).resolves.toEqual({ default: Page })
    expect(reload).not.toHaveBeenCalled()
  })

  it('starts a reload on a chunk failure and then never settles (Suspense keeps its loader)', async () => {
    const reload = vi.fn(() => true)
    const settled = vi.fn()

    void loadWithReload(() => Promise.reject(chunkError()), reload).then(settled, settled)
    await new Promise((resolve) => setTimeout(resolve, 20))

    expect(reload).toHaveBeenCalledTimes(1)
    expect(settled).not.toHaveBeenCalled()
  })

  it('rethrows a chunk failure when a reload has already been tried', async () => {
    const error = chunkError()

    await expect(loadWithReload(() => Promise.reject(error), () => false)).rejects.toBe(error)
  })

  it('rethrows any other error untouched and does not reload', async () => {
    const reload = vi.fn(() => true)
    const error = new Error('SyntaxError in module')

    await expect(loadWithReload(() => Promise.reject(error), reload)).rejects.toBe(error)
    expect(reload).not.toHaveBeenCalled()
  })
})
