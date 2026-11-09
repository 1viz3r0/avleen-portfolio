import { useEffect, useState } from 'react'

/**
 * Tracks which section is currently under the reader's attention for nav
 * highlighting. Observes elements with the given ids ∈ sectionIds.
 */
export function useSectionSpy(sectionIds: readonly string[]): string | null {
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)

    if (elements.length === 0) return

    const byVisibility = new Map<HTMLElement, number>()
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const el = entry.target as HTMLElement
          if (entry.isIntersecting) {
            byVisibility.set(el, entry.intersectionRatio)
          } else {
            byVisibility.delete(el)
          }
        }
        let best: { id: string; ratio: number } | null = null
        for (const el of byVisibility) {
          const id = el[0].id
          const ratio = el[1]
          if (!best || ratio > best.ratio) best = { id, ratio }
        }
        setActive(best?.id ?? null)
      },
      { rootMargin: '-30% 0px -55% 0px', threshold: [0, 0.1, 0.25, 0.5, 0.75, 1] },
    )

    for (const el of elements) io.observe(el)
    return () => io.disconnect()
  }, [sectionIds])

  return active
}
