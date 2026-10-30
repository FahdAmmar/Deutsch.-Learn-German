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
  `src/styles/tokens.css`, "Bilingual Academic Prestige" palette from the DeutschWelt design files (navy + royal blue + amber), light/dark/system theme
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
  vocabulary, review, progress, dashboard, pronunciation, stories (texts
  and conversations), dictation (letter-by-letter Diktat mode; pure logic
  in `lib/dictation/`; `DictationStage` is the typing screen and works on any
  `DictationSource`, so lesson stories and the learner's own texts share it),
  mytext (the learner's own texts: `lib/myText/split.ts` cuts a text into parts,
  `validate.ts` checks input and storage), story quizzes (`lib/storyQuiz.ts` builds exercises
  from a story's own sentences for the existing `ExerciseRunner`), grammarHints
  (the dotted markers + hover popup under forms like "zur Arbeit"; the detector
  is pure logic in `lib/grammarHints.ts` with its rules and Arabic notes in
  `data/grammarHints.ts` — add a form there, never in JSX; stay conservative: an
  ambiguous form gets no hint; `HintedSentenceButton` keeps a sentence one
  button, the markers are plain spans inside it); study
  and decisions in `docs/sentencestep-study.md`
- `pages/` + `routes/router.tsx` — routed pages (lazy-loaded); they
  compose features rather than containing feature logic themselves.
  Pages are loaded with `lib/lazyWithReload` (a stale tab reloads once, never in
  a loop) and the router's `errorElement` is `components/RouteErrorPage` — React
  Router catches route errors before the root `ErrorBoundary`, so route errors
  must be handled there, not only in `ErrorBoundary`
- `store/` — Zustand stores (`progressStore`, `statsStore` (answer
  statistics for the heatmap, daily goal and accuracy views), `settingsStore`,
  `themeStore`, `grammarProgressStore`, `dictationStore`, `storyQuizStore`, `myTextStore`); read through
  selectors, never one giant store
- `services/speech/` — TTS abstraction (`types.ts` interface,
  `browserSpeechService.ts` implementation, `voices.ts` voice choice) so a provider can be swapped
  later without touching the UI
- `services/sound/` — feedback-sound abstraction (key / correct / wrong / complete),
  Web Audio implementation; use it through `hooks/useSound`, which honours the setting
- `data/a1/`, `data/a2/` (`b1/`/`b2/` next) — curriculum content as typed
  data, aggregated per level via `index.ts`; never JSX. Besides the modules,
  a level has `reading/` (one file per reading text) and `conversations/`
  (standalone situational `Dialogue`s that belong to no lesson; they follow the
  lesson dialogues in `getDialoguesForLevel`). Dialogue and reading ids must be
  unique across *all* levels — the quiz and dictation stores key by id alone. `data/curriculum.ts`
  is a **lazy per-level registry**: each level is its own chunk, fetched on
  first need. `lib/curriculum.ts` stays synchronous and reads what is loaded,
  so a screen that uses it must sit under `<CurriculumGate>` (see
  `routes/router.tsx`), and tests get every level from `test/setup.ts`. A new
  level = a loader in `LEVEL_SOURCES`
- `data/paths/` — the learning order of a level as chapters of lesson ids
  (A1 is hand-sequenced: letters → days & time → grammar foundation → …);
  `lib/learningPath.ts` resolves it, and `getNextLesson` and the dashboard's
  "continue" follow it. Levels without a path fall back to module order.
  A test fails if any A1 lesson is missing from the path
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
- Skills (`.claude/skills/`, see its `README.md` for when to use each): `lesson-authoring`
  (auto-loads when authoring `src/data/` content), plus engineering skills
  (`code-review-and-quality`, `test-driven-development`, `debugging-and-error-recovery`,
  `incremental-implementation`, `frontend-ui-engineering`, `performance-optimization`,
  `security-and-hardening`, `source-driven-development`), behaviour skills
  (`karpathy-guidelines`, `verification-before-completion`, `full-output-enforcement`) and design
  skills (`frontend-design`, `design-taste-frontend-v1`, `redesign-existing-projects`). Project rules
  always win over a skill.
- Subagents: `code-reviewer`, `security-auditor`, `content-auditor`
- A `PreToolUse` hook (`.claude/hooks/validate-bash.sh`) blocks a short
  list of destructive Bash patterns (`rm -rf /`, forced pushes, …)
