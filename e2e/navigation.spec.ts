import { expect, test } from '@playwright/test'

const ROUTES: ReadonlyArray<{ path: string; heading: RegExp | string }> = [
  { path: '/dashboard', heading: /مرحباً/ },
  { path: '/levels', heading: 'المستويات' },
  { path: '/levels/a2', heading: /المستوى/ },
  { path: '/levels/a1?tab=stories', heading: /الألمانية/ },
  { path: '/levels/a1/texts/a1-read-01', heading: 'Ich stelle mich vor' },
  { path: '/levels/a1/texts/dialogue-wohnung-informell', heading: 'Im Wohnzimmer' },
  { path: '/levels/a2/texts/dialogue-wohnungssuche-formell', heading: 'Die Wohnungsbesichtigung' },
  { path: '/lessons/a2/adjektivdeklination', heading: 'Adjektivdeklination' },
  { path: '/lessons/a1/essen-und-trinken', heading: 'Essen und Trinken' },
  { path: '/grammar', heading: 'القواعد' },
  { path: '/grammar/a2/25-adjektivdeklination', heading: /Adjektivdeklination/ },
  { path: '/vocabulary', heading: 'المفردات' },
  { path: '/practice', heading: 'التمارين' },
  { path: '/pronunciation', heading: 'تدريب النطق' },
  { path: '/my-text/weak-words', heading: 'لا توجد كلمات صعبة الآن' },
  { path: '/progress', heading: 'التقدّم' },
  { path: '/settings', heading: 'الإعدادات' },
]

test.describe('routes render without horizontal overflow', () => {
  for (const { path, heading } of ROUTES) {
    test(path, async ({ page }) => {
      await page.goto(path)
      await expect(page.getByRole('heading', { level: 1 }).first()).toContainText(heading)
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
      )
      expect(overflow).toBe(0)
    })
  }
})

test('unknown route shows the 404 page', async ({ page }) => {
  await page.goto('/does-not-exist')
  await expect(page.getByRole('heading', { level: 1 })).toContainText('غير موجودة')
})
