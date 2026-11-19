import { useEffect, useMemo, useRef, useState } from 'react'
import { useSite } from '../site.jsx'
import { DISCORD_URL } from '../content.js'

const EMPTY = { name: '', discord: '', cpu: '', gpu: '', goal: '', note: '' }

export default function Booking() {
  const { t, tier, addons, prices } = useSite()
  const c = t.booking
  const [form, setForm] = useState(EMPTY)
  const [status, setStatus] = useState('')
  const preview = useRef(null)

  const message = useMemo(() => {
    const plan = t.pricing.tiers.find((x) => x.id === tier)
    const picked = addons
      .map((id) => t.addons.items.find((x) => x.id === id)?.title)
      .filter(Boolean)
    const dash = '—'
    const val = (v) => (v.trim() ? v.trim() : dash)
    const rows = [
      ['LiuTOS', `${plan?.name} · ${t.pricing.currency} ${(prices[tier] ?? 0).toLocaleString('en-US')}`],
      [t.ticket.addonsLabel, picked.length ? picked.join(' · ') : dash],
      [c.fields.name, val(form.name)],
      [c.fields.discord, val(form.discord)],
      [c.fields.cpu, val(form.cpu)],
      [c.fields.gpu, val(form.gpu)],
      [c.fields.goal, val(form.goal)],
      [c.fields.note, val(form.note)]
    ]
    return rows.map(([k, v]) => `${k}：${v}`).join('\n')
  }, [form, addons, tier, prices, t, c])

  useEffect(() => {
    if (!status) return
    const id = setTimeout(() => setStatus(''), 4200)
    return () => clearTimeout(id)
  }, [status])

  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value })

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(message)
      setStatus('copied')
    } catch {
      const node = preview.current
      if (node) {
        const range = document.createRange()
        range.selectNodeContents(node)
        const sel = window.getSelection()
        sel.removeAllRanges()
        sel.addRange(range)
      }
      setStatus('fail')
    }
  }

  const fields = [
    { key: 'name', wide: false },
    { key: 'discord', wide: false },
    { key: 'cpu', wide: false },
    { key: 'gpu', wide: false },
    { key: 'goal', wide: true },
    { key: 'note', wide: true }
  ]

  return (
    <section className="section" id="booking">
      <div className="wrap">
        <div className="sec-head">
          <h2>
            <span className="idx mono">08 / BOOK</span>
            <br />
            {c.title}
          </h2>
          <p>{c.lead}</p>
        </div>
        <div className="booking">
          <div>
            <div className="form">
              {fields.map((f) => (
                <div key={f.key} className={`field${f.wide ? ' wide' : ''}`}>
                  <label htmlFor={`f-${f.key}`}>{c.fields[f.key]}</label>
                  {f.key === 'note' ? (
                    <textarea
                      id={`f-${f.key}`}
                      value={form[f.key]}
                      onChange={set(f.key)}
                      placeholder={c.placeholders[f.key]}
                      rows={2}
                    />
                  ) : (
                    <input
                      id={`f-${f.key}`}
                      type="text"
                      value={form[f.key]}
                      onChange={set(f.key)}
                      placeholder={c.placeholders[f.key]}
                      autoComplete="off"
                    />
                  )}
                </div>
              ))}
              <div className="form-actions">
                <button type="button" className="btn" onClick={copy}>
                  {c.copy}
                  <span aria-hidden="true">»</span>
                </button>
                <a className="btn ghost" href={DISCORD_URL} target="_blank" rel="noreferrer">
                  {c.open}
                  <span aria-hidden="true">↗</span>
                </a>
              </div>
              <p className="form-status" role="status">
                {status === 'copied' ? c.copied : status === 'fail' ? c.copyFail : ''}
              </p>
            </div>
          </div>
          <div className="preview">
            <div className="preview-head mono">
              <span>{c.preview}</span>
              <span>DISCORD</span>
            </div>
            <pre ref={preview}>{message}</pre>
          </div>
        </div>
      </div>
    </section>
  )
}
