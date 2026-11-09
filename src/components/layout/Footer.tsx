import { Link } from 'react-router-dom'
import { MapPin, Mail, Shield } from 'lucide-react'

import { GithubIcon, LinkedinIcon } from '@/components/ui/brand-icons'

import { identity, links, nav, projects } from '@/data/content'

/* Footer — closing statement, availability, contact CTA, socials,
 * compact sitemap, location and copyright. */
export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          {/* Closing statement + availability */}
          <div className="flex flex-col gap-5">
            <p className="max-w-md font-display text-2xl leading-snug text-foreground">
              Security is a habit of mind before it is a set of tools.
            </p>
            <p className="max-w-md text-sm leading-relaxed text-muted">
              {identity.availabilityLine}. If that fits something you are building or securing, I
              would like to hear about it.
            </p>
            <div>
              <a
                href={links.email.href}
                className="ink-link inline-flex items-center gap-2 text-sm font-medium"
              >
                <Mail className="size-4" aria-hidden="true" />
                {identity.email}
              </a>
            </div>
          </div>

          {/* Sitemap */}
          <nav aria-label="Footer" className="flex flex-col gap-3">
            <span className="eyebrow text-faint">Sitemap</span>
            {nav.primary.map((item) => (
              <Link key={item.label} to={item.href} className="text-sm text-muted transition-colors hover:text-foreground">
                {item.label}
              </Link>
            ))}
            {projects.map((p) => (
              <Link key={p.slug} to={`/projects/${p.slug}`} className="text-sm text-faint transition-colors hover:text-foreground">
                {p.name} <span className="font-mono text-[0.65rem] uppercase tracking-widest text-faint">↗</span>
              </Link>
            ))}
          </nav>

          {/* Elsewhere + location */}
          <div className="flex flex-col gap-3">
            <span className="eyebrow text-faint">Elsewhere</span>
            <a href={links.github.href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground">
              <GithubIcon className="size-4" aria-hidden="true" /> GitHub
            </a>
            <a href={links.linkedin.href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground">
              <LinkedinIcon className="size-4" aria-hidden="true" /> LinkedIn
            </a>
            <a href={links.tryhackme.href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground">
              <Shield className="size-4" aria-hidden="true" /> TryHackMe
            </a>
            <span className="mt-4 inline-flex items-center gap-2 text-sm text-faint">
              <MapPin className="size-4" aria-hidden="true" /> {identity.location}
            </span>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-2 border-t border-line pt-6 sm:flex-row sm:items-center">
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-faint">
            © 2026 {identity.name}
          </p>
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-faint">
            Cybersecurity Specialist | Security Researcher
          </p>
        </div>
      </div>
    </footer>
  )
}
