'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(ScrollTrigger, SplitText)

type RegionScrollEnhancementsProps = {
  enabled: boolean
}

function splitWordsSafe(
  el: HTMLElement,
  splits: SplitText[],
): SplitText | null {
  try {
    const split = new SplitText(el, {
      type: 'words',
      wordsClass: 'region-enhanced-word',
    })
    splits.push(split)
    return split
  } catch {
    return null
  }
}

function panelPastShowcaseTrigger(panel: HTMLElement, ratio: number): boolean {
  return panel.getBoundingClientRect().top < window.innerHeight * ratio
}

export function RegionScrollEnhancements({ enabled }: RegionScrollEnhancementsProps) {
  const splitsRef = useRef<SplitText[]>([])
  const triggersRef = useRef<ScrollTrigger[]>([])

  useEffect(() => {
    if (!enabled || typeof window === 'undefined') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const frame = document.querySelector('[data-region-enhanced]')
    if (!frame) return

    const splits = splitsRef.current
    const triggers = triggersRef.current

    const pushTrigger = (st: ScrollTrigger | undefined | null) => {
      if (st) triggers.push(st)
    }

    const hero = frame.querySelector<HTMLElement>('[data-hero-parallax-wrap]')
    const heroMedia = frame.querySelector<HTMLElement>('[data-hero-parallax]')
    const heroTitle = frame.querySelector<HTMLElement>('[data-hero-title]')
    const heroDeck = frame.querySelector<HTMLElement>('[data-hero-deck]')

    if (hero && heroMedia) {
      const st = ScrollTrigger.create({
        trigger: hero,
        start: 'top top',
        end: 'bottom top',
        scrub: 0.85,
      })
      gsap.fromTo(
        heroMedia,
        { yPercent: 0, scale: 1 },
        {
          yPercent: 14,
          scale: 1.1,
          ease: 'none',
          scrollTrigger: st,
        },
      )
      pushTrigger(st)
    }

    if (heroTitle) {
      const split = splitWordsSafe(heroTitle, splits)
      gsap.set(heroTitle, { visibility: 'visible' })
      if (split?.words?.length) {
        gsap.from(split.words, {
          opacity: 0,
          yPercent: 55,
          duration: 0.85,
          stagger: 0.045,
          delay: 0.15,
          ease: 'power3.out',
        })
      }
    }

    if (heroDeck) {
      gsap.set(heroDeck, { visibility: 'visible' })
      gsap.from(heroDeck, {
        opacity: 0,
        y: 18,
        duration: 0.75,
        delay: 0.55,
        ease: 'power2.out',
      })
    }

    frame.querySelectorAll<HTMLElement>('[data-showcase-panel]').forEach((panel) => {
      const media = panel.querySelector<HTMLElement>('[data-showcase-media]')
      if (media) {
        const st = ScrollTrigger.create({
          trigger: panel,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.9,
        })
        gsap.fromTo(
          media,
          { yPercent: -8, scale: 1.14 },
          { yPercent: 8, scale: 1.04, ease: 'none', scrollTrigger: st },
        )
        pushTrigger(st)
      }

      const name = panel.querySelector<HTMLElement>('[data-showcase-name]')
      if (name) {
        const split = splitWordsSafe(name, splits)
        gsap.set(name, { visibility: 'visible', opacity: 1 })

        if (split?.words?.length) {
          const tl = gsap.timeline({
            paused: true,
            scrollTrigger: {
              trigger: panel,
              start: 'top 72%',
              toggleActions: 'play none none none',
            },
          })
          tl.from(split.words, {
            opacity: 0,
            yPercent: 72,
            rotationX: -32,
            transformOrigin: '50% 100%',
            duration: 0.65,
            stagger: 0.05,
            ease: 'power3.out',
            immediateRender: false,
          })
          pushTrigger(tl.scrollTrigger)
          if (panelPastShowcaseTrigger(panel, 0.72)) {
            tl.progress(1)
          }
        }
      }

      const copy = panel.querySelector<HTMLElement>('[data-showcase-copy]')
      if (copy) {
        gsap.set(copy, { opacity: 1 })

        const tl = gsap.timeline({
          paused: true,
          scrollTrigger: {
            trigger: panel,
            start: 'top 68%',
            toggleActions: 'play none none none',
          },
        })
        tl.from(copy, {
          opacity: 0,
          y: 22,
          duration: 0.55,
          ease: 'power2.out',
          immediateRender: false,
        })
        pushTrigger(tl.scrollTrigger)
        if (panelPastShowcaseTrigger(panel, 0.68)) {
          tl.progress(1)
        }
      }
    })

    frame.querySelectorAll<HTMLElement>('[data-section-divider]').forEach((divider) => {
      const rules = divider.querySelectorAll<HTMLElement>('[data-section-divider-rule]')
      const label = divider.querySelector<HTMLElement>('[data-section-divider-label]')
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: divider,
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
      })
      tl.from(rules, {
        scaleX: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: 'power2.out',
        transformOrigin: 'center center',
      })
      if (label) {
        tl.from(
          label,
          { opacity: 0, y: 8, duration: 0.45, ease: 'power2.out' },
          '-=0.35',
        )
      }
      pushTrigger(tl.scrollTrigger)
    })

    frame.querySelectorAll<HTMLElement>('[data-section-transition]').forEach((el) => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
      })
      tl.from(el.querySelectorAll('[data-section-transition-rule]'), {
        scaleX: 0,
        duration: 0.65,
        stagger: 0.1,
        ease: 'power2.out',
        transformOrigin: 'center center',
      }).from(
        el.querySelector('[data-section-transition-label]'),
        { opacity: 0, y: 10, duration: 0.5, ease: 'power2.out' },
        '-=0.4',
      )
      pushTrigger(tl.scrollTrigger)
    })

    frame.querySelectorAll<HTMLElement>('[data-scroll-marker]').forEach((marker) => {
      const title = marker.querySelector<HTMLElement>('[data-scroll-marker-title]')
      const dek = marker.querySelector<HTMLElement>('[data-scroll-marker-dek]')
      if (!title) return

      const split = splitWordsSafe(title, splits)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: marker,
          start: 'top 82%',
          toggleActions: 'play none none none',
        },
      })
      tl.set(title, { visibility: 'visible' })
      if (split?.words?.length) {
        tl.from(split.words, {
          opacity: 0,
          yPercent: 40,
          duration: 0.55,
          stagger: 0.04,
          ease: 'power2.out',
        })
      }
      if (dek) {
        tl.from(dek, { opacity: 0, y: 14, duration: 0.45, ease: 'power2.out' }, '-=0.25')
      }
      pushTrigger(tl.scrollTrigger)
    })

    const refreshRaf = requestAnimationFrame(() => {
      ScrollTrigger.refresh()
      triggers.forEach((st) => {
        const anim = st.animation as gsap.core.Animation | undefined
        if (anim && st.progress > 0 && anim.progress() === 0) {
          anim.progress(1)
        }
      })
    })

    return () => {
      cancelAnimationFrame(refreshRaf)
      triggers.forEach((t) => t.kill())
      triggers.length = 0
      splits.forEach((s) => s.revert())
      splits.length = 0
    }
  }, [enabled])

  return null
}
