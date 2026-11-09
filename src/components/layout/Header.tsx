import { useCallback, useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Earth, Mail } from 'lucide-react'

import { GithubIcon, LinkedinIcon } from '@/components/ui/brand-icons'
import { identity, nav } from '@/data/content'
import { useSectionSpy } from '@/hooks/useSectionSpy'
import { useTheme } from '@/hooks/useTheme'
import { ThemeToggle } from '@/components/ThemeToggle'
import { cn } from '@/lib/utils'

const SECTION_IDS = ['about', 'projects', 'experience', 'contact'] as const

/* ------------------------------------------------------------------ *
 * Header — my own restrained design (NOT a 21st.dev component).       *
 * The original header-3.tsx / gradient-menu.tsx sources were never    *
 * supplied and no matching originals exist; per the brief this is an  *
 * original, restrained equivalent following the Ink & Signal          *
 * direction: minimal sticky bar, hairline separators, and a subtly    *
 * gradient-washed menu panel in light mode ("gradient menu" slot).    *
 * ------------------------------------------------------------------ */

function isActive(href: string, pathname: string, activeSection: string | null): boolean {
  if (href.startsWith('/#')) return pathname === '/' && activeSection === href.slice(2)
  if (href === '/') return pathname === '/' && !activeSection
  return pathname.startsWith(href)
}

export function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()
  const activeSection = useSectionSpy(pathname === '/' ? SECTION_IDS : [])
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const firstLinkRef = useRef<HTMLAnchorElement>(null)
  const { theme } = useTheme()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* Close the menu on route change. */
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  /* Escape / focus management / scroll lock. */
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        menuButtonRef.current?.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    firstLinkRef.current?.focus()
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  /* Smooth-scroll same-page hash links instead of default jump. */
  const handleHashClick = useCallback(
    (href: string) => (e: React.MouseEvent) => {
      if (!href.startsWith('/#')) return
      const target = href.slice(1)
      const el = document.querySelector(target)
      if (!el) return
      if (pathname === '/') {
        e.preventDefault()
        el.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })
        history.replaceState(null, '', target)
      }
      setOpen(false)
    },
    [pathname],
  )

  return (
    <>
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-300',
        scrolled || open
          ? 'border-b border-line bg-background/85 backdrop-blur-md'
          : 'border-b border-transparent bg-transparent',
      )}
    >
      <a
        href="#main"
        className="z-60 absolute left-4 top-4 -translate-y-24 rounded-none border border-accent bg-background px-3 py-2 font-mono text-xs uppercase tracking-widest text-accent opacity-0 transition-all focus-visible:translate-y-0 focus-visible:opacity-100"
      >
        Skip to content
      </a>

      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-5 sm:px-8">
        {/* Wordmark */}
        <Link to="/" className="group flex items-baseline gap-3" aria-label={`${identity.name} — home`}>
          <span className="h-2 w-2 rounded-full bg-accent transition-transform duration-300 group-hover:scale-125" aria-hidden="true" />
          <span className="font-display text-lg tracking-tight text-foreground">Avleen Singh</span>
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Primary" className="hidden items-center gap-7 md:flex">
          {nav.primary.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              onClick={handleHashClick(item.href)}
              aria-current={isActive(item.href, pathname, activeSection) ? 'page' : undefined}
              className={cn(
                'font-mono text-[0.7rem] uppercase tracking-[0.18em] transition-colors',
                isActive(item.href, pathname, activeSection)
                  ? 'text-accent'
                  : 'text-muted hover:text-foreground',
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right cluster */}
        <div className="flex items-center gap-2">
          <a
            href={nav.social[0].href}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub profile"
            className="hidden h-9 w-9 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-line-strong hover:text-foreground sm:inline-flex"
          >
            <GithubIcon className="size-4" aria-hidden="true" />
          </a>
          <a
            href={nav.social[1].href}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn profile"
            className="hidden h-9 w-9 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-line-strong hover:text-foreground sm:inline-flex"
          >
            <LinkedinIcon className="size-4" aria-hidden="true" />
          </a>
          <ThemeToggle />
          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-line-strong hover:text-foreground md:hidden"
          >
            {open ? <X className="size-4" aria-hidden="true" /> : <Menu className="size-4" aria-hidden="true" />}
          </button>
        </div>
      </div>

</header>
      {/* Mobile menu — restrained gradient menu (my own design, not the
          unavailable gradient-menu.tsx): in light mode a faint warm wash
          bleeds from the vermilion corner; dark stays quiet charcoal.
          Rendered OUTSIDE <header> on purpose: a blurred header becomes a
          containing block for fixed descendants, which would collapse this
          fixed panel to the header's own 64px height. */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        className={cn(
          'fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto border-t border-line md:hidden',
          'bg-background transition-opacity duration-200',
          open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0',
        )}
      >
        <div
          aria-hidden="true"
          className={cn(
            'pointer-events-none absolute inset-0',
            theme === 'light'
              ? 'bg-[radial-gradient(120%_60%_at_100%_0%,color-mix(in_oklab,var(--accent)_9%,transparent),transparent_45%)]'
              : 'bg-[radial-gradient(120%_55%_at_100%_0%,color-mix(in_oklab,var(--accent)_7%,transparent),transparent_40%)]',
          )}
        />
        <div className="relative mx-5 mt-6 sm:mx-8">
          <ul className="flex flex-col">
            {nav.primary.map((item, i) => (
              <li key={item.label} className="border-b border-line">
                <Link
                  to={item.href}
                  ref={i === 0 ? firstLinkRef : undefined}
                  onClick={handleHashClick(item.href)}
                  aria-current={isActive(item.href, pathname, activeSection) ? 'page' : undefined}
                  className={cn(
                    'flex items-baseline justify-between py-4 font-display text-3xl tracking-tight transition-colors',
                    isActive(item.href, pathname, activeSection)
                      ? 'text-accent'
                      : 'text-foreground hover:text-accent',
                  )}
                >
                  {item.label}
                  <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-faint">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <dl className="mt-8 grid grid-cols-1 gap-4 pb-14">
            <div className="flex items-center justify-between border-b border-line pb-4">
              <dt className="eyebrow text-faint">Email</dt>
              <dd>
                <a href={`mailto:${identity.email}`} className="ink-link inline-flex items-center gap-2 text-sm">
                  <Mail className="size-3.5" aria-hidden="true" />
                  {identity.email}
                </a>
              </dd>
            </div>
            <div className="flex items-center justify-between border-b border-line pb-4">
              <dt className="eyebrow text-faint">Location</dt>
              <dd className="inline-flex items-center gap-2 text-sm text-muted">
                <Earth className="size-3.5" aria-hidden="true" />
                {identity.location}
              </dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="eyebrow text-faint">Also</dt>
              <dd className="flex gap-2">
                <a
                  href={nav.social[0].href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-line text-muted hover:text-foreground"
                >
                  <GithubIcon className="size-4" aria-hidden="true" />
                </a>
                <a
                  href={nav.social[1].href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-line text-muted hover:text-foreground"
                >
                  <LinkedinIcon className="size-4" aria-hidden="true" />
                </a>
                <a
                  href={nav.social[2].href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="TryHackMe"
                  className="inline-flex h-9 items-center justify-center rounded-full border border-line px-3 font-mono text-[0.65rem] uppercase tracking-widest text-muted hover:text-foreground"
                >
                  THM
                </a>
              </dd>
            </div>
          </dl>
        </div>
      </div>
        </>
  )
}
