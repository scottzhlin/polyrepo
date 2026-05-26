# Mock Data And Fixture Contracts

Use mock data as a contract preview, not as throwaway filler.

## Rules

1. Keep fixtures small and realistic.
2. Keep write behavior deterministic.
3. Keep mock response shapes aligned with `contracts/`.
4. Use tests to lock edge cases that are easy to break.
5. Do not put real user data in fixtures.

## Example Fixture

```json
{
  "service": "web",
  "status": "ok"
}
```

The example fixture mirrors `packages/shared/src/index.js`.
