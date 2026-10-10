---
paths:
  - "src/**/*.test.ts"
  - "src/**/*.test.tsx"
---

# Testing — LEARN GERMAN

## Stack

Vitest + React Testing Library + jsdom (`src/test/setup.ts`). Run with
`npm run test` (single run — use this before declaring anything done) or
`npm run test:watch` while iterating.

## Conventions

- Tests are colocated with the code they cover: `Foo.tsx` → `Foo.test.tsx`,
  `curriculum.ts` → `curriculum.test.ts`. Don't create a separate
  `__tests__/` tree.
- Test behavior and output, not implementation details. Query the way a
  user (or a screen reader) would find the element — role, label, text —
  rather than reaching for test-only selectors.
- A new lesson page or route gets a smoke test, following the pattern in
  `LessonPage.smoke.test.tsx`: it should render without throwing and show
  the lesson's core sections.

## Content integrity

`src/data/contentIntegrity.test.ts` runs structural checks across the
whole curriculum — this is what catches things TypeScript's type system
can't:

- every lesson id, slug (per level), vocabulary id, and exercise id is
  unique
- multiple-choice options are pairwise distinct, and `correctIndex` is in
  range
- `vocab-recall` distractors are distinct and never equal the correct
  answer
- `matching` pairs have distinct German terms and distinct Arabic terms
- `ordering` exercises have a `correctOrder` that's a valid permutation

When you add or edit a module or lesson (by hand or via `/new-lesson`),
run `npm run test` and make sure this suite still passes — a real
duplicate-MCQ-option bug shipped once and was only caught by chance, which
is why this suite exists. Extend it rather than working around it if you
find a new class of content bug.

## Before calling a phase done

`npm run typecheck && npm run lint && npm run test && npm run build` — all
four, not a subset.
