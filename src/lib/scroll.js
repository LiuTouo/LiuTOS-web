let lenis = null

export function setLenis(instance) {
  lenis = instance
}

export function scrollToY(top) {
  if (lenis) {
    lenis.scrollTo(top, { duration: 1.1 })
    return
  }
  window.scrollTo({ top, behavior: 'smooth' })
}
