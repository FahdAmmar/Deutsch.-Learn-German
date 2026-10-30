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

The three design skills start with a **LEARN GERMAN — project overrides** block (Arabic-capable fonts,
RTL, theme tokens, calm motion, no new dependencies, teaching content untouchable). It wins over the
original text below it.

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
- **No script files** (`.py`, `.sh`, `.mjs`, `.js`) were installed. Every installed skill is Markdown.
- Each installed skill passed a structural check: `name` equals its folder, description under 1,024
  characters, every relative link resolves, no reference to a skill that is not installed.

## Local changes to third-party text

| Skill | Change | Why |
|---|---|---|
| `code-review-and-quality` | Removed the pointer to `constraint-driven-development` | skill not installed |
| `incremental-implementation` | Removed the pointer to `git-workflow-and-versioning` | skill not installed |
| `security-and-hardening` | Removed the pointer to `observability-and-instrumentation` | skill not installed |
| `test-driven-development` | Removed the pointer to `browser-testing-with-devtools` | needs a DevTools MCP server this repo does not use |
| `design-taste-frontend-v1`, `redesign-existing-projects`, `frontend-design` | Added the project-overrides block | the originals ban or force fonts, motion and libraries that would break Arabic/RTL or the dependency policy |
| `design-taste-frontend-v1` | Rewrote the `description` so the skill triggers on design work | the upstream text only says "preserved for compatibility" |

## Considered and not installed

| Skill / pack | Reason |
|---|---|
| `design-taste-frontend` (v2, from either archive) | A landing-page art-direction tool built around scripts that need a local Chrome and network access to fetch images; this is an app with its own design system |
| Caveman (all 22) | `caveman-setup` and the cloud skills route every LLM request through a third-party gateway; the terse-voice skills would shorten Arabic explanations; `caveman-compress` rewrites `CLAUDE.md` |
| Graphify | A Python application with its own installer, not a drop-in skill |
| UI/UX Pro Max pack (`ui-ux-pro-max`, `design`, `brand`, `banner-design`, `slides`, …) | Ships 41 Python files (a search script plus its tests) and logo/banner generation through third-party image APIs; it overlaps the design skills already installed |
| Ponytail | A terse-reply mode ("a reply a busy human understands in one read") that would shorten the Arabic explanations this app depends on, plus review/audit skills that overlap `code-review-and-quality` and `karpathy-guidelines` |
| `webapp-testing` | Python Playwright; this repo's end-to-end tests are TypeScript Playwright |
| `claude-api`, `docx`, `pdf`, `pptx`, `xlsx`, `mcp-builder`, `slack-gif-creator`, … | No such work in this app |
| Matt Pocock and Superpowers workflow skills, remaining agent-skills | Process and issue-tracker tooling that duplicates the installed engineering skills or needs an issue tracker |

Licences are in `_licenses/`; sources and commits in `THIRD_PARTY_NOTICES.md`.
