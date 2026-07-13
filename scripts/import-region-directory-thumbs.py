#!/usr/bin/env python3
"""Import square directory list thumbnails from Drive Properties folders.

Copies stills to `{base}-directory.jpg` (separate from ultra-wide `-landscape.jpg`
showcase masters). Updates src/data/region-directory-images.json.

  python3 scripts/import-region-directory-thumbs.py
  python3 scripts/import-region-directory-thumbs.py --region yountville
  python3 scripts/import-region-directory-thumbs.py --skip-download
"""

from __future__ import annotations

import argparse
import importlib.util
import json
import re
import shutil
import sys
import time
from dataclasses import dataclass
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SCRIPTS = ROOT / "scripts"
MDX_DIR = ROOT / "src" / "content" / "regions"
MANIFEST = ROOT / "src" / "data" / "region-directory-images.json"

_drive_spec = importlib.util.spec_from_file_location(
    "import_region_drive_images",
    SCRIPTS / "import-region-drive-images.py",
)
_drive_mod = importlib.util.module_from_spec(_drive_spec)
assert _drive_spec and _drive_spec.loader
_drive_spec.loader.exec_module(_drive_mod)

PROPERTY_MAP = dict(_drive_mod.PROPERTY_MAP)
PROPERTY_MAP["pritchard-hill"] = {
    "Chappellet": ("wineries", "chappellet"),
    "Continuum": ("wineries", "continuum-estate"),
    "Continuumwide": ("wineries", "continuum-estate"),
    "DavidArthur": ("wineries", "david-arthur-vineyards"),
    "David_Arthur": ("wineries", "david-arthur-vineyards"),
    "David-Arthur": ("wineries", "david-arthur-vineyards"),
    "HowardBacken": ("wineries", "howard-backen-estate"),
    "howardbacken": ("wineries", "howard-backen-estate"),
}

ITINERARY_STEM_ALIASES = dict(_drive_mod.ITINERARY_STEM_ALIASES)
IMAGES = _drive_mod.IMAGES
normalize_match_text = _drive_mod.normalize_match_text
slug_for_path = _drive_mod.slug_for_path
SECTION_SINGULAR = _drive_mod.SECTION_SINGULAR

# Extra stem hints for Properties folder filenames
STEM_ALIASES: dict[str, str] = {
    **ITINERARY_STEM_ALIASES,
    "stagsleapwinecellars": "stags leap wine cellars",
    "stagsleapwinery": "stags leap winery",
    "silveradob": "silverado vineyards",
    "rhrestaurant": "rutherford grill",
    "regiisova": "regiis ova",
    "bistrojeanty": "bistro jeanty",
    "honormarket": "honor market",
    "stuppaestate": "sttupa estate",
    "stuppa": "sttupa estate",
    "closduval": "clos du val",
    "rgrill": "rutherford grill",
    "rutherfordgrill": "rutherford grill",
    "ranchocaymus": "rancho caymus inn",
    "calistogabrewery": "calistoga inn brewery",
    "drwilkinsons": "dr wilkinsons",
    "francishouse": "francis house inn",
    "samssocialclub": "sams social club",
    "mayacamasdowntown": "mayacamas downtown",
    "napariverinn": "napa river inn",
    "gentlemanfarmer": "gentleman farmer bungalow",
    "dutchdoor": "dutch door",
    "latoque": "la toque",
    "conamour": "con amor",
    "naysayercoffee": "naysayer coffee",
    "naysayer": "naysayer coffee",
    "ohmcoffee": "ohm coffee",
    "romanholidaygelato": "roman holiday gelato",
    "modelbakery": "model bakery",
    "innSalvestrin": "inn at salvestrin",
    "innsalvestrin": "inn at salvestrin",
    "spootswood": "spottswoode estate vineyard winery",
    "spottswoode": "spottswoode estate vineyard winery",
    "cliffamily": "clif family",
    "fausthaus": "faust haus",
    "whitehalllane": "whitehall lane winery",
    "studio1299a": "studio 1299a",
    "charlies": "charlies napa valley",
    "advivum": "ad vivum",
    "ehlers": "ehlers estate",
    "lewelling": "lewelling vineyards",
    "harvestinn": "harvest inn",
    "wydown": "wydown hotel",
}


@dataclass(frozen=True)
class RegionPropertiesConfig:
    region: str
    drive_folder_id: str
    tmp_dir: Path
    drive_prefix: str | None = None


