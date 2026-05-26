---
name: bug-workflow
description: Use when recording, reproducing, fixing, or verifying a bug in this repository.
---

# Bug Workflow

1. Search `docs/bugs/index.md` and existing bug records.
2. Create `docs/bugs/YYYY-MM-DD-short-title.md` from `docs/bugs/_template.md` if no record exists.
3. Reproduce the issue or document why reproduction is blocked.
4. Add or update a failing test when practical.
5. Implement the smallest fix.
6. Run the narrow verification command.
7. Run the relevant repository gate, usually `make test`.
8. Update the bug record with root cause, fix, and verification evidence.

Do not skip failing tests to close a bug.
