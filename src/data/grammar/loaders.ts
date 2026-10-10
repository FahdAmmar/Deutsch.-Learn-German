import type { GrammarRule } from '@/types'

interface RuleModule {
  default: GrammarRule
}

/**
 * One lazily-loaded module per authored rule, discovered from the file
 * names in `./rules/` (`rule-NN-<slug>.ts`). Adding a rule is therefore
 * just adding its file — there is no registry to forget to update — and
 * each rule becomes its own chunk, so the 70-rule roadmap never inflates
 * the main bundle.
 */
const modules = import.meta.glob<RuleModule>('./rules/rule-*.ts')

const RULE_FILE_PATTERN = /rule-(\d{2})-/

export const GRAMMAR_RULE_LOADERS: ReadonlyMap<number, () => Promise<RuleModule>> = new Map(
  Object.entries(modules).flatMap(([path, loader]) => {
    const match = RULE_FILE_PATTERN.exec(path)
    return match ? [[Number(match[1]), loader] as const] : []
  }),
)
