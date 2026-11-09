import { useNavigate } from 'react-router-dom'

import { InkRidgesSlot } from '@/components/ui/ink-ridges/adapter'
import { InteractiveHoverButton } from '@/components/ui/interactive-hover-button'
import { Reveal } from '@/components/Reveal'
import { hero, identity, links } from '@/data/content'

/*
 * Portrait slot: resolves `src/assets/avleen-portrait.*` only when the file
 * actually exists (eager glob). Until the original portrait is added the
 * slot renders nothing — no broken import, no substitute image ever.
 * Adding the file (png/jpg/webp) activates the approved circular layout
 * automatically; no code change needed.
 */
const portraitCandidates = import.meta.glob<string>('/src/assets/avleen-portrait.*', {
  eager: true,
  query: '?url',
  import: 'default',
})
const portraitSrc = Object.values(portraitCandidates)[0]

/**
 * Hero. Full-bleed background: the original Ink Ridges component via the
 * integration adapter — nothing is substituted while it is unavailable.
 * The scrim gradients below keep type readable over the WebGL canvas and
 * guarantee legibility on plain background or light mode too.
 *
 * Composition notes:
 *  - The display name scales fluidly (clamp) instead of snapping between
 *    breakpoint font sizes — no discontinuity when crossing sm/md/lg.
 *  - Bottom padding reserves room for the scroll cue and the availability
 *    line on short viewports.
 *  - The scroll cue is deliberately static (mono label + hairline): motion
 *    here competed with the content and added nothing.
 */
export function Hero() {
  const navigate = useNavigate()

  return (
    <section className="relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden">
      {/* Original component slot — full-bleed, behind content */}
      <div aria-hidden="true" className="absolute inset-0 -z-20">
        <InkRidgesSlot className="!absolute inset-0 h-full w-full" />
      </div>

      {/* Readability scrims (top for header legibility, bottom to melt into page) */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-36 bg-gradient-to-b from-background/80 to-transparent" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-72 bg-gradient-to-t from-background via-background/70 to-transparent" />

      <div className="mx-auto w-full max-w-7xl px-5 pb-28 pt-24 sm:px-8 sm:pb-32">
        <Reveal className="flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-16 will-change-transform">
          {/* Portrait — circular, thin vermilion border. On mobile it stacks
              above the text; on lg+ it sits on the right at ~300px.
              Renders only once src/assets/avleen-portrait.* exists. */}
          {portraitSrc ? (
            <div className="order-first shrink-0 self-start lg:order-last lg:self-auto">
              <img
                src={portraitSrc}
                alt="Portrait of Avleen Singh"
                width={300}
                height={300}
                loading="eager"
                draggable="false"
                className="size-44 rounded-full border-2 border-accent object-cover select-none sm:size-56 lg:size-[300px]"
              />
            </div>
          ) : null}

          <div className="flex flex-col gap-8">
            <p className="eyebrow flex flex-wrap items-center gap-x-3 gap-y-2 text-muted">
              <span className="text-accent">{identity.location}</span>
              <span aria-hidden="true" className="text-line-strong">·</span>
              <span>Cybersecurity Specialist | Security Researcher</span>
            </p>

            <h1 className="font-display text-[clamp(3.5rem,14vw,9rem)] leading-[0.9] tracking-[-0.02em] text-foreground">
              {heroTitleLines.map((line, i) => (
                <span key={line} className="block" style={i === 1 ? { marginLeft: '0.35em' } : undefined}>
                  {line}
                </span>
              ))}
            </h1>

            <p className="max-w-2xl font-display text-xl italic leading-snug text-foreground/90 sm:text-2xl">
              {hero.tagline}
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-10 md:grid-cols-12">
          {/* One continuous indent: starts one column in from md upward, and
              only the span widens at lg — the column never jumps. */}
          <div className="md:col-span-6 md:col-start-2 lg:col-span-7">
            <Reveal delay={120} className="flex max-w-xl flex-col gap-4 text-[0.95rem] leading-relaxed text-muted">
              {hero.paragraphs.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </Reveal>

            <Reveal delay={200} className="mt-10 flex flex-wrap items-center gap-4">
              <InteractiveHoverButton
                onClick={() => navigate('/projects')}
                className="border-line-strong rounded-sm px-7 py-3 font-mono text-[0.7rem] uppercase tracking-[0.18em] transition-colors hover:border-accent"
              >
                Explore Projects
              </InteractiveHoverButton>
              <InteractiveHoverButton
                onClick={() => window.open(links.resume.href, '_blank', 'noopener,noreferrer')}
                className="border-line-strong rounded-sm px-7 py-3 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-muted transition-colors hover:border-accent hover:text-accent"
              >
                View Résumé
              </InteractiveHoverButton>
              <span className="w-full font-mono text-[0.65rem] uppercase tracking-[0.2em] text-faint sm:w-auto">
                <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-accent align-middle" aria-hidden="true" />
                {hero.availability}
              </span>
            </Reveal>
          </div>
        </div>
      </div>

      {/* Restrained scroll cue: mono label + hairline, CSS only, no motion */}
      <div aria-hidden="true" className="pointer-events-none absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 md:flex">
        <span className="font-mono text-[0.6rem] uppercase tracking-[0.3em] text-faint">Scroll</span>
        <span className="h-10 w-px bg-gradient-to-b from-line-strong to-transparent" />
      </div>
    </section>
  )
}

const heroTitleLines = ['Avleen', 'Singh']
