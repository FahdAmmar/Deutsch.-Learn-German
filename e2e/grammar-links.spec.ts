import { expect, test } from '@playwright/test'

test('a lesson links to its grammar rule and the rule links back', async ({ page }) => {
  await page.goto('/lessons/a2/adjektivdeklination')

  const related = page.getByRole('navigation', { name: 'للتوسّع: الدرس الكامل في قسم القواعد' })
  await related.getByRole('link').first().click()
  await expect(page).toHaveURL(/\/grammar\/a2\/25-adjektivdeklination$/)

  const lessons = page.getByRole('navigation', { name: 'تدرّب على هذه القاعدة في الدروس' })
  await lessons.getByRole('link').first().click()
  await expect(page).toHaveURL(/\/lessons\/a2\/adjektivdeklination$/)
})
