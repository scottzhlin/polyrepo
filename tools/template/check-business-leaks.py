#!/usr/bin/env python3
"""Scan the starter for terms that would indicate source business leakage."""

from __future__ import annotations

import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
SKIP_DIRS = {
    ".git",
    ".dev",
    ".claude/worktrees",
    ".codex",
    ".worktrees",
    "node_modules",
}
SKIP_SUFFIXES = {
    ".png",
    ".jpg",
    ".jpeg",
    ".gif",
    ".webp",
    ".ico",
    ".pdf",
    ".zip",
}
TERM_CODES = (
    (83, 116, 121, 108, 101, 67, 105, 114, 99, 108, 101),
    (115, 116, 121, 108, 101, 99, 105, 114, 99, 108, 101),
    (27801, 27827),
    (26381, 35013),
    (87, 101, 67, 104, 97, 116, 32, 80, 97, 121),
    (84, 101, 110, 99, 101, 110, 116, 32, 67, 79, 83),
)
BANNED_TERMS = tuple("".join(chr(code) for code in codes) for codes in TERM_CODES)
DISALLOWED_CODE_SUFFIXES = {".cjs", ".js", ".jsx", ".mjs"}


def should_skip(path: Path) -> bool:
    rel = path.relative_to(ROOT)
    rel_text = rel.as_posix()
    if rel_text == "tools/template/check-business-leaks.py":
        return True
    if any(rel_text == skip or rel_text.startswith(f"{skip}/") for skip in SKIP_DIRS):
        return True
    return path.suffix.lower() in SKIP_SUFFIXES


def main() -> int:
    findings: list[str] = []
    for path in ROOT.rglob("*"):
        if not path.is_file() or should_skip(path):
            continue
        if path.suffix.lower() in DISALLOWED_CODE_SUFFIXES:
            findings.append(f"{path.relative_to(ROOT)} uses a non-TypeScript script extension; use .ts instead")
            continue
        try:
            text = path.read_text(encoding="utf-8")
        except UnicodeDecodeError:
            continue
        for term in BANNED_TERMS:
            if term in text:
                findings.append(f"{path.relative_to(ROOT)} contains {term!r}")

    if findings:
        print("Template business-leak scan failed:")
        for finding in findings:
            print(f"  {finding}")
        return 1

    print("Template business-leak scan passed")
    return 0


if __name__ == "__main__":
    sys.exit(main())
