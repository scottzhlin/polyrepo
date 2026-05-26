# Env Profiles

Committed files in this directory contain safe defaults only. Runtime commands
load them through `scripts/with-env.sh` and then apply local-only overrides.

## Profiles

| File | Purpose |
|---|---|
| `backend.local.env` | Local API runtime defaults |
| `backend.test.env` | Go test defaults |
| `web.local.env` | Local web rendering defaults |

## Local Overrides

The following files are intentionally ignored by Git:

```text
.env.local
.env.backend.local
.env.web.local
```

## Sensitive Values

Do not commit secrets, production DSNs, private keys, API tokens, user data, or
customer data. Use local override files, CI secrets, or your deployment
platform secret manager.
