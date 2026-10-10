import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

const PAGES = [
  '/dashboard',
  '/lessons/a2/adjektivdeklination',
  '/levels/a1?tab=stories',
  '/levels/a1/texts/a1-read-01',
  '/levels/a2/texts/dialogue-wohnung-formell',
  '/grammar',
  '/grammar/a2/25-adjektivdeklination',
  '/vocabulary',
  '/settings',
]

for (const scheme of ['light', 'dark'] as const) {
  test.describe(`WCAG 2.1 AA — ${scheme} theme`, () => {
    test.use({ colorScheme: scheme })

    for (const path of PAGES) {
      test(path, async ({ page }) => {
        await page.goto(path)
        await page.waitForLoadState('networkidle')
        const { violations } = await new AxeBuilder({ page })
          .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
          .analyze()
        expect(violations.map((violation) => `${violation.id} (${violation.nodes.length})`)).toEqual([])
      })
    }
  })
}
