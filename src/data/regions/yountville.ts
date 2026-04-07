import { RegionMagazineData } from '../region-structured.types';
import { img } from './images';

export const yountvilleData: RegionMagazineData = {
  slug: 'yountville',
  title: 'YOUNTVILLE',
  subtitle: 'World-Class Dining',
  author: 'Aaron Romano',
  heroImage: img(0),
  lede: `Yountville is a town that punches above its weight. At barely a mile long, its main street holds more Michelin-starred restaurants per capita than any town in America. Thomas Keller's empire — The French Laundry, Bouchon, Ad Hoc — anchors the culinary scene, but a new generation of chefs and winemakers is expanding what this tiny town means to Napa Valley.\n\nThe surrounding AVAs — Stags Leap District and Oak Knoll District — add layers of viticultural complexity. Stags Leap's rocky volcanic soils produce some of the valley's most elegant Cabernets, while Oak Knoll's cooler temperatures yield wines of finesse and restraint. Together with Yountville's own hillside vineyards, these three districts offer a masterclass in how terroir shapes wine.`,

  tip: 'Yountville is walkable. Park once and explore on foot — most wineries and all the best restaurants are within a 10-minute stroll of each other.',

  taste: {
    intro: 'Yountville and the surrounding AVAs of Stags Leap District and Oak Knoll District are home to some of Napa Valley\'s most celebrated producers. Whether you\'re tasting in a converted farmhouse or a modern salon, the wines here reflect the unique terroir of each sub-region.',
    subRegions: [
      {
        name: 'Yountville',
        intro: 'The town itself is home to a handful of intimate tasting rooms, many walkable from the main drag.',
        featured: [
          {
            name: 'Stewart Cellars',
            slug: 'stewart-cellars',
            address: '6752 Washington St., Yountville',
            website: 'stewartcellars.com',
            image: img(1),
            writeup: 'Michael Stewart\'s sleek tasting room on Washington Street is the kind of place that makes you feel like you\'re in on a secret. The Nomad Collection Cabernet, sourced from multiple Napa appellations, is a beautiful blend of power and polish. The seated tasting experience walks you through the range, from bright Sauvignon Blanc to the flagship Cabernet, in a space designed by Ken Fulk that feels more gallery than winery.',
          },
        ],
        alsoRecommended: [
          { name: 'Cipher', address: '6505 Washington St., Yountville', website: 'cipherwines.com' },
          { name: 'Hill Family Estate', address: '6512 Washington St., Yountville', website: 'hillfamilyestate.com' },
          { name: 'JCB Tasting Salon', address: '6505 Washington St., Yountville', website: 'jcbcollection.com' },
          { name: 'Jessup Cellars', address: '6740 Washington St., Yountville', website: 'jessupcellars.com' },
          { name: 'Knightsbridge', address: '6484 Washington St., Yountville', website: 'knightsbridgewines.com' },
          { name: 'Laird Family Estate', address: '5055 Solano Ave., Napa', website: 'lairdfamilyestate.com' },
          { name: 'RH Wine Vault', address: '6725 Washington St., Yountville', website: 'rh.com' },
        ],
      },
      {
        name: 'Stags Leap District',
        intro: 'East of Yountville, the dramatic palisades of the Stags Leap District produce Cabernets of uncommon elegance — wines with structure and silky tannins shaped by volcanic soils and afternoon breezes.',
        featured: [
          {
            name: 'Clos Du Val',
            slug: 'clos-du-val',
            address: '5330 Silverado Trail, Napa',
            website: 'closduval.com',
            image: img(2),
            writeup: 'Founded in 1972 by French-born winemaker Bernard Portet, Clos Du Val has been a quiet anchor of the Stags Leap District for over five decades. The new Hirondelle House tasting experience, set in a beautifully restored stone building, pairs flights with small bites in an intimate salon setting. The estate Cabernet Sauvignon remains the flagship — structured, age-worthy, with the telltale iron-and-dark-fruit signature of Stags Leap terroir.',
          },
          {
            name: 'Lewis Cellars',
            address: '635 Hwy. 29, Napa',
            website: 'lewiscellars.com',
            image: img(3),
            writeup: 'Randy Lewis started making wine in his garage, and three decades later his Cabernets and Syrahs are among the most sought-after in Napa. The Alec\'s Blend Napa Valley Cabernet is a perennial Wine Spectator Top 100 pick, offering ripe black fruit, supple tannins, and a long, spicy finish. The Reserve Cabernet, from the best barrels, is worth the splurge.',
          },
        ],
        alsoRecommended: [
          { name: 'Baldacci Family Vineyards', address: '6236 Silverado Trail, Napa', website: 'baldaccivineyards.com' },
          { name: 'Chimney Rock', address: '5350 Silverado Trail, Napa', website: 'chimneyrock.com' },
          { name: 'Cliff Lede Vineyards', address: '1473 Yountville Cross Rd., Yountville', website: 'cliffledevineyards.com' },
          { name: 'Ilsley Vineyards', address: '5500 Silverado Trail, Napa', website: 'ilsleyvineyards.com' },
          { name: 'Malk Family Vineyards', address: '6307 Silverado Trail, Napa', website: 'malkvineyards.com' },
          { name: 'Pine Ridge Vineyards', address: '5901 Silverado Trail, Napa', website: 'pineridgevineyards.com' },
          { name: 'Regusci Winery', address: '5584 Silverado Trail, Napa', website: 'regusciwinery.com' },
          { name: 'Shafer Vineyards', address: '6154 Silverado Trail, Napa', website: 'shafervineyards.com' },
          { name: 'Silverado Vineyards', address: '6121 Silverado Trail, Napa', website: 'silveradovineyards.com' },
          { name: 'Stag\'s Leap Wine Cellars', address: '5766 Silverado Trail, Napa', website: 'stagsleapwinecellars.com' },
          { name: 'Taylor Family Vineyards', address: '5880 Silverado Trail, Napa', website: 'taylorfamilyvineyards.com' },
        ],
      },
      {
        name: 'Oak Knoll District',
        intro: 'South of Yountville, Oak Knoll District is the valley\'s coolest-climate AVA. Morning fog lingers here, and the wines — from Chardonnay to Merlot to Cabernet — have a freshness and finesse that sets them apart.',
        featured: [
          {
            name: 'Hendry Winery',
            address: '3104 Redwood Rd., Napa',
            website: 'hendrywines.com',
            image: img(4),
            writeup: 'George Hendry has been farming this 114-acre estate since 1939, making it one of the oldest family-owned vineyards in Napa. The range is staggering — 12 varietals from a single property — but the standouts are the Blocks 7 & 22 Zinfandel and the estate Cabernet Sauvignon. Tastings take place on the property, surrounded by vines, with the kind of unhurried pace that reminds you wine country doesn\'t have to be fancy to be great.',
          },
          {
            name: 'Trefethen Family Vineyards',
            slug: 'trefethen',
            address: '1160 Oak Knoll Ave., Napa',
            website: 'trefethen.com',
            image: img(5),
            writeup: 'The Trefethens bought this historic property — anchored by the 1886 Eshcol winery, the only remaining wooden gravity-flow winery in Napa — in 1968. Their estate Chardonnay and dry Riesling are benchmarks for the Oak Knoll District, and the Dragon\'s Tooth red blend offers something bold and different. The new Library Tasting experience pairs older vintages with small bites in the historic barrel room.',
          },
        ],
        alsoRecommended: [
          { name: 'Bouchaine Vineyards', address: '1075 Buchli Station Rd., Napa', website: 'bouchaine.com' },
          { name: 'Darioush', address: '4240 Silverado Trail, Napa', website: 'darioush.com' },
          { name: 'Jarvis Estate', address: '2970 Monticello Rd., Napa', website: 'jarviswines.com' },
          { name: 'Luna Vineyards', address: '2921 Silverado Trail, Napa', website: 'lunavineyards.com' },
          { name: 'Monticello Vineyards', address: '4242 Big Ranch Rd., Napa', website: 'corleyvineyards.com' },
        ],
      },
    ],
    featured: [],
    alsoRecommended: [],
  },

  eat: {
    intro: 'Yountville\'s dining scene is so deep that it would be the envy of cities fifty times its size. Three Michelin-starred restaurants anchor the town, but the real story is the range — from Thomas Keller\'s white-tablecloth temples to a walk-up window serving fried chicken.',
    featured: [
      {
        name: 'Ad Hoc + Addendum',
        slug: 'ad-hoc',
        address: '6476 Washington St., Yountville',
        website: 'thomaskeller.com',
        image: img(6),
        writeup: 'Thomas Keller\'s most casual Yountville restaurant serves a single four-course prix fixe menu that changes nightly — think buttermilk fried chicken, braised short ribs, or roasted pork loin with seasonal sides. No choices, no fuss, just impeccable comfort food at a communal table. Around back, the Addendum walk-up window does boxed lunches of the same fried chicken, pulled pork, and seasonal salads for the picnic crowd.',
      },
      {
        name: 'Clementine',
        address: '6550 Washington St., Yountville',
        website: 'clementineyountville.com',
        image: img(7),
        writeup: 'Chef-owner David Nuno\'s jewel-box restaurant is the kind of place where every detail matters. The menu riffs on global flavors with local ingredients — hamachi crudo with yuzu and jalapeño, lamb chops with chermoula, duck breast with mole negro. The wine list leans Napa but wanders happily through Europe. The intimate room seats just 40, so reservations are essential.',
      },
    ],
    alsoRecommended: [
      { name: 'Bistro Jeanty', address: '6510 Washington St., Yountville', website: 'bistrojeanty.com' },
      { name: 'Bottega', address: '6525 Washington St., Yountville', website: 'botteganapavalley.com' },
      { name: 'Bouchon', address: '6534 Washington St., Yountville', website: 'thomaskeller.com' },
      { name: 'Ciccio', address: '6770 Washington St., Yountville', website: 'ciccionapavalley.com' },
      { name: 'Lucy', address: '6526 Yount St., Yountville', website: 'lucyrestaurant.com' },
      { name: 'North Block', address: '6757 Washington St., Yountville', website: 'northblock.com' },
      { name: 'Protea', address: '6480 Washington St., Yountville', website: 'proteanapa.com' },
      { name: 'R+D Kitchen', address: '6795 Washington St., Yountville', website: 'hillstone.com' },
      { name: 'The French Laundry', address: '6640 Washington St., Yountville', website: 'thomaskeller.com' },
    ],
    breakfastCoffee: {
      featured: [
        {
          name: 'Bouchon Bakery',
          address: '6528 Washington St., Yountville',
          website: 'thomaskeller.com',
          image: img(8),
          writeup: 'Thomas Keller\'s bakery is the best place in the valley to start your morning. The TKOs (Thomas Keller Oreos) are legendary, but the real move is a fresh croissant and a double espresso at one of the sidewalk tables, watching Yountville wake up.',
        },
      ],
      alsoRecommended: [
        { name: 'Kollar Chocolates', address: '6525 Washington St., Yountville', website: 'kollarchocolates.com' },
        { name: 'Model Bakery', address: '6523 Washington St., Yountville', website: 'themodelbakery.com' },
      ],
    },
  },

  stay: {
    intro: 'Yountville has some of the valley\'s best lodging, from intimate boutique inns to full-service luxury resorts. Everything is walkable, which means you can dine at The French Laundry and stroll home without worrying about a designated driver.',
    featured: [
      {
        name: 'Bardessono',
        slug: 'bardessono',
        address: '6526 Yount St., Yountville',
        website: 'bardessono.com',
        image: img(9),
        writeup: 'Yountville\'s most luxurious hotel is a study in sustainable design — LEED Platinum certified, with rooftop solar panels, geothermal heating, and a Living Building wall in the lobby. But none of that would matter if it didn\'t also feel wonderful. The suites are enormous, with fireplaces, deep soaking tubs, and private balconies overlooking the hotel\'s gardens. The spa is world-class, and Lucy restaurant anchors the ground floor.',
      },
      {
        name: 'Sttupa Estate',
        address: '6462 Washington St., Yountville',
        website: 'sttupaestate.com',
        image: img(10),
        writeup: 'A new addition to Yountville\'s lodging scene, Sttupa Estate brings a modern Asian-inflected sensibility to wine country hospitality. The property features eight private suites arranged around a central courtyard with mature olive trees. Each room is a minimalist retreat of natural materials — stone, wood, linen — with deep ofuro-style soaking tubs.',
      },
    ],
    alsoRecommended: [
      { name: 'The Estate Yountville', address: '6481 Washington St., Yountville', website: 'theestateyountville.com' },
      { name: 'Hotel Yountville', address: '6462 Washington St., Yountville', website: 'hotelyountville.com' },
      { name: 'Maison Fleurie', address: '6529 Yount St., Yountville', website: 'maisonfleurienapa.com' },
      { name: 'Napa Valley Lodge', address: '2230 Madison St., Yountville', website: 'napavalleylodge.com' },
      { name: 'North Block Hotel', address: '6757 Washington St., Yountville', website: 'northblockhotel.com' },
    ],
  },

  specialSections: [
    {
      title: 'Public Art & Rural Charm',
      intro: 'Beyond wine and food, Yountville has a surprisingly vibrant cultural scene, from a gallery-worthy tasting room to artisan chocolate to a beer lover\'s oasis.',
      narrative: 'Yountville\'s walkability makes it easy to stumble on unexpected pleasures between tastings and meals.',
      featured: [
        {
          name: 'Hestan Vineyards',
          address: '6540 Washington St., Yountville',
          website: 'hestanvineyards.com',
          image: img(11),
          writeup: 'The Hestan tasting room doubles as a showcase for the Meyer family\'s legendary cookware collection. Taste estate wines surrounded by gleaming copper and stainless steel — it\'s part winery, part culinary museum.',
        },
        {
          name: 'Kollar Chocolates',
          address: '6525 Washington St., Yountville',
          website: 'kollarchocolates.com',
          image: img(12),
          writeup: 'Chris Kollar\'s single-origin bonbons and truffles are edible art. The wine-country pairings — Cabernet caramel, Port ganache — are the obvious play, but the passion fruit and Thai chili pieces are revelations.',
        },
        {
          name: 'Mad Fritz',
          address: '6540 Washington St., Yountville',
          website: 'madfritz.com',
          image: img(13),
          writeup: 'A craft brewery and tap house in the heart of wine country? Mad Fritz proves it works. The beers are brewed with estate-grown barley and local ingredients, and the taproom is a welcome respite from an all-wine itinerary.',
        },
      ],
      alsoRecommended: [
        { name: 'Napa Valley Museum', address: '55 Presidents Cir., Yountville', website: 'napavalleymuseum.org' },
        { name: 'RH Yountville Gallery', address: '6725 Washington St., Yountville', website: 'rh.com' },
        { name: 'Yountville Art Walk', address: 'Washington St., Yountville', website: 'yountville.com' },
      ],
    },
  ],

  adventures: [
    {
      title: 'Culinary Delights',
      number: 1,
      image: img(14),
      narrative: 'Start your morning at **Chandon** for a sparkling wine flight on the terrace — the garden setting, with its Henry Moore sculpture, is one of the most beautiful in the valley. From there, drive east on the Yountville Cross Road to **Darioush**, where the Persian-inspired architecture and Bordeaux-style Cabernets make for a memorable mid-morning tasting. Circle back to town for lunch at **Bottega**, Michael Chiarello\'s Italian-inflected restaurant, where the burrata and wood-fired pizzas are irresistible. After lunch, walk to **Cipher** for a tasting of small-lot Napa wines in a modern, art-filled salon.',
    },
    {
      title: 'Stags Leap Splendor',
      number: 2,
      image: img(15),
      narrative: 'Drive east on the Yountville Cross Road and turn south on the Silverado Trail to enter the Stags Leap District, one of Napa\'s most celebrated AVAs. Start at **Cliff Lede Vineyards**, where the rock-and-roll-themed tasting room (each vineyard block is named after a classic album) serves some of the district\'s most approachable Cabernets. Next, head south to **Shafer Vineyards** for the legendary Hillside Select — call ahead, as tastings are by appointment only. For lunch, duck into **Velo Deli & Pizzeria** on the Silverado Trail for a panini and a cold beer. In the afternoon, visit **Baldacci Family Vineyards** for a seated tasting of estate Cabernets with gorgeous views of the palisades.',
    },
    {
      title: 'Into The Hills',
      number: 3,
      image: img(16),
      narrative: 'This itinerary takes you off the beaten path and into the mountains. Start at **Antinori Napa Valley**, the Tuscan family\'s stunning estate on Atlas Peak Road, where the Cabernets and Sangiovese reflect both California sun and Italian tradition. The views from the terrace are worth the drive alone. Head back down to Yountville for lunch at **Bouchon Bistro**, Thomas Keller\'s French brasserie, where the roast chicken and pommes frites are perfect fuel for an afternoon in the hills. After lunch, drive west on Mt. Veeder Road to **Mayacamas Vineyards**, one of Napa\'s oldest and most storied mountain wineries. The Cabernets here — austere, age-worthy, mineral-driven — are the antithesis of the valley\'s fruit bombs, and a visit to the crumbling stone winery feels like stepping back in time.',
    },
  ],
};
