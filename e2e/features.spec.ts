import { expect, test } from '@playwright/test'

/**
 * Journeys across the frontend features: global search, keyboard answering,
 * display preferences and the first-run welcome. Each test starts with fresh
 * browser storage (Playwright's default), i.e. a first-time visitor.
 */

test.describe('global search', () => {
  test('opens with Ctrl+K, finds a word and lands on the vocabulary page with it searched', async ({ page, isMobile }) => {
    test.skip(isMobile, 'Ctrl+K is a keyboard shortcut; the header button covers touch devices below.')
    await page.goto('/dashboard')

    await page.keyboard.press('Control+K')
    const dialog = page.getByRole('dialog', { name: 'بحث' })
    await expect(dialog).toBeVisible()

    await dialog.getByRole('combobox').fill('der tisch')
    await expect(dialog.getByRole('option').first()).toContainText('der Tisch')
    await page.keyboard.press('Enter')

    await expect(page).toHaveURL(/\/vocabulary\?level=a1&q=Tisch/)
    await expect(page.getByRole('searchbox', { name: 'ابحث عن كلمة' })).toHaveValue('Tisch')
  })

  test('opens from the header button and closes with Escape', async ({ page }) => {
    await page.goto('/dashboard')

    await page.getByRole('button', { name: 'بحث' }).click()
    await expect(page.getByRole('dialog', { name: 'بحث' })).toBeVisible()

    await page.keyboard.press('Escape')
    await expect(page.getByRole('dialog', { name: 'بحث' })).toBeHidden()
  })
})

test.describe('answering with the keyboard', () => {
  test('a number key chooses an option and Enter moves to the next question', async ({ page, isMobile }) => {
    test.skip(isMobile, 'Keyboard shortcuts are for desktop use.')
    await page.goto('/practice')

    await page.getByRole('button', { name: 'ابدأ التدريب' }).click() // article drill
    await expect(page.getByText(/1 من 10/)).toBeVisible()

    await page.keyboard.press('1')
    await expect(page.getByRole('status').filter({ hasText: /إجابة/ })).toBeVisible()

    await page.keyboard.press('Enter')
    await expect(page.getByText(/2 من 10/)).toBeVisible()
  })
})

test.describe('display preferences', () => {
  test('text size applies immediately and survives a reload', async ({ page }) => {
    await page.goto('/settings')

    await page.getByRole('radio', { name: /كبير جداً/ }).click()
    await expect.poll(() => page.evaluate(() => document.documentElement.style.fontSize)).toBe('125%')

    await page.reload()
    await expect.poll(() => page.evaluate(() => document.documentElement.style.fontSize)).toBe('125%')
  })

  test('high contrast applies immediately and survives a reload', async ({ page }) => {
    await page.goto('/settings')

    await page.getByRole('switch', { name: 'تباين عالٍ' }).click()
    await expect(page.locator('html')).toHaveClass(/high-contrast/)

    await page.reload()
    await expect(page.locator('html')).toHaveClass(/high-contrast/)
  })

  test('large text does not make any page scroll sideways', async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem(
        'learn-german:preferences',
        JSON.stringify({ state: { settings: { textScale: 'xlarge', onboardingDone: true } }, version: 0 }),
      )
    })

    for (const path of ['/dashboard', '/progress', '/practice', '/vocabulary', '/settings']) {
      await page.goto(path)
      await expect(page.getByRole('heading', { level: 1 }).first()).toBeVisible()
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)
      expect(overflow, path).toBe(0)
    }
  })
})

test.describe('first-run welcome', () => {
  test('is shown once, and skipping it keeps it gone', async ({ page }) => {
    await page.goto('/dashboard')
    await expect(page.getByRole('heading', { name: 'مرحباً بك في تعلّم الألمانية' })).toBeVisible()

    await page.getByRole('button', { name: 'تخطّي' }).click()
    await expect(page.getByRole('heading', { name: 'مرحباً بك في تعلّم الألمانية' })).toBeHidden()

    await page.reload()
    await expect(page.getByRole('heading', { name: 'مرحباً بك في تعلّم الألمانية' })).toBeHidden()
  })
})

test.describe('lessons load on demand', () => {
  test('a lesson opens straight from its URL (only its level is fetched)', async ({ page }) => {
    const requested: string[] = []
    page.on('request', (request) => {
      const match = /assets\/(a1|a2)-[\w-]+\.js/.exec(request.url())
      if (match) requested.push(match[1])
    })

    await page.goto('/lessons/a1/essen-und-trinken')
    await expect(page.getByRole('heading', { level: 1 }).first()).toContainText('Essen und Trinken')

    expect(requested).toContain('a1')
    expect(requested).not.toContain('a2')
  })
})
