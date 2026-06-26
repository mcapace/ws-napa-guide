#!/usr/bin/env python3
"""Import region + homepage JPGs from the Napa Guide Digital Drive export.

Source folder layout matches:
https://drive.google.com/drive/folders/1TQXS-Rr5zRgoQnsUItksSMhquZ0yE1aT

Usage:
  python3 scripts/import-region-drive-images.py
  python3 scripts/import-region-drive-images.py --dir .tmp-drive-import
  python3 scripts/import-region-drive-images.py --zip ~/Desktop/drive-download.zip
  python3 scripts/import-region-drive-images.py --mosaic-only --dir .tmp-drive-import
"""

from __future__ import annotations

import argparse
import json
import re
import shutil
import zipfile
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DEFAULT_ZIP = Path("/Users/mcapace/Desktop/drive-download-20260522T124716Z-3-001.zip")
DRIVE_FOLDER_URL = "https://drive.google.com/drive/folders/1TQXS-Rr5zRgoQnsUItksSMhquZ0yE1aT"
IMAGES = ROOT / "public" / "images"
MDX_DIR = ROOT / "src" / "content" / "regions"
MOSAIC_DIR = IMAGES / "homepage" / "mosaic"
SCROLL_REVEALS_DIR = IMAGES / "homepage" / "region-scroll-reveals"
ITINERARY_MANIFEST = ROOT / "src" / "data" / "region-itinerary-images.json"
DIRECTORY_IMAGE_MANIFEST = ROOT / "src" / "data" / "region-directory-images.json"
ITINERARY_TS = ROOT / "src" / "data" / "region-itineraries.ts"

# Removed from hero mosaic rotation (duplicate / editorial request)
MOSAIC_EXCLUDED_FILES = frozenset({"collage-charlies.jpg"})

# 00_Homepage/02_Region_Scroll_Reveals/{folder}
SCROLL_REVEAL_FOLDER_SLUG: dict[str, str] = {
    "Calistoga": "calistoga",
    "Downtown_Napa": "downtown-napa",
    "Oakville": "oakville",
    "Pritchard_Hill": "pritchard-hill",
    "Rutherford": "rutherford",
    "St_Helena": "st-helena",
    "Yountville": "yountville",
}

REGION_PREFIX = {
    "01_Oakville": "oakville",
    "02_Yountville": "yountville",
    "03_Rutherford": "rutherford",
    "04_St_Helena": "st-helena",
    "05_Calistoga": "calistoga",
    "06_Downtown_Napa": "downtown-napa",
    "07_Beyond Downtown": "pritchard-hill",
    "08_Pritchard_Hill": "pritchard-hill",
}

# Drive itinerary folder names vary (Itinerary / Itinieries / Itineraries).
ITINERARY_FOLDER_NAMES = frozenset(
    {"itinerary", "itinieries", "itineraries", "itinerarys"}
)

# Filename stem aliases when Drive labels differ from itinerary stop names.
ITINERARY_STEM_ALIASES: dict[str, str] = {
    "bv": "beaulieu vineyard",
    "mondavi": "robert mondavi winery",
    "shafer": "shafer vineyards",
    "clifflede": "cliff lede vineyards",
    "clifflede2": "cliff lede vineyards",
    "chandon": "chandon napa valley",
    "antinori": "antinori napa valley",
    "bouchon": "bouchon bistro",
    "mayacamas": "mayacamas",
    "seavey": "seavey vineyard",
    "forman": "forman vineyard",
    "charteroak": "the charter oak",
    "charter": "the charter oak",
    "salvestrin": "salvestrin winery",
    "corison": "corison winery",
    "understudy": "under-study",
    "freemark": "freemark abbey",
    "freemarkabbey": "freemark abbey",
    "springmountain": "spring mountain vineyard",
    "charlies": "charlies napa valley",
    "royalwe": "royal we wines",
    "wheeler": "wheeler farms",
    "wheelerfarms": "wheeler farms",
    "riversmarie": "rivers-marie",
    "lola": "lola wines",
    "tankgarage": "tank garage winery",
    "tank": "tank garage winery",
    "busters": "busters southern bbq",
    "buster": "busters southern bbq",
    "cade": "cade estate",
    "outpost": "outpost wines",
    "chappellet": "chappellet winery",
    "continuum": "continuum estate",
    "davidarthur": "david arthur vineyards",
    "howardbacken": "the howard backen estate",
    "backen": "the howard backen estate",
    "boonfly": "boon fly cafe",
    "bouchaine": "bouchaine vineyards",
    "domainecarneros": "domaine carneros",
    "carneros": "domaine carneros",
    "groth": "groth vineyards winery",
    "stsupery": "st supery estate vineyards winery",
    "supery": "st supery estate vineyards winery",
    "mustards": "mustards grill",
    "grgich": "grgich hills estate",
    "grgichhills": "grgich hills estate",
}

