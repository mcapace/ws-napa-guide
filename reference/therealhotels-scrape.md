# therealhotels.com - Full Technical Scrape
# Scraped April 3, 2026 for ws-napa-guide reference

---

## 1. CSS CUSTOM PROPERTIES

```css
:root {
  --column-count: 12;
  --grid-main: repeat(12, minmax(0, 1fr));
  --grid-gap-total: calc(...);
  --max-width--main: /* Webflow dynamic */;
  --padding-horizontal--main: 3rem; /* desktop */
  --padding-vertical--none: 0;
  --padding-vertical--small: /* ~24px */;
  --padding-vertical--main: /* ~48px */;
  --padding-vertical--large: /* ~80px+ */;

  /* Sizing scale (desktop) */
  --size--2rem: 2rem;
  --size--2-5rem: 2.5rem;
  --size--3rem: 3rem;
  --size--3-5rem: 3.5rem;
  --size--4rem: 4rem;
  --size--4-5rem: 4.5rem;
  --size--5rem: 5rem;
  /* up to --size--16rem */

  /* Theme (actual hex values injected by Webflow, not in source) */
  --swatch--dark: /* near-black */;
  --swatch--light: /* off-white/cream */;
  --swatch--brand: /* accent for ::selection */;

  --theme--background: var(--swatch--dark);
  --theme--text: var(--swatch--light);
  --button--background: var(--swatch--light);
  --button--text: var(--swatch--dark);
}

/* Responsive breakpoints */
@media (max-width: 991px) {
  --padding-horizontal--main: 2rem;
  --size--2rem: 1.75rem;
  --size--3rem: 2.52rem;
  --size--4rem: 3rem;
  --size--5rem: 3.75rem;
}
@media (max-width: 767px) {
  --padding-horizontal--main: 1rem;
  --size--3rem: 2.25rem;
  --size--4rem: 2.5rem;
}
```

## 2. FLUID TYPOGRAPHY

```css
html {
  font-size: calc(0.625rem + 0.41666vw);          /* 1920px+ */
}
@media (max-width: 1920px) {
  html { font-size: calc(0.625rem + 0.41666vw); }
}
@media (max-width: 1440px) {
  html { font-size: calc(0.8125rem + 0.2083vw); }
}
@media (max-width: 479px) {
  html { font-size: calc(0.75rem + 0.8333vw); }
}
```

## 3. RESET / BASE STYLES

```css
body {
  font-weight: var(--text-main--font-weight);
  text-transform: var(--text-main--text-transform);
  -webkit-font-smoothing: antialiased;
}

h1, h2, h3, h4, h5, h6, label, blockquote {
  font-size: inherit;
  line-height: inherit;
  font-weight: inherit;
  margin: 0;
}

p { margin: 0; }

button {
  background-color: unset;
  padding: unset;
  text-align: inherit;
  cursor: pointer;
}

video { width: 100%; object-fit: cover; }
svg { display: block; }
```

## 4. THEME SYSTEM

```css
/* Default = dark */
:root, [data-theme="dark"], [data-theme="invert"] {
  --theme--background: var(--swatch--dark);
  --theme--text: var(--swatch--light);
  --button--background: var(--swatch--light);
  --button--text: var(--swatch--dark);
}

[data-theme="light"], [data-theme="dark"] [data-theme="invert"] {
  --theme--background: var(--swatch--light);
  --theme--text: var(--swatch--dark);
  --button--background: var(--swatch--dark);
  --button--text: var(--swatch--light);
}

::selection { background: var(--swatch--brand); }
```

## 5. SPACING SYSTEM (data-attributes)

```css
[data-padding-top="none"]  { padding-top: var(--padding-vertical--none); }
[data-padding-top="small"] { padding-top: var(--padding-vertical--small); }
[data-padding-top="main"]  { padding-top: var(--padding-vertical--main); }
[data-padding-top="large"] { padding-top: var(--padding-vertical--large); }
/* same for data-padding-bottom */
```

## 6. COMPONENT STYLES

### Hero
```css
.hero_home_wrap { opacity: 0; }  /* fades in via JS */
.nav_wrap { opacity: 0; }       /* fades in via JS */
```

