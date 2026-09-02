import type { Itinerary, Region } from '@/lib/types'

const OAKVILLE_TOUR: Itinerary = {
  id: 'everything-old-new',
  title: 'The Everything Old Is New Again Tour',
  intro:
    'Two of the most anticipated re-openings this year are the Robert Mondavi Winery and Beaulieu Vineyard. Both are scheduled to open soon; RMW in May and BV by July.',
  travelMode: 'driving',
  stops: [
    {
      order: 1,
      name: 'Robert Mondavi Winery',
      category: 'winery',
      coords: [-122.410097, 38.441476],
      blurb:
        'When historic wineries reinvent themselves they reflect broader shifts across Napa Valley. At RMW, the renovation preserves the iconic 1966 Cliff May design, including the signature arch and tower. The team has added new structures on either side, including a hospitality wing wrapped in glass walls that bring guests visually closer to the vineyards.',
    },
    {
      order: 2,
      name: 'Beaulieu Vineyard',
      category: 'winery',
      coords: [-122.422105, 38.460615],
      blurb:
        'Five minutes down the road, BV has chosen restoration over replacement. The team reinforced the original stone walls instead of rebuilding them and repurposed redwood from old tanks to clad the ceilings. The redesigned space blends contemporary elements and natural light with the historic stone facade, creating a seamless indoor-outdoor flow.',
    },
  ],
}

const RUTHERFORD_SAUVIGNON: Itinerary = {
  id: 'sauvignon-blanc-discovery',
  title: 'The Sauvignon Blanc Discovery Tour',
  intro:
    'Napa may be Cabernet country, but many of its red wine specialists also craft exceptional Sauvignon Blancs. White wine lovers have plenty to celebrate with these refreshing, expressive wines.',
  travelMode: 'driving',
  stops: [
    {
      order: 1,
      name: 'Groth Vineyards & Winery',
      category: 'winery',
      coords: [-122.380111, 38.4492],
      blurb:
        'Start at Groth in Oakville and choose a tasting that features the estate Sauvignon Blanc. In the 1990s, the Groth family recognized that certain clay-heavy vineyard blocks planted to Cabernet suited white varieties better, helping usher in a new era for the grape.',
    },
    {
      order: 2,
      name: 'St. Supéry Estate Vineyards & Winery',
      category: 'winery',
      coords: [-122.414874, 38.455086],
      blurb:
        'Just 3 miles away, Rutherford’s St. Supéry welcomes guests with one of the valley’s most approachable tasting experiences. The winery farms its Sauvignon Blanc at Dollarhide Ranch in Pope Valley and has championed distinctive expressions of the grape since the 1980s.',
    },
    {
      order: 3,
      name: 'Mustards Grill',
      category: 'dining',
      coords: [-122.388162, 38.418967],
      detailSlug: 'mustards-grill',
      blurb:
        'When hunger strikes, head down Highway 29 to Mustards Grill. The ever-popular seafood tostada changes daily but typically arrives on a large, crisp tortilla layered with black beans, cabbage-jicama slaw and avocado—beautiful with a glass of crisp white wine.',
    },
    {
      order: 4,
      name: 'Grgich Hills Estate',
      category: 'winery',
      coords: [-122.429191, 38.465607],
      blurb:
        'Finish your Sauvignon Blanc tour at Grgich Hills Estate. This historic family-run winery continues to earn attention for its role in the Judgment of Paris anniversary, but its Sauvignon Blancs deserve equal acclaim—with aromatic intensity, floral lift and distinctive character.',
    },
  ],
}

