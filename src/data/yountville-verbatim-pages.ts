/**
 * Verbatim transcript of the 10 InDesign draft spreads (WS063026_napaYountville_draft),
 * keyed to public/Yountville/WS063026_napaYountville_draft_Page_01.jpg … Page_10.jpg.
 * Source: draft PDF proofs (transcribed via layout review). Minor obvious OCR artifacts in
 * rates line preserved with [sic] where the proof reads implausibly.
 */

export type YountvilleVerbatimSection = {
  heading?: string
  subheading?: string
  paragraphs: string[]
}

export type YountvilleVerbatimPage = {
  /** 1–10 = draft_Page_01 … Page_10 */
  draftPage: number
  /** Folio from proof */
  wineSpectatorPage: number
  sections: YountvilleVerbatimSection[]
}

export const YOUNTVILLE_VERBATIM_MAGAZINE_TITLE =
  'THE ULTIMATE TRAVEL GUIDE TO NAPA VALLEY | YOUNTVILLE / STAG’S LEAP / OAK KNOLL'

export const YOUNTVILLE_VERBATIM_PAGES: YountvilleVerbatimPage[] = [
  {
    draftPage: 1,
    wineSpectatorPage: 2,
    sections: [
      {
        heading: 'YOUNTVILLE',
        subheading: 'World-Class Dining',
        paragraphs: [
          'BY AARON ROMANO',
          'Yountville, founded in 1855 as Sebastopol, was renamed in 1867 in honor of George C. Yount, a pioneer widely credited with planting the first wine grapes in Napa Valley. Tiny and charming, the town has long counted just a modest population (3,500 today), growing slowly even with the arrival of the railroad and eventually becoming an incorporated town in 1965. Over the past few decades, Yountville has evolved into arguably Napa Valley’s most celebrated culinary hub, and its main Washington Street is often bustling with visitors strolling its pedestrian-friendly confines. The line at the pick-up window for Bouchon Bakery can get quite long...',
          'Many of the city’s oldest buildings have been preserved and repurposed, including V Marketplace. Built in the early 1870s as Gottlieb Groezinger Winery, this large, stone complex in the center of town is now dedicated to shopping and dining venues. The French Laundry, the city’s most famous restaurant, resides in a home built in 1900 that was initially a saloon and then a steam laundry business from which the restaurant created its name.',
          'Yountville makes an ideal home base for a quintessential Napa Valley vacation, offering visitors a jumping off point in the heart of the valley (15 minutes to St. Helena or downtown Napa). Yountville’s small-town charm blends seamlessly with its several luxury hotels and concentration of top-notch dining options. Totaling just 1.5 square miles, it is an entirely walkable town—and while restaurants dominate the scene here, there are more than enough downtown tasting rooms that one could happily taste in over the course of a few days and never have to get into a car. Oak Knoll is the closest neighbor the south, with Stags Leap District just east of town adding ample choices to your itinerary.',
        ],
      },
    ],
  },
  {
    draftPage: 2,
    wineSpectatorPage: 3,
    sections: [
      {
        heading: 'WHERE TO TASTE',
        paragraphs: [
          'Downtown Yountville has more than a dozen tasting rooms, and when you include the nearby Stags Leap District and Oak Knoll AVAs, which butt up against the city from the east and south, respectively, there’s an abundance of wineries within a few minutes’ drive. These southern appellations are influenced more by San Pablo Bay, bringing fog and cooling breezes that yield an elegant style of Cabernet Sauvignon. The climate also favors other grapes, including Chardonnay, Sauvignon Blanc, Zinfandel, Petite Sirah and more.',
        ],
      },
      {
        heading: 'Yountville',
        paragraphs: [
          'Stewart',
          '6752 Washington St. | stewartcellars.com',
          'Passersby may first be lured by the charming stone building and courtyard while strolling down Washington Street, and then pleased to discover the lineup of wines available for tasting inside. This Ken Fulk- and Arcanum Architecture–designed tasting room is polished, with an eclectic residential style that includes vintage furnishings and quirky paraphernalia. The light-filled tasting hall and surrounding courtyards are welcoming to casual wine lovers who can walk in without a prior reservation. Yet it’s also a place for shrewd collectors as Stewart sources from several high-profile vineyards, and its Nomad Cabernet Sauvignon Tasting held in the NOMAD Heritage Library, a cozy, private room filled with books and a fireplace, takes guests through a deep dive into single-vineyard Cabernet bottlings, one each from Andy Beckstoffer’s famed sites, including Dr. Crane, Bourn, Las Piedras, To Kalon, Georges III and Missouri Hopper.',
          'Antinori Napa Valley — 3700 Soda Canyon Road — antinorinapavalley.com',
          'Bell Wine Cellars — 6200 Washington St. — bellwine.com',
          'Chandon — 1 California Drive — chandon.com',
          'Hestan Vineyards — 6548 Washington St. — hestanvineyards.com',
          'Mayacamas — 1155 Loyola Road — mayacamas.com',
          'Priest Ranch — 6490 Washington St. — priestranchwines.com',
        ],
      },
    ],
  },
  {
    draftPage: 3,
    wineSpectatorPage: 4,
    sections: [
      {
        heading: 'Stags Leap District',
        subheading: 'Also recommended (sidebar)',
        paragraphs: [
          'Baldacci — 5236 Silverado Trail — baldaccivineyards.com',
          'Chimney Rock — 5350 Silverado Trail — chimneyrock.com',
          'Cliff Lede — 1473 Yountville Cross Road — cliffledevineyards.com',
          'The Duckhorn Collection at Paraduxx — 7257 Silverado Trail — paraduxx.com',
          'Odette — 5998 Silverado Trail — odetteestate.com',
          'Pine Ridge — 5901 Silverado Trail — pineridgevineyards.com',
          'Quixote — 6126 Silverado Trail — quixotewinery.com',
          'Shafer — 6154 Silverado Trail — shafervineyards.com',
          'Silverado Vineyards — 6121 Silverado Trail — silveradovineyards.com',
          'Stag’s Leap Wine Cellars — 5766 Silverado Trail — stagsleapwinecellars.com',
          'Stags’ Leap Winery — 6150 Silverado Trail — stagsleap.com',
        ],
      },
      {
        heading: 'Clos Du Val',
        paragraphs: [
          '5330 Silverado Trail | closduval.com',
          'Among the six from the Judgement of Paris tasting, Clos du Val lost its way a bit over time, making lackluster wines and growing into a large-volume brand in the 1990s. But in 2014, the Goelet family began scaling back and investing significant time and money in the vineyards and winery, including its tasting room. The magic that captivated founder John Goelet and French winemaker Bernard Portet to bet on the Stags Leap District is evident in the contemporary, warm Hirondelle House where tastings are held. Tall ceilings and west-facing windows let natural light fill the space. When weather permits, a tasting on the patio, surrounded by lush gardens and overlooking the estate vineyards, is not to be missed. Each tasting experience traces the winery’s momentous history with modern wines, but a retrospective tasting allows guests to chart the winery’s stylistic evolution while sampling 10-, 20- and 30-year-old releases.',
        ],
      },
      {
        heading: 'Lewis',
        paragraphs: [
          '6320 Silverado Trail | lewiscellars.com',
          'It’s rare for a winery to move locations, but when the Wonderful Company—owners of Lewis since 2021—purchased the former Robert Sinskey Winery and surrounding property in Stags Leap, it became a full-circle moment to relocate from Lewis’ Oak Knoll winery, as the first vintage, 1992, was made at Robert Sinskey.',
          'The tasting room opened in October 2025, and the vibe is a little bit opulent and a little bit archetypal Napa, befitting Lewis’s wines. Evoking the 19th-century drawing room of English artist William Turner, the space feels luxurious and inviting, yet playful, with custom furniture and textiles from London’s House of Hackney juxtaposed against vibrant, mixed-media commissioned art by Zachary Scott. Perched on a hill, the winery’s outdoor terraces are ideal for soaking in some sunshine, and there’s a range of tasting experiences, including a five-course food and wine pairing.',
        ],
      },
    ],
  },
  {
    draftPage: 4,
    wineSpectatorPage: 5,
    sections: [
      {
        heading: 'Oak Knoll District',
        paragraphs: [],
      },
      {
        heading: 'Hendry',
        paragraphs: [
          '3104 Redwood Rd. | hendrywines.com',
          'This under-the-radar gem sits at the base of Mount Veeder; the Hendry family has stewarded the ranch since 1939 across roughly 114 acres of vines. The atmosphere is intimate and casual, with tastings on the porch or in a farmhouse-style building. Tours are led by knowledgeable staff or winemaker Mike Hendry, with a focus on estate-grown wines and the ranch’s history. The “Hike with Hendry” experience is offered four times a year.',
        ],
      },
      {
        heading: 'Trefethen',
        paragraphs: [
          '1160 Oak Knoll Ave. | trefethen.com',
          'Captain Hamden McIntyre built this historic estate in 1886 as a three-level, gravity-flow winery made entirely of wood. After the 2014 earthquake, the Trefethen family restored the building; the interior remains rustic, with high ceilings and pendant lighting. The “Taste the Estate in The Villa” experience showcases seasonal produce and wine pairings served in a Craftsman-style home.',
        ],
      },
      {
        subheading: 'Also recommended',
        paragraphs: [
          'Arrow & Branch — 5215 Solano Ave. — arrowandbranch.com',
          'Darioush — 4240 Silverado Trail — darioush.com',
          'Hagafen — 4160 Silverado Trail — hagafen.com',
          'Laird — 5055 Solano Ave. — lairdfamilyestate.com',
          'Materra — 4326 Big Ranch Road — materrawines.com',
          'Reynolds — 3266 Silverado Trail — reynoldsfamilywinery.com',
          'Robert Biale — 4038 Big Ranch Road — biale.com',
          'Signorello — 4500 Silverado Trail — signorelloestate.com',
        ],
      },
    ],
  },
  {
    draftPage: 5,
    wineSpectatorPage: 6,
    sections: [
      {
        heading: 'WHERE TO EAT',
        paragraphs: [
          'What Yountville lacks in size, it more than makes up for with its assemblage of exciting culinary options. Home to chef Thomas Keller’s famous French Laundry, a Grand Award winner since 2007, the Thomas Keller Restaurant Group also operates Best of Award of Excellence winner Bouchon Bistro, plus Bouchon Bakery, Ad Hoc + Addendum and RO Restaurant and Lounge. Packed into city limits are another dozen or so eateries, including Best of Award of Excellence winner Bottega, and Lucy, an Award of Excellence-winning restaurant within the Bardessono Hotel.',
        ],
      },
      {
        heading: 'Ad Hoc + Addendum',
        paragraphs: [
          '6476 Washington St. / thomaskeller.com/adhoc',
          'There’s rarely a lull at Ad Hoc, a mainstay on the south end of town. Locals and visitors alike have been piling in since its opening in 2006 for an opportunity to sample chef Keller’s food in a more affordable setting than the French Laundry down the street. It doesn’t hurt that it’s also one of the best three-course prix fixe meals in the valley ($59 lunch; $69 dinner), with a family-style menu of American comfort classics such as barbecue, osso buco and fried chicken rotating daily and supplemented by the likes of French onion dip & Kettle chips, with an indulgent caviar bump.',
          'For something more casual, Addendum is a seasonal, walk-up shack offering fried chicken and BBQ ribs, which can be eaten on site at picnic tables or taken to-go. Wine lovers will find an extensive selection of unique local offerings like Lang & Reed Chenin Blanc and Mayacamas Merlot, plus a smattering of European options. Overall, the vibe is convivial, approachable and rooted in the idea of gathering around great food and wine in a laid-back setting.',
        ],
      },
      {
        heading: 'Clementine',
        paragraphs: [
          '6525 Washington St. / clementineyountville.com',
          'Opened last summer, Clementine stands out from the valley’s many white tablecloth restaurants with its breezy Mediterranean bistro vibe and seasonal, flavor-packed dishes. For lunch, expect fresh appetizers and salads, such oysters with Champagne mignonette and fermented hot sauce or Caesar salad with crispy anchovies and black garlic breadcrumbs, alongside flatbreads and brunch favorites such as lobster eggs Benedict. The wood-grilled lamb burger with rosemary aioli and harissa ketchup rivals any burger in the valley. Dinner builds on the lunch menu with heartier mains, including salt-baked branzino with charred tangerines and a yogurt-spiced half chicken with tahini-roasted carrots. The wine list is compact, affordable, food-friendly and globally inspired, with a dash of hearty, standout Napa Cabernets, including Stag’s Leap Wine Cellars, Opus One and Harlan. One way to enjoy Clementine is to linger over an Aperol spritz on the olive-shaded patio on a warm summer night. Inside, the space is cottage-chic: bright and cheery, with whimsical touches such as embroidered napkins and playful watercolor prints of seafood serving gelato and dancing in top hats.',
        ],
      },
      {
        subheading: 'Also recommended',
        paragraphs: [
          'Bistro Jeanty — 6510 Washington St. — bistrojeanty.com',
          'Bottega — 6525 Washington St. — botteganapavalley.com',
          'Bouchon Bistro — 6534 Washington St. — thomaskeller.com/bouchonyountville',
          'Ciccio — 6770 Washington St. — ciccionapavalley.com',
          'The French Laundry — 6640 Washington St. — thomaskeller.com/tfl',
          'Reglis Ova — 6480 Washington St. — reglisova.com',
          'RH Restaurant — 6725 Washington St. — rh.com/us/en/yountville/restaurant',
        ],
      },
    ],
  },
  {
    draftPage: 6,
    wineSpectatorPage: 7,
    sections: [
      {
        heading: 'WHERE TO STAY',
        paragraphs: [
          'Despite its compact size, Yountville offers an array of lodging options, from boutique B&Bs to luxury hotels. In general, the options lean toward lavish, with the average rate around $500–$600 per night during winter months and as high as $800–$8900 in summer.',
          'The Estate Yountville is by far the biggest complex, a 22-acre village within the town spanning most of the west side of Washington Street and including two separate hotels—Vintage House and Hotel Villagio—plus a private five-bedroom villa along with shopping, restaurants and a spa. Bardessono and North Block also offer luxe accommodations, with resort amenities such as an on-site spa and restaurant. For something smaller, Maison Fleurie’s 13-bedroom southern France-inspired B&B is directly behind Bouchon Bakery. It’s also among the lower-priced options, but without skimping on style and comfort.',
        ],
      },
      {
        heading: 'Bardessono',
        paragraphs: [
          '6526 Yount St. / bardessono.com',
          'Following a recent $1.8 million guestroom renovation, Bardessono further cemented itself as one of Napa’s premier five-star hotels. One of only 14 LEED Platinum-certified hotels in the U.S., it brings a new meaning to eco-luxury, with its 62 spacious, lavish rooms constructed with salvaged wood, low-VOC paints and finishes, and architecture that maximizes natural light and ventilation. Its large bathrooms also double as a private spa for in-room treatments. Each room also includes a private patio or balcony. The communal grounds are serene, with native landscaping and peaceful courtyards, and a rooftop pool with plush cabanas and daybeds beckons for peacefully soaking in the sun. An on-site organic garden supplies many of the ingredients found at Lucy Restaurant and Bar, a Wine Spectator Award of Excellence winner since 2022.',
        ],
      },
      {
        heading: 'Sttupa Estate',
        paragraphs: [
          '638 Silverado Trail / sttupaestate.com',
          'Formerly Poetry Inn, this Howard Backen–designed boutique luxury hotel recently received a rebrand courtesy of its new owners, PA Capital Management, the family-owned company behind Sullivan Rutherford Estate and Loco Tequila. Perched on the eastern hills in Stags Leap, its remote location promotes privacy. Each luxurious, curated room, named after renowned poets such as Emily Dickinson and the Silverado Squatter himself, Robert Louis Stevenson, offers a distinctive flair and includes a wood-burning fireplace, deep soaking-tub, and west-facing terraces to take in the stunning view. Additional amenities include an on-site spa and direct access to a private hiking trail. The new ownership has further enhanced the guest experience by adding curated wellness programs and bespoke culinary experiences with Michelin-caliber Napa Valley chefs.',
        ],
      },
      {
        subheading: 'Also recommended',
        paragraphs: [
          'The Estate Yountville — 6481 Washington St. — theestateyountville.com',
          'Hotel Yountville — 6462 Washington St. — hotelyountville.com',
          'Maison Fleurie — 6529 Yount St. — maisonfleurienapa.com',
          'Napa Valley Lodge — 2230 Madison St. — napavalleylodge.com',
          'North Block — 6757 Washington St. — northblockyountville.com',
        ],
      },
    ],
  },
  {
    draftPage: 7,
    wineSpectatorPage: 8,
    sections: [
      {
        heading: 'YOUNTVILLE',
        subheading: 'Public Art & Rural Charm',
        paragraphs: [
          'Considering that you can walk from one end of the town to the other in about 15 minutes, a casual stroll that includes the self-guided tour of outdoor, rotating sculptures is a great way to explore the community. Many of the installations are integrated into the landscape and seem as though they’ve always been there, while others are large or brightly colored and beg for attention from a distance. Break up the stroll by checking out the handful of boutique shops and art galleries that have joined the tasting rooms and restaurants along Washington Street. Venture off the main drag and you’ll find bucolic Napa Valley farmhouses and Craftsman-style houses among the rural elegance that makes Yountville so attractive.',
        ],
      },
      {
        heading: 'Hestan Vineyards',
        paragraphs: [
          '6548 Washington St. | hestanvineyards.com',
          'At this auxiliary tasting room for cookware tycoon and vintner Stanley Cheng’s collection of wines, Hestan cookware and Ruffoni copper cookware from Italy are also on display and available for purchase.',
        ],
      },

      {
        heading: 'Mad Fritz',
        paragraphs: [
          '6720 Washington St. | madfritz.com/drink-mad-fritz-beer',
          'This tap house offers nearly a dozen of the unique beers from winemaker Nile Zacherle. There is a location in St. Helena as well. Hours are limited: Thursday to Sunday, 1 p.m. to 8 p.m.',
        ],
      },
      {
        heading: 'Napa Valley Museum',
        paragraphs: [
          '55 Presidents Circle | napavalleymuseum.org',
          'Comprising three galleries, the Napa Valley Museum houses a permanent collection of artwork, artifacts and objects that demonstrate the valley’s rich geography and history, plus rotating exhibitions and public events throughout the year.',
        ],
      },
      {
        heading: 'RH Gallery',
        paragraphs: [
          '6725 Washington St. | rh.com/us/en/Yountville',
          'A free-to-explore design showroom only, nothing is for sale here, but come in for an immersive architectural and lifestyle experience with drool-worthy inspiration for luxury home furnishings.',
        ],
      },
      {
        heading: 'Sculpture Art Walk',
        paragraphs: [
          'townofyountville.com/238/Art-Walk',
          'A self-guided exploration of the sculpted art installations downtown. Check the website for an audio tour or to book a docent-led tour for a more in-depth, behind-the-scenes walk.',
        ],
      },
    ],
  },
  {
    draftPage: 8,
    wineSpectatorPage: 9,
    sections: [
      {
        heading: 'YOUNTVILLE CHOOSE YOUR ADVENTURE',
        subheading: 'Two excursions from Aaron Romano',
        paragraphs: [],
      },
      {
        heading: '1: Culinary Delights',
        paragraphs: [
          'Cheese plates and small bites have long accompanied wine tastings, these days it’s not uncommon for Napa wineries to feature in-house chefs creating restaurant-quality dishes. With that in mind, skip lunch out and make a meal of your tastings. Washington Street is the main thoroughfare through Yountville; take it south and then turn right onto California Street to Chandon Napa Valley, easily reached by car (or bike if you don’t mind a few hills). This pioneering sparkling wine house, established in 1973, recently modernized its hospitality center and now offers a full culinary program with several seated food-and-wine experiences. Sundays feature Sparkling Sunday Brunch—three sparkling wines with seasonal sides and brunch favorites like smoked salmon eggs Benedict or Dungeness crab avocado toast. Other days, try options like “Fried Chicken and Fizz” or “Culinary Journey,” a three-course tasting with tête de cuvée wines.',
          'The renovation invites lingering in lush gardens and terraces with vineyard views, lounge seating and shady umbrellas. When ready for round two, head north on Washington, right onto Yountville Crossroad, then right when it dead ends on the Silverado Trail, to Darioush. Here, warm Persian hospitality and a communal tasting room (up to 12 guests) set the stage for an epicurean adventure. Don’t be discouraged by the name when pre-booking; the “By Invitation Only” experience is open to all and features top cuvées with seasonal food pairings. Meals begin with wood-fired barbari bread (a type of Iranian yeast-leavened flatbread) and herb butter, followed by a four-course plated meal. Past dishes have included ricotta scarpinocc with shiitake mushrooms and prosciutto crumble, and Masami Ranch New York strip with crispy squash blossom, garden peppers and sauce romesco.',
        ],
      },
    ],
  },
  {
    draftPage: 9,
    wineSpectatorPage: 10,
    sections: [
      {
        heading: '2: Stags Leap Splendor',
        paragraphs: [
          'Stags Leap District is a small, unique AVA east of Yountville, renowned for distinctive Cabernet shaped by the Palisades (a rocky volcanic outcropping in the Vaca Mountains) and cool nights from San Pablo Bay. This itinerary offers a boots-on-the-ground exploration of the region with stops at two wineries.',
          'At the Yountville Crossroad and Silverado Trail intersection sits Cliff Lede Vineyards, a relatively newer estate (founded in 2002) among its more historic neighbors. Often, vacationing means limited-to-no exercise, but a good way to get your steps in is with Cliff Lede’s “Morning Walk in the Vineyard.” Offered daily at 10:30 a.m. by appointment, it covers a mile through estate vineyards, which spans 60 acres and is split between hillside and valley floor vines, plus the Howard Backen-designed gravity-flow winery and aging caves. The tour is a little bit country, a little bit rock and roll, as a trip through the Backstage Tasting Lounge showcases rock memorabilia and rotating art exhibitions by prominent music-world artists (past featured artists include Jerry Garcia, John Lennon and Grace Slick). Sips of various wines are poured along the way, including while standing in the vineyard blocks from which the grapes used come. The walk goes on year-round, weather permitting, so wear comfortable shoes and appropriate attire.',
          'It’s a five-minute drive to Shafer, one of Napa’s most celebrated estates. But if lunch is in order, head back into Yountville for a quick slice or sandwich at Velo Deli & Pizzeria. Otherwise, hang a right on Silverado Trail and then a left immediately after passing Baldacci Family Winery, and wind upward into the Palisades to the winery. John Shafer, a Chicago publishing executive, purchased the property in 1972 and spent several years planting the hillside estate before launching in 1978. Winemaker Elias Fernandez has spent 40-plus harvests on this property, crafting Shafer Vineyards’ Hillside Select Cabernet Sauvignon, one of the most emblematic wines of Stags Leap and a treasured Napa Cabernet collectible. The “Shafer Hillside Experience” includes a sparkling welcome with small bites, followed by a Polaris Ranger tour of the iconic Shafer Hillside property, including panoramic Landers Point. Taste the latest Hillside Select vintage, then return for a sampling of library vintages—some available for purchase.',
        ],
      },
    ],
  },
  {
    draftPage: 10,
    wineSpectatorPage: 11,
    sections: [
      {
        heading: '3: Into The Hills',
        paragraphs: [
          'While exploring the valley floor, it’s easy to overlook the many wineries perched in the hills above Napa Valley. Though reaching these mountain wineries means extra drive time, they offer a peaceful retreat from the busy Highway 29 and Silverado Trail. Yountville serves as a convenient gateway to both the eastern and western hills.',
          'Begin on the east side by heading south on Silverado Trail, then left onto Soda Canyon Road for a 15-minute drive into Atlas Peak AVA, to Antinori Napa Valley. Yes, that Antinori. Owned by Italy’s renowned Antinori family since 1985, fulfilling Marchese Piero Antinori’s long-held dream of producing wine in California, the 1,200-acre estate is nestled in a natural amphitheater within the Vaca Mountains at 1,600 feet. Across 550 acres of vines on volcanic soil, abundant sun and cool elevation yield fresh yet ripe and structured wines. Visits feature a private winery and cave tour, a detailed overview of the family’s 600 years of winemaking history and a seated tasting of four estate wines with light bites. The peaceful setting and sweeping views are reminiscent of a Tuscan villa—just what drew Antinori to this site: a reminder of his home in Chianti.',
          'Because of the extra time devoted to driving, it’s best to break for lunch in between. Linger over a light, quintessentially French lunch of mussels, pomme frites and salade Lyonnaise at Thomas Keller’s Bouchon Bistro.',
          'Afterward, it’s a 30-minute, winding drive up Mount Veeder to Mayacamas. Here on the west side, soils are composed primarily of marine layers, as opposed to the volcanic soils of the east (though there is also some volcanic soil at Veeder’s highest elevations—a distinctive quirk of the AVA). Set at about 1,800 feet on a 475-acre estate, Mayacamas boasts dramatic views (the highest point is 2,400 feet) and a storied past. Its stone cellar, dating to the late 1800s, is still used alongside the modern hospitality center designed by Backen & Gillam, which opened in 2021. It’s also one of the six Napa wineries that participated in the Judgment of Paris tasting, if you’re filling out your bingo card. The private, guided tour includes an all-terrain vehicle journey through the property, breathing in bay laurel and taking in the rugged, forested Veeder landscape and mountaintop views, plus samplings of current vintage wines. As the second-coolest AVA in Napa (behind Carneros), Mount Veeder’s long growing season tends to yield powerful and tannic wines that shine with cellaring. For a taste, splurge on the reserve tasting to sample library vintages, a must-try from this historic estate.',
        ],
      },
    ],
  },
]
