#!/usr/bin/env python3
"""Validate repository-local Markdown links."""

from __future__ import annotations

import re
import sys
from pathlib import Path
from urllib.parse import unquote

ROOT = Path(__file__).resolve().parents[2]
SKIP_DIRS = {
    ".git",
    ".claude",
    ".codex",
    ".worktrees",
    "node_modules",
    "dist",
    "build",
    ".output",
    ".dev",
}
LINK_RE = re.compile(r"\[[^\]]+\]\(([^)]+)\)")
FENCED_CODE_RE = re.compile(r"```.*?```", re.DOTALL)
IGNORED_PREFIXES = ("http://", "https://", "mailto:", "#", "app://")


def strip_fenced_code(text: str) -> str:
    return FENCED_CODE_RE.sub("", text)


def iter_markdown_files() -> list[Path]:
    files: list[Path] = []
    for path in ROOT.rglob("*.md"):
        if any(part in SKIP_DIRS for part in path.relative_to(ROOT).parts):
            continue
        files.append(path)
    return sorted(files)


def target_exists(source: Path, raw_link: str) -> bool:
    if raw_link.startswith(IGNORED_PREFIXES):
        return True

    target = raw_link.split("#", 1)[0].strip()
    if not target:
        return True

    target = unquote(target)
    candidate = (source.parent / target).resolve()

    try:
        candidate.relative_to(ROOT)
    except ValueError:
        return False

    return candidate.exists()


def main() -> int:
    broken: list[tuple[Path, str]] = []
    for md_file in iter_markdown_files():
        text = strip_fenced_code(md_file.read_text(encoding="utf-8"))
        for match in LINK_RE.finditer(text):
            link = match.group(1).strip()
            if not target_exists(md_file, link):
                broken.append((md_file.relative_to(ROOT), link))

    if broken:
        print("Markdown relative link check failed:")
        for md_file, link in broken:
            print(f"  {md_file} -> {link}")
        return 1

    print("Markdown relative links are valid")
    return 0


if __name__ == "__main__":
    sys.exit(main())
