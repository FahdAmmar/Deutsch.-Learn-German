import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Suspense } from 'react'
import { createMemoryRouter, Outlet, RouterProvider } from 'react-router-dom'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { lazyWithReload } from '@/lib/lazyWithReload'

import { RouteErrorPage } from './RouteErrorPage'

const CHUNK_MESSAGE = 'Failed to fetch dynamically imported module: http://localhost:3000/src/pages/GrammarPage.tsx'

/** Throws while rendering, like a page whose module (or a dependency of it) failed to load. */
function Thrower({ error }: { error: Error }): never {
  throw error
}

function Shell() {
  return (
    <div>
      <nav aria-label="التنقّل الرئيسي">القائمة</nav>
      <Outlet />
    </div>
  )
}

function renderRoute(element: React.ReactNode) {
  const router = createMemoryRouter(
    [
      {
        path: '/',
        element: <Shell />,
        errorElement: <RouteErrorPage standalone />,
        children: [{ errorElement: <RouteErrorPage />, children: [{ path: 'grammar', element }] }],
      },
    ],
    { initialEntries: ['/grammar'] },
  )
  return render(<RouterProvider router={router} />)
}

describe('RouteErrorPage', () => {
  const originalLocation = window.location
  const reload = vi.fn()
  const assign = vi.fn()
  let consoleErrorSpy: ReturnType<typeof vi.spyOn>

  beforeEach(() => {
    window.localStorage.clear()
    reload.mockReset()
    assign.mockReset()
    consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    Object.defineProperty(window, 'location', {
      configurable: true,
      value: { ...originalLocation, reload, assign },
    })
  })

  afterEach(() => {
    consoleErrorSpy.mockRestore()
    Object.defineProperty(window, 'location', { configurable: true, value: originalLocation })
  })

  it('explains a failed page load in Arabic and keeps the app shell usable', async () => {
    const user = userEvent.setup()
    renderRoute(<Thrower error={new TypeError(CHUNK_MESSAGE)} />)

    expect(screen.getByRole('heading', { name: 'تعذّر تحميل هذه الصفحة' })).toBeInTheDocument()
    expect(screen.queryByText(/Hey developer/i)).not.toBeInTheDocument()
    expect(screen.getByRole('navigation', { name: 'التنقّل الرئيسي' })).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'تحديث الصفحة' }))
    expect(reload).toHaveBeenCalledTimes(1)
  })

  it('shows the generic message for any other render error, with a way home', async () => {
    const user = userEvent.setup()
    renderRoute(<Thrower error={new Error('boom')} />)

    expect(screen.getByRole('heading', { name: 'حدث خطأ غير متوقّع' })).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'العودة إلى الرئيسية' }))
    expect(assign).toHaveBeenCalledWith('/dashboard')
  })

  it('end to end: a stale lazy page reloads once, and shows the error screen if that did not help', async () => {
    const failingPage = () => lazyWithReload(() => Promise.reject(new TypeError(CHUNK_MESSAGE)))

    // First failure: the page reloads itself and keeps showing the loader meanwhile.
    const First = failingPage()
    renderRoute(
      <Suspense fallback={<p>جارٍ التحميل</p>}>
        <First />
      </Suspense>,
    )
    await vi.waitFor(() => expect(reload).toHaveBeenCalledTimes(1))
    expect(screen.getByText('جارٍ التحميل')).toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: 'تعذّر تحميل هذه الصفحة' })).not.toBeInTheDocument()

    // The reloaded page fails again straight away: no second reload, a readable error instead.
    const Second = failingPage()
    renderRoute(
      <Suspense fallback={<p>جارٍ التحميل</p>}>
        <Second />
      </Suspense>,
    )
    expect(await screen.findByRole('heading', { name: 'تعذّر تحميل هذه الصفحة' })).toBeInTheDocument()
    expect(reload).toHaveBeenCalledTimes(1)
  })
})
