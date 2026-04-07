'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { RegionMagazineData, FeaturedListing, SidebarListing, Adventure } from '@/data/region-structured.types';
import Nav from '@/components/ui/Nav';
import Footer from '@/components/ui/Footer';
import Newsletter from '@/components/ui/Newsletter';

/* ── Colors ─────────────────────────────────────────────────────── */
const WHITE = '#FFFFFF';
const LIGHT = '#F5F5F0';
const INK = '#0D0B09';
const GOLD = '#C4943A';
const MIST = '#999';

/* ══════════════════════════════════════════════════════════════════
   LISTING ROW — therealhotels "More from this series" style
   Thumbnail | Name + Location + Metadata | Excerpt | CTAs
   ══════════════════════════════════════════════════════════════════ */
function ListingRow({ listing, type }: {
  listing: FeaturedListing | SidebarListing;
  type: 'winery' | 'restaurant' | 'hotel';
}) {
  const isFeatured = 'writeup' in listing;
  const ctaLabel = type === 'winery' ? 'RESERVE' : type === 'restaurant' ? 'RESERVE' : 'BOOK NOW';
  const detailHref = listing.slug
    ? (type === 'winery' ? `/wineries/${listing.slug}` : type === 'restaurant' ? `/dining/${listing.slug}` : `/stay/${listing.slug}`)
    : undefined;

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '120px 1fr 1.2fr auto',
      gap: 20,
      alignItems: 'center',
      padding: '20px 0',
      borderBottom: '1px solid #E0E0E0',
    }}>
      {/* Thumbnail */}
      <div style={{ position: 'relative', width: 120, height: 80, overflow: 'hidden', flexShrink: 0 }}>
        {isFeatured ? (
          <Image
            src={(listing as FeaturedListing).image}
            alt={listing.name}
            fill
            style={{ objectFit: 'cover' }}
            sizes="120px"
          />
        ) : (
          <div style={{ width: '100%', height: '100%', background: '#E8E4DE' }} />
        )}
      </div>

      {/* Name + Location + Metadata */}
      <div style={{ minWidth: 0 }}>
        <p style={{
          fontFamily: 'var(--font-display)',
          fontSize: 20,
          fontStyle: 'italic',
          fontWeight: 400,
          color: INK,
          margin: '0 0 2px',
          lineHeight: 1.2,
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}>
          {listing.name}
        </p>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: 11,
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          color: MIST,
          margin: 0,
          lineHeight: 1.4,
        }}>
          {listing.address}
        </p>
        {listing.website && (
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: 10,
            color: MIST,
            margin: '2px 0 0',
          }}>
            {listing.website}
          </p>
        )}
      </div>

      {/* Excerpt */}
      <p style={{
        fontFamily: 'var(--font-body)',
        fontSize: 13,
        lineHeight: 1.6,
        color: '#666',
        margin: 0,
        overflow: 'hidden',
        display: '-webkit-box',
        WebkitLineClamp: 3,
        WebkitBoxOrient: 'vertical' as const,
      }}>
        {isFeatured ? (listing as FeaturedListing).writeup : ''}
      </p>

      {/* CTAs */}
      <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
        {detailHref && (
          <Link href={detailHref} style={{
            fontFamily: 'var(--font-body)',
            fontSize: 10,
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: WHITE,
            background: INK,
            padding: '10px 18px',
            textDecoration: 'none',
            whiteSpace: 'nowrap',
          }}>
            {ctaLabel}
          </Link>
        )}
        {detailHref && (
          <Link href={detailHref} style={{
            fontFamily: 'var(--font-body)',
            fontSize: 10,
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: INK,
            border: `1px solid ${INK}`,
            padding: '10px 18px',
            textDecoration: 'none',
            whiteSpace: 'nowrap',
          }}>
            Read More
          </Link>
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
        fontFamily: 'var(--font-body)',
        fontSize: 10,
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '0.15em',
        color: MIST,
        margin: '0 0 8px',
      }}>
        {title}
      </p>

      {visible.map((l) => (
        <ListingRow key={l.name} listing={l} type={type} />
      ))}

      {listings.length > 6 && !showAll && (
        <div style={{ textAlign: 'center', marginTop: 24 }}>
          <button
            onClick={() => setShowAll(true)}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 11,
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              color: INK,
              background: 'none',
              border: `1px solid ${INK}`,
              padding: '12px 32px',
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
   MAIN PAGE — therealhotels detail page layout
   ══════════════════════════════════════════════════════════════════ */
export default function RegionMagazinePage({ data }: { data: RegionMagazineData }) {
  const ledeParagraphs = data.lede.split('\n\n');

  // Combine all featured + also recommended for each section
  const allTasteListings: (FeaturedListing | SidebarListing)[] = [];
  if (data.taste.subRegions) {
    data.taste.subRegions.forEach(sr => {
      allTasteListings.push(...sr.featured, ...sr.alsoRecommended);
    });
  }
  allTasteListings.push(...data.taste.featured, ...data.taste.alsoRecommended);

  const allEatListings: (FeaturedListing | SidebarListing)[] = [
    ...data.eat.featured,
    ...data.eat.alsoRecommended,
    ...(data.eat.breakfastCoffee?.featured || []),
    ...(data.eat.breakfastCoffee?.alsoRecommended || []),
  ];

  const allStayListings: (FeaturedListing | SidebarListing)[] = data.stay
    ? [...data.stay.featured, ...data.stay.alsoRecommended]
    : [];

  return (
    <div style={{ background: WHITE }}>
      <style>{`
        @media (max-width: 768px) {
          .rh-hero-title { font-size: 40px !important; }
          .rh-pullquote { font-size: 24px !important; padding: 40px 20px !important; }
          .rh-body-grid { grid-template-columns: 1fr !important; }
          .rh-listing-row { grid-template-columns: 80px 1fr !important; }
          .rh-listing-excerpt, .rh-listing-ctas { display: none !important; }
          .rh-section { padding-left: 20px !important; padding-right: 20px !important; }
        }
      `}</style>

      <Nav />

      {/* ── 1. HERO — Full-bleed image ─────────────────────────── */}
      <section style={{ position: 'relative', height: '60vh', minHeight: 400, overflow: 'hidden' }}>
        <Image
          src={data.heroImage}
          alt={data.title}
          fill
          style={{ objectFit: 'cover' }}
          priority
          sizes="100vw"
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 50%)',
        }} />

        {/* Title at bottom of hero */}
        <div style={{
          position: 'absolute', bottom: 40, left: 0, right: 0,
          textAlign: 'center', padding: '0 24px',
        }}>
          <h1 className="rh-hero-title" style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(48px, 8vw, 96px)',
            fontStyle: 'italic',
            fontWeight: 300,
            color: WHITE,
            margin: 0,
            lineHeight: 1,
          }}>
            {data.title.charAt(0) + data.title.slice(1).toLowerCase()} — {data.subtitle}
          </h1>
        </div>
      </section>

      {/* ── 2. METADATA + CTAs ─────────────────────────────────── */}
      <section style={{
        textAlign: 'center',
        padding: '28px 24px 24px',
        borderBottom: '1px solid #E8E4DE',
      }}>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: 10,
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.15em',
          color: MIST,
          margin: '0 0 16px',
        }}>
          Wine Spectator&apos;s Guide to Napa Valley · By {data.author}
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 12 }}>
          <Link href="/map" style={{
            fontFamily: 'var(--font-body)', fontSize: 11, fontWeight: 600,
            textTransform: 'uppercase', letterSpacing: '0.1em',
            color: WHITE, background: INK, padding: '12px 28px',
            textDecoration: 'none',
          }}>
            Explore the Map
          </Link>
          <Link href="/regions" style={{
            fontFamily: 'var(--font-body)', fontSize: 11, fontWeight: 600,
            textTransform: 'uppercase', letterSpacing: '0.1em',
            color: INK, border: `1px solid ${INK}`, padding: '12px 28px',
            textDecoration: 'none',
          }}>
            All Regions
          </Link>
        </div>
      </section>

      {/* ── 3. PULL QUOTE — Large italic editorial intro ────────── */}
      <section className="rh-pullquote" style={{
        padding: '64px clamp(24px, 8vw, 160px)',
        maxWidth: 1000,
        margin: '0 auto',
      }}>
        <p style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(28px, 3.5vw, 40px)',
          fontStyle: 'italic',
          fontWeight: 300,
          color: INK,
          lineHeight: 1.45,
          margin: 0,
          textAlign: 'center',
        }}>
          {ledeParagraphs[0]}
        </p>
      </section>

      {/* ── 4. BODY — Text + Photos alternating ────────────────── */}
      <section className="rh-section" style={{
        padding: '0 clamp(24px, 8vw, 160px) 64px',
        maxWidth: 1100,
        margin: '0 auto',
      }}>
        {/* First body block: text left, image right */}
        {ledeParagraphs.length > 1 && (
          <div className="rh-body-grid" style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 40,
            marginBottom: 48,
            alignItems: 'start',
          }}>
            <div>
              {ledeParagraphs.slice(1).map((p, i) => (
                <p key={i} style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 15,
                  lineHeight: 1.8,
                  color: '#333',
                  margin: '0 0 20px',
                }}>
                  {p}
                </p>
              ))}
            </div>
            <div style={{ position: 'relative', width: '100%', aspectRatio: '4/5', overflow: 'hidden' }}>
              <Image
                src={data.taste.featured[0]?.image || data.heroImage}
                alt={data.title}
                fill
                style={{ objectFit: 'cover' }}
                sizes="50vw"
              />
            </div>
          </div>
        )}

        {/* Second body block: image left, text right */}
        {data.taste.intro && (
          <div className="rh-body-grid" style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 40,
            marginBottom: 48,
            alignItems: 'start',
          }}>
            <div style={{ position: 'relative', width: '100%', aspectRatio: '3/4', overflow: 'hidden' }}>
              <Image
                src={data.taste.subRegions?.[0]?.featured[0]?.image || data.heroImage}
                alt={data.title}
                fill
                style={{ objectFit: 'cover' }}
                sizes="50vw"
              />
            </div>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: 15,
              lineHeight: 1.8,
              color: '#333',
              margin: 0,
            }}>
              {data.taste.intro}
            </p>
          </div>
        )}

        {/* Tip callout */}
        {data.tip && (
          <div style={{
            padding: '20px 28px',
            borderLeft: `3px solid ${GOLD}`,
            background: 'rgba(196, 148, 58, 0.04)',
            marginBottom: 48,
            maxWidth: 600,
          }}>
            <p style={{
              fontFamily: 'var(--font-body)', fontSize: 13,
              lineHeight: 1.6, color: '#555', margin: 0, fontStyle: 'italic',
            }}>
              <strong style={{ color: GOLD, fontStyle: 'normal', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.12em' }}>Tip </strong>
              {data.tip}
            </p>
          </div>
        )}

        {/* CTAs */}
        <div style={{ display: 'flex', gap: 12, marginBottom: 48 }}>
          <Link href="/map" style={{
            fontFamily: 'var(--font-body)', fontSize: 11, fontWeight: 600,
            textTransform: 'uppercase', letterSpacing: '0.1em',
            color: WHITE, background: INK, padding: '14px 32px',
            textDecoration: 'none',
          }}>
            Explore the Map
          </Link>
          <Link href={`/regions`} style={{
            fontFamily: 'var(--font-body)', fontSize: 11, fontWeight: 600,
            textTransform: 'uppercase', letterSpacing: '0.1em',
            color: INK, border: `1px solid ${INK}`, padding: '14px 32px',
            textDecoration: 'none',
          }}>
            All Regions
          </Link>
        </div>
      </section>

      {/* ── 5. LISTINGS — Light background, therealhotels style ── */}
      <section style={{
        background: LIGHT,
        padding: '56px clamp(24px, 5vw, 80px)',
      }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          {/* WHERE TO TASTE */}
          <ListingSection
            title={`Where to Taste in ${data.title.charAt(0) + data.title.slice(1).toLowerCase()}`}
            listings={allTasteListings}
            type="winery"
          />

          {/* WHERE TO EAT */}
          {allEatListings.length > 0 && (
            <ListingSection
              title={`Where to Eat in ${data.title.charAt(0) + data.title.slice(1).toLowerCase()}`}
              listings={allEatListings}
              type="restaurant"
            />
          )}

          {/* WHERE TO STAY */}
          {allStayListings.length > 0 && (
            <ListingSection
              title={`Where to Stay in ${data.title.charAt(0) + data.title.slice(1).toLowerCase()}`}
              listings={allStayListings}
              type="hotel"
            />
          )}
        </div>
      </section>

      {/* ── 6. ADVENTURES — White background ───────────────────── */}
      {data.adventures.length > 0 && (
        <section className="rh-section" style={{
          padding: '64px clamp(24px, 8vw, 160px)',
          maxWidth: 1100,
          margin: '0 auto',
        }}>
          <p style={{
            fontFamily: 'var(--font-body)', fontSize: 10, fontWeight: 700,
            textTransform: 'uppercase', letterSpacing: '0.15em',
            color: MIST, margin: '0 0 8px', textAlign: 'center',
          }}>
            Choose Your Adventure
          </p>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(28px, 4vw, 48px)',
            fontStyle: 'italic', fontWeight: 300,
            color: INK, margin: '0 0 48px', textAlign: 'center',
          }}>
            {data.adventures.length === 1 ? 'One excursion' : `${data.adventures.length} excursions`} from {data.author}
          </h2>

          {data.adventures.map((a) => {
            const renderNarrative = (text: string) => {
              const parts = text.split(/\*\*(.*?)\*\*/g);
              return parts.map((part, i) =>
                i % 2 === 1 ? <strong key={i}>{part}</strong> : <span key={i}>{part}</span>
              );
            };

            return (
              <div key={a.number} className="rh-body-grid" style={{
                display: 'grid', gridTemplateColumns: '1fr 1fr',
                gap: 40, marginBottom: 56, alignItems: 'start',
              }}>
                <div style={{ position: 'relative', width: '100%', aspectRatio: '4/3', overflow: 'hidden' }}>
                  <Image src={a.image} alt={a.title} fill style={{ objectFit: 'cover' }} sizes="50vw" />
                </div>
                <div>
                  <p style={{
                    fontFamily: 'var(--font-body)', fontSize: 10, fontWeight: 700,
                    textTransform: 'uppercase', letterSpacing: '0.15em',
                    color: GOLD, margin: '0 0 6px',
                  }}>
                    Excursion {a.number}
                  </p>
                  <h3 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(24px, 3vw, 36px)',
                    fontStyle: 'italic', fontWeight: 300,
                    color: INK, margin: '0 0 16px', lineHeight: 1.15,
                  }}>
                    {a.title}
                  </h3>
                  <p style={{
                    fontFamily: 'var(--font-body)', fontSize: 14,
                    lineHeight: 1.75, color: '#444', margin: 0,
                  }}>
                    {renderNarrative(a.narrative)}
                  </p>
                </div>
              </div>
            );
          })}
        </section>
      )}

      {/* ── 7. Newsletter + Footer ─────────────────────────────── */}
      <Newsletter />
      <Footer />
    </div>
  );
}
