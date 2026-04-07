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

/* ── Listing Row (therealhotels "More from this series" style) ── */
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

export default function RegionDetailPage({ data }: { data: RegionData }) {
  const bodyParagraphs = data.body.split('\n\n').filter(p => p.trim().length > 50);
  // Use first 3-4 paragraphs for the editorial body
  const editorialParagraphs = bodyParagraphs.slice(0, 4);

  return (
    <div style={{ minHeight: '100vh', background: '#FFFFFF' }}>
      <Nav />

      {/* ── 1. HERO with title overlaid ── */}
      <section style={{ position: 'relative', height: '60vh', minHeight: 420, overflow: 'hidden' }}>
        <Image src={data.heroImage} alt={data.name} fill priority sizes="100vw" style={{ objectFit: 'cover' }} />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.15) 40%, transparent 60%)',
        }} />
        <div style={{ position: 'absolute', bottom: 48, left: 0, right: 0, textAlign: 'center', padding: '0 24px' }}>
          <h1 style={{
            fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontWeight: 300,
            fontSize: 'clamp(44px, 7vw, 88px)', color: '#F7F3EC', lineHeight: 1,
            letterSpacing: '-0.02em', margin: 0,
            textShadow: '0 2px 24px rgba(0,0,0,0.3)',
          }}>
            {data.name}
          </h1>
        </div>
      </section>

      {/* ── 2. METADATA + CTAs ── */}
      <section style={{
        textAlign: 'center', padding: '24px 24px 28px',
        borderBottom: '1px solid #E8E4DE', background: '#FFFFFF',
      }}>
        <p style={{
          fontFamily: "'DM Sans', sans-serif", fontSize: 10, fontWeight: 500,
          textTransform: 'uppercase', letterSpacing: '0.12em',
          color: '#999', margin: '0 0 4px',
        }}>
          Wine Spectator · Napa Valley Guide
        </p>
        <p style={{
          fontFamily: "'DM Sans', sans-serif", fontSize: 10,
          textTransform: 'uppercase', letterSpacing: '0.08em',
          color: '#999', margin: '0 0 18px',
        }}>
          {data.tagline} · By {data.author}
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 10 }}>
          <Link href="/map" style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: 10, fontWeight: 600,
            textTransform: 'uppercase', letterSpacing: '0.1em',
            color: '#FFFFFF', background: '#0D0B09', padding: '12px 24px',
            textDecoration: 'none',
          }}>Explore the Map</Link>
          <Link href="#listings" style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: 10, fontWeight: 600,
            textTransform: 'uppercase', letterSpacing: '0.1em',
            color: '#0D0B09', border: '1px solid #CCC', padding: '12px 24px',
            textDecoration: 'none',
          }}>Read More</Link>
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

      {/* ── 4. BODY — text + photos alternating ── */}
      <section style={{
        padding: '0 clamp(24px, 6vw, 100px) 64px',
        background: '#FFFFFF', maxWidth: 1100,
        marginLeft: 'auto', marginRight: 'auto',
      }}>
        {/* Text left, photo right */}
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr',
          gap: 40, marginBottom: 48, alignItems: 'start',
        }}>
          <div>
            {editorialParagraphs.slice(0, 2).map((p, i) => (
              <p key={i} style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 300,
                color: 'rgba(13,11,9,0.65)', lineHeight: 1.85, marginBottom: 22,
              }}>{p}</p>
            ))}
          </div>
          <div style={{ position: 'relative', aspectRatio: '3/4', overflow: 'hidden' }}>
            <Image src={data.wineries[0]?.images[0] || data.heroImage} alt="" fill sizes="50vw" style={{ objectFit: 'cover' }} />
          </div>
        </div>

        {/* Photo left, text right */}
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr',
          gap: 40, marginBottom: 48, alignItems: 'start',
        }}>
          <div style={{ position: 'relative', aspectRatio: '4/3', overflow: 'hidden' }}>
            <Image src={data.restaurants[0]?.images[0] || data.heroImage} alt="" fill sizes="50vw" style={{ objectFit: 'cover' }} />
          </div>
          <div>
            {editorialParagraphs.slice(2, 4).map((p, i) => (
              <p key={i} style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 300,
                color: 'rgba(13,11,9,0.65)', lineHeight: 1.85, marginBottom: 22,
              }}>{p}</p>
            ))}
          </div>
        </div>

        {/* CTAs */}
        <div style={{ display: 'flex', gap: 10 }}>
          <Link href="/map" style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: 10, fontWeight: 600,
            textTransform: 'uppercase', letterSpacing: '0.1em',
            color: '#FFFFFF', background: '#0D0B09', padding: '14px 28px',
            textDecoration: 'none',
          }}>Explore the Map</Link>
          <Link href="/regions" style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: 10, fontWeight: 600,
            textTransform: 'uppercase', letterSpacing: '0.1em',
            color: '#0D0B09', border: '1px solid #CCC', padding: '14px 28px',
            textDecoration: 'none',
          }}>Explore Another Region</Link>
        </div>
      </section>

      {/* ── 5. LISTINGS — light gray, therealhotels rows ── */}
      <section id="listings" style={{ background: '#F5F3EE', padding: '56px clamp(24px, 5vw, 80px)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>

          {/* WHERE TO TASTE */}
          {data.wineries.length > 0 && (
            <div style={{ marginBottom: 48 }}>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#999', margin: '0 0 8px' }}>
                ◆ Where to Taste in {data.name}
              </p>
              {data.wineries.map((w) => (
                <ListingRow key={w.slug} name={w.name} subtitle={w.address} excerpt={w.excerpt} image={w.images[0]} href={`/wineries/${w.slug}`} ctaLabel="Reserve" />
              ))}
            </div>
          )}

          {/* WHERE TO EAT */}
          {data.restaurants.length > 0 && (
            <div style={{ marginBottom: 48 }}>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#999', margin: '0 0 8px' }}>
                ◆ Where to Eat in {data.name}
              </p>
              {data.restaurants.map((r) => (
                <ListingRow key={r.slug} name={r.name} subtitle={`${r.cuisine} · ${r.priceRange}`} excerpt={r.excerpt} image={r.images[0]} href={`/dining/${r.slug}`} ctaLabel="Reserve" />
              ))}
            </div>
          )}

          {/* WHERE TO STAY */}
          {data.hotels.length > 0 && (
            <div style={{ marginBottom: 48 }}>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#999', margin: '0 0 8px' }}>
                ◆ Where to Stay in {data.name}
              </p>
              {data.hotels.map((h) => (
                <ListingRow key={h.slug} name={h.name} subtitle={`${h.category} · ${h.priceRange}`} excerpt={h.excerpt} image={h.images[0]} href={`/stay/${h.slug}`} ctaLabel="Book Now" />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── 6. NEWSLETTER + FOOTER ── */}
      <Newsletter />
      <Footer />
    </div>
  );
}
