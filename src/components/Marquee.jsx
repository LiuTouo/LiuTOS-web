import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { useReducedMotion } from '../lib/useMedia.js'

gsap.registerPlugin(ScrollTrigger)

export default function Marquee({ items, repeat = 2, duration = 30 }) {
  const wrap = useRef(null)
  const track = useRef(null)
  const reduced = useReducedMotion()
  const row = [...items, ...items]

  useGSAP(
    () => {
      if (reduced) return
      const tween = gsap.to(track.current, {
        xPercent: -50,
        duration,
        ease: 'none',
        repeat: -1
      })
      const st = ScrollTrigger.create({
        trigger: wrap.current,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: (self) => {
          const v = self.getVelocity()
          const dir = v < 0 ? -1 : 1
          gsap.to(tween, {
            timeScale: Math.max(-4, Math.min(4, dir * (1 + Math.abs(v) / 900))),
            duration: 0.5,
            overwrite: true
          })
        }
      })
      return () => {
        st.kill()
        tween.kill()
      }
    },
    { scope: wrap, dependencies: [reduced, duration] }
  )

  return (
    <div className="marquee" ref={wrap} aria-hidden="true">
      <div className="marquee-track" ref={track}>
        {Array.from({ length: repeat }).map((_, r) => (
          <ul className="marquee-set" key={r}>
            {row.map((item, i) => (
              <li key={`${r}-${i}`}>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  )
}
