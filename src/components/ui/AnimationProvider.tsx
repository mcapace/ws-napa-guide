'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger, SplitText)

/**
 * Initializes the therealhotels-style animation system:
 * - Lenis smooth scrolling
 * - SplitText on all [data-text-split] elements
 * - [data-letters-rotate-in]: chars rotate from -90deg (headlines)
 * - [data-lines-slide-up]: lines slide from yPercent:100 (body text)
 * - [data-letters-slide-up]: chars slide up with back.out ease (CTAs)
 *
 * Place <AnimationProvider /> once in layout.tsx or page root.
 */
export default function AnimationProvider() {
  const lenisRef = useRef<Lenis | null>(null)
  const triggersRef = useRef<ScrollTrigger[]>([])

  useEffect(() => {
    // ── Lenis smooth scroll ──
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })
    lenisRef.current = lenis

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    // Connect Lenis to GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add((time) => lenis.raf(time * 1000))
    gsap.ticker.lagSmoothing(0)

    // ── Initialize text animations ──
    initAnimations()

    return () => {
      triggersRef.current.forEach((t) => t.kill())
      triggersRef.current = []
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  function initAnimations() {
    // Kill old triggers
    triggersRef.current.forEach((t) => t.kill())
    triggersRef.current = []

    // Split text on all marked elements
    document.querySelectorAll<HTMLElement>('[data-text-split]').forEach((el) => {
      const existing = (el as unknown as { _split?: SplitText })._split
      if (existing) existing.revert()
      ;(el as unknown as { _split: SplitText })._split = new SplitText(el, {
        type: 'lines,words,chars',
        linesClass: 'line',
        wordsClass: 'word',
        charsClass: 'char',
      })
    })

    // ANIMATION 1: Letters Rotate In
    // Used on: hero headlines, large display text
    document.querySelectorAll<HTMLElement>('[data-letters-rotate-in]').forEach((el) => {
      const split = (el as unknown as { _split?: SplitText })._split
      if (!split) return
      const chars = split.chars
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: 'top bottom',
          end: 'top 80%',
          toggleActions: 'none play none reset',
        },
      })
      tl.set(el, { visibility: 'visible' }).from(chars, {
        opacity: 0,
        yPercent: 60,
        rotationX: -90,
        duration: 0.5,
        ease: 'power1.inOut',
        stagger: { amount: 0.5, from: 0 },
      })
      if (tl.scrollTrigger) triggersRef.current.push(tl.scrollTrigger)
    })

    // ANIMATION 2: Lines Slide Up
    // Used on: body text, descriptions, metadata
    document.querySelectorAll<HTMLElement>('[data-lines-slide-up]').forEach((el) => {
      const split = (el as unknown as { _split?: SplitText })._split
      if (!split) return
      const lines = split.lines
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: 'top bottom',
          end: 'top 80%',
          toggleActions: 'none play none reset',
        },
      })
      tl.set(el, { visibility: 'visible' }).from(lines, {
        opacity: 0,
        yPercent: 100,
        duration: 0.5,
        ease: 'power2.out',
        stagger: { amount: 0.1 },
      })
      if (tl.scrollTrigger) triggersRef.current.push(tl.scrollTrigger)
    })

    // ANIMATION 3: Letters Slide Up
    // Used on: CTAs, smaller text elements
    document.querySelectorAll<HTMLElement>('[data-letters-slide-up]').forEach((el) => {
      const split = (el as unknown as { _split?: SplitText })._split
      if (!split) return
      const chars = split.chars
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: 'top bottom',
          end: 'top 80%',
          toggleActions: 'none play none reset',
        },
      })
      tl.set(el, { visibility: 'visible' }).from(chars, {
        opacity: 0,
        yPercent: 100,
        duration: 0.5,
        ease: 'back.out',
        stagger: 0.1,
      })
      if (tl.scrollTrigger) triggersRef.current.push(tl.scrollTrigger)
    })
  }

  return null // No DOM output, just initializes animations
}
