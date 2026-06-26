#!/usr/bin/env python3
"""Refresh Oakville + Yountville featured property stills from Drive Properties folders."""

from __future__ import annotations

import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "scripts"))

from featured_image_portrait import copy_featured_pair  # noqa: E402

DRIVE_ROOTS = [
    ROOT / ".tmp-drive-sync",
    ROOT / ".tmp-drive-import-oy",
    ROOT / ".tmp-drive-import",
]


def resolve_drive_root() -> Path:
    for path in DRIVE_ROOTS:
        if path.is_dir() and (path / "01_Oakville").is_dir():
            return path
    raise SystemExit(
        "Drive extract missing. Sync 01_Oakville into .tmp-drive-sync first."
    )

OAKVILLE_WIDE_DIR = ROOT / ".tmp-oakville-wide"
OAKVILLE_WIDE_DRIVE_URL = (
    "https://drive.google.com/drive/folders/1pc9nmd20OF6QiOn_ObylYNZLTZGv65lT"
)

# Ultra-wide showcase masters (2.5:1) — preferred over 16×9 when folder is present
OAKVILLE_WIDE: dict[str, tuple[str, str]] = {
    "cardinale.jpg": ("wineries", "oakville-winery-cardinale"),
    "FarNiente.jpg": ("wineries", "oakville-winery-far-niente"),
    "NickelNickel.jpg": ("wineries", "oakville-winery-nickel-and-nickel"),
    "Rudd.jpg": ("wineries", "oakville-winery-rudd-estate"),
    "Brix.jpg": ("restaurants", "oakville-restaurant-brix"),
    "mustardsB.jpg": ("restaurants", "oakville-restaurant-mustards-grill"),
    "oakvillegrocery.jpg": ("restaurants", "oakville-restaurant-oakville-grocery"),
}

# Portrait crop source when landscape file differs (slug -> wide folder filename)
OAKVILLE_WIDE_PORTRAIT_SRC: dict[str, tuple[str, float | None, float]] = {
    "oakville-restaurant-mustards-grill": ("mustards.jpg", 0.36, 0.0),
}

OAKVILLE_16X9_DIR = ROOT / ".tmp-oakville-16x9"
OAKVILLE_16X9_DRIVE_URL = (
    "https://drive.google.com/drive/folders/1rvgzk5npAUUHSUpnAmbcL3n-2qe_Zq1U"
)

# Canonical 16×9 featured stills (oakville 16x9 Drive folder)
OAKVILLE_16X9: dict[str, tuple[str, str]] = {
    "cardinale.jpg": ("wineries", "oakville-winery-cardinale"),
    "FarNiente.jpg": ("wineries", "oakville-winery-far-niente"),
    "NickelNickel.jpg": ("wineries", "oakville-winery-nickel-and-nickel"),
    "Rudd.jpg": ("wineries", "oakville-winery-rudd-estate"),
    "Brix.jpg": ("restaurants", "oakville-restaurant-brix"),
    "mustards.jpg": ("restaurants", "oakville-restaurant-mustards-grill"),
    "Oakville_Grocery.jpg": ("restaurants", "oakville-restaurant-oakville-grocery"),
}
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
    "_DSC1315": ("wineries", "oakville-winery-cardinale"),
    "FarNiente_Gazebo": ("wineries", "oakville-winery-far-niente"),
    "NickelNickel_Property_2": ("wineries", "oakville-winery-nickel-and-nickel"),
    "Brix-DSC_0009-Edit": ("restaurants", "oakville-restaurant-brix"),
    "2024 wine spectator tasting rooms  4": (
        "restaurants",
        "oakville-restaurant-mustards-grill",
    ),
    "Oakville_Grocery_Interiors_021": ("restaurants", "oakville-restaurant-oakville-grocery"),
}

