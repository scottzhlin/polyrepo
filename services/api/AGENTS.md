# services/api Agent Notes

Scope: this file applies to `services/api/` and its children.

## Boundaries

- Keep HTTP decoding, routing, middleware, and response mapping in this layer.
- Put reusable domain logic in `internal/` packages.
- Put executable startup wiring in `cmd/`.
- Treat `contracts/` as the API boundary. Update contracts before changing public response shapes.

## Quality Rules

1. Add or update Go tests before changing behavior.
2. Prefer `httptest` for handler behavior.
3. Do not access databases, queues, or external APIs directly from handlers.
4. Keep JSON error formats stable after a project-specific envelope is introduced.
5. Run `make go-test` after service changes.
