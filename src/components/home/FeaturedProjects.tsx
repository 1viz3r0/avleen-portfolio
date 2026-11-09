import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'

import { HoverPreviewCapable } from '@/components/ui/hover-preview/slot'
import { Reveal } from '@/components/Reveal'
import { SectionHeading } from '@/components/SectionHeading'
import { projects } from '@/data/content'
import { cn } from '@/lib/utils'

/**
 * Featured projects — exactly two, asymmetric editorial layout.
 * Each entry's logo/name block is wrapped in HoverPreviewCapable: plain and
 * accessible today; when the original Hover Preview component is installed
 * it activates automatically (see src/components/ui/hover-preview/README.md).
 */
export function FeaturedProjects() {
  return (
    <div id="projects" className="mx-auto max-w-6xl px-5 py-24 sm:px-8">
      <SectionHeading
        index="02"
        eyebrow="Selected work"
        title="Featured projects"
        lede="Two systems under active construction — both are security-focused, both privately built. Inventories, statuses and development context are kept current on their pages."
      />

      <div className="mt-14 grid gap-x-12 gap-y-12 md:grid-cols-12">
        {projects.map((project, i) => (
          <Reveal
            key={project.slug}
            delay={i * 90}
            className={cn(
              'md:col-span-12',
              i === 0 && 'lg:col-span-7',
              i === 1 && 'lg:col-span-5 lg:mt-16',
            )}
          >
            <article
              className={cn(
                'group flex h-full flex-col justify-between border-t border-line pt-7',
              )}
            >
              <header className="flex items-start justify-between gap-6">
                <HoverPreviewCapable project={project.slug}>
                  <div className="flex items-center gap-5">
                    <span className="relative flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-line bg-[#0b0a09] sm:h-20 sm:w-20">
                      <img
                        src={project.logo}
                        alt={`${project.name} logo`}
                        width={80}
                        height={80}
                        loading="lazy"
                        className="size-[68%] object-contain select-none"
                        draggable="false"
                      />
                    </span>
                    <span>
                      <span className="block font-display text-3xl tracking-tight text-foreground sm:text-4xl">
                        {project.name}
                      </span>
                      <span className="mt-1.5 flex items-center gap-2 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-faint">
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
                  </div>
                </HoverPreviewCapable>
                <span aria-hidden="true" className="font-mono text-xs text-faint">
                  0{i + 1}
                </span>
              </header>

              <p className="mt-6 max-w-xl text-[0.95rem] leading-relaxed text-muted">
                {project.short}
              </p>

              <footer className="mt-7">
                <Link
                  to={`/projects/${project.slug}`}
                  className="inline-flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-foreground transition-colors hover:text-accent"
                >
                  <span className="h-px w-8 bg-current transition-all duration-300 group-hover:w-12" aria-hidden="true" />
                  Open case study
                  <ArrowUpRight className="size-3.5" aria-hidden="true" />
                </Link>
              </footer>
            </article>
          </Reveal>
        ))}
      </div>
    </div>
  )
}
