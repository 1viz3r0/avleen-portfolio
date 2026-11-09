import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'

import { HoverPreviewCapable } from '@/components/ui/hover-preview/slot'
import { Reveal } from '@/components/Reveal'
import { SectionHeading } from '@/components/SectionHeading'
import { projects } from '@/data/content'
import { useTitle } from '@/hooks/useTitle'
import { cn } from '@/lib/utils'

/** /projects — index of the two active projects with honest statuses. */
export function ProjectsIndexPage() {
  useTitle('Projects')
  return (
    <main id="main" tabIndex={-1}>
      <div className="mx-auto max-w-6xl px-5 pb-24 pt-36 sm:px-8 sm:pt-44">
        <SectionHeading
          index="01"
          eyebrow="Projects"
          title="Two systems, in motion"
          lede="What I build serves the security work. Both projects below are live efforts — each has a case-study page with purpose, intended users and current status. Capabilities are described at a high level only; private implementation stays private."
        />

        <div className="mt-16 flex flex-col">
          {projects.map((project, i) => (
            <Reveal
              key={project.slug}
              delay={i * 70}
              className={cn('grid gap-8 border-t border-line py-12 first:border-t-0 md:grid-cols-12', i === 1 && 'md:border-t md:pl-[10%]')}
            >
              <div className="md:col-span-5">
                <HoverPreviewCapable project={project.slug} className="block w-fit">
                  <Link to={`/projects/${project.slug}`} className="group flex items-center gap-6">
                    <span className="relative flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-line bg-[#0b0a09] sm:h-28 sm:w-28">
                      <img
                        src={project.logo}
                        alt={`${project.name} logo`}
                        width={96}
                        height={96}
                        loading="eager"
                        className="size-[66%] object-contain select-none"
                        draggable="false"
                      />
                    </span>
                    <span>
                      <span className="block font-display text-4xl tracking-tight text-foreground transition-colors group-hover:text-accent sm:text-5xl">
                        {project.name}
                      </span>
                      <span className="mt-2 flex items-center gap-2 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-faint">
                        <span
                          className={cn(
                            'inline-block h-1.5 w-1.5 rounded-full',
                            project.status === 'In Development' ? 'bg-accent' : 'bg-muted',
                          )}
                          aria-hidden="true"
                        />
                        {project.status}
                      </span>
                    </span>
                  </Link>
                </HoverPreviewCapable>
              </div>

              <div className="max-w-xl md:col-span-6 md:col-start-7 md:self-center">
                <p className="text-[1rem] leading-relaxed text-muted">{project.short}</p>
                <p className="mt-6 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-faint">
                  Case study · purpose · intended users · status
                </p>
                <Link
                  to={`/projects/${project.slug}`}
                  className="mt-3 inline-flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-foreground transition-colors hover:text-accent"
                >
                  <span className="h-px w-8 bg-current transition-all duration-300 hover:w-12" aria-hidden="true" />
                  Read the case study
                  <ArrowUpRight className="size-3.5" aria-hidden="true" />
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </main>
  )
}
