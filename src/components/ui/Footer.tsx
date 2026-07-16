'use client'

import type { LucideIcon } from 'lucide-react'
import styles from './Footer.module.css'
import {
  FooterFacebookIcon,
  FooterInstagramIcon,
  FooterPinterestIcon,
  FooterXIcon,
  FooterYoutubeIcon,
} from './FooterSocialLucide'

const external = {
  target: '_blank' as const,
  rel: 'noopener noreferrer' as const,
}

type FooterLink = { label: string; href: string }

type Column =
  | { title: string; links: FooterLink[] }
  | {
      title: string
      groups: { subheading: string; links: FooterLink[] }[]
    }

const columns: Column[] = [
  {
    title: 'WineSpectator.com',
    links: [
      { label: 'Become a Member', href: 'https://www.winespectator.com/subscribe' },
      { label: 'Member Benefits', href: 'https://www.winespectator.com/pages/member-benefits' },
      { label: 'Give a Gift Membership', href: 'https://giftcenter.winespectator.com/' },
      { label: 'Email Newsletters', href: 'http://newsletters.winespectator.com/' },
      { label: 'Find a Wine Shop', href: 'https://www.winespectator.com/retailers2' },
    ],
  },
  {
    title: 'Wine Spectator Magazine',
    links: [
      { label: 'Subscribe', href: 'https://www.winespectator.com/subscribe' },
      { label: 'Digital Subscription', href: 'https://www.winespectator.com/digitalmagsub' },
      { label: 'Gift Subscription', href: 'https://www.winespectator.com/maggiftsub' },
      { label: 'Buy Back Issues', href: 'https://www.winespectator.com/buybackissues' },
      { label: 'Issue Archives', href: 'https://www.winespectator.com/issues' },
      {
        label: 'Wine Spectator Products',
        href: 'https://sub.winespectator.com/pubs/M5/WNE/product_store.jsp?cds_page_id=254319&cds_mag_code=WNE&id=1632151105010&lsid=12631018250085101&vid=1',
      },
    ],
  },
  {
    title: 'Help',
    links: [
      { label: 'Manage Account', href: 'https://www.winespectator.com/manage-account' },
      { label: 'Contact Us', href: 'http://help.winespectator.com/support/home' },
      {
        label: 'Accessibility',
        href: 'https://help.winespectator.com/support/solutions/articles/234691-what-is-the-accessibility-policy-for-wine-spectator-',
      },
    ],
  },
  {
    title: 'Events',
    links: [
      { label: 'Wine Experience', href: 'http://www.nywineexperience.com/' },
      { label: 'Grand Tour', href: 'http://grandtour.winespectator.com/' },
      { label: 'M. Shanken Events Calendar', href: 'http://www.shankennewsdaily.com/index.php/events/' },
    ],
  },
  {
    title: 'About',
    groups: [
      {
        subheading: 'About Us',
        links: [
          { label: 'How We Taste', href: 'https://www.winespectator.com/articles/about-our-tastings' },
          { label: 'Job Opportunities', href: 'https://www.winespectator.com/pages/job-opportunities' },
          { label: 'Terms of Service', href: 'https://www.winespectator.com/pages/terms-of-service' },
          { label: 'Privacy Policy', href: 'https://www.winespectator.com/pages/privacy-policy' },
        ],
      },
      {
        subheading: 'Services',
        links: [
          { label: 'Apps', href: 'https://apps.winespectator.com/' },
          { label: 'Gift Center', href: 'http://giftcenter.winespectator.com/' },
        ],
      },
    ],
  },
  {
    title: 'Trade Only',
    links: [
      { label: 'Submit Wines', href: 'https://www.winespectator.com/articles/how-to-submit-wines' },
      { label: 'Advertise With Us / Media Kit', href: 'https://www.mshanken.com/winespectator/' },
      { label: 'Sell Wine Spectator / Join the Retailer Club', href: 'https://www.winespectator.com/retailerclub' },
      { label: 'Shanken Ratings Network', href: 'https://www.winespectator.com/pages/shanken-ratings-network' },
      { label: 'Trade News', href: 'https://www.winespectator.com/for-the-trade/trade-news' },
      { label: 'Impact Databank Reports', href: 'https://www.impactdatabank.com/' },
    ],
  },
]

