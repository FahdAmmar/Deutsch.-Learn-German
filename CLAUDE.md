# LEARN GERMAN

Claude Code project memory — loaded every session, so this file stays
short. Deeper, path-scoped conventions live in `.claude/rules/` and load
only when Claude touches a matching file.

## What this is

A bilingual, self-study language-learning platform: German is the target
language (`de-DE`, LTR), Arabic is the support/explanation language (`ar`,
RTL), structured around CEFR levels A1 → A2 → B1 → B2. Content must be
linguistically accurate, pedagogically sequenced, and never present
uncertain grammar as settled fact.

## Stack

- React 19, TypeScript ~6 (strict), Vite 8 — path alias `@` → `./src`
- Tailwind CSS v4 (`@tailwindcss/vite`); design tokens in
  `src/styles/tokens.css`, black-and-gold palette, light/dark/system theme
- Zustand 5 (global state), Zod 4 (schema validation — e.g. progress import)
- React Router 7 (`src/routes/router.tsx`), Lucide React icons
- Vitest 4 + React Testing Library + jsdom; **oxlint** for linting (this
  project does not use ESLint — `npm run lint` runs oxlint)
- `vite-plugin-pwa` — offline app shell, Arabic RTL manifest

## Commands

| Command               | Purpose                    |
| ---------------------- | --------------------------- |
| `npm run dev`          | Vite dev server             |
| `npm run build`        | `tsc -b && vite build`      |
| `npm run typecheck`    | `tsc -b --noEmit`           |
| `npm run lint`         | oxlint                      |
| `npm run test`         | Vitest, single run          |
| `npm run test:watch`   | Vitest watch mode           |

Before calling any phase complete: `typecheck && lint && test && build`.

## Architecture map

- `components/ui/` — design-system primitives, re-exported from `index.ts`
- `components/layout/` — app shell, nav, theme toggle
- `features/<domain>/` — feature UI: lessons, grammar, exercises,
  vocabulary, review, progress, dashboard, pronunciation
- `pages/` + `routes/router.tsx` — routed pages (lazy-loaded); they
  compose features rather than containing feature logic themselves
- `store/` — Zustand stores (`progressStore`, `settingsStore`,
  `themeStore`); read through selectors, never one giant store
- `services/speech/` — TTS abstraction (`types.ts` interface,
  `browserSpeechService.ts` implementation) so a provider can be swapped
  later without touching the UI
- `data/a1/`, `data/a2/` (`b1/`/`b2/` next) — curriculum content as typed
  data, aggregated per level via `index.ts` and registered in
  `data/curriculum.ts`; never JSX
- `types/` — domain types: `lesson`, `exercise`, `grammar`, `vocabulary`,
  `dialogue`, `cefr`, `progress`, `settings`
- `lib/` — `curriculum.ts`, `srs.ts` (Leitner spaced repetition),
  `placementTest.ts`, `progressExport.ts` (+ Zod schema), `storage.ts`
  (the *only* place that should touch `localStorage` directly)

## Priority order (from the project brief)

Educational accuracy → functional correctness → UX → accessibility →
maintainable architecture → performance → visual polish → new features.
Never trade correctness for a visual effect.

## Working agreement

- Verify actual file contents before claiming a phase is done; flag
  pre-existing files rather than silently overwriting them.
- Educational content stays out of JSX — structured data only, so it can
  move to an API/CMS later without a UI rewrite.
- Never invent German grammar or present uncertain information as settled
  fact. Arabic fields explain the concept — they are not a literal,
  word-for-word translation of the German next to them.
- New global state → Zustand store + selector. New local UI state → React
  state. No direct `localStorage` calls outside `lib/storage.ts`.

## Custom tooling in this repo

- Rules (path-scoped, auto-load on matching files): `code-style.md`,
  `testing.md`, `content-conventions.md` in `.claude/rules/`
- Commands: `/review`, `/fix-issue`, `/new-lesson`
- Skill (auto-loads when authoring `src/data/` content): `lesson-authoring`
- Subagents: `code-reviewer`, `security-auditor`, `content-auditor`
- A `PreToolUse` hook (`.claude/hooks/validate-bash.sh`) blocks a short
  list of destructive Bash patterns (`rm -rf /`, forced pushes, …)
