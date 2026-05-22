#!/usr/bin/env python3
"""Import region hero + property JPGs from Wine Spectator drive zip."""

from __future__ import annotations

import re
import shutil
import zipfile
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
ZIP_PATH = Path("/Users/mcapace/Desktop/drive-download-20260522T124716Z-3-001.zip")
IMAGES = ROOT / "public" / "images"
MDX_DIR = ROOT / "src" / "content" / "regions"

REGION_PREFIX = {
    "01_Oakville": "oakville",
    "02_Yountville": "yountville",
    "03_Rutherford": "rutherford",
    "04_St_Helena": "st-helena",
    "05_Calistoga": "calistoga",
    "06_Downtown_Napa": "downtown-napa",
}

# zip stem (without extension) -> (section folder, property slug)
PROPERTY_MAP: dict[str, dict[str, tuple[str, str]]] = {
    "oakville": {
        "Oakville_Cardinale": ("wineries", "cardinale"),
        "Oakville_FarNiente": ("wineries", "far-niente"),
        "Oakville_Nickel": ("wineries", "nickel-and-nickel"),
        "Oakville_Rudd": ("wineries", "rudd-estate"),
        "Oakville_Brix": ("restaurants", "brix"),
        "Oakville_Mustards": ("restaurants", "mustards-grill"),
        "Oakville_OakvilleGrocery": ("restaurants", "oakville-grocery"),
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
        "StHelena_Gelato": ("breakfast", "roman-holiday-gelato"),
        "StHelena_ModelBakery": ("breakfast", "model-bakery"),
        "StHelena_HarvestInn": ("hotels", "harvest-inn"),
        "StHelena_Alila": ("hotels", "alila-napa-valley"),
        "StHelena_Wydown": ("hotels", "wydown-hotel"),
    },
    "calistoga": {
        "Calistoga_Hourglass": ("wineries", "hourglass"),
        "StHelena_Larkmead": ("wineries", "larkmead"),
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
    },
    "calistoga": {
        "Hourglass": "hourglass",
        "Larkmead": "larkmead",
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


def slug_for_path(region: str, section: str, prop_slug: str) -> str:
    if section == "sidebar":
        return f"{region}-sidebar-{prop_slug}"
    if section == "breakfast":
        return f"{region}-breakfast-{prop_slug}"
    kind = SECTION_SINGULAR[section]
    return f"{region}-{kind}-{prop_slug}"


def copy_pair(src: Path, region: str, section: str, prop_slug: str) -> tuple[str, str]:
    dest_dir = IMAGES / region / section
    dest_dir.mkdir(parents=True, exist_ok=True)
    base = slug_for_path(region, section, prop_slug)
    landscape = dest_dir / f"{base}-landscape.jpg"
    portrait = dest_dir / f"{base}-portrait.jpg"
    shutil.copy2(src, landscape)
    shutil.copy2(src, portrait)
    return (
        f"/images/{region}/{section}/{base}-landscape.jpg",
        f"/images/{region}/{section}/{base}-portrait.jpg",
    )


def import_from_zip() -> dict[str, dict[str, tuple[str, str]]]:
    """Returns region -> prop_slug -> (landscape_url, portrait_url). Use primary slug only."""
    imported: dict[str, dict[str, tuple[str, str]]] = {}
    if not ZIP_PATH.exists():
        raise SystemExit(f"Zip not found: {ZIP_PATH}")

    with zipfile.ZipFile(ZIP_PATH) as zf:
        for name in zf.namelist():
            lower = name.lower()
            if not lower.endswith(".jpg"):
                continue
            if "/original" in lower or "/originals/" in lower:
                continue

            parts = name.split("/")
            if len(parts) < 2:
                continue
            prefix = parts[0]
            region = REGION_PREFIX.get(prefix)
            if not region:
                continue

            stem = Path(name).stem
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
                continue  # skip duplicate zip; primary handles lewis/quintessa/scala

            tmp = ROOT / ".tmp-import" / f"{stem}.jpg"
            tmp.parent.mkdir(parents=True, exist_ok=True)
            with zf.open(name) as src, open(tmp, "wb") as out:
                shutil.copyfileobj(src, out)
            urls = copy_pair(tmp, region, section, prop_slug)
            imported[region][prop_slug] = urls
            print(f"  {region}/{section}/{prop_slug}")

    shutil.rmtree(ROOT / ".tmp-import", ignore_errors=True)

    # Fix hero portrait paths in imported
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
        pattern = rf"(### [^\n]*{re.escape(title_key)}[^\n]*\n(?:- \*\*[^\n]+\*\*[^\n]*\n)*?)(?=\n### |\n## |\n# |\Z)"
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
    print("Importing from zip...")
    imported = import_from_zip()
    print("\nUpdating MDX...")
    for region in REGION_PREFIX.values():
        if region in imported:
            inject_mdx(region, imported[region])
    print("Done.")


if __name__ == "__main__":
    main()
