import { useSite } from '../site.jsx'

export default function TicketBar() {
  const { t, tier, addons, touched, prices } = useSite()
  const c = t.ticket
  const plan = t.pricing.tiers.find((x) => x.id === tier)
  const names = addons
    .map((id) => t.addons.items.find((x) => x.id === id)?.title)
    .filter(Boolean)
  const sum = prices[tier] ?? 0

  return (
    <div className={`ticket-bar${touched ? ' is-open' : ''}`} aria-hidden={!touched}>
      <span className="label mono">{c.label}</span>
      <span className="who">
        <b>{plan?.name}</b>
        <span>
          {names.length ? `${c.addonsLabel}: ${names.join(' · ')}` : c.empty}
        </span>
      </span>
      <span className="sum">
        <small>
          {c.total} · {t.pricing.currency}
        </small>
        {sum.toLocaleString('en-US')}
        {names.length ? ' +' : ''}
      </span>
      <a href="#booking" tabIndex={touched ? 0 : -1}>
        {c.cta}
      </a>
    </div>
  )
}
