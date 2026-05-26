# services/adminapi Agent Notes

Scope: this file applies to `services/adminapi/` and its children.

## Boundaries

- Keep admin HTTP routes separate from public API routes.
- Put shared domain or platform logic in `internal/` packages.
- Keep executable startup wiring in `cmd/admin-api/`.
- Update `contracts/` when admin response shapes change.

## Quality Rules

1. Add or update Go tests before changing admin behavior.
2. Prefer `httptest` for handler behavior.
3. Do not put authorization, audit, database, or queue internals directly in handlers.
4. Keep admin route prefixes explicit, currently `/admin`.
5. Run `make go-test` after admin service changes.
