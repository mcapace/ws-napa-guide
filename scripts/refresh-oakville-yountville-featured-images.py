#!/usr/bin/env python3
"""Refresh Oakville + Yountville featured property stills from Drive Properties folders."""

from __future__ import annotations

import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "scripts"))

from featured_image_portrait import copy_featured_pair  # noqa: E402

DRIVE_ROOT = ROOT / ".tmp-drive-import-oy"

# Deliverable Drive stems (Properties folder, not Originals)
OAKVILLE_DELIVERABLE: dict[str, tuple[str, str]] = {
    "Oakville_Cardinale": ("wineries", "oakville-winery-cardinale"),
    "Oakville_FarNiente": ("wineries", "oakville-winery-far-niente"),
    "Oakville_Nickel": ("wineries", "oakville-winery-nickel-and-nickel"),
    "Oakville_Rudd": ("wineries", "oakville-winery-rudd-estate"),
    "Oakville_Brix": ("restaurants", "oakville-restaurant-brix"),
    "Oakville_Mustards": ("restaurants", "oakville-restaurant-mustards-grill"),
    "Oakville_OakvilleGrocery": ("restaurants", "oakville-restaurant-oakville-grocery"),
}

YOUNTVILLE_DELIVERABLE: dict[str, tuple[str, str]] = {
    "Yountville_Stewart": ("wineries", "yountville-winery-stewart-cellars"),
    "Yountville_ClosduVal": ("wineries", "yountville-winery-clos-du-val"),
    "Yountville_Lewis": ("wineries", "yountville-winery-lewis-cellars"),
    "Yountville_Hendry": ("wineries", "yountville-winery-hendry"),
    "Yountville_Trefethen": ("wineries", "yountville-winery-trefethen"),
    "Yountville_AdHoc": ("restaurants", "yountville-restaurant-ad-hoc"),
    "Yountville_Clementine": ("restaurants", "yountville-restaurant-clementine"),
    "Yountville_HonorMarket": ("restaurants", "yountville-restaurant-honor-market"),
    "Yountville_Bardessono": ("hotels", "yountville-hotel-bardessono"),
    "Yountville_Sttupa": ("hotels", "yountville-hotel-sttupa-estate"),
    "Yountville_Kollar": ("breakfast", "yountville-breakfast-kollar-chocolates"),
    "Yountville_ArtWalk": ("sidebar", "yountville-sidebar-art-walk"),
}

# High-res originals when deliverable crops are missing or outdated
OAKVILLE_ORIGINALS: dict[str, tuple[str, str]] = {
    "Brix-DSC_0009-Edit": ("restaurants", "oakville-restaurant-brix"),
    "FarNiente_Gazebo": ("wineries", "oakville-winery-far-niente"),
    "NickelNickel_Property_2": ("wineries", "oakville-winery-nickel-and-nickel"),
    "Oakville_Grocery_Interiors_021": ("restaurants", "oakville-restaurant-oakville-grocery"),
    "_DSC1315": ("wineries", "oakville-winery-cardinale"),
}

YOUNTVILLE_ORIGINALS: dict[str, tuple[str, str]] = {
    "AdHocBeef_(c)DeborahJones": ("restaurants", "yountville-restaurant-ad-hoc"),
    "CDV-June2023-384 (1)": ("wineries", "yountville-winery-clos-du-val"),
    "LC_2025_04_DinnerService_Shot2_1548_rgb": ("wineries", "yountville-winery-lewis-cellars"),
    "TCHO_KOLLAR-102": ("breakfast", "yountville-breakfast-kollar-chocolates"),
    "2H9A9277": ("restaurants", "yountville-restaurant-clementine"),
}


def import_deliverables(region: str, mapping: dict[str, tuple[str, str]], props_dir: Path) -> int:
    images = ROOT / "public" / "images" / region
    updated = 0
    for stem, (section, slug) in mapping.items():
        src = props_dir / f"{stem}.jpg"
        if not src.is_file():
            continue
        landscape = images / section / f"{slug}-landscape.jpg"
        portrait = images / section / f"{slug}-portrait.jpg"
        copy_featured_pair(src, landscape, portrait, top_bias=0.0)
        print(f"  {region}/{section}/{slug}")
        updated += 1
    return updated


def import_originals(
    region: str,
    mapping: dict[str, tuple[str, str]],
    originals_dir: Path,
) -> int:
    images = ROOT / "public" / "images" / region
    updated = 0
    for stem, (section, slug) in mapping.items():
        matches = list(originals_dir.glob(f"{stem}.*"))
        src = next((p for p in matches if p.suffix.lower() in {".jpg", ".jpeg"}), None)
        if not src:
            continue
        landscape = images / section / f"{slug}-landscape.jpg"
        portrait = images / section / f"{slug}-portrait.jpg"
        copy_featured_pair(src, landscape, portrait, top_bias=0.0)
        print(f"  {region}/{section}/{slug} (original: {src.name})")
        updated += 1
    return updated


def main() -> None:
    if not DRIVE_ROOT.is_dir():
        raise SystemExit(
            f"Drive extract missing: {DRIVE_ROOT}\n"
            "Unzip 01_Oakville and 02_Yountville from the Drive export first."
        )

    oak_props = DRIVE_ROOT / "01_Oakville" / "Properties_(featured_wineries_restaurants_hotels)"
    yt_props = DRIVE_ROOT / "02_Yountville" / "Properties_(featured_wineries_restaurants_hotels)"

    print("Oakville deliverables...")
    o1 = import_deliverables("oakville", OAKVILLE_DELIVERABLE, oak_props)
    print("Yountville deliverables...")
    y1 = import_deliverables("yountville", YOUNTVILLE_DELIVERABLE, yt_props)

    print("Oakville originals...")
    o2 = import_originals("oakville", OAKVILLE_ORIGINALS, oak_props / "Originals")
    print("Yountville originals...")
    y2 = import_originals(
        "yountville",
        YOUNTVILLE_ORIGINALS,
        yt_props / "originals",
    )

    print(
        f"\nUpdated oakville: {o1 + o2} pairs, yountville: {y1 + y2} pairs "
        f"(master list picks up featured MDX thumbnails automatically)."
    )


if __name__ == "__main__":
    main()
