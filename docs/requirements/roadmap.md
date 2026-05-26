# Roadmap Template

Keep one roadmap in the repository. Split details into ADRs or specs only when
they need more context than this file can hold.

## Current Phase

| Item | Value |
|---|---|
| Phase | Starter baseline |
| Status | Ready to customize |
| Main goal | Replace placeholders with product-specific source of truth |
| Gate | `make test` |

## Milestones

| Milestone | Scope | Exit criteria |
|---|---|---|
| M0 - Repository adoption | Rename project, fill product docs, choose runtime shape | `make test` passes and README reflects the product |
| M1 - First vertical slice | One user workflow with API, UI, contracts, tests | Feature can be demonstrated locally |
| M2 - Operational baseline | CI, env profiles, observability, deploy docs | Team can ship safely |

## Backlog

| Priority | Item | Notes |
|---|---|---|
| High | Define product contracts | Keep `contracts/` ahead of implementation |
| Medium | Expand app structure | Add only the apps the product needs |
| Medium | Add deployment target | Document provider-specific steps in `infra/` |

## Changelog

| Date | Change |
|---|---|
| 2026-05-26 | Starter roadmap created |
