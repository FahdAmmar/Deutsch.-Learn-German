---
description: Scaffold a new lesson (data, module registration, exercises, tests) following the curriculum structure
allowed-tools: Read, Write, Edit, Grep, Glob, Bash(npm run typecheck), Bash(npm run test *)
argument-hint: "[level] [module-slug] [lesson topic]"
---

Create a new lesson for: $ARGUMENTS

1. Read `.claude/rules/content-conventions.md` and the existing module
   file closest to this one in `src/data/<level>/` as a structural
   reference — match its shape, don't invent a new one.
2. Confirm the lesson's place in the progression: what grammar/vocabulary
   from earlier modules it can build on, and what it must NOT use yet
   (see the progressive-difficulty rule in content-conventions).
3. Build the `Lesson` object with, at minimum: `objectivesAr`,
   `explanation` (`LessonSection[]`), `examples`, `vocabulary`, and
   `exercises` covering more than one exercise type. Add `grammarTopics`,
   `dialogues`, `pronunciationTips`, `commonMistakes`, or
   `interactiveDiagram` only where they genuinely serve this lesson's
   objectives — not for coverage's sake.
4. Give every id (`Lesson.id`, each `VocabularyItem.id`, each exercise id)
   a value that's unique across the *whole* curriculum, not just this
   file — check `src/data/<level>/index.ts` and neighbouring modules to be
   sure.
5. Register the lesson in its module's array and confirm the module is
   wired into `src/data/<level>/index.ts` and `src/data/curriculum.ts`.
6. Add or extend a smoke test for the module if it doesn't have one yet,
   following `LessonPage.smoke.test.tsx`.
7. Run `npm run test -- contentIntegrity` and `npm run typecheck`, and fix
   anything they flag before considering this done.
