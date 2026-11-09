import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowUpRight, CircleDashed } from 'lucide-react'

import { Reveal } from '@/components/Reveal'
import { NotFoundContent } from '@/pages/NotFoundPage'
import { getProject, projects } from '@/data/content'
import { useTitle } from '@/hooks/useTitle'

/**
 * /projects/:slug — NETOZE and ONE-Go case studies.
 * Copy limits itself to the high-level fields in the data file; internal,
 * sensitive or unfinished implementation details are kept out of the UI.
 */
export function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const project = getProject(slug)

  useTitle(project ? project.name : 'Not found')
  if (!project) {
    return <NotFoundContent message={`No project at ${slug ?? 'this path'}.`} />
  }

  const other = projects.find((p) => p.slug !== project.slug)!
  const d = project.detail

  return (
    <main id="main" tabIndex={-1}>
      <article className="mx-auto max-w-6xl px-5 pb-24 pt-32 sm:px-8 sm:pt-40">
        {/* Masthead */}
        <Reveal className="flex items-start justify-between gap-8 border-b border-line pb-10">
          <div className="flex items-center gap-6 sm:gap-8">
            <span className="relative flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-line bg-[#0b0a09] sm:h-28 sm:w-28">
              <img
                src={project.logo}
                alt={`${project.name} logo`}
                width={96}
                height={96}
                className="size-[66%] object-contain select-none"
                draggable="false"
              />
            </span>
            <div>
              <h1 className="font-display text-5xl leading-none tracking-[-0.02em] text-foreground sm:text-7xl">
                {project.name}
              </h1>
              <p className="mt-4 flex items-center gap-2.5 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-faint">
                <CircleDashed className={project.status === 'In Testing' ? 'size-3.5 text-muted' : 'size-3.5 text-accent'} aria-hidden="true" />
                {project.status}
                <span aria-hidden="true" className="text-line-strong">·</span>
                personal project
              </p>
            </div>
          </div>
        </Reveal>

        {/* Editorial body: generous two-column rows */}
        <div className="flex flex-col">
          <DetailRow index="Purpose" title="Why this exists">
            <p>{d.purpose}</p>
          </DetailRow>

          <DetailRow index="Problem" title="The problem being addressed">
            <p>{d.problem}</p>
          </DetailRow>

          <DetailRow index="Users" title="Who it is for">
            <ul className="flex flex-col gap-3">
              {d.intendedUsers.map((u) => (
                <li key={u} className="flex gap-3">
                  <span className="mt-2.5 h-px w-4 shrink-0 bg-accent" aria-hidden="true" />
                  {u}
                </li>
              ))}
            </ul>
          </DetailRow>

          <DetailRow index="Scope" title="High-level capabilities">
            <p className="mb-4 text-sm text-faint">
              Described here only at a capability level — sensitive and unfinished implementation
              details are intentionally left undocumented.
            </p>
            <ul className="flex flex-col gap-3 sm:grid sm:grid-cols-2 sm:gap-x-8 sm:gap-y-3">
              {d.capabilities.map((c) => (
                <li key={c} className="flex gap-3">
                  <span className="mt-2.5 h-px w-4 shrink-0 bg-accent" aria-hidden="true" />
                  {c}
                </li>
              ))}
            </ul>
          </DetailRow>

          <DetailRow index="Operation" title="How it works — overview level">
            <p>{d.operation}</p>
          </DetailRow>

          <DetailRow index="Status" title="Current development context" className="border-b-0">
            <p>{d.currentContext}</p>
            <p className="mt-4 inline-flex items-center gap-2 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-faint">
              <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-accent" aria-hidden="true" />
              development continues — details may change
            </p>
          </DetailRow>
        </div>

        {/* Back + next project */}
        <nav aria-label="Project navigation" className="mt-14 flex flex-col justify-between gap-6 border-t border-line pt-8 sm:flex-row sm:items-center">
          <Link
            to="/projects"
            className="inline-flex w-fit items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-muted transition-colors hover:text-accent"
          >
            <ArrowLeft className="size-3.5" aria-hidden="true" />
            Back to projects
          </Link>

          <Link
            to={`/projects/${other.slug}`}
            className="group inline-flex w-fit items-center gap-4"
          >
            <span className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-faint">Next</span>
            <span className="font-display text-2xl text-foreground transition-colors group-hover:text-accent sm:text-3xl">
              {other.name}
            </span>
            <ArrowUpRight className="size-4 text-muted transition-colors group-hover:text-accent" aria-hidden="true" />
          </Link>
        </nav>
      </article>
    </main>
  )
}

function DetailRow({
  index,
  title,
  children,
  className,
}: {
  index: string
  title: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <Reveal
      className={`grid gap-4 border-b border-line py-10 first:pt-0 md:grid-cols-12 md:gap-10 ${className ?? ''}`}
    >
      <span className="eyebrow text-faint md:col-span-3">{index}</span>
      <div className="flex flex-col gap-4 md:col-span-9">
        <h2 className="font-display text-2xl leading-snug text-foreground md:text-3xl">{title}</h2>
        <div className="max-w-2xl text-[0.95rem] leading-relaxed text-muted">{children}</div>
      </div>
    </Reveal>
  )
}
