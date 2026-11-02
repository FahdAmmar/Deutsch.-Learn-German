import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { beforeEach, describe, expect, it } from 'vitest'

import { useSettingsStore } from '@/store/settingsStore'

import PracticePage from '@/pages/PracticePage'
import { getModulesForLevel } from '@/lib/curriculum'
import { useProgressStore } from '@/store/progressStore'
import { useStatsStore } from '@/store/statsStore'

function renderPage(path = '/practice') {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <PracticePage />
    </MemoryRouter>,
  )
}

describe('PracticePage', () => {
  beforeEach(() => {
    useProgressStore.getState().resetProgress()
    useStatsStore.getState().resetStats()
  })

  it('offers the general, word and number practice modes', () => {
    renderPage()
    expect(screen.getByRole('heading', { name: 'جلسة مختلطة' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'أدوات التعريف' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'نقاط ضعفي' })).toBeInTheDocument()
    for (const name of ['الجمع', 'تصريف الأفعال', 'تخمين الأداة من الشكل', 'الأرقام', 'الساعة', 'الأسعار']) {
      expect(screen.getByRole('heading', { name })).toBeInTheDocument()
    }
  })

  it('starts a generated number session whose questions are about numbers', async () => {
    const user = userEvent.setup()
    renderPage()

    await user.click(screen.getByRole('button', { name: 'ابدأ التدريب: الأرقام' }))

    expect(screen.getByRole('heading', { name: 'تدريب الأرقام' })).toBeInTheDocument()
    expect(screen.getByRole('progressbar', { name: 'تقدّم التمارين' })).toBeInTheDocument()
    // The first question of a number session is heard, read or written: it always asks about a number.
    expect(screen.getAllByText(/الرقم/).length).toBeGreaterThan(0)
  })

  it('keeps the dates drill for A2, and says why it cannot start at A1', async () => {
    useProgressStore.setState({ currentLevel: 'A1' })
    const user = userEvent.setup()
    renderPage()

    expect(screen.getByRole('button', { name: 'ابدأ التدريب: التواريخ' })).toBeDisabled()
    expect(screen.getByText(/التواريخ بالأرقام الترتيبية من مستوى A2/)).toBeInTheDocument()

    await user.click(screen.getByRole('tab', { name: /A2/ }))
    expect(screen.getByRole('button', { name: 'ابدأ التدريب: التواريخ' })).toBeEnabled()
  })

  it('explains why weak-spot practice is not available before any answers exist', () => {
    renderPage()
    expect(screen.getByRole('button', { name: 'ركّز على نقاط ضعفي: نقاط ضعفي' })).toBeDisabled()
    expect(screen.getByText(/أجب عن بعض التمارين أولاً/)).toBeInTheDocument()
  })

  it('starts an article drill whose options are der, die and das', async () => {
    const user = userEvent.setup()
    renderPage()

    await user.click(screen.getByRole('button', { name: 'ابدأ التدريب: أدوات التعريف' }))

    expect(screen.getByRole('heading', { name: 'تدريب أدوات التعريف' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /der/ })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /die/ })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /das/ })).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'العودة لأنماط التدريب' }))
    expect(screen.getByRole('heading', { name: 'جلسة مختلطة' })).toBeInTheDocument()
  })

  it('enables weak-spot practice once a topic has enough wrong answers', async () => {
    const [module] = getModulesForLevel('A1')
    useStatsStore.getState().replaceStats({ days: {}, byType: {}, byModule: { [module.id]: { attempts: 10, correct: 3 } } })
    const user = userEvent.setup()
    renderPage()

    const start = screen.getByRole('button', { name: 'ركّز على نقاط ضعفي: نقاط ضعفي' })
    expect(start).toBeEnabled()
    await user.click(start)
    expect(screen.getByRole('heading', { name: 'نقاط ضعفي', level: 2 })).toBeInTheDocument()
  })
})

