import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { beforeEach, describe, expect, it } from 'vitest'

import LevelDetailPage from '@/pages/LevelDetailPage'
import LevelsPage from '@/pages/LevelsPage'
import { useProgressStore } from '@/store/progressStore'

function renderWithRoutes(initialPath: string) {
  return render(
    <MemoryRouter initialEntries={[initialPath]}>
      <Routes>
        <Route path="/levels" element={<LevelsPage />} />
        <Route path="/levels/:level" element={<LevelDetailPage />} />
      </Routes>
    </MemoryRouter>,
  )
}

const planList = () => screen.getByRole('navigation', { name: 'خطة الدراسة من A1 إلى A2' })

describe('the study plan page', () => {
  beforeEach(() => {
    useProgressStore.getState().resetProgress()
  })

  it('is one list for A1 and A2, with a heading for each level and a button for each chapter', () => {
    renderWithRoutes('/levels')

    const list = within(planList())
    expect(list.getByRole('heading', { name: 'الألمانية للمبتدئين' })).toBeInTheDocument()
    expect(list.getAllByRole('heading', { level: 3 })).toHaveLength(2)
    // 10 chapters in A1 and 9 in A2, each a toggle.
    expect(list.getAllByRole('button').filter((button) => button.hasAttribute('aria-expanded'))).toHaveLength(19)
    // No second level of maps: no tabs, no track, no level cards.
    expect(screen.queryByRole('tab')).not.toBeInTheDocument()
    expect(screen.queryByRole('list', { name: 'مراحل المسار' })).not.toBeInTheDocument()
  })

  it('numbers the chapters straight through: the first chapter of A2 is the eleventh', () => {
    renderWithRoutes('/levels')

    const chapters = within(planList()).getAllByRole('button').filter((button) => button.hasAttribute('aria-expanded') && button.textContent !== null)
    expect(chapters[0]).toHaveTextContent('البداية')
    expect(chapters[10]).toHaveTextContent('المقارنة والحكي')
    expect(chapters[10]).toHaveTextContent('11')
  })

  it('opens only the chapter to continue with, and the learner opens the others', async () => {
    const user = userEvent.setup()
    renderWithRoutes('/levels')

    const list = within(planList())
    expect(list.getByRole('link', { name: /Begrüßungen/ })).toBeInTheDocument()
    expect(list.queryByRole('link', { name: /Alphabet/ })).not.toBeInTheDocument()

    await user.click(list.getByRole('button', { name: /الحروف والأرقام/ }))
    expect(list.getByRole('link', { name: /Alphabet/ })).toHaveAttribute('href', '/lessons/a1/alphabet')
  })

  it('lists every step of A1 and A2 — lessons, grammar rules, texts and conversations — once opened all', async () => {
    const user = userEvent.setup()
    renderWithRoutes('/levels')

    await user.click(within(planList()).getByRole('button', { name: 'فتح الكل' }))
    const links = within(planList()).getAllByRole('link')
    const hrefs = links.map((link) => link.getAttribute('href') ?? '')
    // Lessons: A1 53 and A2 45 (vocabulary themes included); rules: 16 and 18; texts and conversations as listed.
    expect(hrefs.filter((href) => href.startsWith('/lessons/'))).toHaveLength(53 + 45)
    expect(hrefs.filter((href) => href.startsWith('/grammar/'))).toHaveLength(16 + 18)
    expect(hrefs.filter((href) => href.includes('/texts/'))).toHaveLength(17 + 12 + 18 + 23)
    expect(new Set(hrefs).size).toBe(hrefs.length)
    expect(within(planList()).getByRole('button', { name: 'طيّ الكل' })).toBeInTheDocument()
  })

  it('puts lessons, rules, texts and conversations of a chapter in learning order, each named by its kind', async () => {
    const user = userEvent.setup()
    renderWithRoutes('/levels')

    const list = within(planList())
    await user.click(list.getByRole('button', { name: /الأفعال وبناء الجملة/ }))
    const group = document.getElementById('plan-chapter-verben-saetze')!
    const rows = Array.from(group.querySelectorAll('ol > li > a')).map((link) => link.textContent ?? '')
    const at = (title: string) => rows.findIndex((text) => text.includes(title))
    // Modal verbs → their rule → a conversation full of modal verbs → negation → its rule → a text that needs kein.
    expect(at('Modalverben')).toBeGreaterThan(-1)
    expect(at('Modalverben')).toBeLessThan(at('Am Telefon'))
    expect(at('Am Telefon')).toBeLessThan(at('Negation'))
    expect(at('Negation')).toBeLessThan(at('Unser Hund Max'))
    for (const kind of ['درس', 'قاعدة', 'نص', 'محادثة']) expect(group.textContent).toContain(kind)
  })

  it('offers to start at the first step, and continues from the first step not done', () => {
    renderWithRoutes('/levels')
    expect(screen.getByRole('link', { name: 'ابدأ' })).toHaveAttribute('href', '/lessons/a1/begruessungen')
  })

  it('continues the plan from the first step not done and marks it as next', () => {
    for (const lessonId of ['a1-m01-l01', 'a1-m01-l02', 'a1-m01-l06', 'a1-m01-l07']) {
      useProgressStore.getState().completeLesson({ lessonId, moduleId: 'a1-m01', level: 'A1', accuracy: 1 })
    }
    renderWithRoutes('/levels')

    // The first chapter is half done; the plan goes on with the classroom phrases, in the chapter that is open.
    expect(screen.getByRole('link', { name: 'تابع' })).toHaveAttribute('href', '/lessons/a1/im-deutschkurs')
    expect(within(planList()).getByRole('link', { name: /Im Deutschkurs/ })).toHaveTextContent('التالي')
    // The chapter being worked on stays open.
    expect(within(planList()).getByRole('link', { name: /Begrüßungen/ })).toBeInTheDocument()
  })

  it('says which steps are done', () => {
    useProgressStore.getState().completeLesson({ lessonId: 'a1-m01-l01', moduleId: 'a1-m01', level: 'A1', accuracy: 1 })
    renderWithRoutes('/levels')

    expect(within(planList()).getByRole('link', { name: /Begrüßungen/ })).toHaveTextContent('مكتمل')
  })

  it('says that B1 and B2 are on their way, and offers the placement test', () => {
    renderWithRoutes('/levels')
    expect(screen.getByText(/B1 وB2 قيد الإعداد/)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'ابدأ اختبار تحديد المستوى' })).toHaveAttribute('href', '/placement-test')
  })
})

