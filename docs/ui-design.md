# UI design notes

The visual system lives in `src/styles/tokens.css` (colour, radius, shadow) and
`src/index.css` (type roles, motion). Components never hard-code colours.

## Identity

Charcoal-navy structure with a copper accent. One thing per screen is allowed to be
loud — usually the lesson/level the learner should do next (`Card tone="brand"` plus a
large German title). Everything else stays quiet.

## Type roles

| Role | Face | Use |
| --- | --- | --- |
| Page titles (Arabic) | Reem Kufi (`font-heading`) | `h1` only; section headings use IBM Plex Sans Arabic bold (`font-sans`) |
| Arabic UI and prose | IBM Plex Sans Arabic | `prose-ar` utility for lesson explanations (17px, line-height 2, 64ch) |
| German | Fraunces (`display-de`) | titles, example sentences, any German word the learner reads closely |
| Phonetics | IBM Plex Mono (`.mono`) | pronunciation hints only |

## Structure

- Hierarchy comes from borders, tint and type size — not stacked shadows. Shadows are for
  things that float (drawer, sticky bars).
- Radius scale: control 8px → panel 12px/16px → hero 22px (`--radius-*`).
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