const YOUNTVILLE_CULINARY: Itinerary = {
  id: 'culinary-delights',
  title: 'Culinary Delights',
  intro:
    'Skip lunch out and make a meal of your tastings. Washington Street is the main thoroughfare through Yountville; these two stops pair restaurant-quality food with standout wine.',
  travelMode: 'driving',
  stops: [
    {
      order: 1,
      name: 'Chandon Napa Valley',
      category: 'winery',
      coords: [-122.36529, 38.39768],
      blurb:
        'This pioneering sparkling wine house, established in 1973, recently modernized its hospitality center and now offers a full culinary program. Sundays feature the Sparkling Sunday Brunch—three sparkling wines with seasonal sides and brunch favorites like smoked salmon eggs Benedict or Dungeness crab avocado toast.',
    },
    {
      order: 2,
      name: 'Darioush',
      category: 'winery',
      coords: [-122.294664, 38.367466],
      blurb:
        'Head north on Washington to Darioush, where warm Persian hospitality sets the stage for an epicurean adventure. The “By Invitation Only” experience is open to all and features top cuvées—a four-course plated meal beginning with wood-fired barbari bread and herb butter.',
    },
  ],
}

const YOUNTVILLE_STAGS_LEAP: Itinerary = {
  id: 'stags-leap-splendor',
  title: 'Stags Leap Splendor',
  intro:
    'Stags Leap District is a small, unique AVA east of Yountville, renowned for distinctive Cabernet shaped by the Palisades and cool nights from San Pablo Bay.',
  travelMode: 'driving',
  stops: [
    {
      order: 1,
      name: 'Cliff Lede Vineyards',
      category: 'winery',
      coords: [-122.344634, 38.42402],
      blurb:
        'At the Yountville Crossroad and Silverado Trail intersection sits Cliff Lede, a relatively newer estate among its more historic neighbors. The “Morning Walk in the Vineyard” covers a mile through estate vineyards, sustainable farming practices, and pours of wine along the way—including wines made from the same vineyards you’re traversing.',
    },
    {
      order: 2,
      name: 'Shafer Vineyards',
      category: 'winery',
      coords: [-122.32665, 38.42042],
      blurb:
        'It’s a five-minute drive to Shafer, one of Napa’s most celebrated estates. Winemaker Elias Fernandez has spent 40-plus harvests crafting Hillside Select Cabernet Sauvignon. The “Shafer Hillside Experience” includes a Polaris Ranger tour of the iconic hillside property, including panoramic Landers Point.',
    },
  ],
}

const YOUNTVILLE_HILLS: Itinerary = {
  id: 'into-the-hills',
  title: 'Into the Hills',
  intro:
    'While exploring the valley floor, it’s easy to overlook the many wineries perched in the hills above Napa Valley. Yountville serves as a convenient gateway to both the eastern and western hills.',
  travelMode: 'driving',
  stops: [
    {
      order: 1,
      name: 'Antinori Napa Valley',
      category: 'winery',
      coords: [-122.29176, 38.42783],
      blurb:
        'Head south on Silverado Trail, then left onto Soda Canyon Road for a 15-minute drive into Atlas Peak AVA. Owned by Italy’s renowned Antinori family since 1985, the 1,200-acre estate is nestled in a natural amphitheater within the Vaca Mountains at 1,600 feet.',
    },
    {
      order: 2,
      name: 'Bouchon Bistro',
      category: 'dining',
      coords: [-122.362, 38.4026],
      detailSlug: 'bouchon-bistro',
      blurb:
        'Because of the extra time devoted to driving, break for lunch between stops. Linger over a light, quintessentially French lunch of mussels, pomme frites and salade Lyonnaise at Thomas Keller’s Bouchon Bistro.',
    },
    {
      order: 3,
      name: 'Mayacamas',
      category: 'winery',
      coords: [-122.42344, 38.3652],
      blurb:
        'Afterward, it’s a 30-minute, winding drive up Mount Veeder to Mayacamas. Set at about 1,800 feet on a 475-acre estate, Mayacamas boasts dramatic views and a storied past—including participation in the Judgment of Paris tasting.',
    },
  ],
}