# zip stem (without extension) -> (section folder, property slug)
PROPERTY_MAP: dict[str, dict[str, tuple[str, str]]] = {
    "oakville": {
        "Oakville_Cardinale": ("wineries", "cardinale"),
        "Oakville_FarNiente": ("wineries", "far-niente"),
        "FarNiente_Gazebo": ("wineries", "far-niente"),
        "Oakville_Nickel": ("wineries", "nickel-and-nickel"),
        "NickelNickel_Property_2": ("wineries", "nickel-and-nickel"),
        "Oakville_Rudd": ("wineries", "rudd-estate"),
        "Oakville_Brix": ("restaurants", "brix"),
        "Brix-DSC_0009-Edit": ("restaurants", "brix"),
        "Oakville_Mustards": ("restaurants", "mustards-grill"),
        "Oakville_OakvilleGrocery": ("restaurants", "oakville-grocery"),
        "Oakville_Grocery_Interiors_021": ("restaurants", "oakville-grocery"),
        "groth": ("wineries", "groth-vineyards"),
        "mondavi": ("wineries", "robert-mondavi-winery"),
        "opusone": ("wineries", "opus-one"),
        "PlumpJack": ("wineries", "plumpjack-estate"),
        "promontory": ("wineries", "promontory-wine"),
        "turnbull": ("wineries", "turnbull-wine-cellars"),
    },
    "yountville": {
        "Yountville_Stewart": ("wineries", "stewart-cellars"),
        "Yountville_ClosduVal": ("wineries", "clos-du-val"),
        "Yountville_Lewis": ("wineries", "lewis-cellars"),
        "Yountville_Lewis2": ("wineries", "lewis-cellars-alt"),
        "Yountville_Hendry": ("wineries", "hendry"),
        "Yountville_Trefethen": ("wineries", "trefethen"),
        "Yountville_AdHoc": ("restaurants", "ad-hoc"),
        "Yountville_Clementine": ("restaurants", "clementine"),
        "Yountville_HonorMarket": ("restaurants", "honor-market"),
        "Yountville_Bardessono": ("hotels", "bardessono"),
        "Yountville_Sttupa": ("hotels", "sttupa-estate"),
        "Yountville_Kollar": ("breakfast", "kollar-chocolates"),
        "Yountville_ArtWalk": ("sidebar", "art-walk"),
    },
    "rutherford": {
        "Rutherford_Cathiard": ("wineries", "cathiard-family-estate"),
        "Rutherford_Inglenook": ("wineries", "inglenook"),
        "Rutherford_Quintessa": ("wineries", "quintessa"),
        "Rutherford_Quintessa2": ("wineries", "quintessa-alt"),
        "Rutherford_Staglin": ("wineries", "staglin-family-vineyard"),
        "Rutherford_RGrill": ("restaurants", "rutherford-grill"),
        "Rutherford_RancoCaymus": ("hotels", "rancho-caymus-inn"),
    },
    "st-helena": {
        "StHelena_AdVivum": ("wineries", "ad-vivum"),
        "StHelena_Clif": ("wineries", "clif-family"),
        "StHelena_Ehlers": ("wineries", "ehlers-estate"),
        "StHelena_Faust": ("wineries", "faust-haus"),
        "StHelena_Lewelling": ("wineries", "lewelling-vineyards"),
        "StHelena_Snowden": ("wineries", "snowden"),
        "StHelena_Spottswoode": ("wineries", "spottswoode"),
        "StHelena_Studio": ("wineries", "studio-1299a"),
        "StHelena_Whitehall": ("wineries", "whitehall-lane"),
        "StHelena_Whitehall2": ("wineries", "whitehall-lane-alt"),
        "StHelena_Charlies": ("restaurants", "charlies-napa-valley"),
        "StHelena_Cook": ("restaurants", "cook"),
        "Understudy": ("restaurants", "under-study"),
        "StHelena_Gelato": ("breakfast", "roman-holiday-gelato"),
        "StHelena_ModelBakery": ("breakfast", "model-bakery"),
        "StHelena_Erosion": ("breakfast", "erosion-creamery-cafe"),
        "erosion_1600": ("breakfast", "erosion-creamery-cafe"),
        "StHelena_SalvestrinInn": ("hotels", "inn-at-salvestrin"),
        "SalvestrinInn_1200": ("hotels", "inn-at-salvestrin"),
        "StHelena_HarvestInn": ("hotels", "harvest-inn"),
        "StHelena_Alila": ("hotels", "alila-napa-valley"),
        "StHelena_Wydown": ("hotels", "wydown-hotel"),
        "StHelena_Knifeworks": ("sidebar", "new-west-knifeworks"),
        "StHelena_MAdFritz": ("sidebar", "mad-fritz-brewery"),
    },
    "calistoga": {
        "Calistoga_Hourglass": ("wineries", "hourglass"),
        "StHelena_Larkmead": ("wineries", "larkmead"),
        "Calistoga_Schramsberg": ("wineries", "schramsberg"),
        "Calistoga_Schramsberg": ("wineries", "schramsberg"),
        "Calistoga_Lovina": ("restaurants", "lovina"),
        "Calistoga_Picobar": ("restaurants", "picobar"),
        "Calistoga_Sams": ("restaurants", "sams-social-club"),
        "Calistoga_Sarafornia": ("breakfast", "cafe-sarafornia"),
        "Calistoga_FrancisHouse": ("hotels", "francis-house-inn"),
        "Calistoga_Solage": ("hotels", "solage"),
        "Calistoga_Wilkinson": ("hotels", "dr-wilkinsons"),
        "Calistoga_Brewery": ("restaurants", "calistoga-inn-brewery"),
    },
    "downtown-napa": {
        "DT_Hestan": ("wineries", "hestan-napa"),
        "Hestan": ("wineries", "hestan-napa"),
        "DT_MayacamasDT": ("wineries", "mayacamas-downtown"),
        "DT_Cadet": ("wineries", "cadet-wine-beer-bar"),
        "DT_GentlemanFarmer": ("wineries", "gentleman-farmer-bungalow"),
        "DT_Angele": ("restaurants", "angele"),
        "DT_ConAmor": ("restaurants", "con-amor"),
        "DT_DutchDoor": ("restaurants", "dutch-door"),
        "DT_LaToque": ("restaurants", "la-toque"),
        "DT_Scala": ("restaurants", "scala"),
        "DT_Scala2": ("restaurants", "scala-alt"),
        "DT_Torq": ("restaurants", "torc"),
        "DT_NapaRiverInn": ("hotels", "napa-river-inn"),
        "DT_Westin": ("hotels", "westin-verasa"),
        "DT_Naysayer": ("breakfast", "naysayer-coffee"),
        "DT_Ohm": ("breakfast", "ohm-coffee"),
        "DT_Jeffries": ("restaurants", "jeffries"),
        "DT_Marquee": ("restaurants", "marquee"),
        "DT_Tonewood": ("wineries", "tonewood"),
        "DT_RailArts": ("sidebar", "rail-arts"),
        "DT_RanchoGordo": ("breakfast", "rancho-gordo"),
    },
}

