'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { RegionMagazineData, FeaturedListing, SidebarListing, Adventure, SpecialSection } from '@/data/region-structured.types';
import Nav from '@/components/ui/Nav';
import Footer from '@/components/ui/Footer';
import Newsletter from '@/components/ui/Newsletter';

/* ── Colors ─────────────────────────────────────────────────────── */
const CREAM = '#F7F3EC';
const INK = '#0D0B09';
const GOLD = '#C4943A';
const MIST = '#A89F91';

/* ── Drop Cap Paragraph ─────────────────────────────────────────── */
function DropCap({ text }: { text: string }) {
  const first = text.charAt(0);
  const rest = text.slice(1);
  return (
    <p style={{ margin: '0 0 20px' }}>
      <span style={{
        fontFamily: 'var(--font-display)',
        fontSize: 64,
        fontWeight: 400,
        fontStyle: 'italic',
        float: 'left',
        lineHeight: 0.78,
        marginRight: 6,
        marginTop: 4,
        color: INK,
      }}>
        {first}
      </span>
      {rest}
    </p>
  );
}

/* ── Featured Listing (text wraps around photo) ─────────────────── */
function Featured({ listing, photoSide }: { listing: FeaturedListing; photoSide: 'left' | 'right' }) {
  return (
    <div style={{ marginBottom: 40, overflow: 'hidden' }}>
      {/* Photo floats to one side, text wraps around it */}
      <div className="mag-float" style={{
        float: photoSide,
        width: '48%',
        margin: photoSide === 'left' ? '0 24px 16px 0' : '0 0 16px 24px',
      }}>
        <div style={{ position: 'relative', width: '100%', aspectRatio: '4/3', overflow: 'hidden' }}>
          <Image
            src={listing.image}
            alt={listing.name}
            fill
            style={{ objectFit: 'cover' }}
            sizes="(max-width: 768px) 100vw, 45vw"
          />
          {/* Caption label at bottom */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0,
            background: 'rgba(0,0,0,0.6)',
            padding: '4px 12px',
          }}>
            <span style={{
              fontFamily: 'var(--font-body)', fontSize: 11,
              color: '#fff', fontWeight: 500,
            }}>
              {listing.name}
            </span>
          </div>
        </div>
      </div>

      {/* Name + address */}
      <h3 style={{
        fontFamily: 'var(--font-body)',
        fontSize: 18,
        fontWeight: 700,
        color: INK,
        margin: '0 0 2px',
        lineHeight: 1.3,
      }}>
        {listing.name}
      </h3>
      <p style={{
        fontFamily: 'var(--font-body)',
        fontSize: 12,
        fontStyle: 'italic',
        color: MIST,
        margin: '0 0 10px',
      }}>
        {listing.address}
        {listing.website && <> | {listing.website}</>}
      </p>

      {/* Editorial writeup — wraps around the floated photo */}
      <p style={{
        fontFamily: 'var(--font-body)',
        fontSize: 14,
        lineHeight: 1.7,
        color: '#333',
        margin: 0,
      }}>
        {listing.writeup}
      </p>

      <div style={{ clear: 'both' }} />
    </div>
  );
}

/* ── Full-width Featured (photo spans full width, text below) ───── */
function FeaturedFullWidth({ listing }: { listing: FeaturedListing }) {
  return (
    <div style={{ marginBottom: 40 }}>
      {/* Name + address */}
      <h3 style={{
        fontFamily: 'var(--font-body)',
        fontSize: 18,
        fontWeight: 700,
        color: INK,
        margin: '0 0 2px',
      }}>
        {listing.name}
      </h3>
      <p style={{
        fontFamily: 'var(--font-body)',
        fontSize: 12,
        fontStyle: 'italic',
        color: MIST,
        margin: '0 0 12px',
      }}>
        {listing.address}
        {listing.website && <> | {listing.website}</>}
      </p>

      {/* Full-width editorial text, 2-column */}
      <div className="mag-cols" style={{
        fontFamily: 'var(--font-body)',
        fontSize: 14,
        lineHeight: 1.7,
        color: '#333',
        columnCount: 2,
        columnGap: 32,
        marginBottom: 20,
      }}>
        <p style={{ margin: 0 }}>{listing.writeup}</p>
      </div>

      {/* Full-width photo */}
      <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', overflow: 'hidden' }}>
        <Image
          src={listing.image}
          alt={listing.name}
          fill
          style={{ objectFit: 'cover' }}
          sizes="100vw"
        />
        <div style={{
          position: 'absolute', bottom: 0, left: 0,
          background: 'rgba(0,0,0,0.6)',
          padding: '4px 12px',
        }}>
          <span style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: '#fff', fontWeight: 500 }}>
            {listing.name}
          </span>
        </div>
      </div>
    </div>
  );
}

