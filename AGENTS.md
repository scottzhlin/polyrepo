# Polyrepo - Agent Rules

Purpose: this file is the primary entry point for Codex-style coding agents. `CLAUDE.md` mirrors the same rules for Claude Code. Keep both files aligned.

Last updated: 2026-05-26

## 1. Project Snapshot

| Item | Current state |
|---|---|
| Repository | Public starter template for AI coding friendly polyglot monorepos |
| Core idea | Keep source-of-truth docs, clear directory ownership, small quality gates, and agent instructions close to code |
| Runtime samples | Public Go API, admin Go API, worker service, TypeScript web app, TypeScript H5 app |
| Package shape | pnpm workspace plus root Go module |
| Business domain | Intentionally absent. Product-specific behavior belongs in downstream repositories |

Do not commit secrets, customer data, private business terms, contract details, or copied source-product implementation details.

## 2. Source of Truth

Read the relevant source document before editing a module:

| Scenario | Document |
|---|---|
| Template adoption | [docs/template-guide.md](docs/template-guide.md) |
| Product requirements | [docs/requirements/prd.md](docs/requirements/prd.md) |
| Scope and roadmap | [docs/requirements/roadmap.md](docs/requirements/roadmap.md) |
| Repository structure | [docs/development/repo-structure.md](docs/development/repo-structure.md) |
| Development flow | [docs/development/dev-flow.md](docs/development/dev-flow.md) |
| Git and PR flow | [docs/development/git-workflow.md](docs/development/git-workflow.md) |
| Design system starter | [docs/design/ui-conventions.md](docs/design/ui-conventions.md) |
| Contracts | [contracts/README.md](contracts/README.md) |
| Architecture decisions | [docs/decisions/](docs/decisions/) |
| Bugs and fixes | [docs/bugs/README.md](docs/bugs/README.md) |

If implementation and documentation disagree, update both in the same change or call out the conflict explicitly.

## 3. Working Rules

Required:

1. Keep changes small, focused, and easy to review.
2. Prefer existing repository patterns over new abstractions.
3. Write or update tests before changing behavior.
4. Keep public contracts in `contracts/` aligned with handler and client changes.
5. Keep `AGENTS.md` and `CLAUDE.md` equivalent when changing agent rules.
6. Use local quality gates before claiming completion. The default gate is `make test`.
7. Keep secrets and local overrides out of Git.
8. Add subdirectory `AGENTS.md` files only when a folder has distinct commands, stack, or constraints.

Avoid:

1. Do not use placeholders as shipped implementation.
2. Do not add broad framework dependencies without a documented reason.
3. Do not mix unrelated refactors into feature or bugfix changes.
4. Do not bypass tests by weakening assertions, skipping tests, or deleting failing coverage.
5. Do not copy product-specific docs or source code from another repository into this starter.

## 4. Commands And Gates

| Command | Purpose |
|---|---|
| `make install` | Install workspace dependencies |
| `make api` | Run the sample Go API |
| `make admin-api` | Run the sample admin Go API |
| `make worker` | Run the sample worker |
| `make web-build` | Render the sample web app |
| `make h5-build` | Render the sample H5 app |
| `make go-test` | Run Go tests and vet |
| `make ts-test` | Run TypeScript tests |
| `make docs-check` | Validate Markdown relative links |
| `make template-check` | Scan for source business terms |
| `make test` | Full repository gate |
| `make create-repo-help` | Show one-command repository creation usage |

If a command cannot run in the current environment, report the exact command and reason.

## 5. Agent Roles

| Role | Scope | Use when |
|---|---|---|
| `app-dev` | `apps/`, `packages/` | Frontend or shared TypeScript changes |
| `backend-dev` | `cmd/`, `services/`, `internal/`, `contracts/` | API, service, or Go changes |
| `docs-maintainer` | `docs/`, `AGENTS.md`, `CLAUDE.md` | Source-of-truth or template docs changes |
| `tester` | Tests and failing gates | A test fails or coverage is missing |
| `code-reviewer` | Read-only review | Before a PR or release |

These roles are described for humans and agents. Claude Code compatible definitions live in `.claude/agents/`.

## 6. Directory Boundaries

- `apps/`: user-facing applications.
- `packages/`: shared libraries used by applications or services.
- `cmd/`: executable entry points only.
- `services/`: service assembly, routing, and transport concerns.
- `internal/`: private implementation packages.
- `contracts/`: API, event, schema, and integration contracts.
- `docs/`: source-of-truth product, design, architecture, and process docs.
- `tools/`: repository-level automation.
- `scripts/`: shell helpers called by Makefile or local workflows.

## 7. Documentation Rules

- README should stay short: what this is, how to run it, and where docs live.
- Long-lived decisions go in `docs/decisions/` using ADR format.
- Product scope stays in `docs/requirements/roadmap.md`.
- Bug records stay in `docs/bugs/`.
- Design behavior that affects implementation belongs in `docs/design/`.
- New public APIs must update `contracts/`.

## 8. Open Source Hygiene

Before publishing, run:

```bash
make test
git status --short
```

The template scanner is intentionally conservative. If it flags text, either remove the text or add a narrow documented exception in `tools/template/check-business-leaks.py`.