const ST_HELENA_OFF_GRID: Itinerary = {
  id: 'off-the-grid-cabernets',
  title: 'Off-the-Grid Cabernets',
  intro:
    'Head east out of town, crossing both the Pope Street bridge and Silverado Trail to head up the winding, rugged Conn Valley Road—then return for a lazy lunch in town.',
  travelMode: 'driving',
  stops: [
    {
      order: 1,
      name: 'Seavey Vineyard',
      category: 'winery',
      coords: [-122.40027, 38.5081],
      blurb:
        'The drive time to Seavey Vineyard is just 15 minutes, but as you pass through the gate onto the property, you’ll feel a world away. The winery is housed in a restored 1880s stone dairy barn. Under winemaker Jim Duane, the Cabernet here is deep, dark and vivid, with a decidedly cool cast iron note.',
    },
    {
      order: 2,
      name: 'Forman Vineyard',
      category: 'winery',
      coords: [-122.44552, 38.51734],
      blurb:
        'Drive back and make the righthand turn up Big Rock Road to Ric Forman Vineyard. Tastings are held in a stone-walled tasting room that sits several stories below the winery. Forman, a legend in the valley, runs the property he founded in 1978 along with his son Tobias.',
    },
    {
      order: 3,
      name: 'The Charter Oak',
      category: 'dining',
      coords: [-122.4608, 38.50322],
      blurb:
        'From there you’re barely 10 minutes back to town. After all that tannin and Cab, the smash burger at the Charter Oak makes for a perfect lazy lunch. Grab some outdoor seating if it’s not too hot—the patio is well-shaded.',
    },
  ],
}

const ST_HELENA_WEST_SIDE: Itinerary = {
  id: 'west-side-family-wineries',
  title: 'West Side Family Wineries',
  intro:
    'The west side of St. Helena is the tony residential area—or at least that’s what denizens of the western side of Highway 29 will tell you. This jaunt stays on the west side while introducing multi-generational family-owned wineries.',
  travelMode: 'driving',
  stops: [
    {
      order: 1,
      name: 'Salvestrin Winery',
      category: 'winery',
      coords: [-122.46127, 38.496729],
      blurb:
        'Head south and you’ll be barely out of town when you’ll see a vineyard on your right with a small shingle sign that says Salvestrin Winery, est. 1932. Rich Salvestrin represents the third generation on the property, along with his wife and daughters.',
    },
    {
      order: 2,
      name: 'Corison Winery',
      category: 'winery',
      coords: [-122.447409, 38.484996],
      blurb:
        'From there, it’s not even three minutes to Corison Winery, marked by a pair of tall palm trees at the driveway entrance. Here you’ll find Cathy Corison and her nearly 50 vintages of winemaking experience.',
    },
    {
      order: 3,
      name: 'Under-Study',
      category: 'dining',
      coords: [-122.450479, 38.488773],
      blurb:
        'For lunch, try Under-Study, from PRESS chef Philip Tessier. A bakery/coffee stop, it turns into a café with small plates for lunch.',
    },
  ],
}

const ST_HELENA_HISTORY: Itinerary = {
  id: 'st-helena-history-lesson',
  title: 'A St. Helena History Lesson',
  intro:
    'With this year marking the 50th anniversary of the Judgment of Paris tasting, what better time to stop in and check on how a few of the wineries that were involved are doing today?',
  travelMode: 'driving',
  stops: [
    {
      order: 1,
      name: 'Freemark Abbey',
      category: 'winery',
      coords: [-122.49643, 38.525635],
      blurb:
        'Freemark Abbey’s history goes way back before the 1976 event, starting in 1881 with Josephine Tychon. In the 1940s and 1950s, the winery opened a “sampling room”—basically the region’s first tasting room.',
    },
    {
      order: 2,
      name: 'Spring Mountain Vineyard',
      category: 'winery',
      coords: [-122.48985, 38.50607],
      blurb:
        'Spring Mountain Vineyard, which had its 1973 Chardonnay in the Paris tasting, is going through yet another awakening. Part of an experience here can include a tour of the property, well worth it.',
    },
    {
      order: 3,
      name: "Charlie's Napa Valley",
      category: 'dining',
      coords: [-122.468853, 38.505038],
      detailSlug: 'charlies-napa-valley',
      blurb:
        'After the tasting, buy a bottle from the extensive library inventory and take it to Charlie’s to have alongside lunch. Chef Elliott Bell manages a culinary garden on the Spring Mountain Vineyard property for his St. Helena restaurant.',
    },
  ],
}