# MDX ### heading substring -> property slug (for inject)
MDX_TITLE_TO_SLUG: dict[str, dict[str, str]] = {
    "oakville": {
        "Cardinale": "cardinale",
        "Far Niente": "far-niente",
        "Nickel": "nickel-and-nickel",
        "Rudd": "rudd-estate",
        "Brix": "brix",
        "Mustards": "mustards-grill",
        "Oakville Grocery": "oakville-grocery",
    },
    "yountville": {
        "Stewart Cellars": "stewart-cellars",
        "Clos Du Val": "clos-du-val",
        "Lewis Cellars": "lewis-cellars",
        "Hendry": "hendry",
        "Trefethen": "trefethen",
        "Ad Hoc": "ad-hoc",
        "Clementine": "clementine",
        "Honor Market": "honor-market",
        "Bardessono": "bardessono",
        "Sttupa": "sttupa-estate",
        "Kollar": "kollar-chocolates",
    },
    "rutherford": {
        "Cathiard": "cathiard-family-estate",
        "Inglenook": "inglenook",
        "Quintessa": "quintessa",
        "Staglin": "staglin-family-vineyard",
        "Rutherford Grill": "rutherford-grill",
        "Rancho Caymus": "rancho-caymus-inn",
    },
    "st-helena": {
        "Ad Vivum": "ad-vivum",
        "Clif Family": "clif-family",
        "Ehlers Estate": "ehlers-estate",
        "Faust Haus": "faust-haus",
        "Lewelling": "lewelling-vineyards",
        "Snowden": "snowden",
        "Spottswoode": "spottswoode",
        "Studio 1299": "studio-1299a",
        "Whitehall Lane": "whitehall-lane",
        "Charlie": "charlies-napa-valley",
        "Cook": "cook",
        "Roman Holiday": "roman-holiday-gelato",
        "Model Bakery": "model-bakery",
        "Harvest Inn": "harvest-inn",
        "Alila": "alila-napa-valley",
        "Wydown": "wydown-hotel",
        "Erosion": "erosion-creamery-cafe",
        "Inn at Salvestrin": "inn-at-salvestrin",
    },
    "calistoga": {
        "Hourglass": "hourglass",
        "Larkmead": "larkmead",
        "Schramsberg": "schramsberg",
        "Lovina": "lovina",
        "Picobar": "picobar",
        "Sam's Social": "sams-social-club",
        "Café Sarafornia": "cafe-sarafornia",
        "Francis House": "francis-house-inn",
        "Solage": "solage",
        "Wilkinson": "dr-wilkinsons",
        "Calistoga Inn": "calistoga-inn-brewery",
    },
    "downtown-napa": {
        "Hestan Napa": "hestan-napa",
        "Hestan": "hestan-napa",
        "Mayacamas Downtown": "mayacamas-downtown",
        "Cadet": "cadet-wine-beer-bar",
        "Gentleman Farmer": "gentleman-farmer-bungalow",
        "Angèle": "angele",
        "Con Amor": "con-amor",
        "Dutch Door": "dutch-door",
        "La Toque": "la-toque",
        "Scala": "scala",
        "Torc": "torc",
        "Napa River Inn": "napa-river-inn",
        "Westin": "westin-verasa",
        "Naysayer": "naysayer-coffee",
        "Ohm": "ohm-coffee",
    },
}


SECTION_SINGULAR = {
    "wineries": "winery",
    "restaurants": "restaurant",
    "hotels": "hotel",
    "breakfast": "breakfast",
    "sidebar": "sidebar",
}