describe('PracticePage — grammar and deeper vocabulary', () => {
  beforeEach(() => {
    useProgressStore.getState().resetProgress()
    useStatsStore.getState().resetStats()
    useSettingsStore.getState().resetToDefaults()
  })

  it('offers the case, adjective, word-order, collocation and word-family drills', () => {
    renderPage()
    for (const name of ['الحالات: أي أداة؟', 'نهايات الصفات', 'ترتيب الجملة', 'التلازمات اللفظية', 'عائلات الكلمات']) {
      expect(screen.getByRole('heading', { name })).toBeInTheDocument()
    }
  })

  it('starts a case session of sentences with a blank for the article', async () => {
    const user = userEvent.setup()
    renderPage()
    await user.click(screen.getByRole('button', { name: 'ابدأ التدريب: الحالات: أي أداة؟' }))
    expect(screen.getByRole('heading', { name: 'الحالات: أي أداة؟' })).toBeInTheDocument()
    expect(screen.getByRole('progressbar', { name: 'تقدّم التمارين' })).toBeInTheDocument()
  })

  it('keeps adjective endings for A2, and says why it cannot start at A1', async () => {
    useProgressStore.setState({ currentLevel: 'A1' })
    const user = userEvent.setup()
    renderPage()
    expect(screen.getByRole('button', { name: 'ابدأ التدريب: نهايات الصفات' })).toBeDisabled()
    expect(screen.getByText(/نهايات الصفات من مستوى A2/)).toBeInTheDocument()
    await user.click(screen.getByRole('tab', { name: /A2/ }))
    expect(screen.getByRole('button', { name: 'ابدأ التدريب: نهايات الصفات' })).toBeEnabled()
  })

  it('starts a word-order session of ordering questions', async () => {
    const user = userEvent.setup()
    renderPage()
    await user.click(screen.getByRole('button', { name: 'ابدأ التدريب: ترتيب الجملة' }))
    expect(screen.getByRole('heading', { name: 'ترتيب الجملة' })).toBeInTheDocument()
    expect(screen.getByText(/رتّب الأجزاء لتكوين جملة صحيحة/)).toBeInTheDocument()
  })

  it('starts a collocation session that asks for the verb', async () => {
    const user = userEvent.setup()
    renderPage()
    await user.click(screen.getByRole('button', { name: 'ابدأ التدريب: التلازمات اللفظية' }))
    expect(screen.getByText(/اختر الفعل الذي يأتي مع هذا التعبير/)).toBeInTheDocument()
  })

  it('starts a word-family session of sentences with a word missing', async () => {
    const user = userEvent.setup()
    renderPage()
    await user.click(screen.getByRole('button', { name: 'ابدأ التدريب: عائلات الكلمات' }))
    expect(screen.getByText(/أكمل الجملة بكلمة من عائلة/)).toBeInTheDocument()
  })

  it('has the reference panels for the case tables, word order, collocations and families', async () => {
    const user = userEvent.setup()
    renderPage()
    for (const title of [/جداول الحالات/, /ترتيب الجملة: أين يقف الفعل/, /التلازمات اللفظية: أي فعل/, /عائلات الكلمات: كلمة واحدة/]) {
      expect(screen.getByText(title)).toBeInTheDocument()
    }
    // The panels are light until opened: nothing of their content is on the page yet.
    expect(screen.queryByText('ein Foto machen')).not.toBeInTheDocument()
    await user.click(screen.getByText(/التلازمات اللفظية: أي فعل/))
    expect(await screen.findByText('ein Foto machen')).toBeInTheDocument()
  })
})

describe('PracticePage — today’s session', () => {
  beforeEach(() => {
    useProgressStore.getState().resetProgress()
    useStatsStore.getState().resetStats()
    useSettingsStore.getState().resetToDefaults()
  })

  it('offers it first among the general sessions, saying what it is made of', () => {
    renderPage()
    expect(screen.getByRole('heading', { name: 'جلسة اليوم' })).toBeInTheDocument()
    // With no progress there is nothing to review and no weak spot: it is all new questions, as many as the goal.
    expect(screen.getByText('10 سؤالاً: 10 جديدة')).toBeInTheDocument()
  })

  it('follows the daily goal in the session size', () => {
    useSettingsStore.getState().setDailyGoal(5)
    renderPage()
    expect(screen.getByText('5 سؤالاً: 5 جديدة')).toBeInTheDocument()
  })

  it('starts when asked', async () => {
    const user = userEvent.setup()
    renderPage()
    await user.click(screen.getByRole('button', { name: 'ابدأ جلسة اليوم: جلسة اليوم' }))
    expect(screen.getByRole('heading', { name: 'جلسة اليوم' })).toBeInTheDocument()
    expect(screen.getByRole('progressbar', { name: 'تقدّم التمارين' })).toBeInTheDocument()
  })

  it('starts at once when the dashboard links here with ?session=daily', () => {
    renderPage('/practice?session=daily')
    expect(screen.getByRole('progressbar', { name: 'تقدّم التمارين' })).toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: 'جلسة مختلطة' })).not.toBeInTheDocument()
  })
})
