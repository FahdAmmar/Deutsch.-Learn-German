import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { RecognitionError, type ListenOptions, type RecognitionResult } from '@/services/recognition'

import PronunciationPage from './PronunciationPage'

const recognizer = vi.hoisted(() => ({
  supported: true,
  listen: vi.fn<(options?: ListenOptions) => Promise<RecognitionResult>>(),
}))

vi.mock('@/services/recognition', async (importOriginal) => {
  const original = await importOriginal<typeof import('@/services/recognition')>()
  return {
    ...original,
    speechRecognizer: {
      isSupported: () => recognizer.supported,
      listen: (options?: ListenOptions) => recognizer.listen(options),
    },
  }
})

vi.mock('@/services/speech', () => ({
  GERMAN_LOCALE: 'de-DE',
  speechService: { isSupported: () => true, speak: vi.fn(), stop: vi.fn(), getStatus: () => 'idle' },
}))

const renderPage = () =>
  render(
    <MemoryRouter>
      <PronunciationPage />
    </MemoryRouter>,
  )

const card = (text: string) => screen.getByText(text).closest('div.flex.h-full') as HTMLElement

describe('PronunciationPage', () => {
  beforeEach(() => {
    recognizer.supported = true
    recognizer.listen.mockReset()
  })

  it('lists the practice groups, with a privacy note about the browser’s recogniser', () => {
    renderPage()
    expect(screen.getByRole('heading', { level: 1, name: 'تدريب النطق' })).toBeInTheDocument()
    for (const name of ['أزواج الأصوات المتقاربة', 'كلمات فيها أصوات صعبة', 'جمل يومية']) {
      expect(screen.getByRole('heading', { name })).toBeInTheDocument()
    }
    expect(screen.getByRole('note')).toHaveTextContent('لا يحفظ أي تسجيل')
  })

  it('shows which words were understood, in words and not only in colour', async () => {
    recognizer.listen.mockResolvedValue({ transcript: 'schon schon', confidence: 0.8, alternatives: [] })
    const user = userEvent.setup()
    renderPage()

    await user.click(within(card('schon schön')).getByRole('button', { name: 'تحدّث' }))

    const results = within(card('schon schön'))
    expect(await results.findByText(/قريب جداً/)).toBeInTheDocument()
    expect(results.getByText('صحيحة')).toBeInTheDocument()
    expect(results.getByText('قريبة')).toBeInTheDocument()
    expect(results.getByText('ما فهمه البرنامج:')).toBeInTheDocument()
  })

  it('judges the reading closest to what was asked, not only the first guess', async () => {
    recognizer.listen.mockResolvedValue({ transcript: 'tor tour', confidence: 0.5, alternatives: ['tor tür'] })
    const user = userEvent.setup()
    renderPage()

    await user.click(within(card('Tor Tür')).getByRole('button', { name: 'تحدّث' }))

    expect(await within(card('Tor Tür')).findByText(/ممتاز/)).toBeInTheDocument()
  })

  it('says what to do when the microphone is refused', async () => {
    recognizer.listen.mockRejectedValue(new RecognitionError('not-allowed'))
    const user = userEvent.setup()
    renderPage()

    await user.click(within(card('Pass Bass')).getByRole('button', { name: 'تحدّث' }))

    expect(await within(card('Pass Bass')).findByRole('alert')).toHaveTextContent('لم يُسمح باستخدام الميكروفون')
  })

  it('lets only one card listen at a time and stops on request', async () => {
    let settle!: (error: unknown) => void
    recognizer.listen.mockImplementation(
      () =>
        new Promise<RecognitionResult>((_, reject) => {
          settle = reject
        }),
    )
    const user = userEvent.setup()
    renderPage()

    await user.click(within(card('wir vier')).getByRole('button', { name: 'تحدّث' }))
    expect(within(card('wir vier')).getByRole('status')).toHaveTextContent('أستمع إليك الآن')
    expect(within(card('Pass Bass')).getByRole('button', { name: 'تحدّث' })).toBeDisabled()

    await user.click(within(card('wir vier')).getByRole('button', { name: 'إيقاف' }))
    settle(new RecognitionError('aborted'))
    expect(within(card('Pass Bass')).getByRole('button', { name: 'تحدّث' })).toBeEnabled()
    expect(within(card('wir vier')).getByRole('status')).toBeEmptyDOMElement()
  })

  it('without recognition in the browser, explains shadowing and offers no microphone', () => {
    recognizer.supported = false
    renderPage()

    expect(screen.getByRole('note')).toHaveTextContent('shadowing')
    expect(screen.queryByRole('button', { name: 'تحدّث' })).not.toBeInTheDocument()
    // Hearing the text is still possible.
    expect(within(card('schon schön')).getAllByRole('button').length).toBeGreaterThan(0)
  })
})
