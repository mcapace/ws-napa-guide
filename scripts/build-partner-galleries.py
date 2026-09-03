#!/usr/bin/env python3
"""Process all partner source photography and emit gallery manifest."""

from __future__ import annotations

import json
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / 'public' / 'images' / 'partners'
MANIFEST = ROOT / 'src' / 'data' / 'partner-galleries.manifest.json'

SKIP_NAMES = {'16a42ee1-7f3b-443a-9363-55ab447187ff.png'}
SKIP_ST_HELENA = {'1.jpg', '2.jpg', '4.jpg', '5.jpg', '6.jpg', '7.jpg'}
IMAGE_EXTS = {'.jpg', '.jpeg', '.png', '.tif', '.tiff', '.JPG', '.JPEG'}


def to_jpg(src: Path, dest: Path, max_w: int = 2000, quality: int = 86) -> None:
    im = Image.open(src).convert('RGB')
    w, h = im.size
    if w > max_w:
        nh = int(round(h * max_w / w))
        im = im.resize((max_w, nh), Image.Resampling.LANCZOS)
    dest.parent.mkdir(parents=True, exist_ok=True)
    im.save(dest, 'JPEG', quality=quality, optimize=True, progressive=True)


def process_gallery(slug: str, items: list[dict]) -> list[dict]:
    out_dir = PUBLIC / slug
  # remove old gallery files
    for old in out_dir.glob('gallery-*.jpg'):
        old.unlink()

    manifest_items: list[dict] = []
    for i, item in enumerate(items, start=1):
        src = Path(item['src'])
        if not src.exists():
            raise FileNotFoundError(f'Missing source for {slug}: {src}')
        dest = out_dir / f'gallery-{i:02d}.jpg'
        to_jpg(src, dest)
        manifest_items.append(
            {
                'src': f'/images/partners/{slug}/gallery-{i:02d}.jpg',
                'alt': item['alt'],
                'category': item['category'],
            }
        )
        print(f'  {slug} gallery-{i:02d} <- {src.name}')
    return manifest_items


