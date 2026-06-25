import type { FeatureArticleContent } from '@/lib/types'

const JUDGMENT = '/images/features/judgment-of-paris'
const TACO = '/images/features/napa-taco-tour'

export const FEATURE_ARTICLE_CONTENT: Record<string, FeatureArticleContent> = {
  'judgment-of-paris': {
    kicker: 'The Judgment of California',
    pullQuote: 'An eye-opening blind tasting',
    pullQuoteLines: [
      'Fifty years ago in Paris,',
      'California wine demonstrated',
      'its world-class potential',
    ],
    heroImage: `${JUDGMENT}/hero.jpg`,
    secondaryImagesCaption:
      'California wineries Chateau Montelena and Stag’s Leap were among the labels to earn acclaim in the much-touted tasting.',
    secondaryImages: [
      {
        src: `${JUDGMENT}/points-montelena.jpg`,
        alt: '1973 Chateau Montelena Chardonnay',
        width: 224,
        height: 550,
      },
      {
        src: `${JUDGMENT}/points-stags-leap.jpg`,
        alt: '1973 Stag’s Leap Wine Cellars Cabernet Sauvignon',
        width: 182,
        height: 546,
      },
    ],
    introParagraphs: [
      'Visitors to Napa Valley this year will arrive amidst a pair of important anniversaries. While America celebrates its 250th birthday, California wine is celebrating 50 years since the tasting that became known as the “Judgment of Paris” shined a light on the state’s progress and promise.',
      'Held on May 24, 1976, the tasting arranged flights of California Chardonnays and Cabernet Sauvignon–based blends and lined them up against counterparts from Burgundy and Bordeaux. The late Steven Spurrier, who organized the tasting, often said he wasn’t trying to change the wine world. He was hoping for a fun event to show the French how good California wines were. Spurrier, an Englishman, fell in love with France and built a successful wineshop in Paris catering to fellow ex-pats, then opened a wine school, L’Académie du Vin, which thrived. (Still open, L’Academie is releasing a book on the Judgment this year.)',
      'That educational spirit inspired the tasting. As a publicity exercise for the school and shop, Spurrier and his American co-worker Patricia Gallagher decided to host a tasting of California wines, timed in 1976 to celebrate the U.S. bicentennial—after all, France had helped America win independence. They invited Parisian media organizations and local wine writers. Only George Taber, Time’s Paris bureau chief (who had taken a course at L’Académie), showed up. The French, with their view of wine frozen in amber, weren’t interested. But that would soon change.',
      'The tasting was blind, to avoid inherent bias, but the setup itself was fundamentally flawed. Spurrier originally told the judges they would be tasting only California wines—then he threw a curveball, mentioning as the tasting was about to begin that there would be French wines too. The judges spent most of the tasting debating the origins of the wines, rather than their quality. There was also the panel format, with each judge rating wines on a 20-point scale, after which their scores were averaged. This obscured the wildly different rankings from each judge. Stag’s Leap earned only two first-place scores, but averaging in its multiple third and fourth places was enough to put it on top. (Odette Kahn, the editor of Le Revue du Vin, who did rank Stag’s Leap first, unsuccessfully demanded her scorecard back, dismayed with the results.)',
      'Afterwards, most wine experts saw the tasting as intellectually interesting, but being aware of its consensus aspect, they also felt its results were hardly earth shattering. American media, however, picked up on Taber’s article. Even this magazine, less than three months old at the time, reported the results with the headline, “California Wines Top French.”',
      'There’s no denying the tasting was a moment. But the reality is that the Judgment of Paris merely called attention to a seismic change that had been building for decades.',
      'Starting after Prohibition, vintners including Louis Martini, Leland Stewart and John Daniel persevered in rebooting California’s wine industry. Innovator Robert Mondavi looked at a valley filled with plum and walnut trees and envisioned an American wine landscape. Following Mondavi’s lead came a new wave including Warren Winiarski and Mike Grgich. Both previously worked for Mondavi before establishing their own wineries with a dream of making the wine revolution happen (perhaps not coincidentally, their wines won the tasting). Baron Philippe de Rothschild first discussed forming a joint California venture with Mondavi in 1970—a strong murmur that the idea of a wine world beyond France had been kindling among the cognoscenti.',
      'The Paris tasting provided a kinetic spark. Opus One formed in 1978. Christian Moueix arrived in Napa around the same time. Soon, in addition to California, wine regions in Australia, Chile and Argentina were being recognized. The through lines continue into California’s modern era. In 2007, Italy’s Antinori family purchased a 15% stake in Stag’s Leap. In 2023, they took full ownership.',
      'History shows how much California wine has changed in the past 50 years. The Judgment of Paris was one key step in furthering the wine evolution. Today the wine world still has appellations, but it doesn’t have boundaries.',
    ],
  },

  'napa-taco-tour': {
    kicker: 'Napa Valley Taco Tour',
    heroImage: `${TACO}/hero.jpg`,
    heroObjectPosition: 'center 42%',
    introParagraphs: [
      'Napa Valley and Mexico have a long-entwined history reflected in language, culture and food. Tacos and other Mexican staples have become go-to meals in the valley, beloved by all. Today, taquerias dot the region, whether brick-and-mortar restaurants or food trucks. Most specialize in classic “street tacos,” plates of smothered tortillas that are typically prepared quickly, packed with flavor in an array of combinations and able to be eaten handily. Originally an easy meal for workers, they can be enjoyed in any setting.',
      'A proper street taco, at its simplest, needs just five ingredients: tortilla, meat, sauce, cilantro and raw onion. The best tortillas, based on masa harina de maíz, are handmade to order and warmed on a grill before being piled high with your choice of meats, sauces and more. Vegan and vegetarian selections, as well as seafood versions, can also be found. Be mindful of levels of spiciness and your tolerance to them—the radish or cucumber slices typically served on the side are there to help if you take one of those too-hot bites. Some taquerias include carrots or grilled onions on the side for a sweet counterpoint.',
      'When pairing wine with tacos, look for something with freshness and bright acidity, which cuts through the richness of the proteins and seasonings. A lower alcohol wine allows the taco’s flavors to shine and keeps spice in the background. Sparkling wines are also a great option. Rich white wines can stand up to the complexity of the taco, while lightly tannic red wines complement the seasonings without accentuating spice. If you love a big red wine, though, go ahead and have it with your tacos. And don’t forget about canned wines, an easily transportable option for a taco picnic.',
    ],
    venues: [
      {
        name: 'Azteca Market & Taqueria',
        addressLines: ['789 Main St., St. Helena', '2995 Jefferson St., Napa'],
        website: 'aztecanapavalley.com',
        coords: [-122.4695, 38.5052],
        extraMapLocations: [{ coords: [-122.2985, 38.3128], label: 'Napa location' }],
        description:
          'This Mexican grocery store holds one of the valley’s most popular taco counters. The lineup includes basics such as pollo asado, carnitas and chorizo, along with traditional buche, lengua and suadero. There’s a second location in Napa.',
      },
      {
        name: 'El Rodeo',
        addressLines: ['1850 Soscol Ave., Napa'],
        phone: '(707) 415-9800',
        coords: [-122.2855, 38.2988],
        description:
          'This truck specializes in fresh seafood tacos like shrimp and fish, alongside aguachile and seafood cocktail. Try the tripa for an authentic and adventurous bite. The taco gobernadora, with shrimp, cheese and grilled onions, is a hearty choice.',
      },
      {
        name: 'El Sabor Serano',
        addressLines: ['1017 Coombsville Road, Suite B, Napa'],
        website: 'elsaborserano.com',
        image: `${TACO}/venue-el-sabor-serano.jpg`,
        coords: [-122.2685, 38.2912],
        description:
          'Take time to sit down at this restaurant to enjoy your meal. The suadero gets top points for its juicy and tender beef. You’re going to want as much salsa verde as possible—it is made with fire-roasted tomatillos that add a smoky depth to the sauce.',
      },
      {
        name: 'El Taco Feliz',
        addressLines: ['Lake Street, Calistoga'],
        phone: '(707) 870-9129',
        restaurantSlug: 'el-taco-feliz',
        image: `${TACO}/venue-el-taco-feliz.jpg`,
        description:
          'The lines here are long for a reason—it’s among the best spots in the valley and the service is always friendly. The cabeza stands out for its generosity of seasonings and melt-in-your-mouth braised beef.',
      },
      {
        name: 'La Condesa Taqueria',
        addressLines: ['1745 Soscol Ave., Napa'],
        website: 'lacondesataquerianapa.com',
        coords: [-122.2848, 38.2975],
        description:
          'Open early, La Condesa offers breakfast tacos and licuados (smoothies) along with traditional street tacos. The chorizo taco is well-seasoned and served on a toasted tortilla that holds it together nicely.',
      },
      {
        name: 'La Luna Market & Taqueria',
        addressLines: ['1153 Rutherford Road, Rutherford'],
        website: 'lalunamarket.com',
        restaurantSlug: 'la-luna-market-taqueria',
        description:
          'This market and taqueria provides one-stop shopping for a taco picnic. The al pastor and pollo adobado tacos shine, perfectly seasoned and juicy. Conveniently, picnic tables surround the exterior of the market.',
      },
      {
        name: 'La Taquiza Fish Tacos',
        addressLines: ['2007 Redwood Road, Napa'],
        website: 'lataquizafishtacos.com',
        coords: [-122.2682, 38.3258],
        description:
          'This brick-and-mortar is known for fresh seafood options. The shrimp, fish and octopus come in various formats, including ceviche or seafood cocktail. The fish taco can be battered and fried, or seasoned and grilled, then topped with pico de gallo, cabbage and chipotle crema. Try the octopus—grilled fresh, it’s tender and meaty.',
      },
      {
        name: 'Mother’s Tacos',
        addressLines: ['3150 A Jefferson St., Napa'],
        phone: '(707) 927-5196',
        image: `${TACO}/venue-mothers-tacos.jpg`,
        coords: [-122.2965, 38.3085],
        description:
          'The house-made tortillas at Napa’s newest taco joint provide the perfect platform for traditional carne asada, suadero or pollo asado. The mushroom taco outperforms for its melt-in-your-mouth sweetness. Mother’s offers four sauces at the table; try the oil-based macha for great acidity and crunch.',
      },
      {
        name: 'Ray Ray’s Tacos',
        addressLines: ['1304 Main St., St. Helena'],
        website: 'rayrays.com',
        coords: [-122.4692, 38.5048],
        image: `${TACO}/venue-ray-rays-tacos.jpg`,
        description:
          'Ray Ray’s offers convenience with its various tacos-to-go kits, designed for building your own. A tray of 16 street tacos makes things even easier—all you have to do is pick the meat. The spiced carrot taco should not be missed, either. There is plenty of seating for dining in.',
      },
      {
        name: 'Tacos El Muchacho Alegre',
        addressLines: ['751 Jackson St., Napa'],
        website: 'tacoselmuchachoalegre.com',
        coords: [-122.2905, 38.3015],
        image: `${TACO}/venue-tacos-el-muchacho-alegre.jpg`,
        description:
          'This truck has plenty of parking spaces and picnic tables nearby. The spiced shrimp taco here is filled to capacity, with fresh slaw, pico de gallo and creamy aioli. Traditional meats, like the al pastor, are good choices too.',
      },
      {
        name: 'Tacos Garcia',
        addressLines: ['6792 Washington St., Yountville'],
        phone: '(707) 980-4896',
        coords: [-122.3615, 38.4012],
        description:
          'The tortillas from this truck (the only one in Yountville) are lightly toasted on the grill to create a firm base for the ample fillings, such as their specialty: lengua. Be sure to top any taco with the to-die-for salsa roja.',
      },
      {
        name: 'Tacos Los Compadres',
        addressLines: ['Claremont Way, Napa'],
        phone: '(707) 339-2305',
        coords: [-122.2785, 38.3142],
        description:
          'Tacos Los Compadres’ al pastor is one of the best in the valley. A trompo is used to spin the layered meat around a flame, crisping it until ready to be sliced, after which it is topped with slices of grilled pineapple. A salad bar on the outside of the truck allows you to conveniently top your tacos with as much cilantro, onions and sauce as you’d like. Hungry late? It’s open until midnight.',
      },
      {
        name: 'Tacos Michoacan',
        addressLines: ['1800 Pueblo Ave., Napa'],
        phone: '(707) 812-9963',
        coords: [-122.2548, 38.2688],
        description:
          'In business in Napa since the 1990s, this outfit sports a brick-and-mortar along with two trucks. With house-made tortillas, traditional meats and three sauces on offer, Michoacan puts out archetypal Mexican street food. Their carnitas are spot on, with an intensity of saltiness and fattiness. Don’t overlook the carrot side; it adds just the right sweetness to the finish.',
      },
    ],
  },
}

export function getFeatureArticleContent(slug: string): FeatureArticleContent | undefined {
  return FEATURE_ARTICLE_CONTENT[slug]
}
