import { useEffect, useMemo, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { useSite } from '../site.jsx'
import { useMedia, useReducedMotion } from '../lib/useMedia.js'
import { scrollToY } from '../lib/scroll.js'
import { FACTS } from '../facts.js'
import Marquee from '../components/Marquee.jsx'

gsap.registerPlugin(ScrollTrigger)

const HIT = /(SystemResponsiveness|DisabledComponents|MouseSpeed|TaskbarAl|GPU Priority|NetworkThrottlingIndex|授權|Activated|activated|完成)/

export default function Pipeline() {
  const { t, lang } = useSite()
  const c = t.pipeline
  const steps = c.steps
  const stage = useRef(null)
  const stepBox = useRef(null)
  const [active, setActive] = useState(0)
  const [cpu, setCpu] = useState('amd')
  const [openLog, setOpenLog] = useState(-1)
  const isCompact = useMedia('(max-width: 899px)')
  const reduced = useReducedMotion()

  const current = steps[active] ?? steps[0]

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(min-width: 900px)', () => {
        const trigger = ScrollTrigger.create({
          trigger: stage.current,
          start: 'top top',
          end: 'bottom bottom',
          onUpdate: (self) => {
            const next = Math.min(steps.length - 1, Math.floor(self.progress * steps.length))
            setActive((prev) => (prev === next ? prev : next))
          }
        })
        return () => trigger.kill()
      })
      return () => mm.revert()
    },
    { scope: stage, dependencies: [steps.length, lang] }
  )

  useEffect(() => {
    const box = stepBox.current
    if (!box) return
    const el = box.querySelector('.pipe-step.is-active')
    if (!el) return
    const lines = el.querySelectorAll('.tlog p')
    if (reduced) {
      lines.forEach((p) => {
        p.textContent = p.dataset.text
      })
      return
    }
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.55, ease: 'power3.out' }
      )
      const tl = gsap.timeline({ delay: 0.08 })
      lines.forEach((p) => {
        p.textContent = ''
        const full = p.dataset.text || ''
        const proxy = { n: 0 }
        tl.to(proxy, {
          n: full.length,
          duration: Math.min(0.62, 0.05 + full.length * 0.008),
          ease: 'none',
          snap: { n: 1 },
          onUpdate: () => {
            p.textContent = full.slice(0, proxy.n)
          }
        })
      })
      tl.fromTo(
        '.pipe-panel .pipe-stat',
        { opacity: 0, x: 8 },
        { opacity: 1, x: 0, duration: 0.4, stagger: 0.06, ease: 'power2.out' },
        0.1
      )
    }, box)
    return () => ctx.revert()
  }, [active, cpu, lang, reduced])

  const jump = (index) => {
    const next = Math.max(0, Math.min(steps.length - 1, index))
    if (isCompact) {
      setActive(next)
      const target = stage.current?.querySelectorAll('.pipe-step')[next]
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' })
      return
    }
    const el = stage.current
    if (!el) return
    const startScroll = el.getBoundingClientRect().top + window.scrollY
    const range = Math.max(1, el.offsetHeight - window.innerHeight)
    scrollToY(startScroll + range * ((next + 0.5) / steps.length))
    setActive(next)
  }

  const panel = useMemo(
    () => (
      <aside className="pipe-panel" aria-label={c.panelLabel}>
        <div className="ph mono">
          <span>{c.panelLabel}</span>
          <span className="demo">{c.demoTag}</span>
        </div>
        {current.stats.map((stat) => (
          <div className="pipe-stat" key={stat.k}>
            <span className="k">{stat.k}</span>
            <span className="v">{stat.v}</span>
          </div>
        ))}
        {current.variant ? (
          <div style={{ marginTop: '1.1rem' }}>
            <div className="ph mono" style={{ borderBottom: 0, paddingBottom: 0 }}>
              <span>{current.variant.label}</span>
            </div>
            <div className="cpu-switch" role="group" aria-label={current.variant.label}>
              {current.variant.options.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  aria-pressed={cpu === opt.id}
                  onClick={() => setCpu(opt.id)}
                >
                  {opt.label}
                </button>
              ))}
            </div>
            <p className="cpu-note">{current.variant.note}</p>
          </div>
        ) : null}
        <div className="pipe-meter">
          <div className="bar">
            <i style={{ transform: `scaleX(${(active + 1) / steps.length})` }} />
          </div>
          <div className="lbl mono">
            <span>
              {String(active + 1).padStart(2, '0')} / {String(steps.length).padStart(2, '0')}
            </span>
            <span>{current.code}</span>
          </div>
        </div>
        <span className="panel-ghost mono" aria-hidden="true">
          {String(active + 1).padStart(2, '0')}
        </span>
      </aside>
    ),
    [active, cpu, c, current, steps.length]
  )

  return (
    <section className="pipe" id="pipeline">
      <div className="wrap pipe-head">
        <div className="sec-head" style={{ marginBottom: '2.5rem' }}>
          <h2>
            <span className="idx mono">02 / PIPELINE</span>
            <br />
            {c.title}
          </h2>
          <p>{c.lead}</p>
        </div>
      </div>
      <Marquee items={steps.map((s, i) => `${String(i + 1).padStart(2, '0')} ${s.title}`)} duration={46} />
      <div className="pipe-stage" ref={stage} style={{ '--steps': steps.length }}>
        <div className="pipe-inner wrap">
          <div className="pipe-rail">
            {steps.map((step, i) => (
              <button
                key={step.code}
                type="button"
                aria-current={i === active}
                onClick={() => jump(i)}
              >
                <span className="n">{String(i + 1).padStart(2, '0')}</span>
                <span className="t">{step.title}</span>
              </button>
            ))}
          </div>
          <div className="pipe-steps" ref={stepBox}>
            {steps.map((step, i) => {
              const logs = Array.isArray(step.logs) ? step.logs : step.logs[cpu]
              const collapsed = isCompact && openLog !== i
              return (
                <article
                  key={step.code}
                  className={`pipe-step${i === active ? ' is-active' : ''}`}
                  aria-current={i === active ? 'step' : undefined}
                >
                  <div className="pipe-step-head mono">
                    <span className="n">
                      {c.stepLabel} {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="code">{step.code}</span>
                  </div>
                  <h3>{step.title}</h3>
                  <p className="lead">{step.lead}</p>
                  <div className={`tlog${collapsed ? ' is-collapsed' : ''}`}>
                    {logs.map((line, n) => (
                      <p
                        key={n}
                        data-text={line}
                        className={HIT.test(line) ? 'hit' : undefined}
                      >
                        {line}
                      </p>
                    ))}
                  </div>
                  {isCompact ? (
                    <button
                      type="button"
                      className="tlog-toggle mono"
                      aria-expanded={!collapsed}
                      onClick={() => setOpenLog(collapsed ? i : -1)}
                    >
                      {collapsed ? t.labels.expand : t.labels.collapse}
                      <span aria-hidden="true">{collapsed ? '＋' : '－'}</span>
                    </button>
                  ) : null}
                  {step.tags ? (
                    <ul className="tags">
                      {step.tags.map((tag) => (
                        <li key={tag.k}>
                          <span className="k">{tag.k}</span>
                          <span className="v">{tag.v}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                  {step.list ? (
                    <ol className="task-list">
                      {step.list.map((item, n) => (
                        <li key={item}>
                          <span className="n">{String(n + 1).padStart(2, '0')}</span>
                          {item}
                        </li>
                      ))}
                    </ol>
                  ) : null}
                  {!step.tags && !step.list ? (
                    <dl className="facts">
                      {(FACTS[lang]?.[step.code] ?? []).map(([k, v]) => (
                        <div key={k}>
                          <dt>{k}</dt>
                          <dd>{v}</dd>
                        </div>
                      ))}
                    </dl>
                  ) : null}
                </article>
              )
            })}
          </div>
          {panel}
          <div className="pipe-foot">
            <div className="segments" aria-hidden="true">
              {steps.map((step, i) => (
                <span key={step.code} className={i <= active ? 'on' : undefined} />
              ))}
            </div>
            <div className="foot-row mono">
              <span>
                {current.code} — {current.title}
              </span>
              <span className="foot-ctrl">
                <button
                  type="button"
                  onClick={() => jump(active - 1)}
                  disabled={active === 0}
                  aria-label={lang === 'en' ? 'Previous stage' : '上一步'}
                >
                  ←
                </button>
                <button
                  type="button"
                  onClick={() => jump(active + 1)}
                  disabled={active === steps.length - 1}
                  aria-label={lang === 'en' ? 'Next stage' : '下一步'}
                >
                  →
                </button>
                <span className="foot-note">
                  {c.demoTag} · {c.footNote}
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
