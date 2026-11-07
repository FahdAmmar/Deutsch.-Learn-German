# Project skills

Skills Claude Code loads on demand for this repository. Each is a folder with a `SKILL.md`; only the
short description sits in context until the skill is triggered. Project rules (`CLAUDE.md`,
`.claude/rules/`) always outrank a skill. Third-party skills were audited before they were added
— see **Audit** and **Local changes** below.

## Which skill when

| Skill | Use it for | Source |
|---|---|---|
| `lesson-authoring` | Writing or reviewing German/Arabic teaching content in `src/data/` | this project |
| `code-review-and-quality` | Reviewing a diff on five axes before it is called done (the `/review` command and `code-reviewer` agent apply it with the project's priority order) | agent-skills |
| `test-driven-development` | New logic or a bug fix, test first (red → green → refactor) | agent-skills |
| `debugging-and-error-recovery` | Finding a root cause when tests, build or behaviour break (`/fix-issue` follows the same loop) | agent-skills |
| `incremental-implementation` | Building a feature in thin, verified vertical slices | agent-skills |
| `frontend-ui-engineering` | Building accessible, responsive, production-grade UI | agent-skills |
| `performance-optimization` | Measured performance work: bundle size, code splitting, re-renders | agent-skills |
| `security-and-hardening` | Handling imported/user data, dependencies, headers/CSP, service worker | agent-skills |
| `source-driven-development` | Checking an API against the official docs (React 19, Vite, Tailwind v4, Zustand) before relying on memory | agent-skills |
| `karpathy-guidelines` | Think first, keep it simple, change only what the task needs, define how success is checked | karpathy-skills |
| `verification-before-completion` | No "done / passing / fixed" claim without fresh command output | superpowers |
| `full-output-enforcement` | Complete files and complete content sets — no `// ...` or "the rest is similar" | taste-skill |
| `frontend-design` | Distinctive but restrained interface design | anthropics/skills |
| `design-taste-frontend-v1` | Art direction and anti-generic UI rules (`/design-taste-frontend-v1`) | taste-skill |
| `redesign-existing-projects` | Auditing and upgrading an existing UI without rewriting it | taste-skill |
| `emil-design-eng` | UI polish, component design and the small details that make an interface feel right | emilkowalski/skills |
| `animate` | Building a web animation from scratch, decision by decision (purpose, properties, curve, interruption) | emilkowalski/skills |
| `review-animations` | Reviewing motion code against a high bar. Explicit invocation only | emilkowalski/skills |
| `improve-animations` | Read-only audit of a codebase's motion, with a prioritised plan | emilkowalski/skills |
| `find-animation-opportunities` | Read-only: where motion is missing and would help (proposes, does not implement) | emilkowalski/skills |
| `remove-animations` | Subtract-only: remove motion an interface does not need | emilkowalski/skills |
| `animation-performance` | Janky animations: frame budget, which property to animate, CSS vs JS | emilkowalski/skills |
| `animation-vocabulary` | Naming a motion effect from a vague description | emilkowalski/skills |
| `apple-design` | Gesture-driven, spring-based UI and Apple-style foundations, translated for the web | emilkowalski/skills |
| `break-ui` | Stress-testing a component with worst-case data (long names, non-Latin text, zero items) | emilkowalski/skills |
| `mobile-native` | Making the web app feel native on a phone (tap highlight, `100vh`, input zoom, notch, PWA) | emilkowalski/skills |
| `prototype` | Several genuinely different versions of one UI piece behind a picker. Explicit invocation only | emilkowalski/skills |
| `pick-ui-library` | Curated library picks. Explicit invocation only; this project adds a dependency only by decision | emilkowalski/skills |
| `ask-sonner` | Help with the Sonner toast library, only if the project ever adopts it (it is not a dependency today) | emilkowalski/skills |
| `animate-expo`, `write-swift` | **Not for this app** (React Native, Swift). Installed because they came in the bundle | emilkowalski/skills |
| `impeccable` | Designing, critiquing, auditing and polishing an interface (`/impeccable <command>`). **Ships scripts** | pbakaus/impeccable |
| `design-taste-frontend` | Art direction for landing pages and app screens (taste-skill v2). **Ships scripts** | taste-skill |
| `hallmark` | Building *new* pages that look designed; on an existing design only when named. **Ships scripts** | Nutlope/hallmark |

The design, motion and library skills start with a **LEARN GERMAN — project overrides** block (Arabic-capable fonts,
RTL, theme tokens, calm motion, no new dependencies, teaching content untouchable). It wins over the
original text below it. The three skills that ship scripts (`impeccable`, `design-taste-frontend`,
`hallmark`) have one more bullet: no script, installer or downloader from the skill folder runs unless
the user has approved that exact command.

Shared checklists the engineering skills link to live in `.claude/references/`
(`../../references/…` from a skill folder resolves there).

## Audit (2026-10-26)

Two archives were reviewed: `skills.zip` (a copy of `code-review-and-quality`, and the taste-skill
repository) and `agent-skills-collection-2026-10-22.zip` (10 upstream repositories, 136 skills).

- A pattern scan over every file looked for `curl | sh`, `eval`/`exec`, base64 decoding, access to
  credential paths, destructive commands, global installs, prompt-injection phrases and outbound
  gateways. Nothing was executed.
- The few hits were read by hand: `curl | bash` appears only in install documentation of Caveman and
  Graphify (not installed); the one "ignore previous instructions" match is a skill telling the model to
  *refuse* such text; the rest are documentation about secrets, `.env` and `eval` in security advice.
- **No script files** (`.py`, `.sh`, `.mjs`, `.js`) were installed from these two archives. Every skill installed on that date is Markdown.
- Each installed skill passed a structural check: `name` equals its folder, description under 1,024
  characters, every relative link resolves, no reference to a skill that is not installed.

## Audit (2026-11-03) — `claude-skills-bundle.zip`

A bundle of six components collected on 2026-10-30 (sources and commits: `THIRD_PARTY_NOTICES.md`). The
same pattern scan was run over the four components that contain skills, and the hits were read by hand.
Nothing was executed.

- **Emil Kowalski (16 skills): Markdown only.** The four "ignore previous instructions" matches are rules
  telling the model to *flag* such text in a repository.
- **`impeccable`, `design-taste-frontend` and `hallmark` ship executable files** (7, 13 and 11 files).
  What the scan found:
  - `impeccable/scripts/impeccable` is a launcher. When no engine binary sits beside it, it downloads a
    platform binary from the project's GitHub releases (checked against `engine-checksums.txt`) and runs
    it. The skill's own text tells Claude to run it once per session.
  - `design-taste-frontend/scripts/` drive a local Chrome over the DevTools protocol (`inspect.mjs`,
    `scenes.mjs`), and `assets.mjs` searches open image collections over the network.
  - `hallmark/scripts/`: `imagegen.mjs` calls `api.together.xyz` with `TOGETHER_API_KEY`;
    `install-hook.mjs` writes a `PostToolUse` hook into a `settings.json`; `install.mjs` copies the skill
    into `~/.claude`; `capture.mjs`, `sloplint-render.mjs` and `picture.mjs` start a browser or
    subprocesses.
- **What was done about it.** The skills are installed exactly as shipped (scripts untouched), but
  nothing is wired up: no hook was added, `.claude/settings.json` is unchanged, and there is no allow rule
  for `node` or `sh`, so Claude Code asks before every run. The override block adds the rule that no
  script from these folders runs without approval. The written guidance in each skill works without them.
  Delete a skill's `scripts/` folder if you never want them; the skills still load.
- **Structural check.** All 19 new skills: `name` equals the folder, every `description` is under 1,024
  characters, every relative link inside the new folders resolves.
- **Size.** About 12 MB on disk, of which `hallmark` is 7 MB (theme preview JPEGs), `design-taste-frontend`
  2.4 MB and `impeccable` 2.2 MB (a font index and a bundled browser script).
- **Tooling changes this made necessary** (not skill changes): `.oxlintrc.json` now has
  `"ignorePatterns": [".claude/**"]` because the third-party scripts produced 3 errors and 131 warnings in
  `npm run lint`, and `vitest.config.ts` excludes `.claude/**` because `hallmark/scripts/theme.test.mjs`
  was otherwise collected as one of this app's tests.

## Local changes to third-party text

| Skill | Change | Why |
|---|---|---|
| `code-review-and-quality` | Removed the pointer to `constraint-driven-development` | skill not installed |
| `incremental-implementation` | Removed the pointer to `git-workflow-and-versioning` | skill not installed |
| `security-and-hardening` | Removed the pointer to `observability-and-instrumentation` | skill not installed |
| `test-driven-development` | Removed the pointer to `browser-testing-with-devtools` | needs a DevTools MCP server this repo does not use |
| `design-taste-frontend-v1`, `redesign-existing-projects`, `frontend-design` | Added the project-overrides block | the originals ban or force fonts, motion and libraries that would break Arabic/RTL or the dependency policy |
| `design-taste-frontend-v1` | Rewrote the `description` so the skill triggers on design work | the upstream text only says "preserved for compatibility" |
| `emil-design-eng`, `animate`, `apple-design`, `prototype`, `pick-ui-library`, `ask-sonner`, `improve-animations`, `remove-animations`, `find-animation-opportunities`, `review-animations`, `impeccable`, `design-taste-frontend`, `hallmark` | Added the project-overrides block after the front matter (plus the scripts bullet on the last three) | they steer fonts, motion, libraries or visual direction that would break Arabic/RTL or the dependency policy |
| `design-taste-frontend` | The upstream folder `taste-skill/` is installed as `design-taste-frontend/` | the skill's own `name` is `design-taste-frontend`; folder and name must match |

## Considered and not installed

| Skill / pack | Reason |
|---|---|
| `design-taste-frontend` (v2, from the 2026-10-26 archives) | Declined on 2026-10-26 because of its Chrome and network scripts. Installed on 2026-11-03 from the bundle at the owner's request, with the scripts kept inert (see that audit) |
| `1-typescript-lsp` (bundle) | A plugin entry for a language server, not a skill. Install it through `/plugin` if wanted |
| `2-security-guidance` (bundle) | A plugin made of Python hooks that run on session start, prompt submit, every edit and git commit, and send diffs to an LLM review. Not a skill; read `hooks/` and install it through `/plugin` if wanted |
| `impeccable` plugin parts: `agents/`, `hooks/`, `.claude-plugin/` (bundle) | Not skill content. Its `hooks.json` runs the launcher on session start, after every edit and on stop. The skill alone works without them |
| Emil Kowalski `ui-cheatsheet.md`, `performance-cheatsheet.md` (bundle) | No skill refers to them |
| Caveman (all 22) | `caveman-setup` and the cloud skills route every LLM request through a third-party gateway; the terse-voice skills would shorten Arabic explanations; `caveman-compress` rewrites `CLAUDE.md` |
| Graphify | A Python application with its own installer, not a drop-in skill |
| UI/UX Pro Max pack (`ui-ux-pro-max`, `design`, `brand`, `banner-design`, `slides`, …) | Ships 41 Python files (a search script plus its tests) and logo/banner generation through third-party image APIs; it overlaps the design skills already installed |
| Ponytail | A terse-reply mode ("a reply a busy human understands in one read") that would shorten the Arabic explanations this app depends on, plus review/audit skills that overlap `code-review-and-quality` and `karpathy-guidelines` |
| `webapp-testing` | Python Playwright; this repo's end-to-end tests are TypeScript Playwright |
| `claude-api`, `docx`, `pdf`, `pptx`, `xlsx`, `mcp-builder`, `slack-gif-creator`, … | No such work in this app |
| Matt Pocock and Superpowers workflow skills, remaining agent-skills | Process and issue-tracker tooling that duplicates the installed engineering skills or needs an issue tracker |

Licences are in `_licenses/`; sources and commits in `THIRD_PARTY_NOTICES.md`.
