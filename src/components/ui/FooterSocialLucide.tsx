import { createLucideIcon, X } from 'lucide-react'

/** Brand shapes built with Lucide’s `createLucideIcon` (brand glyphs are not shipped in lucide-react 1.x). */
export const FooterFacebookIcon = createLucideIcon('FooterFacebook', [
  [
    'path',
    {
      d: 'M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z',
      key: 'fb',
      fill: 'currentColor',
      stroke: 'none',
    },
  ],
])

export const FooterInstagramIcon = createLucideIcon('FooterInstagram', [
  ['rect', { width: '20', height: '20', x: '2', y: '2', rx: '5', ry: '5', key: 'ig1' }],
  ['path', { d: 'M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z', key: 'ig2' }],
  ['line', { x1: '17.5', x2: '17.51', y1: '6.5', y2: '6.5', key: 'ig3' }],
])

export const FooterYoutubeIcon = createLucideIcon('FooterYoutube', [
  ['rect', { x: '2', y: '4', width: '20', height: '16', rx: '2', key: 'yt1' }],
  ['path', { d: 'M10 9l6 3.5L10 16V9z', key: 'yt2' }],
])

export const FooterPinterestIcon = createLucideIcon('FooterPinterest', [
  [
    'path',
    {
      d: 'M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2 .04-2.86.219-.937 1.219-5.917 1.219-5.917s-.31-.62-.31-1.537c0-1.439.834-2.515 1.873-2.515.883 0 1.311.662 1.311 1.456 0 .887-.564 2.212-.854 3.441-.243 1.029.517 1.868 1.529 1.868 1.835 0 3.247-1.933 3.247-4.724 0-2.471-1.778-4.204-4.315-4.204-2.94 0-4.669 2.204-4.669 4.478 0 .887.341 1.841.767 2.357.084.099.096.186.071.287-.078.322-.252 1.022-.285 1.165-.045.186-.151.225-.347.135-1.295-.603-2.103-2.495-2.103-4.017 0-3.274 2.381-6.281 6.871-6.281 3.608 0 6.413 2.573 6.413 6.013 0 3.583-2.259 6.471-5.396 6.471-1.054 0-2.045-.548-2.384-1.194l-.648 2.473c-.234.899-.868 2.023-1.295 2.712.975.301 2.009.464 3.075.464 6.624 0 11.99-5.367 11.99-11.987C23.97 5.39 18.592.026 11.969.026z',
      key: 'pi',
      fill: 'currentColor',
      stroke: 'none',
    },
  ],
])

export const FooterXIcon = X
