import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { serializeProgress } from '@/lib/progressExport'
import { useProgressStore } from '@/store/progressStore'

import SettingsPage from './SettingsPage'

function makeFile(contents: string, name = 'progress.json') {
  return new File([contents], name, { type: 'application/json' })
}

describe('SettingsPage — progress export/import', () => {
  beforeEach(() => {
    useProgressStore.getState().resetProgress()
  })

  it('exports the current progress as a downloadable JSON file without throwing', async () => {
    const createObjectURL = vi.fn(() => 'blob:mock-url')
    const revokeObjectURL = vi.fn()
    vi.stubGlobal('URL', { ...URL, createObjectURL, revokeObjectURL })

    const user = userEvent.setup()
    render(<SettingsPage />)

    await user.click(screen.getByRole('button', { name: 'تصدير التقدّم' }))

    expect(createObjectURL).toHaveBeenCalledTimes(1)
    expect(revokeObjectURL).toHaveBeenCalledTimes(1)

    vi.unstubAllGlobals()
  })

  it('shows an error and does not touch the store when the imported file is invalid', async () => {
    const user = userEvent.setup()
    render(<SettingsPage />)

    const input = document.querySelector('input[type="file"]') as HTMLInputElement
    await user.upload(input, makeFile('{ this is not valid json'))

    expect(await screen.findByRole('alert')).toHaveTextContent('الملف ليس بصيغة JSON صالحة')
    expect(screen.queryByRole('button', { name: 'استبدال التقدّم' })).not.toBeInTheDocument()
  })

  it('asks for confirmation before applying a valid imported file, then replaces progress', async () => {
    useProgressStore.getState().completeLesson({
      lessonId: 'some-lesson',
      moduleId: 'some-module',
      level: 'A1',
      accuracy: 1,
    })
    const validExport = serializeProgress({
      ...useProgressStore.getState(),
      streakDays: 7,
    })
    useProgressStore.getState().resetProgress()

    const user = userEvent.setup()
    render(<SettingsPage />)

    const input = document.querySelector('input[type="file"]') as HTMLInputElement
    await user.upload(input, makeFile(validExport))

    // Destructive action requires an explicit confirmation step.
    expect(screen.getByText(/سيستبدل هذا الملف تقدّمك الحالي بالكامل/)).toBeInTheDocument()
    expect(useProgressStore.getState().streakDays).toBe(0)

    await user.click(screen.getByRole('button', { name: 'استبدال التقدّم' }))

    expect(useProgressStore.getState().streakDays).toBe(7)
    expect(screen.getByText('تم استيراد التقدّم بنجاح.')).toBeInTheDocument()
  })
})
