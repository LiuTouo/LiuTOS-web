import { useSite } from '../site.jsx'

export default function Hardware() {
  const { t } = useSite()
  const c = t.hardware

  return (
    <section className="section" id="hardware">
      <div className="wrap">
        <div className="sec-head">
          <h2>
            <span className="idx mono">05 / HARDWARE</span>
            <br />
            {c.title}
          </h2>
          <p>{c.lead}</p>
        </div>
        <div className="hw">
          {c.items.map((item) => (
            <article key={item.n}>
              <span className="n mono">{item.n}</span>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
              <ul>
                {item.list.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
