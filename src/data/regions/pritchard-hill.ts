import { RegionMagazineData } from '../region-structured.types';

const IMG = '/test-images/test-vineyard-702x390.jpg';

export const pritchardHillData: RegionMagazineData = {
  slug: 'pritchard-hill',
  title: 'PRITCHARD HILL',
  subtitle: 'A Visit Above the Fog Line',
  author: 'James Molesworth',
  heroImage: IMG,
  lede: `Pritchard Hill is Napa Valley's most exclusive address. Perched high above the eastern valley floor, this remote ridge offers views that stretch from the Vaca Mountains to the Mayacamas range, and the wines — exclusively Cabernet Sauvignon and Bordeaux blends — are among the most powerful and age-worthy in California.\n\nOnly a handful of producers farm here, and most require appointments well in advance. But the reward is extraordinary: wines of uncommon concentration and complexity, shaped by volcanic soils, extreme elevation, and intense mountain sunlight. This is where Napa reaches its most dramatic expression.`,

  taste: {
    intro: 'Pritchard Hill has just a handful of producers, but each makes wines of extraordinary quality. Appointments are essential — plan well ahead.',
    featured: [
      {
        name: 'David Arthur Vineyards',
        address: '1521 Sage Canyon Rd., St. Helena',
        website: 'davidarthur.com',
        image: IMG,
        writeup: 'David Long has been farming this 40-acre estate since 1978, making him one of Pritchard Hill\'s original pioneers. The Elevation 1147 Cabernet is the flagship — a massive, structured wine that needs a decade to fully open but rewards patience with layers of cassis, dark earth, and mountain herbs. The hilltop estate offers some of the most spectacular views in all of Napa.',
      },
      {
        name: 'Chappellet Winery',
        address: '1581 Sage Canyon Rd., St. Helena',
        website: 'chappellet.com',
        image: IMG,
        writeup: 'Founded in 1967 by Donn and Molly Chappellet, this is the estate that put Pritchard Hill on the map. The Signature Cabernet is one of Napa\'s great values — consistently outstanding at a fraction of its neighbors\' prices. The Pritchard Hill Estate Vineyard Cabernet is the top wine, a monumental Cab that can age for 30+ years. The pyramid-shaped winery, designed by the Chappellets themselves, is an architectural landmark.',
      },
      {
        name: 'Continuum Estate',
        address: '1220 Sage Canyon Rd., St. Helena',
        website: 'continuumestate.com',
        image: IMG,
        writeup: 'Tim Mondavi\'s personal project — his vision of what great Napa Cabernet can be, freed from the corporate constraints of his family\'s original winery. The estate wine is a Bordeaux-style blend of Cabernet Sauvignon, Cabernet Franc, and Petit Verdot, made from 60 acres of steep, terraced vineyards on the south-facing slope of Pritchard Hill. It is, by any measure, one of the finest wines in California.',
      },
    ],
    alsoRecommended: [],
  },

  eat: {
    intro: 'There are no restaurants on Pritchard Hill. Pack a picnic or plan to eat in St. Helena before or after your visit.',
    featured: [],
    alsoRecommended: [],
  },

  specialSections: [
    {
      title: 'The Howard Backen Estate',
      intro: 'Pritchard Hill is home to one of California\'s most extraordinary private residences — now available as a luxury vacation rental.',
      narrative: 'Architect Howard Backen, who has designed more Napa Valley wineries than any other architect (Harlan, Promontory, Scarecrow, Hourglass), built his personal masterpiece on a 40-acre parcel overlooking Lake Hennessey. The property features a main house, guest house, and infinity pool perched on the hillside with 360-degree views of the valley. Now managed by Thomas Keller\'s team, it\'s available as a private rental for groups of up to 12. The house is a showcase of Backen\'s signature style — warm wood, massive glass walls, and an effortless integration of indoor and outdoor living. It is the finest vacation rental in Napa Valley, and one of the best in California.',
    },
  ],

  adventures: [],
};
