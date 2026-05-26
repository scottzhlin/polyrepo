# Documentation Center

This directory is the source-of-truth entry point for product scope, design,
architecture, development workflow, and agent handoff.

## Structure

```text
docs/
├── requirements/      # Product requirements and roadmap templates
├── design/            # Information architecture, UI conventions, mock data
├── decisions/         # ADRs and long-lived technical decisions
├── development/       # Repo structure, dev flow, git workflow
└── bugs/              # Bug records, fix notes, verification results
```

Contracts live outside `docs/` in [../contracts/](../contracts/).

## Recommended Reading Paths

Template adoption:

1. [template-guide.md](template-guide.md)
2. [development/repo-structure.md](development/repo-structure.md)
3. [development/dev-flow.md](development/dev-flow.md)
4. [../AGENTS.md](../AGENTS.md)

Backend work:

1. [../AGENTS.md](../AGENTS.md)
2. [../contracts/README.md](../contracts/README.md)
3. [development/dev-flow.md](development/dev-flow.md)
4. [decisions/0001-ai-coding-polyglot-monorepo-template.md](decisions/0001-ai-coding-polyglot-monorepo-template.md)

Frontend or app work:

1. [../AGENTS.md](../AGENTS.md)
2. [design/information-architecture.md](design/information-architecture.md)
3. [design/ui-conventions.md](design/ui-conventions.md)
4. [design/mock-data.md](design/mock-data.md)

## Maintenance Rules

1. Keep one roadmap: [requirements/roadmap.md](requirements/roadmap.md).
2. Record durable decisions as ADRs in [decisions/](decisions/).
3. Put development process docs in [development/](development/).
4. Put bug records in [bugs/](bugs/).
5. Keep agent rules in [../AGENTS.md](../AGENTS.md) and [../CLAUDE.md](../CLAUDE.md) aligned.
6. Do not write secrets, customer data, or copied product-specific information into docs.
