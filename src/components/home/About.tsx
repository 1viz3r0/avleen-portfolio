import { Reveal } from '@/components/Reveal'
import { SectionHeading } from '@/components/SectionHeading'
import { about, education } from '@/data/content'

/**
 * About — professional journey, interests, research approach, engineering,
 * plus a "Currently exploring" aside (explicit: malware analysis is being
 * studied, not claimed as a specialization) and "Beyond cybersecurity".
 * The compact education block also lives here (§7).
 */
export function About() {
  return (
    <div id="about" className="mx-auto max-w-6xl px-5 py-24 sm:px-8">
      <SectionHeading
        index="03"
        eyebrow="About"
        title="A security mindset, applied"
        lede="Why I do this work, how I approach it, and what I keep learning on purpose."
      />

      <div className="mt-12 grid gap-x-14 gap-y-12 md:grid-cols-12">
        {/* Main prose column */}
        <div className="flex flex-col md:col-span-7">
          {about.blocks.map((block, i) => (
            <Reveal key={block.heading} delay={i * 60} className="border-b border-line py-7 first:pt-0 last:border-b-0">
              <h3 className="font-display text-xl text-foreground">{block.heading}</h3>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-muted">{block.body}</p>
            </Reveal>
          ))}
        </div>

        {/* Aside column */}
        <aside className="flex flex-col gap-10 md:col-span-5">
          <Reveal delay={80}>
            <span className="eyebrow text-accent">{about.currentlyExploring.label}</span>
            <ul className="mt-4 flex flex-col gap-3">
              {about.currentlyExploring.items.map((item) => (
                <li key={item} className="flex gap-3 text-[0.95rem] leading-relaxed text-muted">
                  <span className="mt-2 h-px w-5 shrink-0 bg-accent" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={140} className="border-t border-line pt-8">
            <span className="eyebrow text-foreground">{about.beyond.label}</span>
            <p className="mt-4 text-[0.95rem] leading-relaxed text-muted">{about.beyond.body}</p>
          </Reveal>

          <Reveal delay={200} className="border-t border-line pt-8">
            <span className="eyebrow text-foreground">Education</span>
            <ul className="mt-4 flex flex-col gap-5">
              {education.map((e) => (
                <li key={e.degree} className="flex flex-col gap-1">
                  <span className="text-[0.95rem] text-foreground">{e.degree}</span>
                  <span className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-faint">
                    {e.institution} · {e.period}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </aside>
      </div>
    </div>
  )
}
