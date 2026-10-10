import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { ErrorBoundary } from './ErrorBoundary'

function Bomb(): never {
  throw new Error('Boom')
}

describe('ErrorBoundary', () => {
  // React logs the caught error to the console (both its own warning and our
  // componentDidCatch call) — expected noise for these tests, not a real failure.
  let consoleErrorSpy: ReturnType<typeof vi.spyOn>

  beforeEach(() => {
    consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    consoleErrorSpy.mockRestore()
  })

  it('renders children normally when nothing throws', () => {
    render(
      <ErrorBoundary>
        <p>محتوى طبيعي</p>
      </ErrorBoundary>,
    )
    expect(screen.getByText('محتوى طبيعي')).toBeInTheDocument()
  })

  it('renders a fallback screen instead of crashing when a child throws', () => {
    render(
      <ErrorBoundary>
        <Bomb />
      </ErrorBoundary>,
    )

    expect(screen.getByText('حدث خطأ غير متوقّع')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'العودة إلى الرئيسية' })).toBeInTheDocument()
  })

  it('logs the caught error rather than silently swallowing it', () => {
    render(
      <ErrorBoundary>
        <Bomb />
      </ErrorBoundary>,
    )
    expect(consoleErrorSpy).toHaveBeenCalled()
  })

  it('the recovery button is focusable and clickable without throwing', async () => {
    const user = userEvent.setup()
    // jsdom's window.location.assign isn't configurable enough for vi.spyOn;
    // replace the whole location object for the duration of this test.
    const originalLocation = window.location
    const assignSpy = vi.fn()
    Object.defineProperty(window, 'location', {
      configurable: true,
      value: { ...originalLocation, assign: assignSpy },
    })

    render(
      <ErrorBoundary>
        <Bomb />
      </ErrorBoundary>,
    )
    await user.click(screen.getByRole('button', { name: 'العودة إلى الرئيسية' }))

    expect(assignSpy).toHaveBeenCalledWith('/dashboard')
    Object.defineProperty(window, 'location', { configurable: true, value: originalLocation })
  })
})
