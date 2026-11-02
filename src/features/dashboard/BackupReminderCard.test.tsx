import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { useBackupReminderStore } from '@/store/backupReminderStore'
import { useProgressStore } from '@/store/progressStore'

import { BackupReminderCard } from './BackupReminderCard'

const DAY = 24 * 60 * 60 * 1000

function completeLessons(count: number) {
  const lessons = Object.fromEntries(
    Array.from({ length: count }, (_, index) => [`l${index}`, { completed: true, completedAt: 1, exerciseScore: 1 }]),
  )
  useProgressStore.setState({ lessons } as never)
}

describe('BackupReminderCard', () => {
  beforeEach(() => {
    window.localStorage.clear()
    useProgressStore.getState().resetProgress()
    useBackupReminderStore.setState({ armedAt: null, lastExportAt: null, snoozedUntil: null })
  })

  it('shows nothing to someone who has just started', () => {
    completeLessons(1)
    const { container } = render(<BackupReminderCard />)
    expect(container).toBeEmptyDOMElement()
    expect(useBackupReminderStore.getState().armedAt).toBeNull()
  })

  it('starts the wait the first time there is progress worth keeping, without asking yet', () => {
    completeLessons(3)
    const { container } = render(<BackupReminderCard />)
    expect(useBackupReminderStore.getState().armedAt).not.toBeNull()
    expect(container).toBeEmptyDOMElement()
  })

  it('asks after the first week, and hides for a week on "remind me later"', async () => {
    const user = userEvent.setup()
    completeLessons(3)
    useBackupReminderStore.setState({ armedAt: Date.now() - 8 * DAY })
    render(<BackupReminderCard />)
    expect(screen.getByText('احفظ نسخة من تقدّمك')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'ذكّرني بعد أسبوع' }))
    expect(screen.queryByText('احفظ نسخة من تقدّمك')).not.toBeInTheDocument()
    expect(useBackupReminderStore.getState().snoozedUntil).toBeGreaterThan(Date.now())
  })

  it('downloads a backup, notes the time and goes away', async () => {
    const user = userEvent.setup()
    completeLessons(3)
    useBackupReminderStore.setState({ armedAt: Date.now() - 8 * DAY })
    const createUrl = vi.fn(() => 'blob:test')
    Object.assign(URL, { createObjectURL: createUrl, revokeObjectURL: vi.fn() })
    vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(() => {})

    render(<BackupReminderCard />)
    await user.click(screen.getByRole('button', { name: 'حمّل نسخة الآن' }))

    expect(createUrl).toHaveBeenCalledTimes(1)
    expect(useBackupReminderStore.getState().lastExportAt).not.toBeNull()
  })
})
