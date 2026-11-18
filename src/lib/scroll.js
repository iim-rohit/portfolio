let lenisInstance = null

export function setLenis(instance) {
  lenisInstance = instance
}

export function getLenis() {
  return lenisInstance
}

export function scrollToSection(target) {
  const element =
    typeof target === 'string' ? document.querySelector(target) : target

  if (!element) return

  const hash = typeof target === 'string' ? target : element.id ? `#${element.id}` : ''

  if (hash && window.location.hash !== hash) {
    try {
      window.history.replaceState(null, '', hash)
    } catch {
      // History updates can be blocked in sandboxed previews.
    }
  }

  if (lenisInstance) {
    // Lenis already subtracts the document's scroll-padding-top.
    lenisInstance.scrollTo(element, { offset: 0 })
    return
  }

  element.scrollIntoView({
    behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
      ? 'auto'
      : 'smooth',
    block: 'start'
  })
}

export function scrollToTop() {
  try {
    window.history.replaceState(
      null,
      '',
      `${window.location.pathname}${window.location.search}`
    )
  } catch {
    // History updates can be blocked in sandboxed previews.
  }

  if (lenisInstance) {
    lenisInstance.scrollTo(0, { duration: 1.2 })
    return
  }

  window.scrollTo({
    top: 0,
    behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
      ? 'auto'
      : 'smooth'
  })
}
