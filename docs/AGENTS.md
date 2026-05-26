# docs Agent Notes

Scope: this file applies to `docs/` and its children.

## Rules

1. Keep documentation concise and source-of-truth oriented.
2. Update docs in the same change as behavior, contract, or workflow changes.
3. Put durable decisions in `decisions/` using ADR format.
4. Put bug records in `bugs/`.
5. Do not create parallel roadmaps. Use `requirements/roadmap.md`.
6. Do not include secrets, customer data, or copied source-product details.
7. Run `make docs-check` after changing links.

## ADR Format

```markdown
# ADR-0000: Title

## Status
Proposed | Accepted | Superseded | Deprecated

## Context
What problem are we solving?

## Options
- Option A: trade-offs.
- Option B: trade-offs.

## Decision
What did we choose and why?

## Consequences
- Positive outcomes.
- Costs and risks.
- Follow-up work.
```
