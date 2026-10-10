#!/usr/bin/env bash
#
# PreToolUse guard for the Bash tool. Reads the tool call as JSON on
# stdin and blocks a short list of destructive shell patterns before
# Claude Code runs them. Exit 2 blocks the command and returns stderr to
# Claude as the reason; exit 0 lets it through.
#
# Wired up in .claude/settings.json:
#   "hooks": { "PreToolUse": [{ "matcher": "Bash", "hooks": [...] }] }

set -euo pipefail

INPUT="$(cat)"

if ! command -v jq >/dev/null 2>&1; then
  # Fail open rather than blocking every command if jq is missing — install
  # jq to get the actual protection back.
  echo "validate-bash.sh: jq not found, skipping guard" >&2
  exit 0
fi

CMD="$(echo "$INPUT" | jq -r '.tool_input.command // empty')"

if [ -z "$CMD" ]; then
  exit 0
fi

# Patterns that are almost never what you meant to run against this
# repository. Keep this list short and specific so it doesn't get in the
# way of normal work — extend it as real near-misses come up.
BLOCKED_PATTERNS=(
  'rm[[:space:]]+-rf[[:space:]]+/([[:space:]]|$)'
  'rm[[:space:]]+-rf[[:space:]]+\*'
  'git[[:space:]]+push[[:space:]]+.*--force'
  'git[[:space:]]+push[[:space:]]+.*-f([[:space:]]|$)'
  'git[[:space:]]+reset[[:space:]]+--hard'
  'chmod[[:space:]]+-R[[:space:]]+777'
  '>[[:space:]]*\.env'
)

for pattern in "${BLOCKED_PATTERNS[@]}"; do
  if echo "$CMD" | grep -qE "$pattern"; then
    echo "Blocked by validate-bash.sh: command matches '$pattern'. If this is genuinely intentional, run it manually outside Claude Code." >&2
    exit 2
  fi
done

exit 0
