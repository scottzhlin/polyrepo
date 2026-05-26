#!/usr/bin/env node

import { copyFile, mkdir, readdir, readFile, stat, writeFile } from "node:fs/promises";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

export type CreateRepoOptions = {
  name: string;
  modulePath: string;
  targetDir: string;
  description?: string;
};

export type CreateRepositoryOptions = CreateRepoOptions & {
  templateDir: string;
  initGit?: boolean;
};

export type CreateRepositoryResult = {
  targetDir: string;
  filesCopied: number;
  gitInitialized: boolean;
};

const SKIP_DIRS = new Set([".git", ".dev", "node_modules", "dist", "build", ".output", ".worktrees", ".codex"]);
const TEXT_EXTENSIONS = new Set([
  ".cjs",
  ".css",
  ".env",
  ".go",
  ".html",
  ".json",
  ".md",
  ".mjs",
  ".sh",
  ".ts",
  ".tsx",
  ".txt",
  ".yaml",
  ".yml",
]);
const TEXT_FILENAMES = new Set([
  ".editorconfig",
  ".env.example",
  ".gitattributes",
  ".gitignore",
  ".node-version",
  ".npmrc",
  ".nvmrc",
  "Dockerfile",
  "go.mod",
  "go.sum",
  "LICENSE",
  "Makefile",
  "pnpm-workspace.yaml",
]);

export function normalizeRepoName(input: string): string {
  return input
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function buildReplacementPlan(options: CreateRepoOptions): Map<string, string> {
  const normalizedName = normalizeRepoName(options.name);
  return new Map([
    ["github.com/your-org/ai-coding-polyglot-monorepo-template", options.modulePath],
    ["AI Coding Polyglot Monorepo Template", toTitle(normalizedName)],
    ["ai-coding-polyglot-monorepo-template", normalizedName],
    ["@starter/", `@${normalizedName}/`],
    [
      "AI coding friendly polyglot monorepo template for Go and TypeScript teams",
      options.description || "AI coding friendly polyglot monorepo",
    ],
  ]);
}

export async function createRepositoryFromTemplate(options: CreateRepositoryOptions): Promise<CreateRepositoryResult> {
  const targetDir = resolve(options.targetDir);
  const templateDir = resolve(options.templateDir);
  const replacements = buildReplacementPlan(options);
  let filesCopied = 0;

  await assertTargetIsReady(targetDir);

  async function copyEntry(source: string): Promise<void> {
    const rel = relative(templateDir, source);
    if (!rel) {
      await mkdir(targetDir, { recursive: true });
    }

    const info = await stat(source);
    if (info.isDirectory()) {
      if (SKIP_DIRS.has(source.split("/").at(-1) || "")) {
        return;
      }
      await mkdir(join(targetDir, rel), { recursive: true });
      for (const entry of await readdir(source)) {
        await copyEntry(join(source, entry));
      }
      return;
    }

    const destination = join(targetDir, rel);
    await mkdir(dirname(destination), { recursive: true });
    if (isTextFile(source)) {
      let content = await readFile(source, "utf8");
      for (const [from, to] of replacements) {
        content = content.replaceAll(from, to);
      }
      await writeFile(destination, content);
    } else {
      await copyFile(source, destination);
    }
    filesCopied += 1;
  }

  await copyEntry(templateDir);

  let gitInitialized = false;
  if (options.initGit !== false) {
    const result = spawnSync("git", ["init", "-b", "main"], { cwd: targetDir, stdio: "inherit" });
    if (result.status !== 0) {
      throw new Error("git init failed");
    }
    gitInitialized = true;
  }

  return { targetDir, filesCopied, gitInitialized };
}

async function assertTargetIsReady(targetDir: string): Promise<void> {
  try {
    const entries = await readdir(targetDir);
    if (entries.length > 0) {
      throw new Error(`target directory is not empty: ${targetDir}`);
    }
  } catch (error) {
    if (!isNotFoundError(error)) {
      throw error;
    }
  }
}

function isNotFoundError(error: unknown): boolean {
  return typeof error === "object" && error !== null && "code" in error && error.code === "ENOENT";
}

function isTextFile(path: string): boolean {
  const filename = path.split("/").at(-1) || "";
  if (TEXT_FILENAMES.has(filename)) {
    return true;
  }
  const dotIndex = filename.lastIndexOf(".");
  const extension = dotIndex === -1 ? "" : filename.slice(dotIndex);
  return TEXT_EXTENSIONS.has(extension);
}

function toTitle(name: string): string {
  return name
    .split(/[-_\s]+/)
    .filter(Boolean)
    .map((part) => part[0]?.toUpperCase() + part.slice(1))
    .join(" ");
}

export function parseCreateRepoArgs(argv: string[]): CreateRepositoryOptions | "help" {
  if (argv.includes("--help") || argv.includes("-h")) {
    return "help";
  }

  const values = new Map<string, string>();
  const flags = new Set<string>();
  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index];
    if (!token.startsWith("--")) {
      continue;
    }
    const key = token.slice(2);
    if (key === "no-git") {
      flags.add(key);
      continue;
    }
    const value = argv[index + 1];
    if (!value || value.startsWith("--")) {
      throw new Error(`missing value for --${key}`);
    }
    values.set(key, value);
    index += 1;
  }

  const name = values.get("name");
  const modulePath = values.get("module");
  const targetDir = values.get("target");
  if (!name || !modulePath || !targetDir) {
    throw new Error("required: --name <repo-name> --module <go-module> --target <directory>");
  }

  return {
    templateDir: resolve(dirname(fileURLToPath(import.meta.url)), "../../.."),
    targetDir,
    name,
    modulePath,
    description: values.get("description"),
    initGit: !flags.has("no-git"),
  };
}

function printHelp(): void {
  console.log(`create-ai-coding-polyglot-repo

Create a product repository from this AI coding friendly polyglot monorepo template.

Usage:
  pnpm create:repo -- --name my-product --module github.com/acme/my-product --target ../my-product

Options:
  --name          New repository/package name, for example my-product
  --module        Go module path, for example github.com/acme/my-product
  --target        Target directory to create
  --description   README/package description
  --no-git        Copy files without running git init
  --help          Show this help
`);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  try {
    const options = parseCreateRepoArgs(process.argv.slice(2));
    if (options === "help") {
      printHelp();
    } else {
      const result = await createRepositoryFromTemplate(options);
      console.log(`Created ${result.targetDir}`);
      console.log(`Copied ${result.filesCopied} files`);
      console.log(result.gitInitialized ? "Initialized git repository" : "Skipped git init");
    }
  } catch (error) {
    console.error((error as Error).message);
    console.error("Run with --help for usage.");
    process.exitCode = 1;
  }
}
