import { useEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'

import { cn } from '@/lib/utils'

/**
 * TextReveal — per-character text reveal, in the style of 21st.dev's
 * "Text Effect / Text Effect Per Char". Characters rise and fade in with a
 * light stagger the first time the text enters the viewport.
 *
 * Implementation notes:
 *  - CSS-only motion (opacity/transform on inline-block spans): no layout
 *    shift, no library, one IntersectionObserver per instance, disconnected
 *    after firing.
 *  - The accessible name is preserved: the container carries aria-label,
 *    the decorative char spans are aria-hidden.
 *  - Under prefers-reduced-motion the text renders statically (no observer,
 *    no transition — see the matching guard in index.css).
 */
export function TextReveal({
  text,
  className,
  delay = 0,
}: {
  text: string
  className?: string
  /** Base delay (ms) before the stagger starts — for multi-line offsets. */
  delay?: number
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setShown(true)
      return
    }
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setShown(true)
          io.disconnect()
        }
      },
      { threshold: 0.2, rootMargin: '0px 0px -8% 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <span
      ref={ref}
      aria-label={text}
      className={cn('text-reveal', shown && 'is-in', className)}
      style={{ '--reveal-delay': `${delay}ms` } as CSSProperties}
    >
      {[...text].map((char, i) => (
        <span
          key={`${char}-${i}`}
          aria-hidden="true"
          className="char"
          style={{ '--char-i': i } as CSSProperties}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  )
}
