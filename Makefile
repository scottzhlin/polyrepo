# Polyrepo local entry points.

.DEFAULT_GOAL := test

GENERAL_TARGETS := help install test lint build clean docs-check template-check create-repo-help
APP_TARGETS := api admin-api worker web-build h5-build
GO_TARGETS := go-test
TS_TARGETS := ts-test
.PHONY: $(GENERAL_TARGETS) $(APP_TARGETS) $(GO_TARGETS) $(TS_TARGETS)

WITH_ENV := scripts/with-env.sh
GO_ENV := GOCACHE=$(CURDIR)/.dev/go-build

GREEN := \033[1;32m
YELLOW := \033[1;33m
RESET := \033[0m

help:
	@echo ""
	@echo "$(GREEN)Polyrepo commands$(RESET)"
	@echo ""
	@echo "  $(YELLOW)Quality$(RESET)"
	@echo "    make test              Full gate: backend, frontend, docs, template scan"
	@echo "    make go-test           go test ./... + go vet ./..."
	@echo "    make ts-test           Frontend/package tests through Node test runner"
	@echo "    make docs-check        Validate local Markdown links"
	@echo "    make template-check    Scan for source business terms"
	@echo ""
	@echo "  $(YELLOW)Apps$(RESET)"
	@echo "    make api               Run the sample Go API on HTTP_ADDR"
	@echo "    make admin-api         Run the sample admin Go API"
	@echo "    make worker            Run the sample background worker"
	@echo "    make web-build         Render sample web HTML into .dev/web/index.html"
	@echo "    make h5-build          Render sample H5 HTML into .dev/h5/index.html"
	@echo "    make create-repo-help  Show one-command repository creation help"
	@echo ""

install:
	@pnpm install

test:
	@echo "$(GREEN)> full repository gate$(RESET)"
	@$(MAKE) go-test
	@$(MAKE) ts-test
	@$(MAKE) docs-check
	@$(MAKE) template-check

lint:
	@$(MAKE) go-test
	@$(MAKE) docs-check

build:
	@mkdir -p .dev/bin
	@$(GO_ENV) go build -o .dev/bin/api ./cmd/api
	@$(GO_ENV) go build -o .dev/bin/admin-api ./cmd/admin-api
	@$(GO_ENV) go build -o .dev/bin/worker ./cmd/worker
	@$(MAKE) web-build
	@$(MAKE) h5-build

clean:
	@rm -rf .dev

go-test:
	@mkdir -p .dev/go-build
	@$(GO_ENV) go test ./...
	@$(GO_ENV) go vet ./...

ts-test:
	@node --test packages/*/test/*.test.ts apps/*/test/*.test.ts tools/*/test/*.test.ts

docs-check:
	@python3 tools/docs/check-markdown-links.py

template-check:
	@python3 tools/template/check-business-leaks.py

api:
	@$(WITH_ENV) env/backend.local.env .env.local .env.backend.local -- scripts/dev-process-guard.sh backend-port
	@mkdir -p .dev/go-build
	@$(WITH_ENV) env/backend.local.env .env.local .env.backend.local -- env $(GO_ENV) go run ./cmd/api

admin-api:
	@mkdir -p .dev/go-build
	@$(WITH_ENV) env/admin-api.local.env .env.local .env.admin-api.local -- env $(GO_ENV) go run ./cmd/admin-api

worker:
	@mkdir -p .dev/go-build
	@$(WITH_ENV) env/worker.local.env .env.local .env.worker.local -- env $(GO_ENV) go run ./cmd/worker

web-build:
	@mkdir -p .dev/web
	@node apps/web/src/main.ts > .dev/web/index.html
	@echo "$(GREEN)Wrote .dev/web/index.html$(RESET)"

h5-build:
	@mkdir -p .dev/h5
	@node apps/h5/src/main.ts > .dev/h5/index.html
	@echo "$(GREEN)Wrote .dev/h5/index.html$(RESET)"

create-repo-help:
	@node tools/create-repo/src/main.ts --help
