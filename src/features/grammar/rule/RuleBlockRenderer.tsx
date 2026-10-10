import type { RuleBlock } from '@/types'

import { CompareView } from './blocks/CompareView'
import { ExamplesView } from './blocks/ExamplesView'
import { FormulaBlockView } from './blocks/FormulaBlockView'
import { PatternCardsView } from './blocks/PatternCardsView'
import { PracticeView } from './blocks/PracticeView'
import { RuleBoxView } from './blocks/RuleBoxView'
import { RuleTableView } from './blocks/RuleTableView'
import { DetailsBlockView, MistakesBlockView, SentenceBlockView, TextBlockView } from './blocks/SimpleBlocks'

function assertNever(value: never): never {
  throw new Error(`Unhandled grammar block: ${JSON.stringify(value)}`)
}

/** Exhaustive over `RuleBlock` — adding a block kind to the type fails the build until it is rendered here. */
export function RuleBlockRenderer({ block }: { block: RuleBlock }) {
  switch (block.kind) {
    case 'formula':
      return <FormulaBlockView block={block} />
    case 'ruleBox':
      return <RuleBoxView block={block} />
    case 'text':
      return <TextBlockView block={block} />
    case 'table':
      return <RuleTableView block={block} />
    case 'patternCards':
      return <PatternCardsView block={block} />
    case 'examples':
      return <ExamplesView block={block} />
    case 'mistakes':
      return <MistakesBlockView block={block} />
    case 'details':
      return <DetailsBlockView block={block} />
    case 'sentence':
      return <SentenceBlockView block={block} />
    case 'compare':
      return <CompareView block={block} />
    case 'practice':
      return <PracticeView block={block} />
    default:
      return assertNever(block)
  }
}
