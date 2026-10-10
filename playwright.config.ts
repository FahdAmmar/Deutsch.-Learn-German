import { defineConfig, devices } from '@playwright/test'

/**
 * End-to-end tests run against the production build (`vite preview`), the
 * same artefact users get. Set PW_CHROMIUM_PATH to use a pre-installed
 * Chromium instead of the one downloaded by `npx playwright install`.
 */
const executablePath = process.env.PW_CHROMIUM_PATH || undefined

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? 'github' : 'list',
  use: {
    baseURL: 'http://localhost:4173',
    trace: 'retain-on-failure',
    launchOptions: { executablePath },
  },
  projects: [
    { name: 'mobile', use: { ...devices['Pixel 5'], launchOptions: { executablePath } } },
    { name: 'desktop', use: { viewport: { width: 1280, height: 800 } } },
  ],
  webServer: {
    command: 'npm run build && npm run preview -- --port 4173 --strictPort',
    url: 'http://localhost:4173',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
})
