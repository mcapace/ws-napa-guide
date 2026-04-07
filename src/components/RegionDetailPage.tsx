'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Nav from '@/components/ui/Nav';
import Footer from '@/components/ui/Footer';
import Newsletter from '@/components/ui/Newsletter';

export type RegionData = {
  slug: string;
  name: string;
  tagline: string;
  author: string;
  heroImage: string;
  pullQuote: string;
  intro: string;
  body: string;
  wineries: Array<{ slug: string; name: string; address?: string; excerpt: string; images: string[] }>;
  restaurants: Array<{ slug: string; name: string; cuisine?: string; priceRange?: string; excerpt: string; images: string[] }>;
  hotels: Array<{ slug: string; name: string; category?: string; priceRange?: string; excerpt: string; images: string[] }>;
};

/* ── Parse body into sections ── */
function parseSections(body: string) {
  // Split on "Where to Taste", "Where to Eat", "Where to Stay" markers
  const tasteIdx = body.indexOf('Where to Taste');
  const eatIdx = body.indexOf('Where to Eat');
  const stayIdx = body.indexOf('Where to Stay');

  // The lede is everything before the first section marker
  const firstMarker = [tasteIdx, eatIdx, stayIdx].filter(i => i >= 0).sort((a, b) => a - b)[0];
  const lede = firstMarker !== undefined ? body.slice(0, firstMarker).trim() : body.trim();

  // Extract intro text for each section (text between the header and the first listing)
  const extractIntro = (start: number, end: number) => {
    if (start < 0) return '';
    const headerEnd = body.indexOf('\n', start);
    const sectionText = body.slice(headerEnd >= 0 ? headerEnd : start + 20, end >= 0 ? end : undefined).trim();
    // Get the first substantial paragraph (>80 chars) as the intro
    const paragraphs = sectionText.split('\n').map(p => p.trim()).filter(p => p.length > 80);
    return paragraphs[0] || '';
  };

  const tasteIntro = extractIntro(tasteIdx, eatIdx);
  const eatIntro = extractIntro(eatIdx, stayIdx);
  const stayIntro = extractIntro(stayIdx, -1);

  return { lede, tasteIntro, eatIntro, stayIntro };
}

/* ── Listing Row ── */
function ListingRow({ name, subtitle, excerpt, image, href, ctaLabel }: {
  name: string; subtitle?: string; excerpt: string; image: string; href: string; ctaLabel: string;
}) {
  return (
    <div style={{
      display: 'grid', gridTemplateColumns: '120px 200px 1fr auto',
      gap: 24, alignItems: 'center', padding: '22px 0',
      borderBottom: '1px solid #DEDAD4',
    }}>
      <div style={{ position: 'relative', width: 120, height: 80, overflow: 'hidden' }}>
        <Image src={image} alt={name} fill sizes="120px" style={{ objectFit: 'cover' }} />
      </div>
      <div>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, fontStyle: 'italic', fontWeight: 400, color: '#0D0B09', margin: '0 0 3px', lineHeight: 1.2 }}>{name}</p>
        {subtitle && <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#999', margin: 0 }}>{subtitle}</p>}
      </div>
      <p style={{
        fontFamily: "'DM Sans', sans-serif", fontSize: 13, lineHeight: 1.55,
        color: '#777', margin: 0, overflow: 'hidden',
        display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' as const,
      }}>{excerpt}</p>
      <div style={{ display: 'flex', gap: 8 }}>
        <Link href={href} style={{
          fontFamily: "'DM Sans', sans-serif", fontSize: 9, fontWeight: 600,
          textTransform: 'uppercase', letterSpacing: '0.1em',
          color: '#0D0B09', background: '#F7F3EC', padding: '10px 16px',
          textDecoration: 'none', border: '1px solid #0D0B09',
        }}>{ctaLabel}</Link>
        <Link href={href} style={{
          fontFamily: "'DM Sans', sans-serif", fontSize: 9, fontWeight: 600,
          textTransform: 'uppercase', letterSpacing: '0.1em',
          color: '#0D0B09', padding: '10px 16px',
          textDecoration: 'none', border: '1px solid #CCC',
        }}>Read More</Link>
      </div>
    </div>
  );
}

