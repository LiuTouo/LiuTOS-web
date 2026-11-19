import { useSite } from '../site.jsx'
import { DISCORD_URL } from '../content.js'
import Wordmark from '../components/Wordmark.jsx'

export default function Footer() {
  const { t } = useSite()
  const c = t.footer

  return (
    <footer className="foot">
      <div className="wrap">
        <div className="foot-inner">
          <div>
            <div className="brand" style={{ marginBottom: '1.2rem' }}>
              <Wordmark />
              <span className="name">
                LiuT<span style={{ color: 'var(--mint)' }}>OS</span>
              </span>
            </div>
            <p className="line">{c.line}</p>
          </div>
          <p className="disc">{c.disclaimer}</p>
        </div>
        <div className="meta mono">
          <span>© {new Date().getFullYear()} LiuTOS</span>
          <span>
            {c.contact}:{' '}
            <a href={DISCORD_URL} target="_blank" rel="noreferrer">
              liutelite
            </a>
          </span>
        </div>
      </div>
    </footer>
  )
}
