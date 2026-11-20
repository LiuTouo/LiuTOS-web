import { useCallback, useEffect, useState } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SiteProvider, useSite } from './site.jsx'
import { setLenis } from './lib/scroll.js'
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
    history.scrollRestoration = 'manual'
    if (window.location.hash) {
      history.replaceState(null, '', window.location.pathname + window.location.search)
    }
    let interacted = false
    const mark = () => {
      interacted = true
    }
    const toTop = () => {
      if (!interacted) window.scrollTo(0, 0)
    }
    ;['wheel', 'touchstart', 'keydown', 'pointerdown', 'mousedown'].forEach((name) =>
      window.addEventListener(name, mark, { once: true, passive: true })
    )
    toTop()
    const timers = [180, 500, 1400, 2600].map((ms) => setTimeout(toTop, ms))
    window.addEventListener('load', toTop)
    return () => {
      timers.forEach(clearTimeout)
      window.removeEventListener('load', toTop)
    }
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
    const lenis = new Lenis({ duration: 1.05, wheelMultiplier: 1.28, touchMultiplier: 1.5, anchors: true })
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
