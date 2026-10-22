import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { createBackupJson } from '@/store/backup'
import { useMyTextStore } from '@/store/myTextStore'
import { serializeProgress } from '@/lib/progressExport'
import { getLessonsForLevel, getVocabularyForLevel } from '@/lib/curriculum'
import { useProgressStore } from '@/store/progressStore'
import { useSettingsStore } from '@/store/settingsStore'
import { useStatsStore } from '@/store/statsStore'

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
    expect(screen.getByText(/سيستبدل هذا الملف تقدّمك الحالي/)).toBeInTheDocument()
    // A file from before the learner's own texts were exported says so, and promises to keep this device's texts.
    expect(screen.getByText(/لا يتضمن نصوصك الخاصة، فتبقى نصوص هذا الجهاز/)).toBeInTheDocument()
    expect(useProgressStore.getState().streakDays).toBe(0)

    await user.click(screen.getByRole('button', { name: 'استبدال التقدّم' }))

    expect(useProgressStore.getState().streakDays).toBe(7)
    expect(screen.getByText('تم استيراد التقدّم بنجاح.')).toBeInTheDocument()
  })
})

describe('SettingsPage — backup that carries the learner’s own texts', () => {
  it('names what the file replaces, and brings the texts back once confirmed', async () => {
    useMyTextStore.getState().addText({ title: 'Mein Tag', text: 'Ich lerne Deutsch.', mode: 'sentences', maxWords: 6 })
    const file = createBackupJson()
    useMyTextStore.setState({ texts: [] })

    const user = userEvent.setup()
    render(<SettingsPage />)
    await user.upload(document.querySelector('input[type="file"]') as HTMLInputElement, makeFile(file))

    expect(screen.getByText(/ويستبدل أيضاً: نصوصك الخاصة \(1\)/)).toBeInTheDocument()
    expect(useMyTextStore.getState().texts).toHaveLength(0)

    await user.click(screen.getByRole('button', { name: 'استبدال التقدّم' }))

    expect(useMyTextStore.getState().texts.map((entry) => entry.title)).toEqual(['Mein Tag'])
  })
})

describe('SettingsPage — display and learning preferences', () => {
  beforeEach(() => {
    useSettingsStore.getState().resetToDefaults()
  })

  it('changes the text size', async () => {
    const user = userEvent.setup()
    render(<SettingsPage />)

    await user.click(screen.getByRole('radio', { name: /كبير جداً/ }))

    expect(useSettingsStore.getState().settings.textScale).toBe('xlarge')
    expect(screen.getByRole('radio', { name: /كبير جداً/ })).toHaveAttribute('aria-checked', 'true')
  })

  it('toggles high contrast, sound effects and pronunciation hints', async () => {
    const user = userEvent.setup()
    render(<SettingsPage />)

    await user.click(screen.getByRole('switch', { name: 'تباين عالٍ' }))
    await user.click(screen.getByRole('switch', { name: 'أصوات الإجابات' }))
    await user.click(screen.getByRole('switch', { name: 'إظهار تقطيع النطق' }))

    const { highContrast, soundEffects, showPronunciationHints } = useSettingsStore.getState().settings
    expect(highContrast).toBe(true)
    expect(soundEffects).toBe(false)
    expect(showPronunciationHints).toBe(false)
  })

  it('sets the daily goal', async () => {
    const user = userEvent.setup()
    render(<SettingsPage />)

    await user.click(screen.getByRole('radio', { name: /30/ }))

    expect(useSettingsStore.getState().settings.dailyGoal).toBe(30)
  })
})

describe('SettingsPage — statistics in backups', () => {
  beforeEach(() => {
    useProgressStore.getState().resetProgress()
    useStatsStore.getState().resetStats()
  })

  it('exports learning statistics along with progress', async () => {
    useStatsStore.getState().recordAnswer({ type: 'matching', correct: true })
    let exported = ''
    vi.stubGlobal('URL', {
      ...URL,
      createObjectURL: (blob: Blob) => {
        void blob.text().then((text) => (exported = text))
        return 'blob:mock'
      },
      revokeObjectURL: () => undefined,
    })

    const user = userEvent.setup()
    render(<SettingsPage />)
    await user.click(screen.getByRole('button', { name: 'تصدير التقدّم' }))
    await vi.waitFor(() => expect(exported).not.toBe(''))

    expect(JSON.parse(exported).stats.byType.matching).toEqual({ attempts: 1, correct: 1 })
    vi.unstubAllGlobals()
  })

  it('restores statistics when a backup that carries them is imported', async () => {
    const stats = { days: { '2026-10-01': { attempts: 3, correct: 2 } }, byType: { listening: { attempts: 3, correct: 2 } }, byModule: {} }
    const file = new File([serializeProgress(useProgressStore.getState(), stats)], 'p.json', { type: 'application/json' })

    const user = userEvent.setup()
    render(<SettingsPage />)
    await user.upload(document.querySelector('input[type="file"]') as HTMLInputElement, file)
    await user.click(await screen.findByRole('button', { name: 'استبدال التقدّم' }))

    expect(useStatsStore.getState().byType.listening).toEqual({ attempts: 3, correct: 2 })
  })
})

describe('SettingsPage — danger zone', () => {
  beforeEach(() => {
    useProgressStore.getState().resetProgress()
    useStatsStore.getState().resetStats()
  })

  it('starts one level over without touching the others or the statistics', async () => {
    const a1Lesson = getLessonsForLevel('A1')[0]
    const a2Lesson = getLessonsForLevel('A2')[0]
    const store = useProgressStore.getState()
    store.completeLesson({ lessonId: a1Lesson.id, moduleId: a1Lesson.moduleId, level: 'A1', accuracy: 1 })
    store.completeLesson({ lessonId: a2Lesson.id, moduleId: a2Lesson.moduleId, level: 'A2', accuracy: 1 })
    store.recordVocabularyReview(getVocabularyForLevel('A1')[0].id, true)
    useStatsStore.getState().recordAnswer({ type: 'matching', correct: true })

    const user = userEvent.setup()
    render(<SettingsPage />)

    await user.click(screen.getByRole('radio', { name: /A1/ }))
    await user.click(screen.getByRole('button', { name: 'تأكيد إعادة A1 من البداية' }))

    expect(await screen.findByText(/تمت إعادة المستوى A1 من البداية/)).toBeInTheDocument()
    const state = useProgressStore.getState()
    expect(state.lessons[a1Lesson.id]).toBeUndefined()
    expect(state.lessons[a2Lesson.id]?.completed).toBe(true)
    expect(Object.keys(state.vocabulary)).toHaveLength(0)
    expect(useStatsStore.getState().byType.matching).toEqual({ attempts: 1, correct: 1 })
  })

  it('also clears the statistics when everything is reset', async () => {
    useStatsStore.getState().recordAnswer({ type: 'matching', correct: true })
    const user = userEvent.setup()
    render(<SettingsPage />)

    await user.click(screen.getByRole('button', { name: 'إعادة تعيين' }))
    await user.click(screen.getByRole('button', { name: 'اضغط مرة أخرى للتأكيد' }))

    expect(useStatsStore.getState().byType).toEqual({})
  })
})
