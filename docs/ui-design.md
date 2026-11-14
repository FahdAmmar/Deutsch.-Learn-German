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

## Dashboard: today's plan

The dashboard answers one question — what should I do now? — and keeps everything else quiet.

- **One loud block.** `TodayPanel` is the navy panel. When today's session holds words to keep or topics to
  strengthen, it leads: what the session is made of (from `dailySessionParts`) and one way to start it. Until
  then — a first visit, or only new questions left — the next lesson leads, because questions from a lesson the
  learner has not met are not a way to begin. Flashcard review and the placement test are secondary and appear
  only when they apply (words due; a learner who has not started).
- **Numbers are type.** `ProgressStrip` states level, lessons, words and streak as four figures in a
  description list — no tiles, no icon plates. Each figure is shown once on this screen.
- **Below the fold, in order:** the next lesson (`ContinueLearningCard`), the week and recent activity, the next
  lessons on the path, and the special letters. The full record lives on the progress page.
- The session plan and the daily-goal figures come from `useDailySessionPlan` and `useDailyGoalProgress`, the
  same source the practice page and the goal card read, so the dashboard never states a different number from
  the screen it links to.

## Navigation

The sidebar and the phone's "More" sheet share one grouped list (`nav-items.ts`): today, **learn** (levels, grammar,
vocabulary), **practise** (review, reading, exercises, pronunciation, my texts), and the learner's own record
(progress, settings). A lesson keeps "Levels" lit, since a lesson belongs to a level. No item changes its
destination as the learner progresses, except reading, which opens the texts of the current level; the next
lesson is the dashboard's call to action rather than a menu item. Labels are one or two words. The phone's bottom
bar holds today, levels, grammar and exercises (`MOBILE_PRIMARY_IDS`), and the rest sits behind "More".

## Phones

Designed for 320–430px first; the rules below keep it that way.

- **Nothing is wider than the screen.** A page wider than the viewport makes mobile browsers zoom the whole page
  out and shoves the fixed bottom bar off the edge. The top bar is sized so its parts sum to less than 320px: on a
  phone it holds the brand tile, the level, the streak and two 44px icon buttons (study plan, search); the German
  wordmark joins from `sm`, the theme switch from `md`. Every `grid` without `grid-cols-*` is one `minmax(0, 1fr)`
  column (a base-layer rule in `index.css`): an `auto` track grows to its widest item and was the cause of the
  11–36px overflow the dashboard and the study plan had at 320px.
- **Bottom bar, then "More".** The current item sits on a filled pill — a shape as well as a colour. A dot on
  "More" says there are words due for review. "More" is a bottom sheet (`MoreSheet`), not a side drawer: the
  controls are where the thumb is. It holds the destinations the bar has no room for, the learner's place in their
  level, and the theme as three visible options (`ThemeSegmented`), not a button that cycles. It closes on the
  backdrop, its close button, Escape, or after a link. There is no drag handle: a handle promises a swipe, and
  none is implemented.
- **44px targets on a touch screen.** `pointer-coarse:` raises `Button` size `sm`, level tabs and the section rails
  to 44px; a transparent `::before` layer extends the hit area of switches and of German words that speak when
  tapped, without moving the text. Fingers are not mice: the same controls stay compact under a pointer.
- **Fields are at least 16px** on a touch screen (an unlayered rule in `index.css`), or iOS Safari zooms the page
  into the field and never zooms back. Zoom itself is left on.
- **Safe areas.** `viewport-fit=cover` plus `--safe-t/r/b/l`. Insets are physical (a notch is left or right
  whatever the text direction), so they use `pl`/`pr`, not `ps`/`pe`.
- **Sticky things sit under the top bar with `top-(--header-h)`**, never a hard-coded number: the bar is 57px on a
  phone and 65px from `md`, and a wrong offset leaves a strip the page scrolls through, or slides under the bar.
- **Long lists skip off-screen work.** Vocabulary cards use `content-visibility: auto`, except when printing. Their
  secondary tools (sort, export, print) sit behind an "Options" button on a phone so the first card is on the
  first screen.
- **No text under 12px.** No hover-only information. A control answers the finger on press (`:active`).

## Focus and German text

- A panel that is navy in light mode draws its own focus ring in the panel's foreground colour: the global ring
  is navy and would disappear on it.
- German text is never transformed to upper case. CSS upper-casing turns `ß` into `SS` and writes `ich` as `ICH`
  in a conjugation table, which teaches the wrong form. Labels that need emphasis use weight or size.

## Level page: the learning path

The study plan is **one list**. A1 and A2 are one sequence (`src/data/paths/`): every lesson, grammar rule,
reading text and conversation, in the order they are to be studied, in a single outline
(`features/levels/PlanSidelist.tsx`). It is the whole of `/levels` — beside it only the step to continue
with — and the same list opens as a drawer from the header button «خطة الدراسة» on any page, marking the
step you are on. Chapters only group the list and open or close like an accordion: there is no map, no
tiles, no illustration and no second level of navigation. Chapters are numbered straight through (A2
carries on where A1 stops). Each step is named in words by its kind (درس / قاعدة / نص / محادثة), never by icon
or colour alone, and the done and "next" marks are text for a screen reader too. At the end of a lesson,
a rule and a text the "next step in the plan" card says what comes next.
