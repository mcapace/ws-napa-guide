'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { RegionMagazineData, FeaturedListing, SidebarListing } from '@/data/region-structured.types';
import Nav from '@/components/ui/Nav';
import Footer from '@/components/ui/Footer';
import Newsletter from '@/components/ui/Newsletter';

/* ── Design tokens matching globals.css ─────────────────────────── */
const INK = '#0D0B09';
const CREAM = '#F7F3EC';
const GOLD = '#C4943A';
const MIST = '#9B9283';
const DUST = '#2A2520';
const LIGHT_BG = '#F5F3EE';

/* ══════════════════════════════════════════════════════════════════
   LISTING ROW — therealhotels "More from this series" style
   ══════════════════════════════════════════════════════════════════ */
function ListingRow({ listing, type }: {
  listing: FeaturedListing | SidebarListing;
  type: 'winery' | 'restaurant' | 'hotel';
}) {
  const isFeatured = 'writeup' in listing;
  const ctaLabel = type === 'winery' ? 'Reserve' : type === 'restaurant' ? 'Reserve' : 'Book Now';
  const detailHref = listing.slug
    ? (type === 'winery' ? `/wineries/${listing.slug}` : type === 'restaurant' ? `/dining/${listing.slug}` : `/stay/${listing.slug}`)
    : undefined;

  return (
    <div className="rh-listing-row" style={{
      display: 'grid',
      gridTemplateColumns: '120px 200px 1fr auto',
      gap: 24,
      alignItems: 'center',
      padding: '24px 0',
      borderBottom: '1px solid #DEDAD4',
    }}>
      {/* Thumbnail */}
      <div style={{ position: 'relative', width: 120, height: 80, overflow: 'hidden' }}>
        {isFeatured ? (
          <Image
            src={(listing as FeaturedListing).image}
            alt={listing.name}
            fill
            style={{ objectFit: 'cover' }}
            sizes="120px"
          />
        ) : (
          <div style={{ width: '100%', height: '100%', background: '#E0DCD6' }} />
        )}
      </div>

      {/* Name + Location */}
      <div>
        <p style={{
          fontFamily: 'var(--font-display)',
          fontSize: 18,
          fontStyle: 'italic',
          fontWeight: 400,
          color: INK,
          margin: '0 0 4px',
          lineHeight: 1.2,
        }}>
          {listing.name}
        </p>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: 10,
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
          color: '#999',
          margin: 0,
          lineHeight: 1.5,
        }}>
          {listing.address}
        </p>
      </div>

      {/* Excerpt */}
      <p className="rh-listing-excerpt" style={{
        fontFamily: 'var(--font-body)',
        fontSize: 13,
        lineHeight: 1.55,
        color: '#777',
        margin: 0,
        overflow: 'hidden',
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical' as const,
      }}>
        {isFeatured ? (listing as FeaturedListing).writeup : ''}
      </p>

      {/* CTAs */}
      <div className="rh-listing-ctas" style={{ display: 'flex', gap: 8 }}>
        {detailHref ? (
          <>
            <Link href={detailHref} style={{
              fontFamily: 'var(--font-body)', fontSize: 9, fontWeight: 600,
              textTransform: 'uppercase', letterSpacing: '0.1em',
              color: INK, background: CREAM, padding: '10px 16px',
              textDecoration: 'none', border: `1px solid ${INK}`,
            }}>
              {ctaLabel}
            </Link>
            <Link href={detailHref} style={{
              fontFamily: 'var(--font-body)', fontSize: 9, fontWeight: 600,
              textTransform: 'uppercase', letterSpacing: '0.1em',
              color: INK, background: 'transparent', padding: '10px 16px',
              textDecoration: 'none', border: '1px solid #CCC',
            }}>
              Read More
            </Link>
          </>
        ) : (
          <span style={{
            fontFamily: 'var(--font-body)', fontSize: 9, fontWeight: 600,
            textTransform: 'uppercase', letterSpacing: '0.1em',
            color: '#999', padding: '10px 16px',
            border: '1px solid #DDD',
          }}>
            Read More
          </span>
        )}
      </div>
    </div>
  );
}