# Directory table names for imported property stills (map / list thumbnails).
DIRECTORY_LISTING_NAMES: dict[str, dict[str, str]] = {
    "oakville": {
        "groth-vineyards": "Groth Vineyards & Winery",
        "robert-mondavi-winery": "Robert Mondavi Winery",
        "opus-one": "Opus One",
        "plumpjack-estate": "PlumpJack Estate Winery",
        "promontory-wine": "Promontory Wine",
        "turnbull-wine-cellars": "Turnbull Wine Cellars",
    },
}


def slug_for_path(region: str, section: str, prop_slug: str) -> str:
    if section == "sidebar":
        return f"{region}-sidebar-{prop_slug}"
    if section == "breakfast":
        return f"{region}-breakfast-{prop_slug}"
    kind = SECTION_SINGULAR[section]
    return f"{region}-{kind}-{prop_slug}"


def is_original_path(path_str: str) -> bool:
    """Skip full-res masters outside property folders."""
    lower = path_str.lower()
    if "properties_" in lower:
        return False
    return "/original" in lower or "/originals/" in lower


def import_homepage_mosaic(source_dir: Path) -> int:
    """Sync hero mosaic tiles from 00_Homepage/01_Hero_Collage/Still_Tiles_(5)."""
    collage_root = source_dir / "00_Homepage" / "01_Hero_Collage" / "Still_Tiles_(5)"
    if not collage_root.is_dir():
        print(f"  mosaic: no collage folder at {collage_root}")
        return 0

    MOSAIC_DIR.mkdir(parents=True, exist_ok=True)
    targets = {
        p.stem.lower().replace("-", "_"): p.name
        for p in MOSAIC_DIR.glob("collage-*.jpg")
        if p.name not in MOSAIC_EXCLUDED_FILES
    }
    copied = 0
    candidates: list[Path] = sorted(collage_root.glob("*.jpg"))
    replacements = collage_root / "new replacements"
    if replacements.is_dir():
        candidates.extend(sorted(replacements.glob("*.jpg")))

    for jpg in candidates:
        key = jpg.stem.lower().replace("-", "_")
        dest_name = targets.get(key)
        if not dest_name:
            continue
        shutil.copy2(jpg, MOSAIC_DIR / dest_name)
        copied += 1
        print(f"  mosaic: {dest_name}")

    return copied


def slugify_stem(stem: str) -> str:
    s = stem.lower().replace("_", "-")
    s = re.sub(r"[^a-z0-9-]+", "-", s)
    return re.sub(r"-+", "-", s).strip("-")


def normalize_match_text(text: str) -> str:
    s = text.lower().replace("'", "").replace("’", "")
    s = re.sub(r"[^a-z0-9]+", " ", s)
    return re.sub(r"\s+", " ", s).strip()


def itinerary_stop_slug(name: str) -> str:
    s = name.lower().replace("'", "").replace("’", "")
    s = re.sub(r"[^a-z0-9]+", "-", s)
    return re.sub(r"-+", "-", s).strip("-")[:60]


def load_itinerary_catalog() -> dict[str, list[dict]]:
    """Parse region-itineraries.ts into region -> [{id, stops: [{order, name}]}]."""
    if not ITINERARY_TS.exists():
        return {}

    text = ITINERARY_TS.read_text()
    itineraries: dict[str, dict] = {}

    for block in re.finditer(
        r"const \w+: Itinerary = \{([\s\S]*?)\n\}",
        text,
    ):
        body = block.group(1)
        id_match = re.search(r"id: '([^']+)'", body)
        if not id_match:
            continue
        it_id = id_match.group(1)
        stops: list[dict] = []
        for stop_match in re.finditer(
            r"order: (\d+),\s*name: (?:'([^']*)'|\"([^\"]*)\")",
            body,
        ):
            order = int(stop_match.group(1))
            name = stop_match.group(2) or stop_match.group(3)
            stops.append({"order": order, "name": name})
        if stops:
            itineraries[it_id] = {"id": it_id, "stops": stops}

    region_map: dict[str, list[dict]] = {}
    region_block = re.search(
        r"export const REGION_ITINERARIES[^=]*=\s*\{([\s\S]*?)\n\}",
        text,
    )
    if not region_block:
        return region_map

    for region_match in re.finditer(
        r"(?:'([^']+)'|(\w+)):\s*\[([^\]]+)\]",
        region_block.group(1),
    ):
        region = region_match.group(1) or region_match.group(2)
        ids = re.findall(r"\w+", region_match.group(3))
        catalog: list[dict] = []
        for const_name in ids:
            # const names like ST_HELENA_OFF_GRID -> find matching itinerary id
            for it in itineraries.values():
                if const_name.replace("_", "-").lower() in it["id"].replace("_", "-"):
                    catalog.append(it)
                    break
            else:
                # fallback: match by const suffix against id tokens
                for it in itineraries.values():
                    if any(
                        token in it["id"]
                        for token in re.findall(r"[A-Z][a-z]+", const_name)
                    ):
                        catalog.append(it)
                        break
        if catalog:
            region_map[region] = catalog

    # Explicit map for const names that regex may miss
    explicit: dict[str, list[str]] = {
        "oakville": ["everything-old-new"],
        "rutherford": ["sauvignon-blanc-discovery"],
        "yountville": ["culinary-delights", "stags-leap-splendor", "into-the-hills"],
        "st-helena": [
            "off-the-grid-cabernets",
            "west-side-family-wineries",
            "st-helena-history-lesson",
            "modern-tasting-salons",
        ],
        "calistoga": ["walkable-tasting-tour", "mountain-getaway"],
        "pritchard-hill": ["pritchard-hill-pilgrimage"],
        "downtown-napa": ["wind-in-your-hair"],
    }
    for region, ids in explicit.items():
        region_map[region] = [itineraries[id] for id in ids if id in itineraries]

    return region_map


