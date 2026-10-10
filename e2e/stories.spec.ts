import { expect, test } from '@playwright/test'

test.describe('level page tabs', () => {
  for (const level of ['a1', 'a2']) {
    test(`${level.toUpperCase()} has only Lessons and Texts & conversations — no Grammar tab`, async ({ page }) => {
      await page.goto(`/levels/${level}`)
      const tabs = page.getByRole('tab')
      await expect(tabs).toHaveText(['الدروس', 'نصوص ومحادثات'])
      await expect(page.getByRole('tab', { name: 'القواعد' })).toHaveCount(0)
    })
  }
})

test.describe('texts & conversations', () => {
  test('a text opens from the list and the back link returns to the same tab', async ({ page }) => {
    await page.goto('/levels/a1')
    await page.getByRole('tab', { name: 'نصوص ومحادثات' }).click()
    await expect(page).toHaveURL(/tab=stories/)

    await page.getByRole('link', { name: /Mein Tag/ }).click()
    await expect(page).toHaveURL(/\/levels\/a1\/texts\/a1-read-02$/)
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Mein Tag')
    await expect(page.getByRole('group', { name: 'مشغّل الصوت' })).toBeVisible()

    await page.getByRole('link', { name: /نصوص ومحادثات A1/ }).click()
    await expect(page).toHaveURL(/\/levels\/a1\?tab=stories$/)
    await expect(page.getByRole('tab', { name: 'نصوص ومحادثات' })).toHaveAttribute('aria-selected', 'true')
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
