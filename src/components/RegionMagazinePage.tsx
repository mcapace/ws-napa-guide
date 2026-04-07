'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { RegionMagazineData, FeaturedListing, SidebarListing, SubRegion, Adventure, SpecialSection } from '@/data/region-structured.types';
import Nav from '@/components/ui/Nav';
import Footer from '@/components/ui/Footer';
import Newsletter from '@/components/ui/Newsletter';

/* ── Shared styles ──────────────────────────────────────────────── */
const CREAM = '#F7F3EC';
const INK = '#0D0B09';
const GOLD = '#C4943A';
const MIST = '#A89F91';
const SECTION_PAD = '80px clamp(24px, 5vw, 120px)';

/* ── Featured Listing Card ──────────────────────────────────────── */
function FeaturedCard({ listing, index, type }: { listing: FeaturedListing; index: number; type: 'winery' | 'restaurant' | 'hotel' }) {
  const imageLeft = index % 2 === 0;
  const ctaLabel = type === 'winery' ? 'Reserve a visit' : type === 'restaurant' ? 'Make a reservation' : 'Book your stay';
  const detailPath = type === 'winery' ? `/wineries/${listing.slug}` : type === 'restaurant' ? `/dining/${listing.slug}` : `/stay/${listing.slug}`;

  return (
    <div style={{
      display: 'flex',
      flexDirection: imageLeft ? 'row' : 'row-reverse',
      gap: 48,
      padding: '48px 0',
      borderBottom: `1px solid rgba(0,0,0,0.08)`,
      alignItems: 'flex-start',
      flexWrap: 'wrap' as const,
    }}>
      {/* Image */}
      <div style={{ flex: '0 0 420px', maxWidth: '100%' }}>
        <div style={{ position: 'relative', width: '100%', aspectRatio: '4/3', overflow: 'hidden' }}>
          <Image
            src={listing.image}
            alt={listing.name}
            fill
            style={{ objectFit: 'cover' }}
            sizes="420px"
          />
        </div>
      </div>

      {/* Text */}
      <div style={{ flex: 1, minWidth: 280 }}>
        <h3 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(24px, 3vw, 36px)',
          fontStyle: 'italic',
          fontWeight: 300,
          color: INK,
          margin: '0 0 8px',
          lineHeight: 1.2,
        }}>
          {listing.name}
        </h3>

        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: 13,
          color: MIST,
          letterSpacing: '0.04em',
          margin: '0 0 4px',
        }}>
          {listing.address}
          {listing.website && <> · <span style={{ color: GOLD }}>{listing.website}</span></>}
        </p>

        {listing.category && (
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: 11,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: GOLD,
            margin: '0 0 16px',
          }}>
            {listing.category}
          </p>
        )}

        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: 16,
          lineHeight: 1.75,
          color: '#333',
          margin: '16px 0 24px',
        }}>
          {listing.writeup}
        </p>

        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          {listing.slug && (
            <Link href={detailPath} style={{
              fontFamily: 'var(--font-body)',
              fontSize: 13,
              fontWeight: 500,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: CREAM,
              background: INK,
              padding: '12px 28px',
              textDecoration: 'none',
              transition: 'opacity 0.6s',
            }}>
              {ctaLabel}
            </Link>
          )}
          {listing.slug && (
            <Link href={detailPath} style={{
              fontFamily: 'var(--font-body)',
              fontSize: 13,
              fontWeight: 500,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: INK,
              border: `1px solid ${INK}`,
              padding: '12px 28px',
              textDecoration: 'none',
              transition: 'opacity 0.6s',
            }}>
              Read more
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── Also Recommended Sidebar ───────────────────────────────────── */
function AlsoRecommended({ listings }: { listings: SidebarListing[] }) {
  if (!listings.length) return null;
  return (
    <div style={{
      background: 'rgba(0,0,0,0.03)',
      padding: '32px 40px',
      marginTop: 48,
    }}>
      <h4 style={{
        fontFamily: 'var(--font-body)',
        fontSize: 11,
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: '0.15em',
        color: MIST,
        margin: '0 0 24px',
      }}>
        Also Recommended
      </h4>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '16px 48px',
      }}>
        {listings.map((l) => (
          <div key={l.name} style={{ borderBottom: '1px solid rgba(0,0,0,0.06)', paddingBottom: 12 }}>
            <p style={{
              fontFamily: 'var(--font-display)',
              fontSize: 18,
              fontStyle: 'italic',
              fontWeight: 400,
              color: INK,
              margin: '0 0 2px',
            }}>
              {l.slug ? <Link href={`/wineries/${l.slug}`} style={{ color: INK, textDecoration: 'none' }}>{l.name}</Link> : l.name}
            </p>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: 12,
              color: MIST,
              margin: 0,
            }}>
              {l.address}
              {l.website && <> · <span style={{ color: GOLD }}>{l.website}</span></>}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Section Header ─────────────────────────────────────────────── */
function SectionHeader({ title, intro }: { title: string; intro?: string }) {
  return (
    <div style={{ marginBottom: 48 }}>
      <h2 style={{
        fontFamily: 'var(--font-body)',
        fontSize: 13,
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '0.2em',
        color: INK,
        margin: '0 0 24px',
      }}>
        {title}
      </h2>
      {intro && (
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: 18,
          lineHeight: 1.75,
          color: '#444',
          maxWidth: 800,
        }}>
          {intro}
        </p>
      )}
    </div>
  );
}

/* ── Sub-Region Section ─────────────────────────────────────────── */
function SubRegionSection({ subRegion, type }: { subRegion: SubRegion; type: 'winery' | 'restaurant' | 'hotel' }) {
  return (
    <div style={{ marginBottom: 64 }}>
      <h3 style={{
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(28px, 3vw, 40px)',
        fontStyle: 'italic',
        fontWeight: 300,
        color: INK,
        margin: '0 0 12px',
      }}>
        {subRegion.name}
      </h3>
      {subRegion.intro && (
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: 16,
          lineHeight: 1.75,
          color: '#555',
          maxWidth: 700,
          marginBottom: 32,
        }}>
          {subRegion.intro}
        </p>
      )}

      {subRegion.featured.map((f, i) => (
        <FeaturedCard key={f.name} listing={f} index={i} type={type} />
      ))}

      <AlsoRecommended listings={subRegion.alsoRecommended} />
    </div>
  );
}

