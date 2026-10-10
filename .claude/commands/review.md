---
description: Review the current diff against the project's engineering standards and priority order
allowed-tools: Bash(git diff *), Bash(git status), Bash(npm run typecheck), Bash(npm run lint), Bash(npm run test), Read, Grep, Glob
argument-hint: '[optional focus, e.g. accessibility or src/features/exercises]'
---

Review the uncommitted changes in this repository (or, if $ARGUMENTS names a
path or topic, focus there).

Context:

- Status: !`git status --short`
- Diff: !`git diff`

Evaluate the diff in this order of priority:

1. Educational accuracy (if content in `src/data/` or `src/types/` changed
   — see `.claude/rules/content-conventions.md`)
2. Functional correctness
3. UX consistency
4. Accessibility (semantic HTML, keyboard nav, focus states, contrast,
   reduced-motion)
5. Architecture/maintainability (see `.claude/rules/code-style.md` —
   content/UI/state/services separation, no giant components, no `any`)
6. Performance (unnecessary re-renders, missing lazy-loading, bundle
   impact)
7. Visual polish

For anything touching `src/data/` or the lesson/vocabulary/grammar/
dialogue/exercise types, delegate to the `content-auditor` subagent. For
security-sensitive changes (a new dependency, anything reading `.env`, a
new external request, imported/parsed user data), delegate to the
`security-auditor` subagent.

Report concrete problems with concrete fixes — file and line, not vague
advice. End by running `npm run typecheck`, `npm run lint`, and
`npm run test`, and report whether they pass.
