import { render, screen, within, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import MyTextPage from '@/pages/MyTextPage'
import { useMyTextStore } from '@/store/myTextStore'

const speech = vi.hoisted(() => ({ spoken: [] as string[], stop: vi.fn() }))

vi.mock('@/services/speech', () => ({
  GERMAN_LOCALE: 'de-DE',
  speechService: {
    isSupported: () => true,
    speak: (text: string) => {
      speech.spoken.push(text)
    },
    stop: speech.stop,
    getStatus: () => 'idle',
  },
}))

const TEXT = 'Ich heiße Lina und ich wohne in Berlin. Ich lerne Deutsch.'

function renderPage() {
  return render(
    <MemoryRouter initialEntries={['/my-text']}>
      <Routes>
        <Route path="/my-text" element={<MyTextPage />} />
        <Route path="/my-text/:id" element={<p>practice page</p>} />
      </Routes>
    </MemoryRouter>,
  )
}

const getText = () => screen.getByLabelText('النص الألماني') as HTMLTextAreaElement
const getPreview = () => screen.getByRole('region', { name: 'معاينة المقاطع' })
const partsShown = () => within(getPreview()).queryAllByRole('listitem').map((item) => item.querySelector('p')?.textContent)

async function enter(user: ReturnType<typeof userEvent.setup>, text: string, title = '') {
  if (title) await user.type(screen.getByLabelText(/العنوان/), title)
  await user.click(getText())
  await user.paste(text)
}

describe('MyTextPage', () => {
  beforeEach(() => {
    window.localStorage.clear()
    useMyTextStore.setState({ texts: [] })
    speech.spoken.length = 0
    speech.stop.mockClear()
  })

  it('opens with an empty preview and an invitation to add a first text', () => {
    renderPage()
    expect(screen.getByRole('heading', { level: 1, name: 'تدريب على نصّي' })).toBeInTheDocument()
    expect(within(getPreview()).getByText('ستظهر المقاطع هنا')).toBeInTheDocument()
    expect(screen.getByText('لم تحفظ أي نص بعد')).toBeInTheDocument()
  })

  it('fills in a ready-made text on request', async () => {
    const user = userEvent.setup()
    renderPage()
    await user.click(screen.getByRole('button', { name: 'جرّب نصًا جاهزًا' }))

    expect(getText().value).toContain('Ich heiße Lina')
    expect(partsShown().length).toBeGreaterThan(3)
    expect(screen.queryByRole('button', { name: 'جرّب نصًا جاهزًا' })).not.toBeInTheDocument()
  })

  it('cuts the text into parts as it is typed, and again when the method or the length changes', async () => {
    const user = userEvent.setup()
    renderPage()
    await enter(user, TEXT)

    // Short phrases are the default: the long first sentence is cut, the short one is not.
    expect(partsShown()).toEqual(['Ich heiße Lina', 'und ich wohne in Berlin.', 'Ich lerne Deutsch.'])

    await user.click(screen.getByRole('radio', { name: /جملة جملة/ }))
    expect(partsShown()).toEqual(['Ich heiße Lina und ich wohne in Berlin.', 'Ich lerne Deutsch.'])

    await user.click(screen.getByRole('radio', { name: /سطرًا سطرًا/ }))
    expect(partsShown()).toEqual([TEXT])

    await user.click(screen.getByRole('radio', { name: /عبارات قصيرة/ }))
    const before = partsShown().length
    fireEvent.change(screen.getByRole('slider'), { target: { value: '3' } })
    expect(partsShown().length).toBeGreaterThan(before)
  })

  it('reads one part aloud when its listen button is pressed', async () => {
    const user = userEvent.setup()
    renderPage()
    await enter(user, TEXT)
    await user.click(screen.getByRole('button', { name: 'استمع إلى المقطع 2' }))
    expect(speech.spoken).toEqual(['und ich wohne in Berlin.'])
  })

  it('says what is wrong instead of saving an empty or non-German text', async () => {
    const user = userEvent.setup()
    renderPage()

    await user.click(screen.getByRole('button', { name: 'احفظ فقط' }))
    expect(screen.getByRole('alert')).toHaveTextContent('اكتب النص أو الصقه أولًا.')

    await enter(user, 'مرحبا بكم في درس اللغة الألمانية')
    await user.click(screen.getByRole('button', { name: 'احفظ فقط' }))
    expect(screen.getByRole('alert')).toHaveTextContent('ألمانيًا')
    expect(useMyTextStore.getState().texts).toEqual([])
  })

  it('saves a text to the list and clears the form', async () => {
    const user = userEvent.setup()
    renderPage()
    await enter(user, TEXT, 'Meine Vorstellung')
    await user.click(screen.getByRole('button', { name: 'احفظ فقط' }))

    expect(screen.getByRole('status')).toHaveTextContent('تم حفظ النص في قائمتك.')
    expect(getText().value).toBe('')
    const list = screen.getByRole('region', { name: 'نصوصي' })
    expect(within(list).getByText('Meine Vorstellung')).toBeInTheDocument()
    expect(within(list).getByText(/3 مقطع/)).toBeInTheDocument()
    expect(useMyTextStore.getState().texts[0]).toMatchObject({ title: 'Meine Vorstellung', text: TEXT, mode: 'phrases', maxWords: 6 })
  })

  it('goes straight to the dictation when asked to save and start', async () => {
    const user = userEvent.setup()
    renderPage()
    await enter(user, TEXT)
    await user.click(screen.getByRole('button', { name: 'احفظ وابدأ الإملاء' }))

    expect(screen.getByText('practice page')).toBeInTheDocument()
    expect(useMyTextStore.getState().texts).toHaveLength(1)
  })

  it('edits a saved text and keeps it in one piece', async () => {
    const user = userEvent.setup()
    const saved = useMyTextStore.getState().addText({ title: 'Alt', text: TEXT, mode: 'sentences', maxWords: 6 })!
    renderPage()

    await user.click(screen.getByRole('button', { name: 'تعديل' }))
    expect(screen.getByRole('heading', { name: 'تعديل النص' })).toBeInTheDocument()
    expect(getText().value).toBe(TEXT)
    expect(screen.getByRole('radio', { name: /جملة جملة/ })).toBeChecked()

    const title = screen.getByLabelText(/العنوان/)
    await user.clear(title)
    await user.type(title, 'Neu')
    await user.click(screen.getByRole('button', { name: 'احفظ فقط' }))

    expect(useMyTextStore.getState().texts).toHaveLength(1)
    expect(useMyTextStore.getState().texts[0]).toMatchObject({ id: saved.id, title: 'Neu' })
    expect(screen.getByRole('heading', { name: 'أضف نصًا جديدًا' })).toBeInTheDocument()
  })

  it('leaves edit mode without saving when cancelled', async () => {
    const user = userEvent.setup()
    useMyTextStore.getState().addText({ title: 'Alt', text: TEXT, mode: 'phrases', maxWords: 6 })
    renderPage()
    await user.click(screen.getByRole('button', { name: 'تعديل' }))
    await user.click(screen.getByRole('button', { name: 'إلغاء التعديل' }))

    expect(screen.getByRole('heading', { name: 'أضف نصًا جديدًا' })).toBeInTheDocument()
    expect(useMyTextStore.getState().texts[0].title).toBe('Alt')
  })

  it('asks before deleting, and deletes only when confirmed', async () => {
    const user = userEvent.setup()
    useMyTextStore.getState().addText({ title: 'Weg damit', text: TEXT, mode: 'phrases', maxWords: 6 })
    renderPage()

    await user.click(screen.getByRole('button', { name: 'حذف' }))
    await user.click(screen.getByRole('button', { name: 'إلغاء' }))
    expect(useMyTextStore.getState().texts).toHaveLength(1)

    await user.click(screen.getByRole('button', { name: 'حذف' }))
    await user.click(screen.getByRole('button', { name: 'تأكيد الحذف' }))
    expect(useMyTextStore.getState().texts).toEqual([])
    expect(screen.getByText('لم تحفظ أي نص بعد')).toBeInTheDocument()
  })

  it('links each saved text to its dictation', () => {
    const saved = useMyTextStore.getState().addText({ title: 'Link', text: TEXT, mode: 'phrases', maxWords: 6 })!
    renderPage()
    expect(screen.getByRole('link', { name: 'تدرّب' })).toHaveAttribute('href', `/my-text/${saved.id}`)
  })
})
