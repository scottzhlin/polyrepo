# Information Architecture Template

Use this file to describe navigation, major surfaces, and workflow ownership.

## Surfaces

| Surface | Purpose | Owner folder |
|---|---|---|
| Web app | Example rendered desktop web app | `apps/web` |
| H5 app | Example rendered mobile/H5 app | `apps/h5` |
| API | Example HTTP surface | `services/api` |
| Admin API | Example admin HTTP surface | `services/adminapi` |

## Navigation

Document product navigation after the real app shape is known.

| Route or screen | User intent | Source file |
|---|---|---|
| `/` | See starter app status | `apps/web/src/main.ts` |

## Workflow Map

| Workflow | Entry | Data source | Exit |
|---|---|---|---|
| Health check | `GET /healthz` | API handler | JSON status |
| Admin metadata | `GET /admin/v1/meta` | Admin API handler | JSON metadata |