const ST_HELENA_SALONS: Itinerary = {
  id: 'modern-tasting-salons',
  title: 'Modern Tasting Salons',
  intro:
    'These modern-day stops will give you a refined wine experience, defined by hosts with sommelier-level knowledge in a tasting setting that feels educational and curated.',
  travelMode: 'driving',
  stops: [
    {
      order: 1,
      name: 'HALL St. Helena',
      category: 'winery',
      coords: [-122.453057, 38.488972],
      href: '/partners/hall-st-helena',
      blurb:
        'Start at HALL St. Helena on the historic Bergfeld Vineyard. Pair award-winning Cabernets with contemporary art and seasonal culinary bites on a LEED Gold–certified estate—Bunny Foo-Foo included.',
    },
    {
      order: 2,
      name: 'Royal We Wines',
      category: 'winery',
      coords: [-122.464995, 38.501492],
      blurb:
        'Head into town for Royal We Wines, a tasting salon from winemaker Thomas Rivers Brown and partner Matt Hardin. The space is comfy/swanky with a bar counter and side rooms that offer varying seating configurations.',
    },
    {
      order: 3,
      name: 'Wheeler Farms',
      category: 'winery',
      coords: [-122.437614, 38.487375],
      blurb:
        'Continue south and turn left down Zinfandel Lane to Wheeler Farms. Winemaker Nigel Kinsman makes Accendo here, along with Kinsman Eades, Bella Oaks, Annulus and other labels.',
    },
  ],
}

const CALISTOGA_WALKABLE: Itinerary = {
  id: 'walkable-tasting-tour',
  title: 'A Walkable Tasting Tour',
  intro:
    'Here’s an antidote to valley driving: a tasting at three great Calistoga wineries, all within walking distance of one another—plus a lunch stop for juicy Napa red.',
  travelMode: 'walking',
  stops: [
    {
      order: 1,
      name: 'Rivers-Marie',
      category: 'winery',
      coords: [-122.57738, 38.57479],
      blurb:
        'From where Lincoln Road meets Foothill Boulevard, it’s two and a half blocks south to Rivers-Marie. Winemaker Thomas Rivers Brown’s personal winery offers single-vineyard bottlings of Chardonnay and Pinot Noir from the Sonoma Coast, as well as Cabernet Sauvignon.',
    },
    {
      order: 2,
      name: 'Lola Wines',
      category: 'winery',
      coords: [-122.578576, 38.574769],
      detailSlug: 'lola-wines',
      blurb:
        'Head back up Foothill and in just a block you’ll arrive at Lola Wines. The brick bungalow looks like a residence, but within discover wines from owner Seth Cripe—Russian River Valley Pinot Noir plus Vermentino, Charbono and Counoise. A tasting here is a great value at $35 for five wines.',
    },
    {
      order: 3,
      name: 'Tank Garage Winery',
      category: 'winery',
      coords: [-122.57963, 38.575214],
      blurb:
        'Your next stop looks like a gas station. Tank Garage is built in a restored 1930s gas station with eclectic blends, all fairly affordable, and tastings run about $40 per person.',
    },
    {
      order: 4,
      name: "Buster's Southern BBQ",
      category: 'dining',
      coords: [-122.58105, 38.57488],
      blurb:
        'Buy a bottle for your next stop—lunch at Buster’s BBQ, a block to the north. Charles “Buster” Davis cooks brisket, ribs and other meaty goodness here, the perfect pairing for a juicy Napa red wine. They allow BYOB with a corkage fee.',
    },
  ],
}

