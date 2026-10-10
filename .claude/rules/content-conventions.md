---
paths:
  - "src/data/**/*.ts"
  - "src/types/lesson.ts"
  - "src/types/vocabulary.ts"
  - "src/types/grammar.ts"
  - "src/types/dialogue.ts"
  - "src/types/exercise.ts"
---

# Educational content conventions — LEARN GERMAN

This is where the project's educational principles bind hardest to actual
code. Read this before touching a module file in `src/data/a1/`,
`src/data/a2/` (or a new `b1`/`b2`), or the types those files are shaped
by.

## Non-negotiables

- Never invent a grammar rule. If you're not certain a German construction
  is correct or natural, say so instead of shipping it as fact.
- Arabic fields (`titleAr`, `meaningAr`, `explanationAr`, `ruleAr`,
  `conceptAr`, …) explain the German concept — they are not a literal,
  word-for-word translation of the German field next to them.
- Difficulty is strictly progressive: a lesson can only use grammar or
  vocabulary introduced in an earlier module of the same level, or a lower
  level. Don't reach ahead (e.g. no `Konjunktiv II` in an A1 module).
- Every `Lesson` needs concrete `objectivesAr`, and content that actually
  teaches those objectives — not a title with generic filler underneath.

## Field conventions (from `src/types/`)

- Nouns: teach the article with the word. `VocabularyItem.word` never
  includes the article — it goes in the separate `article` field,
  alongside `plural` when one exists and is worth teaching yet.
- Bilingual pairs (`LessonExample`, `VocabularyExample`, `GrammarExample`,
  `DialogueLine`) always carry both `de` and `ar` — don't add a
  German-only or Arabic-only example.
- `GrammarTopic` follows concept → rule → examples → exceptions →
  mistakes: fill `conceptAr` (one line), `ruleAr` (the actual rule),
  `examples`, and use `exceptionsAr`/`commonMistakes` rather than folding
  exceptions into the rule prose.
- `Dialogue.register` — pick `informal` or `formal` deliberately; a module
  that teaches politeness/register distinctions should show a contrasting
  pair, not two dialogues in the same register.

## Exercise data (`src/types/exercise.ts`)

Every exercise type has integrity constraints the content-integrity suite
enforces — see `.claude/rules/testing.md`. When authoring content by hand:

- `multiple-choice`: `options` must be pairwise distinct; `correctIndex`
  must point at one of them.
- `vocab-recall`: `distractorsAr` distinct from each other and from
  `correctAnswerAr`.
- `matching`: no repeated `de` term or repeated `ar` term within one
  exercise's `pairs`.
- `ordering`: `correctOrder` must be a valid permutation of `words`'s
  indices.
- IDs (`Lesson.id`, vocabulary ids, exercise ids) are globally unique
  across the *whole* curriculum, not just within the file — SRS progress
  and routing both key off them.

## Where content lives

- One file per module: `src/data/<level>/module-NN-<slug>.ts`, aggregated
  by that level's `index.ts`. A new level (`b1`, `b2`) follows the same
  shape as `a1`/`a2` and registers in `src/data/curriculum.ts`.
- Content is data, never JSX. If a lesson needs a new *kind* of visual
  (beyond `interactiveDiagram`/`adjectiveComparisons`/dialogues), that's a
  new typed field in `src/types/` plus a renderer in
  `src/features/lessons/` or `src/features/grammar/` — not inline markup
  in the data file.