YOUNTVILLE_ORIGINALS: dict[str, tuple[str, str]] = {
    "AdHocBeef_(c)DeborahJones": ("restaurants", "yountville-restaurant-ad-hoc"),
    "CDV-June2023-384 (1)": ("wineries", "yountville-winery-clos-du-val"),
    "LC_2025_04_DinnerService_Shot2_1548_rgb": ("wineries", "yountville-winery-lewis-cellars"),
    "TCHO_KOLLAR-102": ("breakfast", "yountville-breakfast-kollar-chocolates"),
    "2H9A9277": ("restaurants", "yountville-restaurant-clementine"),
}


def import_oakville_wide(folder: Path) -> int:
    images = ROOT / "public" / "images" / "oakville"
    updated = 0
    for filename, (section, slug) in OAKVILLE_WIDE.items():
        src = folder / filename
        if not src.is_file():
            continue
        landscape = images / section / f"{slug}-landscape.jpg"
        portrait = images / section / f"{slug}-portrait.jpg"
        copy_featured_pair(src, landscape, portrait, top_bias=0.0)

        portrait_opts = OAKVILLE_WIDE_PORTRAIT_SRC.get(slug)
        if portrait_opts:
            portrait_file, left_bias, top_bias = portrait_opts
            portrait_src = folder / portrait_file
            if portrait_src.is_file():
                from featured_image_portrait import portrait_crop  # noqa: WPS433

                portrait_crop(
                    portrait_src,
                    portrait,
                    top_bias=top_bias,
                    left_bias=left_bias,
                )

        print(f"  oakville/{section}/{slug} (ultra-wide: {filename})")
        updated += 1
    return updated


def import_oakville_16x9(folder: Path) -> int:
    images = ROOT / "public" / "images" / "oakville"
    updated = 0
    for filename, (section, slug) in OAKVILLE_16X9.items():
        src = folder / filename
        if not src.is_file():
            continue
        landscape = images / section / f"{slug}-landscape.jpg"
        portrait = images / section / f"{slug}-portrait.jpg"
        copy_featured_pair(src, landscape, portrait, top_bias=0.0)
        print(f"  oakville/{section}/{slug} (16×9: {filename})")
        updated += 1
    return updated


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
    drive_root = resolve_drive_root()
    print(f"Using Drive root: {drive_root}")

    oak_props = drive_root / "01_Oakville" / "Properties_(featured_wineries_restaurants_hotels)"
    yt_props = drive_root / "02_Yountville" / "Properties_(featured_wineries_restaurants_hotels)"

    o0 = 0
    o1 = 0
    o2 = 0

    if OAKVILLE_WIDE_DIR.is_dir():
        print(f"Oakville ultra-wide featured ({OAKVILLE_WIDE_DRIVE_URL})...")
        o0 = import_oakville_wide(OAKVILLE_WIDE_DIR)
    elif OAKVILLE_16X9_DIR.is_dir():
        print(f"Oakville 16×9 featured ({OAKVILLE_16X9_DRIVE_URL})...")
        o0 = import_oakville_16x9(OAKVILLE_16X9_DIR)
    else:
        print("Oakville deliverables...")
        o1 = import_deliverables("oakville", OAKVILLE_DELIVERABLE, oak_props)
        print("Oakville originals...")
        o2 = import_originals("oakville", OAKVILLE_ORIGINALS, oak_props / "Originals")
        print(
            f"Tip: download canonical 16×9 stills with "
            f"python3 -m gdown --folder {OAKVILLE_16X9_DRIVE_URL} "
            f"-O {OAKVILLE_16X9_DIR.name}"
        )

    print("Yountville deliverables...")
    y1 = import_deliverables("yountville", YOUNTVILLE_DELIVERABLE, yt_props)
    print("Yountville originals...")
    y2 = import_originals(
        "yountville",
        YOUNTVILLE_ORIGINALS,
        yt_props / "originals",
    )

    print(
        f"\nUpdated oakville: {o0 + o1 + o2} pairs, yountville: {y1 + y2} pairs "
        f"(master list picks up featured MDX thumbnails automatically)."
    )


if __name__ == "__main__":
    main()