/* ── Also Recommended Grid (multi-column at bottom of section) ── */
function AlsoRecommendedGrid({ listings }: { listings: SidebarListing[] }) {
  if (!listings.length) return null;
  return (
    <div style={{ marginTop: 32, clear: 'both' }}>
      <p style={{
        fontFamily: 'var(--font-body)',
        fontSize: 11,
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: '0.12em',
        color: MIST,
        margin: '0 0 16px',
      }}>
        Also Recommended
      </p>
      <div className="mag-grid" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: '12px 32px',
      }}>
        {listings.map((l) => (
          <div key={l.name}>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: 14,
              fontWeight: 700,
              color: INK,
              margin: '0 0 1px',
              lineHeight: 1.3,
            }}>
              {l.name}
            </p>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: 11,
              fontStyle: 'italic',
              color: MIST,
              margin: '0 0 2px',
            }}>
              {l.address}
            </p>
            {l.website && (
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: 11,
                fontStyle: 'italic',
                color: GOLD,
                margin: 0,
              }}>
                {l.website}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Section Header (bold caps, centered, like the PDF) ─────────── */
function SectionTitle({ title }: { title: string }) {
  return (
    <h2 style={{
      fontFamily: 'var(--font-body)',
      fontSize: 'clamp(28px, 4vw, 42px)',
      fontWeight: 900,
      textTransform: 'uppercase',
      letterSpacing: '0.06em',
      color: INK,
      margin: '0 0 28px',
      textAlign: 'center',
    }}>
      {title}
    </h2>
  );
}

/* ── Sub-Region Header (light weight, like the PDF) ─────────────── */
function SubRegionTitle({ name }: { name: string }) {
  return (
    <h3 style={{
      fontFamily: 'var(--font-display)',
      fontSize: 'clamp(28px, 4vw, 44px)',
      fontWeight: 300,
      color: INK,
      margin: '48px 0 28px',
      textAlign: 'center',
    }}>
      {name}
    </h3>
  );
}

