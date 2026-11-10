import { Reveal } from '@/components/Reveal'
import { SectionHeading } from '@/components/SectionHeading'
import { certifications } from '@/data/content'

/** Certifications & achievements — compact editorial rows. */
export function Certifications() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8">
      <SectionHeading
        index="06"
        eyebrow="Certifications & achievements"
        title="Verified, and community-built"
      />

      <ul className="mt-10 flex flex-col">
        {certifications.map((c, i) => (
          <Reveal key={c.title} delay={i * 50} as="li" className="flex items-baseline justify-between gap-6 border-b border-line py-4 first:border-t first:border-line">
            <span className="text-[1rem] text-foreground">{c.title}</span>
            <span className="shrink-0 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-faint">
              {[c.issuer, c.year].filter(Boolean).join(' · ')}
            </span>
          </Reveal>
        ))}
      </ul>
    </div>
  )
}
