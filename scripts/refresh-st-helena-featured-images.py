#!/usr/bin/env python3
"""Refresh St. Helena featured property stills from Drive Properties folder."""

from __future__ import annotations

import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "scripts"))

from featured_image_portrait import copy_featured_pair  # noqa: E402

IMAGES = ROOT / "public" / "images" / "st-helena"
DRIVE = ROOT / ".tmp-salvestrin-inn"

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
    "StHelena_HarvestInn": ("hotels", "st-helena-hotel-harvest-inn"),
    "StHelena_Alila": ("hotels", "st-helena-hotel-alila-napa-valley"),
    "StHelena_Wydown": ("hotels", "st-helena-hotel-wydown-hotel"),
    "SalvestrinInn_1200": ("hotels", "st-helena-hotel-inn-at-salvestrin"),
}


def main() -> None:
    if not DRIVE.is_dir():
        raise SystemExit(
            f"Drive folder missing: {DRIVE}\n"
            "Download Properties_(featured_wineries_restaurants_hotels) first."
        )

    updated = 0
    missing: list[str] = []

    for stem, (section, slug) in ST_HELENA_FEATURED.items():
        src = DRIVE / f"{stem}.jpg"
        if not src.is_file():
            missing.append(stem)
            continue

        dest_dir = IMAGES / section
        landscape = dest_dir / f"{slug}-landscape.jpg"
        portrait = dest_dir / f"{slug}-portrait.jpg"
        copy_featured_pair(src, landscape, portrait, top_bias=0.0)
        print(f"  {section}/{slug}")
        updated += 1

    print(f"\nUpdated {updated} featured pairs.")
    if missing:
        print("Missing from Drive (skipped):")
        for stem in missing:
            print(f"  - {stem}")

    print(
        "\nNote: Erosion Creamery has no Drive still yet — remove placeholder in MDX until "
        "StHelena_Erosion is added to the Properties folder."
    )


if __name__ == "__main__":
    main()
