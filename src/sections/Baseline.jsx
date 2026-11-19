import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { useSite } from '../site.jsx'
import { useReducedMotion } from '../lib/useMedia.js'

gsap.registerPlugin(ScrollTrigger)

export default function Baseline() {
  const { t } = useSite()
  const list = useRef(null)
  const reduced = useReducedMotion()
  const c = t.baseline

  useGSAP(
    () => {
      if (reduced) {
        gsap.set(list.current, { '--draw': 1 })
        return
      }
      gsap.fromTo(
        list.current,
        { '--draw': 0 },
        {
          '--draw': 1,
          ease: 'none',
          scrollTrigger: {
            trigger: list.current,
            start: 'top 78%',
            end: 'bottom 62%',
            scrub: true
          }
        }
      )
    },
    { scope: list, dependencies: [reduced] }
  )

  return (
    <section className="section" id="baseline">
      <div className="wrap">
        <div className="sec-head">
          <h2>
            <span className="idx mono">01 / BASELINE</span>
            <br />
            {c.title}
          </h2>
          <p>{c.lead}</p>
        </div>
        <div className="baseline-legend mono">
          <span>{c.colA}</span>
          <span style={{ color: 'var(--mint)' }}>{c.colB}</span>
        </div>
        <div className="baseline-list" ref={list}>
          {c.rows.map((row) => (
            <div className="baseline-row" key={row.name}>
              <span className="name">{row.name}</span>
              <span className="a">{row.a}</span>
              <span className="b">{row.b}</span>
            </div>
          ))}
        </div>
        <p className="baseline-note mono">{c.note}</p>
      </div>
    </section>
  )
}
