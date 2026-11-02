import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { getDialogueLines, getRoles, isLearnerLine, learnerLines } from '@/lib/rolePlay'
import { getStoriesForLevel, SPEAKER_PITCH } from '@/lib/stories'
import { useSettingsStore } from '@/store/settingsStore'

import RolePlayPage from './RolePlayPage'

const speech = vi.hoisted(() => ({ spoken: [] as Array<{ text: string; pitch?: number }>, stop: vi.fn() }))

vi.mock('@/services/speech', () => ({
  GERMAN_LOCALE: 'de-DE',
  speechService: {
    isSupported: () => true,
    speak: (text: string, options: { pitch?: number }) => {
      speech.spoken.push({ text, pitch: options.pitch })
    },
    stop: speech.stop,
    getStatus: () => 'idle',
  },
}))

vi.mock('@/services/recognition', async (importOriginal) => {
  const original = await importOriginal<typeof import('@/services/recognition')>()
  return { ...original, speechRecognizer: { isSupported: () => false, listen: vi.fn() } }
})

const dialogue = getStoriesForLevel('A1').find((story) => story.kind === 'dialogue')!
const reading = getStoriesForLevel('A1').find((story) => story.kind === 'reading')!
const lines = getDialogueLines(dialogue)
const roles = getRoles(lines)

function renderPage(story = dialogue) {
  return render(
    <MemoryRouter initialEntries={[`/levels/a1/texts/${story.id}/rollenspiel`]}>
      <Routes>
        <Route path="/levels/:level/texts/:itemId/rollenspiel" element={<RolePlayPage />} />
        <Route path="/levels/:level/texts/:itemId" element={<p>the story page</p>} />
        <Route path="/levels/:level" element={<p>level page</p>} />
      </Routes>
    </MemoryRouter>,
  )
}

/** Answers the line on screen exactly as it should be, then moves on. */
async function answerCorrectly(user: ReturnType<typeof userEvent.setup>, german: string) {
  await user.type(screen.getByLabelText('اكتب الجملة بالألمانية'), german)
  await user.click(screen.getByRole('button', { name: 'تحقّق' }))
}

describe('RolePlayPage', () => {
  beforeEach(() => {
    speech.spoken.length = 0
    useSettingsStore.getState().resetToDefaults()
  })

  it('has a conversation with two parts to play', () => {
    expect(roles).toHaveLength(2)
  })

  it('offers each speaker as a part, by name', () => {
    renderPage()
    expect(screen.getByRole('heading', { level: 2, name: 'من تريد أن تكون؟' })).toBeInTheDocument()
    for (const role of roles) expect(screen.getByRole('button', { name: `أريد دور ${role.name}` })).toBeInTheDocument()
  })

  it('sends a reading text back to the text, which has no speakers', () => {
    renderPage(reading)
    expect(screen.getByText('the story page')).toBeInTheDocument()
  })

  it('has the other speaker open the conversation, in their own voice, when the learner takes the second part', async () => {
    const user = userEvent.setup()
    renderPage()
    const second = roles.find((role) => role.speaker !== lines[0].speaker)!
    await user.click(screen.getByRole('button', { name: `أريد دور ${second.name}` }))

    expect(speech.spoken[0]).toEqual({ text: lines[0].de, pitch: SPEAKER_PITCH[lines[0].speaker] })
    expect(screen.getByText(lines[0].de)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'حان دوري' })).toBeInTheDocument()
  })

  it('shows the Arabic of the learner’s line, and marks the answer word by word', async () => {
    const user = userEvent.setup()
    renderPage()
    const first = roles.find((role) => role.speaker === lines[0].speaker)!
    await user.click(screen.getByRole('button', { name: `أريد دور ${first.name}` }))
    expect(screen.getByText(lines[0].ar)).toBeInTheDocument()

    await answerCorrectly(user, lines[0].de)
    expect(screen.getByText(/ممتاز/)).toBeInTheDocument()
    expect(screen.getByText(/100٪/)).toBeInTheDocument()
  })

  it('marks a missing word and gives the right line', async () => {
    const user = userEvent.setup()
    renderPage()
    const first = roles.find((role) => role.speaker === lines[0].speaker)!
    await user.click(screen.getByRole('button', { name: `أريد دور ${first.name}` }))

    const target = lines[0].de
    const words = target.split(/\s+/)
    // Leaving a word out only makes a test if the line has more than one.
    expect(words.length).toBeGreaterThan(1)
    await answerCorrectly(user, words.slice(1).join(' '))
    expect(screen.getByText('غائبة')).toBeInTheDocument()
    expect(screen.getByText(target)).toBeInTheDocument()
  })

  it('shows the start of the line as a hint on request', async () => {
    const user = userEvent.setup()
    renderPage()
    const first = roles.find((role) => role.speaker === lines[0].speaker)!
    await user.click(screen.getByRole('button', { name: `أريد دور ${first.name}` }))
    await user.click(screen.getByRole('button', { name: 'تلميح' }))
    expect(screen.getByText(/تلميح:/)).toBeInTheDocument()
  })

  it('plays a whole conversation through and sums it up', async () => {
    const user = userEvent.setup()
    renderPage()
    const part = roles[0]
    await user.click(screen.getByRole('button', { name: `أريد دور ${part.name}` }))

    for (let step = 0; step < lines.length; step += 1) {
      if (isLearnerLine(lines[step], part.speaker)) {
        await answerCorrectly(user, lines[step].de)
        await user.click(screen.getByRole('button', { name: step + 1 >= lines.length ? 'أنهِ المحادثة' : 'التالي' }))
      } else {
        await user.click(screen.getByRole('button', { name: 'حان دوري' }))
      }
    }

    expect(screen.getByRole('heading', { name: 'أنهيت المحادثة' })).toBeInTheDocument()
    const mine = learnerLines(lines, part.speaker).length
    expect(screen.getByText((_, element) => element?.tagName === 'P' && element.textContent?.startsWith(`أجبت عن ${mine} من ${mine}`) === true)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'أعد المحاولة' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: `العب دور ${roles[1].name}` })).toBeInTheDocument()
  })
})