const CALISTOGA_MOUNTAIN: Itinerary = {
  id: 'mountain-getaway',
  title: 'Mountain Retreat',
  intro:
    'Some of the most promising wineries in Napa Valley aren’t in the valley at all—they’re up the mountain on Howell Mountain, which produces some of the region’s most interesting wines.',
  travelMode: 'driving',
  stops: [
    {
      order: 1,
      name: 'CADE Estate',
      category: 'winery',
      coords: [-122.443563, 38.56136],
      blurb:
        'Head south on Highway 29, turn left onto Deer Park Road, and climb Howell Mountain to CADE Estate. Past a fire pit, there’s a tasting room with gorgeous views of redwoods and the valley far below. CADE makes a lovely Sauvignon Blanc and delicious Cabernet—a good intro to Howell Mountain fruit.',
    },
    {
      order: 2,
      name: 'Outpost Wines',
      category: 'winery',
      coords: [-122.46362, 38.59815],
      blurb:
        'Head farther uphill to Outpost Wines, perched on a ridge with Napa Valley on one side and Pope Valley on the other. Thomas Rivers Brown makes the wines here, including Cabernet, an intriguing Grenache and a Zinfandel.',
    },
  ],
}

const DOWNTOWN_CARNEROS: Itinerary = {
  id: 'wind-in-your-hair',
  title: 'The Wind in Your Hair Tour',
  intro:
    'Carneros stands out with its own microclimate, aromas and energy—rolling hills, bay breezes and eucalyptus windbreaks define the landscape.',
  travelMode: 'driving',
  stops: [
    {
      order: 1,
      name: 'Boon Fly Café',
      category: 'dining',
      coords: [-122.3498, 38.2452],
      blurb:
        'Start a day exploring the Napa side of Carneros with donuts—specifically, the famous ones at Boon Fly Café. Located at Carneros Resort and Spa, the bright red barn-style restaurant welcomes guests through a separate entrance off Sonoma Highway.',
    },
    {
      order: 2,
      name: 'Bouchaine Vineyards',
      category: 'winery',
      coords: [-122.3842, 38.2389],
      blurb:
        'Drive less than 10 minutes to Bouchaine Winery. On a clear day the property offers sweeping bay views. The wines are precise and aromatic, and the winery hosts dynamic educational programs—including Falconry in the Garden on Friday mornings.',
    },
    {
      order: 3,
      name: 'Domaine Carneros',
      category: 'winery',
      coords: [-122.3685, 38.2458],
      blurb:
        'Just five minutes away, Domaine Carneros rises from a hilltop like a fairy-tale château. Climbing the romantic, grand staircase offers countless photo opportunities. Two experiences stand out: The Art of Sabrage and the Ultimate Caviar Experience.',
    },
  ],
}

export const REGION_ITINERARIES: Partial<Record<Region | string, Itinerary[]>> = {
  oakville: [OAKVILLE_TOUR],
  rutherford: [RUTHERFORD_SAUVIGNON],
  yountville: [YOUNTVILLE_CULINARY, YOUNTVILLE_STAGS_LEAP, YOUNTVILLE_HILLS],
  'st-helena': [
    ST_HELENA_SALONS,
    ST_HELENA_OFF_GRID,
    ST_HELENA_WEST_SIDE,
    ST_HELENA_HISTORY,
  ],
  calistoga: [CALISTOGA_WALKABLE, CALISTOGA_MOUNTAIN],
  'beyond-napa': [DOWNTOWN_CARNEROS],
}

export function getRegionItineraries(slug: string): Itinerary[] {
  return REGION_ITINERARIES[slug] ?? []
}

export function findItineraryById(slug: string, id: string): Itinerary | undefined {
  return getRegionItineraries(slug).find((it) => it.id === id)
}
