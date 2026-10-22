# UI design notes

The visual system lives in `src/styles/tokens.css` (colour, radius, shadow) and
`src/index.css` (type roles, motion). Components never hard-code colours.

## Identity

"Bilingual Academic Prestige", taken from the DeutschWelt design files
(`stitch_deutschwelt_edtech_platform/bilingual_academic_prestige/DESIGN.md`): deep scholastic
navy for structure (sidebar active item, hero panels, primary actions), pristine white working
surfaces on a slate canvas, royal blue for interaction, amber for the intermediate levels.
CEFR badges are pills: A1/A2 blue, B1/B2 amber. Gender colours: der blue, die rose, das green,
plural amber. The design's die/das/plural hexes fail 4.5:1 as text, so those tokens are one step
darker than the design file (documented in `tokens.css`). Dark mode is not in the design files;
it is a neutral graphite theme that keeps the design's blue as its one colour. One thing per screen is allowed to be loud (the navy hero or
the lesson to continue); everything else stays quiet.

## Type roles

| Role | Face | Use |
| --- | --- | --- |
| Headings | Plus Jakarta Sans (`font-heading`) | `h1`–`h3`, numbers and CEFR codes |
| Arabic UI and prose | IBM Plex Sans Arabic | `prose-ar` utility for lesson explanations (17px, line-height 2, 64ch) |
| German | Inter (`display-de`) | titles, example sentences, any German word the learner reads closely; neutral tracking so long compounds stay clear |
| Phonetics | IBM Plex Mono (`.mono`) | pronunciation hints only |

## Structure

- Hierarchy comes from borders, tint and type size — not stacked shadows. Shadows are for
  things that float (drawer, sticky bars).
- Radius scale: controls 8px → cards 16px → dialogs 24px (`--radius-*`); badges are pills.
- `Card tone`: `surface` (default), `tint` (recessed, secondary), `brand` (the one emphasised
  panel on a screen).
- `RouteList` / `RouteItem` draw a line with stops. Use it only for real sequences
  (levels, modules). Do not use it to decorate unordered lists.
- Numbers shown in the UI come from data (module order, rule number); do not add decorative
  numbering.

## Behaviour

- Motion only answers an action: progress bars fill, feedback slides in, drawer opens.
  Everything respects `prefers-reduced-motion` and the in-app reduced-motion setting.
- Touch targets are at least 44px (`Button` md/lg, nav items, option buttons).
- Tab lists use arrow keys, in the reading direction (`tabsHelpers.ts`).
- Arabic number agreement goes through `utils/arabicCount.ts` (1 / 2 / 3–10 / 11+ forms).

## Level page: the learning path

A level is shown as an ordered path of **chapters** (`src/data/paths/`), not as a list of
modules. Each chapter opens with a small interactive illustration that previews what it
teaches (`features/levels/path/ChapterVisual.tsx`): tappable letters, a week strip with a
2:30 clock, a colour-coded sentence, or a model phrase. Lessons sit on the chapter's rail and
link straight to the grammar rules they practise. Numbering is allowed here because the
chapters really are a sequence. On wide screens the chapter index is a sticky column; on
narrow screens it becomes a scrolling strip.