/* ── Listing Section with "Show More" ───────────────────────────── */
function ListingSection({ title, listings, type }: {
  title: string;
  listings: (FeaturedListing | SidebarListing)[];
  type: 'winery' | 'restaurant' | 'hotel';
}) {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? listings : listings.slice(0, 6);
  if (!listings.length) return null;

  return (
    <div style={{ marginBottom: 48 }}>
      <p style={{
        fontFamily: 'var(--font-body)', fontSize: 10, fontWeight: 600,
        textTransform: 'uppercase', letterSpacing: '0.12em',
        color: '#999', margin: '0 0 4px',
      }}>
        ◆ {title}
      </p>

      {visible.map((l) => (
        <ListingRow key={l.name} listing={l} type={type} />
      ))}

      {listings.length > 6 && !showAll && (
        <div style={{ textAlign: 'center', marginTop: 28 }}>
          <button
            onClick={() => setShowAll(true)}
            style={{
              fontFamily: 'var(--font-body)', fontSize: 10, fontWeight: 600,
              textTransform: 'uppercase', letterSpacing: '0.1em',
              color: INK, background: 'none',
              border: `1px solid ${INK}`, padding: '14px 36px',
              cursor: 'pointer',
            }}
          >
            Show More
          </button>
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   MAIN PAGE
   ══════════════════════════════════════════════════════════════════ */
export default function RegionMagazinePage({ data }: { data: RegionMagazineData }) {
  const ledeParagraphs = data.lede.split('\n\n');

  // Combine all listings per section
  const allTaste: (FeaturedListing | SidebarListing)[] = [];
  data.taste.subRegions?.forEach(sr => allTaste.push(...sr.featured, ...sr.alsoRecommended));
  allTaste.push(...data.taste.featured, ...data.taste.alsoRecommended);

  const allEat: (FeaturedListing | SidebarListing)[] = [
    ...data.eat.featured, ...data.eat.alsoRecommended,
    ...(data.eat.breakfastCoffee?.featured || []),
    ...(data.eat.breakfastCoffee?.alsoRecommended || []),
  ];

  const allStay: (FeaturedListing | SidebarListing)[] = data.stay
    ? [...data.stay.featured, ...data.stay.alsoRecommended] : [];

  // Pick images for the body section
  const bodyImg1 = data.taste.subRegions?.[0]?.featured[0]?.image
    || data.taste.featured[0]?.image || data.heroImage;
  const bodyImg2 = data.eat.featured[0]?.image || data.heroImage;

  return (
    <div style={{ background: INK }}>
      <style>{`
        @media (max-width: 768px) {
          .rh-hero-title { font-size: 36px !important; }
          .rh-pullquote { font-size: 22px !important; padding: 32px 20px !important; }
          .rh-body-grid { grid-template-columns: 1fr !important; }
          .rh-listing-row { grid-template-columns: 80px 1fr !important; gap: 12px !important; }
          .rh-listing-excerpt { display: none !important; }
          .rh-listing-ctas { display: none !important; }
          .rh-section-pad { padding-left: 20px !important; padding-right: 20px !important; }
        }
      `}</style>

      <Nav />

      {/* ── 1. HERO ────────────────────────────────────────────── */}
      <section style={{
        position: 'relative', height: '60vh', minHeight: 400,
        overflow: 'hidden',
      }}>
        <Image
          src={data.heroImage} alt={data.title}
          fill style={{ objectFit: 'cover' }}
          priority sizes="100vw"
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 50%)',
        }} />
        <div style={{
          position: 'absolute', bottom: 48, left: 0, right: 0,
          textAlign: 'center', padding: '0 24px',
        }}>
          <h1 className="rh-hero-title" style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(44px, 7vw, 88px)',
            fontStyle: 'italic',
            fontWeight: 300,
            color: CREAM,
            margin: 0,
            lineHeight: 1.05,
          }}>
            {data.title.charAt(0)}{data.title.slice(1).toLowerCase()}
          </h1>
        </div>
      </section>

      {/* ── 2. METADATA + CTAs ─────────────────────────────────── */}
      <section style={{
        textAlign: 'center', padding: '28px 24px',
        background: INK,
        borderBottom: `1px solid ${DUST}`,
      }}>
        <p style={{
          fontFamily: 'var(--font-body)', fontSize: 10, fontWeight: 500,
          textTransform: 'uppercase', letterSpacing: '0.12em',
          color: MIST, margin: '0 0 6px',
        }}>
          Wine Spectator · Napa Valley Guide
        </p>
        <p style={{
          fontFamily: 'var(--font-body)', fontSize: 10,
          textTransform: 'uppercase', letterSpacing: '0.08em',
          color: MIST, margin: '0 0 18px',
        }}>
          {data.subtitle} · By {data.author}
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 10 }}>
          <Link href="/map" style={{
            fontFamily: 'var(--font-body)', fontSize: 10, fontWeight: 600,
            textTransform: 'uppercase', letterSpacing: '0.1em',
            color: INK, background: CREAM, padding: '12px 24px',
            textDecoration: 'none',
          }}>
            Explore the Map
          </Link>
          <Link href="/regions" style={{
            fontFamily: 'var(--font-body)', fontSize: 10, fontWeight: 600,
            textTransform: 'uppercase', letterSpacing: '0.1em',
            color: CREAM, border: `1px solid ${MIST}`, padding: '12px 24px',
            textDecoration: 'none',
          }}>
            All Regions
          </Link>
        </div>
      </section>

      {/* ── 3. PULL QUOTE ──────────────────────────────────────── */}
      <section className="rh-pullquote rh-section-pad" style={{
        padding: '72px clamp(24px, 8vw, 140px)',
        background: CREAM,
      }}>
        <p style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(26px, 3.2vw, 38px)',
          fontStyle: 'italic',
          fontWeight: 300,
          color: INK,
          lineHeight: 1.5,
          margin: 0,
          textAlign: 'left',
          maxWidth: 900,
          marginLeft: 'auto',
          marginRight: 'auto',
        }}>
          {ledeParagraphs[0]}
        </p>
      </section>

      {/* ── 4. BODY — text + photos (cream bg) ─────────────────── */}
      <section className="rh-section-pad" style={{
        padding: '0 clamp(24px, 8vw, 140px) 64px',
        background: CREAM,
        maxWidth: 1100,
        marginLeft: 'auto',
        marginRight: 'auto',
      }}>
        {/* Text left, photo right */}
        {ledeParagraphs.length > 1 && (
          <div className="rh-body-grid" style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr',
            gap: 40, marginBottom: 48, alignItems: 'start',
          }}>
            <div>
              {ledeParagraphs.slice(1).map((p, i) => (
                <p key={i} style={{
                  fontFamily: 'var(--font-body)', fontSize: 15,
                  lineHeight: 1.8, color: '#444', margin: '0 0 20px',
                }}>
                  {p}
                </p>
              ))}
              {data.tip && (
                <div style={{
                  padding: '16px 20px', borderLeft: `3px solid ${GOLD}`,
                  background: 'rgba(196,148,58,0.05)', marginTop: 16,
                }}>
                  <p style={{
                    fontFamily: 'var(--font-body)', fontSize: 13,
                    lineHeight: 1.6, color: '#666', margin: 0, fontStyle: 'italic',
                  }}>
                    <strong style={{ color: GOLD, fontStyle: 'normal', fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.12em' }}>Tip </strong>
                    {data.tip}
                  </p>
                </div>
              )}
            </div>
            <div style={{
              position: 'relative', width: '100%',
              aspectRatio: '4/5', overflow: 'hidden',
            }}>
              <Image src={bodyImg1} alt="" fill style={{ objectFit: 'cover' }} sizes="50vw" />
            </div>
          </div>
        )}

        {/* Photo left, text right */}
        {data.taste.intro && (
          <div className="rh-body-grid" style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr',
            gap: 40, marginBottom: 48, alignItems: 'start',
          }}>
            <div style={{
              position: 'relative', width: '100%',
              aspectRatio: '3/4', overflow: 'hidden',
            }}>
              <Image src={bodyImg2} alt="" fill style={{ objectFit: 'cover' }} sizes="50vw" />
            </div>
            <p style={{
              fontFamily: 'var(--font-body)', fontSize: 15,
              lineHeight: 1.8, color: '#444', margin: 0,
            }}>
              {data.taste.intro}
            </p>
          </div>
        )}

        {/* CTAs */}
        <div style={{ display: 'flex', gap: 10 }}>
          <Link href="/map" style={{
            fontFamily: 'var(--font-body)', fontSize: 10, fontWeight: 600,
            textTransform: 'uppercase', letterSpacing: '0.1em',
            color: CREAM, background: INK, padding: '14px 28px',
            textDecoration: 'none',
          }}>
            Explore the Map
          </Link>
          <Link href="/regions" style={{
            fontFamily: 'var(--font-body)', fontSize: 10, fontWeight: 600,
            textTransform: 'uppercase', letterSpacing: '0.1em',
            color: INK, border: `1px solid ${INK}`, padding: '14px 28px',
            textDecoration: 'none',
          }}>
            Explore Another Region
          </Link>
        </div>
      </section>

      {/* ── 5. LISTINGS — Light background ─────────────────────── */}
      <section className="rh-section-pad" style={{
        background: LIGHT_BG,
        padding: '56px clamp(24px, 5vw, 80px)',
      }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <ListingSection
            title={`Where to Taste in ${data.title.charAt(0)}${data.title.slice(1).toLowerCase()}`}
            listings={allTaste} type="winery"
          />
          {allEat.length > 0 && (
            <ListingSection
              title={`Where to Eat in ${data.title.charAt(0)}${data.title.slice(1).toLowerCase()}`}
              listings={allEat} type="restaurant"
            />
          )}
          {allStay.length > 0 && (
            <ListingSection
              title={`Where to Stay in ${data.title.charAt(0)}${data.title.slice(1).toLowerCase()}`}
              listings={allStay} type="hotel"
            />
          )}
        </div>
      </section>

      {/* ── 6. ADVENTURES ──────────────────────────────────────── */}
      {data.adventures.length > 0 && (
        <section className="rh-section-pad" style={{
          padding: '72px clamp(24px, 8vw, 140px)',
          background: CREAM,
        }}>
          <div style={{ maxWidth: 1000, margin: '0 auto' }}>
            <p style={{
              fontFamily: 'var(--font-body)', fontSize: 10, fontWeight: 600,
              textTransform: 'uppercase', letterSpacing: '0.12em',
              color: '#999', margin: '0 0 8px', textAlign: 'center',
            }}>
              Choose Your Adventure
            </p>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(26px, 3.5vw, 42px)',
              fontStyle: 'italic', fontWeight: 300,
              color: INK, margin: '0 0 56px', textAlign: 'center',
            }}>
              {data.adventures.length === 1 ? 'One excursion' : `${data.adventures.length} excursions`} from {data.author}
            </h2>

            {data.adventures.map((a) => {
              const parts = a.narrative.split(/\*\*(.*?)\*\*/g);
              const rendered = parts.map((part, i) =>
                i % 2 === 1 ? <strong key={i}>{part}</strong> : <span key={i}>{part}</span>
              );

              return (
                <div key={a.number} className="rh-body-grid" style={{
                  display: 'grid', gridTemplateColumns: '1fr 1fr',
                  gap: 40, marginBottom: 56, alignItems: 'start',
                }}>
                  <div style={{
                    position: 'relative', width: '100%',
                    aspectRatio: '4/3', overflow: 'hidden',
                  }}>
                    <Image src={a.image} alt={a.title} fill style={{ objectFit: 'cover' }} sizes="50vw" />
                  </div>
                  <div>
                    <p style={{
                      fontFamily: 'var(--font-body)', fontSize: 10, fontWeight: 600,
                      textTransform: 'uppercase', letterSpacing: '0.12em',
                      color: GOLD, margin: '0 0 6px',
                    }}>
                      Excursion {a.number}
                    </p>
                    <h3 style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'clamp(22px, 2.5vw, 32px)',
                      fontStyle: 'italic', fontWeight: 300,
                      color: INK, margin: '0 0 16px', lineHeight: 1.2,
                    }}>
                      {a.title}
                    </h3>
                    <p style={{
                      fontFamily: 'var(--font-body)', fontSize: 14,
                      lineHeight: 1.75, color: '#555', margin: 0,
                    }}>
                      {rendered}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* ── 7. Newsletter + Footer ─────────────────────────────── */}
      <Newsletter />
      <Footer />
    </div>
  );
}
