import { useSite } from '../site.jsx'

export default function Pricing() {
  const { t, tier, setTier, prices } = useSite()
  const c = t.pricing
  const fmt = (n) => n.toLocaleString('en-US')

  return (
    <section className="section" id="pricing">
      <div className="wrap">
        <div className="sec-head">
          <h2>
            <span className="idx mono">07 / PRICING</span>
            <br />
            {c.title}
          </h2>
          <p>{c.lead}</p>
        </div>
        <div className="pricing">
          {c.tiers.map((item) => {
            const price = prices[item.id]
            const on = tier === item.id
            return (
              <article key={item.id} className={`tier${item.featured ? ' is-featured' : ''}`}>
                <div className="tier-top">
                  <h3>{item.name}</h3>
                  <span className="steps">{item.steps}</span>
                </div>
                <p className="price">
                  <span className="cur">{c.currency}</span>
                  <span className="num">{fmt(price)}</span>
                </p>
                <p className="desc">{item.desc}</p>
                <ul className="inc">
                  {item.includes.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
                <button
                  type="button"
                  className="pick"
                  aria-pressed={on}
                  onClick={() => setTier(item.id)}
                >
                  <span>{item.name}</span>
                  <span aria-hidden="true">{on ? '✓' : c.select}</span>
                </button>
              </article>
            )
          })}
        </div>
        <p className="tier-note mono">{c.note}</p>
      </div>
    </section>
  )
}
