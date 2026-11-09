import { Reveal } from '@/components/Reveal'
import { snapshot } from '@/data/content'

/** Professional snapshot — compact editorial rows, no cards. */
export function Snapshot() {
  return (
    <section aria-label="Professional snapshot" className="border-y border-line bg-surface/40">
      <div className="mx-auto grid max-w-6xl gap-x-10 gap-y-0 px-5 py-16 sm:px-8 md:grid-cols-4 md:gap-y-0">
        {snapshot.map((item, i) => (
          <Reveal
            key={item.index}
            delay={i * 70}
            className={
              'flex flex-col gap-3 border-b border-line py-6 last:border-b-0 md:border-b-0 md:border-l md:py-1 md:pl-6 ' +
              (i === 0 ? 'md:border-l-0 md:pl-0' : '')
            }
          >
            <span className="font-mono text-[0.65rem] tracking-[0.2em] text-faint">{item.index}</span>
            <span className="eyebrow text-foreground">{item.label}</span>
            <p className="text-sm leading-relaxed text-muted">{item.body}</p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
