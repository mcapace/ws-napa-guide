'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { RegionMagazineData, FeaturedListing, SidebarListing, SubRegion, Adventure, SpecialSection } from '@/data/region-structured.types';
import Nav from '@/components/ui/Nav';
import Footer from '@/components/ui/Footer';
import Newsletter from '@/components/ui/Newsletter';

/* ── Colors ─────────────────────────────────────────────────────── */
const CREAM = '#F7F3EC';
const INK = '#0D0B09';
const GOLD = '#C4943A';
const MIST = '#A89F91';
const RULE = 'rgba(0,0,0,0.12)';

/* ── Featured Listing (magazine style) ──────────────────────────── */
function FeaturedListing_({ listing, index }: { listing: FeaturedListing; index: number }) {
  const imageRight = index % 2 !== 0;

  return (
    <div style={{
      display: 'flex',
      flexDirection: imageRight ? 'row-reverse' : 'row',
      gap: 40,
      marginBottom: 48,
      flexWrap: 'wrap' as const,
    }}>
      {/* Photo — large, ~50% width */}
      <div style={{ flex: '0 0 48%', maxWidth: '100%' }}>
        <div style={{ position: 'relative', width: '100%', aspectRatio: '3/2', overflow: 'hidden' }}>
          <Image
            src={listing.image}
            alt={listing.name}
            fill
            style={{ objectFit: 'cover' }}
            sizes="(max-width: 768px) 100vw, 48vw"
          />
        </div>
      </div>

      {/* Text */}
      <div style={{ flex: 1, minWidth: 260 }}>
        <h3 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(22px, 2.5vw, 32px)',
          fontStyle: 'italic',
          fontWeight: 400,
          color: INK,
          margin: '0 0 6px',
          lineHeight: 1.15,
        }}>
          {listing.name}
        </h3>

        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: 12,
          color: MIST,
          letterSpacing: '0.03em',
          margin: '0 0 2px',
          lineHeight: 1.5,
        }}>
          {listing.address}
          {listing.website && (
            <> <span style={{ color: GOLD }}>| {listing.website}</span></>
          )}
        </p>

        {listing.category && (
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: 10,
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            color: GOLD,
            margin: '4px 0 0',
            fontWeight: 600,
          }}>
            {listing.category}
          </p>
        )}

        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: 15,
          lineHeight: 1.75,
          color: '#444',
          margin: '14px 0 0',
        }}>
          {listing.writeup}
        </p>
      </div>
    </div>
  );
}

/* ── Sidebar Listing (compact: name / address | website) ────────── */
function SidebarItem({ listing }: { listing: SidebarListing }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <p style={{
        fontFamily: 'var(--font-display)',
        fontSize: 16,
        fontWeight: 600,
        fontStyle: 'italic',
        color: INK,
        margin: 0,
        lineHeight: 1.3,
      }}>
        {listing.slug ? (
          <Link href={`/wineries/${listing.slug}`} style={{ color: INK, textDecoration: 'none' }}>{listing.name}</Link>
        ) : listing.name}
      </p>
      <p style={{
        fontFamily: 'var(--font-body)',
        fontSize: 11,
        color: MIST,
        margin: '2px 0 0',
        lineHeight: 1.4,
      }}>
        {listing.address}
        {listing.website && (
          <> <span style={{ color: GOLD }}>| {listing.website}</span></>
        )}
      </p>
    </div>
  );
}

