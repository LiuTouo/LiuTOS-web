import { useSite } from '../site.jsx'

export default function Addons() {
  const { t, addons, toggleAddon } = useSite()
  const c = t.addons

  return (
    <section className="section" id="addons">
      <div className="wrap">
        <div className="sec-head">
          <h2>
            <span className="idx mono">06 / ADD-ONS</span>
            <br />
            {c.title}
          </h2>
          <p>{c.lead}</p>
        </div>
        <div className="addons">
          {c.items.map((item) => {
            const on = addons.includes(item.id)
            return (
              <button
                key={item.id}
                type="button"
                className="addon"
                aria-pressed={on}
                onClick={() => toggleAddon(item.id)}
              >
                <span className="box" aria-hidden="true" />
                <span>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </span>
                <span className="price">{c.priceNote}</span>
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
