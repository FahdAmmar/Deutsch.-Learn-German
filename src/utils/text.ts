/** Normalizes text for answer-checking: trims, lowercases, and collapses whitespace/punctuation. */
export function normalizeAnswer(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[.,!?;:„""'']/g, '')
    .replace(/\s+/g, ' ')
}

export function isAnswerAccepted(input: string, acceptedAnswers: string[]): boolean {
  const normalizedInput = normalizeAnswer(input)
  if (!normalizedInput) return false
  return acceptedAnswers.some((answer) => normalizeAnswer(answer) === normalizedInput)
}
