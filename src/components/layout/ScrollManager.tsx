import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Scroll behaviour on route change:
 *  - plain navigation → scroll to top (instant, like a real page load);
 *  - hash navigation → smooth-scroll to the section (auto if reduced motion),
 *    and also handles arriving with a hash on any page, including anchors on
 *    the homepage reached from other routes.
 */
export function ScrollManager() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (hash) {
      // wait a frame so the newly-mounted route has painted
      requestAnimationFrame(() => {
        const el = document.querySelector(hash)
        if (el) {
          el.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' })
        } else {
          window.scrollTo(0, 0)
        }
      })
    } else {
      window.scrollTo(0, 0)
    }
  }, [pathname, hash])

  return null
}
