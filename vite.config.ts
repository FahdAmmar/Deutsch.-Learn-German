import { fileURLToPath, URL } from 'node:url'

import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // The dev port is configurable (`DEV_PORT` in the environment or a `.env` file).
  // Vite's default, 5173, falls inside a port range that Windows reserves for
  // Hyper-V/WSL on some machines, which fails with `listen EACCES`. Vite only
  // auto-picks another port on EADDRINUSE, not on EACCES, so we default to a
  // port outside that range and let it be overridden.
  const env = loadEnv(mode, process.cwd(), '')
  const devPort = Number(env.DEV_PORT) || 3000

  return {
    server: { port: devPort },
    plugins: [
      react(),
      tailwindcss(),
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: ['favicon.svg', 'icons.svg'],
        manifest: {
          id: '/',
          name: 'تعلّم الألمانية — Deutsch Lernen',
          short_name: 'Deutsch Lernen',
          description:
            'منصّة تعلّم اللغة الألمانية من A1 إلى B2 بشرح ثنائي اللغة (عربي/ألماني)، مع تمارين تفاعلية ونظام مراجعة متباعدة.',
          lang: 'ar',
          dir: 'rtl',
          start_url: '/dashboard',
          scope: '/',
          display: 'standalone',
          background_color: '#101216',
          theme_color: '#172554',
          icons: [
            { src: '/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
            { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
            { src: '/maskable-icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
            { src: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
          ],
        },
        workbox: {
          // Precache the built app shell — including the self-hosted fonts and
          // the per-level lesson chunks — so the whole SPA opens offline after
          // a first successful visit.
          globPatterns: ['**/*.{js,css,html,svg,png,woff2}'],
        },
      }),
    ],
    build: {
      rolldownOptions: {
        output: {
          // Third-party code changes rarely; keeping it in its own chunks means a
          // content-only deploy doesn't invalidate it in users' (and the PWA's) cache.
          codeSplitting: {
            groups: [
              { name: 'vendor-react', test: /node_modules[\\/](react|react-dom|react-router|react-router-dom|scheduler)[\\/]/, priority: 20 },
              { name: 'vendor', test: /node_modules[\\/]/, priority: 10 },
            ],
          },
        },
      },
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  }
})
