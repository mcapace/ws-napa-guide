#!/usr/bin/env python3
"""Audit all region MDX image paths against public/images and Drive deliverables."""

from __future__ import annotations

import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
MDX_DIR = ROOT / "src/content/regions"
IMAGES = ROOT / "public/images"
REGIONS = [
    "oakville",
    "yountville",
    "rutherford",
    "st-helena",
    "calistoga",
    "downtown-napa",
    "pritchard-hill",
]


def path_exists(url: str) -> bool:
    if not url.startswith("/images/"):
        return False
    return (IMAGES / url.replace("/images/", "")).is_file()


def audit_region(slug: str) -> dict:
    mdx = MDX_DIR / f"{slug}.mdx"
    if not mdx.is_file():
        return {"slug": slug, "error": "no mdx"}

    text = mdx.read_text(encoding="utf-8")
    missing: list[str] = []
    test_hero = False

    hero = re.search(r"^heroImage:\s*(.+)$", text, re.M)
    if hero:
        h = hero.group(1).strip()
        if "/test-images/" in h:
            test_hero = True
        elif not path_exists(h):
            missing.append(f"hero: {h}")

    for m in re.finditer(r"\*\*Image:\*\*\s*(/images/[^\s]+)", text):
        if not path_exists(m.group(1)):
            missing.append(m.group(1))

    for m in re.finditer(r"\*\*ImagePortrait:\*\*\s*(/images/[^\s]+)", text):
        if not path_exists(m.group(1)):
            missing.append(f"portrait: {m.group(1)}")

    region_dir = IMAGES / slug
    landscapes = (
        len(list(region_dir.rglob("*-landscape.jpg"))) if region_dir.is_dir() else 0
    )

    featured_no_image: list[str] = []
    for block in re.split(r"(?=^### )", text, flags=re.M):
        if not block.startswith("### "):
            continue
        if "**Image:**" in block:
            continue
        title = block.split("\n", 1)[0].replace("### ", "").strip()
        if title and any(
            kw in block.lower() for kw in ("winery", "restaurant", "hotel", "bakery", "gelato", "café", "cafe")
        ):
            featured_no_image.append(title)

    return {
        "slug": slug,
        "test_hero": test_hero,
        "missing": missing,
        "landscapes": landscapes,
        "featured_no_image": featured_no_image,
    }


def main() -> None:
    failed = False
    print("Region image audit\n" + "=" * 48)
    for slug in REGIONS:
        r = audit_region(slug)
        if r.get("error"):
            print(f"\n{slug}: {r['error']}")
            failed = True
            continue

        status = "OK"
        if r["test_hero"] or r["missing"]:
            status = "ISSUES"
            failed = True

        print(f"\n{slug} [{status}]")
        print(f"  landscape files: {r['landscapes']}")
        if r["test_hero"]:
            print("  ✗ hero uses test/stock image")
        if r["missing"]:
            print("  ✗ missing files:")
            for m in r["missing"]:
                print(f"      {m}")
        if r["featured_no_image"]:
            print("  · featured list-only (no photo in MDX):")
            for name in r["featured_no_image"][:8]:
                print(f"      {name}")

    print("\n" + "=" * 48)
    if failed:
        sys.exit(1)
    print("All region image paths resolve.")


if __name__ == "__main__":
    main()