const sisterPublications: { name: string; href: string; logoSrc: string }[] = [
  {
    name: 'Cigar Aficionado',
    href: 'https://www.cigaraficionado.com/',
    logoSrc: 'https://mshanken.imgix.net/wso/bolt/template-images/ca_logo.png',
  },
  {
    name: 'Whisky Advocate',
    href: 'http://whiskyadvocate.com/',
    logoSrc: 'https://mshanken.imgix.net/wso/bolt/template-images/wa_logo.png',
  },
  {
    name: 'Market Watch',
    href: 'http://marketwatchmag.com/',
    logoSrc: 'https://mshanken.imgix.net/wso/bolt/template-images/mw_logo.png',
  },
  {
    name: 'Shanken News Daily',
    href: 'https://shankennewsdaily.com/',
    logoSrc: 'https://mshanken.imgix.net/wso/bolt/template-images/shankennewsdaily-logo_1200x675_ko.png',
  },
  {
    name: 'Impact Newsletter',
    href: 'https://ImpactNewsletter.com',
    logoSrc: 'https://mshanken.imgix.net/wso/bolt/template-images/impactlogo_white.png',
  },
]

const socialLinks: { label: string; href: string; Icon: LucideIcon }[] = [
  { label: 'Facebook', href: 'https://www.facebook.com/WineSpectator/?rf=100968456611081', Icon: FooterFacebookIcon },
  { label: 'Instagram', href: 'https://www.instagram.com/wine_spectator/?hl=en', Icon: FooterInstagramIcon },
  { label: 'X', href: 'https://x.com/winespectator?lang=en', Icon: FooterXIcon },
  { label: 'YouTube', href: 'https://www.youtube.com/WineSpectatorVideo', Icon: FooterYoutubeIcon },
  { label: 'Pinterest', href: 'https://www.pinterest.com/winespectator/', Icon: FooterPinterestIcon },
]

function LinkList({ links }: { links: FooterLink[] }) {
  return (
    <ul className={styles.linkList}>
      {links.map((l) => (
        <li key={l.href + l.label}>
          <a href={l.href} className={styles.link} {...external}>
            {l.label}
          </a>
        </li>
      ))}
    </ul>
  )
}

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.grid}>
          {columns.map((col) => (
            <div key={col.title} className={styles.column}>
              <h2 className={styles.columnTitle}>{col.title}</h2>
              {'links' in col ? (
                <LinkList links={col.links} />
              ) : (
                <div className={styles.groupStack}>
                  {col.groups.map((g) => (
                    <div key={g.subheading} className={styles.group}>
                      <h3 className={styles.subheading}>{g.subheading}</h3>
                      <LinkList links={g.links} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <p className={styles.sisterLabel}>M. Shanken Publications</p>
        <div className={styles.sisterRow} aria-label="M. Shanken Publications">
          {sisterPublications.map((pub) => (
            <a key={pub.href} href={pub.href} className={styles.sisterLink} {...external}>
              <img src={pub.logoSrc} alt={pub.name} className={styles.sisterLogo} height={28} />
            </a>
          ))}
        </div>

        <div className={styles.socialBlock}>
          <h2 className={styles.followTitle}>Follow Us</h2>
          <div className={styles.socialIcons}>
            {socialLinks.map(({ href, label, Icon }) => (
              <a key={href} href={href} className={styles.socialIconLink} aria-label={label} {...external}>
                <Icon size={18} strokeWidth={1.65} aria-hidden />
              </a>
            ))}
          </div>
        </div>

        <p className={styles.photoCredits}>
          Photography by Ryan Dearth, Dawn Heumann, Meg Smith, Christina McNeill, Leigh-Ann
          Beverly/Bonafide Productions and Emma Kruch/Emma K Creative.
        </p>
        <p className={styles.copyright}>
          © Copyright {year} Wine Spectator. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