def main() -> None:
    tmp_hall = ROOT / '.tmp-hall-assets' / 'photos'
    tmp_hall_tifs = tmp_hall / 'tifs'
    tmp_rutherford = ROOT / '.tmp-hall-rutherford' / 'photos'
    tmp_walt = ROOT / '.tmp-walt-assets' / 'photos'

    galleries: dict[str, list[dict]] = {
        'hall-st-helena': [
            {'src': tmp_hall / 'SH_tasting_room_01.jpg', 'alt': 'The modern tasting room bar at HALL St. Helena', 'category': 'tasting'},
            {'src': tmp_hall / '20190508_Hall_18528.jpg', 'alt': 'Cabernet Sauvignon bottles in the HALL St. Helena tasting room', 'category': 'tasting'},
            {'src': tmp_hall / '20190508_Hall_19071.jpg', 'alt': 'A flight of HALL wines poured at the gallery bar', 'category': 'tasting'},
            {'src': tmp_hall / '20190508_Hall_19165.jpg', 'alt': 'Seasonal culinary bites paired with estate Cabernet', 'category': 'tasting'},
            {'src': tmp_hall / '20190508_Hall_19797_2017.jpg', 'alt': 'Guests toasting with HALL wines on the estate lawn', 'category': 'tasting'},
            {'src': tmp_hall / 'hall_0240.jpg', 'alt': 'Guests with Cabernet beside contemporary art at HALL St. Helena', 'category': 'tasting'},
            {'src': tmp_hall / 'IMG_0382.jpg', 'alt': 'Private seated tasting in the HALL St. Helena lounge', 'category': 'tasting'},
            {'src': tmp_hall / 'IMG_0366.jpg', 'alt': 'Outdoor tasting with vineyard views at HALL St. Helena', 'category': 'tasting'},
            {'src': tmp_hall / 'IMG_0344.jpg', 'alt': 'Reflections of the Valley bar tasting at HALL St. Helena', 'category': 'tasting'},
            {'src': tmp_hall / 'DSC_4119.jpg', 'alt': 'Wine and art in the HALL St. Helena gallery', 'category': 'tasting'},
            {'src': tmp_hall_tifs / 'Hall-Wines-1397.tif', 'alt': 'Estate Cabernet bottles in the HALL collection', 'category': 'tasting'},
            {'src': tmp_hall_tifs / 'hall_wines_0612.tif', 'alt': 'Current-release HALL wines on the tasting bar', 'category': 'tasting'},
            {'src': tmp_hall_tifs / 'Hall-Bergfeld-Experience-065.tif', 'alt': 'Bergfeld Vineyard Cabernet tasting experience', 'category': 'tasting'},
            {'src': tmp_hall / '022719 Hall Winery 9.JPG', 'alt': 'Tasting room hospitality at HALL St. Helena', 'category': 'tasting'},
            {'src': tmp_hall / '022719 Hall Winery 26.JPG', 'alt': 'Guests enjoying wine on the HALL St. Helena patio', 'category': 'tasting'},
            {'src': tmp_hall / '022719 Hall Winery 29.JPG', 'alt': 'Wine service at the HALL St. Helena bar', 'category': 'tasting'},
            {'src': tmp_hall / 'HALL Bunny Foo Foo Sky.jpg', 'alt': 'Bunny Foo-Foo welcomes guests at the HALL St. Helena entrance', 'category': 'estate'},
            {'src': tmp_hall / 'DJI_0116.jpg', 'alt': 'Aerial view of the HALL St. Helena estate and vineyards', 'category': 'estate'},
            {'src': tmp_hall / 'DJI_0119_retouch.jpg', 'alt': 'Aerial perspective of the Bergfeld Vineyard estate', 'category': 'estate'},
            {'src': tmp_hall / 'DJI_0063.jpg', 'alt': 'Vineyard rows at the base of the Mayacamas Mountains', 'category': 'vineyard'},
            {'src': tmp_hall / 'DJI_0026.jpg', 'alt': 'The HALL St. Helena property from above', 'category': 'estate'},
            {'src': tmp_hall / 'IMG_0736.jpg', 'alt': 'The historic stone winery building at HALL St. Helena', 'category': 'estate'},
            {'src': tmp_hall / 'IMG_0252.jpg', 'alt': 'Garden paths through the HALL St. Helena grounds', 'category': 'estate'},
            {'src': tmp_hall / 'IMG_0117.jpg', 'alt': 'Estate grounds and vineyard views at HALL St. Helena', 'category': 'vineyard'},
            {'src': tmp_hall / 'IMG_0068.jpg', 'alt': 'The HALL St. Helena production facility and grounds', 'category': 'estate'},
            {'src': tmp_hall / 'IMG_0028.jpg', 'alt': 'Vineyard landscape at HALL St. Helena', 'category': 'vineyard'},
            {'src': tmp_hall / 'Graham-Caldwel_MJN_0044_768px.jpg', 'alt': 'Graham Caldwell sculpture on the HALL St. Helena grounds', 'category': 'art'},
            {'src': tmp_hall / 'Jim-Drain_Ara-Peterson_MJN_0059_768px.jpg', 'alt': 'Jim Drain and Ara Peterson artwork at HALL St. Helena', 'category': 'art'},
            {'src': tmp_hall / 'Spencer-Finch_DSC_4087_768px.jpg', 'alt': 'Spencer Finch installation in the HALL gallery', 'category': 'art'},
        ],
        'hall-rutherford': [
            {'src': tmp_rutherford / 'rutherford_0397.tif', 'alt': 'Sunset terrace tasting with Sacrashe Vineyard views', 'category': 'tasting'},
            {'src': tmp_rutherford / 'DSCF8042.jpg', 'alt': 'Private tasting salon upstairs at HALL Rutherford', 'category': 'tasting'},
            {'src': tmp_rutherford / 'HALL Rutherford May 2015-11.jpg', 'alt': 'The Chandelier Room through the barrel caves', 'category': 'tasting'},
            {'src': tmp_rutherford / 'HALL Rutherford May 2015-20.jpg', 'alt': 'Guests enjoying wine in the upstairs salon', 'category': 'tasting'},
            {'src': tmp_rutherford / 'HALL Rutherford May 2015-19.jpg', 'alt': 'The Chandelier Room set for a private cave tasting', 'category': 'tasting'},
            {'src': tmp_rutherford / 'HALL Rutherford May 2015-14.jpg', 'alt': 'Seated cave tasting beneath the Chilean Red chandelier', 'category': 'tasting'},
            {'src': tmp_rutherford / 'DSCF8984.jpg', 'alt': 'Valley views from the HALL Rutherford terrace', 'category': 'tasting'},
            {'src': tmp_rutherford / 'rutherford_0421.tif', 'alt': 'Vineyard rows on the Rutherford estate at dusk', 'category': 'vineyard'},
            {'src': tmp_rutherford / 'rutherford_0455.tif', 'alt': 'Panoramic Napa Valley views from the terrace', 'category': 'vineyard'},
            {'src': tmp_rutherford / 'DSCF9036_CROP.jpg', 'alt': 'Sacrashe Vineyard vines at HALL Rutherford', 'category': 'vineyard'},
            {'src': tmp_rutherford / 'HALL Rutherford May 2015-10.jpg', 'alt': 'Rows of barrels under the vaulted cave ceiling', 'category': 'estate'},
            {'src': tmp_rutherford / 'HALL Rutherford May 2015-9.jpg', 'alt': 'Barrel aging caves at HALL Rutherford', 'category': 'estate'},
            {'src': tmp_rutherford / 'Rutherford Interior Tanks EDIT.jpg', 'alt': 'Production tanks opening into the wine caves', 'category': 'estate'},
            {'src': tmp_rutherford / 'HALL Rutherford May 2015-22.jpg', 'alt': 'Crystal detail of the Chilean Red chandelier', 'category': 'art'},
            {'src': tmp_rutherford / 'HALL Rutherford May 2015-21.jpg', 'alt': 'Donald Lipski chandelier installation in the cave', 'category': 'art'},
            {'src': tmp_rutherford / 'HALL Rutherford May 2015-23.jpg', 'alt': 'Art and architecture inside the HALL Rutherford caves', 'category': 'art'},
            {'src': tmp_rutherford / 'rutherford_0380_tight.tif', 'alt': 'Estate Cabernet aging in French oak barrels', 'category': 'estate'},
            {'src': tmp_rutherford / 'rutherford_setting_photo.jpg', 'alt': 'The Chandelier Room long table at HALL Rutherford', 'category': 'estate'},
            {'src': tmp_rutherford / 'TheWomanBehindTheWIne_2863.RTarm.jpg', 'alt': 'Kathryn Walt Hall among the vines at HALL Rutherford', 'category': 'vineyard'},
        ],
        'walt-napa-oxbow': [
            {'src': tmp_walt / '2021.07.16.WaltWines1062.tif', 'alt': 'A lineup of single-vineyard WALT Pinot Noir and Chardonnay bottles', 'category': 'tasting'},
            {'src': tmp_walt / 'walt_4231.tif', 'alt': 'Pinot Noir poured on the Oxbow terrace at golden hour', 'category': 'tasting'},
            {'src': tmp_walt / '2021.07.26.WaltWines3642.jpg', 'alt': 'WALT Pinot Noir bottles on the lounge tasting table', 'category': 'tasting'},
            {'src': tmp_walt / 'walt_4939.tif', 'alt': 'Intimate seated tasting with WALT wines in the Oxbow lounge', 'category': 'tasting'},
            {'src': tmp_walt / '2021.07.26.WaltWines3652.jpg', 'alt': 'Couple enjoying Pinot Noir amid the Hall collection at WALT Napa Oxbow', 'category': 'tasting'},
            {'src': tmp_walt / '2021.07.26.WaltWines3656.jpg', 'alt': 'Close-up of WALT Pinot Noir bottles at the tasting bar', 'category': 'tasting'},
            {'src': tmp_walt / '2021.07.26.WaltWines2528.jpg', 'alt': 'WALT Pinot Noir bottles on the terrace at sunset', 'category': 'tasting'},
            {'src': tmp_walt / 'walt_4457.lowlights.tif', 'alt': 'Guests at the WALT Napa Oxbow tasting bar beneath gold pendant lights', 'category': 'tasting'},
            {'src': tmp_walt / '2021.07.26.WaltWines2266.jpg', 'alt': 'Rosé and Pinot Noir on the Oxbow terrace', 'category': 'tasting'},
            {'src': tmp_walt / '2021.07.26.WaltWines2371.jpg', 'alt': 'WALT wines with guests on the outdoor patio', 'category': 'tasting'},
            {'src': tmp_walt / '2021.07.26.WaltWines2379.jpg', 'alt': 'Outdoor tasting with WALT Pinot Noir on the terrace', 'category': 'tasting'},
            {'src': tmp_walt / '2021.07.26.WaltWines2394.jpg', 'alt': 'White wine tasting on the WALT Oxbow patio', 'category': 'tasting'},
            {'src': tmp_walt / 'walt_4997_edited.tif', 'alt': 'Evening tasting on the WALT Oxbow terrace with Oxbow Public Market beyond', 'category': 'tasting'},
            {'src': tmp_walt / 'walt_5022.tif', 'alt': 'Couple sharing wine on the Oxbow terrace at dusk', 'category': 'tasting'},
            {'src': tmp_walt / 'walt_4634.tif', 'alt': 'The WALT Napa Oxbow tasting room with gold pendant lights and art', 'category': 'estate'},
            {'src': tmp_walt / 'walt_4866.tif', 'alt': 'Private lounge seating with tasting glasses at WALT Napa Oxbow', 'category': 'estate'},
            {'src': tmp_walt / '2021.07.26.WaltWines0440.jpg', 'alt': 'WALT Napa Oxbow exterior on First Street in the Oxbow district', 'category': 'estate'},
            {'src': tmp_walt / '2021.07.26.WaltWines3250.jpg', 'alt': 'Outdoor patio with WALT umbrellas steps from Oxbow Public Market', 'category': 'estate'},
            {'src': tmp_walt / '2021.07.26.WaltWines4424.jpg', 'alt': 'The WALT tasting cottage on the corner of First Street', 'category': 'estate'},
            {'src': tmp_walt / '2021.07.26.WaltWines0246.jpg', 'alt': 'WALT Pinot Noir signage on the Oxbow porch', 'category': 'estate'},
        ],
    }

    manifest: dict[str, list[dict]] = {}
    for slug, items in galleries.items():
        print(f'Processing {slug} ({len(items)} images)...')
        manifest[slug] = process_gallery(slug, items)

    MANIFEST.write_text(json.dumps(manifest, indent=2) + '\n')
    print(f'Wrote {MANIFEST}')


if __name__ == '__main__':
    main()
