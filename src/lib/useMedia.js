import { useEffect, useState } from 'react'

export function useMedia(query) {
  const [match, setMatch] = useState(() =>
    typeof window === 'undefined' ? false : window.matchMedia(query).matches
  )

  useEffect(() => {
    const mq = window.matchMedia(query)
    const onChange = () => setMatch(mq.matches)
    onChange()
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [query])

  return match
}

export function useReducedMotion() {
  return useMedia('(prefers-reduced-motion: reduce)')
}
