---
name: lesson-authoring
description: Reference for writing pedagogically sound, CEFR-consistent German lesson content (grammar explanations, vocabulary, exercises, dialogues) for the LEARN GERMAN curriculum. Use when creating or editing anything in src/data/, or when asked to write or review a lesson, module, grammar topic, or exercise set.
---

# Authoring German lesson content

This project teaches German (`de-DE`) to Arabic speakers (`ar`) across CEFR
A1–B2. This skill is the pedagogical companion to
`.claude/rules/content-conventions.md` (the technical/type-level rules) —
read both when authoring content.

## The grammar-explanation flow

Concept → Rule → Structure → Examples → Visual representation → Exceptions
→ Common mistakes → Practice → Review. Don't skip straight from rule to
examples — a one-line concept summary and, where useful, a visual (a
labelled sentence-structure diagram, a comparison table, a timeline) come
first. Prefer a visual over a paragraph whenever the concept is spatial or
comparative (word order, case endings, verb-position rules, adjective
degrees).

## Difficulty bands

- **A1** — basic survival German: greetings, numbers, simple present
  tense, basic word order, essential everyday vocabulary.
- **A2** — expanded everyday communication: past tense (Präteritum),
  comparatives, simple subordinate clauses, more registers.
- **B1** — independent communication: opinions, more complex subordinate
  clauses, a wider range of tenses and moods.
- **B2** — complex, nuanced, abstract communication: subtler register and
  discourse-level structures.

A lesson never uses a construction from a higher band than its own level,
even in a throwaway example sentence.

## Writing the Arabic side

Arabic fields explain the German concept for an Arabic-speaking learner —
they are not a gloss. If a German idiom or construction has no direct
Arabic equivalent, explain how it works and what it's used for, rather
than forcing a literal (and misleading) translation.

## Inline markup (`**bold**`, `[[Wort]]`)

Arabic/German string fields render through the shared `InlineMarkup` /
`RichText` primitives (`src/lib/richText.ts`). `**word**` always highlights
a **whole word or token** — never a fragment inside one (`wohn**e**` renders
with a visible gap, because the highlight is a padded `<mark>`, not a text
colour). To emphasise a verb ending or word-internal part, put the **whole
conjugated form** in bold (`**wohne**`) or leave the cell plain and let the
table/column colour coding carry the distinction instead.

## Authentic German

Example sentences should sound like something a native speaker would
actually say — not a grammatically-valid-but-unnatural sentence assembled
to demonstrate a rule in isolation. When in doubt about whether a sentence
is natural, say so rather than presenting it as settled.

## What is authored and what is derived

Two things are written by hand; everything else the learner practises is derived from them, so it can
never disagree with what the lesson teaches.

- **Vocabulary and examples** (`vocabulary`, `examples`) are the source of truth. For a vocabulary-themed
  lesson, use the one-line constructors in `src/data/a2/wortschatz/builders.ts` (`noun`, `nounNoPlural`,
  `nounPluralOnly`, `verb`, `adjective`, `adverb`, `phrase`) and `defineTheme`.
- **Translation tasks** live in `src/data/translationTasks.ts`, keyed by lesson id. German word order is
  flexible and du/Sie are both right for an Arabic "you", so a task must list **every** answer a native
  speaker would accept — the time phrase first or after the verb, `Ich möchte …` and `Ich hätte gern …`, the
  du, ihr and Sie forms. Never take a translation task from an example sentence: its Arabic is
  meaning-based and would reject correct answers. Keep it short, inside the lesson's grammar, and add a
  `noteAr` where the learner is likely to stumble (`halb vier` is 3:30). ae/oe/ue/ss spellings are accepted
  automatically.
- **Derived exercises** come from `src/data/lessonPractice.ts` and are added to every A1 and A2 lesson by
  `withPractice`: two vocabulary-recall questions, one listening question and, where a task exists, one
  translation. Their ids contain `-gen-`. A vocabulary-themed lesson also gets matching, three article
  questions, fill-in-the-blank and word ordering from `vocabularyThemeExercises`. Do not hand-write these
  kinds again; write a better word list or example instead.

A word with a stem change needs `present` (`fahren` → `fahre, fährst, fährt, fahren, fahrt, fahren`).
For a separable verb store the Präteritum **without** the prefix (`hob`, not `hob ab`) and give
`separablePrefix`; a reflexive verb is stored with its pronoun (`sich anmelden`).

## Checks that run on all German text

`src/data/germanQuality.test.ts` reads every sentence in the curriculum and fails on: a known noun written
with a small letter, an article that cannot belong to the noun directly after it (`das Termin`, `zur Arzt`),
a vocabulary example that does not contain its own word, and unclean text. These catch slips a reader
skims over; they do not replace the review. Two rules follow from them:

- Write the example sentence **for the word it illustrates**, using the word itself — not a compound
  (`Rückenschmerzen` is not an example of `Rücken`).
- If a finding is a real homograph (a lower-case word that is also a verb form, such as `reise`), add the
  word to `LOWERCASE_ALLOWED` in that test **with a reason**; do not rewrite correct German to satisfy it.

Vocabulary lessons must not use a construction the learner has not met. `src/data/paths/a2.ts` places the
lessons, and `src/lib/learningPath.test.ts` asserts the order of the dependencies that matter (reflexive
verbs before the lessons that use them).

## Before marking a lesson done

See `checklist.md` in this skill folder.
