import { RegionMagazineData } from '../region-structured.types';

const IMG = '/test-images/test-vineyard-702x390.jpg';

export const stHelenaData: RegionMagazineData = {
  slug: 'st-helena',
  title: 'ST. HELENA',
  subtitle: 'Historic and Bustling',
  author: 'James Molesworth',
  heroImage: IMG,
  tip: 'Heading south in the morning goes against the valley\'s typical traffic commute — a local trick worth knowing.',
  lede: `St. Helena is Napa Valley\'s Main Street, U.S.A. — a compact, walkable downtown lined with tasting rooms, restaurants, boutiques, and galleries, all set against the backdrop of 9,000 acres of vineyards and nearly 100 wineries. It is the valley\'s historic heart, home to some of the oldest and most celebrated names in American wine.\n\nBut St. Helena is no museum. A new generation of winemakers and restaurateurs is bringing fresh energy to this storied town. Modern tasting salons sit alongside century-old estates, farm-to-table restaurants compete with beloved diners, and a thriving arts scene gives visitors reason to linger long after the last sip. If you only have one day in Napa, spend it here.`,

  taste: {
    intro: 'With nearly 100 wineries, St. Helena offers the most diverse tasting experiences in the valley — from grand historic estates to intimate salon-style rooms on Main Street. The range of styles is equally broad, from mountain Cabernets to elegant Chardonnays.',
    featured: [
      {
        name: 'Ad Vivum',
        address: '963 Main St., St. Helena',
        website: 'advivumcellars.com',
        image: IMG,
        writeup: 'Chris Phelps — former winemaker at Dominus and Caymus — opened this intimate tasting salon on Main Street to pour his own Cabernet Sauvignon. The wine is made from a single vineyard in the Tychson Hill area, one of Napa\'s oldest planted sites. It is a wine of uncommon elegance and restraint, with silky tannins and a persistent mineral finish.',
      },
      {
        name: 'Clif Family Winery',
        address: '709 Main St., St. Helena',
        website: 'cliffamily.com',
        image: IMG,
        writeup: 'Gary Erickson (yes, the Clif Bar founder) and his wife Kit Crawford have built a wine-and-food destination in an old stone building on Main Street. The tasting room pours estate wines from Howell Mountain alongside artisanal products — olive oil, granola, preserves — and the food truck out back serves some of the best tacos in the valley.',
      },
      {
        name: 'Ehlers Estate',
        address: '3222 Ehlers Ln., St. Helena',
        website: 'ehlersestate.com',
        image: IMG,
        writeup: 'A 42-acre certified organic estate that gives 100% of its profits to the Leducq Foundation for cardiovascular research. The wines are just as inspiring — the estate Cabernet is rich and structured, with the fine-grained tannins that come from old-vine fruit and meticulous farming. The 1886 stone barn tasting room is one of the valley\'s most beautiful.',
      },
      {
        name: 'Faust Haus',
        address: '2867 St. Helena Hwy., St. Helena',
        website: 'faustwines.com',
        image: IMG,
        writeup: 'Agustin Huneeus Jr.\'s Faust project gets a proper home in this striking new tasting room — a modern farmhouse with floor-to-ceiling glass walls overlooking estate vineyards. The Cabernet, sourced from Coombsville, is a perennial overachiever: lush, polished, and surprisingly age-worthy at its price point.',
      },
      {
        name: 'Spottswoode Estate',
        address: '1902 Madrona Ave., St. Helena',
        website: 'spottswoode.com',
        image: IMG,
        writeup: 'The Novak family\'s estate is one of Napa\'s quiet legends — a producer that has never chased trends or scores, instead making wines of extraordinary consistency and grace for over four decades. The estate Cabernet is benchmark St. Helena: structured but not heavy, complex but not showy, with decades of aging potential. The Sauvignon Blanc is one of the best in California.',
      },
    ],
    alsoRecommended: [
      { name: 'AXR Napa Valley', address: '1193 Pine St., St. Helena' },
      { name: 'Ballantine Vineyards', address: '175 Madrone Knoll Way, St. Helena' },
      { name: 'Beringer Vineyards', address: '2000 Main St., St. Helena' },
      { name: 'Corison Winery', address: '987 St. Helena Hwy., St. Helena' },
      { name: 'Davies Vineyards', address: '975 Sanitarium Rd., St. Helena' },
      { name: 'The Debate', address: '1020 Sulphur Springs Ave., St. Helena' },
      { name: 'El Molino Winery', address: '688 Lodi Ln., St. Helena' },
      { name: 'Forman Vineyard', address: '1501 Big Rock Rd., St. Helena' },
      { name: 'Freemark Abbey', address: '3022 St. Helena Hwy., St. Helena' },
      { name: 'Hall Wines', address: '401 St. Helena Hwy., St. Helena' },
      { name: 'Heitz Cellar', address: '500 Taplin Rd., St. Helena' },
      { name: 'Ink Grade Cellars', address: '2429 Ink Grade Rd., Pope Valley' },
      { name: 'Charles Krug Winery', address: '2800 Main St., St. Helena' },
      { name: 'Lang & Reed', address: '968 Grayson Ave., St. Helena' },
      { name: 'Lokoya', address: '2500 Spring Mountain Rd., St. Helena' },
      { name: 'Louis M. Martini', address: '254 St. Helena Hwy., St. Helena' },
      { name: 'Mending Wall Winery', address: '1520 Kearney St., St. Helena' },
      { name: 'Merryvale Vineyards', address: '1000 Main St., St. Helena' },
      { name: 'Orin Swift Cellars', address: '1325 Main St., St. Helena' },
      { name: 'Joseph Phelps Vineyards', address: '200 Taplin Rd., St. Helena' },
      { name: 'The Prisoner Wine Co.', address: '1178 Galleron Rd., St. Helena' },
      { name: 'Raymond Vineyards', address: '849 Zinfandel Ln., St. Helena' },
      { name: 'Revana Family Vineyard', address: '2930 St. Helena Hwy., St. Helena' },
      { name: 'Rombauer Vineyards', address: '3522 Silverado Trail, St. Helena' },
      { name: 'The Royal We Wines', address: '1000 Main St., St. Helena' },
      { name: 'Salvestrin Winery', address: '397 Main St., St. Helena' },
      { name: 'Seavey Vineyard', address: '1310 Conn Valley Rd., St. Helena' },
      { name: 'Spring Mountain Vineyard', address: '2805 Spring Mountain Rd., St. Helena' },
      { name: 'St. Helena Winery', address: '1405 Main St., St. Helena' },
      { name: 'Stony Hill Vineyard', address: '3331 N. St. Helena Hwy., St. Helena' },
      { name: 'Titus Vineyards', address: '2971 Silverado Trail, St. Helena' },
      { name: 'Trinchero Napa Valley', address: '3070 St. Helena Hwy., St. Helena' },
      { name: 'Vineyard 7 & 8', address: '4028 Spring Mountain Rd., St. Helena' },
      { name: 'Wheeler Farms', address: '3175 St. Helena Hwy., St. Helena' },
    ],
  },

  eat: {
    intro: 'St. Helena\'s dining scene is deep and varied, from Michelin-caliber restaurants to beloved Main Street institutions. The concentration of quality here rivals towns many times its size.',
    featured: [
      {
        name: 'Charlie\'s Napa Valley',
        address: '1348 Main St., St. Helena',
        website: 'charliesnapavalley.com',
        image: IMG,
        writeup: 'The most exciting new restaurant in St. Helena occupies the former space of Tra Vigne, the legendary Italian restaurant that defined Main Street dining for two decades. Chef Charlie Palmer has created something entirely new — a California-Mediterranean menu that showcases local ingredients with a level of craft and ambition that immediately earned it a Michelin star. The duck confit, wood-fired whole fish, and hand-rolled pastas are all outstanding.',
      },
      {
        name: 'Cook St. Helena',
        address: '1310 Main St., St. Helena',
        website: 'cooksthelena.com',
        image: IMG,
        writeup: 'A neighborhood Italian restaurant that punches well above its weight. The handmade pastas are exceptional — the cacio e pepe and pappardelle with short rib ragù are perennial favorites — and the wine list is a love letter to Italian producers, with smart Napa selections alongside Barolo and Brunello. The cozy room fills quickly; reserve ahead.',
      },
      {
        name: 'The Charter Oak',
        address: '1050 Charter Oak Ave., St. Helena',
        website: 'thecharteroak.com',
        image: IMG,
        writeup: 'Christopher Kostow\'s casual counterpart to three-Michelin-starred Meadowood (before the fire). The menu is built around the open hearth and wood oven — whole grilled fish, roasted vegetables, grilled meats — with a communal, California-casual spirit that makes even a Tuesday dinner feel like a celebration.',
      },
    ],
    alsoRecommended: [
      { name: 'C29', address: '1299 Main St., St. Helena' },
      { name: 'The Farmstead', address: '738 Main St., St. Helena' },
      { name: 'Gott\'s Roadside', address: '933 Main St., St. Helena' },
      { name: 'Harvest Table', address: '1578 Main St., St. Helena' },
      { name: 'PRESS', address: '587 St. Helena Hwy., St. Helena' },
      { name: 'Violetto', address: '1457 Main St., St. Helena' },
    ],
    breakfastCoffee: {
      featured: [
        {
          name: 'Model Bakery',
          address: '1357 Main St., St. Helena',
          website: 'themodelbakery.com',
          image: IMG,
          writeup: 'The English muffins alone are worth a trip to St. Helena. This beloved bakery has been a Main Street anchor since 1929, turning out exceptional breads, pastries, and sandwiches from its wood-fired oven. The morning line often stretches down the block — it\'s worth the wait.',
        },
      ],
      alsoRecommended: [
        { name: 'Under-Study', address: '1321 Main St., St. Helena' },
        { name: 'Erosion Creamery', address: '1333 Main St., St. Helena' },
        { name: 'Roman Holiday Gelato', address: '1325 Main St., St. Helena' },
        { name: 'Giugni\'s Deli', address: '1227 Main St., St. Helena' },
        { name: 'Sam\'s General Store', address: '1180 Main St., St. Helena' },
        { name: 'The Station', address: '1125 Main St., St. Helena' },
      ],
    },
  },

  stay: {
    intro: 'St. Helena offers lodging for every style, from grand luxury resorts to intimate downtown inns. The walkability of Main Street makes staying in town especially convenient.',
    featured: [
      {
        name: 'Alila Napa Valley',
        address: '1915 Main St., St. Helena',
        website: 'alilahotels.com',
        image: IMG,
        writeup: 'The most luxurious new hotel in St. Helena occupies a beautifully restored 1868 building at the north end of Main Street. The 68 rooms and suites blend historic character with contemporary design — exposed brick, walnut floors, and Aesop amenities. The pool courtyard is an oasis, and the spa draws on the property\'s natural mineral springs.',
      },
      {
        name: 'Harvest Inn',
        address: '1 Main St., St. Helena',
        website: 'harvestinn.com',
        image: IMG,
        writeup: 'Set on 8 acres of gardens and vineyards at the south end of town, Harvest Inn offers a resort-like experience within walking distance of Main Street. The rooms are spread across Tudor-style cottages surrounded by redwoods and old oaks. The outdoor pool and two hot tubs overlook working vineyards — the perfect unwinding spot after a day of tasting.',
      },
    ],
    alsoRecommended: [
      { name: 'El Bonita Motel', address: '195 Main St., St. Helena' },
      { name: 'Inn St. Helena', address: '1515 Main St., St. Helena' },
      { name: 'Le Petit Pali', address: '1350 Main St., St. Helena' },
      { name: 'Southbridge Napa Valley', address: '1020 Main St., St. Helena' },
      { name: 'Vineyard Country Inn', address: '201 Main St., St. Helena' },
      { name: 'Wydown Hotel', address: '1424 Main St., St. Helena' },
    ],
  },

  specialSections: [
    {
      title: 'Shopping & Strolling',
      intro: 'St. Helena\'s Main Street is one of the best shopping streets in wine country — a mix of local artisans, design studios, and one-of-a-kind retailers.',
      narrative: 'Between tastings and meals, Main Street rewards wandering.',
      featured: [
        {
          name: 'New West KnifeWorks',
          address: '1330 Main St., St. Helena',
          website: 'newwestknifeworks.com',
          image: IMG,
          writeup: 'A destination for serious home cooks, this Jackson Hole-born knife maker now has its flagship store on Main Street. The handmade knives are works of art — and you can have them custom-engraved while you wait.',
        },
      ],
      alsoRecommended: [
        { name: 'Health Spa Napa Valley', address: '1030 Main St., St. Helena' },
        { name: 'Christopher Hill Gallery', address: '1229 Main St., St. Helena' },
        { name: 'Erin Martin Design', address: '1229 Main St., St. Helena' },
        { name: 'Mad Fritz', address: '1485 Main St., St. Helena' },
        { name: 'St. Helena Public Library', address: '1492 Library Ln., St. Helena' },
      ],
    },
  ],

  adventures: [
    {
      title: 'Off-the-Grid Cabernets',
      number: 1,
      image: IMG,
      narrative: 'This itinerary takes you to three producers who fly under the radar but make extraordinary wine. Start at **Seavey Vineyard** on Conn Valley Road — a family estate that has been making structured, cellar-worthy Cabernets since 1990. From there, wind up Big Rock Road to **Forman Vineyard**, where Ric Forman — one of Napa\'s original cult winemakers — makes meticulous Cabernet and Chardonnay in tiny quantities from his hilltop estate. Finish with lunch at **The Charter Oak**, where the wood-fired menu is the perfect complement to a morning of mountain wines.',
    },
    {
      title: 'West Side Family Wineries',
      number: 2,
      image: IMG,
      narrative: 'The west side of the valley, along Spring Mountain and the Mayacamas foothills, is home to some of St. Helena\'s most charming family-run estates. Start at **Salvestrin Winery**, where the third-generation family pours estate wines on a Victorian-era porch surrounded by olive trees. Drive south to **Corison Winery**, where Cathy Corison — one of Napa\'s most respected winemakers — has been making age-worthy Cabernets from her Kronos Vineyard for four decades. End with lunch at **Under-Study**, a cozy spot on Main Street for a sandwich and a natural wine.',
    },
    {
      title: 'A St. Helena History Lesson',
      number: 3,
      image: IMG,
      narrative: 'Napa Valley history comes alive on this itinerary. Start at **Freemark Abbey**, founded in 1886 and one of the first Napa wineries to be granted landmark status. The Bosché Vineyard Cabernet, from a single plot that has been continuously farmed since 1961, is a living timeline of Napa winemaking. Continue up to **Spring Mountain Vineyard**, the Victorian estate that served as the setting for the TV show Falcon Crest. The grounds are spectacular, and the wines — especially the Elivette Bordeaux blend — are among the best in the Spring Mountain District. Lunch at **Charlie\'s Napa Valley** on Main Street.',
    },
    {
      title: 'Modern Tasting Salons',
      number: 4,
      image: IMG,
      narrative: 'A new wave of winemakers has opened sleek, intimate tasting rooms in downtown St. Helena. Start at **The Royal We Wines**, a tiny salon in the Merryvale building where winemaker Erin Brooks pours small-lot Pinot Noirs and Chardonnays in a stylish, appointment-only setting. Then walk to **Wheeler Farms**, a restored 19th-century property where Bart and Daphne Araujo (of Eisele Vineyard fame) have created a wine-and-food destination. The tasting includes pairings with dishes from the on-site garden and kitchen.',
    },
  ],
};
