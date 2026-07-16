/**
 * Wine Country Calendar — verbatim from the June 2026 print draft
 * (WS063026_napaCalendar, "Points of Interest," by MaryAnn Worobiec).
 * Two draft typos repaired per copy desk: "sponso[r]" and "year-[end]".
 */

export type CalendarSeason = {
  months: string
  paragraphs: string[]
}

export const CALENDAR_KICKER = 'Points of Interest'
export const CALENDAR_TITLE = 'Wine Country Calendar'
export const CALENDAR_DEK = 'A Seasonal Guide to Things to See and Do'
export const CALENDAR_BYLINE = 'MaryAnn Worobiec'

export const CALENDAR_SEASONS: CalendarSeason[] = [
  {
    months: 'January / February',
    paragraphs: [
      "Napa Valley tends to be tranquil at the beginning of the year, making these months an ideal time for a visit without the high-season crowds. While January and February are some of the coldest and wettest months, the vineyards and landscape are verdant, with the region's canary-yellow mustard flowers popping up amid the vine rows.",
      "It's also an excellent time to study terroir. A simple ripple in a vineyard can reveal where the water is retained versus the better-drained soils. It's also fascinating to see the vines before and after their pruning cuts. Before, they appear wild and tell the story of the previous growing season. After, they are tidy and uniform, ready for the new growing season.",
      "Damp weather outside is a good reason to do cozy things inside. January is Napa Valley Restaurant Month, with many venues offering special pricing and prix fixe menus. Some restaurants might tighten up service times with off-season hours, but overall it will be easier to get reservations. The Napa Valley Truffle Festival is another opportunity to indulge. Indoor activities also include the Napa Asian American Film Festival and Yountville International Short Film Festival, and hopping aboard the Napa Valley Wine Train is a relaxed way to explore the valley. That all said, for a brisk stroll, an outdoor option that's popular with the locals is the Napa Lighted Art Festival—a walkable tour of downtown Napa featuring dramatic light sculptures.",
      "Downtown Napa coffee shops are warming and welcoming stops, too: Naysayer, Ohm, Moulin, and Ritual are among the best. There's also Ohm's Roastery and Coffee Lab in the Rail Arts District of downtown Napa, where you can get a private lesson on brewing methods, latte art or coffee cupping. Chocolate lovers will find that area chocolatiers will be happy to inspire you and your Valentine. Anette's is a local favorite for its hot chocolate. Le Belge creates chocolates specifically to pair with wines; their Cabernet Sauvignon offerings include a dark chocolate/lavender/black currant and a dark chocolate/espresso. Kollar and Earth & Sky craft dramatic bonbons, petite works of art. Woodhouse in St. Helena is known for its homemade s'mores.",
    ],
  },
  {
    months: 'March / April',
    paragraphs: [
      'The first half of spring in Napa Valley brings the first signs of grapevine activity. Dormant vines awaken and undergo budbreak, when the first leaves swell and burst open. Rains taper off and the weather steadily improves. Skies tend to be filled with dramatic changes in weather; dark clouds, bouts of intense sunshine and rainbows are common.',
      "This time of year is ideal for fresh air activities. There's the Napa Valley Marathon (along with a half marathon and 5K) if you need a challenge. Bicycle rentals are plentiful, and Vine Trail Napa Valley from downtown Napa to Yountville is a particularly beautiful stretch of paved paths. The Old Faithful Geyser just north of Calistoga goes off every 45 minutes or so and is a relaxing spot for a picnic with BYOB wine. Skyline Ridge Park, Robert Louis Stevenson State Park and Bothe State Park offer hiking trails. Adjacent to Bothe is the Bale Grist Mill State Park, where a restored 19th century water mill recalls a fascinating bit of history. The Rector Reservoir Wildlife Area takes in a little-known hiking trail in the middle of the valley.",
      'There are two reservoirs east of the valley: Lake Berryessa and Lake Hennessey. Berryessa is better for boating and fishing for bass and trout; Hennessey is smaller and quieter, with mostly bank-fishing for bass and catfish.',
    ],
  },
  {
    months: 'May / June',
    paragraphs: [
      'As summer nears, the grapevines have flowered and through self-pollination are then fertilized, revealing small, green berries. This transformation, known as "fruit set," gives the first indication of the crop to come. Warmer weather and clear skies also kick the music scene into full gear. The largest festival is BottleRock, with multiple stages featuring a variety of live music, plus cooking demonstrations and local food and wine purveyors. Look to the Napa Valley Jazz Getaway and concert series at Meritage Resort and the Oxbow RiverStage for more live music. (Year-round live music venues include the Uptown Theater, the JaM Cellars Ballroom, Jarvis Music Conservatory, The Fink and the Napa Valley Performing Arts Center.)',
      'June begins with excitement via Auction Napa Valley, the wine charity event created by Robert and Margrit Mondavi and other dedicated vintners in 1981. The (Friday) barrel auction brings the community out en masse, while the main auction (Saturday) is among the poshest events of the year.',
    ],
  },
  {
    months: 'July / August',
    paragraphs: [
      'Through summer, grapevines will show off a splendor of big green leaves hiding plump bunches of grapes that are nearing full size. Wine grape bunches are much smaller than those of table grapes, sometimes small enough to fit in your palm, even though a single bunch could have 250 berries.',
      "By late July, you'll notice veraison, when grapes stop growing and start to turn color—from green to purple hues for red wine grapes and to golden yellow for white wine grapes. This marks the final ripening stage—the countdown to harvest is on. There's also a dramatic diurnal shift—hot days are followed by cool or cold nights. A temperature swing of 50 degrees is common. If you're dining al fresco you might need a shawl or light sweater.",
      'Activity ramps up in both the vineyards and cellars. Leaves might be pulled to give grapes exposure to sun for ripening. If it’s a vigorous growing season, workers may be seen "dropping fruit" or "thinning" bunches to get better vine balance and improve grape quality. Cellar workers will be moving things around to make room for the new harvest, including the bottling of older vintages.',
      'The 4th of July brings fireworks, parades and family fun in various towns around the valley. Held in August, the Napa Town and Country Fair is a quintessential small town event, with livestock, arts and crafts, carnival rides and monster truck racing. There is also plenty of live music to enjoy, particularly in the towns of Napa and Calistoga, with concerts in local parks and Music in the Vineyards, a chamber music festival.',
      'To cool off, consider a stop at one of the many breweries and tap houses, including Fieldwork Napa, Armistice Brewery, Tannery Bend Beerworks, Trade Brewing, Napa Palisades Saloon, Napa Valley Brewing and Mad Fritz. Erosion Tap House in downtown St. Helena offers not only beer, but homemade ice cream.',
      'In addition, summer means farmers markets are bountiful. You might rub shoulders with winemakers and local chefs if you make an early morning stroll through the weekly rotation of Napa, St. Helena, Calistoga and Yountville markets.',
    ],
  },
  {
    months: 'September / October',
    paragraphs: [
      "Harvest gets rolling after Labor Day weekend. In the mornings, keep an eye out for trucks hauling grapes from overnight or early morning picks. Traffic will be tougher and, ironically, it's also the time of year most county road improvements occur (before the rainy season starts again). Harvest traffic, construction and extra tourists means allowing extra time to reach your destinations.",
      'There are plenty of harvest parties at wineries, with various events and dinners, grape blessings and crush parties; the Calistoga Harvest Party is among the largest.',
      'If you seek a round of golf, there are a handful of clubs to consider: Napa Valley Country Club, Vintners Golf Club, Eagle Vines Golf Club, Chardonnay Golf Club and the public Napa Golf Course at Kennedy Park.',
      "A gathering of some 75 artists in more than 40 locations, the seasonal Napa Open Studios draws art lovers in September. Among year-round galleries, check out Jessel, Aerena, Art Gallery Napa Valley, Caldwell Snyder, The Christopher Hill Gallery, Vonsaal Design, Meuse Gallery, Sofie Contemporary Arts, Yager Galerie and others. Gordon Huether is perhaps the most prolific artist in the area and his sculptures are on display in multiple venues. There's plenty of public art to take in as well, including the Rail Arts District and Yountville Art Walk, as well as the Napa Art Walk.",
    ],
  },
  {
    months: 'November / December',
    paragraphs: [
      'As the year winds down, vineyard leaves turn color in a feast for the eyes. The rains eventually return as well, offering a welcome excuse to cuddle up with some red wine.',
      'Calistoga, St. Helena, Yountville and Napa will be decorated in holiday lights and sponsor various events, parades, visits from Santa, ice rinks and more. The Calistoga Lighted Tractor Parade is a local favorite.',
      'For indoor activities, consider museums including the brand new The MAC (Museum of Arts & Culture), with locations in both Yountville and St. Helena. Most of the museums are small and quaint, including the Chuck Williams Culinary Arts Museum, the Goodman Library, which is home to the Napa County Historical Society, the Sharpsteen Museum and the Robert Louis Stevenson Museum. Not technically a museum, the castlelike Culinary Institute of America at Greystone is home to a collection of more than a thousand antique corkscrews. CIA at Copia offers cooking classes and kitchen boot camps. Napa Cigars and Napa Wine and Cigars cater to those who enjoy a quality smoke.',
      'If self-pampering is part of your year-end celebrations, check out the terrific spas located at the top-end resorts and hotels around the valley. Some of them are exclusive to guests, but others offer day passes to access spa services. The geothermal mineral pools and mud baths in Calistoga are a signature draw. Standalone spas include Greenhaus Day Spa and Napa Valley Massage & Wellness Spa. For a relaxing meditation, consider the sound baths at Studio Be Napa.',
    ],
  },
]
