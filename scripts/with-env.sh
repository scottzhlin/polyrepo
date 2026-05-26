#!/usr/bin/env bash
# Merge versioned env profiles before running a command.
#
# Usage:
#   scripts/with-env.sh env/backend.local.env .env.local -- go run ./cmd/api
#
# Files are loaded left-to-right; later files override earlier files.
# Variables already present in the caller environment are restored after profile
# loading, so explicit shell or CI env still wins.

set -euo pipefail

ORIGINAL_NAMES=()
ORIGINAL_VALUES=()
while IFS='=' read -r name value; do
  ORIGINAL_NAMES+=("${name}")
  ORIGINAL_VALUES+=("${value}")
done < <(env)

FILES=()
while [[ $# -gt 0 ]]; do
  if [[ "$1" == "--" ]]; then
    shift
    break
  fi
  FILES+=("$1")
  shift
done

if [[ $# -eq 0 ]]; then
  echo "with-env: missing command after --" >&2
  exit 2
fi

for file in "${FILES[@]}"; do
  if [[ -f "${file}" ]]; then
    set -a
    # shellcheck disable=SC1090
    source "${file}"
    set +a
  fi
done

for i in "${!ORIGINAL_NAMES[@]}"; do
  export "${ORIGINAL_NAMES[$i]}=${ORIGINAL_VALUES[$i]}"
done

exec "$@"
