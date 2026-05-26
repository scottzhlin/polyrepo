# ADR-0001: Agentic Polyglot Monorepo Shape

## Status

Accepted

## Context

AI coding agents perform better when repository boundaries, source-of-truth
documents, commands, and verification gates are explicit. Polyglot repositories
also need a shared entry point so developers do not need to memorize different
runtime conventions.

## Options

- Single-language starter: simpler, but does not model real multi-runtime work.
- Full production stack: realistic, but too much business and infrastructure
  weight for a reusable template.
- Minimal polyglot starter: enough structure to guide real projects while
  keeping the sample small and easy to verify.

## Decision

Use a minimal polyglot starter with multiple Go backend services, TypeScript web
and H5 app samples, source-of-truth docs, root Makefile, agent entry files, a
one-command repository creation CLI, and CI that runs the same local gate as
contributors.

## Consequences

- The template is easy to clone, inspect, and run.
- Downstream projects must intentionally add product-specific frameworks and
  deployment choices.
- Agent instructions can be tested and evolved without carrying private product
  logic.
