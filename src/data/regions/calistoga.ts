import { RegionMagazineData } from '../region-structured.types';

const IMG = '/test-images/test-vineyard-702x390.jpg';

export const calistogaData: RegionMagazineData = {
  slug: 'calistoga',
  title: 'CALISTOGA',
  subtitle: 'A Wine Country Retreat',
  author: 'Mitch Frank',
  heroImage: IMG,
  lede: `Calistoga is where Napa Valley goes to unwind. Founded in 1862 by Sam Brannan, California's first millionaire, as a hot-springs resort, the town retains an old-west charm that the rest of the valley has largely polished away. The main drag still has wooden sidewalks, and the old train depot is now a tasting room.\n\nBut Calistoga is no sleepy relic. A wave of new wineries, restaurants, and boutique hotels has brought fresh energy, while the natural hot springs and geysers that drew Brannan here remain the town's defining attraction. It's the only place in Napa where you can soak in volcanic mineral water after a day of tasting world-class Cabernet.`,

  taste: {
    intro: 'Calistoga sits at the top of the valley where volcanic soils and mountain elevations produce wines of uncommon intensity. The best producers here make Cabernets that are bold and structured, with a mineral backbone that distinguishes them from their neighbors to the south.',
    featured: [
      {
        name: 'Hourglass',
        address: '1104 Adams St., St. Helena',
        website: 'hourglasswines.com',
        image: IMG,
        writeup: 'Jeff and Carolyn Smith\'s estate produces some of the most elegant Cabernets in upper Napa. The Blueline Vineyard Merlot is a revelation — silky, complex, and age-worthy — while the estate Cabernet shows the kind of structure and finesse that only comes from old vines on volcanic soil. The tasting room, designed by Howard Backen, is a study in understated luxury.',
      },
      {
        name: 'Larkmead Vineyards',
        address: '1100 Larkmead Ln., Calistoga',
        website: 'larkmead.com',
        image: IMG,
        writeup: 'One of Napa\'s oldest continuously operating wineries, Larkmead has been producing wine since 1895. Winemaker Dan Petroski (also the founder of Massican) has brought a modern sensibility to the historic estate, making wines that honor the property\'s heritage while pushing into new territory. The Solari Cabernet is the flagship — dense, layered, and built for decades of aging.',
      },
      {
        name: 'Lola Wines',
        address: '1413 Lincoln Ave., Calistoga',
        website: 'lolawines.com',
        image: IMG,
        writeup: 'Seth and Layla Cripe\'s tiny tasting room on Lincoln Avenue is one of Calistoga\'s best-kept secrets. The focus is on small-lot wines from high-elevation vineyards — Grenache from Dry Creek, Syrah from Bennett Valley, Cabernet from Diamond Mountain. Everything is made in minuscule quantities, and the intimate tasting experience feels like drinking with friends in their living room.',
      },
      {
        name: 'Schramsberg Vineyards',
        address: '1400 Schramsberg Rd., Calistoga',
        website: 'schramsberg.com',
        image: IMG,
        writeup: 'America\'s most storied sparkling wine house, founded in 1862 by Jacob Schram and revived by Jack and Jamie Davies in 1965. The cave tour is Napa\'s best — a candlelit walk through 2.7 miles of tunnels dug by Chinese laborers in the 1870s, ending with a seated tasting of méthode traditionnelle sparklers that rival Champagne. The J. Schram Brut is the icon, but the Blanc de Noirs and Brut Rosé are equally stunning.',
      },
    ],
    alsoRecommended: [
      { name: 'Aubert Wines', address: '333 Silverado Trail, Calistoga', website: 'aubertwines.com' },
      { name: 'Bennett Lane Winery', address: '3340 Hwy. 128, Calistoga', website: 'bennettlane.com' },
      { name: 'CADE Estate Winery', address: '360 Howell Mountain Rd. S., Angwin', website: 'cadewinery.com' },
      { name: 'Castello di Amorosa', address: '4045 St. Helena Hwy., Calistoga', website: 'castellodiamorosa.com' },
      { name: 'Frank Family Vineyards', address: '1091 Larkmead Ln., Calistoga', website: 'frankfamilyvineyards.com' },
      { name: 'Girard Winery', address: '6795 Washington St., Yountville', website: 'girardwinery.com' },
      { name: 'Outpost Wines', address: '2075 Summit Lake Dr., Angwin', website: 'outpostwines.com' },
      { name: 'Rivers-Marie', address: '1420 Washington St., Calistoga', website: 'riversmarie.com' },
      { name: 'Spire Collection', address: '1429 Tubbs Ln., Calistoga', website: 'spirecollection.com' },
      { name: 'Sterling Vineyards', address: '1111 Dunaweal Ln., Calistoga', website: 'sterlingvineyards.com' },
      { name: 'Tamber Bey', address: '1251 Tubbs Ln., Calistoga', website: 'tamberbey.com' },
      { name: 'Tank Garage Winery', address: '1020 Foothill Blvd., Calistoga', website: 'tankgaragewinery.com' },
      { name: 'Trois Noix', address: '1125 Lincoln Ave., Calistoga', website: 'troisnoix.com' },
      { name: 'Vine Cliff Winery', address: '7400 Silverado Trail, Napa', website: 'vinecliff.com' },
    ],
  },

  eat: {
    intro: 'Calistoga\'s dining scene is small but growing. A handful of serious restaurants have opened in recent years, joining longtime favorites that have fed wine country visitors for decades.',
    featured: [
      {
        name: 'Calistoga Inn & Brewery',
        address: '1250 Lincoln Ave., Calistoga',
        website: 'calistogainn.com',
        image: IMG,
        writeup: 'The only brewpub in Napa Valley occupies a charming 1882 building on Lincoln Avenue. The house-brewed ales are a welcome change from Cabernet, and the courtyard patio — shaded by an enormous California live oak — is one of the most pleasant outdoor dining spots in the valley. The menu is pub fare elevated: burgers with local cheese, fish and chips with fresh-caught rock cod, wood-fired pizzas.',
      },
      {
        name: 'Lovina',
        address: '1107 Cedar St., Calistoga',
        website: 'lovinacalistoga.com',
        image: IMG,
        writeup: 'Chef Rodrigo Huerta\'s Calistoga restaurant brings Southeast Asian flavors to wine country in a way that somehow makes perfect sense. The green papaya salad, Vietnamese-style pork chop, and coconut curry are revelations, and the wine list is smartly curated to pair with the bright, spicy flavors. The converted bungalow setting is intimate and romantic.',
      },
    ],
    alsoRecommended: [
      { name: 'Auro', address: '1400 Lincoln Ave., Calistoga', website: 'aurocalistoga.com' },
      { name: 'Bricco Osteria', address: '1245 Lincoln Ave., Calistoga' },
      { name: 'Buster\'s BBQ', address: '1207 Foothill Blvd., Calistoga', website: 'bustersbbqcalistoga.com' },
      { name: 'Evangeline', address: '1226 Washington St., Calistoga', website: 'evangelinenapa.com' },
      { name: 'Fleetwood', address: '1310 Lincoln Ave., Calistoga', website: 'fleetwoodcalistoga.com' },
      { name: 'House of Better', address: '1341 Lincoln Ave., Calistoga' },
      { name: 'Solbar', address: '755 Silverado Trail, Calistoga', website: 'solbar.com' },
      { name: 'The Living Room at TRUSS', address: '4048 Sonoma Hwy., Napa' },
    ],
    breakfastCoffee: {
      featured: [
        {
          name: 'Café Sarafornia',
          address: '1413 Lincoln Ave., Calistoga',
          website: 'cafesarafornia.com',
          image: IMG,
          writeup: 'The breakfast institution of Calistoga. Locals and visitors pack this no-frills diner every morning for enormous omelets, fluffy pancakes, and the best huevos rancheros in the valley. Get here early on weekends — the line forms before the door opens.',
        },
      ],
      alsoRecommended: [
        { name: 'Calistoga Roastery', address: '1426 Lincoln Ave., Calistoga', website: 'calistogaroastery.com' },
        { name: 'Palisades Eatery', address: '1419 Lincoln Ave., Calistoga' },
        { name: 'Sam\'s General Store', address: '1110 Lincoln Ave., Calistoga' },
      ],
    },
  },

  stay: {
    intro: 'Calistoga\'s unique selling point is its natural hot springs. Several hotels offer volcanic mineral water soaking pools, mud baths, and geothermal spa treatments you won\'t find anywhere else in the valley.',
    featured: [
      {
        name: 'Francis House',
        address: '1403 Myrtle St., Calistoga',
        website: 'francishousenapavalley.com',
        image: IMG,
        writeup: 'This five-room boutique inn occupies one of Calistoga\'s most beautiful historic homes, built in 1886 by a local politician. The restoration is impeccable — original redwood paneling, period fixtures, and a wraparound veranda — but the amenities are thoroughly modern. Each room has a deep soaking tub, Malin+Goetz toiletries, and access to the garden hot-spring pool.',
      },
      {
        name: 'Solage',
        address: '755 Silverado Trail, Calistoga',
        website: 'aubergeresorts.com/solage',
        image: IMG,
        writeup: 'An Auberge resort that brings a contemporary, California-cool vibe to Calistoga\'s hot-springs tradition. The signature Mudslide treatment (a mud bath, mineral soak, and sound-healing session) is unforgettable. Studios and suites are airy and minimalist, with outdoor showers and cruiser bikes. The pool is the valley\'s best — a 130-foot lap pool flanked by cabanas and the Palisades.',
      },
      {
        name: 'Dr. Wilkinson\'s Backyard Resort & Mineral Springs',
        address: '1507 Lincoln Ave., Calistoga',
        website: 'drwilkinson.com',
        image: IMG,
        writeup: 'A Calistoga institution since 1952, recently renovated with a design-forward eye while keeping the beloved mud baths and mineral pools that have drawn visitors for seven decades. The new rooms are stylish — think mid-century modern meets wine country — and the original volcanic ash mud bath recipe is unchanged. This is Calistoga at its most authentic.',
      },
    ],
    alsoRecommended: [
      { name: 'Four Seasons Resort Napa Valley', address: '400 Silverado Trail, Calistoga', website: 'fourseasons.com' },
      { name: 'Indian Springs Calistoga', address: '1712 Lincoln Ave., Calistoga', website: 'indianspringscalistoga.com' },
      { name: 'Okaeri', address: '1880 Lincoln Ave., Calistoga' },
    ],
  },

  adventures: [
    {
      title: 'A Walkable Tasting Tour',
      number: 1,
      image: IMG,
      narrative: 'Calistoga is one of the few Napa towns where you can walk between multiple tasting rooms without a car. Start at **Rivers-Marie** on Washington Street for beautifully crafted Pinot Noirs and Chardonnays, then stroll down to **Lola Wines** on Lincoln Avenue for small-lot reds in an intimate setting. Cross the street to **Tank Garage Winery**, a converted 1930s gas station with a rotating lineup of creative blends and single-varietal wines. By now you\'ve earned lunch — walk to **Buster\'s BBQ** for smoked brisket and a cold beer on the patio.',
    },
    {
      title: 'Mountain Getaway',
      number: 2,
      image: IMG,
      narrative: 'This excursion takes you up the mountains flanking Calistoga for dramatic views and powerful mountain Cabernets. Drive up Howell Mountain Road to **CADE Estate Winery**, where the modern tasting room perches on the mountainside with panoramic views of the valley floor. The estate Cabernet is bold and structured, with the telltale mineral grip of Howell Mountain fruit. After CADE, continue up to **Outpost Wines** on Summit Lake Drive for one of Napa\'s most dramatic tasting experiences — 2,000 feet above the valley, surrounded by forest, pouring intense Grenache and Zinfandel from old mountain vines.',
    },
  ],
};
