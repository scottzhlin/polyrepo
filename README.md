# AI Coding Polyglot Monorepo Template

An AI coding friendly polyglot monorepo template for teams that want Codex, Claude Code, and human engineers to work from the same source of truth.

Use this repository when you want a ready-to-fork starter for a multi-language product: multiple Go backend services, TypeScript web and H5 frontends, shared typed packages, API contracts, source-of-truth docs, local quality gates, and AI agent instructions.

Search keywords: `AI coding template`, `Codex monorepo`, `Claude Code monorepo`, `polyglot monorepo template`, `Go TypeScript starter`, `agentic software engineering`.

## What This Includes

| Area | Included |
|---|---|
| Repository shape | `apps/`, `services/`, `internal/`, `packages/`, `contracts/`, `docs/`, `tools/`, `infra/` |
| AI guidance | `AGENTS.md`, `CLAUDE.md`, scoped `AGENTS.md`, generic Claude sub-agent definitions |
| Quality gates | `Makefile`, Go tests, TypeScript tests, docs link checker, business-leak scanner |
| Documentation | PRD, roadmap, ADR, development flow, git workflow, design docs, bug workflow |
| Runtime samples | Public Go API, admin Go API, worker service, TypeScript web app, TypeScript H5 app |
| CI | GitHub Actions workflow that runs the same local gate as `make test` |
| Creation tool | TypeScript CLI that copies the template, rewrites identity, and optionally runs `git init` |

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

Render the sample TypeScript apps:

```bash
make web-build
make h5-build
```

Rendered files are written to `.dev/web/index.html` and `.dev/h5/index.html`.

## One-Command Repository Creation

Create your own product repository from this template:

```bash
pnpm create:repo -- \
  --name my-product \
  --module github.com/acme/my-product \
  --target ../my-product \
  --description "My product AI coding polyglot monorepo"
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
| `make test` | Full local gate: Go, TypeScript, docs, leak scan |
| `make go-test` | `go test ./...` and `go vet ./...` |
| `make ts-test` | TypeScript tests through Node's built-in test runner |
| `make docs-check` | Validate local Markdown links |
| `make template-check` | Scan for source business terms that should not be in the template |
| `make api` | Run the sample Go API |
| `make admin-api` | Run the sample admin Go API |
| `make worker` | Run the sample background worker |
| `make web-build` | Render the sample web app to `.dev/web/index.html` |
| `make h5-build` | Render the sample H5 app to `.dev/h5/index.html` |
| `make create-repo-help` | Show one-command repository creation usage |

## Repository Map

```text
.
├── apps/web/              # Example TypeScript desktop web app
├── apps/h5/               # Example TypeScript mobile/H5 app
├── cmd/api/               # Public Go API entry point
├── cmd/admin-api/         # Admin Go API entry point
├── cmd/worker/            # Background worker entry point
├── services/api/          # Public Go HTTP service assembly
├── services/adminapi/     # Admin Go HTTP service assembly
├── internal/              # Private Go packages
├── packages/shared/       # Shared TypeScript package
├── contracts/             # API and data contracts
├── docs/                  # Source-of-truth docs
├── tools/                 # Repository tooling, including create-repo
├── scripts/               # Shell helpers used by Makefile
├── .claude/agents/        # Generic Claude Code sub-agent definitions
├── .agents/               # Generic agent workflows mirrored for Codex-style agents
├── AGENTS.md              # Codex-style agent entry point
└── CLAUDE.md              # Claude Code entry point
```

## License

MIT
