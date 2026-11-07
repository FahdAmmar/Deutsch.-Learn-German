import { expect, test } from '@playwright/test'

test.describe('level addresses', () => {
  for (const level of ['a1', 'a2']) {
    test(`/levels/${level} leads to the one study plan`, async ({ page }) => {
      await page.goto(`/levels/${level}`)
      await expect(page).toHaveURL(/\/levels$/)
      await expect(page.getByRole('navigation', { name: 'خطة الدراسة من A1 إلى A2' })).toBeVisible()
      await expect(page.getByRole('tab')).toHaveCount(0)
    })
  }
})

test.describe('the study plan', () => {
  test('opens from the header on any page and lists A1 and A2 in one list', async ({ page }) => {
    await page.goto('/lessons/a1/alphabet')
    await page.getByRole('button', { name: /خطة الدراسة/ }).click()
    const dialog = page.getByRole('dialog', { name: 'خطة الدراسة' })
    await expect(dialog.getByRole('navigation', { name: 'خطة الدراسة من A1 إلى A2' })).toBeVisible()
    // The step being read is marked.
    await expect(dialog.getByRole('link', { current: 'step' })).toContainText('Alphabet')
    await page.keyboard.press('Escape')
    await expect(dialog).toHaveCount(0)
  })
})

test.describe('texts & conversations', () => {
  test('a text opens from the library and the back link returns to it', async ({ page }) => {
    await page.goto('/levels/a1?tab=stories')

    await page.getByRole('link', { name: /Mein Tag/ }).click()
    await expect(page).toHaveURL(/\/levels\/a1\/texts\/a1-read-02$/)
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Mein Tag')
    await expect(page.getByRole('group', { name: 'مشغّل الصوت' })).toBeVisible()

    await page.getByRole('link', { name: /نصوص ومحادثات A1/ }).click()
    await expect(page).toHaveURL(/\/levels\/a1\?tab=stories$/)
    await expect(page.getByRole('heading', { name: /نصوص ومحادثات/, level: 1 })).toBeVisible()
  })

  test('a conversation opens from the A2 list', async ({ page }) => {
    await page.goto('/levels/a2?tab=stories')
    await page.getByRole('link', { name: /Die Wohnungsbesichtigung/ }).click()
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Die Wohnungsbesichtigung')
  })

  test('the seek bar works from the keyboard', async ({ page }) => {
    await page.goto('/levels/a1/texts/a1-read-01')
    const seek = page.getByRole('slider', { name: 'التنقّل بين الجمل' })

    await expect(seek).toHaveAttribute('aria-valuetext', /^الجملة 1 من \d+$/)
    await seek.focus()
    await seek.press('ArrowRight')
    await expect(seek).toHaveAttribute('aria-valuetext', /^الجملة 2 من \d+$/)
  })

  test('the speed chip steps through the speeds', async ({ page }) => {
    await page.goto('/levels/a1/texts/a1-read-01')
    await expect(page.getByRole('button', { name: /سرعة القراءة ×0\.90/ })).toBeVisible()
    await page.getByRole('button', { name: /سرعة القراءة/ }).click()
    await expect(page.getByRole('button', { name: /سرعة القراءة ×1\.00/ })).toBeVisible()
  })

  test('the Arabic translation can be hidden, and the choice is remembered', async ({ page }) => {
    await page.goto('/levels/a1/texts/a1-read-01')
    const toggle = page.getByRole('button', { name: 'الترجمة العربية' })
    const translations = page.locator('article p[dir="rtl"].leading-8')

    await expect(toggle).toHaveAttribute('aria-pressed', 'true')
    await expect(translations.first()).toBeVisible()

    await toggle.click()
    await expect(toggle).toHaveAttribute('aria-pressed', 'false')
    await expect(translations).toHaveCount(0)

    await page.reload()
    await expect(page.getByRole('button', { name: 'الترجمة العربية' })).toHaveAttribute('aria-pressed', 'false')
    await expect(translations).toHaveCount(0)
  })

  test('an unknown story returns to the level’s texts tab', async ({ page }) => {
    await page.goto('/levels/a1/texts/does-not-exist')
    await expect(page).toHaveURL(/\/levels\/a1\?tab=stories$/)
  })
})