describe('level addresses', () => {
  beforeEach(() => {
    useProgressStore.getState().resetProgress()
  })

  it('leads /levels/a1 — which used to be the level path — to the plan', () => {
    renderWithRoutes('/levels/a1')
    expect(screen.getByRole('heading', { name: /الخطة الشاملة/ })).toBeInTheDocument()
    expect(planList()).toBeInTheDocument()
  })

  it('redirects to /levels when given an invalid level slug', () => {
    renderWithRoutes('/levels/z9')
    expect(screen.getByRole('heading', { name: /الخطة الشاملة/ })).toBeInTheDocument()
  })

  it('leads a level without content to the plan, which says it is coming', () => {
    renderWithRoutes('/levels/b1')
    expect(screen.getByText(/قيد الإعداد/)).toBeInTheDocument()
  })

  it('shows a coming-soon message for the texts of a level with none', () => {
    renderWithRoutes('/levels/b1?tab=stories')
    expect(screen.getByText(/محتوى هذا المستوى قيد الإعداد/)).toBeInTheDocument()
  })
})

describe('the texts & conversations library of a level', () => {
  beforeEach(() => {
    useProgressStore.getState().resetProgress()
  })

  it('lists reading texts and conversations together, as links to their own pages', () => {
    renderWithRoutes('/levels/a1?tab=stories')

    expect(screen.getByRole('heading', { name: /نصوص ومحادثات/, level: 1 })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /نصوص للقراءة/ })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /محادثات/, level: 2 })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Ich stelle mich vor/ })).toHaveAttribute('href', expect.stringMatching(/^\/levels\/a1\/texts\/.+/))
    expect(screen.getByRole('link', { name: /Im Wohnzimmer/ })).toHaveAttribute('href', expect.stringMatching(/^\/levels\/a1\/texts\/dialogue-wohnung-informell$/))
    expect(screen.getByRole('link', { name: /Mein Tag/ })).toBeInTheDocument()
  })

  it('lists A2 texts and conversations too', () => {
    renderWithRoutes('/levels/a2?tab=stories')

    expect(screen.getByRole('link', { name: /Zwei Wohnungen im Vergleich/ })).toHaveAttribute('href', expect.stringMatching(/^\/levels\/a2\/texts\//))
    expect(screen.getByRole('link', { name: /Mein Wochenende/ })).toBeInTheDocument()
  })
})
