'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

type PartnerScrollEnhancementsProps = {
  bookHref: string
}

export function PartnerScrollEnhancements({ bookHref }: PartnerScrollEnhancementsProps) {
  const triggersRef = useRef<ScrollTrigger[]>([])

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const root = document.querySelector('[data-partner-page]')
    if (!root) return

    const triggers = triggersRef.current

    const hero = root.querySelector<HTMLElement>('[data-partner-hero]')
    const heroMedia = root.querySelector<HTMLElement>('[data-partner-hero-media]')
    const heroContent = root.querySelector<HTMLElement>('[data-partner-hero-content]')
    const stickyBar = root.querySelector<HTMLElement>('[data-partner-sticky-book]')

    if (hero && heroMedia) {
      const st = ScrollTrigger.create({
        trigger: hero,
        start: 'top top',
        end: 'bottom top',
        scrub: 0.85,
      })
      gsap.fromTo(
        heroMedia,
        { yPercent: 0, scale: 1.06 },
        { yPercent: 10, scale: 1, ease: 'none', scrollTrigger: st },
      )
      triggers.push(st)
    }

    if (heroContent) {
      gsap.from(heroContent.children, {
        opacity: 0,
        y: 28,
        duration: 0.9,
        stagger: 0.12,
        delay: 0.15,
        ease: 'power3.out',
      })
    }

    if (hero && stickyBar) {
      const st = ScrollTrigger.create({
        trigger: hero,
        start: 'bottom 80%',
        onEnter: () => stickyBar.setAttribute('data-visible', 'true'),
        onLeaveBack: () => stickyBar.removeAttribute('data-visible'),
      })
      triggers.push(st)
    }

    root.querySelectorAll<HTMLElement>('[data-partner-reveal]').forEach((el) => {
      const st = ScrollTrigger.create({
        trigger: el,
        start: 'top 88%',
        once: true,
      })
      gsap.fromTo(
        el,
        { opacity: 0, y: 32 },
        { opacity: 1, y: 0, duration: 0.75, ease: 'power2.out', scrollTrigger: st },
      )
      triggers.push(st)
    })

    root.querySelectorAll<HTMLElement>('[data-partner-image-reveal]').forEach((el) => {
      const img = el.querySelector('img')
      const st = ScrollTrigger.create({
        trigger: el,
        start: 'top 85%',
        once: true,
      })
      gsap.fromTo(el, { clipPath: 'inset(100% 0% 0% 0%)' }, {
        clipPath: 'inset(0% 0% 0% 0%)',
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: st,
      })
      if (img) {
        gsap.fromTo(img, { scale: 1.12 }, { scale: 1, duration: 1.2, ease: 'power2.out', scrollTrigger: st })
      }
      triggers.push(st)
    })

    root.querySelectorAll<HTMLElement>('[data-partner-bento-cell]').forEach((el, i) => {
      const st = ScrollTrigger.create({
        trigger: el.closest('[data-partner-bento]') ?? el,
        start: 'top 82%',
        once: true,
      })
      gsap.fromTo(
        el,
        { opacity: 0, y: 24, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.65,
          delay: i * 0.08,
          ease: 'power2.out',
          scrollTrigger: st,
        },
      )
      triggers.push(st)
    })

    root.querySelectorAll<HTMLElement>('[data-partner-experience]').forEach((el, i) => {
      const st = ScrollTrigger.create({
        trigger: el,
        start: 'top 92%',
        once: true,
      })
      gsap.fromTo(
        el,
        { opacity: 0, x: -12 },
        { opacity: 1, x: 0, duration: 0.55, delay: (i % 4) * 0.06, ease: 'power2.out', scrollTrigger: st },
      )
      triggers.push(st)
    })

    const bookBand = root.querySelector<HTMLElement>('[data-partner-book-band]')
    if (bookBand) {
      const st = ScrollTrigger.create({
        trigger: bookBand,
        start: 'top 85%',
        once: true,
      })
      gsap.fromTo(
        bookBand,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', scrollTrigger: st },
      )
      triggers.push(st)
    }

    requestAnimationFrame(() => ScrollTrigger.refresh())

    return () => {
      triggers.forEach((t) => t.kill())
      triggersRef.current = []
    }
  }, [bookHref])

  return null
}
