import { useEffect, useState } from 'react'
import { useSite } from '../site.jsx'
import Wordmark from '../components/Wordmark.jsx'

export default function Header() {
  const { t, lang, setLang } = useSite()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`header${scrolled ? ' is-scrolled' : ''}`}>
      <a className="brand" href="#top" aria-label="LiuTOS">
        <Wordmark />
        <span className="name">
          LiuT<span style={{ color: 'var(--mint)' }}>OS</span>
          <em>{t.brand}</em>
        </span>
      </a>
      <nav className="nav" aria-label={lang === 'zh' ? '主要導覽' : 'Main'}>
        {t.nav.map((item) => (
          <a key={item.id} href={`#${item.id}`}>
            {item.label}
          </a>
        ))}
      </nav>
      <button
        className="lang"
        type="button"
        onClick={() => setLang(lang === 'zh' ? 'en' : 'zh')}
        aria-label={lang === 'zh' ? 'Switch to English' : '切換成中文'}
      >
        <b>{lang === 'zh' ? '中' : 'EN'}</b>
        <span>{t.langLabel}</span>
      </button>
    </header>
  )
}
