#!/usr/bin/env python3
"""Audit St. Helena featured MDX picks against Drive Properties deliverables."""

from __future__ import annotations

import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
MDX = ROOT / "src/content/regions/st-helena.mdx"

# Official Drive stem -> display name (for report)
STEM_TO_NAME: dict[str, str] = {
    "StHelena_AdVivum": "Ad Vivum",
    "StHelena_Clif": "Clif Family",
    "StHelena_Ehlers": "Ehlers Estate",
    "StHelena_Faust": "Faust Haus",
    "StHelena_Lewelling": "Lewelling Vineyards",
    "StHelena_Snowden": "Snowden",
    "StHelena_Spottswoode": "Spottswoode Estate Vineyard & Winery",
    "StHelena_Studio": "Studio 1299A",
    "StHelena_Whitehall": "Whitehall Lane Winery",
    "StHelena_Charlies": "Charlie's Napa Valley",
    "StHelena_Cook": "Cook",
    "Understudy": "Under-Study",
    "StHelena_ModelBakery": "The Model Bakery",
    "StHelena_Gelato": "Roman Holiday Gelato",
    "StHelena_Erosion": "Erosion Creamery & Café",
    "erosion_1600": "Erosion Creamery & Café",
    "StHelena_HarvestInn": "Harvest Inn",
    "StHelena_Alila": "Alila Napa Valley",
    "StHelena_Wydown": "Wydown Hotel",
    "SalvestrinInn_1200": "The Inn at Salvestrin",
}

# MDX ### heading -> preferred Drive stem(s)
MDX_TO_STEMS: dict[str, list[str]] = {
    "Ad Vivum": ["StHelena_AdVivum"],
    "Clif Family": ["StHelena_Clif"],
    "Ehlers Estate": ["StHelena_Ehlers"],
    "Faust Haus": ["StHelena_Faust"],
    "Lewelling Vineyards": ["StHelena_Lewelling"],
    "Snowden": ["StHelena_Snowden"],
    "Spottswoode Estate Vineyard & Winery": ["StHelena_Spottswoode"],
    "Studio 1299A": ["StHelena_Studio"],
    "Whitehall Lane Winery": ["StHelena_Whitehall"],
    "Charlie's Napa Valley": ["StHelena_Charlies"],
    "Cook": ["StHelena_Cook"],
    "Under-Study": ["Understudy"],
    "The Model Bakery": ["StHelena_ModelBakery"],
    "Roman Holiday Gelato": ["StHelena_Gelato"],
    "Erosion Creamery & Café": ["StHelena_Erosion", "erosion_1600", "erosion_900"],
    "Harvest Inn": ["StHelena_HarvestInn"],
    "Wydown Hotel": ["StHelena_Wydown"],
    "Alila Napa Valley": ["StHelena_Alila"],
    "The Inn at Salvestrin": ["SalvestrinInn_1200", "StHelena_SalvestrinInn"],
}


def find_drive_dir() -> Path:
    candidates = [
        ROOT / ".tmp-st-helena-properties-drive",
        ROOT / ".tmp-st-helena-properties",
        ROOT / ".tmp-drive-sync/04_St_Helena/Properties_(featured_wineries_restaurants_hotels)",
        ROOT / ".tmp-salvestrin-inn",
    ]
    for path in candidates:
        if path.is_dir() and any(path.glob("StHelena_*.jpg")):
            return path
    return candidates[1]


def drive_stems(drive: Path) -> dict[str, Path]:
    found: dict[str, Path] = {}
    for p in drive.iterdir():
        if p.suffix.lower() not in {".jpg", ".jpeg"}:
            continue
        found[p.stem] = p
    return found


def parse_mdx_headings(text: str) -> list[str]:
    headings: list[str] = []
    for line in text.splitlines():
        if line.startswith("### "):
            headings.append(line[4:].strip())
        elif line.startswith("## ") and not line.startswith("## Featured"):
            pass
    return headings


def main() -> None:
    drive = find_drive_dir()
    if not drive.is_dir():
        raise SystemExit(f"No Drive properties folder found under {ROOT}")

    stems = drive_stems(drive)
    mdx_text = MDX.read_text(encoding="utf-8")
    headings = parse_mdx_headings(mdx_text)

    print(f"Drive folder: {drive}")
    print(f"Deliverable JPGs: {len(stems)}\n")

    has_photo: list[str] = []
    missing_photo: list[str] = []

    for heading in headings:
        if heading not in MDX_TO_STEMS:
            continue
        options = MDX_TO_STEMS[heading]
        match = next((s for s in options if s in stems), None)
        if match:
            has_photo.append(f"  ✓ {heading} ← {match}.jpg")
        else:
            missing_photo.append(f"  ✗ {heading} (expected: {', '.join(options)})")

    if has_photo:
        print("Featured with Drive photo:")
        print("\n".join(has_photo))
    if missing_photo:
        print("\nNo Drive deliverable — list only (remove featured block):")
        print("\n".join(missing_photo))

    unused = sorted(
        s for s in stems if s.startswith("StHelena_") or s in {"Understudy", "SalvestrinInn_1200", "erosion_1600"}
    )
    mapped = {s for opts in MDX_TO_STEMS.values() for s in opts}
    extra = [s for s in unused if s not in mapped]
    if extra:
        print("\nDrive files not mapped to current featured picks:")
        for s in extra:
            print(f"  ? {s}.jpg")

    if missing_photo:
        sys.exit(1)


if __name__ == "__main__":
    main()
