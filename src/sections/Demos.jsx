import { useEffect, useRef, useState } from 'react'
import { useSite } from '../site.jsx'
import { useReducedMotion } from '../lib/useMedia.js'

function buildHandPath(n = 96) {
  const points = []
  for (let i = 0; i <= n; i++) {
    const u = i / n
    const e = u * u * (3 - 2 * u)
    const x = 0.14 + 0.64 * e + Math.sin(u * 5.1) * 0.03 * (1 - u)
    const y = 0.76 - 0.44 * e + Math.cos(u * 4.3) * 0.05 * (1 - u * 0.7)
    points.push({ x, y })
  }
  return points
}

function withAcceleration(points) {
  let maxD = 0
  for (let i = 1; i < points.length; i++) {
    const d = Math.hypot(points[i].x - points[i - 1].x, points[i].y - points[i - 1].y)
    if (d > maxD) maxD = d
  }
  const out = [{ ...points[0] }]
  let x = points[0].x
  let y = points[0].y
  for (let i = 1; i < points.length; i++) {
    const dx = points[i].x - points[i - 1].x
    const dy = points[i].y - points[i - 1].y
    const speed = maxD ? Math.min(1, Math.hypot(dx, dy) / maxD) : 0
    const factor = 0.42 + 1.5 * Math.pow(speed, 0.85)
    x += dx * factor
    y += dy * factor
    out.push({ x, y })
  }
  const start = points[0]
  const hand = points[points.length - 1]
  const travel = Math.hypot(hand.x - start.x, hand.y - start.y)
  const drift = Math.hypot(out[out.length - 1].x - start.x, out[out.length - 1].y - start.y)
  const scale = drift ? (travel * 1.17) / drift : 1
  return out.map((p) => ({
    x: start.x + (p.x - start.x) * scale,
    y: start.y + (p.y - start.y) * scale
  }))
}

const HAND = buildHandPath()
const ACCEL = withAcceleration(HAND)

