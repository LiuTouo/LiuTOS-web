import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from '../lib/useMedia.js'

gsap.registerPlugin(ScrollTrigger)

const SPLIT = '[data-split]'

function splitWords(el) {
  if (el.dataset.done) return []
  el.dataset.done = '1'
  const raw = el.textContent.trim()
  const tokens = /[\u3400-\u9fff]/.test(raw) ? Array.from(raw) : raw.split(/(\s+)/)
  el.setAttribute('aria-label', raw)
  el.textContent = ''
  const spans = []
  tokens.forEach((token) => {
    if (!token.trim()) {
      el.appendChild(document.createTextNode(token))
      return
    }
    const span = document.createElement('span')
    span.className = 'w'
    span.textContent = token
    span.setAttribute('aria-hidden', 'true')
    el.appendChild(span)
    spans.push(span)
  })
  return spans
}

export default function Motion() {
  const reduced = useReducedMotion()

  useEffect(() => {
    const bar = document.querySelector('.progress i')
    if (bar) {
      gsap.to(bar, {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: { start: 0, end: 'max', scrub: 0.3 }
      })
    }

    if (reduced) {
      gsap.utils.toArray(SPLIT).forEach((el) => el.classList.add('is-plain'))
      return
    }

    gsap.utils.toArray(SPLIT).forEach((el) => {
      const spans = splitWords(el)
      if (!spans.length) return
      gsap.fromTo(
        spans,
        { opacity: 0.16 },
        {
          opacity: 1,
          stagger: 0.02,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            end: 'top 52%',
            scrub: 0.4
          }
        }
      )
    })

    gsap.utils.toArray('.section, .pipe, .foot').forEach((el) => {
      gsap.fromTo(
        el,
        { '--line': 0 },
        {
          '--line': 1,
          ease: 'none',
          scrollTrigger: { trigger: el, start: 'top 96%', end: 'top 62%', scrub: 0.4 }
        }
      )
    })

    const heads = gsap.utils.toArray('.sec-head h2')
    heads.forEach((el) => {
      gsap.fromTo(
        el,
        { clipPath: 'inset(0 0 108% 0)', yPercent: 16 },
        {
          clipPath: 'inset(0 0 0% 0)',
          yPercent: 0,
          duration: 1.25,
          ease: 'power4.out',
          scrollTrigger: { trigger: el, start: 'top 90%', once: true }
        }
      )
    })

    gsap.utils.toArray('.sec-head p').forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 22 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 92%', once: true }
        }
      )
    })

    const cards = gsap.utils.toArray(
      '.demo, .hw > article, .addon, .tier, .baseline-row, .field, .foot .line'
    )
    ScrollTrigger.batch(cards, {
      start: 'top 92%',
      once: true,
      onEnter: (batch) =>
        gsap.fromTo(
          batch,
          { opacity: 0, y: 28 },
          { opacity: 1, y: 0, duration: 0.9, stagger: 0.09, ease: 'power3.out' }
        )
    })

    const magnet = gsap.utils.toArray('[data-magnetic]')
    const cleanups = magnet.map((el) => {
      const xTo = gsap.quickTo(el, 'x', { duration: 0.55, ease: 'power3' })
      const yTo = gsap.quickTo(el, 'y', { duration: 0.55, ease: 'power3' })
      const onMove = (e) => {
        const r = el.getBoundingClientRect()
        xTo((e.clientX - (r.left + r.width / 2)) * 0.24)
        yTo((e.clientY - (r.top + r.height / 2)) * 0.32)
      }
      const onLeave = () => {
        xTo(0)
        yTo(0)
      }
      el.addEventListener('pointermove', onMove)
      el.addEventListener('pointerleave', onLeave)
      return () => {
        el.removeEventListener('pointermove', onMove)
        el.removeEventListener('pointerleave', onLeave)
      }
    })

    return () => cleanups.forEach((fn) => fn())
  }, [reduced])

  return (
    <div className="progress" aria-hidden="true">
      <i />
    </div>
  )
}
