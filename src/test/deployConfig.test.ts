import { describe, expect, it } from 'vitest'

import indexHtml from '../../index.html?raw'
import packageJsonRaw from '../../package.json?raw'
import vercelJsonRaw from '../../vercel.json?raw'

/**
 * Production-only behaviour lives in `vercel.json` (headers, rewrites), which
 * neither `vite dev` nor `vite preview` applies. These tests keep that file
 * consistent with the app so a mistake cannot first show up on the live site.
 */

interface VercelHeader {
  key: string
  value: string
}
interface VercelConfig {
  rewrites: { source: string; destination: string }[]
  headers: { source: string; headers: VercelHeader[] }[]
}

const vercel = JSON.parse(vercelJsonRaw) as VercelConfig
const packageJson = JSON.parse(packageJsonRaw) as { engines: { node: string } }

function headerValue(key: string): string {
  for (const rule of vercel.headers) {
    const found = rule.headers.find((header) => header.key === key)
    if (found) return found.value
  }
  throw new Error(`vercel.json sets no ${key} header`)
}

describe('vercel.json', () => {
  it('allows the inline theme bootstrap script in index.html through the CSP hash', async () => {
    const scripts = [...indexHtml.matchAll(/<script>([\s\S]*?)<\/script>/g)]
    expect(scripts).toHaveLength(1)

    const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(scripts[0][1]))
    const hash = `'sha256-${btoa(String.fromCharCode(...new Uint8Array(digest)))}'`

    // If this fails, the inline script in index.html changed: copy the hash
    // below into the script-src of the Content-Security-Policy in vercel.json,
    // otherwise the browser blocks the script on the deployed site only.
    expect(headerValue('Content-Security-Policy'), `expected script-src to contain ${hash}`).toContain(hash)
  })

  it('keeps the microphone available to the app (speech recognition)', () => {
    expect(headerValue('Permissions-Policy')).toContain('microphone=(self)')
  })

  it('serves index.html for app routes but never for assets or files', () => {
    const [rewrite] = vercel.rewrites
    expect(rewrite.destination).toBe('/index.html')
    const matches = (path: string) => new RegExp(`^${rewrite.source}$`).test(path)

    for (const route of ['/', '/dashboard', '/levels/a1', '/lessons/a1/a1-01', '/grammar/a1/rule-01']) {
      expect(matches(route), route).toBe(true)
    }
    // A removed hashed chunk must be a real 404 so the app's stale-chunk
    // recovery runs, instead of an HTML page served as JavaScript.
    for (const file of ['/assets/index-abc.js', '/missing.png', '/sw.js']) {
      expect(matches(file), file).toBe(false)
    }
  })
})

describe('package.json', () => {
  it('pins a single Node.js major so Vercel builds with the version the project is tested on', () => {
    expect(packageJson.engines.node).toMatch(/^\d+\.x$/)
  })
})
