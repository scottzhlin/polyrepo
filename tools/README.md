# Tools

Repository-level tools live here and are exposed through the root `Makefile`.

| Tool | Command | Purpose |
|---|---|---|
| `tools/create-repo/src/main.ts` | `pnpm create:repo -- --name my-product --module github.com/acme/my-product --target ../my-product` | Create a downstream repository from this template |
| `tools/docs/check-markdown-links.py` | `make docs-check` | Validate local Markdown links |
| `tools/template/check-business-leaks.py` | `make template-check` | Ensure template docs do not contain source business terms |

Keep tools dependency-light. If a tool requires a package install or external
service, document that requirement in this file and expose a narrow Make target.
