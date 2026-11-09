import { useEffect } from 'react'

/** Per-route document titles, suffixed with the site name. */
export function useTitle(title?: string) {
  useEffect(() => {
    document.title = title ? `${title} · Avleen Singh` : 'Avleen Singh — Cybersecurity Specialist | Security Researcher'
  }, [title])
}
