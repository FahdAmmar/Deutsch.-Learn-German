import { describe, expect, it } from 'vitest'

import { getAllVocabulary, getDialoguesForLevel, getLessonsForLevel, getReadingTextsForLevel } from '@/lib/curriculum'
import { buildAmbiguousWords, buildNounIndex, checkArticleAgreement, exampleUsesWord, findLowercaseNouns } from '@/lib/germanChecks'
import { CEFR_LEVELS } from '@/types'

/**
 * Lower-case words that are legitimately written small although they look like a noun of the vocabulary:
 * forms of verbs the vocabulary does not list (stellen, reisen) and a time expression that the
 * orthography allows in both cases (viertel nach zwei). Add to this list only with a reason.
 */
const LOWERCASE_ALLOWED = new Set(['stellen', 'stelle', 'reise', 'viertel'])

interface Source {
  where: string
  de: string
}

/** Every German sentence the curriculum shows a learner, with where it lives. */
function collectSentences(): Source[] {
  const sources: Source[] = []
  for (const item of getAllVocabulary()) if (item.example) sources.push({ where: `vocabulary ${item.id}`, de: item.example.de })
  for (const level of CEFR_LEVELS) {
    for (const lesson of getLessonsForLevel(level)) {
      lesson.examples.forEach((example, index) => sources.push({ where: `${lesson.id} example ${index + 1}`, de: example.de }))
      for (const dialogue of lesson.dialogues ?? []) dialogue.lines.forEach((line, index) => sources.push({ where: `${dialogue.id} line ${index + 1}`, de: line.de }))
    }
    for (const dialogue of getDialoguesForLevel(level)) dialogue.lines.forEach((line, index) => sources.push({ where: `${dialogue.id} line ${index + 1}`, de: line.de }))
    for (const text of getReadingTextsForLevel(level)) text.paragraphs.forEach((paragraph, index) => sources.push({ where: `${text.id} paragraph ${index + 1}`, de: paragraph.de }))
  }
  return sources
}

function expectNone(findings: string[], what: string) {
  expect(findings, `${what}:\n  ${findings.slice(0, 25).join('\n  ')}${findings.length > 25 ? `\n  … and ${findings.length - 25} more` : ''}`).toEqual([])
}

describe('German content quality', () => {
  const vocabulary = getAllVocabulary()
  const nouns = buildNounIndex(vocabulary)
  const ambiguous = new Set([...buildAmbiguousWords(vocabulary), ...LOWERCASE_ALLOWED])
  const sentences = collectSentences()

  it('reads the whole curriculum (guards against a loader change silently emptying the checks)', () => {
    expect(vocabulary.length).toBeGreaterThan(600)
    expect(sentences.length).toBeGreaterThan(1500)
  })

  it('writes every known noun with a capital letter inside a sentence', () => {
    const findings = sentences.flatMap(({ where, de }) => findLowercaseNouns(de, nouns, ambiguous).map((word) => `${where}: "${word}" in «${de}»`))
    expectNone(findings, 'nouns written with a small letter')
  })

  it('puts an article in front of a noun that can belong to the noun', () => {
    const findings = sentences.flatMap(({ where, de }) =>
      checkArticleAgreement(de, nouns).map((finding) => `${where}: "${finding.determiner} ${finding.noun}" (expected ${finding.expected}) in «${de}»`),
    )
    expectNone(findings, 'articles that do not fit their noun')
  })

  it('has an example for every word that really contains that word', () => {
    const findings = vocabulary.flatMap((item) => (item.example && !exampleUsesWord(item, item.example.de) ? [`${item.id} "${item.word}": «${item.example.de}»`] : []))
    expectNone(findings, 'examples that do not use their word')
  })

  it('writes example sentences as clean text', () => {
    const findings: string[] = []
    for (const { where, de } of sentences) {
      if (de !== de.trim()) findings.push(`${where}: leading or trailing space`)
      if (/\s{2,}/.test(de)) findings.push(`${where}: double space in «${de}»`)
      if (/[\u0600-\u06FF]/.test(de)) findings.push(`${where}: Arabic letters inside the German «${de}»`)
    }
    expectNone(findings, 'unclean German text')
  })

  it('writes vocabulary examples as whole sentences that start with a capital and end with punctuation', () => {
    const findings = vocabulary.flatMap((item) => {
      const de = item.example?.de
      if (!de) return []
      const problems: string[] = []
      if (!/^[\p{Lu}„"]/u.test(de)) problems.push('does not start with a capital')
      if (!/[.!?]["“”]?$/u.test(de)) problems.push('does not end with . ! or ?')
      return problems.map((problem) => `${item.id}: ${problem} — «${de}»`)
    })
    expectNone(findings, 'vocabulary examples that are not sentences')
  })

  it('gives every Arabic meaning and Arabic example real Arabic text', () => {
    const arabic = /[\u0600-\u06FF]/
    const findings = vocabulary.flatMap((item) => {
      const problems: string[] = []
      if (!arabic.test(item.meaningAr)) problems.push('meaningAr has no Arabic letters')
      if (item.example && !arabic.test(item.example.ar)) problems.push('example.ar has no Arabic letters')
      return problems.map((problem) => `${item.id}: ${problem}`)
    })
    expectNone(findings, 'missing Arabic')
  })
})