/* ── Section with intro + listings ── */
function ListingSection({ title, intro, children }: {
  title: string; intro: string; children: React.ReactNode;
}) {
  return (
    <div style={{ marginBottom: 64 }}>
      {/* Section header */}
      <h2 style={{
        fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontWeight: 300,
        fontSize: 'clamp(28px, 3.5vw, 42px)', color: '#0D0B09',
        margin: '0 0 16px',
      }}>
        {title}
      </h2>

      {/* Section intro */}
      {intro && (
        <p style={{
          fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 300,
          color: 'rgba(13,11,9,0.6)', lineHeight: 1.8,
          margin: '0 0 32px', maxWidth: 800,
        }}>
          {intro}
        </p>
      )}

      {/* Listing rows */}
      {children}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════ */
export default function RegionDetailPage({ data }: { data: RegionData }) {
  const { lede, tasteIntro, eatIntro, stayIntro } = parseSections(data.body);

  // Split lede into paragraphs for the editorial body
  const ledeParagraphs = lede.split(/\n\n+/).filter(p => p.trim().length > 80);

  return (
    <div style={{ minHeight: '100vh', background: '#FFFFFF' }}>
      <Nav />

      {/* ── 1. HERO ── */}
      <section style={{ position: 'relative', height: '60vh', minHeight: 420, overflow: 'hidden' }}>
        <Image src={data.heroImage} alt={data.name} fill priority sizes="100vw" style={{ objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.15) 40%, transparent 60%)' }} />
        <div style={{ position: 'absolute', bottom: 48, left: 0, right: 0, textAlign: 'center', padding: '0 24px' }}>
          <h1 style={{
            fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontWeight: 300,
            fontSize: 'clamp(44px, 7vw, 88px)', color: '#F7F3EC', lineHeight: 1,
            letterSpacing: '-0.02em', margin: 0, textShadow: '0 2px 24px rgba(0,0,0,0.3)',
          }}>
            {data.name}
          </h1>
        </div>
      </section>

      {/* ── 2. METADATA + CTAs ── */}
      <section style={{ textAlign: 'center', padding: '24px 24px 28px', borderBottom: '1px solid #E8E4DE', background: '#FFFFFF' }}>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#999', margin: '0 0 4px' }}>
          Wine Spectator · Napa Valley Guide
        </p>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#999', margin: '0 0 18px' }}>
          {data.tagline} · By {data.author}
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 10 }}>
          <Link href="/map" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#FFFFFF', background: '#0D0B09', padding: '12px 24px', textDecoration: 'none' }}>Explore the Map</Link>
          <Link href="#listings" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#0D0B09', border: '1px solid #CCC', padding: '12px 24px', textDecoration: 'none' }}>Read More</Link>
        </div>
      </section>

      {/* ── 3. PULL QUOTE ── */}
      <section style={{ padding: '72px clamp(24px, 8vw, 140px)', background: '#FFFFFF' }}>
        <p style={{
          fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontWeight: 300,
          fontSize: 'clamp(24px, 3vw, 36px)', color: '#0D0B09', lineHeight: 1.5,
          margin: 0, maxWidth: 860, marginLeft: 'auto', marginRight: 'auto',
        }}>
          {data.pullQuote}
        </p>
      </section>

      {/* ── 4. EDITORIAL BODY — text + photos ── */}
      <section style={{
        padding: '0 clamp(24px, 6vw, 100px) 64px',
        background: '#FFFFFF', maxWidth: 1100,
        marginLeft: 'auto', marginRight: 'auto',
      }}>
        {/* Text left, photo right */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, marginBottom: 48, alignItems: 'start' }}>
          <div>
            {ledeParagraphs.slice(0, 2).map((p, i) => (
              <p key={i} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 300, color: 'rgba(13,11,9,0.65)', lineHeight: 1.85, marginBottom: 22 }}>{p.trim()}</p>
            ))}
          </div>
          <div style={{ position: 'relative', aspectRatio: '3/4', overflow: 'hidden' }}>
            <Image src={data.wineries[0]?.images[0] || data.heroImage} alt="" fill sizes="50vw" style={{ objectFit: 'cover' }} />
          </div>
        </div>

        {/* Photo left, text right */}
        {ledeParagraphs.length > 2 && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, marginBottom: 48, alignItems: 'start' }}>
            <div style={{ position: 'relative', aspectRatio: '4/3', overflow: 'hidden' }}>
              <Image src={data.restaurants[0]?.images[0] || data.heroImage} alt="" fill sizes="50vw" style={{ objectFit: 'cover' }} />
            </div>
            <div>
              {ledeParagraphs.slice(2, 4).map((p, i) => (
                <p key={i} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 300, color: 'rgba(13,11,9,0.65)', lineHeight: 1.85, marginBottom: 22 }}>{p.trim()}</p>
              ))}
            </div>
          </div>
        )}

        {/* CTAs */}
        <div style={{ display: 'flex', gap: 10 }}>
          <Link href="/map" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#FFFFFF', background: '#0D0B09', padding: '14px 28px', textDecoration: 'none' }}>Explore the Map</Link>
          <Link href="/regions" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#0D0B09', border: '1px solid #CCC', padding: '14px 28px', textDecoration: 'none' }}>Explore Another Region</Link>
        </div>
      </section>

      {/* ── 5. LISTINGS — each section with intro + rows ── */}
      <section id="listings" style={{ background: '#F5F3EE', padding: '56px clamp(24px, 5vw, 80px)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>

          {data.wineries.length > 0 && (
            <ListingSection title={`Where to Taste in ${data.name}`} intro={tasteIntro}>
              {data.wineries.map((w) => (
                <ListingRow key={w.slug} name={w.name} subtitle={w.address} excerpt={w.excerpt} image={w.images[0]} href={`/wineries/${w.slug}`} ctaLabel="Reserve" />
              ))}
            </ListingSection>
          )}

          {data.restaurants.length > 0 && (
            <ListingSection title={`Where to Eat in ${data.name}`} intro={eatIntro}>
              {data.restaurants.map((r) => (
                <ListingRow key={r.slug} name={r.name} subtitle={[r.cuisine, r.priceRange].filter(Boolean).join(' · ')} excerpt={r.excerpt} image={r.images[0]} href={`/dining/${r.slug}`} ctaLabel="Reserve" />
              ))}
            </ListingSection>
          )}

          {data.hotels.length > 0 && (
            <ListingSection title={`Where to Stay in ${data.name}`} intro={stayIntro}>
              {data.hotels.map((h) => (
                <ListingRow key={h.slug} name={h.name} subtitle={[h.category, h.priceRange].filter(Boolean).join(' · ')} excerpt={h.excerpt} image={h.images[0]} href={`/stay/${h.slug}`} ctaLabel="Book Now" />
              ))}
            </ListingSection>
          )}
        </div>
      </section>

      {/* ── 6. NEWSLETTER + FOOTER ── */}
      <Newsletter />
      <Footer />
    </div>
  );
}
