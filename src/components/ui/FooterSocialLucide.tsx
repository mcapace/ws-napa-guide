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

export const FooterSpotifyIcon = createLucideIcon('FooterSpotify', [
  ['circle', { cx: '12', cy: '12', r: '10', key: 'sp1' }],
  ['path', { d: 'M7 9.2c3.4-1.1 7.2-.9 10 .9', key: 'sp2' }],
  ['path', { d: 'M7.5 12.4c2.8-.9 6-.7 8.4.8', key: 'sp3' }],
  ['path', { d: 'M8 15.5c2.2-.7 4.7-.5 6.6.7', key: 'sp4' }],
])

export const FooterXIcon = X
