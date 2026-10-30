import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { beforeEach, describe, expect, it } from 'vitest'

import { getLessonsForLevel } from '@/lib/curriculum'
import { useProgressStore } from '@/store/progressStore'
import { useSpellingStore } from '@/store/spellingStore'

import HardWordsPage from './HardWordsPage'
import ReviewPage from './ReviewPage'

/** Answers one word wrong several times so it counts as hard. */
function makeHard(vocabularyId: string) {
  for (let attempt = 0; attempt < 4; attempt += 1) useProgressStore.getState().recordVocabularyReview(vocabularyId, false)
}

describe('HardWordsPage', () => {
  beforeEach(() => {
    useProgressStore.getState().resetProgress()
    useSpellingStore.getState().resetSpelling()
  })

  it('says so when no word is hard', () => {
    render(<MemoryRouter><HardWordsPage /></MemoryRouter>)
    expect(screen.getByText(/لا توجد كلمات صعبة الآن/)).toBeInTheDocument()
  })

  it('lists a word that was answered wrong repeatedly, with how often', () => {
    const word = getLessonsForLevel('A1')[0].vocabulary[0]
    makeHard(word.id)
    render(<MemoryRouter><HardWordsPage /></MemoryRouter>)

    expect(screen.getByText(/لديك/)).toBeInTheDocument()
    expect(screen.getByText(word.meaningAr)).toBeInTheDocument()
    expect(screen.getByText(/أخطأت/)).toBeInTheDocument()
  })

  it('starts a recall session on those words', async () => {
    const user = userEvent.setup()
    makeHard(getLessonsForLevel('A1')[0].vocabulary[0].id)
    render(<MemoryRouter><HardWordsPage /></MemoryRouter>)

    await user.click(screen.getByRole('button', { name: /تدرّب على 1 كلمة/ }))

    expect(screen.getByText('ما معنى هذه الكلمة؟')).toBeInTheDocument()
  })
})

describe('ReviewPage hard-words link', () => {
  beforeEach(() => {
    useProgressStore.getState().resetProgress()
    useSpellingStore.getState().resetSpelling()
  })

  it('shows the link only when there are hard words', () => {
    const { unmount } = render(<MemoryRouter><ReviewPage /></MemoryRouter>)
    expect(screen.queryByRole('link', { name: /كلماتي الصعبة/ })).not.toBeInTheDocument()
    unmount()

    makeHard(getLessonsForLevel('A1')[0].vocabulary[0].id)
    render(<MemoryRouter><ReviewPage /></MemoryRouter>)
    expect(screen.getByRole('link', { name: /كلماتي الصعبة/ })).toHaveAttribute('href', '/review/hard-words')
  })
})
