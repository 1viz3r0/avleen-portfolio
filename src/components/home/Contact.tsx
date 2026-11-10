import { useMemo, useState } from 'react'
import { AlertCircle, ArrowUpRight, CheckCircle2, Mail, MapPin } from 'lucide-react'

import { Reveal } from '@/components/Reveal'
import { SectionHeading } from '@/components/SectionHeading'
import { InteractiveHoverButton } from '@/components/ui/interactive-hover-button'
import { identity } from '@/data/content'

/**
 * Contact. Contains a working client-side validated form with the honesty
 * the brief demands: no backend or email service is configured, so nothing
 * is sent automatically and the UI never claims otherwise. On submit the
 * composed message is handed to the visitor's own email client via mailto,
 * and the plain email link is always available as the clear fallback.
 */

type Errors = Partial<Record<'name' | 'email' | 'message', string>>

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

function validate(values: { name: string; email: string; message: string }): Errors {
  const errors: Errors = {}
  if (values.name.trim().length < 2) errors.name = 'Please add your name (at least 2 characters).'
  if (!EMAIL_RE.test(values.email.trim())) errors.email = 'Please add a valid email address.'
  if (values.message.trim().length < 20)
    errors.message = 'A few more words would help — at least 20 characters.'
  return errors
}

export function Contact() {
  const [values, setValues] = useState({ name: '', email: '', subject: '', message: '' })
  const [errors, setErrors] = useState<Errors>({})
  const [touched, setTouched] = useState(false)
  const [composed, setComposed] = useState(false)

  const update = (field: keyof typeof values) => (value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }))
    if (touched) setErrors(validate({ ...values, [field]: value }))
  }

  /* --- helpers ---------------------------------------------------------- */

  const composeHref = useMemo(() => {
    const subject = encodeURIComponent(values.subject.trim() || `Website contact — ${values.name.trim() || 'hello'}`)
    const body = encodeURIComponent(
      `${values.message.trim()}\n\n—\n${values.name.trim()}\n${values.email.trim()}\n(Prefilled by the site contact form — not sent automatically)`,
    )
    return `mailto:${identity.email}?subject=${subject}&body=${body}`
  }, [values])

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setTouched(true)
    const errs = validate(values)
    setErrors(errs)
    if (Object.keys(errs).length === 0) {
      setComposed(true)
    }
  }

  return (
    <div id="contact" className="border-t border-line bg-surface/40">
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8">
        <SectionHeading
          index="07"
          eyebrow="Contact"
          title="Let's talk security"
          lede="Remote work, interesting technical projects, or a security question worth investigating — the door is open."
        />

        <div className="mt-12 grid gap-x-14 gap-y-12 md:grid-cols-12">
          {/* Facts */}
          <div className="flex flex-col gap-8 md:col-span-5">
            <Reveal className="flex flex-col gap-6">
              <div className="flex items-start gap-4">
                <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line text-accent">
                  <Mail className="size-4" aria-hidden="true" />
                </span>
                <div>
                  <span className="eyebrow block text-faint">Email</span>
                  <a href={`mailto:${identity.email}`} className="ink-link mt-1 inline-block break-all text-sm">
                    {identity.email}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line text-accent">
                  <MapPin className="size-4" aria-hidden="true" />
                </span>
                <div>
                  <span className="eyebrow block text-faint">Location</span>
                  <span className="mt-1 block text-sm text-muted">{identity.location}</span>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                <div>
                  <span className="eyebrow block text-faint">Availability</span>
                  <span className="mt-1 block max-w-xs text-sm text-muted">{identity.availabilityLine}</span>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Form / composed state */}
          <div className="md:col-span-7">
            {composed ? (
              <div className="flex h-full flex-col justify-center border border-line p-8">
                <p className="flex items-start gap-3 font-display text-2xl leading-snug text-foreground">
                  <CheckCircle2 className="mt-1 size-5 shrink-0 text-accent" aria-hidden="true" />
                  Your message is composed — nothing has been sent yet.
                </p>
                <p className="mt-4 max-w-lg text-[1rem] leading-relaxed text-muted">
                  No backend or email service is connected to this site, so the form does not — and
                  cannot — send anything by itself. Use the button below to open the exact same
                  message pre-filled in your own email client, or write to the email address at
                  left. You can also{' '}
                  <button type="button" onClick={() => setComposed(false)} className="ink-link">
                    edit the message again
                  </button>
                  .
                </p>
                <a
                  id="compose-email-link"
                  href={composeHref}
                  className="mt-8 inline-flex w-fit items-center gap-2 rounded-full border border-accent bg-accent px-7 py-3.5 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-accent-ink transition-transform hover:scale-[1.02]"
                >
                  Send via your email app
                  <ArrowUpRight className="size-3.5" aria-hidden="true" />
                </a>
              </div>
            ) : (
              <form onSubmit={onSubmit} noValidate aria-label="Contact form" className="flex flex-col gap-6">
                <p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-faint">
                  Form validates in place · sending happens in your email client
                </p>

                <div className="grid gap-6 sm:grid-cols-2">
                  <Field
                    id="contact-name"
                    label="Name"
                    value={values.name}
                    onChange={update('name')}
                    error={touched ? errors.name : undefined}
                    placeholder="Your name"
                    autoComplete="name"
                  />
                  <Field
                    id="contact-email"
                    label="Email"
                    type="email"
                    value={values.email}
                    onChange={update('email')}
                    error={touched ? errors.email : undefined}
                    placeholder="you@domain.com"
                    autoComplete="email"
                  />
                </div>
                <Field
                  id="contact-subject"
                  label="Subject"
                  isOptional
                  value={values.subject}
                  onChange={update('subject')}
                  placeholder="What is this about?"
                />
                <Field
                  id="contact-message"
                  label="Message"
                  isTextarea
                  value={values.message}
                  onChange={update('message')}
                  error={touched ? errors.message : undefined}
                  placeholder="Projects, roles, research, questions — anything technical and interesting."
                />

                <div className="flex flex-wrap items-center gap-6">
                  <InteractiveHoverButton
                    type="submit"
                    className="rounded-full border-accent bg-accent px-7 py-3.5 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-accent-ink [&>div]:text-accent-ink"
                  >
                    Compose my message
                  </InteractiveHoverButton>
                  <a href={`mailto:${identity.email}`} className="ink-link text-sm">
                    Or email directly: {identity.email}
                  </a>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */

function Field({
  id,
  label,
  value,
  onChange,
  error,
  isTextarea,
  isOptional,
  placeholder,
  autoComplete,
  type,
  className,
}: {
  id: string
  label: string
  value: string
  onChange: (value: string) => void
  error?: string
  isTextarea?: boolean
  isOptional?: boolean
  placeholder?: string
  autoComplete?: string
  type?: 'text' | 'email'
  className?: string
}) {
  const commonProps = {
    id,
    value,
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onChange(e.target.value),
    placeholder,
    'aria-invalid': error ? true : undefined,
    'aria-describedby': error ? `${id}-error` : undefined,
    autoComplete,
  }

  return (
    <p className={`flex flex-col gap-2 ${className ?? ''}`}>
      <label htmlFor={id} className="eyebrow flex items-baseline justify-between text-muted">
        {label}
        {isOptional ? <span className="text-[0.6rem] text-faint">(optional)</span> : null}
      </label>
      {isTextarea ? (
        <textarea
          {...commonProps}
          rows={6}
          className="resize-y rounded-none border border-line bg-background px-4 py-3 text-foreground placeholder:text-faint focus:border-accent focus:outline-none"
        />
      ) : (
        <input
          {...commonProps}
          type={type ?? 'text'}
          className="h-12 rounded-none border border-line bg-background px-4 text-foreground placeholder:text-faint focus:border-accent focus:outline-none"
        />
      )}
      {error ? (
        <span id={`${id}-error`} className="flex items-center gap-1.5 text-[0.8rem] text-accent">
          <AlertCircle className="size-3.5" aria-hidden="true" />
          {error}
        </span>
      ) : null}
    </p>
  )
}