REGIONS: list[RegionPropertiesConfig] = [
    RegionPropertiesConfig(
        "oakville",
        "1zJUJnzwGSL34NkE4nf4WuIJhZTSRfryk",
        ROOT / ".tmp-oakville-properties",
        "01_Oakville",
    ),
    RegionPropertiesConfig(
        "yountville",
        "14cG7EppwgxyVoqoJiD5j5Js7tEPS1sR3",
        ROOT / ".tmp-yountville-properties",
        "02_Yountville",
    ),
    RegionPropertiesConfig(
        "rutherford",
        "1U3l8uGdcQS9tbC1WsitRppt5hb_Z_IiA",
        ROOT / ".tmp-rutherford-properties",
        "03_Rutherford",
    ),
    RegionPropertiesConfig(
        "st-helena",
        "1MIlSjMrAKJCatzsDlQs6wX57mQI-mn1w",
        ROOT / ".tmp-st-helena-properties",
        "04_St_Helena",
    ),
    RegionPropertiesConfig(
        "calistoga",
        "1SXSyHRyXWB1M7SP3qzwXu9hMGjhwxOog",
        ROOT / ".tmp-calistoga-properties",
        "05_Calistoga",
    ),
    RegionPropertiesConfig(
        "downtown-napa",
        "1fbceoQLmS-4JU4hNej4Vh0TffuUGBM--",
        ROOT / ".tmp-downtown-napa-properties",
        "06_Downtown_Napa",
    ),
    RegionPropertiesConfig(
        "pritchard-hill",
        "13Aaxli7a9Pe_Yzj_hw5H6Qx-tXVe7Ihx",
        ROOT / ".tmp-pritchard-hill-properties",
        "08_Pritchard_Hill",
    ),
]

# 07 Beyond Downtown also maps to pritchard-hill — merged when present
PRITCHARD_ALT = RegionPropertiesConfig(
    "pritchard-hill",
    "1OrehNw6SviHfQdVmNXuybOGs5Jiz00Ji",
    ROOT / ".tmp-pritchard-hill-beyond-properties",
    "07_Beyond Downtown",
)


def names_overlap(a: str, b: str) -> bool:
    na = normalize_match_text(a)
    nb = normalize_match_text(b)
    if na == nb:
        return True
    if na and nb and len(na) >= 4 and len(nb) >= 4 and (na in nb or nb in na):
        return True
    return False


def should_skip_download_path(path: str) -> bool:
    lower = path.lower().replace("\\", "/")
    if "/originals/" in lower or lower.startswith("originals/"):
        return True
    if not lower.endswith((".jpg", ".jpeg")):
        return True
    return False


def download_file_by_id(file_id: str, out: Path) -> bool:
    import subprocess

    url = f"https://drive.google.com/uc?export=download&id={file_id}"
    try:
        subprocess.run(
            ["curl", "-sL", "-o", str(out), url],
            check=True,
            capture_output=True,
        )
        return out.is_file() and out.stat().st_size > 2000
    except Exception:
        return False


def download_properties_jpgs(folder_id: str, dest: Path, sleep_s: float = 0.75) -> int:
    import gdown

    dest.mkdir(parents=True, exist_ok=True)
    files = gdown.download_folder(
        id=folder_id,
        output=str(dest),
        skip_download=True,
        quiet=True,
        use_cookies=False,
    )
    to_get = [f for f in files if not should_skip_download_path(f.path)]
    downloaded = 0
    for f in to_get:
        out = dest / f.path
        out.parent.mkdir(parents=True, exist_ok=True)
        if out.is_file() and out.stat().st_size > 2000:
            downloaded += 1
            continue
        try:
            gdown.download(id=f.id, output=str(out), quiet=True, use_cookies=False)
        except Exception:
            if not download_file_by_id(f.id, out):
                print(f"  download skip: {f.path}")
                continue
        if out.is_file() and out.stat().st_size > 2000:
            downloaded += 1
            time.sleep(sleep_s)
    return downloaded


def parse_table_names(block: str, header: str) -> list[str]:
    match = re.search(
        rf"## {re.escape(header)}\s*([\s\S]*?)(?=\n## |\n# |\Z)",
        block,
    )
    if not match:
        return []
    names: list[str] = []
    for row in re.finditer(r"\| ([^|]+) \| ([^|]+) \|", match.group(1)):
        name = row.group(1).strip()
        if name in ("Name", "---") or name.startswith("---"):
            continue
        names.append(name)
    return names


def section_block(mdx: str, heading: str) -> str:
    idx = mdx.find(heading)
    if idx < 0:
        return ""
    rest = mdx[idx:]
    next_h1 = re.search(r"\n# [^#]", rest)
    return rest[: next_h1.start()] if next_h1 else rest


