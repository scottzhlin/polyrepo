# Development Flow

## Goals

This starter optimizes for a simple loop that both humans and AI agents can
follow:

1. Read the relevant source-of-truth document.
2. Make a small change.
3. Run a local gate.
4. Update docs when behavior or contracts change.
5. Commit a focused diff.

## Standard Commands

| Scenario | Command |
|---|---|
| Full local gate | `make test` |
| Go-only work | `make go-test` |
| TypeScript-only work | `make ts-test` |
| Docs-only work | `make docs-check` |
| Template hygiene | `make template-check` |
| Run sample API | `make api` |
| Run sample admin API | `make admin-api` |
| Run sample worker | `make worker` |
| Render sample web app | `make web-build` |
| Render sample H5 app | `make h5-build` |
| Create a downstream repository | `pnpm create:repo -- --name my-product --module github.com/acme/my-product --target ../my-product` |

## Environment Profiles

Committed env profiles live in [../../env/](../../env/). Local overrides stay
untracked:

```text
.env.local
.env.backend.local
.env.web.local
```

Merge order:

1. Runtime defaults.
2. Committed profile, such as `env/backend.local.env`.
3. Local override, such as `.env.backend.local`.
4. Shell or CI environment variables.

## Contract-First Changes

When changing an API shape:

1. Update [../../contracts/](../../contracts/).
2. Add or update handler tests.
3. Implement the smallest behavior change.
4. Update clients, mocks, and docs in the same change.
5. Run `make test`.

## One-Command Repository Creation

The template ships with a TypeScript CLI:

```bash
pnpm create:repo -- \
  --name my-product \
  --module github.com/acme/my-product \
  --target ../my-product
```

This copies the template, skips local artifacts, rewrites repository identity,
rewrites the Go module path, and initializes a new Git repository by default.

## Long-Running Processes

The starter includes `scripts/dev-process-guard.sh` as a narrow example for
checking local port conflicts. Keep process management explicit and avoid
hidden background state.
