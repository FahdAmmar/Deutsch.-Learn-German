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
| `npm run check:size`   | Gzip budget per JS chunk (run after `build`; CI does) |

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
  and decisions in `docs/sentencestep-study.md`; writing (guided Schreiben tasks, `/practice/writing`:
  content in `data/writing/`, `lib/writing/check.ts` looks for greeting, closing, points and length —
  patterns are written without umlauts and only ever *help*, a miss can be confirmed by hand; the test
  requires every model answer to pass its own check); exam (exam-style Lesen/Hören sets, `/practice/exam`:
  content in `data/exam/`, marking in `lib/exam/score.ts`, no feedback until submit; the texts are written
  for this app, never copied from an exam); minimal pairs (`data/minimalPairs.ts`, drill in
  `features/practice/minimalPairDrill.ts`, reference on the pronunciation page) and compound nouns
  (`data/compounds.ts`, drill in `features/practice/compoundDrill.ts`) — both are data whose integrity a test checks
  ; case and ending drills (`lib/generators/cases.ts` holds the article and ending tables, each cell pinned by a
  test; `data/caseDrill.ts` the nouns and the sentence *frames* — a frame names the noun groups it makes sense
  with, never combine a verb and a noun at random; drills in `features/practice/caseDrill.ts` and
  `adjectiveDrill.ts`); word order (`data/wordOrder.ts` sentences written part by part with a role each, drill in
  `features/practice/wordOrderDrill.ts`; an `OrderingExercise` may carry `roles` — the built sentence is then
  shown as named blocks — and `acceptedOrders` — put every order German allows there, a test checks the verb's
  place in each); collocations and word families (`data/collocations.ts`, `data/wordFamilies.ts`, with drills
  beside the others; a word family appears at a level only with the members that level has met); today's session
  (`features/practice/dailySession.ts`: due words, then weak spots, then new questions; the practice page and the
  dashboard's `TodayPanel` both read it through `useDailySessionPlan`); role-play (`lib/rolePlay.ts`
  is the logic, `features/roleplay/` the screen, route `/levels/:level/texts/:itemId/rollenspiel`); shadowing in
  the stories (`features/stories/ShadowingPanel.tsx`, reuses the pronunciation card); Anki export
  (`lib/ankiExport.ts`) and printing (`lib/printPrep.ts` + `hooks/usePrintFriendly.ts`, the `print:` variants and
  `styles/print.css`). `npm run report:content` (`lib/contentReport.ts`) counts what each level holds and lists
  gaps; with `--strict` it exits 1 on any gap. `src/test/axe.ts` runs axe's structural rules in jsdom (contrast
  is held by `styles/tokens.test.ts` and `exercises/orderRoles.test.ts`, and by the e2e audits)
- `pages/` + `routes/router.tsx` — routed pages (lazy-loaded); they
  compose features rather than containing feature logic themselves.
  Pages are loaded with `lib/lazyWithReload` (a stale tab reloads once, never in
  a loop) and the router's `errorElement` is `components/RouteErrorPage` — React
  Router catches route errors before the root `ErrorBoundary`, so route errors
  must be handled there, not only in `ErrorBoundary`
- `store/` — Zustand stores (`progressStore`, `statsStore` (answer
  statistics for the heatmap, daily goal and accuracy views), `settingsStore`,
  `themeStore`, `grammarProgressStore`, `dictationStore`, `storyQuizStore`, `myTextStore`, `writingStore`,
  `examStore` (both are in the backup file), `backupReminderStore` (this device only, deliberately not in the
  backup)); read through selectors, never one giant store. Anything a learner produces and that should survive a
  device change must be added to `store/backup.ts` and the extras schema in `lib/progressExportSchema.ts`
- `services/speech/` — TTS abstraction (`types.ts` interface,
  `browserSpeechService.ts` implementation, `voices.ts` voice choice) so a provider can be swapped
  later without touching the UI. `recordedSpeechService.ts` plays recorded audio for the texts that have one and
  hands the rest to the browser voice; it is off unless the build sets `VITE_RECORDED_AUDIO=true`
  (`docs/recorded-audio.md`)
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
- `data/paths/` — **the plan**: A1 and A2 are one sequence of chapters (numbered straight through, A2 carries
  on at the number after A1's last). A chapter holds *steps* of four kinds, in learning order: a lesson
  (`lesson('a1-m03-l01')`), a grammar rule (`rule(3)`, the roadmap number), a reading text
  (`reading('a1-read-02')`) and a standalone conversation (`conversation('dialogue-a1-am-telefon')`);
  the builders are in `paths/steps.ts`. A rule follows the lesson that introduces it; a text or conversation
  comes after the grammar it leans on and beside the topic it is about. `lib/learningPath.ts` resolves the
  steps (`getLevelChapters`, `getNextPlanStep`, `getResumeStep`, `getChapterProgress`); a step's identity
  across the lesson, grammar and story progress stores is `stepKey` (`lesson:<id>`, `rule:<n>`, `story:<id>`),
  and `lib/planProgress.ts` says when each counts as done (lesson completed, rule quiz passed, text quiz
  ≥ 70 % or dictation finished). `getNextLesson` and the dashboard's "continue" still follow the lessons of the
  plan. Levels without a path fall back to module order. `lib/learningPath.test.ts` fails if a lesson, a rule
  of the level, a reading text or a standalone conversation is missing from (or twice on) the plan, and pins
  *why* each text sits after the lessons and rules it needs — adding content means placing it on the plan
- `features/levels/` — the plan's UI. `PlanSidelist` is THE list: every lesson, rule, text and conversation of A1 → A2 in
  one outline (chapters only open and close; no map, tiles or second level of navigation). It is the page of
  `/levels` (beside it: the step to continue with) and the drawer `PlanDrawer`, opened from the header's
  «خطة الدراسة» button on any page (it marks the step of the page you are on, via `activeStepKey`). `usePlan`
  gives the plan with the learner's place in it, `usePlanCompletion` joins the three progress stores,
  `NextInPlan` is the "next step" card at the end of a lesson, a rule and a text. `/levels/:level?tab=stories`
  is only the texts-and-conversations library of a level; `/levels/:level` alone leads to `/levels`
- `docs/level-alignment.md` — lessons that practise a topic the grammar roadmap places at a higher level;
  `data/grammar/levelAlignment.test.ts` pins the list, so a new mismatch fails the suite
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
  and motion skills (`frontend-design`, `design-taste-frontend-v1`, `redesign-existing-projects`, `impeccable`,
  `design-taste-frontend`, `hallmark`, and the `emil-design-eng` / `animate` / `*-animations` family). `impeccable`,
  `design-taste-frontend` and `hallmark` ship scripts: none runs without the user's approval of that exact command.
  `.claude/**` is excluded from `npm run lint` and `npm test`. Project rules always win over a skill.
- Subagents: `code-reviewer`, `security-auditor`, `content-auditor`
- A `PreToolUse` hook (`.claude/hooks/validate-bash.sh`) blocks a short
  list of destructive Bash patterns (`rm -rf /`, forced pushes, …)
