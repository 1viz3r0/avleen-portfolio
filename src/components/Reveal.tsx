import { createElement, type CSSProperties, type ElementType, type ReactNode } from 'react'

import { cn } from '@/lib/utils'

/**
 * Reveal primitive: applies the `.reveal` class and adds `.is-visible`
 * the first time the element enters the viewport (optically ~90% up the
 * screen, so content becomes visible as it approaches centre).
 *
 * Honours prefers-reduced-motion: when the user prefers reduced motion the
 * observer is skipped entirely — index.css also neutralises the transform and
 * forces `.reveal` fully visible in that case.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  as = 'div',
  ...rest
}: {
  children: ReactNode
  className?: string
  /** Stagger delay in ms. */
  delay?: number
  as?: ElementType
} & Record<string, unknown>) {
  const bind = (node: HTMLElement | null) => {
    if (!node) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      node.classList.add('is-visible')
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            node.classList.add('is-visible')
            io.disconnect()
          }
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px -10% 0px' },
    )
    io.observe(node)
    return () => io.disconnect()
  }

  const style: CSSProperties & Record<string, string | undefined> = {
    '--reveal-delay': `${delay}ms`,
  }

  return createElement(as, { ...rest, className: cn('reveal', className), ref: bind, style }, children)
}
