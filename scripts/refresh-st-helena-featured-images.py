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
DRIVE = ROOT / ".tmp-salvestrin-inn"
ORIGINALS = DRIVE / "Originals"
ITINERARY = ROOT / ".tmp-st-helena-import" / "04_St_Helena" / "Itineraries"

MIN_MASTER_WIDTH = 1400

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

# When deliverable crops are missing or too small, use high-res originals / itinerary stills.
ST_HELENA_UNDERSTUDY_SOURCES: list[Path] = [
    ITINERARY / "Understudy_1200.jpg",
    ORIGINALS / "EHC02073.jpg",
    ORIGINALS / "PhotoEmmaKMorris-03455.jpg",
    ORIGINALS / "PhotoEmmaKMorris-07701-2.jpg",
]

ST_HELENA_FALLBACK: dict[str, tuple[str, str, Path]] = {
    "StHelena_Erosion": (
        "breakfast",
        "st-helena-breakfast-erosion-creamery-cafe",
        ORIGINALS / "Scooping Mint Stracciatella.jpeg",
    ),
    "SalvestrinInn_1200": (
        "hotels",
        "st-helena-hotel-inn-at-salvestrin",
        ORIGINALS / "Aerial Property copy.jpg",
    ),
}


def master_width(path: Path) -> int:
    with Image.open(path) as im:
        return im.size[0]


def pick_source(stem: str) -> Path | None:
    candidates: list[Path] = []

    deliverable = DRIVE / f"{stem}.jpg"
    if deliverable.is_file():
        candidates.append(deliverable)

    fallback = ST_HELENA_FALLBACK.get(stem)
    if fallback:
        candidates.append(fallback[2])

    if stem == "Understudy":
        candidates.extend(ST_HELENA_UNDERSTUDY_SOURCES)

    if ORIGINALS.is_dir():
        for p in ORIGINALS.iterdir():
            if p.suffix.lower() in {".jpg", ".jpeg"} and stem.lower().replace("_", "") in p.stem.lower().replace(
                " ", ""
            ):
                candidates.append(p)

    existing = [p for p in candidates if p.is_file()]
    if not existing:
        return None

    viable = [p for p in existing if master_width(p) >= MIN_MASTER_WIDTH]
    pool = viable if viable else existing
    return max(pool, key=master_width)


def main() -> None:
    if not DRIVE.is_dir():
        raise SystemExit(
            f"Drive folder missing: {DRIVE}\n"
            "Download Properties_(featured_wineries_restaurants_hotels) first."
        )

    updated = 0
    missing: list[str] = []

    for stem, (section, slug) in ST_HELENA_FEATURED.items():
        src = pick_source(stem)
        if not src:
            missing.append(stem)
            continue

        dest_dir = IMAGES / section
        landscape = dest_dir / f"{slug}-landscape.jpg"
        portrait = dest_dir / f"{slug}-portrait.jpg"
        copy_featured_pair(src, landscape, portrait, top_bias=0.0)
        print(f"  {section}/{slug} ({src.name}, {master_width(src)}px wide)")
        updated += 1

    print(f"\nUpdated {updated} featured pairs.")
    if missing:
        print("No usable source (skipped):")
        for stem in missing:
            print(f"  - {stem}")


if __name__ == "__main__":
    main()
