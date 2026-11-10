import { Reveal } from '@/components/Reveal'
import { SectionHeading } from '@/components/SectionHeading'
import { expertise } from '@/data/content'

/**
 * Expertise — readable groups, deliberately not chips/cards.
 * Presentation keeps the working-set honest: being listed here is not an
 * expert-level claim.
 */
export function Expertise() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8">
      <SectionHeading
        index="05"
        eyebrow="Expertise"
        title="Working knowledge, grouped for reading"
        lede="A map of what I work with day to day. Depth varies per item — proficiency grows with use, and I say so rather than grading myself on every row."
      />

      <div className="mt-12 grid gap-x-12 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {expertise.map((group, i) => (
          <Reveal
            key={group.group}
            delay={i * 60}
            className="group flex flex-col gap-4 border-l border-line pl-5 transition-colors hover:border-accent sm:pl-6"
          >
            <span className="eyebrow text-foreground">
              <span className="mr-2 text-faint">{String(i + 1).padStart(2, '0')}</span>
              {group.group}
            </span>
            <p className="text-[1rem] leading-[1.9] text-muted">
              {group.items.map((item, j) => (
                <span key={item}>
                  <span className="inline-block whitespace-nowrap transition-colors group-hover:text-foreground">{item}</span>
                  {j < group.items.length - 1 && (
                    <span className="mx-2 text-line-strong" aria-hidden="true">
                      ·
                    </span>
                  )}
                </span>
              ))}
            </p>
          </Reveal>
        ))}
      </div>
    </div>
  )
}