### Series/Browse cards
```css
.series_visual, .series_sticker { visibility: hidden; } /* animated in */

/* Sticker rotation per nth-child */
.series_title_item:nth-child(4n+1) .series_sticker {
  left: auto; top: 10%; right: 8%; bottom: auto;
  transform: rotate(8deg);
}
.series_title_item:nth-child(4n+2) .series_sticker {
  left: 12%; top: auto; right: auto; bottom: 10%;
  transform: rotate(-8deg);
}
.series_title_item:nth-child(4n+3) .series_sticker {
  left: auto; top: auto; right: 10%; bottom: 10%;
  transform: rotate(-8deg);
}
.series_title_item:nth-child(4n+4) .series_sticker {
  left: 25%; top: 10%; right: auto; bottom: auto;
  transform: rotate(8deg);
}
```

### Hover patterns (SIGNATURE INTERACTION)
```css
/* Nav: hover one item, all others dim to 0.2 */
.nav_menu_list:has(.nav_menu_list_item:hover)
  .nav_menu_list_item:not(:hover) {
  opacity: 0.2;
}

/* Series grid: same pattern */
@media (min-width: 992px) {
  .series_title_list:has(.series_title_link:hover)
    .series_title_link:not(:hover) {
    opacity: 0.2;
  }
}
```

### Text animation masks
```css
.line { display: block; }
.line-mask {
  overflow: hidden;
  display: block;
  width: 100%;
  position: relative;
  padding-bottom: 0.1em;
  margin-bottom: -0.1em;
}

/* Text starts hidden, GSAP makes visible */
html:not(.w-editor) [data-text-split] {
  visibility: hidden;
}
```

### Smooth scroll (Lenis)
```css
html.lenis, html.lenis body { height: auto; }
.lenis.lenis-smooth { scroll-behavior: auto !important; }
.lenis.lenis-stopped { overflow: hidden; }
```

## 7. GSAP ANIMATIONS (EXACT CODE)

```javascript
gsap.registerPlugin(ScrollTrigger, SplitText);
let animationTriggers = [];

function initAnimations() {
  animationTriggers.forEach(t => t.kill());
  animationTriggers = [];

  // Split all text elements marked with data-text-split
  document.querySelectorAll("[data-text-split]").forEach(el => {
    if (el._split) el._split.revert();
    el._split = new SplitText(el, {
      type: "lines, words, chars",
      linesClass: "line",
      wordsClass: "word",
      charsClass: "char"
    });
  });

  // ANIMATION 1: Letters Rotate In
  // Used on: hero headline, large display text
  document.querySelectorAll("[data-letters-rotate-in]").forEach(el => {
    const chars = el._split.chars;
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: "top bottom",
        end: "top 80%",
        toggleActions: "none play none reset"
      }
    });
    tl.set(el, { visibility: "visible" })
      .from(chars, {
        opacity: 0,
        yPercent: 60,
        rotationX: -90,
        duration: 0.5,
        ease: "power1.inOut",
        stagger: { amount: 0.5, from: 0 }
      });
    animationTriggers.push(tl.scrollTrigger);
  });

  // ANIMATION 2: Lines Slide Up
  // Used on: body text, descriptions, metadata
  document.querySelectorAll("[data-lines-slide-up]").forEach(el => {
    const lines = el._split.lines;
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: "top bottom",
        end: "top 80%",
        toggleActions: "none play none reset"
      }
    });
    tl.set(el, { visibility: "visible" })
      .from(lines, {
        opacity: 0,
        yPercent: 100,
        duration: 0.5,
        ease: "power2.out",
        stagger: { amount: 0.1 }
      });
    animationTriggers.push(tl.scrollTrigger);
  });

  // ANIMATION 3: Letters Slide Up
  // Used on: CTAs, smaller text elements
  document.querySelectorAll("[data-letters-slide-up]").forEach(el => {
    const chars = el._split.chars;
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: "top bottom",
        end: "top 80%",
        toggleActions: "none play none reset"
      }
    });
    tl.set(el, { visibility: "visible" })
      .from(chars, {
        opacity: 0,
        yPercent: 100,
        duration: 0.5,
        ease: "back.out",
        stagger: 0.1
      });
    animationTriggers.push(tl.scrollTrigger);
  });
}
```

## 8. HOMEPAGE HTML STRUCTURE