def itinerary_folder_for_region(region_dir: Path) -> Path | None:
    for child in region_dir.iterdir():
        if child.is_dir() and child.name.lower().replace("_", "") in ITINERARY_FOLDER_NAMES:
            return child
    return None


def match_itinerary_stop(
    region: str,
    file_stem: str,
    catalog: dict[str, list[dict]],
) -> tuple[str, int, str] | None:
    """Return (itinerary_id, order, stop_name) for a Drive filename stem."""
    region_itins = catalog.get(region, [])
    if not region_itins:
        return None

    stem = file_stem.lower()
    stem = re.sub(r"_?\d{3,4}$", "", stem)  # strip _1200 size suffix
    stem_compact = re.sub(r"[^a-z0-9]", "", stem)
    alias = ITINERARY_STEM_ALIASES.get(stem_compact)
    stem_norm = normalize_match_text(alias or stem.replace("_", " "))

    candidates: list[tuple[str, int, str, int]] = []
    for it in region_itins:
        for stop in it["stops"]:
            stop_norm = normalize_match_text(stop["name"])
            stop_compact = re.sub(r"[^a-z0-9]", "", stop_norm)
            score = 0
            if stem_norm == stop_norm:
                score = 100
            elif stem_compact and stem_compact == stop_compact:
                score = 95
            elif len(stem_compact) >= 4 and stem_compact in stop_compact:
                score = 80 + len(stem_compact)
            elif len(stop_compact) >= 4 and stop_compact in stem_compact:
                score = 70 + len(stop_compact)
            else:
                # token overlap (e.g. davidarthur vs david arthur vineyards)
                stem_tokens = set(stem_norm.split())
                stop_tokens = set(stop_norm.split())
                overlap = stem_tokens & stop_tokens
                if overlap and len(overlap) >= 2:
                    score = 50 + len(overlap) * 10
                elif overlap:
                    score = 30 + len(overlap) * 10

            if score > 0:
                candidates.append((it["id"], stop["order"], stop["name"], score))

    if not candidates:
        return None

    candidates.sort(key=lambda c: c[3], reverse=True)
    best = candidates[0]
    if len(candidates) > 1 and candidates[1][3] == best[3]:
        return None  # ambiguous
    return best[0], best[1], best[2]


def copy_itinerary_stop_image(
    src: Path,
    region: str,
    itinerary_id: str,
    stop_name: str,
) -> str:
    dest_dir = IMAGES / region / "itineraries" / itinerary_id
    dest_dir.mkdir(parents=True, exist_ok=True)
    slug = itinerary_stop_slug(stop_name)
    landscape = dest_dir / f"{slug}-landscape.jpg"
    portrait = dest_dir / f"{slug}-portrait.jpg"
    shutil.copy2(src, landscape)
    shutil.copy2(src, portrait)
    return f"/images/{region}/itineraries/{itinerary_id}/{slug}-landscape.jpg"


def import_itinerary_images(source_dir: Path) -> dict[str, str]:
    """Import Drive itinerary stills; returns manifest key -> landscape URL."""
    catalog = load_itinerary_catalog()
    manifest: dict[str, str] = {}

    for prefix, region in REGION_PREFIX.items():
        region_dir = source_dir / prefix
        if not region_dir.is_dir():
            continue

        itin_dir = itinerary_folder_for_region(region_dir)
        if not itin_dir:
            continue

        for jpg in sorted(itin_dir.glob("*.jpg")):
            match = match_itinerary_stop(region, jpg.stem, catalog)
            if not match:
                print(f"  itinerary unmapped: {region}/{jpg.name}")
                continue

            it_id, order, stop_name = match
            url = copy_itinerary_stop_image(jpg, region, it_id, stop_name)
            key = f"{region}|{it_id}|{order}"
            manifest[key] = url
            print(f"  itinerary: {region}/{it_id}/{stop_name}")

    return manifest


def write_directory_image_manifest(
    imported: dict[str, dict[str, tuple[str, str]]],
    merge_existing: bool = True,
) -> None:
    """Map region|normalized-listing-name -> landscape URL for directory rows."""
    manifest: dict[str, str] = {}
    if merge_existing and DIRECTORY_IMAGE_MANIFEST.exists():
        manifest = json.loads(DIRECTORY_IMAGE_MANIFEST.read_text())

    for region, props in imported.items():
        title_map = MDX_TITLE_TO_SLUG.get(region, {})
        dir_names = DIRECTORY_LISTING_NAMES.get(region, {})

        for prop_slug, (landscape, _portrait) in props.items():
            if prop_slug == "__hero__" or not landscape:
                continue

            label = dir_names.get(prop_slug)
            if not label:
                for title_key, slug in title_map.items():
                    if slug == prop_slug:
                        label = title_key
                        break

            if not label:
                continue

            key = f"{region}|{normalize_match_text(label)}"
            manifest[key] = landscape

    DIRECTORY_IMAGE_MANIFEST.write_text(json.dumps(manifest, indent=2) + "\n")
    print(f"\nDirectory image manifest: {len(manifest)} keys")