function MouseLab() {
  const { t } = useSite()
  const c = t.demos.mouse
  const canvasRef = useRef(null)
  const [accel, setAccel] = useState(true)
  const reduced = useReducedMotion()
  const state = useRef({ progress: 0, playing: true })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let raf = 0
    let visible = false
    let last = performance.now()
    let size = { w: 0, h: 0 }

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      size = { w: rect.width, h: rect.height }
      canvas.width = Math.round(rect.width * dpr)
      canvas.height = Math.round(rect.height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      draw()
    }

    const toPx = (p) => ({
      x: size.w * (0.08 + p.x * 0.84),
      y: size.h * (0.1 + p.y * 0.8)
    })

    const draw = () => {
      const { w, h } = size
      if (!w || !h) return
      ctx.clearRect(0, 0, w, h)

      ctx.strokeStyle = 'rgba(149,230,189,0.09)'
      ctx.lineWidth = 1
      for (let i = 1; i < 8; i++) {
        const gx = (w / 8) * i
        const gy = (h / 6) * i
        ctx.beginPath()
        ctx.moveTo(gx, 0)
        ctx.lineTo(gx, h)
        ctx.stroke()
        if (i < 6) {
          ctx.beginPath()
          ctx.moveTo(0, gy)
          ctx.lineTo(w, gy)
          ctx.stroke()
        }
      }

      const target = toPx(HAND[HAND.length - 1])
      ctx.strokeStyle = 'rgba(214,249,229,0.55)'
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.moveTo(target.x - 9, target.y)
      ctx.lineTo(target.x + 9, target.y)
      ctx.moveTo(target.x, target.y - 9)
      ctx.lineTo(target.x, target.y + 9)
      ctx.stroke()
      ctx.strokeStyle = 'rgba(214,249,229,0.22)'
      ctx.beginPath()
      ctx.arc(target.x, target.y, 13, 0, Math.PI * 2)
      ctx.stroke()

      const active = accel ? ACCEL : HAND
      const ghost = accel ? HAND : ACCEL

      ctx.strokeStyle = 'rgba(230,237,234,0.24)'
      ctx.lineWidth = 1
      ctx.beginPath()
      ghost.forEach((p, i) => {
        const q = toPx(p)
        if (i === 0) ctx.moveTo(q.x, q.y)
        else ctx.lineTo(q.x, q.y)
      })
      ctx.stroke()

      const progress = reduced ? 1 : state.current.progress
      const upto = Math.max(1, Math.floor(progress * (active.length - 1)))

      ctx.strokeStyle = '#95e6bd'
      ctx.lineWidth = 1.6
      ctx.beginPath()
      for (let i = 0; i <= upto; i++) {
        const q = toPx(active[i])
        if (i === 0) ctx.moveTo(q.x, q.y)
        else ctx.lineTo(q.x, q.y)
      }
      ctx.stroke()

      const head = toPx(active[upto])
      if (progress < 1) {
        ctx.fillStyle = 'rgba(149,230,189,0.18)'
        ctx.beginPath()
        ctx.arc(head.x, head.y, 9, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.fillStyle = '#d6f9e5'
      ctx.beginPath()
      ctx.arc(head.x, head.y, 3.2, 0, Math.PI * 2)
      ctx.fill()
    }

    const loop = (now) => {
      raf = requestAnimationFrame(loop)
      if (!visible || reduced) return
      const dt = Math.min(64, now - last)
      last = now
      if (state.current.playing) {
        state.current.progress += dt / 2500
        if (state.current.progress >= 1) {
          state.current.progress = 1
          state.current.playing = false
        }
      }
      draw()
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting
        if (visible) {
          last = performance.now()
          if (state.current.progress >= 1) {
            state.current.progress = 0
            state.current.playing = true
          }
        }
      },
      { threshold: 0.25 }
    )
    io.observe(canvas)

    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    resize()
    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      ro.disconnect()
    }
  }, [accel, reduced])

  const switchTo = (next) => {
    setAccel(next)
    state.current.progress = 0
    state.current.playing = true
  }

  return (
    <div className="mouse-lab">
      <canvas ref={canvasRef} aria-hidden="true" />
      <div className="mouse-controls">
        <div className="toggle" role="group" aria-label={c.title}>
          <button type="button" aria-pressed={accel} onClick={() => switchTo(true)}>
            {c.on}
          </button>
          <button type="button" aria-pressed={!accel} onClick={() => switchTo(false)}>
            {c.off}
          </button>
        </div>
        <div className="legend mono">
          <span>
            <i style={{ background: '#95e6bd' }} />
            {accel ? c.on : c.off}
          </span>
          <span>
            <i style={{ background: 'rgba(230,237,234,.3)' }} />
            {accel ? c.off : c.on}
          </span>
        </div>
      </div>
    </div>
  )
}

function TextLab() {
  const { t } = useSite()
  const c = t.demos.text
  const [split, setSplit] = useState(52)

  return (
    <div>
      <div className="type-lab" style={{ '--split': `${split}%` }}>
        <div className="layer layer-a">{c.sample}</div>
        <div className="layer layer-b" aria-hidden="true">
          {c.sample}
        </div>
        <span className="divider" aria-hidden="true" />
        <input
          type="range"
          min="0"
          max="100"
          value={split}
          onChange={(e) => setSplit(Number(e.target.value))}
          aria-label={`${c.before} / ${c.after}`}
        />
      </div>
      <div className="type-labels mono">
        <span>{c.before}</span>
        <span className="b">{c.after}</span>
      </div>
    </div>
  )
}

export default function Demos() {
  const { t } = useSite()
  const c = t.demos

  return (
    <section className="section" id="demos">
      <div className="wrap">
        <div className="sec-head">
          <h2>
            <span className="idx mono">04 / PROOF</span>
            <br />
            {c.title}
          </h2>
          <p>{c.lead}</p>
        </div>
        <div className="demos">
          <article className="demo">
            <div className="demo-head">
              <h3>{c.text.title}</h3>
              <span className="tag mono">A / TEXT</span>
            </div>
            <div className="demo-body">
              <TextLab />
            </div>
            <p className="demo-cap">{c.text.caption}</p>
          </article>
          <article className="demo">
            <div className="demo-head">
              <h3>{c.mouse.title}</h3>
              <span className="tag mono">B / INPUT</span>
            </div>
            <div className="demo-body">
              <MouseLab />
            </div>
            <p className="demo-cap">{c.mouse.caption}</p>
          </article>
        </div>
      </div>
    </section>
  )
}
