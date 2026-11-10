import { Reveal } from '@/components/Reveal'
import { SectionHeading } from '@/components/SectionHeading'
import { experience, links } from '@/data/content'

/**
 * Experience — an editorial journey rather than a résumé timeline:
 * generous rows, hairline rules, no timeline chrome.
 */
export function Experience() {
  return (
    <div id="experience" className="mx-auto max-w-6xl px-5 py-24 sm:px-8">
      <SectionHeading
        index="04"
        eyebrow="Experience"
        title="Where the work has been"
        lede="Teaching and operations are two vantage points of the same landscape — one built understanding, the other tested it."
      />

      <div className="mt-12 flex flex-col">
        {experience.map((role, i) => (
          <Reveal
            key={role.company}
            delay={i * 80}
            className="grid gap-6 border-t border-line py-10 first:border-t-0 md:grid-cols-12 md:gap-10"
          >
            {/* Left rail: period */}
            <div className="md:col-span-2">
              <span className="font-display text-4xl leading-none text-faint sm:text-5xl">
                {role.period}
              </span>
            </div>

            {/* Role */}
            <div className="md:col-span-5">
              <h3 className="font-display text-2xl leading-tight text-foreground sm:text-3xl">
                {role.role}
              </h3>
              <p className="mt-3 text-[0.95rem] text-muted">
                {role.company}
                <span aria-hidden="true" className="mx-2 text-line-strong">·</span>
                {role.location}
              </p>
              <p className="mt-4 font-display text-base italic text-foreground/80">{role.lede}</p>
            </div>

            {/* Responsibilities */}
            <ul className="flex flex-col gap-3 md:col-span-5">
              {role.points.map((point) => (
                <li key={point} className="flex gap-3 text-[1rem] leading-relaxed text-muted">
                  <span className="mt-2.5 h-px w-4 shrink-0 bg-accent" aria-hidden="true" />
                  {point}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}

        <Reveal className="border-t border-line pt-6">
          <p className="text-[0.95rem] text-faint">
            Full role details and dates are in the résumé,{' '}
            <a href={links.resume.href} target="_blank" rel="noreferrer" className="ink-link">
              open it in a new tab
            </a>
            .
          </p>
        </Reveal>
      </div>
    </div>
  )
}
