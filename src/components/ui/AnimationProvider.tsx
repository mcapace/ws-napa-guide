'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import Lenis from 'lenis'
import { LenisContext } from '@/lib/smooth-scroll'

gsap.registerPlugin(ScrollTrigger, SplitText)

/**
 * Initializes the therealhotels-style animation system:
 * - Lenis smooth scrolling
 * - SplitText on all [data-text-split] elements
 * - [data-letters-rotate-in]: chars rotate from -90deg (headlines)
 * - [data-lines-slide-up]: lines slide from yPercent:100 (body text)
 * - [data-letters-slide-up]: chars slide up with back.out ease (CTAs)
 */
export default function AnimationProvider({ children }: { children?: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)
  const triggersRef = useRef<ScrollTrigger[]>([])
  const [lenis, setLenis] = useState<Lenis | null>(null)

  useEffect(() => {
    const lenisInstance = new Lenis({
      lerp: 0.08,
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })
    lenisRef.current = lenisInstance
    setLenis(lenisInstance)

    const lenisRaf = (time: number) => {
      lenisInstance.raf(time * 1000)
    }
    gsap.ticker.add(lenisRaf)
    gsap.ticker.lagSmoothing(0)

    lenisInstance.on('scroll', ScrollTrigger.update)

    initAnimations()

    return () => {
      gsap.ticker.remove(lenisRaf)
      triggersRef.current.forEach((t) => t.kill())
      triggersRef.current = []
      lenisInstance.destroy()
      lenisRef.current = null
      setLenis(null)
    }
  }, [])

  function initAnimations() {
    triggersRef.current.forEach((t) => t.kill())
    triggersRef.current = []

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

    document.querySelectorAll<HTMLElement>('[data-image-reveal]').forEach((el) => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: 'top bottom',
          end: 'top 60%',
          toggleActions: 'none play none reset',
        },
      })
      tl.fromTo(
        el,
        { clipPath: 'inset(0% 100% 0% 0%)' },
        { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.8, ease: 'power2.out' },
      )
      const img = el.querySelector('img')
      if (img) {
        tl.fromTo(img, { scale: 1.3 }, { scale: 1, duration: 1.2, ease: 'power2.out' }, '<')
      }
      if (tl.scrollTrigger) triggersRef.current.push(tl.scrollTrigger)
    })

    document.querySelectorAll<HTMLElement>('[data-image-scale]').forEach((el) => {
      const trigger = ScrollTrigger.create({
        trigger: el,
        start: 'top bottom',
        end: 'top 20%',
        scrub: 1,
      })
      gsap.fromTo(el, { scale: 1.3 }, {
        scale: 1,
        ease: 'none',
        scrollTrigger: trigger,
      })
      triggersRef.current.push(trigger)
    })

    const pinSections = document.querySelectorAll<HTMLElement>('[data-pin-section]')
    pinSections.forEach((el, i) => {
      if (i >= pinSections.length - 1) return
      const st = ScrollTrigger.create({
        trigger: el,
        start: 'top top',
        end: 'bottom top',
        pin: true,
        pinSpacing: false,
      })
      triggersRef.current.push(st)
    })
  }

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
}
