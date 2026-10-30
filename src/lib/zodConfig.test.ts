import { z } from 'zod'
import { describe, expect, it } from 'vitest'

import './zodConfig'

describe('zodConfig', () => {
  it('turns off Zod JIT so no eval probe can trigger a CSP violation', () => {
    expect(z.core.util.allowsEval.value).toBe(false)
  })

  it('still validates objects through the interpreted path', () => {
    const schema = z.object({ count: z.number().int().min(0) })
    expect(schema.parse({ count: 3 })).toEqual({ count: 3 })
    expect(schema.safeParse({ count: -1 }).success).toBe(false)
  })
})