def write_itinerary_manifest(
    new_entries: dict[str, str],
    merge_existing: bool = True,
) -> None:
    existing: dict[str, str] = {}
    if merge_existing and ITINERARY_MANIFEST.exists():
        existing = json.loads(ITINERARY_MANIFEST.read_text())

    merged = {**existing, **new_entries}
    ITINERARY_MANIFEST.write_text(json.dumps(merged, indent=2) + "\n")
    print(f"\nItinerary manifest: {len(new_entries)} new, {len(merged)} total keys")


def import_region_scroll_reveals(source_dir: Path) -> int:
    """Sync homepage appellation hover stills from 00_Homepage/02_Region_Scroll_Reveals."""
    reveals_root = source_dir / "00_Homepage" / "02_Region_Scroll_Reveals"
    if not reveals_root.is_dir():
        print(f"  scroll-reveals: no folder at {reveals_root}")
        return 0

    copied = 0
    for folder in sorted(reveals_root.iterdir()):
        if not folder.is_dir():
            continue

        prefix = folder.name.split("_(")[0]
        slug = SCROLL_REVEAL_FOLDER_SLUG.get(prefix)
        if not slug:
            print(f"  scroll-reveals: unmapped folder {folder.name}")
            continue

        dest_dir = SCROLL_REVEALS_DIR / slug
        dest_dir.mkdir(parents=True, exist_ok=True)
        jpgs = sorted(folder.glob("*.jpg"))
        for jpg in jpgs[:2]:
            dest_name = f"{slugify_stem(jpg.stem)}.jpg"
            shutil.copy2(jpg, dest_dir / dest_name)
            copied += 1
            print(f"  scroll-reveals: {slug}/{dest_name}")

    return copied


def import_region_file(
    file_path: Path,
    rel_parts: list[str],
    imported: dict[str, dict[str, tuple[str, str]]],
) -> None:
    if len(rel_parts) < 2:
        return

    prefix = rel_parts[0]
    region = REGION_PREFIX.get(prefix)
    if not region:
        return

    name = str(file_path)
    stem = file_path.stem
    imported.setdefault(region, {})

    if "Hero_" in name or "hero_" in name:
        hero_dir = IMAGES / region / "hero"
        hero_dir.mkdir(parents=True, exist_ok=True)
        if "16x9" in stem or "16X9" in stem:
            dest = hero_dir / f"{region}-hero-landscape.jpg"
            imported[region]["__hero__"] = (
                f"/images/{region}/hero/{region}-hero-landscape.jpg",
                "",
            )
        elif "2x3" in stem or "2X3" in stem:
            dest = hero_dir / f"{region}-hero-portrait.jpg"
        else:
            return
        shutil.copy2(file_path, dest)
        return

    if "Properties_" not in name:
        return

    mapping = PROPERTY_MAP.get(region, {})
    entry = mapping.get(stem)
    if not entry:
        print(f"  unmapped: {'/'.join(rel_parts)}")
        return

    section, prop_slug = entry
    if prop_slug.endswith("-alt"):
        return

    urls = copy_pair(file_path, region, section, prop_slug)
    imported[region][prop_slug] = urls
    print(f"  {region}/{section}/{prop_slug}")


def copy_pair(src: Path, region: str, section: str, prop_slug: str) -> tuple[str, str]:
    dest_dir = IMAGES / region / section
    dest_dir.mkdir(parents=True, exist_ok=True)
    base = slug_for_path(region, section, prop_slug)
    landscape = dest_dir / f"{base}-landscape.jpg"
    portrait = dest_dir / f"{base}-portrait.jpg"
    from featured_image_portrait import copy_featured_pair

    copy_featured_pair(src, landscape, portrait)
    return (
        f"/images/{region}/{section}/{base}-landscape.jpg",
        f"/images/{region}/{section}/{base}-portrait.jpg",
    )


def finalize_hero_imported(
    imported: dict[str, dict[str, tuple[str, str]]],
) -> dict[str, dict[str, tuple[str, str]]]:
    for region in REGION_PREFIX.values():
        hero_p = IMAGES / region / "hero" / f"{region}-hero-portrait.jpg"
        hero_l = IMAGES / region / "hero" / f"{region}-hero-landscape.jpg"
        if hero_l.exists() and region in imported:
            imported[region]["__hero__"] = (
                f"/images/{region}/hero/{region}-hero-landscape.jpg",
                f"/images/{region}/hero/{region}-hero-portrait.jpg"
                if hero_p.exists()
                else f"/images/{region}/hero/{region}-hero-landscape.jpg",
            )
    return imported


def merge_imported(
    target: dict[str, dict[str, tuple[str, str]]],
    source: dict[str, dict[str, tuple[str, str]]],
) -> None:
    for region, props in source.items():
        target.setdefault(region, {})
        target[region].update(props)


