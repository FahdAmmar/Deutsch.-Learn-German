type ClassValue = string | number | null | undefined | false | Record<string, boolean | undefined>

/**
 * Tiny `clsx`-style class name combinator. Kept local rather than pulling in
 * a dependency for something this small.
 */
export function cn(...values: ClassValue[]): string {
  const classes: string[] = []

  for (const value of values) {
    if (!value) continue

    if (typeof value === 'string' || typeof value === 'number') {
      classes.push(String(value))
      continue
    }

    for (const [key, enabled] of Object.entries(value)) {
      if (enabled) classes.push(key)
    }
  }

  return classes.join(' ')
}
