import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { act } from 'react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

const registerSW = vi.fn()

vi.mock('virtual:pwa-register', () => ({
  registerSW: (options: { onNeedRefresh?: () => void; onOfflineReady?: () => void }) => registerSW(options),
}))

// Imported after the mock so the component picks up the mocked module.
const { PwaUpdatePrompt } = await import('./PwaUpdatePrompt')

describe('PwaUpdatePrompt', () => {
  beforeEach(() => {
    registerSW.mockReset()
    registerSW.mockReturnValue(vi.fn())
  })

  it('renders nothing until the service worker reports a state', () => {
    render(<PwaUpdatePrompt />)
    expect(screen.queryByRole('status')).not.toBeInTheDocument()
  })

  it('shows an update prompt and applies the update when clicked', async () => {
    const updateSW = vi.fn()
    let capturedOptions: { onNeedRefresh?: () => void } = {}
    registerSW.mockImplementation((options) => {
      capturedOptions = options
      return updateSW
    })

    render(<PwaUpdatePrompt />)
    act(() => capturedOptions.onNeedRefresh?.())

    expect(screen.getByText('يتوفّر تحديث جديد للتطبيق')).toBeInTheDocument()

    const user = userEvent.setup()
    await user.click(screen.getByRole('button', { name: 'تحديث' }))
    expect(updateSW).toHaveBeenCalledWith(true)
  })

  it('shows an offline-ready notice once the service worker has precached the app', () => {
    let capturedOptions: { onOfflineReady?: () => void } = {}
    registerSW.mockImplementation((options) => {
      capturedOptions = options
      return vi.fn()
    })

    render(<PwaUpdatePrompt />)
    act(() => capturedOptions.onOfflineReady?.())

    expect(screen.getByText('التطبيق جاهز الآن للعمل بدون اتصال بالإنترنت.')).toBeInTheDocument()
  })
})
