#!/usr/bin/env python3
"""Refresh St. Helena featured property stills from Drive Properties folder."""

from __future__ import annotations

import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "scripts"))

from featured_image_portrait import copy_featured_pair  # noqa: E402
from PIL import Image  # noqa: E402

IMAGES = ROOT / "public" / "images" / "st-helena"

# Drive filename stem -> (section folder, deliverable slug)
ST_HELENA_FEATURED: dict[str, tuple[str, str]] = {
    "StHelena_AdVivum": ("wineries", "st-helena-winery-ad-vivum"),
    "StHelena_Clif": ("wineries", "st-helena-winery-clif-family"),
    "StHelena_Ehlers": ("wineries", "st-helena-winery-ehlers-estate"),
    "StHelena_Faust": ("wineries", "st-helena-winery-faust-haus"),
    "StHelena_Lewelling": ("wineries", "st-helena-winery-lewelling-vineyards"),
    "StHelena_Snowden": ("wineries", "st-helena-winery-snowden"),
    "StHelena_Spottswoode": ("wineries", "st-helena-winery-spottswoode"),
    "StHelena_Studio": ("wineries", "st-helena-winery-studio-1299a"),
    "StHelena_Whitehall": ("wineries", "st-helena-winery-whitehall-lane"),
    "StHelena_Charlies": ("restaurants", "st-helena-restaurant-charlies-napa-valley"),
    "StHelena_Cook": ("restaurants", "st-helena-restaurant-cook"),
    "Understudy": ("restaurants", "st-helena-restaurant-under-study"),
    "StHelena_ModelBakery": ("breakfast", "st-helena-breakfast-model-bakery"),
    "StHelena_Gelato": ("breakfast", "st-helena-breakfast-roman-holiday-gelato"),
    "StHelena_Erosion": ("breakfast", "st-helena-breakfast-erosion-creamery-cafe"),
    "StHelena_HarvestInn": ("hotels", "st-helena-hotel-harvest-inn"),
    "StHelena_Alila": ("hotels", "st-helena-hotel-alila-napa-valley"),
    "StHelena_Wydown": ("hotels", "st-helena-hotel-wydown-hotel"),
    "SalvestrinInn_1200": ("hotels", "st-helena-hotel-inn-at-salvestrin"),
}

# Alternate Drive filenames for the same deliverable
STEM_ALIASES: dict[str, list[str]] = {
    "StHelena_Erosion": ["erosion_1600", "erosion_900", "StHelena_Erosion"],
    "Understudy": ["Understudy", "UnderStudy"],
    "SalvestrinInn_1200": ["SalvestrinInn_1200", "StHelena_SalvestrinInn"],
}

MIN_MASTER_WIDTH = 800


def find_drive_dir() -> Path:
    candidates = [
        ROOT / ".tmp-drive-sync/04_St_Helena/Properties_(featured_wineries_restaurants_hotels)",
        ROOT / ".tmp-st-helena-properties",
        ROOT / ".tmp-salvestrin-inn",
    ]
    for path in candidates:
        if path.is_dir() and any(path.glob("StHelena_*.jpg")):
            return path
    return candidates[1]


def master_width(path: Path) -> int:
    with Image.open(path) as im:
        return im.size[0]


def pick_source(stem: str, drive: Path) -> Path | None:
    names = STEM_ALIASES.get(stem, [stem])
    for name in names:
        src = drive / f"{name}.jpg"
        if src.is_file() and master_width(src) >= MIN_MASTER_WIDTH:
            return src
    return None


def main() -> None:
    drive = find_drive_dir()
    if not drive.is_dir():
        raise SystemExit(
            f"Drive folder missing: {drive}\n"
            "Download 04_St_Helena/Properties_(featured_wineries_restaurants_hotels) from Drive."
        )

    updated = 0
    missing: list[str] = []

    for stem, (section, slug) in ST_HELENA_FEATURED.items():
        src = pick_source(stem, drive)
        if not src:
            missing.append(stem)
            continue

        dest_dir = IMAGES / section
        landscape = dest_dir / f"{slug}-landscape.jpg"
        portrait = dest_dir / f"{slug}-portrait.jpg"
        copy_featured_pair(src, landscape, portrait, top_bias=0.0)
        print(f"  {section}/{slug} ({src.name}, {master_width(src)}px wide)")
        updated += 1

    print(f"\nUpdated {updated} featured pairs from {drive}.")
    if missing:
        print("\nNo Drive deliverable (skip featured block; list only):")
        for stem in missing:
            print(f"  - {stem}")


if __name__ == "__main__":
    main()
