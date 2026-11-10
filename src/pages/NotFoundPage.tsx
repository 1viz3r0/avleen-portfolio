import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

import { useTitle } from '@/hooks/useTitle'

/** 404 content, reusable from the route and from project pages. */
export function NotFoundContent({ message }: { message?: string }) {
  return (
    <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-5 pb-24 pt-36 sm:px-8 sm:pt-44">
      <span className="eyebrow text-faint">404 · Not found</span>
      <h1 className="font-display text-6xl leading-none tracking-tight text-foreground sm:text-8xl">
        Wrong room.
      </h1>
      <p className="max-w-md text-[1rem] leading-relaxed text-muted">
        {message ?? 'This page does not exist. Follow the corridor back to known territory.'}
      </p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-foreground transition-colors hover:text-accent"
      >
        <ArrowLeft className="size-3.5" aria-hidden="true" />
        Back to the homepage
      </Link>
    </div>
  )
}

export function NotFoundPage() {
  useTitle('Not found')
  return (
    <main id="main" tabIndex={-1}>
      <NotFoundContent />
    </main>
  )
}
