import type { FeatureArticleContent } from '@/lib/types'

const JUDGMENT = '/images/features/judgment-of-paris'
const TACO = '/images/features/napa-taco-tour'

export const FEATURE_ARTICLE_CONTENT: Record<string, FeatureArticleContent> = {
  'judgment-of-paris': {
    kicker: 'The Judgment of Paris',
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
        transparent: true,
      },
      {
        src: `${JUDGMENT}/points-stags-leap.jpg`,
        alt: '1973 Stag’s Leap Wine Cellars Cabernet Sauvignon',
        width: 182,
        height: 546,
        transparent: true,
      },
    ],
    midArticleImage: {
      src: `${JUDGMENT}/tasting-judges.png`,
      alt: 'Judges at the 1976 Paris tasting',
      caption:
        'The judges included French vintners, sommeliers and wine writers.',
    },
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
  'napa-landmarks': {
    kicker: 'Points of Interest',
    pullQuoteLines: [
      'Two roadside icons mark',
      'the gateways to America\u2019s',
      'most famous wine valley',
    ],
    heroImage: '/images/features/napa-landmarks/welcome-sign.jpg',
    heroObjectPosition: 'center 60%',
    introParagraphs: [
      '\u201CWelcome to this world famous winegrowing region\u201D reads the sign sitting at the southern end of the valley, off Highway 29. Located in Oakville, the marker has become as famous as the region it touts, and today is one of the valley\u2019s most popular tourist attractions.',
      'Many people who visit the spot are likely unaware that there is twin signage located at the northern end of the valley, with an arguably better vantage point. The signs were erected in 1949 by Napa Valley Vintners (NVV), an association formed in 1944 by leaders of Napa\u2019s then-nascent modern wine industry, including Robert Mondavi, Fernande de Latour, Elmer Salmina, Charles Forni, John Daniel Jr., Louis M. Martini and Louis Stralla. NVV\u2019s mission was to implement initiatives to support the growth of Napa Valley.',
      'Among its first acts was to commission local artist Roland Hauck to design the signs. In their original form, the signs listed the names of nine wineries on the barrel head portion: Beringer, Louis M. Martini, Inglenook, Freemark Abbey, Beaulieu Vineyard, Napa Cooperative Vineyard, Vin-Mont Wines, The Christian Brothers and C. Mondavi & Sons. In 1966 the barrel head portion was changed to its current iteration, with a quotation from author Robert Louis Stevenson: \u201C\u2026 and the wine is bottled poetry \u2026 .\u201D',
      'The quote is taken from Stevenson\u2019s 1883 memoir, The Silverado Squatters, in which the author travels to Napa Valley on a honeymoon with his wife, Fanny. When unable to afford a hotel, they end up squatting at a mining camp named Silverado near Mount St. Helena for two months. Stevenson\u2019s experiences with vintners lead to his penning a lengthy passage explaining the wines of California, with that quote becoming one of his most famous. The author\u2019s works can be found at his namesake museum in St. Helena.',
      'Both the Oakville and Calistoga signs have vineyards and mountains as backdrops, providing lovely photo opportunities. Be sure to stop at the signs safely; it\u2019s best to avoid crossing Highway 29, so visit the southern sign on your way down valley, the northern sign while traveling up valley. The signs are also non-functional, meant for taking pictures with subjects in front of (not on top of) them. And please do not enter the vineyards behind them.',
    ],
    outroParagraphs: [
      'Crushin\u2019 it: Along with the \u201CWelcome\u201D sign, the Grape Crusher statue is one of Napa Valley\u2019s best-known landmarks. Erected in May 1988 at the southern gateway to Napa Valley, the sculpture of a vineyard worker pressing grapes is a symbol of the agriculture that is intertwined with the community.',
      'The eye-catching statue, perched on a hill just east of the Napa River Bridge, is visible from Highway 29. The farm worker is depicted in a wide brim hat, sleeves and pant legs rolled up, barefoot, and operating a grape press by hand. Visibly straining, he\u2019s tightly gripping the screw handle with one foot anchored on the basket for leverage.',
      'Santa Fe\u2013based sculptor Gino Miles designed and cast the bronze statue using the cire-perdue (lost wax) method, in which a wax model inside a one-time-use mold is replaced by molten metal. Miles cast 137 individual bronze pieces that way, then welded them together to create the 15-foot-tall sculpture, which weighs over 6,000 pounds.',
      'The figure actually started as the logo for the Napa Valley Corporate Park, built in 1983 by developer Peter Bedford. The statue is accessible at the Vista Point Park, just behind Meritage Resort.',
    ],
  },
}

export function getFeatureArticleContent(slug: string): FeatureArticleContent | undefined {
  if (slug === 'taco-truck-tour') return FEATURE_ARTICLE_CONTENT['napa-taco-tour']
  return FEATURE_ARTICLE_CONTENT[slug]
}
