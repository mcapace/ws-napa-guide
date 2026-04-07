import { RegionMagazineData } from '../region-structured.types';

const IMG = '/test-images/test-vineyard-702x390.jpg';

export const rutherfordData: RegionMagazineData = {
  slug: 'rutherford',
  title: 'RUTHERFORD',
  subtitle: 'Storied Vineyards',
  author: 'MaryAnn Worobiec',
  heroImage: IMG,
  lede: `Long before Rutherford became synonymous with world-class Cabernet Sauvignon, the Wappo people called this stretch of the Napa Valley home. George Yount, the region's first European settler, planted the valley's earliest grapevines here in the 1830s, but it was Finnish sea captain Gustave Niebaum who transformed Rutherford into a viticultural landmark when he founded Inglenook in 1879. The estate's legacy endured through Prohibition and corporate ownership until Francis Ford Coppola purchased it in 1975, painstakingly restoring the château and its vineyards to their original grandeur.\n\nToday, Rutherford is defined by its terroir — specifically, the fabled "Rutherford Dust," a quality of supple, cocoa-tinged tannins and earthy minerality that marks the best Cabernets from this benchland. The appellation's gravelly alluvial soils, warm days, and cool evenings conspire to produce wines of uncommon depth and elegance, and the roster of producers here reads like a who's who of Napa Valley history.`,

  taste: {
    intro: 'Rutherford is hallowed ground for Cabernet Sauvignon, home to some of the most storied estates in California winemaking. The benchland soils here produce wines with a signature dusty, cocoa-laced character that collectors and critics have revered for over a century.',
    featured: [
      {
        name: 'Cathiard Family Estate',
        slug: 'cathiard-family-estate',
        address: '8150 Conn Creek Rd., Rutherford',
        website: 'cathiardfamilyestate.com',
        image: IMG,
        writeup: 'The Cathiard family, who previously owned Château Smith Haut Lafitte in Bordeaux, brings a distinctly French sensibility to their Rutherford estate. The wines are polished and precise, with the kind of structural elegance that speaks to decades of Old World experience. The tasting salon, set among manicured grounds, offers an intimate experience that feels more Left Bank than Napa Valley, though the wines are unmistakably Rutherford in their richness and depth.',
      },
      {
        name: 'Inglenook',
        slug: 'inglenook',
        address: '1991 St. Helena Hwy., Rutherford',
        website: 'inglenook.com',
        image: IMG,
        writeup: 'There is no more historically significant winery in Napa Valley. Founded in 1879 by Gustave Niebaum and lovingly restored by Francis Ford Coppola, Inglenook\'s ivy-covered stone château is a cathedral of California winemaking. The Rubicon — the estate\'s flagship Bordeaux blend — is a wine of profound depth, built on fruit from some of the oldest vines in the valley. A visit here is as much a history lesson as a tasting, and the guided estate tour is one of the finest in wine country.',
      },
      {
        name: 'Quintessa',
        slug: 'quintessa',
        address: '1601 Silverado Trail, Rutherford',
        website: 'quintessa.com',
        image: IMG,
        writeup: 'Augustin and Valeria Huneeus\'s 280-acre estate is farmed biodynamically, and the single red wine it produces — a Cabernet-dominated blend — is one of Napa\'s most elegant. The winding drive through the property reveals a landscape of rolling hills, a lake, and a dramatic crescent-shaped winery built into the hillside. Tastings are by appointment and unfold as a guided journey through the estate\'s diverse terroirs, making this one of the most immersive experiences in the valley.',
      },
      {
        name: 'Staglin Family Vineyard',
        slug: 'staglin-family-vineyard',
        address: '1570 Bella Oaks Ln., Rutherford',
        website: 'staglinfamily.com',
        image: IMG,
        writeup: 'Garen and Shari Staglin have been farming this 64-acre estate on the Rutherford Bench since 1985, and their Cabernet Sauvignon is a benchmark for the appellation. The wines are rich and concentrated yet remarkably refined, with the telltale cocoa-dust tannins of great Rutherford fruit. The family\'s deep commitment to philanthropy — their annual music festival has raised over $300 million for mental health research — adds a layer of purpose to every visit.',
      },
    ],
    alsoRecommended: [
      { name: 'Beaulieu Vineyard', address: '1960 St. Helena Hwy., Rutherford', website: 'bfrancoiscoppolawinery.com' },
      { name: 'Honig', address: '850 Rutherford Rd., Rutherford', website: 'honigwine.com' },
      { name: 'Cakebread Cellars', address: '8300 St. Helena Hwy., Rutherford', website: 'cakebread.com' },
      { name: 'Mumm Napa', address: '8445 Silverado Trail, Rutherford', website: 'mummnapa.com' },
      { name: 'Caymus', address: '8700 Conn Creek Rd., Rutherford', website: 'caymus.com' },
      { name: 'Round Pond', address: '875 Rutherford Rd., Rutherford', website: 'roundpond.com' },
      { name: 'Dakota Shy', address: '1556 Silverado Trail, Napa', website: 'dakotashy.com' },
      { name: 'Rutherford Hill', address: '200 Rutherford Hill Rd., Rutherford', website: 'rutherfordhill.com' },
      { name: 'Foley Johnson', address: '1945 St. Helena Hwy., Rutherford', website: 'foleyjohnson.com' },
      { name: 'Sequoia Grove', address: '8338 St. Helena Hwy., Rutherford', website: 'sequoiagrove.com' },
      { name: 'Frog\'s Leap', address: '8815 Conn Creek Rd., Rutherford', website: 'frogsleap.com' },
      { name: 'St. Supéry', address: '8440 St. Helena Hwy., Rutherford', website: 'stsupery.com' },
      { name: 'Grgich Hills', address: '1829 St. Helena Hwy., Rutherford', website: 'grgich.com' },
      { name: 'Sullivan Rutherford', address: '1090 Galleron Rd., Rutherford', website: 'sullivanwine.com' },
    ],
  },

  eat: {
    intro: 'Rutherford is a quiet appellation, more vineyard than village, but the dining options that do exist are worth seeking out — from a beloved roadhouse grill to one of the valley\'s most celebrated resort restaurants.',
    featured: [
      {
        name: 'Rutherford Grill',
        slug: 'rutherford-grill',
        address: '1180 Rutherford Rd., Rutherford',
        website: 'rutherfordgrill.com',
        image: IMG,
        writeup: 'This Houston\'s-family roadhouse has been the go-to gathering place for winemakers and visitors alike for three decades. The rotisserie chicken is legendary, the French dip sandwich is piled high with tender beef, and the iron-skillet cornbread arrives bubbling from the oven. Don\'t overlook the wine list — it\'s deep with local selections at fair prices. The covered patio, shaded by old oaks, is the best casual lunch spot in the appellation.',
      },
    ],
    alsoRecommended: [
      { name: 'La Luna Market', address: '1153 Rutherford Rd., Rutherford', website: 'lalunamarket.com' },
      { name: 'Restaurant at Auberge du Soleil', address: '180 Rutherford Hill Rd., Rutherford', website: 'aubergedusoleil.com' },
    ],
  },

  stay: {
    intro: 'Rutherford\'s lodging options are few but exceptional, offering the kind of serene, vineyard-surrounded settings that define the Napa Valley experience at its most refined.',
    featured: [
      {
        name: 'Rancho Caymus Inn',
        slug: 'rancho-caymus-inn',
        address: '1140 Rutherford Rd., Rutherford',
        website: 'ranchocaymusinn.com',
        image: IMG,
        writeup: 'This reimagined hacienda-style inn sits right at the crossroads of Rutherford, just steps from the Rutherford Grill and an easy drive to dozens of iconic wineries. The 26 rooms blend Spanish Colonial architecture with modern comforts — think hand-hewn beams, adobe-style walls, and luxurious bedding. The central courtyard, with its garden and fire pit, is a lovely place to decompress after a day of tasting, and the complimentary wine hour is a gracious touch.',
      },
    ],
    alsoRecommended: [
      { name: 'Auberge du Soleil', address: '180 Rutherford Hill Rd., Rutherford', website: 'aubergedusoleil.com' },
    ],
  },

  adventures: [
    {
      title: 'The Sauvignon Blanc Discovery Tour',
      number: 1,
      image: IMG,
      narrative: 'Rutherford is Cabernet country, but some of the valley\'s finest Sauvignon Blancs come from this very appellation — and this itinerary proves it. Start your morning at **Groth Vineyards**, where the estate Sauvignon Blanc is crisp, herbaceous, and utterly refreshing, a perfect palate opener. Head next to **St. Supéry**, whose Dollarhide Estate Sauvignon Blanc, sourced from their ranch in Pope Valley, is one of Napa\'s most consistently excellent white wines. Break for lunch at **Mustards Grill**, the valley\'s beloved roadhouse, where a glass of something cold and a plate of Mongolian pork chops will fuel your afternoon. Finish the day at **Grgich Hills**, where the late Miljenko "Mike" Grgich — the man who helped put Napa on the map at the 1976 Judgment of Paris — built a legacy of balanced, food-friendly Fumé Blanc that remains a benchmark for the variety.',
    },
  ],
};