```
HERO SECTION (.hero_home_wrap, opacity: 0 initially)
├── 4 scattered image containers
│   ├── img Hero Visual.avif
│   ├── img Hero Visual-1.avif
│   ├── img Hero Visual-2.avif
│   └── img Hero Visual-3.avif
├── h1 "Money can't buy you class, but it can buy you a vacation."
│   [data-text-split] [data-letters-rotate-in]
├── p "Check in to the iconic hotels and resorts..."
│   [data-text-split] [data-lines-slide-up]
└── a "explore the map" → /map

BROWSE BY SERIES
├── h2 "browse hotels by your favorite series"
│   [data-text-split] [data-lines-slide-up]
└── div.series_title_list (grid, dim-siblings hover)
    ├── a.series_title_link → Orange County (img + sticker + label)
    ├── a.series_title_link → New York
    ├── a.series_title_link → Atlanta
    └── ... (11 total)

FEATURED HOTEL ROW 1
├── article (full-width split: ~60% image / ~40% text)
│   ├── div (image side)
│   │   └── img [hotel photo]
│   └── div (text side)
│       ├── p.eyebrow "Real Housewives of Potomac"
│       │   [data-text-split] [data-lines-slide-up]
│       ├── p "season 10 | episode(s) 13-16"
│       ├── h2 "The Four Seasons Denver"
│       │   [data-text-split] [data-letters-rotate-in]
│       ├── p "Denver, CO"
│       ├── p [narrative description]
│       │   [data-text-split] [data-lines-slide-up]
│       └── a "Learn more" → /hotels/the-four-seasons-denver

FEATURED HOTEL ROW 2 (alternating image side)
└── ... same structure

FEATURED HOTEL ROW 3
└── ... same structure

NEWSLETTER
├── h2 "Stay in the know"
├── p "Be the first to know..."
└── form (email input + submit + terms checkbox)

FOOTER
├── nav (Map, Series, About, Submit, Press, Contact)
├── nav (Facebook, Instagram, 1AX Consulting)
└── p "This site features affiliate links..."
```

## 9. DETAIL PAGE HTML STRUCTURE

```
HERO (.hotel_hero_wrap, opacity: 0 initially)
├── img [hero photo 1]
├── img [hero photo 2]
└── img [hero photo 3]

TITLE SECTION
├── h1 "The Four Seasons Denver"
│   [data-text-split] [data-letters-rotate-in]
├── p "Denver, CO"
│   [data-text-split] [data-lines-slide-up]
├── p "Real Housewives of Potomac"
├── p "season 10 | episode(s) 13-16"
├── a "Book now" → expedia affiliate
└── a "Read more" → #intro

CONTENT FLOW (text + photos interspersed)
├── img [photo RHOP_1.avif]
├── p [description paragraph 1]
│   [data-text-split] [data-lines-slide-up]
├── img [photo RHOP_2.avif]
├── p [description paragraph 2]
│   [data-text-split] [data-lines-slide-up]
├── img [photo RHOP_3.avif]
└── p [description paragraph 3]

MORE FROM THIS SERIES
├── h2 "more from this series"
└── div.series_title_list (3-4 column grid)
    ├── card (img + name + location + season + excerpt + book now)
    └── ... (10+ cards with "Show more" pagination)

NEWSLETTER + FOOTER (same as homepage)
```

## 10. KEY DESIGN PATTERNS SUMMARY

1. **Dark by default** - everything on near-black, off-white text
2. **Text starts hidden** - visibility:hidden, GSAP animates in on scroll
3. **Three animation types**: letters-rotate-in (hero), lines-slide-up (body), letters-slide-up (CTAs)
4. **Dim siblings hover** - non-hovered items fade to opacity 0.2
5. **No borders on images** - images float on darkness
6. **Fluid typography** - calc(0.625rem + 0.4167vw) base
7. **12-column grid** with 3rem horizontal padding
8. **Sections flow together** - separated by padding vars, not visual dividers
9. **60/40 image-text split** on editorial rows
10. **Photos interspersed with text** on detail pages, not grouped
11. **Sticker/badge rotation** - alternating 8deg/-8deg per nth-child
12. **Button pattern** - light bg on dark, dark text (inverted on light)
13. **Lenis smooth scrolling** on scroll behavior
