// Fails the build when a JavaScript chunk grows past its budget, so growth is noticed when it happens and not when
// the app has become slow. Sizes are gzip, the size that travels over the network. Run after `vite build`:
//   npm run check:size
// Budgets sit about a quarter above today's sizes. Raise one on purpose, in the same commit that adds the content.
import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { gzipSync } from 'node:zlib'

const KB = 1024

/** First matching rule wins. `pattern` is matched against the file name without its hash. */
export const BUDGETS = [
  // Raised from 110 to 145 on purpose, with the content that needed it: 12 more A1 lessons (one of them a module of
  // six vocabulary themes), 8 more A2 lessons, 10 more conversations. A1 and A2 were 112.8 and 117.5 kB gzip.
  { name: 'level data (a1, a2, b1, b2)', pattern: /^(a1|a2|b1|b2)$/, maxKb: 145 },
  { name: 'react vendor', pattern: /^vendor-react$/, maxKb: 100 },
  { name: 'other vendor code', pattern: /^vendor$/, maxKb: 48 },
  { name: 'app entry', pattern: /^index$/, maxKb: 28 },
  { name: 'any other chunk', pattern: /.*/, maxKb: 40 },
]
export const TOTAL_MAX_KB = 780

/** "a1-gwU2jzE0.js" → "a1". The hash is the last dash-separated part. */
export function chunkName(fileName) {
  return fileName.replace(/\.js$/, '').replace(/-[A-Za-z0-9_]{8}$/, '')
}

/** `files` is a list of { name, gzipBytes }. Returns the problems found, as readable lines. */
export function evaluate(files, budgets = BUDGETS, totalMaxKb = TOTAL_MAX_KB) {
  const problems = []
  let total = 0
  for (const file of files) {
    total += file.gzipBytes
    const base = chunkName(file.name)
    const budget = budgets.find((entry) => entry.pattern.test(base))
    if (budget && file.gzipBytes > budget.maxKb * KB) {
      problems.push(`${file.name}: ${(file.gzipBytes / KB).toFixed(1)} kB gzip, over the ${budget.maxKb} kB budget for ${budget.name}`)
    }
  }
  if (total > totalMaxKb * KB) {
    problems.push(`all JavaScript together: ${(total / KB).toFixed(0)} kB gzip, over the ${totalMaxKb} kB budget`)
  }
  return problems
}

export function measure(directory) {
  return readdirSync(directory)
    .filter((name) => name.endsWith('.js'))
    .map((name) => ({ name, gzipBytes: gzipSync(readFileSync(join(directory, name))).length }))
}

// Run as a script, not when imported by a test.
if (import.meta.url === `file://${process.argv[1]}`) {
  const directory = process.argv[2] ?? 'dist/assets'
  let files
  try {
    files = measure(directory)
  } catch {
    console.error(`No build found in ${directory}. Run "npm run build" first.`)
    process.exit(2)
  }
  const problems = evaluate(files)
  const biggest = [...files].sort((a, b) => b.gzipBytes - a.gzipBytes).slice(0, 5)
  console.log('Largest chunks (gzip):')
  for (const file of biggest) console.log(`  ${(file.gzipBytes / KB).toFixed(1).padStart(6)} kB  ${file.name}`)
  if (problems.length > 0) {
    console.error('\nBundle budget exceeded:')
    for (const problem of problems) console.error(`  - ${problem}`)
    process.exit(1)
  }
  console.log(`\nAll ${files.length} chunks are within budget.`)
}
