# Information Architecture Template

Use this file to describe navigation, major surfaces, and workflow ownership.

## Surfaces

| Surface | Purpose | Owner folder |
|---|---|---|
| Web app | Example rendered app | `apps/web` |
| API | Example HTTP surface | `services/api` |

## Navigation

Document product navigation after the real app shape is known.

| Route or screen | User intent | Source file |
|---|---|---|
| `/` | See starter app status | `apps/web/src/main.js` |

## Workflow Map

| Workflow | Entry | Data source | Exit |
|---|---|---|---|
| Health check | `GET /healthz` | API handler | JSON status |
