# Contracts

Contracts define boundaries between applications, services, packages, and
external systems.

## Structure

```text
contracts/
├── openapi/          # HTTP API contracts
└── schemas/          # JSON schema or domain schema notes
```

## Rules

1. Update contracts before changing public API behavior.
2. Keep examples safe and free of real user data.
3. Keep handler tests aligned with contract changes.
4. Version breaking changes intentionally.

## Current Contract

- [openapi/service.openapi.json](openapi/service.openapi.json)
