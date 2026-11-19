import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { useMedia, useReducedMotion } from '../lib/useMedia.js'

export default function Cursor() {
  const reduced = useReducedMotion()
  const fine = useMedia('(pointer: fine)')
  const ring = useRef(null)
  const dot = useRef(null)
  const label = useRef(null)

  useEffect(() => {
    if (reduced || !fine) return

    document.body.classList.add('has-cursor')
    const r = ring.current
    const d = dot.current
    const moveR = { x: gsap.quickTo(r, 'x', { duration: 0.5, ease: 'power3' }), y: gsap.quickTo(r, 'y', { duration: 0.5, ease: 'power3' }) }
    const moveD = { x: gsap.quickTo(d, 'x', { duration: 0.12, ease: 'power3' }), y: gsap.quickTo(d, 'y', { duration: 0.12, ease: 'power3' }) }
    const lab = label.current
    const moveL = { x: gsap.quickTo(lab, 'x', { duration: 0.35, ease: 'power3' }), y: gsap.quickTo(lab, 'y', { duration: 0.35, ease: 'power3' }) }

    let current = null
    let visible = false

    const onMove = (e) => {
      if (!visible) {
        visible = true
        gsap.to([r, d], { opacity: 1, duration: 0.3 })
        gsap.set([r, d], { x: e.clientX, y: e.clientY })
      }
      moveR.x(e.clientX)
      moveR.y(e.clientY)
      moveD.x(e.clientX)
      moveD.y(e.clientY)
      moveL.x(e.clientX)
      moveL.y(e.clientY)
    }

    const zoneFor = (target) => {
      const custom = target.closest?.('[data-cursor]')
      if (custom) return custom.getAttribute('data-cursor')
      const el = target.closest?.('a, button, input, textarea, [role="button"]')
      if (!el) return null
      return el.matches('input, textarea') ? 'text' : 'link'
    }

    const onOver = (e) => {
      const zone = zoneFor(e.target)
      if (zone === current) return
      current = zone
      const isDrag = zone === 'drag'
      gsap.to(r, {
        scale: isDrag ? 2.05 : zone ? 1.45 : 1,
        borderColor: isDrag ? 'rgba(149,230,189,1)' : 'rgba(149,230,189,0.65)',
        backgroundColor: isDrag ? 'rgba(149,230,189,0.06)' : 'rgba(149,230,189,0)',
        duration: 0.35,
        ease: 'power3'
      })
      lab.firstElementChild.textContent = isDrag ? '拖曳' : ''
      gsap.to(lab, { opacity: isDrag ? 1 : 0, duration: 0.25 })
    }

    const onLeave = () => {
      visible = false
      gsap.to([r, d], { opacity: 0, duration: 0.25 })
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerover', onOver, { passive: true })
    document.addEventListener('pointerleave', onLeave)

    return () => {
      document.body.classList.remove('has-cursor')
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerover', onOver)
      document.removeEventListener('pointerleave', onLeave)
    }
  }, [reduced, fine])

  if (reduced || !fine) return null

  return (
    <div className="cursor" aria-hidden="true">
      <span className="cursor-ring" ref={ring} />
      <span className="cursor-dot" ref={dot} />
      <span className="cursor-label mono" ref={label}>
        <i />
      </span>
    </div>
  )
}
