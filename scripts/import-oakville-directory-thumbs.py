#!/usr/bin/env python3
"""Import Oakville directory list thumbnails from Drive Properties folder.

Copies stills to `{base}-directory.jpg` without overwriting ultra-wide showcase
`-landscape.jpg` masters. Updates src/data/region-directory-images.json with keys
matching MDX directory table names.

Source (local cache or download):
  https://drive.google.com/drive/folders/1zJUJnzwGSL34NkE4nf4WuIJhZTSRfryk
"""

from __future__ import annotations

import importlib.util
import json
import shutil
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SCRIPTS = ROOT / "scripts"

_drive_spec = importlib.util.spec_from_file_location(
    "import_region_drive_images",
    SCRIPTS / "import-region-drive-images.py",
)
_drive_mod = importlib.util.module_from_spec(_drive_spec)
assert _drive_spec and _drive_spec.loader
_drive_spec.loader.exec_module(_drive_mod)

DIRECTORY_IMAGE_MANIFEST = _drive_mod.DIRECTORY_IMAGE_MANIFEST
IMAGES = _drive_mod.IMAGES
normalize_match_text = _drive_mod.normalize_match_text
slug_for_path = _drive_mod.slug_for_path

DRIVE_URL = (
    "https://drive.google.com/drive/folders/1zJUJnzwGSL34NkE4nf4WuIJhZTSRfryk"
)
REGION = "oakville"

PROPERTIES_CANDIDATES = [
    ROOT / ".tmp-drive-sync" / "01_Oakville" / "Properties_(featured_wineries_restaurants_hotels)",
    ROOT / ".tmp-drive-import" / "01_Oakville" / "Properties_(featured_wineries_restaurants_hotels)",
    ROOT / ".tmp-drive-import-oy" / "01_Oakville" / "Properties_(featured_wineries_restaurants_hotels)",
    ROOT / ".tmp-oakville-properties",
]

# Filename stem -> (section, property slug, exact MDX directory table name)
OAKVILLE_DIRECTORY_SOURCES: dict[str, tuple[str, str, str]] = {
    "groth": ("wineries", "groth-vineyards", "Groth Vineyards & Winery"),
    "mondavi": ("wineries", "robert-mondavi-winery", "Robert Mondavi Winery"),
    "opusone": ("wineries", "opus-one", "Opus One"),
    "PlumpJack": ("wineries", "plumpjack-estate", "PlumpJack Estate Winery"),
    "promontory": ("wineries", "promontory-wine", "Promontory Wine"),
    "turnbull": ("wineries", "turnbull-wine-cellars", "Turnbull Wine Cellars"),
    "Oakville_Cardinale": ("wineries", "cardinale", "Cardinale Winery"),
    "Oakville_FarNiente": ("wineries", "far-niente", "Far Niente Winery / Bella Union Winery"),
    "Oakville_Nickel": ("wineries", "nickel-and-nickel", "Nickel & Nickel"),
    "Oakville_Rudd": ("wineries", "rudd-estate", "Rudd Estate / Crossroads House"),
    "Oakville_Brix": ("restaurants", "brix", "Brix"),
    "Oakville_Mustards": ("restaurants", "mustards-grill", "Mustards Grill"),
    "Oakville_OakvilleGrocery": ("restaurants", "oakville-grocery", "Oakville Grocery"),
}


def resolve_properties_dir(download: bool) -> Path:
    for path in PROPERTIES_CANDIDATES:
        if path.is_dir() and any(path.glob("*.jpg")):
            return path

    dest = ROOT / ".tmp-oakville-properties"
    if download:
        dest.mkdir(parents=True, exist_ok=True)
        print(f"Downloading Properties folder to {dest} …")
        subprocess.run(
            ["python3", "-m", "gdown", "--folder", DRIVE_URL, "-O", str(dest)],
            check=True,
        )
        if dest.is_dir() and any(dest.glob("*.jpg")):
            return dest

    raise SystemExit(
        "Oakville Properties folder not found. Sync Drive or pass --download."
    )


def copy_directory_thumb(src: Path, section: str, prop_slug: str) -> str:
    dest_dir = IMAGES / REGION / section
    dest_dir.mkdir(parents=True, exist_ok=True)
    base = slug_for_path(REGION, section, prop_slug)
    dest = dest_dir / f"{base}-directory.jpg"
    shutil.copy2(src, dest)
    return f"/images/{REGION}/{section}/{base}-directory.jpg"


def main() -> None:
    download = "--download" in sys.argv
    props_dir = resolve_properties_dir(download=download)
    print(f"Using Properties folder: {props_dir}")

    manifest: dict[str, str] = {}
    if DIRECTORY_IMAGE_MANIFEST.exists():
        manifest = json.loads(DIRECTORY_IMAGE_MANIFEST.read_text())

    imported = 0
    for stem, (section, prop_slug, listing_name) in OAKVILLE_DIRECTORY_SOURCES.items():
        src = props_dir / f"{stem}.jpg"
        if not src.is_file():
            print(f"  skip (missing): {stem}.jpg")
            continue

        url = copy_directory_thumb(src, section, prop_slug)
        key = f"{REGION}|{normalize_match_text(listing_name)}"
        manifest[key] = url
        imported += 1
        print(f"  {listing_name} -> {url}")

    DIRECTORY_IMAGE_MANIFEST.write_text(json.dumps(manifest, indent=2) + "\n")
    print(f"\nImported {imported} directory thumbs; manifest has {len(manifest)} keys")


if __name__ == "__main__":
    main()
