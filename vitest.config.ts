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
    // Playwright specs live in e2e/ and run via `npm run test:e2e`.
    exclude: ['e2e/**', 'node_modules/**', 'dist/**'],
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
    css: true,
  },
})
