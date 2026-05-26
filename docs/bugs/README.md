# Bug Workflow

Use this directory to record bugs, root cause, fix notes, and verification.

## Flow

1. Search [index.md](index.md) and existing bug files.
2. Create a record from [_template.md](_template.md).
3. Reproduce the issue or state why it cannot be reproduced.
4. Add or update a failing test when possible.
5. Implement the smallest fix.
6. Run the narrow verification and then the relevant repository gate.
7. Update the bug record with final evidence.

## Naming

```text
YYYY-MM-DD-short-description.md
```

Example:

```text
2026-05-26-health-endpoint-status.md
```