def parse_mdx_directory_listings(region: str) -> dict[str, list[str]]:
    mdx_path = MDX_DIR / f"{region}.mdx"
    if not mdx_path.exists():
        return {}
    mdx = mdx_path.read_text()

    listings: dict[str, list[str]] = {
        "wineries": [],
        "restaurants": [],
        "hotels": [],
        "breakfast": [],
    }

    taste = section_block(mdx, "# Where to Taste")
    listings["wineries"] = parse_table_names(taste, "Tasting Room Directory")

    eat = section_block(mdx, "# Where to Eat")
    listings["restaurants"] = parse_table_names(eat, "Restaurant Directory")
    listings["breakfast"] = parse_table_names(eat, "Breakfast, Coffee & Snacks Directory")

    stay = section_block(mdx, "# Where to Stay")
    listings["hotels"] = parse_table_names(stay, "Lodging Directory")

    if region == "pritchard-hill":
        listings["wineries"] = parse_table_names(mdx, "Tasting Room Directory")

    return listings


def stem_alias_text(stem: str) -> str:
    compact = re.sub(r"[^a-z0-9]", "", stem.lower())
    if compact in STEM_ALIASES:
        return STEM_ALIASES[compact]
    # Strip region prefix from deliverable names
    stripped = re.sub(r"^(oakville|yountville|rutherford|sthelena|calistoga|dt)_", "", stem, flags=re.I)
    stripped = re.sub(r"^(oakville|yountville|rutherford|sthelena|calistoga|dt)", "", stripped, flags=re.I)
    compact2 = re.sub(r"[^a-z0-9]", "", stripped.lower())
    if compact2 in STEM_ALIASES:
        return STEM_ALIASES[compact2]
    return stem.replace("_", " ").replace("-", " ")


def listing_for_prop_slug(prop_slug: str, listings: dict[str, list[str]]) -> str | None:
    slug_text = prop_slug.replace("-", " ")
    for names in listings.values():
        for name in names:
            if names_overlap(prop_slug, name) or names_overlap(slug_text, name):
                return name
    return None


def property_map_entry(region: str, stem: str) -> tuple[str, str] | None:
    mapping = PROPERTY_MAP.get(region, {})
    if stem in mapping:
        section, slug = mapping[stem]
        if slug.endswith("-alt"):
            return None
        return section, slug

    lower_map = {k.lower(): v for k, v in mapping.items()}
    hit = lower_map.get(stem.lower())
    if hit:
        section, slug = hit
        if slug.endswith("-alt"):
            return None
        return section, slug
    return None


def match_listing_name(stem: str, listings: dict[str, list[str]]) -> tuple[str, str] | None:
    alias = stem_alias_text(stem)
    candidates = [stem, alias, stem.replace("_", " "), alias.replace("_", " ")]
    for section, names in listings.items():
        for name in names:
            for cand in candidates:
                if names_overlap(cand, name):
                    return section, name
    return None


def copy_directory_thumb(src: Path, region: str, section: str, prop_slug: str) -> str:
    dest_dir = IMAGES / region / section
    dest_dir.mkdir(parents=True, exist_ok=True)
    base = slug_for_path(region, section, prop_slug)
    dest = dest_dir / f"{base}-directory.jpg"
    shutil.copy2(src, dest)
    return f"/images/{region}/{section}/{base}-directory.jpg"


def collect_local_sources(cfg: RegionPropertiesConfig) -> list[Path]:
    paths: list[Path] = []

    if cfg.tmp_dir.is_dir():
        for jpg in cfg.tmp_dir.rglob("*.jpg"):
            if should_skip_download_path(str(jpg.relative_to(cfg.tmp_dir))):
                continue
            paths.append(jpg)

    flat = ROOT / ".tmp-region-properties" / cfg.region
    if flat.is_dir():
        paths.extend(sorted(flat.glob("*.jpg")))

    if cfg.drive_prefix:
        props = (
            ROOT / ".tmp-drive-sync" / cfg.drive_prefix
            / "Properties_(featured_wineries_restaurants_hotels)"
        )
        if props.is_dir():
            for jpg in props.glob("*.jpg"):
                paths.append(jpg)
            for jpg in props.glob("**/*.jpg"):
                rel = str(jpg.relative_to(props)).lower()
                if "original" in rel:
                    continue
                paths.append(jpg)

    # De-dupe by resolved path
    seen: set[str] = set()
    unique: list[Path] = []
    for p in paths:
        key = str(p.resolve())
        if key in seen:
            continue
        seen.add(key)
        unique.append(p)
    return unique


