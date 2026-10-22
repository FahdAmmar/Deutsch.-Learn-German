import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { beforeEach, describe, expect, it, vi } from 'vitest'

const registry = vi.hoisted(() => ({
  loaded: new Set<string>(),
  failNext: false,
  requested: [] as string[][],
  listeners: new Set<() => void>(),
  version: 0,
}))

vi.mock('@/data/curriculum', () => ({
  LEVELS_WITH_CONTENT: ['A1', 'A2'],
  isLevelLoaded: (level: string) => registry.loaded.has(level),
  getCurriculumVersion: () => registry.version,
  subscribeToCurriculum: (listener: () => void) => {
    registry.listeners.add(listener)
    return () => registry.listeners.delete(listener)
  },
  loadLevels: (levels: string[]) => {
    registry.requested.push([...levels])
    if (registry.failNext) {
      registry.failNext = false
      return Promise.reject(new Error('offline'))
    }
    for (const level of levels) registry.loaded.add(level)
    registry.version += 1
    registry.listeners.forEach((listener) => listener())
    return Promise.resolve()
  },
}))

import { CurriculumGate } from './CurriculumGate'

function renderGate(path: string, gate: React.ReactElement) {
  render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/levels/:level" element={gate} />
        <Route path="/dashboard" element={gate} />
      </Routes>
    </MemoryRouter>,
  )
}

describe('CurriculumGate', () => {
  beforeEach(() => {
    registry.loaded.clear()
    registry.failNext = false
    registry.requested.length = 0
    registry.listeners.clear()
    registry.version = 0
  })

  it('shows the page once the levels it needs have loaded', async () => {
    renderGate('/dashboard', <CurriculumGate><p>المحتوى</p></CurriculumGate>)

    expect(await screen.findByText('المحتوى')).toBeInTheDocument()
    expect(registry.requested[0]).toEqual(['A1', 'A2'])
  })

  it('loads only the level named in the URL', async () => {
    renderGate('/levels/a2', <CurriculumGate levelParam="level"><p>المحتوى</p></CurriculumGate>)

    expect(await screen.findByText('المحتوى')).toBeInTheDocument()
    expect(registry.requested[0]).toEqual(['A2'])
  })

  it('loads nothing for a level that does not exist, leaving the page to show its own not-found', () => {
    renderGate('/levels/c9', <CurriculumGate levelParam="level"><p>المحتوى</p></CurriculumGate>)

    expect(screen.getByText('المحتوى')).toBeInTheDocument()
    expect(registry.requested).toEqual([])
  })

  it('offers a retry when the content cannot be fetched', async () => {
    registry.failNext = true
    const user = userEvent.setup()
    renderGate('/dashboard', <CurriculumGate><p>المحتوى</p></CurriculumGate>)

    expect(await screen.findByText('تعذّر تحميل محتوى الدروس')).toBeInTheDocument()
    expect(screen.queryByText('المحتوى')).not.toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'إعادة المحاولة' }))

    expect(await screen.findByText('المحتوى')).toBeInTheDocument()
  })
})
