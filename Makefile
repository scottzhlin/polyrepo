# Agentic Polyglot Starter local entry points.

.DEFAULT_GOAL := test

GENERAL_TARGETS := help install test lint build clean docs-check template-check
APP_TARGETS := api web-build
GO_TARGETS := go-test
JS_TARGETS := js-test
.PHONY: $(GENERAL_TARGETS) $(APP_TARGETS) $(GO_TARGETS) $(JS_TARGETS)

WITH_ENV := scripts/with-env.sh
GO_ENV := GOCACHE=$(CURDIR)/.dev/go-build

GREEN := \033[1;32m
YELLOW := \033[1;33m
RESET := \033[0m

help:
	@echo ""
	@echo "$(GREEN)Agentic Polyglot Starter commands$(RESET)"
	@echo ""
	@echo "  $(YELLOW)Quality$(RESET)"
	@echo "    make test              Full gate: Go, JS, docs, template scan"
	@echo "    make go-test           go test ./... + go vet ./..."
	@echo "    make js-test           Node built-in test runner"
	@echo "    make docs-check        Validate local Markdown links"
	@echo "    make template-check    Scan for source business terms"
	@echo ""
	@echo "  $(YELLOW)Apps$(RESET)"
	@echo "    make api               Run the sample Go API on HTTP_ADDR"
	@echo "    make web-build         Render sample web HTML into .dev/web/index.html"
	@echo ""

install:
	@pnpm install

test:
	@echo "$(GREEN)> full repository gate$(RESET)"
	@$(MAKE) go-test
	@$(MAKE) js-test
	@$(MAKE) docs-check
	@$(MAKE) template-check

lint:
	@$(MAKE) go-test
	@$(MAKE) docs-check

build:
	@mkdir -p .dev/bin
	@$(GO_ENV) go build -o .dev/bin/api ./cmd/api
	@$(MAKE) web-build

clean:
	@rm -rf .dev

go-test:
	@mkdir -p .dev/go-build
	@$(GO_ENV) go test ./...
	@$(GO_ENV) go vet ./...

js-test:
	@node --test packages/*/test/*.test.js apps/*/test/*.test.js

docs-check:
	@python3 tools/docs/check-markdown-links.py

template-check:
	@python3 tools/template/check-business-leaks.py

api:
	@$(WITH_ENV) env/backend.local.env .env.local .env.backend.local -- scripts/dev-process-guard.sh backend-port
	@mkdir -p .dev/go-build
	@$(WITH_ENV) env/backend.local.env .env.local .env.backend.local -- env $(GO_ENV) go run ./cmd/api

web-build:
	@mkdir -p .dev/web
	@node apps/web/src/main.js > .dev/web/index.html
	@echo "$(GREEN)Wrote .dev/web/index.html$(RESET)"
