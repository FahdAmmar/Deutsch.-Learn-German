/**
 * `virtual:pwa-register` only exists at build/dev time, injected by the
 * `vite-plugin-pwa` plugin configured in `vite.config.ts`. Vitest uses a
 * separate Vite config that doesn't register that plugin, so the bare
 * specifier can't resolve at all — not even for `vi.mock` to intercept,
 * since Vite's import analysis fails before mocking gets a chance to run.
 *
 * The alias in `vitest.config.ts` points the specifier at this file
 * instead, giving it something real to resolve to. Tests that need
 * specific `registerSW` behavior still override it with `vi.mock`.
 */
export function registerSW(): (reload?: boolean) => Promise<void> {
  return async () => {}
}