def import_region_properties_folder(
    region: str,
    folder: Path,
    imported: dict[str, dict[str, tuple[str, str]]],
) -> None:
    """Import flat Properties/*.jpg folder for one region slug."""
    mapping = PROPERTY_MAP.get(region, {})
    imported.setdefault(region, {})
    for jpg in sorted(folder.glob("*.jpg")):
        entry = mapping.get(jpg.stem)
        if not entry:
            print(f"  overlay unmapped: {region}/{jpg.name}")
            continue
        section, prop_slug = entry
        if prop_slug.endswith("-alt"):
            continue
        urls = copy_pair(jpg, region, section, prop_slug)
        imported[region][prop_slug] = urls
        print(f"  overlay {region}/{section}/{prop_slug}")


def import_overlay_dirs(
    overlay_dirs: list[Path],
    imported: dict[str, dict[str, tuple[str, str]]],
) -> dict[str, dict[str, tuple[str, str]]]:
    """Apply newer property stills from partial Drive sync folders."""
    region_slugs = set(REGION_PREFIX.values())

    for overlay in overlay_dirs:
        if not overlay.is_dir():
            print(f"  overlay skip (missing): {overlay}")
            continue

        print(f"\nOverlay properties from {overlay}...")

        if any((overlay / prefix).is_dir() for prefix in REGION_PREFIX):
            merge_imported(imported, import_from_dir(overlay))
            continue

        for sub in sorted(overlay.iterdir()):
            if not sub.is_dir():
                continue
            if sub.name in region_slugs:
                import_region_properties_folder(sub.name, sub, imported)
            elif sub.name.startswith("Properties"):
                # e.g. .tmp-drive-sync/01_Oakville/Properties_... only
                parent = overlay.parent
                region_prefix = overlay.parent.name
                region = REGION_PREFIX.get(region_prefix)
                if region:
                    import_region_properties_folder(region, overlay, imported)

    return finalize_hero_imported(imported)


def import_from_dir(source_dir: Path) -> dict[str, dict[str, tuple[str, str]]]:
    imported: dict[str, dict[str, tuple[str, str]]] = {}
    if not source_dir.is_dir():
        raise SystemExit(f"Drive folder not found: {source_dir}")

    for jpg in sorted(source_dir.rglob("*.jpg")):
        rel = jpg.relative_to(source_dir)
        if is_original_path(str(rel)):
            continue
        import_region_file(jpg, list(rel.parts), imported)

    return finalize_hero_imported(imported)


def import_from_zip(zip_path: Path) -> dict[str, dict[str, tuple[str, str]]]:
    """Returns region -> prop_slug -> (landscape_url, portrait_url). Use primary slug only."""
    imported: dict[str, dict[str, tuple[str, str]]] = {}
    if not zip_path.exists():
        raise SystemExit(f"Zip not found: {zip_path}")

    with zipfile.ZipFile(zip_path) as zf:
        for name in zf.namelist():
            lower = name.lower()
            if not lower.endswith(".jpg"):
                continue
            if is_original_path(name):
                continue

            parts = name.split("/")
            if len(parts) < 2:
                continue

            stem = Path(name).stem
            prefix = parts[0]
            region = REGION_PREFIX.get(prefix)
            if not region:
                continue

            imported.setdefault(region, {})

            if "Hero_" in name or "hero_" in name:
                hero_dir = IMAGES / region / "hero"
                hero_dir.mkdir(parents=True, exist_ok=True)
                if "16x9" in stem or "16X9" in stem:
                    dest = hero_dir / f"{region}-hero-landscape.jpg"
                    imported[region]["__hero__"] = (
                        f"/images/{region}/hero/{region}-hero-landscape.jpg",
                        "",
                    )
                elif "2x3" in stem or "2X3" in stem:
                    dest = hero_dir / f"{region}-hero-portrait.jpg"
                else:
                    continue
                with zf.open(name) as src, open(dest, "wb") as out:
                    shutil.copyfileobj(src, out)
                continue

            if "Properties_" not in name:
                continue

            mapping = PROPERTY_MAP.get(region, {})
            entry = mapping.get(stem)
            if not entry:
                print(f"  unmapped: {name}")
                continue

            section, prop_slug = entry
            if prop_slug.endswith("-alt"):
                continue

            tmp = ROOT / ".tmp-import" / f"{stem}.jpg"
            tmp.parent.mkdir(parents=True, exist_ok=True)
            with zf.open(name) as src, open(tmp, "wb") as out:
                shutil.copyfileobj(src, out)
            urls = copy_pair(tmp, region, section, prop_slug)
            imported[region][prop_slug] = urls
            print(f"  {region}/{section}/{prop_slug}")

    shutil.rmtree(ROOT / ".tmp-import", ignore_errors=True)
    return finalize_hero_imported(imported)


