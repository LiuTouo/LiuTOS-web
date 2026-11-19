import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from '../lib/useMedia.js'

gsap.registerPlugin(ScrollTrigger)

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

    if (reduced) return

    const heads = gsap.utils.toArray('.sec-head h2')
    heads.forEach((el) => {
      gsap.fromTo(
        el,
        { clipPath: 'inset(0 0 108% 0)', yPercent: 14 },
        {
          clipPath: 'inset(0 0 0% 0)',
          yPercent: 0,
          duration: 1.1,
          ease: 'power4.out',
          scrollTrigger: { trigger: el, start: 'top 90%', once: true }
        }
      )
    })

    const leads = gsap.utils.toArray('.sec-head p')
    leads.forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 18 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
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
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.75, stagger: 0.07, ease: 'power3.out' }
        )
    })

    const masks = gsap.utils.toArray('.mask-inner')
    masks.forEach((el) => {
      gsap.fromTo(
        el,
        { yPercent: 108 },
        {
          yPercent: 0,
          duration: 1.05,
          ease: 'power4.out',
          scrollTrigger: { trigger: el.parentElement, start: 'top 92%', once: true }
        }
      )
    })

    const magnet = gsap.utils.toArray('[data-magnetic]')
    const cleanups = magnet.map((el) => {
      const xTo = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3' })
      const yTo = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3' })
      const onMove = (e) => {
        const r = el.getBoundingClientRect()
        xTo((e.clientX - (r.left + r.width / 2)) * 0.22)
        yTo((e.clientY - (r.top + r.height / 2)) * 0.3)
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
