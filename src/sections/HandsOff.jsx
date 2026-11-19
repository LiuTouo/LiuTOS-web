import { useState } from 'react'
import { useSite } from '../site.jsx'

export default function HandsOff() {
  const { t } = useSite()
  const c = t.handsOff
  const [pressed, setPressed] = useState([])
  const count = pressed.length
  const all = count === c.items.length

  const toggle = (i) =>
    setPressed((list) => (list.includes(i) ? list.filter((x) => x !== i) : [...list, i]))

  return (
    <section className="section" id="workload">
      <div className="wrap">
        <div className="sec-head">
          <h2>
            <span className="idx mono">03 / WORKLOAD</span>
            <br />
            {c.title}
          </h2>
          <p data-split>{c.lead}</p>
        </div>
        <div className="hands">
          <div>
            <div className="hands-count">
              <span className="big">
                {count}
                <small>/ {c.items.length}</small>
              </span>
              <span className="hint mono">{all ? c.done : c.hint}</span>
            </div>
            <div
              className="mono"
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: '1.2rem',
                fontSize: '.7rem',
                color: 'var(--dim-2)'
              }}
            >
              <span>{c.counter}</span>
              <span>
                {count} / {c.items.length}
              </span>
            </div>
            <div
              style={{
                height: 3,
                background: 'rgba(149,230,189,.12)',
                marginTop: '.4rem'
              }}
            >
              <div
                style={{
                  height: '100%',
                  width: `${(count / c.items.length) * 100}%`,
                  background: 'var(--mint)',
                  transition: 'width .35s var(--ease)'
                }}
              />
            </div>
          </div>
          <div className="clicks">
            {c.items.map((item, i) => (
              <button
                key={item.file}
                type="button"
                aria-pressed={pressed.includes(i)}
                onClick={() => toggle(i)}
              >
                <span className="box" aria-hidden="true" />
                <span className="f">
                  {item.file}
                  <small>{item.note}</small>
                </span>
                <span className="st mono">{pressed.includes(i) ? t.labels.done : t.labels.todo}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