/* ── Adventure Card ─────────────────────────────────────────────── */
function AdventureCard({ adventure }: { adventure: Adventure }) {
  // Convert **bold** to <strong> tags
  const renderNarrative = (text: string) => {
    const parts = text.split(/\*\*(.*?)\*\*/g);
    return parts.map((part, i) =>
      i % 2 === 1 ? <strong key={i} style={{ color: CREAM }}>{part}</strong> : <span key={i}>{part}</span>
    );
  };

  return (
    <div style={{ marginBottom: 64 }}>
      <p style={{
        fontFamily: 'var(--font-body)',
        fontSize: 11,
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: '0.15em',
        color: GOLD,
        margin: '0 0 8px',
      }}>
        Excursion {adventure.number}
      </p>
      <h3 style={{
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(32px, 4vw, 52px)',
        fontStyle: 'italic',
        fontWeight: 300,
        color: CREAM,
        margin: '0 0 32px',
        lineHeight: 1.15,
      }}>
        {adventure.title}
      </h3>

      <div style={{ position: 'relative', width: '100%', aspectRatio: '21/9', overflow: 'hidden', marginBottom: 32 }}>
        <Image
          src={adventure.image}
          alt={adventure.title}
          fill
          style={{ objectFit: 'cover' }}
          sizes="100vw"
        />
      </div>

      <p style={{
        fontFamily: 'var(--font-body)',
        fontSize: 18,
        lineHeight: 1.85,
        color: MIST,
        maxWidth: 800,
      }}>
        {renderNarrative(adventure.narrative)}
      </p>
    </div>
  );
}

/* ── Special Section ────────────────────────────────────────────── */
function SpecialSectionBlock({ section }: { section: SpecialSection }) {
  return (
    <div style={{ padding: SECTION_PAD, background: CREAM }}>
      <h2 style={{
        fontFamily: 'var(--font-body)',
        fontSize: 13,
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '0.2em',
        color: INK,
        margin: '0 0 12px',
      }}>
        {section.title}
      </h2>
      {section.intro && (
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: 18,
          lineHeight: 1.75,
          color: '#444',
          maxWidth: 800,
          marginBottom: 32,
        }}>
          {section.intro}
        </p>
      )}
      {section.featured?.map((f, i) => (
        <FeaturedCard key={f.name} listing={f} index={i} type="winery" />
      ))}
      {section.alsoRecommended && <AlsoRecommended listings={section.alsoRecommended} />}
    </div>
  );
}

