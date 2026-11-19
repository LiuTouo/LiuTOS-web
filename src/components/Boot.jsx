import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { useSite } from '../site.jsx'
import { useReducedMotion } from '../lib/useMedia.js'

const LINES = [
  'hardware and storage check',
  'clean system image',
  'trim background load',
  'scheduling and input',
  'gpu and power plan',
  'personal settings pass',
  'ready'
]

const KEY = 'liutos-booted'

export default function Boot({ onDone }) {
  const { t } = useSite()
  const reduced = useReducedMotion()
  const show = (() => {
    try {
      return !reduced && sessionStorage.getItem(KEY) !== '1'
    } catch {
      return false
    }
  })()
  const root = useRef(null)
  const bar = useRef(null)
  const count = useRef(null)
  const done = useRef(false)

  useEffect(() => {
    if (!show) {
      onDone()
      return
    }
    const ctx = gsap.context(() => {
      const tl = gsap.timeline()
      tl.to(count.current, {
        textContent: 100,
        duration: 0.95,
        snap: { textContent: 1 },
        ease: 'none'
      })
      tl.fromTo(bar.current, { scaleX: 0 }, { scaleX: 1, duration: 0.95, ease: 'none' }, 0)
      tl.from(
        '.boot-line',
        { opacity: 0, y: 8, duration: 0.24, stagger: 0.13, ease: 'power2.out' },
        0.05
      )
      tl.add(finish, 1.12)
    }, root)
    return () => ctx.revert()
  }, [show, reduced, onDone])

  useEffect(() => {
    if (!show) return
    const skip = () => finish()
    window.addEventListener('pointerdown', skip, { once: true })
    window.addEventListener('keydown', skip, { once: true })
    window.addEventListener('wheel', skip, { once: true, passive: true })
    return () => {
      window.removeEventListener('pointerdown', skip)
      window.removeEventListener('keydown', skip)
      window.removeEventListener('wheel', skip)
    }
  }, [show])

  function finish() {
    if (done.current) return
    done.current = true
    try {
      sessionStorage.setItem(KEY, '1')
    } catch {}
    const el = root.current
    if (!el) return onDone()
    gsap.to(el, {
      clipPath: 'inset(0 0 100% 0)',
      duration: 0.65,
      ease: 'power4.inOut',
      onComplete: onDone
    })
    gsap.to(el.querySelector('.boot-inner'), { y: -24, opacity: 0, duration: 0.4 })
  }

  if (!show) return null

  return (
    <div className="boot" ref={root} aria-hidden="true">
      <div className="boot-inner">
        <div className="boot-head mono">
          <span>{t.hero.kicker}</span>
          <span ref={count}>0</span>
        </div>
        <div className="boot-track">
          <i ref={bar} />
        </div>
        <div className="boot-log mono">
          {LINES.map((line) => (
            <p className="boot-line" key={line}>
              <span>{line}</span>
            </p>
          ))}
        </div>
      </div>
    </div>
  )
}
