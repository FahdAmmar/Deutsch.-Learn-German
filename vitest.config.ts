import { fileURLToPath, URL } from 'node:url'

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      'virtual:pwa-register': fileURLToPath(new URL('./src/test/mocks/virtualPwaRegister.ts', import.meta.url)),
    },
  },
  test: {
    environment: 'jsdom',
    // Playwright specs live in e2e/ and run via `npm run test:e2e`. `.claude/**` holds third-party skills that
    // ship their own test files; those are not this app's tests.
    exclude: ['e2e/**', 'node_modules/**', 'dist/**', '.kilo/**', '.claude/**'],
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
    css: true,
    // Many tests render a whole page in jsdom (a level of vocabulary is hundreds of cards) or click through a whole
    // test, and a full run uses every core. On a loaded or modest machine the same test takes 5–10x longer than it does
    // alone (about 2 s alone, 15 s+ under load): that is a slow machine, not a bug, and a hung test still fails, just
    // later. `asyncUtilTimeout` (the wait of `findBy*` / `waitFor`) is raised in `src/test/setup.ts` for the same reason.
    testTimeout: 60_000,
    hookTimeout: 60_000,
  },
})
