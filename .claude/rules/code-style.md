---
paths:
  - "src/**/*.ts"
  - "src/**/*.tsx"
---

# Code style — LEARN GERMAN

Conventions read off the existing codebase. Match the pattern already used
nearby before introducing a new one.

## TypeScript

- Strict mode is on. Never use `any`; prefer `unknown` + narrowing, or a
  proper union/interface.
- Domain types live in `src/types/` and are imported with
  `import type { … }`. Add new domain concepts there, not inline in a
  component file.
- Prefer named exports. Components, hooks, and utilities are exported by
  name (`export function Button(...)`), not `export default`.

## React

- Functional components only. Props are a named `interface XProps`,
  extending the relevant HTML attribute type when the component wraps a
  native element (see `ButtonProps extends ButtonHTMLAttributes<...>`).
- Local, ephemeral UI state → `useState`/`useReducer` in the component.
  Anything that must survive navigation or be shared across features
  (progress, settings, theme) → a Zustand store in `src/store/`, read
  through a selector.
- Design-system primitives live in `src/components/ui/` and are
  re-exported from `src/components/ui/index.ts`. Add new primitives there;
  don't build one-off buttons/cards inside a feature folder.
- Feature-specific UI (a lesson's diagram, a review card, …) lives in
  `src/features/<domain>/`, not in `src/pages/`. Pages compose features;
  they don't contain feature logic themselves.

## Styling

- Tailwind utility classes only, composed with the local `cn()` helper
  from `@/lib/cn` (a small clsx-alike kept local on purpose — there's no
  reason to add a dependency for this). Don't hand-roll template-literal
  class strings.
- Colors, spacing, and radii come from the design tokens in
  `src/styles/tokens.css` via Tailwind's theme (`bg-primary`, `text-ink`,
  `border-border-strong`, …). Never hardcode a hex value in a component —
  if the token doesn't exist yet, add it to `tokens.css` for *both* themes
  and check both.
- Variant/size maps are `Record<Variant, string>` objects next to the
  component (see `Button.tsx`), not conditional class strings inline in
  JSX.

## Imports & structure

- Use the `@/` alias (`@/lib/cn`, `@/types`) instead of relative
  `../../..` paths across feature boundaries.
- Educational content (lessons, vocabulary, grammar topics) is plain typed
  data in `src/data/`, never JSX or hardcoded into a component. A
  component renders content; it doesn't define it.
- Lint with `npm run lint` (oxlint — this project does not use ESLint).
  Fix what oxlint reports before considering a change done.
