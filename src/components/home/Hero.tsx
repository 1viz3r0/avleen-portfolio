import { ArrowDown } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

import { InkRidgesSlot } from '@/components/ui/ink-ridges/adapter'
import { InteractiveHoverButton } from '@/components/ui/interactive-hover-button'
import { Reveal } from '@/components/Reveal'
import { hero, identity, links } from '@/data/content'

/**
 * Hero. Full-bleed background: the original Ink Ridges component via the
 * integration adapter — nothing is substituted while it is unavailable.
 * The scrim gradients below keep type readable over the WebGL canvas and
 * guarantee legibility on plain background or light mode too.
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

      <div className="mx-auto w-full max-w-6xl px-5 pb-20 pt-40 sm:px-8 sm:pb-24 sm:pt-48">
        <Reveal className="flex flex-col gap-7">
          <p className="eyebrow flex flex-wrap items-center gap-x-3 gap-y-2 text-muted">
            <span className="text-accent">{identity.location}</span>
            <span aria-hidden="true" className="text-line-strong">·</span>
            <span>Cybersecurity Specialist | Security Researcher</span>
          </p>

          <h1 className="font-display text-[17vw] leading-[0.86] tracking-[-0.02em] text-foreground sm:text-7xl md:text-8xl lg:text-9xl">
            {heroTitleLines.map((line, i) => (
              <span key={line} className="block" style={i === 1 ? { marginLeft: '0.35em' } : undefined}>
                {line}
              </span>
            ))}
          </h1>

          <p className="max-w-xl font-display text-xl italic leading-snug text-foreground/90 sm:text-2xl">
            {hero.tagline}
          </p>
        </Reveal>

        <div className="mt-10 grid gap-10 md:grid-cols-12">
          <div className="md:col-span-6 md:col-start-1 lg:col-span-7 lg:col-start-2">
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

      <div aria-hidden="true" className="pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 md:block">
        <ArrowDown className="size-4 animate-bounce text-faint" />
      </div>
    </section>
  )
}

const heroTitleLines = ['Avleen', 'Singh']
