# Polyrepo

An AI coding friendly full-stack monorepo template for teams that want frontend, backend, agents, and humans to work from one source of truth.

Use this repository when you want a ready-to-fork frontend-backend unified repository: multiple backend services, web, H5 and miniapp frontends, shared packages, API contracts, source-of-truth docs, local quality gates, and AI agent instructions.

Search keywords: `AI coding template`, `Codex monorepo`, `Claude Code monorepo`, `full-stack monorepo`, `frontend backend monorepo`, `polyglot monorepo template`, `agentic software engineering`.

## What This Includes

| Area | Included |
|---|---|
| Repository shape | `apps/`, `services/`, `internal/`, `packages/`, `contracts/`, `docs/`, `tools/`, `infra/` |
| AI guidance | `AGENTS.md`, `CLAUDE.md`, scoped `AGENTS.md`, generic Claude sub-agent definitions |
| Quality gates | `Makefile`, backend tests, frontend tests, docs link checker, business-leak scanner |
| Documentation | PRD, roadmap, ADR, development flow, git workflow, design docs, bug workflow |
| Runtime samples | Public API, admin API, worker service, web app, H5 app, miniapp shell |
| CI | GitHub Actions workflow that runs the same local gate as `make test` |
| Creation tool | CLI that copies the template, rewrites identity, and optionally runs `git init` |

## Quick Start

```bash
make test
make api        # public API on :8080
make admin-api  # admin API on :8081
make worker     # one-shot background worker sample
```

The API listens on `:8080` by default:

```bash
curl http://localhost:8080/healthz
curl http://localhost:8080/v1/meta
```

Render the sample frontend apps:

```bash
make web-build
make h5-build
make miniapp-build
```

Rendered files are written to `.dev/web/index.html`, `.dev/h5/index.html`, and `.dev/miniapp/app.config.json`.

## One-Command Repository Creation

Create your own product repository from this template:

```bash
pnpm create:repo -- \
  --name my-product \
  --module github.com/acme/my-product \
  --target ../my-product \
  --description "My product frontend-backend monorepo"
```

The tool copies this template, skips local artifacts like `.git` and `.dev`,
rewrites repository identity, rewrites the Go module path, and runs `git init`
unless `--no-git` is passed.

## Template Setup

After cloning this repository for a real product, change these first:

1. Rename the repository and root package in `package.json`, or use `pnpm create:repo`.
2. Change the Go module path in `go.mod`.
3. Replace the product placeholders in `docs/requirements/prd.md` and `docs/requirements/roadmap.md`.
4. Update `AGENTS.md` and `CLAUDE.md` with product-specific source-of-truth documents and quality gates.
5. Adjust `.github/workflows/ci.yml` to match the runtime versions you support.

See [docs/template-guide.md](docs/template-guide.md) for the full adoption checklist.

## Common Commands

| Command | Purpose |
|---|---|
| `make help` | Show all local commands |
| `make test` | Full local gate: backend, frontend, docs, leak scan |
| `make go-test` | `go test ./...` and `go vet ./...` |
| `make ts-test` | Frontend/package tests through Node's built-in test runner |
| `make docs-check` | Validate local Markdown links |
| `make template-check` | Scan for source business terms that should not be in the template |
| `make api` | Run the sample Go API |
| `make admin-api` | Run the sample admin Go API |
| `make worker` | Run the sample background worker |
| `make web-build` | Render the sample web app to `.dev/web/index.html` |
| `make h5-build` | Render the sample H5 app to `.dev/h5/index.html` |
| `make miniapp-build` | Render the sample miniapp config to `.dev/miniapp/app.config.json` |
| `make create-repo-help` | Show one-command repository creation usage |

## Repository Map

```text
.
├── apps/                         # Frontend surfaces
│   ├── web/                      # Desktop web app shell
│   ├── h5/                       # Mobile/H5 app shell
│   └── miniapp/                  # Mini program app shell
├── cmd/                          # Backend executable entry points
│   ├── api/                      # Public API executable
│   ├── admin-api/                # Admin API executable
│   └── worker/                   # Background worker executable
├── services/                     # Backend transport and service assembly
│   ├── api/                      # Public HTTP service assembly
│   └── adminapi/                 # Admin HTTP service assembly
├── internal/                     # Private backend implementation packages
│   ├── buildinfo/                # Shared backend build metadata
│   └── worker/                   # Worker implementation sample
├── packages/
│   └── shared/                   # Shared frontend/package utilities
├── contracts/
│   ├── openapi/                  # HTTP API contracts
│   └── schemas/                  # Data and event schema notes
├── docs/
│   ├── requirements/             # PRD and roadmap
│   ├── design/                   # IA, pages, UI conventions, mock data
│   ├── decisions/                # ADRs
│   ├── development/              # Repo, dev, and git workflows
│   └── bugs/                     # Bug records and verification notes
├── tools/
│   ├── create-repo/              # One-command downstream repo creation
│   ├── docs/                     # Documentation checks
│   └── template/                 # Template hygiene checks
├── scripts/                      # Shell helpers used by Makefile
├── .github/                      # CI and GitHub templates
├── .claude/agents/               # Claude Code sub-agent definitions
├── .agents/                      # Portable agent workflows
├── AGENTS.md                     # Codex-style agent entry point
└── CLAUDE.md                     # Claude Code entry point
```

## License

MIT