def score_source_path(path: Path) -> int:
    """Prefer flat deliverables over wide/16x9 subfolders."""
    rel = str(path).lower()
    if "yountville_" in path.name.lower() or "oakville_" in path.name.lower():
        return 0
    if "sthelena_" in path.name.lower() or path.name.lower().startswith("dt_"):
        return 0
    if " wide" in rel or "16x9" in rel:
        return 3
    if "/originals/" in rel:
        return 9
    if path.parent.name.lower() in {"originals", "original"}:
        return 9
    return 1


def import_region(cfg: RegionPropertiesConfig, manifest: dict[str, str]) -> tuple[int, list[str]]:
    listings = parse_mdx_directory_listings(cfg.region)
    all_listing_names = [n for names in listings.values() for n in names]

    sources = collect_local_sources(cfg)
    if not sources:
        return 0, ["no local Properties jpgs — try --download"]

    # stem -> best source path
    by_stem: dict[str, Path] = {}
    for src in sources:
        stem = src.stem
        prev = by_stem.get(stem)
        if prev is None or score_source_path(src) < score_source_path(prev):
            by_stem[stem] = src

    imported = 0
    missing: list[str] = []
    matched_listings: set[str] = set()

    for stem, src in sorted(by_stem.items()):
        entry = property_map_entry(cfg.region, stem)
        listing_name: str | None = None
        section: str | None = None
        prop_slug: str | None = None

        if entry:
            section, prop_slug = entry
            listing_name = listing_for_prop_slug(prop_slug, listings)
            if not listing_name:
                listing_name = stem_alias_text(stem)
        else:
            hit = match_listing_name(stem, listings)
            if hit:
                section, listing_name = hit
                prop_slug = re.sub(r"[^a-z0-9]+", "-", listing_name.lower()).strip("-")[:48]

        if not section or not prop_slug or not listing_name:
            continue

        url = copy_directory_thumb(src, cfg.region, section, prop_slug)
        key = f"{cfg.region}|{normalize_match_text(listing_name)}"
        manifest[key] = url
        base = url.replace("-directory.jpg", "")
        for existing_key, existing_url in list(manifest.items()):
            if not existing_key.startswith(f"{cfg.region}|"):
                continue
            if existing_url.startswith(base) and existing_url.endswith("-landscape.jpg"):
                manifest[existing_key] = url
        matched_listings.add(listing_name)
        imported += 1
        print(f"  {listing_name} -> {url} ({src.name})")

    for name in all_listing_names:
        key = f"{cfg.region}|{normalize_match_text(name)}"
        if key not in manifest and name not in matched_listings:
            missing.append(name)

    return imported, missing


def main() -> None:
    parser = argparse.ArgumentParser(description="Import region directory list thumbnails")
    parser.add_argument("--region", action="append", dest="regions")
    parser.add_argument("--skip-download", action="store_true")
    parser.add_argument("--sleep", type=float, default=2.5, help="Seconds between Drive downloads")
    args = parser.parse_args()

    selected = REGIONS
    if args.regions:
        allowed = set(args.regions)
        selected = [c for c in REGIONS if c.region in allowed]
        if "pritchard-hill" in allowed:
            pass  # included in REGIONS

    manifest: dict[str, str] = {}
    if MANIFEST.exists():
        manifest = json.loads(MANIFEST.read_text())

    total = 0
    for cfg in selected:
        print(f"\n{cfg.region} directory thumbs")
        if not args.skip_download:
            print(f"  Downloading Drive folder {cfg.drive_folder_id} …")
            n = download_properties_jpgs(cfg.drive_folder_id, cfg.tmp_dir, sleep_s=args.sleep)
            print(f"  Downloaded {n} jpgs into {cfg.tmp_dir.name}/")

        count, missing = import_region(cfg, manifest)
        total += count

        if cfg.region == "pritchard-hill" and not args.skip_download:
            print(f"  Downloading Beyond Downtown folder …")
            download_properties_jpgs(
                PRITCHARD_ALT.drive_folder_id,
                PRITCHARD_ALT.tmp_dir,
                sleep_s=args.sleep,
            )
            extra, _ = import_region(
                RegionPropertiesConfig(
                    cfg.region,
                    PRITCHARD_ALT.drive_folder_id,
                    PRITCHARD_ALT.tmp_dir,
                    PRITCHARD_ALT.drive_prefix,
                ),
                manifest,
            )
            total += extra

        if missing:
            print(f"  Listings without Properties thumb ({len(missing)}):")
            for name in missing[:12]:
                print(f"    - {name}")
            if len(missing) > 12:
                print(f"    … and {len(missing) - 12} more")

    MANIFEST.write_text(json.dumps(manifest, indent=2) + "\n")
    print(f"\nImported {total} directory thumbs; manifest has {len(manifest)} keys")


if __name__ == "__main__":
    main()
