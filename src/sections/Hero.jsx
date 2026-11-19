import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { useSite } from '../site.jsx'
import { useReducedMotion } from '../lib/useMedia.js'

gsap.registerPlugin(ScrollTrigger)

export default function Hero({ delay = 0.1 }) {
  const { t } = useSite()
  const root = useRef(null)
  const reduced = useReducedMotion()
  const lines = t.hero.log

  useGSAP(
    () => {
      if (reduced) return
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' }, delay })
      tl.from('.hero-kicker', { opacity: 0, y: 10, duration: 0.5 })
        .from(
          '.hero h1 .ch',
          { yPercent: 118, duration: 1.1, stagger: 0.035, ease: 'power4.out' },
          0.08
        )
        .from('.hero-lead', { opacity: 0, y: 16, duration: 0.8 }, 0.6)
        .from('.hero-stats div', { opacity: 0, y: 12, duration: 0.7, stagger: 0.06 }, 0.72)
        .from('.hero-log', { opacity: 0, duration: 1.1 }, 0.4)

      tl.from(
        '.hero-log-track span',
        { opacity: 0, x: 10, duration: 0.5, stagger: 0.018, ease: 'power2.out' },
        0.5
      )

      gsap.to('.hero-log', {
        yPercent: -14,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: 0.6 }
      })
      gsap.to('.hero h1', {
        yPercent: 12,
        opacity: 0.35,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: 0.5 }
      })
    },
    { scope: root, dependencies: [reduced, delay] }
  )

  return (
    <section className="hero" id="top" ref={root}>
      <div className="wrap hero-wrap">
        <div className="hero-inner">
          <div>
            <p className="hero-kicker mono">
              <span className="dot" aria-hidden="true" />
              {t.hero.kicker}
            </p>
            <h1>
              {t.hero.title.map((line, i) => (
                <span className="line" key={i}>
                  {[...line].map((ch, j) => (
                    <span className="ch" key={j}>
                      {ch === ' ' ? '\u00A0' : ch}
                    </span>
                  ))}
                </span>
              ))}
            </h1>
            <p className="hero-lead">{t.hero.lead}</p>
          </div>
          <div className="hero-log" aria-hidden="true">
            <div className="hero-log-track">
              {lines.map((line, i) => (
                <span key={i}>{line}</span>
              ))}
            </div>
          </div>
        </div>
        <div className="hero-stats">
          {t.hero.stats.map((s) => (
            <div key={s.k}>
              <span className="v">{s.v}</span>
              <span className="k">{s.k}</span>
            </div>
          ))}
        </div>
        <div className="hero-scroll mono">
          <span className="chev" aria-hidden="true">
            »
          </span>
          {t.hero.scroll}
        </div>
      </div>
    </section>
  )
}
