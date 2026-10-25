import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

const PAGES = [
  '/dashboard',
  '/lessons/a2/adjektivdeklination',
  '/levels/a1?tab=stories',
  '/levels/a1/texts/a1-read-01',
  '/levels/a2/texts/dialogue-wohnungssuche-formell',
  '/grammar',
  '/grammar/a2/25-adjektivdeklination',
  '/vocabulary',
  '/practice',
  '/progress',
  '/review',
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

// The high-contrast and large-text settings change real colours and sizes, so they get the same audit.
test.describe('WCAG 2.1 AA — high contrast and large text', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem(
        'learn-german:preferences',
        JSON.stringify({ state: { settings: { highContrast: true, textScale: 'xlarge', onboardingDone: true } }, version: 0 }),
      )
    })
  })

  for (const scheme of ['light', 'dark'] as const) {
    test.describe(scheme, () => {
      test.use({ colorScheme: scheme })

      for (const path of ['/dashboard', '/progress', '/practice', '/vocabulary', '/settings']) {
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
})