/* ── Magazine Spread: Featured (left) + Sidebar (right) ─────────── */
function MagazineSpread({
  featured,
  alsoRecommended,
  type,
  subRegionName,
  subRegionIntro,
}: {
  featured: FeaturedListing[];
  alsoRecommended: SidebarListing[];
  type: 'winery' | 'restaurant' | 'hotel';
  subRegionName?: string;
  subRegionIntro?: string;
}) {
  return (
    <div style={{ marginBottom: 56 }}>
      {subRegionName && (
        <div style={{ marginBottom: 32 }}>
          <h3 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(26px, 3vw, 38px)',
            fontStyle: 'italic',
            fontWeight: 300,
            color: INK,
            margin: '0 0 8px',
          }}>
            {subRegionName}
          </h3>
          {subRegionIntro && (
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: 15,
              lineHeight: 1.7,
              color: '#555',
              maxWidth: 600,
            }}>
              {subRegionIntro}
            </p>
          )}
        </div>
      )}

      <div style={{
        display: 'grid',
        gridTemplateColumns: alsoRecommended.length > 0 ? '1fr 280px' : '1fr',
        gap: 56,
        alignItems: 'start',
      }}>
        {/* Main column — featured listings */}
        <div>
          {featured.map((f, i) => (
            <FeaturedListing_ key={f.name} listing={f} index={i} />
          ))}
        </div>

        {/* Sidebar — Also Recommended */}
        {alsoRecommended.length > 0 && (
          <aside style={{
            borderLeft: `1px solid ${RULE}`,
            paddingLeft: 32,
            position: 'sticky' as const,
            top: 100,
          }}>
            <h4 style={{
              fontFamily: 'var(--font-body)',
              fontSize: 10,
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.18em',
              color: MIST,
              margin: '0 0 20px',
              paddingBottom: 12,
              borderBottom: `1px solid ${RULE}`,
            }}>
              Also Recommended
            </h4>
            {alsoRecommended.map((l) => (
              <SidebarItem key={l.name} listing={l} />
            ))}
          </aside>
        )}
      </div>
    </div>
  );
}

/* ── Section Header (bold caps with rule) ───────────────────────── */
function SectionHeader({ title, intro }: { title: string; intro?: string }) {
  return (
    <div style={{
      marginBottom: 48,
      paddingBottom: 20,
      borderBottom: `2px solid ${INK}`,
    }}>
      <h2 style={{
        fontFamily: 'var(--font-body)',
        fontSize: 14,
        fontWeight: 800,
        textTransform: 'uppercase',
        letterSpacing: '0.25em',
        color: INK,
        margin: 0,
      }}>
        {title}
      </h2>
      {intro && (
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: 16,
          lineHeight: 1.75,
          color: '#555',
          margin: '16px 0 0',
          maxWidth: 720,
        }}>
          {intro}
        </p>
      )}
    </div>
  );
}

/* ── Adventure Card ─────────────────────────────────────────────── */
function AdventureCard({ adventure, author }: { adventure: Adventure; author: string }) {
  const renderNarrative = (text: string) => {
    const parts = text.split(/\*\*(.*?)\*\*/g);
    return parts.map((part, i) =>
      i % 2 === 1 ? <strong key={i} style={{ color: CREAM, fontWeight: 600 }}>{part}</strong> : <span key={i}>{part}</span>
    );
  };

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 48,
      marginBottom: 72,
      alignItems: 'start',
    }}>
      {/* Image */}
      <div style={{ position: 'relative', width: '100%', aspectRatio: '4/3', overflow: 'hidden' }}>
        <Image
          src={adventure.image}
          alt={adventure.title}
          fill
          style={{ objectFit: 'cover' }}
          sizes="50vw"
        />
      </div>

      {/* Text */}
      <div>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: 10,
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.18em',
          color: GOLD,
          margin: '0 0 8px',
        }}>
          Excursion {adventure.number}
        </p>
        <h3 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(28px, 3.5vw, 44px)',
          fontStyle: 'italic',
          fontWeight: 300,
          color: CREAM,
          margin: '0 0 24px',
          lineHeight: 1.1,
        }}>
          {adventure.title}
        </h3>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: 16,
          lineHeight: 1.85,
          color: MIST,
        }}>
          {renderNarrative(adventure.narrative)}
        </p>
      </div>
    </div>
  );
}

