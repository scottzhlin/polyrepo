# Repository Structure

## Top Level

```text
polyrepo/
├── apps/                 # User-facing applications
├── cmd/                  # Executable entry points
├── services/             # Transport and service assembly
├── internal/             # Private implementation packages
├── packages/             # Shared libraries
├── contracts/            # API, event, and schema contracts
├── docs/                 # Source-of-truth documentation
├── tools/                # Repository-level automation
├── scripts/              # Shell helpers
├── infra/                # Infrastructure notes and IaC placeholder
├── .claude/agents/       # Claude Code sub-agent definitions
├── .agents/              # Portable agent workflows
├── AGENTS.md             # Codex-style agent entry point
├── CLAUDE.md             # Claude Code entry point
└── Makefile              # Local command entry point
```

## Subdirectory Agent Strategy

Root agent files define general rules. Add a closer `AGENTS.md` only when a
folder has independent commands, stack constraints, or ownership boundaries.

Current scoped rules:

| Path | Purpose |
|---|---|
| `services/api/AGENTS.md` | Go HTTP service constraints |
| `services/adminapi/AGENTS.md` | Admin Go HTTP service constraints |
| `docs/AGENTS.md` | Documentation maintenance rules |

## Included Samples

| Path | Purpose |
|---|---|
| `apps/web/` | Desktop web frontend example |
| `apps/h5/` | Mobile/H5 frontend example |
| `packages/shared/` | Shared frontend utilities |
| `cmd/api/` | Public API executable |
| `cmd/admin-api/` | Admin API executable |
| `cmd/worker/` | Background worker executable |
| `services/api/` | Public HTTP service assembly |
| `services/adminapi/` | Admin HTTP service assembly |
| `internal/worker/` | Worker implementation sample |
| `tools/create-repo/` | One-command repository creation CLI |

## File Ownership Principles

- Files that change together should live together.
- Public contracts should be explicit and versioned.
- Generated or local session artifacts must not be committed.
- Tooling should be narrow, documented, and callable through `make`.
- Avoid adding empty abstraction folders until a real module needs them.
