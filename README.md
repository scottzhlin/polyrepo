# Agentic Polyglot Starter

An AI coding friendly polyglot monorepo starter for teams that want agents and humans to share the same source of truth.

This template is intentionally small. It keeps the durable repository habits from a production-style monorepo and removes product-specific business code. Use it as a starting point for Go services, JavaScript or TypeScript workspaces, contracts, docs, tooling, and agent instructions.

## What This Includes

| Area | Included |
|---|---|
| Repository shape | `apps/`, `services/`, `internal/`, `packages/`, `contracts/`, `docs/`, `tools/`, `infra/` |
| AI guidance | `AGENTS.md`, `CLAUDE.md`, scoped `AGENTS.md`, generic Claude sub-agent definitions |
| Quality gates | `Makefile`, Go tests, Node tests, docs link checker, business-leak scanner |
| Documentation | PRD, roadmap, ADR, development flow, git workflow, design docs, bug workflow |
| Runtime sample | Minimal Go HTTP API and dependency-free JS web renderer |
| CI | GitHub Actions workflow that runs the same local gate as `make test` |

## Quick Start

```bash
make test
make api
```

The API listens on `:8080` by default:

```bash
curl http://localhost:8080/healthz
curl http://localhost:8080/v1/meta
```

Render the sample web app:

```bash
make web-build
```

The rendered file is written to `.dev/web/index.html`.

## Template Setup

After cloning this repository for a real product, change these first:

1. Rename the repository and root package in `package.json`.
2. Change the Go module path in `go.mod`.
3. Replace the product placeholders in `docs/requirements/prd.md` and `docs/requirements/roadmap.md`.
4. Update `AGENTS.md` and `CLAUDE.md` with product-specific source-of-truth documents and quality gates.
5. Adjust `.github/workflows/ci.yml` to match the runtime versions you support.

See [docs/template-guide.md](docs/template-guide.md) for the full adoption checklist.

## Common Commands

| Command | Purpose |
|---|---|
| `make help` | Show all local commands |
| `make test` | Full local gate: Go, Node, docs, leak scan |
| `make go-test` | `go test ./...` and `go vet ./...` |
| `make js-test` | Node built-in test runner |
| `make docs-check` | Validate local Markdown links |
| `make template-check` | Scan for source business terms that should not be in the template |
| `make api` | Run the sample Go API |
| `make web-build` | Render the sample web app to `.dev/web/index.html` |

## Repository Map

```text
.
├── apps/web/              # Example JS app with no external runtime deps
├── cmd/api/               # Go executable entry point
├── services/api/          # Go HTTP service assembly
├── internal/              # Private Go packages
├── packages/shared/       # Shared JS package
├── contracts/             # API and data contracts
├── docs/                  # Source-of-truth docs
├── tools/                 # Repository tooling
├── scripts/               # Shell helpers used by Makefile
├── .claude/agents/        # Generic Claude Code sub-agent definitions
├── .agents/               # Generic agent workflows mirrored for Codex-style agents
├── AGENTS.md              # Codex-style agent entry point
└── CLAUDE.md              # Claude Code entry point
```

## License

MIT