/* ── Special Section ────────────────────────────────────────────── */
function SpecialSectionBlock({ section }: { section: SpecialSection }) {
  return (
    <div style={{
      padding: '64px clamp(24px, 5vw, 120px)',
      background: CREAM,
      borderTop: `1px solid ${RULE}`,
    }}>
      <SectionHeader title={section.title} intro={section.intro} />
      {section.featured && section.featured.length > 0 && (
        <MagazineSpread
          featured={section.featured}
          alsoRecommended={section.alsoRecommended || []}
          type="winery"
        />
      )}
      {!section.featured?.length && section.narrative && (
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: 16,
          lineHeight: 1.85,
          color: '#444',
          maxWidth: 720,
        }}>
          {section.narrative}
        </p>
      )}
    </div>
  );
}

/* ── Drop Cap ───────────────────────────────────────────────────── */
function DropCapParagraph({ text }: { text: string }) {
  const firstLetter = text.charAt(0);
  const rest = text.slice(1);
  return (
    <p style={{
      fontFamily: 'var(--font-body)',
      fontSize: 17,
      lineHeight: 1.85,
      color: '#333',
      margin: '0 0 24px',
    }}>
      <span style={{
        fontFamily: 'var(--font-display)',
        fontSize: 72,
        fontWeight: 400,
        fontStyle: 'italic',
        float: 'left' as const,
        lineHeight: 0.8,
        marginRight: 8,
        marginTop: 6,
        color: INK,
      }}>
        {firstLetter}
      </span>
      {rest}
    </p>
  );
}

/* ══════════════════════════════════════════════════════════════════
   MAIN PAGE
   ══════════════════════════════════════════════════════════════════ */
