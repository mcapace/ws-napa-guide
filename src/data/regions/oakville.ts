import { RegionMagazineData } from '../region-structured.types';
import { img } from './images';

export const oakvilleData: RegionMagazineData = {
  slug: 'oakville',
  title: 'OAKVILLE',
  subtitle: 'The Spirit of Cabernet',
  author: 'MaryAnn Worobiec',
  heroImage: img(0),
  lede: `Oakville is the heart of Napa Valley Cabernet Sauvignon. The To Kalon vineyard — arguably the most famous plot of land in American wine — anchors the appellation, and names like Robert Mondavi, Opus One, and Far Niente define what great Napa Cabernet means to the world. But Oakville is more than its legends. New projects and renovations — including the massive $250 million Mondavi and BV rebuilds — are reshaping the landscape while honoring the region's storied past.`,

  taste: {
    intro: 'Oakville is where Napa Valley Cabernet Sauvignon reaches its fullest expression. The benchland soils on both sides of Highway 29 produce wines of extraordinary depth and structure, and the appellation\'s roster of producers reads like a who\'s who of American wine.',
    featured: [
      {
        name: 'Cardinale Winery',
        slug: 'cardinale-winery',
        address: '7585 St. Helena Hwy., Oakville',
        website: 'cardinale.com',
        image: img(1),
        writeup: 'Jackson Family Wines\' crown jewel is a study in refined Napa Cabernet. Winemaker Christopher Carpenter crafts a single flagship wine each vintage — a Cabernet Sauvignon blended from the best mountain fruit across the valley. The tasting experience is polished and unhurried, with seated flights in an elegant salon that feels more private club than tasting room. The library vertical tastings, when available, are a rare chance to see how these wines evolve over a decade or more.',
      },
      {
        name: 'Far Niente / Bella Union',
        slug: 'far-niente',
        address: '1350 Acacia Dr., Oakville',
        website: 'farniente.com',
        image: img(2),
        writeup: 'The name means "without a care," and the historic stone winery — originally built in 1885, abandoned during Prohibition, and painstakingly restored in 1979 — lives up to it. Far Niente\'s estate Cabernet is one of Oakville\'s benchmarks, with dark fruit, supple tannins, and a long, graceful finish. The Bella Union label, sourced from cooler sites, offers a more approachable entry point. Tours of the caves and the vintage car collection are a highlight, and the grounds, with their reflecting pool and mature gardens, are among the most photogenic in the valley.',
      },
      {
        name: 'Nickel & Nickel',
        slug: 'nickel-and-nickel',
        address: '8164 St. Helena Hwy., Oakville',
        website: 'nickelandnickel.com',
        image: img(3),
        writeup: 'If you want to understand how vineyard site shapes Cabernet Sauvignon, there is no better classroom than Nickel & Nickel. Every wine is a single-vineyard, single-varietal expression — no blending, no hedging. The John C. Sullenger Vineyard Cabernet, from the estate\'s Oakville benchland, is the flagship, but tasting it alongside the Branding Iron from the same appellation reveals how even small differences in soil and exposure can produce dramatically different wines. The restored 1880s farmstead setting adds a layer of old-Napa charm.',
      },
      {
        name: 'Rudd Estate / Crossroads House',
        slug: 'rudd-estate',
        address: '500 Oakville Cross Rd., Oakville',
        website: 'ruddestate.com',
        image: img(4),
        writeup: 'Leslie Rudd\'s estate has long been one of Oakville\'s quieter prestige addresses, producing a Bordeaux-style Cabernet blend of real power and complexity. The new Crossroads House hospitality center raises the bar considerably, offering an elevated tasting experience that pairs estate wines with seasonal small bites in a striking modern space. The property\'s organic gardens supply both the kitchen and a sense of place that ties the wine to the land. Appointments are essential, and the experience is worth planning your day around.',
      },
    ],
    alsoRecommended: [
      { name: 'B Cellars', address: '703 Oakville Cross Rd., Oakville', website: 'bcellars.com' },
      { name: 'Groth Vineyards', address: '750 Oakville Cross Rd., Oakville', website: 'grothwines.com' },
      { name: 'Miner Family Winery', address: '7850 Silverado Trail, Oakville', website: 'minerwines.com' },
      { name: 'Opus One', address: '7900 St. Helena Hwy., Oakville', website: 'opusonewinery.com' },
      { name: 'PlumpJack Winery', address: '620 Oakville Cross Rd., Oakville', website: 'plumpjack.com' },
      { name: 'Promontory Wine', address: '1300 Oakville Grade, Oakville', website: 'promontory.com' },
    ],
  },

  eat: {
    intro: 'Oakville\'s dining options are few but iconic. The stretch of Highway 29 that runs through the appellation is home to a pair of Napa Valley institutions and one of the most storied grocery stores in California.',
    featured: [
      {
        name: 'Brix',
        slug: 'brix',
        address: '7377 St. Helena Hwy., Napa',
        website: 'brix.com',
        image: img(5),
        writeup: 'Set among 16 acres of gardens and vineyards just south of the Oakville Cross Road, Brix is the kind of restaurant that reminds you why people fall in love with wine country. The farm-to-table menu leans into seasonal California cuisine — grilled local fish, wood-roasted vegetables, house-made pastas — and the vineyard views from the patio are among the best of any restaurant in the valley. The wine list is deep and fairly priced, and the weekend brunch is a neighborhood favorite.',
      },
      {
        name: 'Mustards Grill',
        slug: 'mustards-grill',
        address: '7399 St. Helena Hwy., Napa',
        website: 'mustardsgrill.com',
        image: img(6),
        writeup: 'Cindy Pawlcyn opened Mustards in 1983, and four decades later it remains one of the most beloved restaurants in Napa Valley. The menu is California roadhouse at its best — Mongolian pork chops, thin and crispy onion rings, a half-pound burger that has launched a thousand imitations. The wine list is a love letter to Napa, with deep verticals and plenty of options by the glass. Expect a wait at peak hours; the bar is a perfectly fine place to spend it.',
      },
    ],
    alsoRecommended: [],
    breakfastCoffee: {
      featured: [
        {
          name: 'Oakville Grocery',
          address: '7856 St. Helena Hwy., Oakville',
          website: 'oakvillegrocery.com',
          category: 'Breakfast/Coffee/Sandwiches/Snacks',
          image: img(7),
          writeup: 'Operating continuously since 1881, Oakville Grocery is the oldest continuously running grocery store in California and an essential Napa Valley pit stop. The shelves are stocked with artisan cheeses, charcuterie, local olive oils, and a curated wine selection, while the deli counter turns out excellent sandwiches, salads, and espresso drinks. Grab a premade picnic box and a bottle of rosé and head to a nearby winery\'s grounds — it\'s the quintessential Oakville lunch.',
        },
      ],
      alsoRecommended: [],
    },
  },

  adventures: [
    {
      title: 'The Everything Old Is New Again Tour',
      number: 1,
      image: img(8),
      narrative: 'Two of Napa Valley\'s most historic estates are getting complete overhauls, and the results are staggering. Start your morning at the newly reimagined **Robert Mondavi Winery**, where a $250 million renovation has transformed the iconic Mission-style campus into a state-of-the-art visitor center while preserving the spirit of the man who put Napa Valley on the world stage. The new tasting galleries, exhibition spaces, and landscaped grounds are a fitting tribute to Mondavi\'s legacy of innovation and hospitality. From there, drive south on Highway 29 to **Beaulieu Vineyard**, another legendary name undergoing a top-to-bottom reinvention. BV\'s new tasting experience pays homage to founder Georges de Latour and the storied Georges de Latour Private Reserve Cabernet, one of the longest-running prestige wines in California. After a morning steeped in history, head to **Mustards Grill** for lunch — Cindy Pawlcyn\'s roadhouse classic is the perfect antidote to all that grandeur, with a half-pound burger and a glass of Napa Cab at the bar.',
    },
  ],
};
