import axe from 'axe-core'

/**
 * Runs the structural accessibility rules over rendered markup: names and roles, labels, table headers,
 * list structure, duplicate ids, ARIA validity. Colour contrast is left out because jsdom has no layout
 * or styles to measure; contrast is held by the design tokens (see `styles/tokens.test.ts`) and by the
 * browser-based checks in `e2e/accessibility.spec.ts`. Page-level landmark rules do not apply to a fragment.
 */
export async function structuralViolations(container: Element): Promise<string[]> {
  const results = await axe.run(container, {
    rules: { 'color-contrast': { enabled: false }, region: { enabled: false } },
    resultTypes: ['violations'],
  })
  return results.violations.map((violation) => `${violation.id}: ${violation.help} — ${violation.nodes.map((node) => node.html.slice(0, 120)).join(' | ')}`)
}
