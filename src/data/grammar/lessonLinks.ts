/**
 * Which grammar-roadmap rules (by rule number, see `roadmap.ts`) each lesson
 * practises. Pure content-to-content mapping: lessons and rules stay
 * independent files, and this table is the only place that connects them.
 *
 * Only lessons that genuinely teach or drill a published rule are listed.
 * A test verifies every lesson id and rule number here still exists.
 */
export const LESSON_GRAMMAR_LINKS: Readonly<Record<string, readonly number[]>> = {
  // A1
  'a1-m01-l02': [3, 5],
  'a1-m01-l05': [1],
  'a1-m03-l01': [2],
  'a1-m03-l02': [2],
  'a1-m03-l03': [3],
  'a1-m03-l04': [6, 7],
  'a1-m03-l05': [9],
  'a1-m04-l01': [20, 21],
  'a1-m05-l01': [15, 16],
  'a1-m06-l01': [11],
  'a1-m07-l01': [8],
  'a1-m08-l01': [10],
  'a1-m09-l01': [3],
  'a1-m10-l01': [12],
  'a1-m11-l01': [14],
  'a1-m12-l01': [17],
  'a1-m13-l01': [13],
  'a1-m15-l01': [1],
  'a1-m16-l01': [13],
  'a1-m17-l01': [26],
  'a1-m18-l01': [24],
  'a1-m19-l01': [11],
  'a1-m20-l01': [26],
  // A2
  'a2-m01-l01': [26],
  'a2-m02-l01': [18],
  'a2-m03-l01': [28, 29],
  'a2-m04-l01': [22, 23],
  'a2-m05-l01': [25],
  'a2-m06-l01': [33],
  'a2-m07-l01': [32],
  'a2-m09-l01': [28, 29],
  'a2-m11-l01': [29],
}
