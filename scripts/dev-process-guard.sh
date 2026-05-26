#!/usr/bin/env bash
# Prompt before reusing a local development port.

set -euo pipefail

MODE="${1:-}"
HTTP_ADDR="${HTTP_ADDR:-:8080}"
BACKEND_PORT="${BACKEND_PORT:-${HTTP_ADDR##*:}}"

usage() {
  cat <<'USAGE'
Usage: scripts/dev-process-guard.sh backend-port

Checks whether the configured backend port already has a listening process.
USAGE
}

collect_backend_pids() {
  if command -v lsof > /dev/null 2>&1; then
    lsof -i ":${BACKEND_PORT}" -sTCP:LISTEN -t 2>/dev/null | sort -u || true
  fi
}

describe_pids() {
  local pids=("$@")
  if command -v ps > /dev/null 2>&1; then
    ps -o pid=,ppid=,command= -p "$(IFS=,; echo "${pids[*]}")" 2>/dev/null || true
  else
    printf "%s\n" "${pids[@]}"
  fi
}

case "${MODE}" in
  backend-port)
    mapfile -t pids < <(collect_backend_pids)
    if [[ "${#pids[@]}" -eq 0 ]]; then
      echo "No process is listening on :${BACKEND_PORT}"
      exit 0
    fi
    echo "A process is already listening on :${BACKEND_PORT}:"
    describe_pids "${pids[@]}"
    echo "Stop it or choose a different HTTP_ADDR before starting the API."
    exit 1
    ;;
  *)
    usage
    exit 2
    ;;
esac
