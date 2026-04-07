import type { Region } from '@/lib/types'
import { TEST_IMAGES } from '@/lib/test-images'

export interface RegionAdventure {
  title: string
  intro: string
  body: string
}

export interface RegionData {
  slug: Region | string
  name: string
  tagline: string
  author?: string
  issue?: string
  pullQuote?: string
  adventure?: RegionAdventure
  heroImage: string
  accentColor: string
  intro: string
  body: string
  soilNote: string
  bestFor: string[]
  winerySlugs: string[]
  restaurantSlugs: string[]
  hotelSlugs: string[]
  articleSlug: string
  mapCenter: [number, number]
  mapZoom: number
  neighborRegions: string[]
}

export const regions: RegionData[] = [
  {
    slug: 'oakville',
    name: 'Oakville',
    tagline: 'The Spirit of Cabernet',
    author: 'MaryAnn Worobiec',
    issue: 'June 15 & 30, 2026',
    heroImage: TEST_IMAGES[0],
    accentColor: '#1C2E12',
    pullQuote:
      'The Oakville AVA is sacred ground for Cabernet Sauvignon. Its vineyards are considered the filet mignon of the valley because of how the grape performs in the terroir.',
    intro: `Located between Yountville and Rutherford as you head north, Oakville can appear to visitors as little more than a blip, with the famed Oakville Grocery serving as its spiritual center. Yet Oakville boasts the highest concentration of benchmark estates in Napa Valley—Harlan Estate, Robert Mondavi, Opus One, Silver Oak, Far Niente and Heitz Cellar to name a few. It is also home to two of California's most renowned vineyards, To Kalon and Martha's.`,
    body: `The Oakville AVA is sacred ground for Cabernet Sauvignon. Its vineyards are considered the filet mignon of the valley because of how the grape performs in the terroir. Oakville Cabernets are beloved for their richness and density of fruit, savory and earth elements combined with their reputation as being among the most ageworthy in Napa Valley.

Located between Yountville and Rutherford as you head north, Oakville can appear to visitors as little more than a blip, with the famed Oakville Grocery serving as its spiritual center. Yet Oakville boasts the highest concentration of benchmark estates in Napa Valley—Harlan Estate, Robert Mondavi, Opus One, Silver Oak, Far Niente and Heitz Cellar to name a few. It is also home to two of California’s most renowned vineyards, To Kalon and Martha’s.

The Oakville Grocery dates to 1881 and is one the longest continuously operating grocery stores in California. It remains both a must-stop for tourists and a convenient pit stop along Highway 29 for the locals. Visitors can refuel with excellent coffee, pastries and high-quality picnic provisions, including hearty sandwiches and a curated selection of gourmet pantry goods. On sunny days, guests enjoy wood-fired pizzas on the patio. The shop also offers an excellent selection of gifts for food lovers.

Grapegrowing in Oakville began with H.W. Crabb, an Ohio native who came to California in search of gold. Crabb purchased 240 acres in what is now Oakville in 1868. He built a railroad depot and initially planted table and raisin grapes. In 1872, Crabb established a vineyard and winery he named To Kalon, Greek for “highest beauty.” At the time, it was one of the largest vineyards in the region, producing about 5,500 cases of wine annually.

Since Crabb’s death, vintners have debated the vineyard’s legacy. Subsequent owners divided and sold the land. In 1966, vintner Robert Mondavi built his winery on part of the To Kalon property, helping to launch Napa’s modern wine era. Along the way, Mondavi was granted trademarks in 1988 and 1994, now owned by Constellation Brands following their purchase of the Mondavi winery in 2004. Other vintners argue that they have the right to use the name because they farm portions of the original estate; grower Andy Beckstoffer was able to secure naming rights for his portion. The dispute continues and has grown bitter at times, a testament to To Kalon’s enduring significance.

Driving through Oakville offers one of the best ways to understand the “valley.” The AVA covers ground from the foothills of the Vaca mountain range’s volcanic soils on its eastern flank to the Mayacamas’ alluvial soils on its western edge, with each side offering distinct characteristics in their wines.

Where to Taste

Cardinale Winery 7600 St. Helena Highway | cardinale.com
It’s a short drive off of Highway 29 up to the beautiful stone building where Car
dinale hosts its tastings, but it feels like a world away from the traffic and bustle
of the valley floor. Panoramic views are highlighted by a recent upgrade, with
more outdoor options, comfortable seating and stylish designs. Tasting ex
periences of Christopher Carpenter’s Bordeaux-style wines include culinary
options and library vintages.
Cardinale Far Niente Winery /
Bella Union Winery 1350 Acacia Drive | far niente.com
Gil and Beth Nickel opened Far Niente in 1979, and the 19th-century stone winery and surrounding fairy tale-esque gardens are definitely worth a visit to experience the environs, fine wines and a chance to try their late-harvest Dolce.
We also recommend taking a short drive north to check out the latest tasting room in the winery’s portfolio, Bella Union (which is technically in Rutherford), founded in 2012 as a way to celebrate regional blend expressions of Napa wine. The former Provenance tasting room was recently remodeled for Bella Union, and embraces the La Belle Époque era with more modern designs, many tasting opportunities and stunning views.
Nickel & Nickel 8164 St. Helena Highway | farniente.com/
wineries/nickel-and-nickel A distinctive white estate fence outlines
this picturesque estate, which includes an 1884 Victorian farmhouse, barn-style
winery and horse stables. The wines are also distinctive; winemaker Joe Harden
dives into single-vineyard expressions of Napa Cabernet Sauvignon through a va
riety of methods that make an excellent case for terroir.
Rudd Estate / Crossroads House
500 Oakville Cross Road | ruddwines.com Rudd Estate is among the most scenic
wineries in Napa, with a wonderful garden and scraggly oak trees creating a
serene setting. It’s also among one of the few second-generation, family
owned properties you can visit. While visiting Rudd to taste their wines is an
excellent idea, the Crossroads House is also on the property, where their second
label of the same name is served with various offerings from caviar to picnic
B Cellars Winery
703 Oakville Cross Road bcellars.com
Groth Vineyards & Winery
750 Oakville Cross Road grothwines.com
Miner Family Winery 7850 Silverado Trail minerwines.com
Opus One 1144 Oakville Cross Road opusonewinery.com PlumpJack Estate Winery 620 Oakville Cross Road
plumpjackwinery.com Promontory Wine
1601 Oakville Grade promontory.wine Rudd lunches curated by nearby Under-Study.

7377 St. Helena Highway | brix.com

Where to Eat

Brix represents farm-to-table cuisine, but in this case the restaurant is located amid the farm. Part of an exquisite 16-acre estate, there are raised beds of vegetables and herbs, a fruit and citrus orchard and a vineyard where the Kelleher family– owners of Brix and their own namesake winery–grow grapes. Seasonal offerings might include pappardelle with bone mar row, black pepper and Parmigiano-Reggiano, or their fried
chicken, which is served with a cheddar biscuit, mashed pota toes and gravy. Further comfort food items, like “Arnold Palm er’s Meatloaf” are perfectly prepared, as is a Dungeness crab tagliatelle with crispy prosciutto and sea urchin butter.
Mustards Grill 7399 St. Helena Highway | mustardsgrill.com
“Sorry, everything is delicious,” you’ll see on the signage for Mustard’s Grill, a dreamy restaurant that is always buzzing with excitement and dishing up hearty American fare as imag ined by chef-owner Cindy Pawlcyn. Since 1983, Pawlcyn has helped define wine country cuisine–seasonal, fresh, comforting and approachable, and of course, a terrific match for wine. The delicate onion rings are a must-order, as is the Mongolian pork chop with sweet-n-sour red cabbage and house-made mustard. The kitchen does lighter fare with plenty of precision, including the daily tostada and Hunan grilled chicken salad.
Oakville Grocery Mustards shooting Mustards
Breakfast/ Coffee/
Sandwiches/ Snacks
Oakville Grocery 7856 St. Helena Highway | oakville
grocery.com Do stop by the iconic Oakville Grocery, if only to stretch your legs and wander among the crowded shelves
packed with gourmet pantry ingredients and snacks that make excellent
gifts. Coffee, pastries, cookies and picnic provisions are all here, as well
as gourmet salads and large, shareable sandwiches, like the “Wagon
Wheel” sandwich with Fra’mani rosemary ham, Cowgirl Creamery Wagon
Wheel Cheese and Dijonnaise.
Wood-fired pizzas, served on the patio, are also top notch.`,
    adventure: {
      title: 'The Everything Old Is New Again Tour',
      intro: `Two of the most anticipated re-openings this year are the Robert Mondavi Winery and Beaulieu Vineyard. Both are scheduled to open soon; RMW in May and BV by July.`,
      body: `THE EVERYTHING OLD IS NEW AGAIN TOUR Two of the most anticipated re-openings this year are the
Robert Mondavi Winery and Beaulieu Vineyard. Both are scheduled to open soon; RMW in May and BV by July, and they are offering reservations as of press time. When historic wineries reinvent themselves they reflect broader shifts across Napa Valley. As a new generation of owners and wine lovers shapes the region’s future, Napa continues to ask: How do you honor a storied past while embracing what comes next?
At RMW, the renovation preserves the iconic 1966 Cliff May design, including the signature arch and tower that echo California’s Spanish missions. The team has added new structures on either side, including a hospitality wing wrapped in glass walls that bring guests visually closer to the vineyards. Designers lined the ceiling with oak staves salvaged from old fermentation vats—wine stains and all—adding texture and authenticity to the modern space.
Five minutes down the road, BV has also chosen restoration over replacement. The team reinforced the original stone walls instead of rebuilding them and repurposed redwood from old tanks to clad the ceilings, even preserving boards marked with handwritten notes. During construction, the winery recycled 98% of its materials. The redesigned space blends contemporary
elements and natural light with the historic stone facade, creating a seamless indoor-outdoor flow. Historical artifacts are on display Throughout the property, including founder Georges de
Latour’s refurbished Cadillac near the entrance. Expect heavier traffic as wine lovers line up to experience the results of these years-long renovations. As with any highly anticipated restaurant debut, allow a little time for staff to settle into the new spaces and refine service. Even so, both re-openings promise to reward the wait.`,
    },
    soilNote:
      'Gravelly Bale loam and volcanic alluvium. Excellent drainage forces deep root systems, concentrating flavor while naturally limiting yields.',
    bestFor: ['Cabernet Sauvignon', 'Cult wines', 'Historic estates', 'To Kalon'],
    winerySlugs: ['far-niente', 'nickel-and-nickel', 'cardinale', 'rudd-estate', 'opus-one'],
    restaurantSlugs: ['brix', 'mustards-grill'],
    hotelSlugs: [],
    articleSlug: 'napa-oakville',
    mapCenter: [-122.4089, 38.4298],
    mapZoom: 13,
    neighborRegions: ['rutherford', 'yountville', 'st-helena'],
  },
  {
    slug: 'rutherford',
    name: 'Rutherford',
    tagline: 'Storied Vineyards',
    author: 'MaryAnn Worobiec',
    issue: 'June 15 & 30, 2026',
    heroImage: TEST_IMAGES[1],
    accentColor: '#2E1A0A',
    pullQuote: `Tchelistcheff coined the term "Rutherford Dust," in reference to dusty, powdery alluvial soils on the west side, and the distinct subtle grain and minerality they imbue in the AVA's Cabernets.`,
    intro: `When it comes to grapevines, Rutherford is one of Napa Valley's big names. But as far as towns go, Rutherford is a blink-and-you'll-miss-it spot along Highway 29 about halfway up the valley. As you drive past a former railroad station you might catch the smoky aromas of expertly grilled food at Rutherford Grill without realizing you've just passed through the heart of a town with a population of only about 100.`,
    body: `When it comes to grapevines, Rutherford is one of Napa Valley’s big names. But as far as towns go, Rutherford is a blink-and-you’ll-miss-it spot along Highway 29 about halfway up the valley. As you drive past a former railroad station you might catch the smoky aromas of expertly grilled food at Rutherford Grill without realizing you’ve just passed through the heart of a town with a population of only about 100. On Rutherford Cross Road, there’s a small post office, the Rancho Caymus Inn and La Luna Market & Taqueria, a go-to for locally favored Mexican food. But this sleepy appearance belies that Rutherford boasts a rich wine history shaped by some of the region’s most important trailblazers.

The indigenous Mishewal-Wappo people first inhabited the land that now includes present-day Yountville, Oakville and Rutherford. In 1836, authorities granted nearly 12,000 acres on the valley floor to George C. Yount as part of the Rancho Caymus land grant. In 1864, Yount gave his daughter Elizabeth 1,040 acres in the center of the modern-day AVA as a wedding gift when she married Thomas Rutherford. The Rutherfords planted vineyards and produced wine, while giving the town its name.

The Rutherfords’ parcel changed hands several times before Finnish fur trader and sea captain Gustave Niebaum acquired it in 1879. He founded Inglenook and built its semi-Gothic château in 1887; the building still stands. After Prohibition ended, his grand-nephew John Daniel Jr. crafted a series of extraordinary wines until he sold the estate in the 1960s. In 1975, filmmaker Francis Ford Coppola purchased the estate; he worked to reunite the original property and transform it into a popular tourist destination.

French chemist Georges de Latour had arrived in California in 1883 and built his fortune in the cream of tartar business, an important baking ingredient that is a natural byproduct of winemaking. In 1900, he moved to Napa Valley and founded Beaulieu Vineyard on land adjacent to Inglenook. He also became the first to import phylloxera-resistant rootstock. In 1938, de Latour hired winemaker André Tchelistcheff at BV and under his direction, the Georges de Latour Private Reserve Cabernet became one of the most famous wines in the world.

Rutherford sits at the widest point of Napa Valley, where fewer mountain shadows allow more sunlight to reach the vineyards. The benchlands divide into two distinct areas. On the eastern edge, complex soils and varied microclimates fold into the Vaca Mountains. Volcanic soils dominate much of this terrain and remain moderately deep, but the mountains delay sunrise and slow the warming of the vines.

The western benchland receives morning sun and gains protection from afternoon heat when the sun dips behind the Mayacamas Mountains. This side of the valley features more alluvial soils and experiences cooler, windier conditions that create a drying effect.

Tchelistcheff coined the term “Rutherford Dust,” in reference to dusty, powdery alluvial soils on the west side, and the distinct subtle grain and minerality they imbue in the AVA’s Cabernets. There are few simple pleasures as fine as sipping a Rutherford Cabernet while some Rutherford Dust clings to your shoes after a day in the vineyards.

Where to Taste

Cathiard Family Estate 1978 Zinfandel Lane | cathiardvineyard.com
The late Daniel Cathiard built an impressive career in wine, purchasing Bordeaux’s Smith-Haut-Lafitte in 1990, then buying (and renaming) the former Flora Springs estate at the base of the Mayacamas mountain range in 2020. Management was just transitioning to the family’s next generation when Cathiard died earlier this year. A visit makes it clear how deeply the family is dedicated to this property, with meticulously maintained grounds and intimate visit experiences that might include a tour of the vineyards in an electric Range Rover, including the wine cave and on-site cooperage.

Inglenook/Niebaum-Pennino 1991 St. Helena Highway | inglenook.com; niebaumpennino.com
Even if you didn’t know Francis Ford Coppola owned Inglenook, you’d still pick up on how cinematic and grand the estate is, a mix of history, beauty, movie memorabilia and elegant wines. There are plenty of visitor experiences available, from simply enjoying a glass to more informative tours and library tastings. The recently opened Pennino House on the property is another chance to taste wines in a relaxed atmosphere, like stepping into a family home with a cozy living room plus plenty of outdoor seating. Here they also serve a curated selection of Italian-inspired non-alcoholic beverages.

Quintessa 1601 Silverado Trail | quintessa.com
Quintessa lies an easy turn off of the Silverado Trail, but a visit here takes you off the beaten path, into the heart of Rutherford and a uniquely serene setting. The entire property is nearly 300 acres, and the best way to soak it all in is through the “Quintessential Experience,” where a tasting takes place in a private glass pavilion overlooking Dragon Lake.

Staglin Family Vineyard 1570 Bella Oaks Lane | staglinfamily.com
There’s much to learn from a visit to Staglin, beginning with the viticultural history of the property, which dates to 1864. Significant figures such as André Tchelistcheff and Beaulieu founder Georges de Latour have ties here, drawn to this place that clearly defines what makes the Rutherford Bench an amazing place to grow grapes. For more than 40 years, the Staglin family has been the caretaker, including piecing together parts of the property that had been separated from the original, such as the Steckter home, which is now their base for hospitality. The winery remains family run, with second-generation vintner Shannon Staglin at the helm.

Where to Eat

Rutherford Grill 1180 Rutherford Road | rutherfordgrill.com
It would be easy to simply think of Rutherford Grill as the best place to pair expertly crafted barbeque with rich Napa Cabernets. But there’s so much more to enjoy, including deviled eggs, a generous iceberg wedge salad, oak-grilled salmon and iron skillet cornbread bites. The staff is friendly and the patio seating is popular when weather permits.

La Luna Market & Taqueria 1153 Rutherford Road | lalunamarket.com

The Restaurant at Auberge du Soleil 180 Rutherford Hill Road | auberge.com/auberge-du-soleil/dine

Where to Stay

Rancho Caymus Inn 1140 Rutherford Road | ranchocaymusinn.com
Recently renovated, this inn has plenty of personality. It was originally designed and built by the Morton Salt heiress Mary Tilden Morton, who leaned into Spanish-hacienda architecture with 19th-century barn wood beams and wrought iron details. Today, it’s the Goldilocks of Napa Valley hotels; it has quiet vibes in the tiny town of Rutherford, but also is conveniently located halfway up the valley and close to much of the vineyard action. Rooms are air-conditioned and feature fireplaces and private balconies or patios.

Auberge du Soleil 180 Rutherford Hill Road | auberge.com/auberge-du-soleil`,
    adventure: {
      title: 'The Sauvignon Blanc Discovery Tour',
      intro: `Napa may be Cabernet country, but many of its red wine specialists also craft exceptional Sauvignon Blancs. White wine lovers have plenty to celebrate with these refreshing, expressive wines.`,
      body: `THE SAUVIGNON BLANC DISCOVERY TOUR Napa may be Cabernet country, but many
of its red wine specialists also craft exceptional Sauvignon Blancs (not to
mention that Sauvignon Blanc is one of Cabernet Sauvignon’s parents, along with Cabernet
Franc). White wine lovers have plenty to cele brate with these refreshing, expressive wines.
Several standout producers lie close to one another, making it easy to explore. Start at Groth
in Oakville and choose a tasting that features the
estate Sauvignon Blanc. The experience highlights how Napa has transformed Sauvignon
Blanc from an afterthought into a deliberate, dy namic category. In the 1990s, the Groth family—
now in its second generation in wine—recog nized that certain clay-heavy vineyard blocks planted to Cabernet suited white varieties better. They began replanting, helping to usher in a new era for the grape. The estate Sauvignon Blanc, first released with the 2019 vintage, ex
shoot St Supery emplifies that vision.
St Supery Grgich Hills
Just 3 miles away, Rutherford’s St. Supéry welcomes guests with one of the valley’s most approachable tasting experiences. The winery farms its Sauvignon Blanc at Dollarhide Ranch in Pope Valley, east of Napa, and has championed distinctive ex
pressions of the grape since the 1980s. Today, it remains a category leader. Several tasting flights spotlight Sauvignon Blanc, including the “White Wine Discovery,” which demonstrates how fermentation vessels from stainless steel to French oak bar rels and concrete fermentors shape the wine’s texture and style.
In season, try St. Supéry’s Mustard Season Tasting Flight. The winery pairs red and white wines with artisan pretzels, Journeyman sausages and house-made savory mustards. You can also opt for a white wine and caviar pairing to explore how Sauvignon Blanc and Sémillon complement the delicacy.
When hunger strikes, head down Highway 29 to Mustards Grill. The ever-popular seafood tostada changes daily but typically arrives on a large, crisp tortilla layered with black beans, cabbage-jicama slaw and avocado, and then finished with chipotle aioli and cotija cheese. It pairs beautifully with a glass of crisp white wine.
Finish your Sauvignon Blanc tour at Grgich Hills Estate. This historic family-run winery continues to earn attention for its role in the Judgment of Paris anniversary, but its Sauvignon Blancs deserve equal acclaim. The wines show aromatic inten
sity, floral lift and distinctive character, with select bottlings available only at the winery. Choose a tasting flight that includes them, or order a glass—or bottle—and enjoy it in the garden.`,
    },
    soilNote:
      'The Rutherford Bench: silty loam and volcanic alluvium with exceptional water retention. The distinctive "Rutherford dust" is credited with a unique earthy quality in the wines.',
    bestFor: ['Classic Cabernet', 'Historic estates', 'Sauvignon Blanc'],
    winerySlugs: ['bella-union', 'inglenook', 'quintessa', 'staglin-family-vineyard', 'cathiard-family-estate'],
    restaurantSlugs: ['rutherford-grill', 'la-luna-market-taqueria'],
    hotelSlugs: ['rancho-caymus-inn', 'auberge-du-soleil'],
    articleSlug: 'napa-rutherford',
    mapCenter: [-122.4289, 38.459],
    mapZoom: 13,
    neighborRegions: ['oakville', 'calistoga', 'pritchard-hill', 'st-helena'],
  },
  {
    slug: 'yountville',
    name: 'Yountville',
    tagline: 'World-Class Dining',
    author: 'Aaron Romano',
    issue: 'June 15 & 30, 2026',
    heroImage: TEST_IMAGES[2],
    accentColor: '#1E0A2E',
    pullQuote: `Yountville makes an ideal home base for a quintessential Napa Valley vacation, offering visitors a jumping off point in the heart of the valley. Totaling just 1.5 square miles, it is an entirely walkable town.`,
    intro: `Yountville, founded in 1855 as Sebastopol, was renamed in 1867 in honor of George C. Yount, a pioneer widely credited with planting the first wine grapes in Napa Valley. Tiny and charming, the town has long counted just a modest population (3,500 today), growing slowly even with the arrival of the railroad and eventually becoming an incorporated town in 1965. Over the past few decades, Yountville has evolved into arguably Napa Valley's most celebrated culinary hub.`,
    body: `Yountville, founded in 1855 as Sebastopol, was renamed
in 1867 in honor of George C. Yount, a pioneer widely credited with planting the first wine grapes in Napa Valley. Tiny and charming, the town has long counted just a modest population (3,500 today), growing slowly even with the arrival of the railroad and eventually becoming an incorporated town in 1965. Over the past few decades, Yountville has evolved into arguably Napa Valley’s most celebrated culinary hub, and its main Washington Street is often bustling with visitors strolling its pedestrian-friendly confines. The line at the pick-up
window for Bouchon Bakery can get quite long… Many of the city’s oldest buildings have been preserved and repurposed, including V Marketplace. Built in the early 1870s as Gottlieb Groezinger Winery, this large, stone complex in the center of town is now dedicated to shopping and dining ven

ues. The French Laundry, the city’s most famous restaurant, resides in a home built in 1900 that was initially a saloon and then a steam laundry business from which the restaurant created its name.
Yountville makes an ideal home base for a quintessential Napa Valley vacation, offering visitors a jumping off point in the heart of the valley (15 minutes to St. Helena or downtown Napa). Yountville’s small-town charm blends seamlessly with its several luxury hotels and concentration of top-notch dining options. Totaling just 1.5 square miles, it is an entirely walkable town—and while restaurants dominate the scene here, there are more than enough downtown tasting rooms that one could happily taste in over the course of a few days and never have to get into a car. Oak Knoll is the closest neighbor the south, with Stags Leap District just east of town adding ample choices to your itinerary.

Where to Taste

Downtown Yountville has more than a dozen tasting rooms, and when you include the nearby Stags Leap District and Oak Knoll AVAs, which butt up against the city from the east and south, respectively, there’s an abundance of wineries within a few minutes’ drive. These southern appel
lations are influenced more by San Pablo Bay, bringing fog and cooling breezes that yield an elegant style of Cabernet Sauvignon. The climate also favors other grapes, including Chardonnay, Sauvignon Blanc, Zinfandel, Petite Sirah and more.
Yountville Stewart
6752 Washington St. | stewartscellars.com Passersby may first be lured by the charming
stone building and courtyard while strolling down Washington Street, and then pleased to
discover the lineup of wines available for tasting inside. This Ken Fulk- and Arcanum Archi tecture–designed tasting room is polished,
with an eclectic residential style that includes vintage furnishings and quirky paraphernalia.
The light-filled tasting hall and surrounding courtyards are welcoming to casual wine lovers who can walk in without a prior reserva
tion. Yet it’s also a place for shrewd collectors as Stewart sources from several high-profile vineyards, and its Nomad Cabernet Sauvignon
Tasting held in the NOMAD Heritage Library, a cozy, private room filled with books and a fireplace, takes guests through a deep dive
into single-vineyard Cabernet bottlings, one each from Andy Beckstoffer’s famed sites, in
cluding Dr. Crane, Bourn, Las Piedras, To Kalon, Georges III and Missouri Hopper.
Stewart Antinori
Napa Valley 3700 Soda Canyon Road antinorinapavalley. com
Bell Wine Cellars 6200 Washington St. bellwine.com
Chandon 1 California Drive chandon.com
Hestan Vineyards 6548 Washington St. hestanvineyards.com
Mayacamas 1155 Loyoya Road mayacamas.com Priest Ranch 6490 Washington St. priestranchwines. com

Baldacci 6236 Silverado Trail baldaccivineyards.com Chimney
Rock 5350 Silverado Trail chimneyrock.com Cliff Lede
1473 Yountville Cross Road cliffledevineyards.com The Duckhorn
Collection at Paraduxx
7257 Silverado Trail paraduxx.com
Odette 5998 Silverado Trail odetteestate.com Pine Ridge
5901 Silverado Trail pineridgevineyards.com Quixote
6126 Silverado Trail quixotewinery.com Clos du Val
Clos Du Val 5330 Silverado Trail. | closduval.com
Stags Leap District Shafer
6154 Silverado Trail shafervineyards.com Silverado
Vineyards 6121 Silverado Trail silveradovineyards.com
Stag’s Leap Wine Cellars 5766 Silverado Trail stagsleapwinecellars. com
Stags’ Leap Winery 6150 Silverado Trail stagsleap.com
Among the six from the Judgement of Paris tasting, Clos du Val lost its way a bit over time, making lackluster wines and growing into a large-volume brand in the 1990s. But in 2014, the Goelet family began scaling back and investing significant time and money in the vineyards and winery, including its tasting room. The magic that captivated founder John Goelet and French winemaker Bernard Portet to bet on the Stags Leap District is evident in the contemporary, warm Hirondelle House where tastings are held. Tall ceilings and west-facing windows let natural light fill the space. When weather permits, a tasting on the patio, surrounded by lush gardens and overlooking the estate vineyards, is not to be missed. Each tasting experience traces the winery’s momentous history with modern wines, but a retrospective tasting allows guests to chart the winery’s stylistic evolution while sampling 10-, 20- and 30-year-old releases.
Lewis 6320 Silverado Trail. | lewiscellars.com
It’s rare for a winery to move locations, but when the Wonderful Company —owners of Lewis since 2021—purchased the former Rob
ert Sinskey Winery and surrounding property in Stags Leap, it became a full-circle moment
to relocate from Lewis’ Oak Knoll winery, as the first vintage, 1992, was made at Robert Sinskey.
The tasting room opened in October 2025, and the vibe is a little bit opulent and a little bit
archetypal Napa, befitting Lewis’s wines. Evoking the 19th-century drawing room of English artist William Turner, the space feels luxurious
and inviting, yet playful, with custom furniture and textiles from London’s House of Hackney juxtaposed against vibrant, mixed-media com
missioned art by Zachary Scott. Perched on a hill, the winery’s outdoor terraces are ideal for
soaking in some sunshine, and there’s a range of tasting experiences, including a five-course
food and wine pairing.

Lewis

Oak Knoll District Hendry
3104 Redwood Rd. | hendrywines.com Hendry is an old-school, under-the-radar gem
that delights without a grand château or pomp and circumstance. The ranch at the base of Mount
Veeder, which today includes 114 acres planted,
dates to 1859 and has been under the Hendry family’s stewardship since 1939. The vibe is inti
mate and casual, with tastings hosted on a porch or inside a simple farmhouse-style building (from
10 a.m. to 3 p.m.-ish) by appointment, and it is all
about the wine. Hendry’s knowledgeable staff pour a selection of estate-grown wines while
sharing details of the family and its history on the
ranch. Time a visit right, and you can reserve the
“Hike with Hendry” experience, held four times a year and hosted by third-generation farmer and
winemaker Mike Hendry, who discusses and dem onstrates the seasonal happenings in the vine
yard, followed by a tasting flight.
Trefethen 1160 Oak Knoll Ave.. | trefethen.com
Hendry Arrow &
Trefethen is one of Napa Valley’s many remarkable historic estates. Erected in 1886 amid a grove of ancient oak trees, Captain Hamden McIntyre, who also built Inglenook, Far Niente, Greystone and Beaulieu, designed and built the winery entirely out of wood, and it remains the only surviving three-level, gravity-flow winery from the era. Revived by the Trefethen family, who came to Napa in 1968, it nearly toppled during Napa’s 6.0-magnitude earthquake in 2014. The Trefethens meticulously restored it, and it continues to be a destination for visitors. The rustic wooden interior, with exposed beams, high ceilings and pendant lighting, lends a rich, warm glow, enhancing the sense of history, while rugs and leather seating add a cozy feel. Several of the flights fea ture food, including “Taste the Estate in The Villa,” where bites are prepared using seasonal produce from the winery’s estate gardens and are hosted at Eugene and Catherine Trefethen’s former Craftsmen-style home adjacent to the winery.
shoot with people?
Trefethen Branch
5215 Solano Ave.
arrowandbranch.com Darioush
4240 Silverado Trail darioush.com Hagafen
4160 Silverado Trail hagafen.com Laird
5055 Solano Ave. lairdfamilyestate.com Materra
4326 Big Ranch Road materrawines.com Reynolds
3266 Silverado Trail reynoldsfamilywinery. com
Robert Biale 4038 Big Ranch Road biale.com Signorello 4500 Silverado Trail signorelloestate.com

Where to Eat

What Yountville lacks in size, it more than makes up
for with its assemblage of exciting culinary options. Home to chef Thomas Keller’s famous French Laun dry, a Grand Award winner since 2007, the Thomas Keller Restaurant Group also operates Best of Award of Excellence winner Bouchon Bistro, plus Bouchon Bakery, Ad Hoc + Addendum and RO Restaurant and Lounge. Packed into city limits are another
dozen or so eateries, including Best of Award of Excellence win ner Bottega, and Lucy, an Award of Excellence-winning restau rant within the Bardessono Hotel.
Ad Hoc
Also Recommended Bistro Jeanty 6510 Washington St.
bistrojeanty.com Bottega
Ad Hoc + Addendum 6476 Washington St. | thomaskeller.com/adhoc
There’s rarely a lull at Ad Hoc, a mainstay on the south end of town. Locals and
visitors alike have been piling in since its opening in 2006 for an opportunity to
sample chef Keller’s food in a more affordable setting than the down the street. It doesn’t hurt that it’s also one of the best three-course prix
fixe meals in the valley ($59 lunch; $69 dinner), with a family-style menu of
American comfort classics such as barbecue, osso buco and fried chicken rotat
ing daily and supplemented by the likes of French onion dip & Kettle chips, with
an indulgent caviar bump.
For something more casual, Addendum is a seasonal, walk-up shack offering
fried chicken and BBQ ribs, which can be eaten on site at picnic tables or taken
to-go. Wine lovers will find an extensive selection of unique local offerings like
Lang & Reed Chenin Blanc and Mayacamas Merlot, plus a smattering of Euro
pean options. Overall, the vibe is convivial, approachable and rooted in the idea
of gathering around great food and wine in a laid-back setting.
Clementine 6525 Washington St.. | clementineyountville.
com Opened last summer, Clementine stands out from the valley’s many white tablecloth restaurants with its breezy Mediterranean bis
6525 Washington St. botteganapavalley.com Bouchon
Bistro 6534 Washington St. thomaskeller.com/ bouchonyountville
Ciccio 6770 Washington St. ciccionapavalley.com
The French Laundry 6640 Washington St. thomaskeller.com/tfl
Regiis Ova 6480 Washington St. regiisova.com RH
Restaurant 6725 Washington St. rh.com/us/en/yount ville/restaurant
tro vibe and seasonal, flavor-packed dishes. For lunch, expect fresh appetizers and sal ads, such oysters with Champagne mignon ette and fermented hot sauce or Caesar salad with crispy anchovies and black garlic breadcrumbs, alongside flatbreads and brunch favorites such as lobster eggs Benedict. The wood-grilled lamb burger with rosemary aioli and harissa ketchup rivals any burger in the valley. Dinner builds on the lunch menu with heartier mains, including salt-baked branzino with charred tangerines and a yogurt-spiced half chicken with tahini roasted carrots. The wine list is compact, affordable, food-friendly and globally inspired, with a dash of hearty, standout Napa Cabernets, including Stag’s Leap Wine Cellars, Opus One and Harlan. One way to enjoy Clementine is to linger over an Aperol spritz on the olive-shaded patio on a warm summer night. Inside, the space is cottage-chic: bright and cheery, with whimsical touches such as embroidered napkins and playful watercolor prints of seafood serving gelato and dancing in top hats.
they are sending photos with people Clementine

Where to Stay

Despite its compact size, Yountville offers an array of
lodging options, from boutique B&Bs to luxury hotels. In general, the options lean toward lavish, with the av erage rate around $500-$600 per night during winter months and as high as $800-$900 in summer.
The Estate Yountville is by far the biggest complex, a 22-acre village within the town spanning most of the west side of Washington Street and including two separate hotels—Vintage House
and Hotel Villagio—plus a private five-bedroom villa along with shopping, restaurants and a spa. Bardessono and North Block also offer luxe accommodations, with resort amenities such as an on-site spa and restaurant. For something smaller, Maison Fleurie’s 13-bedroom southern Franceinspired B&B is directly behind Bouchon Bakery. It’s also among the lower-priced op
tions, but without skimping on style and comfort. Also Recommended
Sttupa Estate 638 Silverado Trail | sttupaestate.com Formerly Poetry Inn, this Howard Backen–designed boutique luxury hotel recently received a rebrand courtesy of its new owners, PA Capital Management, the family-owned company behind Sullivan Rutherford Estate and Loco Tequila. Perched on the eastern hills in Stags Leap, its remote location promotes pri vacy. Each luxurious, curated room, named after renowned poets such as Emily Dickinson and the Silverado Squatter himself, Robert Louis Stevenson, of fers a distinctive flair and includes a wood-burning fireplace, deep soaking tub, and west-facing terraces to take in the stunning view. Additional amenities include an on-site spa and direct access to a private hiking trail. The new owner ship has further enhanced the guest experience by adding curated wellness programs and bespoke culinary experiences with Michelin-caliber Napa Valley chefs.
Bardessono Sttupa
Bardessono 6526 Yount St. | bardessono.com
Following a recent $1.8 million guestroom renovation, Bardessono further cemented itself as one of Napa’s premier five-star hotels. One of only 14 LEED Platinum-certified hotels in the U.S., it brings a new meaning to eco-luxury, with its 62 spacious, lavish rooms constructed with salvaged wood, low-VOC paints and fin ishes, and architecture that maximizes natural light and ventilation. Its large bathrooms also double as a private spa for in-room treatments. Each room also includes a private patio or bal cony. The communal grounds are serene, with native landscaping and peaceful courtyards, and a rooftop pool with plush cabanas and daybeds beckons for peacefully soaking in the sun. An on-site organic garden supplies many of the ingredients found at Lucy Restaurant and Bar, a Wine Spectator Award of Excellence winner since 2022.
The Estate Yountville 6481 Washington St. theestateyountville.com
Hotel Yountville
6462 Washington St. hotelyountville.com Maison
Fleurie 6529 Yount St.
maisonfleurienapa.com Napa Valley Lodge
2230 Madison St.
napavalleylodge.com North Block 6757 Washington St. northblockyountville. com

YOUNTVILLE Public Art & Rural Charm Considering that you can walk from
one end of the town to the other in about 15 minutes, a casual stroll
that includes the self-guided tour of outdoor, rotating sculptures is a great way to
explore the community. Many of the installations are integrated into the land
scape and seem as though they’ve always been there, while others are large or
brightly colored and beg for attention from a distance. Break up the stroll by checking
out the handful of boutique shops and art galleries that have joined the tasting rooms and restaurants along Washington Street. Venture off the main drag and you’ll find the bucolic Napa Valley farmhouses and Craftsman-style houses among the rural elegance that makes Yountville so attractive.
Hestan Vineyards 6548 Washington St. | hestanvineyards.com At this auxiliary tasting room for cookware tycoon and vintner Stanley Cheng’s collection of wines, Hestan cookware and Ruffoni copper cookware from Italy are also on display and available for purchase.
Kollar Chocolates shooting sculpture art walk caption 6525 Washington St.. | kollarchocolates.com What better complement to Yountville’s food and wine culture than craft chocolate? Anyone with a sweet tooth should seek out Kollar Chocolates, founded in 2011 by chef-turned-chocolatier Chris Kollar. Time a visit accordingly and you can watch chocolate production using European techniques like hand-tempering, or meticulous hand-painting of bonbons. Speaking of bonbons, the colorful as sortment includes unique flavor combinations like
Kollar chocolates sunflower seed praline or white chocolate ganache with yuzu gel. Whether treating yourself or shopping for a gift, there’s a dizzying array of tasting options beyond bonbons, including dark chocolate espresso malt balls, chocolate bark and more.
Mad Fritz 6720 Washington St.. | madfritz.com/ drink-mad-fritz-beer This tap house offers nearly a dozen of the unique beers from winemaker Nile Zacherle. There is a lo
cation in St. Helena as well. Hours are limited: Thursday to Sunday, 1 p.m. to 8 p.m.
Napa Valley Museum 55 Presidents Circle. | napavalleymuseum.org Comprising three galleries, the Napa Valley Museum houses a permanent collection of artwork, artifacts and objects that demonstrate the valley’s rich geography and history, plus a rotating exhibi tions and public events throughout the year.
RH Gallery 6725 Washington St.. | rh.com/us/en/Yountville A free-to-explore design showroom only, nothing is for sale here, but come in for an immersive ar chitectural and lifestyle experience with drool worthy inspiration for luxury home furnishings.
Sculpture Art Walk townofyountville.com/238/Art-Walk
A self-guided exploration of the sculpted art installations downtown. Check the website for an audio tour or to book a docent-led tour for a more in-depth, behind-the-scenes walk.`,
    adventure: {
      title: 'Three Ways to Experience Yountville',
      intro: `Three distinct adventures — culinary, Stags Leap, and into the hills — each offering a different lens on this remarkable corner of the valley.`,
      body: `1: Culinary Delights Cheese plates and small bites have long accompanied wine
tastings, these days it’s not uncommon for Napa winer
ies to feature in-house chefs creating restaurant-quality
dishes. With that in mind, skip lunch out and make a meal of
your tastings. Washington Street is the main throughfare through
Yountville; take it south and then turn right onto California Street
to Chandon Napa Valley, easily reached by car (or bike if you
don’t mind a few hills). This pioneering sparkling wine house,
established in 1973, recently modernized its hospitality center
and now offers a full culinary program with several seated food
and-wine experiences. Sundays feature the Sparkling Sunday
Brunch—three sparkling wines with seasonal sides and brunch
favorites like smoked salmon eggs Benedict or Dungeness crab avocado toast. Other days, try options like “Fried Chicken and Fizz” or “Culinary Journey,” a three-course tasting with tête de cuvée wines.
The renovation invites lingering in lush gardens and terraces with vineyard views, lounge seating and shady umbrellas. When ready for round two, head north on Washington, right onto Yountville Crossroad, then right when it dead ends on the Silverado Trail, to Darioush. Here, warm Persian hospitality and a commu nal tasting room (up to 12 guests) set the stage for an epicurean
this is the “Togetherness
Lunch” (add mention to copy?)
Darioush adventure. Don’t be discouraged by the name when pre-booking; the “By Invitation Only” experience is open to all and features top cuvées with seasonal food pairings. Meals begin with wood-fired barbari bread (a type of Iranian yeast-leavened flatbread) and herb butter, followed by a four-course plated meal. Past dishes have in
cluded ricotta scarpinocc with shiitake mushrooms and prosciutto crumble, and Masami Ranch New York strip with crispy squash blossom, garden peppers and sauce romesco.
Chandon Napa Valley

2: Stags Leap Splendor Stags Leap District is a small, unique AVA east of Yountville,
renowned for distinctive Cabernet shaped by the Palisades (a rocky volcanic outcropping in the Vaca Mountains) and cool nights from San Pablo Bay. This itinerary offers a boots-on the-ground exploration of the region with stops at two wineries.
At the Yountville Crossroad and Silverado Trail intersection sits Cliff Lede Vineyards, a relatively newer estate (founded in 2002) among its more historic neighbors. Often, vacationing means limited-to-no exercise, but a good way to get your steps in is with Cliff Lede’s “Morning Walk in the Vineyard.” Offered daily at 10:30 a.m. by appointment, it covers a mile through es
tate vineyards, which spans 60 acres and is split between hillside and valley floor vines, plus the Howard Backen-designed gravity-flow winery and aging caves. The tour is a little bit country, covering sustainable farming practices and vineyard activity, and a little bit rock and roll, as a trip through the Backstage Tasting Lounge, showcases rock memorabilia and rotating art exhibitions by prominent music-world artists (past featured artists include Jerry Garcia, John Lennon and Grace Slick). Sips of vari

ous wines are poured along the way, including while standing in the vineyard blocks from which the grapes used come[UNCLEAR]. The walk goes on year-round, weather permitting, so wear comfortable shoes and appropriate attire.
It’s a five-minute drive to Shafer, one of Napa’s most celebrated estates. But if lunch is in order, head back into Yountville for a quick slice or sandwich at Velo Deli & Pizzeria. Otherwise, hang a right on Silverado Trail and then a left immediately after passing Baldacci Family Winery, and wind upward into the Palisades to the winery. John Shafer, a Chicago publishing execu tive, purchased the property in 1972 and spent several years planting the hillside estate before launching in 1978. Winemaker Elias Fernandez has spent 40-plus harvests on this property, crafting Shafer Vineyards’ Hillside Select Cabernet Sauvignon, one of the most emblematic wines of Stags Leap and a treasured Napa Cabernet collectible. The “Shafer Hillside Experience” includes a sparkling welcome with small bites, followed by a Polaris Ranger tour of the iconic Shafer Hillside property, including panoramic Landers Point. Taste the latest Hillside Select vintage, then return for a sampling of library vintages—some available for purchase.

3: Into The Hills While exploring the valley floor,
it’s easy to overlook the many wineries perched in the hills
above Napa Valley. Though reaching these mountain wineries means extra drive time,
they offer a peaceful retreat from the busy Highway 29 and Silverado Trail. Yountville
serves as a convenient gateway to both the eastern and western hills.
Begin on the east side by heading south on Silverado Trail, then left onto Soda Canyon
Road for a 15-minute drive into Atlas Peak AVA, to Antinori Napa Valley. Yes, that An
tinori. Owned by Italy’s renowned Antinori family since 1985, fulfilling Marchese Piero Antinori’s long-held dream of producing
Antinori wine in California, the 1,200-acre estate is nestled in a natural amphitheater within the Vaca Mountains at 1,600 feet. Across 550 acres of vines on volcanic soil, abundant sun and cool elevation yield fresh yet ripe and structured wines. Visits feature a pri
vate winery and cave tour, a detailed overview of the family’s 600 years of winemaking history and a seated tasting of four estate wines with light bites. The peaceful setting and sweeping views are reminiscent of a Tuscan villa—just what drew Antinori to this site: a reminder of his home in Chianti.
Because of the extra time devoted to driving, it’s best to break for lunch in be
tween. Linger over a light, quintessentially French lunch of mussels, pomme frites and
salade Lyonnaise at Thomas Keller’s Bouchon Bistro.
Afterward, it’s a 30-minute, winding drive up Mount Veeder to Mayacamas. Here on
the west side, soils are composed primarily of marine layers, as opposed to the volcanic
soils of the east (though there is also some volcanic soil at Veeder’s highest elevations—
a distinctive quirk of the AVA). Set at about
1,800 feet on a 475-acre estate, Mayacamas boasts dramatic views (the highest point is
2,400 feet) and a storied past. Its stone cel lar, dating to the late 1800s, is still used alongside the modern hospitality center de
signed by Backen & Gillam, which opened in 2021. It’s also one of the six Napa winer
ies that participated in the Judgment of Paris tasting, if you’re filling out your bingo
card. The private, guided tour includes an all-terrain vehicle journey through the
property, breathing in bay laurel and taking in the rugged, forested Veeder landscape
and mountaintop views, plus samplings of current vintage wines. As the second-cool
est AVA in Napa (behind Carneros), Mount Veeder’s long growing season tends to yield
powerful and tannic wines that shine with cellaring. For a taste, splurge on the reserve
tasting to sample library vintages, a must Mayacamas try from this historic estate.`,
    },
    soilNote:
      'Cool-climate benchland soils with good drainage and moderate fertility. The southern valley position and Pacific influence produce wines of elegance and finesse.',
    bestFor: ['Fine dining', 'Thomas Keller', 'Walkable village', 'Elegant Cabernet'],
    winerySlugs: ['stewart-cellars', 'clos-du-val', 'lewis-cellars'],
    restaurantSlugs: ['the-french-laundry', 'bouchon-bistro', 'ad-hoc', 'clementine'],
    hotelSlugs: ['bardessono', 'sttupa-estate'],
    articleSlug: 'napa-yountville',
    mapCenter: [-122.3621, 38.4045],
    mapZoom: 14,
    neighborRegions: ['oakville', 'downtown-napa', 'st-helena'],
  },
  {
    slug: 'st-helena',
    name: 'St. Helena',
    tagline: 'Historic and Bustling',
    author: 'James Molesworth',
    issue: 'June 15 & 30, 2026',
    heroImage: TEST_IMAGES[3],
    accentColor: '#1A2E10',
    pullQuote: `St. Helena has become the valley's beating heart, with many prominent winemakers and vintners calling it home. Get up early enough and you may bump into some of them at the local coffee shops.`,
    intro: `St. Helena is the second to last town as you head north along the Highway 29 corridor, with the highway itself doubling as the town's main street. That can mean a bit of traffic, especially during afternoon school dismissal. It's a small price to pay, though, for what can be an ideal base camp for your Napa Valley excursion.`,
    body: `St. Helena is the second to last town as you head north
along the Highway 29 corridor, with the highway it self doubling as the town’s main street. That can mean a bit of traffic, especially during afternoon school dis
missal. It’s a small price to pay, though, for what can be an ideal base camp for your Napa Valley excursion.
The area has a long history, dating to the indigenous Wappo people (Robert Mondavi named his house and estate Wappo Hill). The current town is the resulting evolution of the settlement started in the 1840s by Dr. Edward Bale, who received a Mexican land grant. Henry Still founded the town in 1854, with Dr. George Belden Crane, an early, influential vintner arriving in 1855 (remnants of his vine
yard and estate are now home to Salvestrin Winery).
Through the 19th century, the town’s White Sulphur Springs drew
San Franciscans, while the Gold Rush and the railroad spurred economic
development. Following winemaker Charles Krug’s first commercial bot
tling in 1858, the wine industry grew, and many if its historical landmarks,
including the Beringer, Forni (now Freemark Abbey) and William Cole
(now Ballantine) wineries still stand.
Prohibition resulted in difficult times and the area pivoted from
grapes to prunes, (the most important crop in the 1930s) alongside apples,
cherries, pears, walnuts, plums and hops. Mature fruit trees and nut trees
are still spread through verdant resi dential areas, contributing to St. Hel
ena’s reputation as the prettiest town in the valley.
Following the rebirth of the wine industry after Prohibition, St. Helena
has become the valley’s beating heart, with many prominent winemakers
and vintners calling it home. Get up early enough and you may bump into
some of them at the local coffee shops, fueling up for their day.
TIP S🠟
There’s plenty to do in the town itself entirely within walk
ing distance. But if you want to strike out to other areas, head
ing south in the morning goes against the valley’s typical traf
fic commute. Clif Family

Where to Taste

The St. Helena AVA covers just over 9,000 acres around
the town, with Ehlers Estate marking the valley’s nar rowest point between the western Mayacamas and east ern Vaca range. The most densely planted sub-AVA in Napa Val
Ad Vivum 1400 Oak Ave. | advivumcellars.com
Winemaker Chris Phelps has a pretty good résumé, having spent time at Pétrus in Bordeaux, as well as Dominus and Inglenook in Napa Valley. The St. Helena native now manages his own project, Ad Vivum, a single Cabernet bottling sourced from the Sleeping Lady Vineyard in Yountville. Phelps is hands-on, so expect a wide-ranging conversation as he’s one of the valley’s more erudite winemakers. Phelps’ son Josh may swing through as well; his value-priced Grounded Wine Co. is one of the valley’s burgeoning projects.
Clif Family 709 Main St. | clifffamily.com
The is a popular spot, thanks in large part to the food truck parked behind it that offers delicious bruschetta along with salads, polenta tots and organic whole roasted chickens. The main tasting room offers the full range of the win ery’s broad portfolio, while the next door Enoteca provides private (by ap
ley, with 6,800 acres of vines, the area takes in nearly 100 wineries. Included here are suggested tasting rooms on Spring Mountain as well, which rises above the town’s western side.
AXR 3199 St. Helena Highway N.
axrnapavalley.com Ballantine
2820 St. Helena Highway N.
ballentinevineyards.
com Beringer
Vineyards 2000 Main St.
Beringer.com Corison
Winery pointment) wine and food pairing experiences. Ehlers Estate
Clif Family 987 St. Helena Highway S.
corison.com Davies
Vineyards 1210 Grayson Ave.
daviesvineyards.com The Debate 1244 Spring St.
thedebatewine.com El Molino
Winery 3315 St. Helena Highway N.
elmolinowinery.com Forman
Vineyard 1501 Big Rock Road formanvineyard.com
Freemark Abbey
3022 St. Helena Highway N.
freemarkabbey.com Hall Wines
401 St. Helena Highway S.
hallwines.com Ehlers Estate 3222 Ehlers Lane | www.ehlersestate.com
The tasting room here, housed in the property’s original 1886 stone winery, is decidedly low-key. The tasting room staff includes hosts with 20-plus years of experience, and winemaker Adam Casto is
likely to stop by during your tasting. Ehlers also partners with next-door Alila on a pairing menu.

Heitz Cellar 436 St. Helena Highway
S.
heitzcellar.com Ink Grade /
The Pavillion 699 St. Helena Highway
S.
inkgrade.com Charles Krug
2800 Main St.
charleskrug.com Lang & Reed
1244 Spring St.
langandreed.com Lokoya
3787 Spring Mountain Road lokoya.com Louis M.
Martini Winery
254 St. Helena Highway S.
louismartini.com Mending Wall 3730 Silverado Trail N. mendingwall.com
Merryvale Vineyards 1000 Main St.
merryvale.com Orin Swift
1321 Main St.
orinswift.com Faust Haus
Faust Haus 2867 St. Helena Hwy North | faustwines.com
This 1878-dated structure (formerly home to St. Clement winery and part of Spring Mountain Vineyard before that) was purchased by the Huneeus family in 2016 and renovated in 2020. Offering a broader approach to wine tasting, you can find both local and international artisanal wares—jewelry, sculpture, leather goods, clothing and more—rotating on display throughout the year. There’s a speakeasy in the basement where vinyl records can be played during tastings of library vintages. There’s always an eclectic mix of small bites served. And while the 2,500-square-foot space has several swanky rooms inside, the haus sits perched atop a sprawling terrace of vines that looks east over the valley.
Joseph Phelps
200 Taplin Road josephphelps.com
The Prisoner 1178 Galleron Road theprisonerwinecom pany.com
Raymond 849 Zinfandel Lane raymondvineyards.com
Revana 2930 St. Helena Highway N.
revanawine.com Lewelling Vineyards, Haley Wight
Lewelling Vineyards
1282 Vidovich Ave.
www.lewellingvineyards.com Wines from the Lewelling clan, one of St. Helena’s longtime families, are now made by sixth generation Haley Wight. The tasting room pours the family’s small-production Cabernet Sauvignons, along with Wight’s own Hayfork brand, which features more offbeat bottlings of Marsanne and Charbono. In a simply adorned room with a single table in the middle and a wooden plank over a couple of barrels forming a counter, you’ll be hosted by either Wight or her brother, NAME?.
Snowden 1432 Main Street snowdenvineyards.com Winemaker Diana Snowden lives in Burgundy, where along with her husband, Jeremy Seysses, she makes the wines for Domaine Dujac. She comes back to her native St. Helena a few times a year to oversee her family’s vineyards and winemak ing, so you might catch her in the tasting room. If not, someone else from the Snowden clan will be on hand. Visits are intimate in scale, as the family hosts only a single small group at time in their bare bones tasting room. You’ll get to talk farming, winemaking and more with the folks who do the work themselves. themselves.

Spottswoode Estate Vineyard & Winery 1902 Madrona Ave. | spottswoode.com This family-owned property has been run by the Novak family since 1972, though its history dates to 1882. The quintessen tial St. Helena estate, Spottswoode sits in the heart of the town’s lush and verdant west side. There are different experiences offered, including a vineyard walk or a tasting of library vintages. Visits are by appointment only, with preference given to existing mailing list customers, so re serve well in advance. Note: No children or pets permitted.
Spottswoode 3522 Silverado Trail N.
rombauer.coma The Royal We
929 Main St.
royalwewines.com Salvestrin
Winery 397 Main St.
salvestrinwinery.com Seavey
Vineyard 1310 Conn Valley Road seaveyvineyard.com Studio 1299A
1299 Main St. | allaccessnapavalley.com Previously the owner of 750 Wines, a retail operation in St. Helena, Monica Stevens has been around the Napa wine scene for nearly two decades. Her latest venture is this collective tasting room. Stevens pours wines from five-dozen boutique size labels (Arrow & Branch, Hobel, Hourglass, Zeitgeist and more) for whom running their own tasting room would be ei ther too time-consuming, too expensive, or both. Clients fill out a questionnaire first, after which Stevens will curate a selection of wines to taste. The space is utilitarian, but welcom ing, with a long single table in the middle of a room decorated with artwork by local artist Layla Fanucci.
Whitehall Lane Winery 1563 St. Helena Highway S. | whitehalllane.com
Family-owned and operated by the Leonardini family since 1993, this winery gives you the classic Napa Valley style tasting experience, from the walk up bar positioned as you first
enter to the tour of the winery and grounds provided with ev ery tasting. You can go big and taste their portfolio-headlining Cabernets in a modern setting that overlooks the vineyard in back of the winery, or you can settle in and sip some Sauvignon Blancal fresco in the recently added garden pavilion surrounded by vines.
Studio 1299A Spring
Mountain Vineyard
2805 Spring Mountain Road springmountainvineyard.com
St. Helena Winery 100 Pratt Ave.
sthelenawinery.com Stony Hill
3331 St. Helena Highway N.
stonyhillvineyard.com Titus
Vineyards 2971 Silverado Trail N. titusvineyards.com
Trinchero 3070 St. Helena Highway N.
trincheronapavalley. com Vineyard 7 & 8
4028 Spring Mountain Road vineyard7and8.com
Wheeler Farms
588 Zinfandel Lane wheelerfarmswine.com

Where to Eat

While Yountville, thanks primarily to chef Thomas
Keller, remains the culinary center of the valley, St. Helena is no slouch. The town’s best spots have a decidedly local-driven vibe, especially for happy hour and din ner, when many tourists head back down valley. There’s a con sistent theme of Cal-Italian cuisine, not surprising considering both the Italian heritage of agricultural families in the area and the fact that it’s darn delicious with wine. Chef Mark Shoemaker
features said theme with his tasting menu at Alila’s Violetto, while veteran Santa Monica restauranteur Bruce Marder’s C29 goes upscale Italian. There’s classic wine country cuisine as well at Farmstead and the Charter Oak (the smash burger is a valley fave). Press delivers a Michelin-starred experience under the hand of chef Philip Tessier, while Gott’s owns the down-scale scene with its ahi burger, fries and milkshakes at its famous road side stop.
Charlie’s Charlie’s
Napa Valley 1327 Railroad Ave | www.charliesnv.com

Restaurants

Chef/owner Elliott Bell comes from the French Laundry family tree, where he spent a decade as executive sous chef. Bell ren ovated the former Cindy’s Backstreet Kitchen space for Char lie’s (named after his son). Its airy, whitewashed setting is both
potato chips and the double-fried chicken stay in place. The wine list features a hefty dose of California, but a European presence too, including an ample Champagne section. Bell’s is one of the few places in the valley that stays open with
loved by locals and sought out by destination diners. Food
here is American brasserie in feel, elevated by high quality
farm-to-table ingredients, some of which are grown just up
the road at Spring Mountain Vineyard. While the menu
changes seasonally, staples such as the Little Gems salad with
sour cream and onion dressing tossed with salt and vinegar

a late-night menu (9 p.m. to 11 p.m.). Expect to see other hospi tality folks filing in for a caviar bump or dirty steak after their shifts end. If Bell isn’t in the kitchen himself (he almost always is), he’s volunteering his time as a member of the St. Helena fire department or toting his children around town with his wife, Katy.

Cook 1310 Main Street | cooksthelena.com Chef/owner Jude Wilmoth arguably created the model that Charlie’s Elliott Bell has employed around the corner: ele vated comfort food and hearty portions combined with a vibe of convivial famil iarity. Opened in 2004, Cook is always filled with locals, though the staff will likely remember you on your second visit too. Cuisine here is frankly Italian centric, with the eggplant parmesan with béchamel or cavatelli all’arrabbiata with house made spicy sausage vying for signature dish honors. Don’t overlook the daily risotto, pasta and soup spe cials. The bar gets busy starting right at 5 pm. The small dining room and close quarter seating in the back hums with a din during peak dinner service, throughout which you’ll see people getting up to go talk to friends or colleagues at other tables. Come hungry, start with the house barrel-aged negroni and enjoy a St. Helena Cabernet as you take in the scene. Only open Monday through Friday (lunch and dinner), and you will need a reservation.
Cook Oak
831 Charter Oak Ave.
thecharteroak.com C29
1320 Main St.
capo29restaurant.com The
Farmstead 738 Main St.
longmeadowranch.com Gott’s
933 Main St.
gotts.com Harvest Table
1 Main St.
harvesttablenapa.com PRESS
587 St. Helena Highway S.
pressnapavalley.com Violetto (Alila
Napa Valley)
1915 Main St.
violettonapavalley.com The Charter Oak

Breakfast, Coffee & Snacks

Model Bakery

Also Recommended

Giugnis Deli 1227 Main St.
giugnis.com Sam’s General Store
1400 Oak Ave.
samsgeneralstore.com The Station 1153 Main St.
stationsh.com The Model Bakery
1357 Main St. | themodelbakery.com Originally named St. Helena Bakery before the name was changed to Model Bakery the 1930s, this is a St. Helena institution. Former caterer Karen Mitchell purchased the business in 1984 and was joined by her daughter Sarah in 2011. Along the way, they’ve expanding the business to other locations, including downtown Napa. Expect a line in the morning, but if you’re there early enough, you never know what winemaker might pass through on their way to work. There are few better places to carbo load and caffeine up for the day.
Roman Holiday Gelato Under-Study
587 St. Helena Highway S. | under-study. com Where Hermes meets Willy Wonka is how chef/co-owner Philip Tessier de scribes his culinary playground. While his Press, next door, provides the Mi chelin-experience, this place evokes he donism and whimsy, from the baked goods on display right as you walk in to the lobster omelette offered on week ends. You can also put together an ele vated grab-and-go picnic, with the likes of jarred duck rillettes or charcoal roasted beets. There’s a butcher counter in the back and a demonstration kitchen. You can grab a bottle of wine here, too.
Erosion Creamery & Café 1234 Main St. | erosion.buzz
A tap house/coffee/snack and ice cream stop all in one. The campfire-flavor ice cream is a big draw.
Roman Holiday Gelato 1336 Oak Ave. | romanholidaygelato.com Just off Main Street, this gelato/coffee house will cure any sweet tooth. Try the salted speculoos crunch.

Where to Stay

While downtown Napa continues to grow, St. Helena retains a bucolic charm. Its underlying resistance to going full tourism means its hotels are generally on the smaller side. That does put pressure on vacancies and, in turn, price. Book your stay well-ahead and think about visiting during off-peak times of year (March and November can be lovely
Alila for example).
For those looking for the resort experience, with in-house spa, pool and dining, Alila and Meadowood lead the way. For those who want to put more of their resources to tasting and eating out, there are budget options that offer great location but fewer ame
nities, such El Bonita, Inn St. Helena and Vineyard Country Inn.
Alila Napa Valley 1915 Main St. | URL TK
A historic setting, Alila’s main lobby is located in the property’s origi nal, 1907 Georgian Revival residence. By 1911, the site was home to St. Helena’s first tourist resort and after more than a few iterations along the way, it’s now Hyatt’s Alila, a 69-rooms and– suites, adult-focused
property (under 18 must be accompanied by a parent at all times). The modern architecture that was added adheres to the symmetry of the original Acacia House. The main restaurant, Violetto, features four and eight-course tasting menus for dinner, while the Salvia Terrace of fers à la carte options and an elegant setting for golden hour. A full spa and swimming pool fill out the grounds. The spacious, Vineyard View rooms have a terrace for sunset-viewing, and there’s even direct access to Beringer Vineyards right next door.
The Inn at Salvestrin 397 Main St. | (707) 963-5101 [NO WEBSITE?]
Originally a New Yorker, Dr. George Belden Crane wound up purchasing more than 300 acres of land in St. Helena on which he built his home and planted European grape varieties in the 1860s. His 1879 Victorian house is now part of the Salvestrin family’s estate, op erating as a three-bedroom B&B amid their holdings in the Dr. Crane Vineyard.
Wydown Hotel 1424 Main St. | wydownhotel.com This is among the smallest hotels in town, occupying the historic Kibbler building (built in 1886), a former drug store that now houses a 12-room bou tique hotel. The location is perfect— catty corner from Model Bakery and steps from the main shopping and restaurant section of town. The comfy, well appointed rooms are spacious, featuring high ceilings, unique furniture items and curated decor. The place feels both cozy and tony; owner Mark Hoffmeister de scribes it as feeling like you’re in cool apartment. Named after Wydown Boulevard in Hoffmeister’s native St. Louis, the hotel provides breakfast and after noon tea. Guests also have complimen tary access to Health Spa Napa Valley. Carol, the head concierge, knows the lay of land and will help set you up with
Harvest Inn 1 Main St. | harvestinn.com
Owner Rick Kaufman purchased Harvest Inn in 2013 and he’s been tweaking and im proving it ever since, including adding rooms and new dining facilities. Harvest Inn has a bit of a throwback feel, as its Tudor-style buildings that house the guest rooms feature brick work and leaded-glass windows. The 8-acre property meanders through towering redwoods that provide cool shade and a respite from the bustle of the highway. It also borders the Leonardini Vineyard of Whitehall Lane, affording some rooms picturesque views (and most rooms have a fireplace). There are family and adult-only pools on site. While Kaufman is a wine and cigar lover, he embraces the idea that the valley should provide a complete vacation experience; to wit, his concierge can arrange for pheasant hunting, clay shooting, horseback riding, hot-air ballon rides and more.
Harvest Inn El Bonita
Motel 195 Main St.
elbonita.com Inn St. Helena 1515 Main St.
innsthelena.com Meadowood 900 Meadowood Lane meadowood.com
Le Petit Pali 1152 Lodi Lane lepetitpali.com
Southbridge 1020 Main St.
southbridgenapavalley. com Vineyard
Country Inn 201 Main St.
vineyardcountryinn. com

tasting appointments and restau rant reservations.
ST. HELENA Shopping & Strolling The town’s main drag provides one
of the valley’s best shopping/ strolling opportunities. Clothing, housewares, art, hair and nail salons and more cater to locals and tourists alike. Here are a few of my[??] favorites.
Health Spa Napa Valley 1030 Main St. | healthspanapavalley.com
This full-service health spa is connected to South bridge Napa Valley hotel. It offers a range of spa treatments, pool and gym. Day passes are available, while some additional hotels, such as the Wydown, provide complimentary access for their guests.
Christopher Hill Gallery 1235 Main St. | chgallery.com
Hill’s namesake fine art gallery features contemporary art, primarily paintings, along with sculp ture and mixed media, from a rotating selection of several dozen artists that Hill displays exclusively in his space. He has managed his gallery in the same location for 20 years and is known for his low-key vibe.

Erin Martin Design 1350 Main St. | erinmartin.com
Owner of this interior design studio and show room, Erin Martin started by painting murals for local businesses and private clients. Over time, she moved into interior design and worked on projects for the likes of Clos du Val, Chappellet, Shafer and more, even partnering with Howard Backen along the way. Now, 30 years on, Martin’s design studio partners with local artists to stock a showroom of pieces that show off her overall aesthetic approach, while her team lends their talents to cus tomers looking to design their homes.
Mad Fritz Brewery and Malthouse 393 Lafata St. | purchasemadfritz.com
Owner Nile Zacherlie’s day job is winemaker for David Arthur Vineyards. Since 2014, though, he’s put his fermentation sciences degree to good use via Mad Fritz, his side-hustle brewery-coffee roaster. Mad Fritz offers a lineup of single-origin beers that you can taste through in a small, shabby-chic industrial space located in the ware house section on the southeast side of town. The tasting ends with an espresso shot of one of his single-origin coffees. (Mad Fritz has an additional taproom in Yountville.)
New West Knifeworks 1380 Main St. | newwestknifeworks.com Founded by former chef Corey Milligan, this spe
cialty knife purveyor produces their wares in Idaho. The portfolio of chef, steak and hunting knives, plus artisanal knife racks and blocks are not only high quality, but also brightly colored works of art that will some bling to your kitchen. Laser engraving is available too, making for a thoughtful gift option.
St. Helena Public Library 1492 Library Lane | napawinelibrary.com The Napa Valley Wine Library Association maintains a 100,000-plus collection of wine labels, along with books, periodicals and digitized oral histories cover ing viticulture and winemaking. Two small vineyards on site, one with vines planted back in the 19th cen tury, are publicly available for a stroll.
New West Knifeworks`,
    adventure: {
      title: 'Four St. Helena Excursions',
      intro: `St. Helena and Spring Mountain are inextricably linked historically and geographically. Four half-day routes provide for both a similar undercurrent of back story and the ability to compare and contrast fine details.`,
      body: `St. Helena and Spring Mountain, which rises up behind the
town’s western edge, are inextricably linked historically and geographically. Combined, they offer a wide range of tasting experiences that easily fill a weekend itinerary. To maxi
mize enjoyment and education, I’ve curated four half-day routes that provide for both a similar undercurrent of back story and the ability to compare and contrast fine details between differ ent estates.
1: OFF-THE-GRID CABERNETS Tip: Don’t overbook your day—when it comes to wine
tasting, less is more. Two win eries per day, especially for
beginners, is plenty. Expect most tastings to last 90 min
utes; more complex experi ences can last longer. Give
yourself wiggle room between appointments so you’re not
rushed. Corey Milligan While some tasting rooms are staffed by professional hosts, many family-owned
wineries host their tastings personally, taking time out of
their day to meet their cus tomers face to face. This is
part of what makes Napa Valley so special. Please keep in
mind, though, that running a winery is a full-time agricul
tural job. Tardiness or no shows hurt the bottom line, so
always be punctual. Most tasting room dress codes are up
scale casual, at most (bling Head east out of town, crossing both
the Pope Street bridge and Silverado Trail to head up the winding, rug ged Conn Valley Road. The drive time to Seavey Vineyard is just 15 minutes, but as you pass through the gate onto the property, you’ll feel a world away. The Seavey family purchased the property in 1979 and began planting vines. The winery (and your tasting) is housed in a restored 1880s stone dairy barn. Under the hand of winemaker Jim Duane, the Cabernet here is deep, dark and vivid, with a decidedly cool cast iron note. Merlot and Chardonnay are also produced. There’s also library inventory here, so you can purchase an older vintage to take for your BYOB later in the day.
Ric Forman Drive back the way you came and make the righthand turn up Big Rock Road. Take that winding and narrow drive to Ric Forman Vineyard. Tastings are held in a stone-walled tasting room that sits several stories below the winery, thanks to a dramatic into-the-hillside construction. Forman, a legend in the valley, runs the property he founded in 1978 along with his son Tobias. The Cabernet here is Bordeaux-reminiscent, with gravelly grip and a tight band of cassis fruit; with cellar time they really show their stuff. There’s a Chardonnay as well.
From there you’re barely 10 minutes back to town. After all that tannin and Cab, I’d need the smash burger at the Charter Oak as part of a lazy lunch. Grab some outdoor seating if it’s not too hot, as the patio is well-shaded.
not required). And do not wear perfume, cologne or other body fragrances—they interfere with tasting.
Lastly, consider your pre ferred tasting time of day. Some folks are morning tast ers, others need to wait until the afternoon. Either way, I al ways suggest to leave space for a light jog, hike, disco nap or some other non-wine activity. Wine and wellness go hand in hand and the valley is full of things to do.

2: WEST SIDE FAMILY WINERIES eration on the property, along with his wife and
daughters. The property has the distinction of be ing home to the largest part of the historic Dr.
Crane Vineyard. The 1800s Victorian house located here is Dr. Crane’s historic home. There’s a mix of
wines on offer, including Sangiovese and Sauvignon Blanc, along with sleek, restrained and min
erally Cabernets from the estate vineyard. You can
taste in the tasting room that sits above the winery,
or upgrade for a tasting inside the historic home.
From there, it’s not even three minutes to Corison Winery, marked by a pair of tall palm trees at
the driveway entrance. Here you’ll find Cathy Corison and her nearly 50 vintages of winemaking
experience. Her husband, William, designed the simple, high-ceilinged Victorian-style barn/winery;
Corison The west side is the best side, at least that’s what the deni zens of St. Helena’s tony residential area say. You can
decide for yourself, as this jaunt stays on the western side of Highway 29 while introducing you multi-generational family-owned wineries.
Head south and you’ll be barely out of town when you’ll see a vineyard on your right with a small shingle sign that says Salvestrin Winery, est. 1932. Rich Salvestrin represents the third gen
their two daughters are also increasingly involved in the day to day. Corison has a strong following for her Cabernet bottlings, which typically check in under 14% alcohol, low compared to most Napa Cabernets. The wine style is bright, high-toned and fresh, with a crunchier feel rather than plush or dense. They also age remarkably well. Among her fruit sources is the nearby Sunbasket Vineyard, planted by the legendary André Tchelistcheff in the 1950s.
For lunch, keep it on the west side and try Under-Study, the brainchild of Press chef Philip Tessier. A bakery/patisserie and
3: A ST. HELENA HISTORY LESSON With this year marking the
big 5-0 for the Judgement of Paris tasting (see page
TK), what better time to stop in and check on how a few of the wineries that were involved are doing today?
Freemark Abbey’s history goes way back before the 1976 event, starting in 1881 with Josephine Tychon. Eventually, in 1939, it becomes Freemark Abbey. In the 1940s and 1950s, the winery opened a “sampling room”—basically the region’s first tasting room. Two of Freemark’s wines were included in the Paris tasting, making it the only [CAL IFORNIA?] winery to have both a red and white wine in the event. Those wines aren’t available any more, but don’t despair. Winemaker Kristy Melton joined in 2019 and she’s helped up the game here. Both the Bosché and
Freemark Abbey Spring Mountain Vineyard, which had its 1973 Chardonnay in the Paris tasting, is going through yet another awakening. The estate’s lengthy his
tory includes a cobbling together of various properties on the steep and rugged slopes of Spring Mountain. The wildfires of 2020 nearly dealt it a fatal blow, but luckily an investment group swooped in and is in the process of replanting the 200-plus-acre vineyard. Part of an experience here can include a tour of the property, well worth it. The estate also had ample stocks of older vintages that survived the blaze and some of those are on of
fer, including a flight that includes the ’79 and ’88 Cabernets. Small bites are available too. Tastings are held in the historic manor house that was the set
ting for the bawdy Falcon Crest TV se Sycamore vineyard-designate Cabernets, plus a new bottling called La Colline, are stars of a large portfolio that includes other Cabernets, Merlot and whites. Library vintages are available too. Staff here is very friendly and the renovated stone-walled win
ery provides a great setting.

ries that ran for more than 200 episodes in the 1980s. After the tasting, you can buy a bottle from the extensive library inventory. My advice is to then take it to Charlie’s to have alongside lunch. After all, chef Elliott Bell manages a culinary garden on the SMV property for his St. Helena restaurant.

coffee stop, it turns into a café with small plates for lunch.
The Royal We 4: MODERN TASTING SALONS These two stops will give you educational perspective on
the modern-day approach, defined by hosts with som melier-level wine knowledge in a refined setting. Start your morning at Royal We Wines, a tasting salon from winemaker Thomas Rivers Brown and partner Matt Hardin. The space is comfy/swanky with a bar counter and side rooms that offer varying seating configurations. It feels fancy, but the vibe is casual. On hand are several Rivers Brown projects, including his extreme coastal Pinot Noir label Aston. There’s also Caterwaul, a burgeoning value-priced Cabernet label, along with bottlings from Matthew Wallace, RIV, Switchback Ridge and Shibumi Knoll Vineyards. Tastings can be either single-brand or a mixed portfolio, and while reservations are always recommended, the salon does take walk-ins, space permitting.
From there, just drive a few minutes farther south and turn left down Zinfandel Lane. Wheeler Farms was developed by the Araujo family after they sold the Eisele Vineyard in Calistoga and created their Accendo brand (now owned by the Bettinelli fam ily and Jack Bittner). Started as a high-end custom crush facility, the large, dark brown barn structure, designed by Taylor Lombardo, is now owned by Suzanne Deal Booth, owner of Bella Oaks Vineyard in nearby Rutherford. Winemaker Nigel Kinsman still makes Accendo here, along with his own Kinsman Eades project, Bella Oaks, Annulus and a few other
manages everything else, including the high-end hospitality that features in-house chef Bruce Marder (formerly at Mustard’s). Marder draws on the working farm that continues the property’s agricultural history—a culinary garden, fruit orchard and heri
tage chickens are all on site. While tasting wines, you can dine family-style in the outdoor olive grove or inside at the chef’s ta ble. Depending on which experience you choose, you might need to clear three hours on your schedule. Visits here are best with a small group (four to six people).
labels. While he handles production, his wife, Shae,`,
    },
    soilNote: 'Benchland and hillside soils at the valley’s upper reach; diverse exposures from Spring Mountain to the valley floor.',
    bestFor: ['Cabernet', 'Historic Main Street', 'Collectors', 'Coffee culture'],
    winerySlugs: ['spottswoode', 'corison-winery', 'faust-haus'],
    restaurantSlugs: ['charlies-napa-valley', 'cook-st-helena', 'model-bakery'],
    hotelSlugs: ['alila-napa-valley', 'harvest-inn', 'wydown-hotel'],
    articleSlug: 'napa-st-helena',
    mapCenter: [-122.4699, 38.5026],
    mapZoom: 13,
    neighborRegions: ['calistoga', 'rutherford', 'yountville', 'oakville'],
  },
  {
    slug: 'calistoga',
    name: 'Calistoga',
    tagline: 'A Wine Country Retreat',
    author: 'Mitch Frank',
    issue: 'June 15 & 30, 2026',
    heroImage: TEST_IMAGES[4],
    accentColor: '#0A1E2E',
    pullQuote: `Calistoga today still offers that rustic, relaxed feel paired with sophisticated escape. You can stroll the old downtown stretch of Lincoln Road, which feels like an 1800s California town, despite the coffee shops and art galleries.`,
    intro: `Tucked away at the northern end of Napa Valley, the town of Calistoga has long held its own, unique vibe. For those looking for a more relaxed version of wine country, Calistoga is a haven. One reason for that vibe is location: 30 miles north of downtown Napa, where the valley narrows and turns west.`,
    body: `Tucked away at the northern end of Napa Valley, the town
of Calistoga has long held its own, unique vibe. For those looking for a more relaxed version of wine country, Calistoga is a haven.
One reason for that vibe is location: 30 miles north of downtown Napa, where the valley narrows and turns west. The tall evergreen woods of Robert Louis Stevenson State Park and the looming Mount St. Helena make it feel more like a wooded re treat than wide open farming country.
That retreat aspect is the second distinction—wellness tourism predates wine tourism in Calistoga. The Wappo natives valued the geothermal springs and mud baths here and built sweat lodges atop them. Sam Brannan, who made his fortune selling equipment to miners during the height of the California Gold Rush, visited the hot springs in 1859 and bought up the northern portion of Rancho Carne Humana, establishing the town and building a resort that still stands today (albeit mod
ernized), Indian Springs. He named his town by combining
California with Saratoga Springs, a popular resort in New York state.
To help his tourism destination grow, Brannan founded the Napa Valley Railroad, connecting Calistoga to ferry terminals in Vallejo on the bay, making it easy for San Francisco residents to travel upvalley for vacation. The Napa Valley Wine Train travels over portions of the track today. Not all the locals ap
preciated Brannan’s changes to their sleepy area—he was shot by residents, though he recovered, proving that wariness of overdevelopment is not a new Napa phenomenon.
Calistoga today still offers that rustic, relaxed feel paired with sophisticated escape. You can stroll the old downtown stretch of Lincoln Road, which feels like an 1800s California town, despite the coffee shops and art galleries. You can head out to the wineries, which feel a littleless formal than those farther down the valley. And you can visit the spas or hiking trails to unwind from a long day of tasting.

Where to Taste

Calistoga’s location brings with it several differ ences from the conditions in the heart of Napa
333 Silverado Trail Valley. Because its farther from the bay, tem peratures can get pretty high on summer days. But evening winds drawn in from the Pacific through the
Hourglass 4208 Silverado Trail | hourglasswines.com
Chalk Hill Gap cool the vines dramatically in the eve ning. There’s also a higher percentage of volcanic soil here. The wineries vary too, from secluded spots to the perched, modernist lookout of Sterling Vineyards to the faux Tuscan castle of Castello di Amorosa.
aubertwines.com Note: Currently tastings are limited as they reno vate the hospitality space, but soon they will have expanded capacity.
Bennett Lane 3340 CA-128 bennettlane.com
CADE Estate More than five years after the Glass Fire tore through, destroying several buildings, Hourglass forges on, with consulting winemaker Tony Biagi producing outstanding Bordeaux-style blends from two estate vineyards. Founded by couple Jeff Smith and Carolyn Duryea, the winery at their Blueline estate blends into the eastern hills of the Valley, with a round, Hobbiton-style door opening into the hillside and into the winery. Guests can pass through the winery and down into the aging tunnels deep under ground to find a peaceful tasting room and a flight of multiple wines.
Larkmead Vineyards 1100 Larkmead Lane | larkmead.com
Larkmead’s Howard Backen-designed tasting salon looks fairly new, but there
are plenty of hints that this is a winery with real history. The property was
founded in 1895 by Lillie Colt, a San Francisco woman whose wealthy par
ents gave her a Napa farm to get her out of the corrupting city. She responded by
converting the land into a winery, which survived through Prohibition by produc
ing sacramental wine and then was purchased by the Solari family in 1948. Lo
cated at one of the narrowest, hottest points of the valley, Larkmead is sur
rounded by its vineyards, primarily Cabernet with some Sauvignon Blanc and a
bit of Tocai Friulano. A visit includes a tour of the vineyards followed by a
seated tasting paired with cheese and charcuterie in the comfortable tasting
room, or the pergola when the weather is nice. And in this part of the valley, it
usually is.
Larkmead 260 Howell Mountain Road S.
cadewinery.com Castello di
Amorosa 4045 St. Helena Highway castellodiamorosa.com Frank Family 1091 Larkmead Lane frankfamilyvineyards. com
Girard 1077 Dunaweal Lane girardwinery.com
Lola Wines 916 Foothill Blvd.
lolawines.com Outpost Wines 2075 Summit Lake Drive
outpostwines.com Rivers-Marie 900 Foothill Blvd. riversmarie.com
Spire Collection 299 Bennett Lane spirecollection.com
Sterling Vineyards
1111 Dunaweal Lane sterlingvineyards.com Lola Wines
916 Foothill Blvd. | lolawines.com Driving into the heart of town, you might be forgiven for think ing the Lola House is a residence—it looks like a quaint brick bungalow. But inside is a welcoming tasting experience. Winemaker and owner Seth Cripe, who trained at Caymus and Belle Glos, makes Russian River Valley Pinot Noir plus a fascinating selection of wines from less-typical California grapes, including Vermentino, Charbono and Counoise. A tasting here is just $35 for five wines, and it can be paired with snacks, including bottarga. This is one of the better bargains in the valley. Sit down in one of several eclectic rooms or on the shaded patio space and enjoy a funkier side of Napa.
Schramsberg 1400 Schramsberg Road | schramsberg.com
Napa locals thought Jack and Jamie Davies were fools when they fled Los Angeles in 19764[UH??] and bought the old Schram place in the foothills of Spring Mountain, with its crum bling buildings and abandoned tunnels. Instead, the Davieses helped kickstart Napa Valley’s modern era, part of a migration of young, enthusiastic winemakers into the region. The couple cleared out the tunnels to age their sparkling wine in and be gan producing bubbly that rivals Champagne. Schramsberg is still owned by the family today. Guests can enjoy a tour of the tunnels and learn more about sparkling winemaking, then taste six wines from both Schramsberg and Davies Vineyard, their nearby still-wine project.
Tamber Bey 1251 Tubbs Lane tamberbey.com
Tank Garage 1020 Foothill Blvd. tankgaragewinery.com
Trois Noix 865 Silverado Trail N. troisnoixwine.com
Vine Cliff 7400 Silverado Trail vinecliff1871.com

TO EAT Calistoga’s restaurant scene reflects the town’s mix of refined
and comfortable. You can opt for fine dining options at the resorts in town, including a two-star Michelin experience at Auro at the Four Seasons. But there are also comfy local dining rooms that will feed you well and help you relax after a day of winery visits or hiking the trails of the nearby state park. And nearly every place in town has a good wine program.
Calistoga Inn & Brewery 1250 Lincoln Ave. | calistogainn.com
Located where Lincoln Road crosses the Napa River, the Calistoga Inn’s restaurant epitomizes the upscale California comfort the town is characterized by. Choose between a cozy dining room or, when the weather is nice (which, c’mon, it’s Napa Valley) sit on the spacious patio alongside the river. For a break from wine, try one of the excellent beers from the inn’s micro-brewery, Napa Valley Brewing Company. Of course, the wine selection (and cocktail choices) are good too. The menu takes in Napa versions of comfort food—skirt steak, Sonoma duck leg confit with seasonal mushrooms, a wood-fire grilled pork chop garnished with pomegranate and ginger Cabernet sauce.
Auro 400 Silverado Trail N.
auronapavalley.com Bricco Osteria
1350 Lincoln Ave.
briccoosteria.com Buster’s
Original Southern BBQ
1207 Foothill Blvd.
busterssouthernbbq.
com Evangeline
1226 Washington St.
evangelinenapa.com Calistoga Inn & Brewery
Lovina Lovina
1107 Cedar St. | lovinacalistoga. com Lovina feels like it’s been around forever, in part due to the 120-year-old house it occupies but also the boisterous atmo sphere inside thanks to the crowd of locals who dine here. It’s also welcoming to all, with numerous vegan and gluten-free options on the Cal-Ital menu. Consider the “impossible sau sage” lasagna, or dive into the ri sotto with braised Wagyu boneless short rib. Plus, respect to a restaurant whose desserts include “Sundae Funday” and “A Hot Mess,” which is a hot brownie topped with house made marshmallow cream and pistachio gelato. The Napa- and Sonoma-focused wine list includes a selection of older wines, like Freemark Abbey Cabernet Sauvignon Rutherford Sycamore Vineyard 2009.
Fleetwood Calistoga Motor Lodge & Spa
1880 Lincoln Ave.
fleetwoodcalistoga.com House of Better Dr. Wilkinson’s Backyard Resort)
1507 Lincoln Ave.
drwilkinson.com/ house-of-better
Solbar Solage, Auberge Resorts Collection
755 Silverado Trail N. auberge.com/solage/ dine/solbar
The Living Room at TRUSS Four Seasons Resort Napa Valley
400 Silverado Trail N. trussrestaurantandbar. com; fourseasons.com/ napavalley

Resorts Collection)
755 Silverado Trail N. | auberge.com/solage/ dine
The Solage resort houses two restaurants, both helmed by executive chef Gustavo
Rios: the more formal Solbar and the casual Picobar. The former is great, but Picobar is
a unique experience for its poolside loca tion, focus on upscale Mexican cuisine and
impressive selection of agave spirits. The fresh tortilla chips and salsas alone are rea
son to visit and relax by the pool. The wine list is outstanding too, both by bottle and
glass. Diners can also book, in advance, an eight-course “Head Tilt Tasting,” as in, tilt
your head to bite that taco, diving into a delicious culinary exploration of Mexico.
Sam’s Social Club (at Indian Springs Resort)
1712 Lincoln Ave. | samssocialclub.com Tucked away on the side of Indian Springs
Resort, Sam’s Social Club is welcoming to resort guests and non-guests alike. The bar
area is a good spot for meeting up, with plenty of tables, an appealing cocktail
menu, and a wines by-the-glass list that takes in both California and international
wines. The menu is upscale America, with starters like smoked trout dip with house
made potato chips and a crostini covered in fresh ricotta and house-made pepper jelly.
For entrées, the bone-in pork schnitzel is large enough to play pickleball with, but it’s
better to eat, covered with Napa cabbage and fennel.
Picobar
Breakfast/Coffee/Sandwiches/Snacks Café Sarafornia
1413 Lincoln Ave. | cafesarafornia.com If you’re looking for a hearty breakfast
before you head out for wine tasting, Sarafornia is the place to start. Named
for a supposed slip of the tongue by town founder Sam Brannan (he meant to
say his town would be the Saratoga of California and instead said Calistoga of
Sarafornia), this diner has been open since 1976, serving breakfast and lunch.
The breakfast plates are big and comforting, with more than a dozen egg
dishes, including “The Best Huevos Rancheros in Napa Valley.”
Cafe Sarafornia Calistoga
Roastery 1426 Lincoln Ave. (707) 942-5757
Palisades Eatery
1414 Lincoln Ave. (707) 942-9300 Sam’s General Store
109 Wappo Ave.
(707) 942-4200

Where to Stay and Soak

Lodging in Calistoga offers a choice of small and luxurious
or big and luxurious, with intimate hotels like the Francis House Inn and Okaeri, both with fewer than 10 guest rooms, and large resorts like Solage and Indian Springs, each boasting Olympic sized-pools and dozens of rooms. One common
Francis House Inn thread at all of these homes-away-from-home is a focus on well ness, allowing you to recharge after a day of wine touring. There’s an incredible concentration of spas here; take full advantage while staying at one of the resorts or, if you’re staying at a smaller ho tel, buy a day pass and get away from it all for an afternoon.
The Francis House Inn 1403 Myrtle St. | thefrancishouse.com
Tucked away on a side street two blocks from Lincoln Road, this is an intimate luxury hotel, with
just eight rooms but plenty of deluxe amenities,
from a sauna and salt room to a heated pool and clay tennis court. It’s also on the National Register
of Historic Places. Built in 1886 as a family home
for prominent local merchant James H. Francis,
the old house with French Second Empire architecture was converted to the Calistoga Hospital in
1919, then abandoned in 1964. In 2014, interior designer Dina Dwyer and her developer/contrac
tor husband, Richard Dwyer, began a four-year restoration before opening the inn.
Four Seasons Resort & Residences Napa Valley 400 Silverado Trail fourseasons.com/ napavalley
Indian Springs Resort & Spa 1712 Lincoln Ave.
indianspringscalistoga. com Okaeri
1415 Foothill Blvd. okaericalistoga.com Solage
755 Silverado Trail N. | aubergeresorts.com/solage Of Auberge Resorts’ three Napa Valley properties, Solage is the most relaxed and approachable, popular with both guests and locals who come enjoy the pool and spa with day passes. Guests can stay in one of TK bun galows reached on winding shady paths, making this feel like a resort community. The bungalows are luxurious, with glass doors that open wide into private yards.
Solage offers a full menu of wellness options in a 20,000-square-foot spa. Need a massage? There are more than a dozen options to choose from, each at vari ous durations. Then there’s the “signature mudslide,” which provides a lengthy soak in the mineral-enriched mud common to the area, followed by relaxation in a geothermally heated mineral bath. Guests can end their spa day in a private poolside cabana with wine service
Dr. Wilkinson’s Backyard Resort & Mineral Springs
1507 Lincoln Ave. | drwilkinson.com Driving by, this looks like a 1950s motel, and it sort of is. Dr. Jon Wilkinson and his wife, Edy, founded this road side resort in 1952 with the aim of promoting wellness in Calistoga’s mineral springs. Today, it’s a luxury hotel, run by Marriott. From the outside, the rooms and cot tages still look like a ’50s motor lodge, but interiors have been updated and modernized. At the spa, a lengthy list of amenities includes three mineral pools of varying temperatures, mud treatments and a Mexican American restaurant with a focus on health food.
Dr Wilkinson’s`,
    adventure: {
      title: 'Two Calistoga Adventures',
      intro: `Two journeys that are a little outside the box — a walkable tasting tour through town, and a mountain getaway to Howell Mountain.`,
      body: `If you’re staying all the way up in Calistoga, you’re probably
Napa smart. There are plenty of incredible wineries making outstanding to classic bottlings in this part of the valley, but here are three journeys that are a little more outside the box.
1: A Walkable Tasting Tour Wine country is beautiful, but there are a lot of vineyards between the wineries, which can mean a lot
of driving. Here’s an antidote to that: a tasting at
three great Calistoga wineries, all within walking distance of one another.
To begin, head to where Lincoln Road, the main street of Calistoga, meets Highway 29 (in Calistoga it’s called Foothill Boulevard). From there, it’s two and a half blocks south to Rivers Marie. Winemaker—Thomas Rivers Brown is a California
superstar who got his start with Zinfandel and Petite Sirah at Turley, then began making some of the world’s highest-rated Cabernets. This is his personal winery, and the tasting room is a glass-enclosed, light-filled space where you can sample his single-vineyard bottlings of Chardonnay and Pinot Noir from the Sonoma Coast, as well as some Cabernet Sauvignon.
Lola Head back up Foothill and in just a block you’ll arrive at your next destination: Lola Wines. The brick bungalow looks like a residence, but within discover the wines of owner Seth Cripe, who trained at Caymus and Belle Glos. Cripe makes Russian River Valley Pinot Noir plus a fascinating selection of wines from less-typical California grapes, including Vermentino, Charbono and Counoise. A tasting here is just $35 for five wines, and you can pair it with various snacks while sitting in one of several eclectic rooms or on the shaded patio space.
If Lola looks like someone’s house, your next stop looks like a gas station. Tank Garage Winery
is built in a restored 1930s gas sta tion—sadly, the pumps out front
don’t dispense wine. But inside you’ll find an eclectic range of vari
ous blends, all fairly affordable.
And tastings run about $40 per person.
If you like any of the wines you taste, buy a bottle for your next
stop, lunch at Buster’s BBQ, a block to the north and just across
the street. Charles “Buster” Davis was born and raised in Shreveport,
Louisiana, before moving to California and eventually Calistoga. He
cooks brisket, ribs and other meaty goodness here, the perfect pairing
for a juicy Napa red wine. They have a limited wine list, but allow

Tank Garage BOYB with a corkage fee.

2: Mountain Getaway Some of the most promising wineries in Napa Valley aren’t
in the valley at all—they’re up the mountain. One of those mountain appellations is Howell Mountain, which pro duces some of the more interesting wines in the region thanks to its blend of soils.
For this journey, you’ll need to drive a bit—12 miles to start. Head south out of town on Highway 29. Just before you reach St. Helena, turn left onto Deer Park Road. After crossing the val ley and Silverado Trail, you’ll start heading up the mountain. Shortly after Deer Park changes to Howell Mountain Road and you pass Linda Falls on the right, you’ll reach the entrance to CADE Estate, on the left.
This is one of the wineries of the PlumpJack Group, co-owned by Gor
don Getty, California Governor Gavin Newsom and John Conover, who is also
the general manager. Past a fire pit, there’s a tasting room with gorgeous
views of redwoods and the valley far below. CADE makes a lovely Sauvignon
Blanc and delicious Cabernet that is a Tip: Most wineries require reservations to
visit and taste (local regulations require them to). So make your appointments in
advance. But if you end up with some free time duringless busy seasons, some win
eries will gladly make that appointment for you at the front door.
good intro to Howell Mountain fruit.
Head back onto Howell Mountain Road and head farther up hill. Have faith in your GPS, because it’s another 5 miles uphill to Outpost Wines, perched on a ridge of the mountain, with Napa Valley on one side and Pope Valley on the other. AXA Mil
lésimes, which owns Bordeaux’s Château Pichon Baron and Por tugal’s Quinta do Noval, purchased Outpost from Frank Dotzler in 2018. Dotzler is still managing the place and Thomas Rivers Brown makes the wines, which include Cabernet but also an intriguing Grenache and Zinfandel that can be hard to find outside the tasting room. That room feels like an old California barn, but with gorgeous views of Napa Valley below.
CADE Estate`,
    },
    soilNote:
      'Volcanic ash and pumice from the Palisades. High heat retention and excellent drainage produce concentrated, powerful wines with distinctive mineral character.',
    bestFor: ['Bold Cabernet', 'Sparkling wine', 'Spas', 'Howell Mountain'],
    winerySlugs: ['schramsberg', 'larkmead-vineyards', 'lola-wines', 'hourglass'],
    restaurantSlugs: ['calistoga-inn-brewery', 'lovina', 'picobar-solage', 'el-taco-feliz'],
    hotelSlugs: ['solage', 'indian-springs-resort', 'francis-house-inn'],
    articleSlug: 'napa-calistoga',
    mapCenter: [-122.5798, 38.5789],
    mapZoom: 13,
    neighborRegions: ['rutherford', 'pritchard-hill', 'st-helena'],
  },
  {
    slug: 'pritchard-hill',
    name: 'Pritchard Hill',
    tagline: 'Above the Valley Floor',
    author: 'James Molesworth',
    issue: 'June 15 & 30, 2026',
    heroImage: TEST_IMAGES[5],
    accentColor: '#2E2A0A',
    pullQuote: `To understand Pritchard Hill is to understand what elevation and volcanic soil do to Cabernet Sauvignon — something transformative, something that takes decades to reveal itself.`,
    intro: `Pritchard Hill rises above the eastern edge of Napa Valley, offering a perspective — and a wine style — that is distinctly its own. The volcanic soils and elevation produce Cabernet Sauvignons of extraordinary concentration and longevity.`,
    body: `PRITCHARD HILL A Visit Above the Fog Line In the late 1960s, Pritchard Hill was an isolated and essentially forgotten area. Today, while it retains a sense of isolation, it has become home to a cluster of prominent Cabernet Sauvignon producers who hew long-lived wines out of the site’s distinctive iron-red and yellow-tinged volcanic soils. Driving up the long, winding road to the top, which hits 1,800 feet of eleva
The Howard Backen Estate 275 Long Ranch Road | backenestate.com
Perhaps no single architect defines the Napa Valley wine country lifestyle more than Howard Backen. Backen’s signature farmhouse-chic aesthetic championed functionality and natural harmony while favoring discreet affluence over ostenta
tion. A prolific architect, he designed upwards of 300 private homes, 40 restau rants and more than 60 wineries through his Backen & Backen Architecture firm. Most of his work is in Napa Valley, including the home he considered his fin est: the Pritchard Hill Estate. Designed initially for the Nelson-Johnson family, who went on to create the Ovid wine estate next door, the property features 10,000 square feet of living space across a main house, guest houses and cot tages. The sweeping panoramic view of the valley below is so stunning it might make you forget the pool, yoga room, fireplaces and open chef’s kitchens that embellish the estate.
Ovid was eventually purchased by the Duncan family of Silver Oak in 2017 while the house went to a different owner. Then a group of partners, including chef Thomas Keller, purchased the house with the idea of creating an ultra-pre mium vacation property available to rent. With an in-house concierge, you can have your full itinerary prepared for you, from wine tastings at other Pritchard Hill estates, to meals on-premise with chefs from Thomas Keller Restaurant Group and more.
Now called the Howard Backen Estate, this piece of Napa Valley history of fers a spectacular vantage point—isolated, quiet and comforting—that provides for arguably the ultimate Napa Valley getaway.

tion, you’ll pass numerous vineyards as well as a handful of eye popping homes and showpiece wineries. Make sure to take no tice of how the flora changes from the valley floor. It’s as unique an area as Napa Valley has to offer, and a visit is a must for any serious wine enthusiast.
—James Molesworth

Where to Taste on Pritchard Hill

David Arthur Vineyards 210 Long Ranch Road | davidarthur.com
Don Long purchased 1,000 acres on Pritchard Hill in the 1950s and was among the first to plant vines in the 1970s. Today, his son David and grand daughter Laura are carrying on the family tradition. Winemaker Nile Zacherle fashions muscular, mineral-accented wines that help define Pritchard Hill’s terroir.
Chappellet Winery 1581 Sage Canyon Road | chappellet.com
Don and Molly Chappellet founded their winery in 1967; early vintages were made by the legendary Philip Togni. Togni was followed by Joe Cafaro, Tony Soter and Cathy Corison. Since the 1990s, Phillip Corallo-Titus has handled winemaking, while second- and third-generation Chappellets, led by Don and Molly’s son Cyril, pilot this historic family estate.
Continuum Estate 1677 Sage Canyon Road | continuumestate.com
Tim Mondavi (Robert’s son) and his sister, Marcia Mondavi Borger, founded Continuum Estate in 2005. Today, Tim’s children Dante, Carlo, Chiara and Carissa all pitch in. They’re christening a brand new barrel and hospitality area with plans to offer a rotating cast of guest chefs, sunrise vineyard hikes and more.`,
    adventure: {
      title: 'The Pritchard Hill Pilgrimage',
      intro: `A morning drive up the eastern hills rewards with some of Napa's most singular wines and views that stretch across the entire valley.`,
      body: `Begin at Chappellet, one of the valley's most storied mountain estates, founded in 1967 by Donn and Molly Chappellet. Then to Continuum, Tim Mondavi's family project, where the elevation and rocky soils produce wines of extraordinary precision. David Arthur follows — among the most consistent producers on the hill. End at Howard Backen Estate, the architect who designed many of Napa's great wineries having now created his own.`,
    },
    soilNote:
      'Thin, rocky volcanic soils at elevation. Extreme stress on the vine produces tiny yields of intensely concentrated fruit with exceptional aging potential.',
    bestFor: ['Cult Cabernet', 'Mountain terroir', 'Collectors'],
    winerySlugs: [],
    restaurantSlugs: [],
    hotelSlugs: [],
    articleSlug: 'napa-pritchard-hill',
    mapCenter: [-122.39, 38.51],
    mapZoom: 13,
    neighborRegions: ['rutherford', 'calistoga'],
  },
  {
    slug: 'downtown-napa',
    name: 'Downtown Napa',
    tagline: "The Valley's Urban Core",
    author: 'MaryAnn Worobiec',
    issue: 'June 15 & 30, 2026',
    heroImage: TEST_IMAGES[6],
    accentColor: '#0A2E20',
    pullQuote: `The best argument for spending time in downtown Napa is the sheer variety — from Michelin-starred restaurants to taco trucks, from $20 tasting flights to library pours of legendary Cabernet.`,
    intro: `Downtown Napa has transformed over the past two decades from a quiet county seat into a vibrant destination in its own right. The Oxbow Public Market anchors the culinary scene, while more than 40 tasting rooms line the riverfront and downtown streets.`,
    body: `Once upon a time, there were two Napas. Napa the val ley, known as a chic playground for well-heeled wine
lovers, and Napa the town, a sleepy, workaday community. That dichotomy has disappeared. Downtown Napa has become a destination in its own right while also serving as the main hub for exploring the valley that runs for 30 miles in length to its north.
There’s plenty to see, eat, drink and do in downtown Napa, led by a strong concentration of tasting rooms, now numbering more than 40. These urban spaces typically do not require reservations (unlike most upvalley tasting rooms) and offer a more casual and accessible experience.
Restaurants, hotels and music venues abound, and the town’s walkable streets are lively, lined with shops, galleries, spas and more. Downtown has a thriving coffee, cocktail and craft beer culture, too, infusing the energy of those passions to the mix.
The evolution began in the early 2000s when vintner Robert Mondavi opened Copia: The American Center for Wine, Food & the Arts along an oxbow-shaped curve of the Napa River. Today, a branch of the Culinary Institute of America occupies the space, offering classes, seminars and a restaurant. Oxbow Public Market, opened in 2008, features artisanal food vendors, specialty shops, restaurants and a wine bar under one roof. The three-day music festival BottleRock draws a diverse audience

whose interests are reflected in the many new businesses popping up.
First Street Napa is a centerpiece for the downtown area. A three-block, 325,000-square-foot mixed-use development, it features dozens of shops and restaurants, anchored by the Archer Hotel. On weekends, the hotel’s rooftop restaurant and bar buzz with energy. Phase two is under construction and will add a 160-room hotel and 78-unit condominium building, both with rooftop access. The expansion will create a pedestrian friendly corridor extending to Main Street and bring even more shopping opportunities.
The city has also integrated the Napa Wine Train into its cultural identity. The 2-mile stretch of semi-industrial backyards that the train passes through has been transformed into the Rail Arts District, where murals and art installations wrap around switchboxes and line a paved walking path.
Food City, near downtown, has emerged as a hot spot, home to a specialty market, the popular Naysayer Coffee, a fried chicken joint, a taqueria, even a cat café. Good Pantry, a zero waste grocery store, has also opened there.
This fresh-faced Napa doesn’t live in the valley’s shadow. It complements the region, blending wine, food, art, culture and community into an experience that feels distinctly, confidently Napan.

Where to Taste

With more than 40 tasting spots to choose from, there is no
shortage of wines to explore in downtown Napa. Hours and days open can vary, typically ramping up as the weekend approaches. Many accept walk-ins, but for the best experience we recommend secur
ing an appointment. Tasting rooms are part of the hospitality industry, and tipping for excellent service (as you would in a restau rant) is always appreciated.
Cadet Wine & Beer Bar 930 Franklin St. | cadetbar.com
The vibe here is trendy and cool, a dark spot with loud music that speaks to a younger crowd. There’s an impressive selection of international wines and cocktails. Small bites include grilled cheese and a
Back Room Wines
1546 First St.
backroomwines.com Bounty Hunter
Wine Bar & Smokin’ BBQ
975 First St.
bountyhunterwinebar.
com Compline Wine
Shop/Compline Restaurant
1300 First St., Suite 319 and Suite 312 complinewine.com Kerr Cellars
1463 First St.
kerrcellars.com Maison Fayard
1408 Second St.
maisonfayard.com No Love Lost
Wine Co.
chocolate panini with marshmallow whip. Gentleman Farmer Bungalow
Cadet Hestan Napa
960 Clinton St. nolovelost.wine Outer Space
1564 First St. | gentlemanfarmerwines.com Owners Joey Wolosz and Jeff Durham’s Gentleman Farmer Bungalow is a welcome addition to the downtown Napa scene, offering an intimate experience. A renovated Craftsman home built in the 1920s has been reimagined into a cozy, homey spot where guests feel welcome to enjoy a glass, a bot tle, or take on a unique experience in which the owners prepare family recipes and share stories.
1300 First St., Suite 291 | hestan.com/hestan-napa
Stanley Cheng is both a vintner and a kitchen innovator, founder of Meyer Corporation, one of the largest cookware companies in the world. So it makes sense that when he and his wife, Helen, opened their downtown Napa spot (they have a tasting room in Yountville as well), the couple com bined their loves into a new concept: part restaurant, part cookware bou tique. Guests can enjoy the talents of chef Mark Dommen, formerly of One Market Restaurant, while admiring the showroom of products and appli ances and enjoying the lineup of wines.
Mayacamas Downtown
1256 First St. | mayacamas.
com If you can’t make the jour ney to visit the remote Mayacamas estate on
Mount Veeder, you can head to their chic down town tasting room to sam ple current releases or li
brary vintages by the bottle or glass in a more accessible setting.
Gentleman Farmer Wines
974 Franklin St.
outerspace.wine/ Robert Craig Winery
1553 Second St.
robertcraigwine.com Roots Run Deep Tasting Salon 1607 First St.
rootsrundeep.com Vintner’s
Collective 1245 Main St.
vintnerscollective.com

Where to Eat

Dining in downtown is diverse, from white tablecloth es tablishments to more casuals spots. Many restaurants
offer seasonal specials that highlight locally grown and raised ingredients. You can easily find vegetarian, vegan and glu ten-free options. Wait staff are reliably ready with a wine rec ommendation. Restaurants also regularly welcome winemakers
and wine collectors, but check ahead to confirm their corkage policies. Also check open hours: They can vary throughout the week and year; for example, many places are closed for lunch Tuesdays and Wednesdays.

Restaurants

Angèle Restaurant & Bar 540 Main St. | angelerestaurant.com
Since it opened in 2002, Angéle has set the bar for food and wine in downtown
Napa, with French countryside food meeting warm service in both a comfy
interior and a big outdoor space (when the weather permits). Classic onion
soup, tuna or beef tartare, escargot, beef bourguignon and croque monsieur
are typically on the menu, as are hand made pastas, seasonal salads and the
must-order flowerpot full of French fries.
The wine list is thoughtful and mixes French sensibilities with local wines.
Angèle Celadon
Napa Valley Restaurant 500 Main St., Suite G celadonnapa.com
Celadon has quietly and consistently been a go-to place for excellent food since 1996. The setting is in a relaxing garden courtyard and adjacent dining room, the menu a mix of California, Mediterranean and Asian influences. The dinner- and brunch-only menu features wine-friendly items like pork belly lettuce cups, Moroccan braised lamb shanks and the signature wild mushroom risotto.
Con Amor 815 Main St.
iloveconamor.com Con Amor is a fun new place showcasing top-notch Mexican dishes, including chile
relleno, gorditas, mole chicken wings and birria, a
Sunday special. The black matte walls, chandeliers and
Dia de los Muertos vibe provide a charming setting. This
is an excellent spot for in ventive mezcal and tequila
based cocktails, like the La Teresota, with tequila, alma
finca, lime and salt foam.
Con Amor Azzuro Pizzeria E Enoteca
1260 Main St.
azzurropizzeria.com Charlie Palmer Steak
1260 First St.
charliepalmersteak.com Cole’s Chop House
1122 Main St.
coleschophouse.com Compline
Restaurant 1300 First St., Suite 312 complinerestaurant. com
Crocante Artisan Pizza 976 Pearl St.
croccantepizza.com

KenzoNapa 1339 Pearl St.
kenzonapa.com Kitchen Door
Napa Restaurant
1300 First St., Suite 272 kitchendoornapa.com
Los Agaves Napa
660 Main St.
losagavesnapa.com Morimoto Napa and Morimoto Asia
610 Main St. and 790 The Dutch Door
1245 First St.
thedutchdoornapa.com Look for the Dutch door–a horizontally split door–on Randolph Street, around the corner from the First Street address. You’ll probably see plenty of people waiting to pick up their to-go only food. Fried chicken is the signature dish here, which can be served with either Cajun, Korean or Spanish spices, as either ten ders or in a sandwich. Vegetarian options are plentiful, with a made-from scratch plant burger created from quinoa, roasted mushrooms and pep pers, kale, black beans and chickpeas. There are also plant-based bowl options and a beef hot dog with caramelized
Main St.
morimotonapa.com Normandie
Napa 670 Main St.
normandienapa.com Osha Thai
Restaurant & Bar 1142 Main St.
oshathai.com/napa Oenotri
1425 First St.
oenotri.com Red Rock Cafe & Back Door BBQ
1010 Lincoln Ave.
backdoorbbq..com Slanted Door Napa
1650 Soscol Ave.
slanteddoor.com/napa Stateline Road Smokehouse 872 Vallejo St.
stateline-road.com The Waterfront Seafood Grill 720 Main St.
waterfrontseafoodgrill.. com Zuzu
829 Main St.
zuzunapa.com Dutch Door onions and crushed potato chips.
La Toque (GA)
1314 McKinstry St.
latoque.com Located inside the Westin Verasa, chef
Ken Frank’s space has helped define wine country cuisine, focusing on sea
sonal and inventive food, including a vegetarian tasting menu in addition to a
traditional omnivore tasting menu. But Frank is perhaps at his best when work
ing with luxury ingredients; this year is the 44th edition of his “All Black Truffle
Menu” with truffles slipped into every course. A Wine Spectator Grand Award
winner since 2014, the wine list is one of the best in the area. This is truly a fine
dining experience, but with plenty of warmth to the service.
Scala Osteria & Bar 1141 First St.
scalaosteria.com From the moment it opened, this off
shoot of the popular Bistro Don Giovanni has been swarmed with locals
and tourists alike, drawn to the south ern Italian coastal fare with Mediterra
nean details, including pan-seared bran zino, petrale sole piccata and poached
octopus salad. There are also wood fired pizzas, handmade pastas and a
thin and crispy pork chop Milanese. The wine and cocktail list cater to the fresh
fare on the menu.
La Toque

Torc Napa 1140 Main St.
torcnapa.com Torc is one of those rare restaurants that can make delicious
food in many directions, from a sweet potato pakora to black
truffle grilled cheese to English pea risotto. The food is im
mensely pairable with wine, and the staff can handily help
you navigate a wine pairing, even with creative dishes like
duck breast with blood orange, radish and Oaxacan bitter
chocolate sauce. The service is friendly, the space is open and
airy, with exposed stone walls and wood floors and a peek
into the kitchen in the back.
Torc
Breakfast/Coffee/Sandwiches/Snacks Ohm Coffee
There are plenty of places to fuel up before a full day of exploration in Napa; whether that means quality coffee, breakfast, provisions or grab-and go (and some offering all of the above). Here are some local favorites.
Contimo Provisions 950 Randolph St. | contimonapa..com
Fresh-baked biscuits, homemade pimento cheese, luxurious sandwiches and gourmet pantry items are all on offer at this bright and cheerful spot.
Genova Delicatessen 550 Trancas St. | genovadelinapa.com
Sandwiches here are generous, many with an Italian spin, and there is both a hot and cold selection of deli salads. Imported Italian goods are also sold, as are homemade ravioli and sauces, soups and meatballs. Before anyone reminds you, take the cannoli.
Grace’s Table 1400 Second St. | gracestable.net
Grace’s Table is open all day serving international bistro food, but the iron skillet cornbread served with lavender honey butter, the shrimp and grits,
the chilaquiles and cinnamon rolls make it ideal for breakfast or brunch.
Le Paris Artisan and Cafe 828 Brown St. | lepariscafe.com
Not only does the pastry selection include cropuffs, sticky buns and crème brûlée brioche, there are also wonderful savory options, like a fresh-baked croissant with smoked salmon, scram bled eggs and crème fraîche. If the purple ube or decadent tres leches offerings catch your eye, you should absolutely try them.
Moulin Bakery 1321 First St. | moulinbakerycoffee.com It might be hidden in an alley behind First Street, but once you find Moulin it will no doubt be full of patrons spilling onto the few outdoor tables. Expertly made coffees and French-style pastries are here, including the most crunchy, delicate viennoi series imaginable.
Naysayer Coffee 1813 Old Sonoma Road | naysayercoffee.com Located in Food City, Naysayer has some of the best coffee in town, with some of the friendliest service. Seasonal beverages are inspired, like an horchata latte or spiced chamomile latte, and small bites are precise and fresh. A second loca tion recently opened up north of downtown.
1412 Second St. | ohmcoffee.com The “ohm” here refers to the musical term for the measure of electrical resistance in an amplifier, and founder Derek Bromley names his roasts after guitar amplifiers. Bromley is not only a rock gui tarist, he also worked in the wine industry and ap plies both of these approaches to his coffee, featuring single-origin roasts in a rock ‘n’ roll setting. A second location near the Rail Arts District is the coffee roastery and lab, where classes in cupping, latte art and brewing methods are taught.
Winston’s Cafe and Bakery 1517 Third St. | winstonsnapa.com
This bright and airy café is known for generous plates of breakfast and lunch and an eye-popping assortment of baked goods, donuts and pastries. It can be busy, but orders move quickly.
Ohm Coffee

The Oxbow Market As far as culinary destinations go,
this public market is a wonderful gathering place for foodies and wine lovers, with multiple vendors in one location. There are shops for ingredients and specialty items, as well as some very tasty restaurants.
Ritual Coffee Roaster has been an an chor since the market opened in 2007, one of the best places for a cup of coffee or tea in the area. Hog Island Oyster Company is also a mainstay, with fresh and grilled oysters, po’ boy sandwiches and more.
Don’t be dismayed by the line outside Gott’s Roadside—it moves quickly and the food comes out promptly, including thick shakes, gourmet burgers, fish tacos, sweet potato fries and inventive salads. Loveski brings pastrami sandwiches, potato latkes, matzoh ball soup and bagels to Napa from chefs Christopher and Martina Kostow. Live Fire Pizza specializes in wood-fired pies and small bites.
For international flavors, El Porteno features empanadas both sweet and sa vory, while Moro showcases Moroccan flavored mains on flatbreads, salads or

couscous, tasty and fresh. Sumo Dog takes hot dogs and puts a Japanese twist on them, with ingredients like wasabi relish, tonkatsu sauce and furikake. Rotation is the newest addition, with a rotation of chef residencies, including Martin Yan and Tristan Epps.
Bar Lucia is a wine bar with small bites, adjacent to the decadent Kara’s Cupcakes. For the sweet tooth, there’s also lo cal chocolatier Annette’s Chocolates. Fieldwork taproom has 20 beers on tap and Detroit-style pizza. The Walt tasting room is located across the street.
Gott’s Hudson Greens & Goods blends a juice bar with fresh produce and curated pantry goods. Fatted Calf Charcuterie has some of the best high-end butcher and charcuterie items, as well as terrific sandwiches such as a savory porchetta and house-smoked ham with black truffle but ter. Whole Spice will inspire your next cooking adventure, as well as give you a place to test your smell memories. And Model Bakery has Oprah’s favorite English muffins, fresh-baked breads and plenty of sandwiches, wraps, cookies and pastries.

Where to Stay

Day trips from population centers such as Sacramento
and San Francisco are popular, but a for a deeper dive into wine country pleasures, most visitors plan a longer stay. The city (pop. 76,000) provides myriad accommodations,
Napa River Inn 500 Main St. | napariverinn.com
Located at the historic Napa mill and right on the Napa River, this hotel, which
dates to the 1880s, is perfectly situated within walking distance of most of the
best restaurants and tasting rooms downtown, making it an ideal location
as a vacation home base.
Westin Verasa 1314 McKinstry St.
marriott.com/en-us/hotels/sfonw-the westin-verasa-napa/overview/ [FIX]
Westin was the first luxury hotel in downtown Napa, opening in 2008. Its
convenient location in the Oxbow District[CK] is walking distance from the
Oxbow Market and Napa Wine Train, and it’s a short walk across the Napa
River to access the rest of downtown.
Chef Ken Frank oversees the restaurants here, including Wine Spectator Grand
Award-winning La Toque and the more casual—yet still elevated—Bank Café and
Bar in the lobby.
including roughly 2,800 hotel rooms (not including projects in development), ranging from expansive resorts to more intimate experiences.
Napa River Inn Andaz Napa, by
Hyatt 1450 First St.
hyatt.com/andaz/en US/apcrn-andaz-napa
[FIX] Archer Hotel
Napa 1230 First St.
archerhotel.com/napa Hotel Napa
Valley 1556 Polk St.
hotelnapavalley.com Westin Verasa

DOWNTOWN NAPA Culture & Cocktails Downtown Napa has plenty of
shopping and non-wine related activities to add to the mix. Busi
ness hours can vary by venue and season, so be sure to check the most recent infor
mation before heading out.
The Arbaretum 1149 First St. | napadistillery.comthe-arbaretum
This local distillery makes quality brandy, gin,
whiskey and bottled cocktails such as mint julep,
brown derby and the sidecar. This art deco-inspired spot fills up with people tasting inventive
cocktails and snacking on small bites like deviled
eggs and muffaletta pizza.
Bougie Napa Luxury Candles 1300 First St., Suite 332. | bougienapa.com
There are dozens of lovely hand-poured candles to purchase at Bougie, but consider one of the can
dle-making classes to sharpen your senses. During the class, the math and chemistry behind a perfect
burn are discussed, and you can design a signa ture scent.
Jeffries Chispa Bar
1500 First St., Suite 140. | chispabar.com Tastebuds come alive at this hybrid tequila and agave-centric cocktail bar meets swank restau rant. Bites include crudo, tacos, caviar, a spicy oc topus dish with sautéed peanuts, pasilla peppers and pickled garlic, and plenty of sandwiches and salads. Cocktails include clever concoctions like the Oaxacan old fashioned, with reposado mezcal, toasted agave, mole and orange bitters, or Peat & Repeat, a mix of Laphroaig Scotch, mezcal, agave, lemon, lime and yuzu.
Marquee Pinball CIA at Copia
500 First St.. | ciaatcopia.com The calendar at the CIA at Copia is full of wine and food-events, single-day classes, family friendly movies and cooking boot camps that fo cus on different parts of the world. From learning to make pasta at home, scavenger hunts and BBQ training, there’s plenty to add to your itinerary. An on-site restaurant called The Grove offers an avo cado toast brunch experience most weekends.
Crafted Napa Valley 1300 Third St., Suite 301. | craftednapavalley.com Shop for locally made bath and body products, jewelry, seasonings, candles and snacks in this charming gallery.
Folklore 1226 Third St.. | folklore-napa.com
A combination record store, wine and cocktail bar, restaurant and radio station, Folklore is located in a semi-industrial, funky and chill spot with plenty of personality.
Jeffries General Store 1416 Second St.. | Instagram only
This delightful store is teeming with amazing and eclectic gifts, including stationary, pottery, spa products, tea towels, snacks and art. But it’s also a useful store for forgotten travel necessities (espe cially without a grocery store or drugstore located downtown).
Marquee Pinball Lounge 1311 First St.. | marqueepinball.com
If you’re someone that needs to level up, this pin ball and classic video game spot is flipping awe some, a welcome new spot in downtown Napa. Marquee currently serves beer, with wine and ci der offerings coming soon.

Mommenpop Tasting Room 920 Franklin St.. | mommenpop.compages/
tasting-room This cheerful, aperitif tasting room showcases
the citrus-based Mommenpop drinks created by winemaker Samantha Sheehan. The blood or
ange is made from an organically grown Barbera rosé with blood oranges and botanicals.
There is also Seville orange, ruby grapefruit, and
a lime-pop made from a base of Chardonnay with Makrut and Bearss limes, long pepper,
toasted fig leaves, orris root and vanilla bean.
Rail Arts District Start at 816 Vallejo St.. | radnapa.org
Consider this stretch a sort of contemporary open-air gallery, with public art installations
along a paved walking and biking trail. Eleven murals, wrapped switchboxes and 21 clay sculp
tures have turned a semi-industrial area into a colorful patch.
Rancho Gordo 1350 Main St.. | ranchogordo.com
Steve Sando changed the way we talk about beans when in 2001 he founded Rancho Gordo,
a company focused on cultivating and selling rare, indigenous heirloom bean varieties. The
beans have since become the ultimate designer ingredient, and the Rancho Gordo Bean Club has a waiting list thousands long. This new loca
tion for a retail shop is an expanded, bright and colorful place to shop for beans, spices and cookbooks for the legume lovers in your life.
Tonewood & Courage 1300 First St., Suite 212. | tonewoodandcourage.
com Musicians will find themselves at home in this
part music store, part gathering place. High-end guitar and bass brands are sold, as well as hand
built instruments by local artisans. In the eve nings, it becomes an intimate music venue for
musicians in a variety of genres.
Wilfred’s Lounge 967 First St.. | wilfredslounge.com
A tiki bar in Napa that pulls no punches with the
Polynesian stylings or flavors, Wilfred’s is a place to get your fix of kalua pork, chicken katsu
or spam fries (panko-crusted fried spam served with a mango habanero sauce), along with mai tais and other colorful and tasty cocktails.
Rancho Gordo

DOWNTOWN NAPA Beyond City Limits One of the most appealing aspects of using downtown
Napa as a travel base is its proximity to the wine regions that surround the town. Just a few miles east is Coombsville. Head a few miles in the opposite direction and
you’ll arrive either[UNCLEAR] in the windswept Carneros region of Napa Valley or in the rustic hills of Mt. Veeder. Coombsville is mostly a residential area, but there are vine
yards tucked into valleys and rolling hills leading east up to Mt. George. Carneros, which straddles Napa and Sonoma counties, is known for its cool climate and proximity to the San Pablo Bay, with plenty of vineyards to drive through. Mt. Veeder is marked by rugged, windy[WINDING?] roads; vineyards here are hard to see from the road through the trees clinging to the eastern face of the Mayacamas mountain range.
Etude

Where to Taste

Artesa Vineyards & Winery
(Carneros)
1345 Henry Road artesawinery.com
Bouchaine Vineyards
(Carneros)
1075 Buchli Station Road bouchaine.com
Cuvaison Winery /
Brandlin Estate (Carneros)
1221 Duhig Road cuvaison.com
Domaine Carneros
(Carneros)
1240 Duhig Road domainecarneros.com
Frias Family Vineyards (North Napa) 1886 El Centro Ave. friasfamilyvineyard.com
HdV Wines (North Napa) 588 Trancas St.
www.hdvwines.com Hess Persson Estates (Mt. Veeder)
4411 Redwood Road hessperssonestates. com Hyde Vineyards (Carneros)
1044 Los Carneros Ave. hydevineyards.com Kenzo Estate (Coombsville) 3200 Monticello Road
Etude Winery (Carneros)
1250 Cuttings Wharf Road | etudewines.com Etude’s tasting room, in a stone building and former distillery, provides an inviting, relaxed backdrop to focus on Etude’s wines, especially the single-vineyard expressions of Pinot Noir and Cabernet Sauvignon. There are multiple ways to enjoy a tasting, including a seated experience or simply wandering around the grounds.
Favia Wines (Coombsville)
2031 Coombsville Road | faviawines.com The ultimate intimate experience, a visit here is a visit to the home
stead of vintners Annie Favia and Andy Erickson. Private tastings take
place in a cabin that doubles as the winery’s tasting lab and include an
overview of the historic former Antonio Carbone Wine Cellar and Ital
ian Garden, which dates to the 1870s. Historic artifacts and documents
are on display, but are overshadowed by the spectacular wines.
Hudson Ranch (Carneros)
5398 Sonoma Highway | hudsonranch.com Hudson is a magical spot, with landscaping of unusual succulents and
a flower, fruit and vegetable garden with life-size[UNCLEAR] gourds
that offer a touch of Willy Wonka. The meticulous vineyards are sur
rounded by rugged oaks, with stunning views and plenty of wildlife–
Farella Vineyard (Coombsville) 2222 N. 3rd Ave.
farella.com kenzoestate.com
Mayacamas Estate (Mt. Veeder)
1155 Lokoya Road mayacamas.com the ranch covers 2,000 acres. In addition to enjoying the impressive estate-grown wines, ask about picnics and hikes around the property.

Hudson Ranch

Where to Eat

Bistro Don Giovanni (North Napa)
4110 Howard Lane | bistrodongiovanni.com An institution in Napa, Bistro Don Giovanni has been
serving exceptional rustic Italian cuisine to vintners and
tourists since 1993. A large, covered patio and garden
setting make it one of the most romantic spots around,
especially on a summer night. But the food is top-notch year-round, including handmade pastas, fried anchovy–
stuffed olives, wood-fired pizzas, veal parmigiana and
Mamma Concetta’s meatballs, served on soft polenta.
Carabao (South Napa)
145 C Gasser Drive | carabaonapa.com Carabao is the hot new eatery in town, serving high-end and inventive Filipino cuisine in an intimate, friendly
space. Chef Jade Cunningham takes the high-end tech
niques she learned at stints at The French Laundry and
Meadowood and applies them to Filipino dishes like pork lumpia and Kare Kare stew with oxtail croquette, tripe
and a coconut peanut sauce. There is also plenty of cre
ativity on the menu, from the deviled egg adobo and
crispy pork sisig tacos served with a sunny side up quail egg. The wine list is compact but put together with
plenty of thought to pairing with the cuisine, featuring
plenty of German Rieslings and other aromatic white
wines from around the world.
Farm Restaurant & Bar (Carneros)
Inside Carneros Resort 4048 Sonoma Highway carnerosresort.com Foodshed (North
Napa)
3385 Old California Way Carabao foodshedpizza.com

Where to Stay

Carneros Resort Bear (Carneros) 200 Stanly Crossroad auberge.com/stanly-ranch/ dine/bear
Boon Fly Cafe 4048 Sonoma Highway boonflycafe.com
(Carneros)
4048 Sonoma Highway carnerosresort.com Casa Mani
Resort Napa Valley (North Napa)
1075 California Blvd. hilton.com/en/hotels/ napvpqq-casa-mani resort-napa-valley
Napa Valley Marriott Hotel & Spa (North
Napa)
3425 Solano Ave.
marriott.com The Meritage Resort & Spa (South Napa) 875 Bordeaux Way
meritageresort.com Milliken Creek Inn(North
Napa)
1815 Silverado Trail millikencreekinn.com Napa Winery Inn (North
Napa)
1998 Trower Ave. napawineryinn.com Senza Hotel (North Napa) 4066 Howard Lane senzahotel.com
Silverado Country Club (North Napa) 1600 Atlas Peak Road silveradoresort.com
Stanly Ranch, Auberge Collection
(Carneros)
200 Stanly Crossroad auberge.com/ stanly-ranch`,
    adventure: {
      title: 'The Carneros Adventure',
      intro: `Head south from downtown into Carneros, where the cool influence of San Pablo Bay shapes an entirely different style of wine.`,
      body: `THE WIND IN YOUR HAIR TOUR Several places around Napa feel
completely distinct from the rest of the valley. Carneros stands out
with its own microclimate, aromas, ambience and energy.
Driving through Carneros typically means traveling east to west, rather
than following Napa Valley’s usual north-to-south route. Rolling hills de
fine the landscape more than valley floors or rugged mountains. Curving
roads invite leisurely drives, and on clear days you can glimpse San Pablo
Bay to the south. Because the region sits so close to the bay, ocean winds
sweep through Carneros, especially during the summer. Towering eucalyp
tus trees serve as windbreaks and re lease a camphorlike fragrance into the
air.
Start a day exploring the Napa side of Carneros (the region also stretches west into Sonoma) with donuts—spe
Domaine Carneros cifically, the famous ones at Boon Fly Café. Located at Carneros Resort and Spa, the bright red, barn-style restaurant welcomes guests through a separate entrance off Sonoma Highway. You might order the chicken and waffles, Dungeness crab Benedict
Bouchaine or corned beef hash, but save room for the donuts—they make the perfect sweet finish to breakfast.
Next, driveless than 10 minutes to Bouchaine Winery. On a clear day the property offers sweeping bay views. The wines are precise and aromatic, and the winery hosts dynamic
educational programs. On Friday mornings, the Falconry in the Garden experience truly stands out. A master falconer introduces guests to raptors—perhaps a hawk, owl or falcon—and explains how these birds partner with vineyard teams, how they hunt and how they see. You can even pose for a photo with the birds, all while enjoying a glass of wine.
Just five minutes away, Domaine Carneros rises from a hilltop like a fairy-tale château. Climbing the romantic, grand staircase offers countless photo opportunities. Domaine Carneros has built its reputation on exceptional sparkling wines and a wide range of tasting experiences. Two stand out in particular. The Art of Sabrage teaches guests to open a bottle of spar
kling wine with a sword, a tradition that dates to Na poleon’s era. Equally memorable is the Ultimate Caviar Experience, where sparkling wines pair with an as sortment of Tsar Nicoulai Caviar served alongside gourmet potato chips, toast points, and crème fraîche.`,
    },
    soilNote:
      'Urban riverfront; Carneros to the south offers fog-cooled clay-loam soils ideal for Pinot and Chardonnay.',
    bestFor: ['Dining', 'Oxbow Market', 'Tasting rooms', 'Carneros day trips'],
    winerySlugs: [],
    restaurantSlugs: [],
    hotelSlugs: [],
    articleSlug: 'napa-downtown',
    mapCenter: [-122.2823, 38.2989],
    mapZoom: 14,
    neighborRegions: ['yountville'],
  },
]

export const getRegion = (slug: string) => regions.find((r) => r.slug === slug)
export const getAllRegionSlugs = () => regions.map((r) => r.slug)
