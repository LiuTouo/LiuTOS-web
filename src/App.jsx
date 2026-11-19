import { useCallback, useEffect, useState } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SiteProvider, useSite } from './site.jsx'
import { scrollToY, setLenis } from './lib/scroll.js'
import Boot from './components/Boot.jsx'
import Cursor from './components/Cursor.jsx'
import Motion from './components/Motion.jsx'
import Header from './sections/Header.jsx'
import Hero from './sections/Hero.jsx'
import Baseline from './sections/Baseline.jsx'
import Pipeline from './sections/Pipeline.jsx'
import HandsOff from './sections/HandsOff.jsx'
import Demos from './sections/Demos.jsx'
import Hardware from './sections/Hardware.jsx'
import Addons from './sections/Addons.jsx'
import Pricing from './sections/Pricing.jsx'
import Booking from './sections/Booking.jsx'
import Footer from './sections/Footer.jsx'
import TicketBar from './sections/TicketBar.jsx'

gsap.registerPlugin(ScrollTrigger)

function Shell() {
  const { lang } = useSite()
  const [booted, setBooted] = useState(() => {
    try {
      return sessionStorage.getItem('liutos-booted') === '1'
    } catch {
      return true
    }
  })
  const onBootDone = useCallback(() => setBooted(true), [])

  useEffect(() => {
    const id = window.location.hash.slice(1)
    if (!id) return
    const t = setTimeout(() => {
      const target = document.getElementById(id)
      if (target) scrollToY(target.getBoundingClientRect().top + window.scrollY - 20)
    }, 260)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    if (booted) {
      document.body.classList.remove('is-booting')
      requestAnimationFrame(() => window.dispatchEvent(new Event('liutos:refresh')))
      return
    }
    document.body.classList.add('is-booting')
    const t = setTimeout(onBootDone, 2400)
    return () => clearTimeout(t)
  }, [booted, onBootDone])

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    const wide = window.matchMedia('(min-width: 900px)').matches
    if (!fine || !wide) {
      setLenis(null)
      return
    }
    const lenis = new Lenis({ duration: 1.35, wheelMultiplier: 0.92, touchMultiplier: 1.2, anchors: true })
    setLenis(lenis)
    lenis.on('scroll', ScrollTrigger.update)
    let raf = 0
    const loop = (time) => {
      lenis.raf(time)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => {
      cancelAnimationFrame(raf)
      lenis.destroy()
      setLenis(null)
    }
  }, [])

  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh()
    if (document.fonts?.ready) document.fonts.ready.then(refresh)
    window.addEventListener('load', refresh)
    return () => window.removeEventListener('load', refresh)
  }, [])

  return (
    <>
      <a className="skip" href="#pipeline">
        {lang === 'en' ? 'Skip to content' : '跳到內容'}
      </a>
      <Boot onDone={onBootDone} />
      <Motion />
      <Cursor />
      <Header />
      <main>
        <Hero delay={booted ? 0.1 : 0.75} />
        <Baseline />
        <Pipeline />
        <HandsOff />
        <Demos />
        <Hardware />
        <Addons />
        <Pricing />
        <Booking />
      </main>
      <Footer />
      <TicketBar />
    </>
  )
}

export default function App() {
  return (
    <SiteProvider>
      <Shell />
    </SiteProvider>
  )
}
