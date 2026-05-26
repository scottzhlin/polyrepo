# .agents

This directory stores portable workflows for Codex-style or other generic
coding agents.

Claude Code specific sub-agent definitions live in `.claude/agents/`. If a
workflow is useful across tools, mirror it here and keep the root `AGENTS.md`
as the entry point.

## Current Workflows

| Workflow | Purpose |
|---|---|
| `skills/bug-workflow` | Record, reproduce, fix, and verify bugs |

## Role Map

| Role | Scope |
|---|---|
| `app-dev` | `apps/`, `packages/` |
| `backend-dev` | `cmd/`, `services/`, `internal/`, `contracts/` |
| `docs-maintainer` | `docs/`, root agent files |
| `tester` | Tests and failing gates |
| `code-reviewer` | Read-only review before PRs |
