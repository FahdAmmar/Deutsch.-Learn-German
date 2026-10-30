import { z } from 'zod'

/**
 * The production Content-Security-Policy (see `vercel.json`) does not allow
 * `unsafe-eval`. Zod's JIT fast path probes for eval support with
 * `new Function`, which a strict CSP reports as a violation even though Zod
 * handles the refusal. The schemas in this app only validate small,
 * user-imported files, so the interpreted path costs nothing measurable.
 *
 * This module must be imported before any schema is created (see `main.tsx`).
 */
z.config({ jitless: true })
