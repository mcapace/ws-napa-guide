import { RegionMagazineData } from '../region-structured.types';
import { img } from './images';

export const downtownNapaData: RegionMagazineData = {
  slug: 'downtown-napa',
  title: 'DOWNTOWN NAPA',
  subtitle: 'Gateway to the Valley',
  author: 'MaryAnn Worobiec',
  heroImage: img(0),
  lede: `Downtown Napa has undergone the most dramatic transformation of any town in the valley. Twenty years ago, the riverfront was a flood zone lined with shuttered storefronts. Today, it\'s a vibrant, walkable city with more restaurants per capita than San Francisco, a booming hotel scene, and a cultural energy that surprises first-time visitors.\n\nThe Oxbow Public Market anchors the food scene, while a growing number of urban tasting rooms bring wines from across the valley — and beyond — to a single walkable district. Tech money from the Bay Area has fueled much of the growth, but the result is a city that feels both sophisticated and accessible, with something for every budget and taste.`,

  taste: {
    intro: 'Downtown Napa\'s urban tasting rooms let you sample wines from across the valley without the drive. Many are within walking distance of the Oxbow Market and downtown hotels.',
    featured: [
      {
        name: 'Cadet Wine & Beer Bar',
        address: '930 Franklin St., Napa',
        website: 'cadetwineandbeershop.com',
        image: img(1),
        writeup: 'A natural wine bar and bottle shop that feels more Brooklyn than Napa — and that\'s exactly the point. The rotating taps and by-the-glass pours feature small producers from California and beyond, with an emphasis on low-intervention winemaking. The knowledgeable staff can guide you from pét-nat to piquette to serious Burgundy-style Pinot.',
      },
      {
        name: 'Gentleman Farmer',
        address: '933 Main St., Napa',
        website: 'gentlemanfarmerwines.com',
        image: img(2),
        writeup: 'Joe Wolosz\'s downtown salon occupies a handsome brick building on Main Street, pouring estate Cabernets and Sauvignon Blancs with the kind of personal attention that gets lost at larger estates. The Bungalow Cabernet is the flagship — rich, polished, and age-worthy — and the seated tasting format means you never feel rushed.',
      },
      {
        name: 'Hestan Napa',
        address: '1326 Napa Town Center, Napa',
        website: 'hestanvineyards.com',
        image: img(3),
        writeup: 'The Meyer family\'s urban outpost in Napa Town Center combines their legendary cookware collection with a serious tasting program. The Stephanie Cabernet from Yountville and the estate wines from Atlas Peak are outstanding, and the interactive cooking demonstrations add a dimension you won\'t find at any other tasting room.',
      },
      {
        name: 'Mayacamas Downtown',
        address: '1108 1st St., Napa',
        website: 'mayacamas.com',
        image: img(4),
        writeup: 'The downtown tasting room for one of Napa\'s most historic and revered mountain wineries. Mayacamas has been making Cabernet on Mt. Veeder since 1889, and the current releases — elegant, mineral-driven, built for decades of aging — are among the best in the winery\'s long history. The downtown location makes these hard-to-access wines easy to taste.',
      },
    ],
    alsoRecommended: [
      { name: 'Back Room Wines', address: '974 Franklin St., Napa' },
      { name: 'Bounty Hunter', address: '975 1st St., Napa' },
      { name: 'Compline Wine Bar', address: '1300 1st St., Napa' },
      { name: 'Kerr Cellars', address: '959 Main St., Napa' },
      { name: 'Maison Fayard', address: '1245 1st St., Napa' },
      { name: 'No Love Lost', address: '1206 1st St., Napa' },
      { name: 'Outer Space Wines', address: '989 1st St., Napa' },
      { name: 'Robert Craig Winery', address: '880 Vallejo St., Napa' },
      { name: 'Roots Run Deep', address: '894 Main St., Napa' },
      { name: 'Vintner\'s Collective', address: '1245 Main St., Napa' },
    ],
    subRegions: [
      {
        name: 'Beyond City Limits',
        intro: 'Just outside downtown, the cooler-climate AVAs of Carneros, Coombsville, and Mt. Veeder offer a different expression of Napa wine.',
        featured: [
          {
            name: 'Bouchaine Vineyards',
            address: '1075 Buchli Station Rd., Napa',
            website: 'bouchaine.com',
            image: img(5),
            writeup: 'The southernmost winery in Napa Valley sits at the edge of the Carneros fog belt, producing some of the region\'s finest Pinot Noir and Chardonnay. The new terrace tasting experience overlooks the estate vineyard and the San Pablo Bay marshes — one of the most beautiful settings in the valley.',
          },
          {
            name: 'Favia Wines',
            address: 'By appointment, Coombsville',
            website: 'faviawines.com',
            image: img(6),
            writeup: 'Annie Favia and Andy Erickson — two of Napa\'s most respected winemakers — make their own wines from Coombsville fruit. The Cabernets and Cerro Sur red blend are intensely personal wines, made in tiny quantities with meticulous care. Tastings are by appointment only in their Coombsville home.',
          },
        ],
        alsoRecommended: [],
      },
    ],
  },

  eat: {
    intro: 'Downtown Napa has more restaurants per capita than San Francisco. From Michelin-starred fine dining to hole-in-the-wall taquerias, the concentration and diversity of the food scene is staggering.',
    featured: [
      {
        name: 'Angèle',
        address: '540 Main St., Napa',
        website: 'angelerestaurant.com',
        image: img(7),
        writeup: 'A French bistro in a converted 1890s boathouse on the Napa River, Angèle is the kind of restaurant every town wishes it had. The steak frites, roasted chicken, and croque madame are textbook renditions elevated by impeccable ingredients, and the riverfront terrace is one of the most romantic dining spots in the valley.',
      },
      {
        name: 'La Toque',
        address: '1314 McKinstry St., Napa',
        website: 'latoque.com',
        image: img(8),
        writeup: 'Ken Frank\'s Michelin-starred restaurant remains Napa\'s most ambitious fine dining experience. The tasting menus are elaborate multi-course affairs that pair with wines from the deepest cellar in town. Frank is one of America\'s foremost truffle experts, and during fall truffle season the menu becomes a celebration of the prized fungi.',
      },
      {
        name: 'Torc Napa',
        address: '1140 Main St., Napa',
        website: 'torcnapa.com',
        image: img(9),
        writeup: 'Sean O\'Toole\'s downtown restaurant strikes the perfect balance between ambition and approachability. The menu changes seasonally but always features impeccably sourced local ingredients — Sonoma duck breast, Bodega Bay halibut, Point Reyes blue cheese — treated with technique and restraint. The wine list is one of the best in Napa for under-the-radar producers.',
      },
    ],
    alsoRecommended: [
      { name: 'Azzurro Pizzeria', address: '1260 Main St., Napa' },
      { name: 'Celadon', address: '500 Main St., Napa' },
      { name: 'Charlie Palmer Steak', address: '1260 1st St., Napa' },
      { name: 'Cole\'s Chop House', address: '1122 Main St., Napa' },
      { name: 'Con Amor', address: '975 Clinton St., Napa' },
      { name: 'The Dutch Door', address: '3rd & Main, Napa' },
      { name: 'KenzoNapa', address: '1339 Pearl St., Napa' },
      { name: 'Kitchen Door', address: '610 1st St., Napa' },
      { name: 'Morimoto Napa', address: '610 Main St., Napa' },
      { name: 'Oenotri', address: '1425 1st St., Napa' },
      { name: 'Scala Osteria', address: '1326 Main St., Napa' },
      { name: 'The Slanted Door', address: '644 1st St., Napa' },
      { name: 'Zuzu', address: '829 Main St., Napa' },
    ],
    breakfastCoffee: {
      featured: [
        {
          name: 'Contimo Provisions',
          address: '1300 1st St., Napa',
          website: 'contimoprovisions.com',
          image: img(10),
          writeup: 'A wine-country deli and provisions shop that does double duty as a morning gathering spot. The breakfast burritos, fresh pastries, and single-origin pour-overs fuel a solid start to the day. Grab a picnic box for the road — they\'re designed for wine country outings.',
        },
      ],
      alsoRecommended: [
        { name: 'Genova Delicatessen', address: '1550 Trancas St., Napa' },
        { name: 'Grace\'s Table', address: '1400 2nd St., Napa' },
        { name: 'Moulin Bakery', address: '640 1st St., Napa' },
        { name: 'Naysayer Coffee', address: '1326 1st St., Napa' },
        { name: 'Ohm Coffee Roasters', address: '1030 1st St., Napa' },
        { name: 'Winston\'s', address: '899 Main St., Napa' },
      ],
    },
  },

  stay: {
    intro: 'Downtown Napa\'s hotel boom has brought options for every budget, from boutique properties to full-service luxury brands — all within walking distance of restaurants and tasting rooms.',
    featured: [
      {
        name: 'Andaz Napa',
        address: '1450 1st St., Napa',
        website: 'hyatt.com',
        image: img(11),
        writeup: 'Hyatt\'s lifestyle brand occupies a prime spot on 1st Street with 141 rooms, a rooftop pool with mountain views, and a ground-floor restaurant that opens to the sidewalk. The design is wine-country modern — warm woods, local art, vineyard-inspired textures — and the location is unbeatable for exploring downtown on foot.',
      },
      {
        name: 'Archer Hotel Napa',
        address: '1230 1st St., Napa',
        website: 'archerhotel.com/napa',
        image: img(12),
        writeup: 'The rooftop bar at Archer is one of the best perches in the valley — a 360-degree view of the Napa skyline, the Mayacamas, and the Vaca Mountains. The 183 rooms are sleekly designed with Napa touches, and the Charlie Palmer Steak restaurant on the ground floor is a destination in its own right.',
      },
    ],
    alsoRecommended: [
      { name: 'The Inn on First', address: '1938 1st St., Napa' },
      { name: 'Napa River Inn', address: '500 Main St., Napa' },
      { name: 'River Terrace Inn', address: '1600 Soscol Ave., Napa' },
      { name: 'Embassy Suites Napa Valley', address: '1075 California Blvd., Napa' },
      { name: 'Westin Verasa Napa', address: '1314 McKinstry St., Napa' },
    ],
  },

  specialSections: [
    {
      title: 'The Oxbow Public Market',
      intro: 'Napa\'s premier food hall is a must-visit — a collection of artisan vendors, restaurants, and specialty shops under one roof.',
      narrative: 'The Oxbow Market is where locals and visitors converge, and a full tour of its vendors could easily fill a morning. Start with oysters at **Hog Island Oyster Company**, then grab a burger at **Gott\'s Roadside**. Browse **Fatted Calf Charcuterie** for house-cured salumi, **Whole Spice** for exotic seasonings, and **Model Bakery** for English muffins. For something sweet, **Kara\'s Cupcakes** and **Annette\'s Chocolates** are standouts. End with a craft beer at **Fieldwork Brewing** or a glass of something interesting at **The Walt** wine bar.',
    },
    {
      title: 'Culture & Cocktails',
      intro: 'Downtown Napa\'s cultural scene has exploded in recent years, with galleries, distilleries, and nightlife options that give visitors reason to stay after dark.',
      narrative: 'Beyond wine, Downtown Napa has a growing cocktail and culture scene. **The Arbaretum** distillery crafts small-batch spirits in a renovated warehouse. **Chispa Bar** serves mezcal flights and creative cocktails in a candlelit space. **CIA at Copia** offers cooking classes and a museum of food and wine history. **Marquee Pinball** has 60+ machines in a retro arcade bar. **Wilfred\'s Lounge** brings tiki bar vibes to 1st Street with tropical cocktails and vintage décor.',
    },
  ],

  adventures: [
    {
      title: 'The Wind in Your Hair Tour',
      number: 1,
      image: img(13),
      narrative: 'This Carneros itinerary takes you south of downtown into the rolling hills and bay breezes of Napa\'s coolest-climate region. Start with breakfast at **Boon Fly Café** at the Carneros Resort — the famous donuts and eggs Benedict are the perfect fuel. Then drive to **Bouchaine Vineyards**, the southernmost winery in the valley, for Pinot Noir and Chardonnay on the terrace overlooking the marshes. Finish with a visit to **Domaine Carneros**, the Taittinger family\'s grand château, for a glass of méthode traditionnelle sparkling wine on the terrace with views stretching to the bay.',
    },
  ],
};