export default function RegionMagazinePage({ data }: { data: RegionMagazineData }) {
  const ledeParagraphs = data.lede.split('\n\n');

  return (
    <div style={{ background: INK }}>
      <Nav />

      {/* ── Hero ────────────────────────────────────────────────── */}
      <section style={{ position: 'relative', height: '70vh', overflow: 'hidden' }}>
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
          background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 50%)',
        }} />
        <div style={{
          position: 'absolute',
          bottom: 48,
          left: 0,
          right: 0,
          textAlign: 'center',
          padding: '0 24px',
        }}>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(48px, 9vw, 120px)',
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
            fontSize: 14,
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.2em',
            color: GOLD,
            margin: '14px 0 0',
          }}>
            {data.subtitle}
          </p>
        </div>
      </section>

      {/* ── Lede / Editorial Intro ──────────────────────────────── */}
      <section style={{
        padding: '72px clamp(24px, 5vw, 120px)',
        background: CREAM,
      }}>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: 11,
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.15em',
          color: MIST,
          margin: '0 0 36px',
        }}>
          By {data.author}
        </p>

        <div style={{
          maxWidth: 860,
          columnCount: 2,
          columnGap: 48,
          columnRule: `1px solid ${RULE}`,
        }}>
          {ledeParagraphs.map((p, i) =>
            i === 0 ? (
              <DropCapParagraph key={i} text={p} />
            ) : (
              <p key={i} style={{
                fontFamily: 'var(--font-body)',
                fontSize: 17,
                lineHeight: 1.85,
                color: '#333',
                margin: '0 0 24px',
              }}>
                {p}
              </p>
            )
          )}
        </div>

        {data.tip && (
          <div style={{
            marginTop: 48,
            padding: '20px 28px',
            borderLeft: `3px solid ${GOLD}`,
            background: 'rgba(196, 148, 58, 0.05)',
            maxWidth: 640,
          }}>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: 10,
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.18em',
              color: GOLD,
              margin: '0 0 6px',
            }}>
              Tip
            </p>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: 14,
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
      <section style={{
        padding: '64px clamp(24px, 5vw, 120px)',
        background: CREAM,
        borderTop: `1px solid ${RULE}`,
      }}>
        <SectionHeader title="Where to Taste" intro={data.taste.intro} />

        {/* Sub-regions with their own featured + sidebar */}
        {data.taste.subRegions?.map((sr) => (
          <MagazineSpread
            key={sr.name}
            featured={sr.featured}
            alsoRecommended={sr.alsoRecommended}
            type="winery"
            subRegionName={sr.name}
            subRegionIntro={sr.intro}
          />
        ))}

        {/* Top-level featured + sidebar (for regions without sub-regions) */}
        {data.taste.featured.length > 0 && (
          <MagazineSpread
            featured={data.taste.featured}
            alsoRecommended={data.taste.alsoRecommended}
            type="winery"
          />
        )}

        {/* If no featured but has sidebar only */}
        {data.taste.featured.length === 0 && data.taste.alsoRecommended.length > 0 && !data.taste.subRegions?.length && (
          <div style={{ borderLeft: `1px solid ${RULE}`, paddingLeft: 32, maxWidth: 320 }}>
            <h4 style={{
              fontFamily: 'var(--font-body)',
              fontSize: 10,
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.18em',
              color: MIST,
              margin: '0 0 20px',
            }}>
              Also Recommended
            </h4>
            {data.taste.alsoRecommended.map((l) => (
              <SidebarItem key={l.name} listing={l} />
            ))}
          </div>
        )}
      </section>

      {/* ── WHERE TO EAT ────────────────────────────────────────── */}
      <section style={{
        padding: '64px clamp(24px, 5vw, 120px)',
        background: CREAM,
        borderTop: `1px solid ${RULE}`,
      }}>
        <SectionHeader title="Where to Eat" intro={data.eat.intro} />

        <MagazineSpread
          featured={data.eat.featured}
          alsoRecommended={data.eat.alsoRecommended}
          type="restaurant"
        />

        {data.eat.breakfastCoffee && (
          <div style={{ marginTop: 32, paddingTop: 32, borderTop: `1px solid ${RULE}` }}>
            <h3 style={{
              fontFamily: 'var(--font-body)',
              fontSize: 11,
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
              color: INK,
              margin: '0 0 32px',
            }}>
              Breakfast / Coffee / Sandwiches / Snacks
            </h3>
            <MagazineSpread
              featured={data.eat.breakfastCoffee.featured}
              alsoRecommended={data.eat.breakfastCoffee.alsoRecommended}
              type="restaurant"
            />
          </div>
        )}
      </section>

      {/* ── WHERE TO STAY ───────────────────────────────────────── */}
      {data.stay && (
        <section style={{
          padding: '64px clamp(24px, 5vw, 120px)',
          background: CREAM,
          borderTop: `1px solid ${RULE}`,
        }}>
          <SectionHeader title="Where to Stay" intro={data.stay.intro} />
          <MagazineSpread
            featured={data.stay.featured}
            alsoRecommended={data.stay.alsoRecommended}
            type="hotel"
          />
        </section>
      )}

      {/* ── Special Sections ────────────────────────────────────── */}
      {data.specialSections?.map((s) => (
        <SpecialSectionBlock key={s.title} section={s} />
      ))}

      {/* ── ADVENTURES ──────────────────────────────────────────── */}
      {data.adventures.length > 0 && (
        <section style={{
          padding: '80px clamp(24px, 5vw, 120px)',
          background: INK,
        }}>
          <div style={{
            marginBottom: 64,
            paddingBottom: 20,
            borderBottom: `1px solid rgba(255,255,255,0.15)`,
          }}>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: 10,
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.18em',
              color: GOLD,
              margin: '0 0 8px',
            }}>
              Choose Your Adventure
            </p>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(32px, 4.5vw, 56px)',
              fontStyle: 'italic',
              fontWeight: 300,
              color: CREAM,
              margin: 0,
              lineHeight: 1.1,
            }}>
              {data.adventures.length} excursion{data.adventures.length > 1 ? 's' : ''} from {data.author}
            </h2>
          </div>

          {data.adventures.map((a) => (
            <AdventureCard key={a.number} adventure={a} author={data.author} />
          ))}
        </section>
      )}

      {/* ── Newsletter + Footer ─────────────────────────────────── */}
      <Newsletter />
      <Footer />
    </div>
  );
}