/* ── Adventure Section ──────────────────────────────────────────── */
function AdventureSection({ adventure }: { adventure: Adventure }) {
  const renderNarrative = (text: string) => {
    const parts = text.split(/\*\*(.*?)\*\*/g);
    return parts.map((part, i) =>
      i % 2 === 1 ? <strong key={i}>{part}</strong> : <span key={i}>{part}</span>
    );
  };

  return (
    <div style={{ marginBottom: 56 }}>
      {/* Full-width photo */}
      <div style={{
        position: 'relative', width: '100%',
        aspectRatio: '21/9', overflow: 'hidden',
        marginBottom: 24,
      }}>
        <Image
          src={adventure.image}
          alt={adventure.title}
          fill
          style={{ objectFit: 'cover' }}
          sizes="100vw"
        />
      </div>

      <h3 style={{
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(24px, 3.5vw, 38px)',
        fontWeight: 300,
        color: INK,
        margin: '0 0 20px',
      }}>
        {adventure.number}: {adventure.title}
      </h3>

      <div className="mag-cols" style={{
        fontFamily: 'var(--font-body)',
        fontSize: 14,
        lineHeight: 1.75,
        color: '#333',
        columnCount: 2,
        columnGap: 32,
      }}>
        <DropCap text={adventure.narrative.replace(/\*\*/g, '')} />
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   MAIN PAGE
   ══════════════════════════════════════════════════════════════════ */
export default function RegionMagazinePage({ data }: { data: RegionMagazineData }) {
  const ledeParagraphs = data.lede.split('\n\n');

  return (
    <div style={{ background: CREAM, color: INK }}>
      <style>{`
        @media (max-width: 768px) {
          .mag-cols { column-count: 1 !important; }
          .mag-float { float: none !important; width: 100% !important; margin: 0 0 16px 0 !important; }
          .mag-section { padding-left: 20px !important; padding-right: 20px !important; }
          .mag-title-inline { display: block !important; }
          .mag-grid { grid-template-columns: 1fr !important; }
          .mag-adventure-img { aspect-ratio: 16/9 !important; }
        }
      `}</style>
      <Nav />

      {/* ── Hero (full-bleed, ~60% of viewport) ────────────────── */}
      <section style={{ position: 'relative', height: '65vh', overflow: 'hidden' }}>
        <Image
          src={data.heroImage}
          alt={data.title}
          fill
          style={{ objectFit: 'cover' }}
          priority
          sizes="100vw"
        />
      </section>

      {/* ── Title Block ─────────────────────────────────────────── */}
      <section style={{
        padding: '48px clamp(24px, 5vw, 120px) 0',
        textAlign: 'center',
      }}>
        <h1 style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'clamp(32px, 5vw, 52px)',
          fontWeight: 900,
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          color: INK,
          margin: 0,
          display: 'inline',
        }}>
          {data.title}
        </h1>
        {' '}
        <span style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(28px, 4.5vw, 48px)',
          fontStyle: 'italic',
          fontWeight: 300,
          color: INK,
        }}>
          {data.subtitle}
        </span>

        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: 13,
          fontWeight: 500,
          textTransform: 'uppercase',
          letterSpacing: '0.15em',
          color: MIST,
          margin: '16px 0 0',
        }}>
          By {data.author}
        </p>
      </section>

      {/* ── Lede (2-column with drop cap) ───────────────────────── */}
      <section style={{
        padding: '36px clamp(24px, 5vw, 120px) 56px',
        maxWidth: 960,
        margin: '0 auto',
      }}>
        <div className="mag-cols" style={{
          fontFamily: 'var(--font-body)',
          fontSize: 15,
          lineHeight: 1.75,
          color: '#333',
          columnCount: 2,
          columnGap: 36,
          columnRule: '1px solid rgba(0,0,0,0.08)',
        }}>
          {ledeParagraphs.map((p, i) =>
            i === 0 ? <DropCap key={i} text={p} /> : <p key={i} style={{ margin: '0 0 20px' }}>{p}</p>
          )}
        </div>

        {data.tip && (
          <div style={{
            marginTop: 32,
            padding: '16px 24px',
            borderLeft: `3px solid ${GOLD}`,
            background: 'rgba(196, 148, 58, 0.04)',
          }}>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: 13,
              lineHeight: 1.6,
              color: '#555',
              margin: 0,
              fontStyle: 'italic',
            }}>
              <strong style={{ color: GOLD, fontStyle: 'normal', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.15em' }}>Tip </strong>
              {data.tip}
            </p>
          </div>
        )}
      </section>

      {/* ── WHERE TO TASTE ──────────────────────────────────────── */}
      <section style={{
        padding: '56px clamp(24px, 5vw, 120px)',
        borderTop: '1px solid rgba(0,0,0,0.1)',
      }}>
        <SectionTitle title="Where to Taste" />

        {/* Section intro with drop cap */}
        {data.taste.intro && (
          <div className="mag-cols" style={{
            fontFamily: 'var(--font-body)',
            fontSize: 15,
            lineHeight: 1.75,
            color: '#333',
            columnCount: 2,
            columnGap: 36,
            maxWidth: 960,
            margin: '0 auto 40px',
          }}>
            <DropCap text={data.taste.intro} />
          </div>
        )}

        {/* Sub-regions */}
        {data.taste.subRegions?.map((sr) => (
          <div key={sr.name} style={{ maxWidth: 960, margin: '0 auto', marginBottom: 56 }}>
            <SubRegionTitle name={sr.name} />
            {sr.intro && (
              <p style={{
                fontFamily: 'var(--font-body)', fontSize: 14, lineHeight: 1.7,
                color: '#555', textAlign: 'center', maxWidth: 700, margin: '0 auto 32px',
              }}>
                {sr.intro}
              </p>
            )}

            {sr.featured.map((f, i) => {
              // Alternate between wrap-around and full-width layouts
              if (sr.featured.length > 1 && i === sr.featured.length - 1) {
                return <FeaturedFullWidth key={f.name} listing={f} />;
              }
              return <Featured key={f.name} listing={f} photoSide={i % 2 === 0 ? 'right' : 'left'} />;
            })}

            <AlsoRecommendedGrid listings={sr.alsoRecommended} />
          </div>
        ))}

        {/* Top-level featured (non-sub-region) */}
        {data.taste.featured.length > 0 && (
          <div style={{ maxWidth: 960, margin: '0 auto' }}>
            {data.taste.featured.map((f, i) => (
              <Featured key={f.name} listing={f} photoSide={i % 2 === 0 ? 'right' : 'left'} />
            ))}
            <AlsoRecommendedGrid listings={data.taste.alsoRecommended} />
          </div>
        )}
      </section>

      {/* ── WHERE TO EAT ────────────────────────────────────────── */}
      <section style={{
        padding: '56px clamp(24px, 5vw, 120px)',
        borderTop: '1px solid rgba(0,0,0,0.1)',
      }}>
        <SectionTitle title="Where to Eat" />

        {data.eat.intro && (
          <div className="mag-cols" style={{
            fontFamily: 'var(--font-body)', fontSize: 15, lineHeight: 1.75,
            color: '#333', columnCount: 2, columnGap: 36,
            maxWidth: 960, margin: '0 auto 40px',
          }}>
            <DropCap text={data.eat.intro} />
          </div>
        )}

        <div style={{ maxWidth: 960, margin: '0 auto' }}>
          {data.eat.featured.map((f, i) => (
            <Featured key={f.name} listing={f} photoSide={i % 2 === 0 ? 'left' : 'right'} />
          ))}
          <AlsoRecommendedGrid listings={data.eat.alsoRecommended} />
        </div>

        {data.eat.breakfastCoffee && (
          <div style={{ maxWidth: 960, margin: '40px auto 0', paddingTop: 32, borderTop: '1px solid rgba(0,0,0,0.08)' }}>
            <h3 style={{
              fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 700,
              textTransform: 'uppercase', letterSpacing: '0.12em', color: INK,
              margin: '0 0 28px', textAlign: 'center',
            }}>
              Breakfast / Coffee / Sandwiches / Snacks
            </h3>
            {data.eat.breakfastCoffee.featured.map((f, i) => (
              <Featured key={f.name} listing={f} photoSide={i % 2 === 0 ? 'right' : 'left'} />
            ))}
            <AlsoRecommendedGrid listings={data.eat.breakfastCoffee.alsoRecommended} />
          </div>
        )}
      </section>

      {/* ── WHERE TO STAY ───────────────────────────────────────── */}
      {data.stay && (
        <section style={{
          padding: '56px clamp(24px, 5vw, 120px)',
          borderTop: '1px solid rgba(0,0,0,0.1)',
        }}>
          <SectionTitle title={data.slug === 'calistoga' ? 'Where to Stay and Soak' : 'Where to Stay'} />

          {data.stay.intro && (
            <div className="mag-cols" style={{
              fontFamily: 'var(--font-body)', fontSize: 15, lineHeight: 1.75,
              color: '#333', columnCount: 2, columnGap: 36,
              maxWidth: 960, margin: '0 auto 40px',
            }}>
              <DropCap text={data.stay.intro} />
            </div>
          )}

          <div style={{ maxWidth: 960, margin: '0 auto' }}>
            {data.stay.featured.map((f, i) => (
              <Featured key={f.name} listing={f} photoSide={i % 2 === 0 ? 'left' : 'right'} />
            ))}
            <AlsoRecommendedGrid listings={data.stay.alsoRecommended} />
          </div>
        </section>
      )}

      {/* ── Special Sections ────────────────────────────────────── */}
      {data.specialSections?.map((s) => (
        <section key={s.title} style={{
          padding: '56px clamp(24px, 5vw, 120px)',
          borderTop: '1px solid rgba(0,0,0,0.1)',
        }}>
          {/* Title: BOLD CAPS + italic subtitle style */}
          <h2 style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(24px, 3.5vw, 36px)',
            fontWeight: 900,
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            color: INK,
            margin: '0 0 4px',
            textAlign: 'center',
            display: 'inline-block',
            width: '100%',
          }}>
            {data.title}{' '}
            <span style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 300,
              fontStyle: 'italic',
              textTransform: 'none',
              letterSpacing: 0,
            }}>
              {s.title}
            </span>
          </h2>

          <div style={{ maxWidth: 960, margin: '32px auto 0' }}>
            {s.intro && (
              <div className="mag-cols" style={{
                fontFamily: 'var(--font-body)', fontSize: 14, lineHeight: 1.75,
                color: '#333', columnCount: 2, columnGap: 32, marginBottom: 32,
              }}>
                <DropCap text={s.intro} />
              </div>
            )}

            {s.featured?.map((f, i) => (
              <Featured key={f.name} listing={f} photoSide={i % 2 === 0 ? 'right' : 'left'} />
            ))}
            {s.alsoRecommended && <AlsoRecommendedGrid listings={s.alsoRecommended} />}
          </div>
        </section>
      ))}

      {/* ── ADVENTURES ──────────────────────────────────────────── */}
      {data.adventures.length > 0 && (
        <section style={{
          padding: '56px clamp(24px, 5vw, 120px)',
          borderTop: '1px solid rgba(0,0,0,0.1)',
        }}>
          <h2 style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(24px, 3.5vw, 36px)',
            fontWeight: 900,
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            color: INK,
            margin: 0,
            textAlign: 'center',
          }}>
            {data.title} Choose Your Adventure
          </h2>
          <p style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(18px, 2.5vw, 28px)',
            fontStyle: 'italic',
            fontWeight: 300,
            color: '#555',
            margin: '8px 0 48px',
            textAlign: 'center',
          }}>
            {data.adventures.length === 1 ? 'One excursion' : `${data.adventures.length === 2 ? 'Two' : 'Three'} excursions`} from {data.author}
          </p>

          <div style={{ maxWidth: 960, margin: '0 auto' }}>
            {data.adventures.map((a) => (
              <AdventureSection key={a.number} adventure={a} />
            ))}
          </div>
        </section>
      )}

      {/* ── Newsletter + Footer ─────────────────────────────────── */}
      <Newsletter />
      <Footer />
    </div>
  );
}
