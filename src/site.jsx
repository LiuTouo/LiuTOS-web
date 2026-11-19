import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { content, PRICES } from './content.js'

const KEY = 'liutos-lang'
const SiteContext = createContext(null)

function readLang() {
  try {
    return localStorage.getItem(KEY) === 'en' ? 'en' : 'zh'
  } catch {
    return 'zh'
  }
}

export function SiteProvider({ children }) {
  const [lang, setLang] = useState(readLang)
  const [tier, setTierState] = useState('full')
  const [addons, setAddons] = useState([])
  const [touched, setTouched] = useState(false)

  useEffect(() => {
    document.documentElement.lang = lang === 'zh' ? 'zh-Hant' : 'en'
    try {
      localStorage.setItem(KEY, lang)
    } catch {}
  }, [lang])

  const setTier = useCallback((id) => {
    setTierState(id)
    setTouched(true)
  }, [])

  const toggleAddon = useCallback((id) => {
    setTouched(true)
    setAddons((list) => (list.includes(id) ? list.filter((x) => x !== id) : [...list, id]))
  }, [])

  const value = useMemo(
    () => ({
      lang,
      setLang,
      t: content[lang],
      tier,
      setTier,
      addons,
      toggleAddon,
      touched,
      prices: PRICES
    }),
    [lang, tier, setTier, addons, toggleAddon, touched]
  )

  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>
}

export function useSite() {
  return useContext(SiteContext)
}