/* ── Main Page Component ────────────────────────────────────────── */
export default function RegionMagazinePage({ data }: { data: RegionMagazineData }) {
  return (
    <div style={{ background: INK }}>
      <Nav />

      {/* ── Hero ────────────────────────────────────────────────── */}
      <section style={{ position: 'relative', height: '75vh', overflow: 'hidden' }}>
        <Image
          src={data.heroImage}
          alt={data.title}
          fill
          style={{ objectFit: 'cover' }}
          priority
          sizes="100vw"
        />
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)',
        }} />
        <div style={{
          position: 'absolute',
          bottom: 60,
          left: 0,
          right: 0,
          textAlign: 'center',
          padding: '0 24px',
        }}>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(56px, 10vw, 140px)',
            fontStyle: 'italic',
            fontWeight: 300,
            color: CREAM,
            margin: 0,
            lineHeight: 0.95,
            letterSpacing: '-0.02em',
          }}>
            {data.title}
          </h1>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: 16,
            fontWeight: 500,
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
            color: GOLD,
            margin: '16px 0 0',
          }}>
            {data.subtitle}
          </p>
        </div>
      </section>

      {/* ── Lede / Editorial Intro ──────────────────────────────── */}
      <section style={{
        padding: '80px clamp(24px, 5vw, 120px)',
        background: CREAM,
      }}>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: 12,
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.12em',
          color: MIST,
          margin: '0 0 32px',
        }}>
          By {data.author}
        </p>

        <div style={{
          fontFamily: 'var(--font-body)',
          fontSize: 18,
          lineHeight: 1.85,
          color: '#333',
          maxWidth: 860,
          columnCount: 2,
          columnGap: 48,
          columnRule: '1px solid rgba(0,0,0,0.06)',
        }}>
          {data.lede.split('\n\n').map((p, i) => (
            <p key={i} style={{ margin: '0 0 24px' }}>{p}</p>
          ))}
        </div>

        {data.tip && (
          <div style={{
            marginTop: 48,
            padding: '24px 32px',
            borderLeft: `3px solid ${GOLD}`,
            background: 'rgba(196, 148, 58, 0.06)',
            maxWidth: 700,
          }}>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: 11,
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              color: GOLD,
              margin: '0 0 8px',
            }}>
              Tip
            </p>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: 15,
              lineHeight: 1.7,
              color: '#555',
              margin: 0,
              fontStyle: 'italic',
            }}>
              {data.tip}
            </p>
          </div>
        )}
      </section>

      {/* ── WHERE TO TASTE ──────────────────────────────────────── */}
      <section style={{ padding: SECTION_PAD, background: CREAM }}>
        <SectionHeader title="Where to Taste" intro={data.taste.intro} />

        {data.taste.subRegions?.map((sr) => (
          <SubRegionSection key={sr.name} subRegion={sr} type="winery" />
        ))}

        {data.taste.featured.length > 0 && (
          <>
            {data.taste.featured.map((f, i) => (
              <FeaturedCard key={f.name} listing={f} index={i} type="winery" />
            ))}
          </>
        )}

        {data.taste.alsoRecommended.length > 0 && (
          <AlsoRecommended listings={data.taste.alsoRecommended} />
        )}
      </section>

      {/* ── WHERE TO EAT ────────────────────────────────────────── */}
      <section style={{ padding: SECTION_PAD, background: CREAM, borderTop: '1px solid rgba(0,0,0,0.06)' }}>
        <SectionHeader title="Where to Eat" intro={data.eat.intro} />

        {data.eat.featured.map((f, i) => (
          <FeaturedCard key={f.name} listing={f} index={i} type="restaurant" />
        ))}

        <AlsoRecommended listings={data.eat.alsoRecommended} />

        {data.eat.breakfastCoffee && (
          <div style={{ marginTop: 64 }}>
            <h3 style={{
              fontFamily: 'var(--font-body)',
              fontSize: 11,
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
              color: MIST,
              margin: '0 0 32px',
            }}>
              Breakfast / Coffee / Snacks
            </h3>
            {data.eat.breakfastCoffee.featured.map((f, i) => (
              <FeaturedCard key={f.name} listing={f} index={i} type="restaurant" />
            ))}
            <AlsoRecommended listings={data.eat.breakfastCoffee.alsoRecommended} />
          </div>
        )}
      </section>

      {/* ── WHERE TO STAY ───────────────────────────────────────── */}
      {data.stay && (
        <section style={{ padding: SECTION_PAD, background: CREAM, borderTop: '1px solid rgba(0,0,0,0.06)' }}>
          <SectionHeader title="Where to Stay" intro={data.stay.intro} />
          {data.stay.featured.map((f, i) => (
            <FeaturedCard key={f.name} listing={f} index={i} type="hotel" />
          ))}
          <AlsoRecommended listings={data.stay.alsoRecommended} />
        </section>
      )}

      {/* ── Special Sections ────────────────────────────────────── */}
      {data.specialSections?.map((s) => (
        <SpecialSectionBlock key={s.title} section={s} />
      ))}

      {/* ── ADVENTURES ──────────────────────────────────────────── */}
      {data.adventures.length > 0 && (
        <section style={{
          padding: SECTION_PAD,
          background: INK,
        }}>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: 11,
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
            color: GOLD,
            margin: '0 0 8px',
          }}>
            Choose Your Adventure
          </p>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(36px, 5vw, 64px)',
            fontStyle: 'italic',
            fontWeight: 300,
            color: CREAM,
            margin: '0 0 64px',
            lineHeight: 1.1,
          }}>
            {data.adventures.length} excursion{data.adventures.length > 1 ? 's' : ''} from {data.author}
          </h2>

          {data.adventures.map((a) => (
            <AdventureCard key={a.number} adventure={a} />
          ))}
        </section>
      )}

      {/* ── Newsletter + Footer ─────────────────────────────────── */}
      <Newsletter />
      <Footer />
    </div>
  );
}
