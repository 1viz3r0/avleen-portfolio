import type { ReactNode } from 'react'

import { cn } from '@/lib/utils'
import { Reveal } from '@/components/Reveal'
import { TextReveal } from '@/components/TextReveal'

/**
 * Editorial section header: hairline rule, mono eyebrow with vermilion index,
 * large serif title, optional lede.
 */
export function SectionHeading({
  index,
  eyebrow,
  title,
  lede,
  className,
}: {
  index: string
  eyebrow: string
  title: string
  lede?: ReactNode
  className?: string
}) {
  return (
    <Reveal className={cn('flex flex-col gap-4', className)}>
      <div className="flex items-baseline justify-between gap-6 border-b border-line pb-4">
        <span className="eyebrow text-faint">
          <span className="text-accent">{index}</span>
          <span className="mx-2 text-line-strong select-none">·</span>
          {eyebrow}
        </span>
      </div>
      <h2 className="max-w-3xl font-display text-[2.75rem] leading-[1.05] tracking-[-0.01em] text-foreground sm:text-[3.5rem]">
        <TextReveal text={title} />
      </h2>
      {lede ? <p className="max-w-2xl text-base leading-relaxed text-muted">{lede}</p> : null}
    </Reveal>
  )
}
