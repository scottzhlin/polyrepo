import assert from "node:assert/strict";
import { mkdir, mkdtemp, readFile, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { test } from "node:test";

import { buildReplacementPlan, createRepositoryFromTemplate, normalizeRepoName, parseCreateRepoArgs } from "../src/main.ts";

test("normalizeRepoName creates searchable lowercase repository names", () => {
  assert.equal(normalizeRepoName(" My AI Coding Template! "), "my-ai-coding-template");
});

test("buildReplacementPlan includes repository, title, module, and description replacements", () => {
  const plan = buildReplacementPlan({
    name: "my-product",
    modulePath: "github.com/acme/my-product",
    targetDir: "../my-product",
    description: "My product monorepo",
  });

  assert.equal(plan.get("ai-coding-polyglot-monorepo-template"), "my-product");
  assert.equal(plan.get("AI Coding Polyglot Monorepo Template"), "My Product");
  assert.equal(plan.get("github.com/your-org/ai-coding-polyglot-monorepo-template"), "github.com/acme/my-product");
  assert.equal(plan.get("@starter/"), "@my-product/");
  assert.equal(plan.get("AI coding friendly polyglot monorepo template for Go and TypeScript teams"), "My product monorepo");
});

test("createRepositoryFromTemplate copies files, skips local artifacts, and rewrites starter identity", async () => {
  const root = await mkdtemp(join(tmpdir(), "starter-template-test-"));
  const templateDir = join(root, "template");
  const targetDir = join(root, "target");

  await mkdir(join(templateDir, ".dev"), { recursive: true });
  await writeFile(join(templateDir, "README.md"), "# AI Coding Polyglot Monorepo Template\nai-coding-polyglot-monorepo-template\n");
  await writeFile(join(templateDir, "go.mod"), "module github.com/your-org/ai-coding-polyglot-monorepo-template\n");
  await writeFile(join(templateDir, ".dev", "ignored.txt"), "ignore me");

  const result = await createRepositoryFromTemplate({
    templateDir,
    targetDir,
    name: "my-product",
    modulePath: "github.com/acme/my-product",
    description: "My product monorepo",
    initGit: false,
  });

  assert.equal(result.filesCopied, 2);
  assert.match(await readFile(join(targetDir, "README.md"), "utf8"), /# My Product/);
  assert.match(await readFile(join(targetDir, "go.mod"), "utf8"), /github.com\/acme\/my-product/);
});

test("parseCreateRepoArgs supports --no-git as a boolean flag", () => {
  const options = parseCreateRepoArgs([
    "--name",
    "my-product",
    "--module",
    "github.com/acme/my-product",
    "--target",
    "../my-product",
    "--no-git",
  ]);

  assert.notEqual(options, "help");
  if (options !== "help") {
    assert.equal(options.initGit, false);
  }
});
