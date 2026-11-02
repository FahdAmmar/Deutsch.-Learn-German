import { afterEach, describe, expect, it } from 'vitest'

import { preparePrint } from './printPrep'

afterEach(() => {
  document.documentElement.classList.remove('dark')
  document.body.innerHTML = ''
})

describe('preparePrint', () => {
  it('switches the dark theme off for the print and back on afterwards', () => {
    document.documentElement.classList.add('dark')
    const restore = preparePrint()
    expect(document.documentElement.classList.contains('dark')).toBe(false)
    restore()
    expect(document.documentElement.classList.contains('dark')).toBe(true)
  })

  it('leaves a light page light', () => {
    const restore = preparePrint()
    expect(document.documentElement.classList.contains('dark')).toBe(false)
    restore()
    expect(document.documentElement.classList.contains('dark')).toBe(false)
  })

  it('opens the closed panels in the main content, and closes only those again', () => {
    document.body.innerHTML = `
      <details id="outside"><summary>outside</summary>x</details>
      <main>
        <details id="closed"><summary>closed</summary>x</details>
        <details id="open" open><summary>open</summary>x</details>
      </main>`
    const get = (id: string) => document.getElementById(id) as HTMLDetailsElement

    const restore = preparePrint()
    expect(get('closed').open).toBe(true)
    expect(get('open').open).toBe(true)
    // Outside the main content (the app's own menus) nothing is opened.
    expect(get('outside').open).toBe(false)

    restore()
    expect(get('closed').open).toBe(false)
    expect(get('open').open).toBe(true)
  })
})
