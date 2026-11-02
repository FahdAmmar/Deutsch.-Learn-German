// Prints what the content of each level amounts to, and where it is thin. Read-only: it changes nothing.
//   node scripts/content-report.mjs [--json] [--strict]
// With --json the report is printed as JSON; with --strict the exit code is 1 if any level has a gap, so a
// pipeline can hold a release back. It loads the app's own content through Vite, like list-speech-texts.mjs.
import { createServer } from 'vite'

const asJson = process.argv.includes('--json')
const strict = process.argv.includes('--strict')

const server = await createServer({ server: { middlewareMode: true }, appType: 'custom', logLevel: 'silent' })
let hasGaps = false
try {
  const { loadAllLevels, LEVELS_WITH_CONTENT } = await server.ssrLoadModule('/src/data/curriculum.ts')
  const { buildLevelReport, formatReport } = await server.ssrLoadModule('/src/lib/contentReport.ts')
  await loadAllLevels()

  const reports = LEVELS_WITH_CONTENT.map((level) => buildLevelReport(level))
  hasGaps = reports.some((report) => Object.values(report.gaps).some((ids) => ids.length > 0))
  console.log(asJson ? JSON.stringify(reports, null, 2) : formatReport(reports))
} finally {
  await server.close()
}
if (strict && hasGaps) process.exitCode = 1
