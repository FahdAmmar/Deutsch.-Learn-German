---
description: Fix a bug by finding its root cause, not just masking the symptom
allowed-tools: Read, Edit, Grep, Glob, Bash(npm run typecheck), Bash(npm run lint), Bash(npm run test *), Bash(npm run build)
argument-hint: "[bug description or file path]"
---

Fix this bug: $ARGUMENTS

Follow the project's debugging workflow:

1. Locate the actual root cause — don't guess from the symptom alone. Read
   the relevant component/hook/store/service, not just the line that
   throws.
2. Explain the root cause in one or two sentences before changing
   anything.
3. Fix the underlying problem. Do not paper over it with an arbitrary
   `setTimeout`, a duplicated `useEffect`, a forced re-render, or a
   type-widening `any`/`as` cast.
4. Check for the same bug pattern elsewhere in the codebase (`Grep` for
   similar code) — fix it there too if it's genuinely the same issue.
5. Avoid unrelated refactoring while you're in there.
6. Verify: `npm run typecheck && npm run lint && npm run test`, and
   `npm run build` if the change could affect the production bundle.

If the bug is in educational content (a wrong grammar rule, a bad
translation, a broken exercise), also check
`.claude/rules/content-conventions.md` and run the content-integrity
suite: `npm run test -- contentIntegrity`.
