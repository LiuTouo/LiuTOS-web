import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { useSite } from '../site.jsx'
import { useReducedMotion } from '../lib/useMedia.js'

export default function Hero() {
  const { t } = useSite()
  const root = useRef(null)
  const reduced = useReducedMotion()
  const lines = [...t.hero.log, ...t.hero.log]

  useGSAP(
    () => {
      if (reduced) return
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.from('.hero-kicker', { opacity: 0, y: 12, duration: 0.6 })
        .from('.hero h1 .line > span', { yPercent: 112, duration: 1.05, stagger: 0.09 }, 0.1)
        .from('.hero-lead', { opacity: 0, y: 18, duration: 0.8 }, 0.55)
        .from('.hero-stats div', { opacity: 0, y: 14, duration: 0.7, stagger: 0.07 }, 0.7)
        .from('.hero-log', { opacity: 0, duration: 1.1 }, 0.3)

      gsap.to('.hero-log-track', {
        yPercent: -50,
        duration: 34,
        ease: 'none',
        repeat: -1
      })
    },
    { scope: root, dependencies: [reduced] }
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
                  <span>{line}</span>
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
