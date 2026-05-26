# Git Workflow

## Principles

1. Keep `main` releasable.
2. Use focused branches for features, fixes, refactors, and docs.
3. Commit only verified changes.
4. Prefer small pull requests with clear review scope.

## Branch Names

| Type | Pattern | Example |
|---|---|---|
| Feature | `feat/<scope>-<description>` | `feat/api-health` |
| Fix | `fix/<scope>-<description>` | `fix/docs-links` |
| Refactor | `refactor/<scope>-<description>` | `refactor/service-wiring` |
| Docs | `docs/<scope>-<description>` | `docs/template-guide` |
| Chore | `chore/<scope>-<description>` | `chore/ci-cache` |

## Commit Messages

Use Conventional Commits:

```text
<type>(<scope>): <subject>
```

Examples:

```text
feat(api): add health endpoint
docs(template): add adoption checklist
chore(ci): run repository gate
```

## Pull Request Checklist

- [ ] Diff has one clear purpose.
- [ ] Tests or docs checks were run and reported.
- [ ] Contracts changed with implementation when public APIs changed.
- [ ] Agent rules stayed aligned when edited.
- [ ] No secrets, customer data, or private business terms were added.
- [ ] README and docs links still resolve.

## Suggested GitHub Settings

After initial open-source publish:

- Require pull requests before merging.
- Require status checks to pass.
- Require linear history if the team prefers squash merges.
- Disallow force pushes to `main`.
- Disallow branch deletion for protected branches.