def inject_mdx(region: str, urls_by_slug: dict[str, tuple[str, str]]) -> None:
    mdx_path = MDX_DIR / f"{region}.mdx"
    if not mdx_path.exists():
        return
    text = mdx_path.read_text()
    title_map = MDX_TITLE_TO_SLUG.get(region, {})

    # Frontmatter heroes
    hero = urls_by_slug.get("__hero__")
    if hero:
        text = re.sub(
            r"^heroImage:.*$",
            f"heroImage: {hero[0]}",
            text,
            count=1,
            flags=re.M,
        )
        if "heroImagePortrait:" in text:
            text = re.sub(
                r"^heroImagePortrait:.*$",
                f"heroImagePortrait: {hero[1]}",
                text,
                count=1,
                flags=re.M,
            )
        elif hero[1]:
            text = re.sub(
                r"(^heroImage:.*\n)",
                rf"\1heroImagePortrait: {hero[1]}\n",
                text,
                count=1,
                flags=re.M,
            )

    for title_key, prop_slug in title_map.items():
        pair = urls_by_slug.get(prop_slug)
        if not pair:
            continue
        landscape, portrait = pair
        pattern = rf"(### [^\n]*{re.escape(title_key)}[^\n]*\n(?:.*?\n)*?)(?=\n### |\n## |\n# |\Z)"
        def repl(m: re.Match[str]) -> str:
            block = m.group(1)
            if "**Image:**" in block:
                block = re.sub(r"- \*\*Image:\*\*.*\n", f"- **Image:** {landscape}\n", block)
                if "**ImagePortrait:**" in block:
                    block = re.sub(
                        r"- \*\*ImagePortrait:\*\*.*\n",
                        f"- **ImagePortrait:** {portrait}\n",
                        block,
                    )
                else:
                    block = re.sub(
                        r"(- \*\*Image:\*\*[^\n]+\n)",
                        rf"\1- **ImagePortrait:** {portrait}\n",
                        block,
                    )
            else:
                block += f"- **Image:** {landscape}\n- **ImagePortrait:** {portrait}\n"
            return block

        text, n = re.subn(pattern, repl, text, count=1)
        if n:
            print(f"  mdx {region}: {title_key}")

    mdx_path.write_text(text)


def main() -> None:
    parser = argparse.ArgumentParser(description="Import Napa Guide Digital Drive image assets")
    parser.add_argument(
        "--zip",
        type=Path,
        default=DEFAULT_ZIP,
        help="Path to Drive export zip (regions 01–06)",
    )
    parser.add_argument(
        "--dir",
        type=Path,
        default=None,
        help="Unzipped Drive folder (e.g. .tmp-drive-import)",
    )
    parser.add_argument(
        "--mosaic-only",
        action="store_true",
        help="Only refresh homepage hero mosaic tiles from 00_Homepage",
    )
    parser.add_argument(
        "--scroll-reveals-only",
        action="store_true",
        help="Only refresh homepage region scroll-reveal stills from 00_Homepage",
    )
    parser.add_argument(
        "--itinerary-only",
        action="store_true",
        help="Only import itinerary stop stills from Drive Itinerary/Itinieries folders",
    )
    parser.add_argument(
        "--skip-mdx",
        action="store_true",
        help="Copy files only; do not update region MDX image paths",
    )
    parser.add_argument(
        "--overlay",
        type=Path,
        action="append",
        default=[],
        metavar="DIR",
        help="Extra folder(s) with newer Properties stills (merged after main import)",
    )
    args = parser.parse_args()

    default_overlays = [
        ROOT / ".tmp-drive-sync",
        ROOT / ".tmp-region-properties",
    ]
    overlay_dirs = list(args.overlay)
    for path in default_overlays:
        if path.is_dir() and path not in overlay_dirs:
            overlay_dirs.append(path)

    source_dir = args.dir or ROOT / ".tmp-drive-import"
    if args.mosaic_only:
        print(f"Refreshing homepage mosaic from {source_dir}...")
        count = import_homepage_mosaic(source_dir)
        print(f"Mosaic: {count} files updated. Drive: {DRIVE_FOLDER_URL}")
        return

    if args.scroll_reveals_only:
        print(f"Refreshing homepage scroll-reveals from {source_dir}...")
        count = import_region_scroll_reveals(source_dir)
        print(f"Scroll-reveals: {count} files updated.")
        return

    if args.itinerary_only:
        if not source_dir.is_dir():
            raise SystemExit(f"Drive folder not found: {source_dir}")
        print(f"Importing itinerary stills from {source_dir}...")
        manifest = import_itinerary_images(source_dir)
        write_itinerary_manifest(manifest)
        print(f"\nDone. Drive source: {DRIVE_FOLDER_URL}")
        return

    imported: dict[str, dict[str, tuple[str, str]]] = {}
    if args.dir:
        print(f"Importing regions from folder: {args.dir}")
        imported = import_from_dir(args.dir)
    else:
        print(f"Importing regions from zip: {args.zip}")
        imported = import_from_zip(args.zip)

    if overlay_dirs:
        imported = import_overlay_dirs(overlay_dirs, imported)

    if source_dir.is_dir():
        print(f"\nRefreshing homepage mosaic from {source_dir}...")
        import_homepage_mosaic(source_dir)
        print(f"\nRefreshing homepage scroll-reveals from {source_dir}...")
        import_region_scroll_reveals(source_dir)
        print(f"\nImporting itinerary stills from {source_dir}...")
        write_itinerary_manifest(import_itinerary_images(source_dir))

    write_directory_image_manifest(imported)

    if not args.skip_mdx:
        print("\nUpdating MDX...")
        for region in REGION_PREFIX.values():
            if region in imported:
                inject_mdx(region, imported[region])

    print(f"\nDone. Drive source: {DRIVE_FOLDER_URL}")


if __name__ == "__main__":
    main()
