'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Footer from '@/components/ui/Footer';
import Newsletter from '@/components/ui/Newsletter';
import { ExploreMapSection } from '@/components/explore/ExploreMapSection';
import { pinsByRegion } from '@/data/map-pins';

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

/* ══════════════════════════════════════════════════════════════════ */
export default function RegionDetailPage({ data }: { data: RegionData }) {
  const { lede, tasteIntro, eatIntro, stayIntro } = parseSections(data.body);

  // Split lede into paragraphs for the editorial body
  const ledeParagraphs = lede.split(/\n\n+/).filter(p => p.trim().length > 80);

  return (
    <div data-site-surface="light" style={{ minHeight: '100vh', background: '#FFFFFF', WebkitFontSmoothing: 'antialiased' as unknown as string }}>

      {/* ── 1. HERO ── */}
      <section data-nav-hero-root style={{ position: 'relative', height: '48vh', minHeight: 320, maxHeight: 520, overflow: 'hidden' }}>
        <Image src={data.heroImage} alt={data.name} fill priority sizes="100vw" style={{ objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, zIndex: 1, background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.15) 40%, transparent 60%)' }} />
        <div className="hero-top-scrim" aria-hidden />
        <div style={{ position: 'absolute', bottom: 48, left: 0, right: 0, textAlign: 'center', padding: '0 24px', zIndex: 3 }}>
          <h1 style={{
            fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontWeight: 300,
            fontSize: 'clamp(56px, 9vw, 128px)', color: '#F7F3EC', lineHeight: 1,
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
          <Link href={`/explore?ava=${data.slug}`} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#FFFFFF', background: '#0D0B09', padding: '12px 24px', textDecoration: 'none' }}>Explore the Map</Link>
          <Link href="#directory" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#0D0B09', border: '1px solid #CCC', padding: '12px 24px', textDecoration: 'none' }}>View Directory</Link>
        </div>
      </section>

      {/* ── 3. PULL QUOTE ── */}
      <section style={{ padding: '72px clamp(24px, 8vw, 140px)', background: '#FFFFFF' }}>
        <p style={{
          fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontWeight: 300,
          fontSize: 'clamp(32px, 4.5vw, 56px)', color: '#0D0B09', lineHeight: 1.4,
          margin: 0, maxWidth: 860, marginLeft: 'auto', marginRight: 'auto',
        }}>
          {data.pullQuote}
        </p>
      </section>

      {/* ── 4. EDITORIAL BODY — text interleaved with photos ── */}
      <section style={{
        padding: '0 clamp(24px, 6vw, 100px) 64px',
        background: '#FFFFFF', maxWidth: 1100,
        marginLeft: 'auto', marginRight: 'auto',
      }}>
        {/* Collect all available images for interleaving */}
        {(() => {
          const allImages = [
            ...data.wineries.map(w => w.images[0]),
            ...data.restaurants.map(r => r.images[0]),
            ...data.hotels.map(h => h.images[0]),
            data.heroImage,
          ].filter(Boolean);

          // Group paragraphs into pairs, insert a photo between each pair
          const blocks: React.ReactNode[] = [];
          for (let i = 0; i < ledeParagraphs.length; i += 2) {
            const pair = ledeParagraphs.slice(i, i + 2);
            const imgIdx = Math.floor(i / 2);
            const isEven = imgIdx % 2 === 0;
            const img = allImages[imgIdx % allImages.length];

            blocks.push(
              <div key={i} style={{
                display: 'grid', gridTemplateColumns: '1fr 1fr',
                gap: 40, marginBottom: 48, alignItems: 'start',
                direction: isEven ? 'ltr' : 'rtl',
              }}>
                <div style={{ direction: 'ltr' }}>
                  {pair.map((p, j) => (
                    <p key={j} style={{
                      fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 300,
                      color: 'rgba(13,11,9,0.65)', lineHeight: 1.85, marginBottom: 22,
                    }}>{p.trim()}</p>
                  ))}
                </div>
                <div style={{
                  direction: 'ltr',
                  position: 'relative',
                  aspectRatio: isEven ? '3/4' : '4/3',
                  overflow: 'hidden',
                }}>
                  <Image src={img} alt="" fill sizes="50vw" style={{ objectFit: 'cover' }} />
                </div>
              </div>
            );
          }

          return blocks;
        })()}

        {/* CTAs */}
        <div style={{ display: 'flex', gap: 10 }}>
          <Link href={`/explore?ava=${data.slug}`} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#FFFFFF', background: '#0D0B09', padding: '14px 28px', textDecoration: 'none' }}>Explore the Map</Link>
          <Link href="/regions" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#0D0B09', border: '1px solid #CCC', padding: '14px 28px', textDecoration: 'none' }}>Explore Another Region</Link>
        </div>
      </section>

      {/* ── 5. DIRECTORY — synced map + list ── */}
      <section id="directory" style={{ background: '#FAF7F2', paddingTop: 48 }}>
        <div
          style={{
            maxWidth: 1100,
            margin: '0 auto',
            padding: '0 clamp(24px, 5vw, 80px) 24px',
          }}
        >
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: 'italic',
              fontWeight: 300,
              fontSize: 'clamp(28px, 4vw, 40px)',
              color: '#0D0B09',
              margin: '0 0 16px',
              lineHeight: 1.15,
            }}
          >
            Where to taste, eat & stay in {data.name}
          </h2>
          {(tasteIntro || eatIntro || stayIntro) && (
            <div style={{ maxWidth: 760, marginBottom: 8 }}>
              {tasteIntro && (
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 15,
                    lineHeight: 1.75,
                    color: '#6B6560',
                    margin: '0 0 14px',
                  }}
                >
                  {tasteIntro}
                </p>
              )}
              {eatIntro && (
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 15,
                    lineHeight: 1.75,
                    color: '#6B6560',
                    margin: '0 0 14px',
                  }}
                >
                  {eatIntro}
                </p>
              )}
              {stayIntro && (
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 15,
                    lineHeight: 1.75,
                    color: '#6B6560',
                    margin: 0,
                  }}
                >
                  {stayIntro}
                </p>
              )}
            </div>
          )}
        </div>
        <ExploreMapSection
          pins={pinsByRegion(data.slug)}
          scopedRegion={data.slug}
          showRegionFilter={false}
        />
      </section>

      {/* ── 6. NEWSLETTER + FOOTER ── */}
      <Newsletter />
      <Footer />
    </div>
  );
}
