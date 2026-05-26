# Template Adoption Guide

Use this checklist when turning the starter into a real product repository.

## 1. Rename Identity

Update:

- `README.md` title and description.
- `package.json` name and description.
- `go.mod` module path.
- `env/*.env` service names.
- `.github/workflows/ci.yml` display name if desired.

## 2. Fill Product Source Of Truth

Replace starter content with product-specific truth:

- [requirements/prd.md](requirements/prd.md): problem, users, scope, non-goals.
- [requirements/roadmap.md](requirements/roadmap.md): current phase and planned milestones.
- [design/information-architecture.md](design/information-architecture.md): navigation and primary workflows.
- [design/ui-conventions.md](design/ui-conventions.md): design tokens and component rules.
- [design/mock-data.md](design/mock-data.md): fixture and mock behavior contracts.

## 3. Choose Runtime Shape

The starter ships with:

- Go API in `cmd/api`, `services/api`, and `internal/`.
- Dependency-free web frontend app in `apps/web`.
- Dependency-free mobile/H5 frontend app in `apps/h5`.
- Shared frontend package in `packages/shared`.

Keep what you need and remove the rest. If you introduce another language, add:

- A small sample module.
- Tests that run in `make test`.
- Scoped `AGENTS.md` if the folder needs distinct rules.
- CI setup for that runtime.

## 4. Define Agent Boundaries

Update:

- [../AGENTS.md](../AGENTS.md) for Codex-style agents.
- [../CLAUDE.md](../CLAUDE.md) for Claude Code.
- `.claude/agents/*.md` for reusable roles.
- `.agents/README.md` for portable workflows.

Keep boundaries concrete: agents work better when a folder has a clear owner,
commands, and source-of-truth docs.

## 5. Wire Quality Gates

Start with:

```bash
make test
```

Then add project-specific checks. Examples:

- TypeScript compile.
- ESLint or Biome.
- API contract validation.
- Database migration checks.
- App build verification.
- Security or secret scanning.

Every new gate should be available locally and in CI.

## 6. Publish As Open Source

Before the first public push:

```bash
make test
git status --short
```

Then check:

- License is correct.
- README has no private references.
- `.env.example` and `env/` contain no secrets.
- `tools/template/check-business-leaks.py` passes.
- GitHub repo visibility is public.
- Branch protection is configured after initial push.

## One-Command Creation

Downstream users can create a new product repository with:

```bash
pnpm create:repo -- \
  --name my-product \
  --module github.com/acme/my-product \
  --target ../my-product
```

The CLI is implemented in `tools/create-repo/src/main.ts` and covered by
`tools/create-repo/test/create-repo.test.ts`.
