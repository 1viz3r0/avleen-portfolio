/**
 * Interactive Hover Button — ORIGINAL component.
 *
 * Source retrieved verbatim from the Magic UI registry:
 * https://magicui.design/r/interactive-hover-button
 * (same component referenced at 21st.dev — author: Dillion Verma,
 * library: Magic UI, license: MIT).
 *
 * Repair (this theme): the hover layer's `bg-primary` fill was missing and
 * `--primary-foreground` aliases `--primary` here, so the hover text rendered
 * transparent ink-on-ink with no contrast. The hover layer now inverts
 * ink/background (readable in BOTH themes), the dot uses the site accent and
 * the arrow is sized to the pill. Slide transition geometry is unchanged.
 */
import { ArrowRight } from 'lucide-react'

import { cn } from '@/lib/utils'

export function InteractiveHoverButton({
  children,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(
        'group bg-background text-foreground relative w-auto cursor-pointer overflow-hidden rounded-full border p-2 px-6 text-center font-semibold',
        className,
      )}
      {...props}
    >
      <div className="flex items-center justify-center gap-2">
        <div className="bg-current h-2 w-2 rounded-full transition-all duration-300 group-hover:scale-[100.8]"></div>
        <span className="inline-block transition-all duration-300 group-hover:translate-x-12 group-hover:opacity-0">
          {children}
        </span>
      </div>
      <div className="bg-foreground text-background absolute top-0 z-10 flex h-full w-full translate-x-12 items-center justify-center gap-2 opacity-0 transition-all duration-300 group-hover:-translate-x-5 group-hover:opacity-100">
        <span>{children}</span>
        <ArrowRight className="size-4 shrink-0" aria-hidden="true" />
      </div>
    </button>
  )
}
