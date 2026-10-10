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

## Before marking a lesson done

See `checklist.md` in this skill folder.
