import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const SPLIT = '[data-split]'

function splitWords(el) {
  if (el.dataset.done) return
  el.dataset.done = '1'
  const raw = el.textContent.trim()
  const tokens = /[\u3400-\u9fff]/.test(raw) ? Array.from(raw) : raw.split(/(\s+)/)
  el.setAttribute('aria-label', raw)
  el.textContent = ''
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
  })
}

export default function Motion() {
  useEffect(() => {
    const bar = document.querySelector('.progress i')
    if (bar) {
      gsap.to(bar, {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: { start: 0, end: 'max', scrub: 0.3 }
      })
    }

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

    const words = []
    gsap.utils.toArray(SPLIT).forEach((el) => {
      splitWords(el)
      const spans = el.querySelectorAll('.w')
      if (!spans.length) return
      gsap.set(spans, { opacity: 0.16 })
      words.push(el)
    })

    const heads = gsap.utils.toArray('.sec-head h2')
    heads.forEach((el) => gsap.set(el, { clipPath: 'inset(0 0 108% 0)', yPercent: 16 }))

    const leads = gsap.utils.toArray('.sec-head p')
    leads.forEach((el) => gsap.set(el, { opacity: 0, y: 22 }))

    const cards = gsap.utils.toArray('.demo, .hw > article, .addon, .tier, .baseline-row, .field')
    cards.forEach((el) => gsap.set(el, { opacity: 0, y: 28 }))

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const el = entry.target
          io.unobserve(el)
          if (el.matches(SPLIT)) {
            gsap.to(el.querySelectorAll('.w'), {
              opacity: 1,
              duration: 0.5,
              stagger: 0.012,
              ease: 'none',
              overwrite: true
            })
          } else if (el.matches('.sec-head h2')) {
            gsap.to(el, {
              clipPath: 'inset(0 0 0% 0)',
              yPercent: 0,
              duration: 1.25,
              ease: 'power4.out'
            })
          } else {
            gsap.to(el, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' })
          }
        })
      },
      { rootMargin: '0px 0px -8% 0px' }
    )

    ;[...words, ...heads, ...leads, ...cards].forEach((el) => io.observe(el))

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

    const safety = setTimeout(() => {
      const inView = (el) => {
        const r = el.getBoundingClientRect()
        return r.top < window.innerHeight && r.bottom > 0
      }
      document.querySelectorAll('.tier, .demo, .addon, .hw > article, .baseline-row, .field').forEach((el) => {
        if (inView(el) && Number(getComputedStyle(el).opacity) < 0.1) {
          gsap.to(el, { opacity: 1, y: 0, duration: 0.5 })
        }
      })
      document.querySelectorAll('.sec-head h2').forEach((el) => {
        if (inView(el) && getComputedStyle(el).clipPath.includes('108%')) {
          gsap.to(el, { clipPath: 'inset(0 0 0% 0)', yPercent: 0, duration: 0.6 })
        }
      })
      document.querySelectorAll('[data-split]').forEach((el) => {
        if (!inView(el)) return
        el.querySelectorAll('.w').forEach((w) => {
          if (Number(getComputedStyle(w).opacity) < 0.5) gsap.to(w, { opacity: 1, duration: 0.3 })
        })
      })
    }, 4000)

    const refresh = () => ScrollTrigger.refresh()
    const t = setTimeout(refresh, 400)
    window.addEventListener('liutos:refresh', refresh)

    return () => {
      clearTimeout(t)
      clearTimeout(safety)
      window.removeEventListener('liutos:refresh', refresh)
      io.disconnect()
      cleanups.forEach((fn) => fn())
    }
  }, [])

  return (
    <div className="progress" aria-hidden="true">
      <i />
    </div>
  )
}
