/**
 * Ink Ridges — integration slot. NOT a substitute.
 *
 * The Ink Ridges component (https://21st.dev/@ryanonline1234/components/ink-ridges,
 * MIT) requires a 21st.dev API key to install, so it could not be retrieved
 * during this build. Per the project's honesty rules this slot does NOT
 * approximate, recreate or substitute the original: it renders nothing until
 * the original file exists, then picks it up automatically.
 *
 * How it resolves:
 *  - Drop the original into `src/components/ui/ink-ridges.tsx` (see
 *    ./README.md for the exact install command). Vite's glob eagerly bundles
 *    that file when — and only when — it exists.
 *  - Accepted exports, in order: `default`, `component`, `InkRidges`,
 *    `InkRidgesBackground`.
 *  - If the file exists but exports none of those names, a single console
 *    warning explains the fix.
 *  - If the file does not exist, the slot silently renders nothing and the
 *    hero keeps its plain near-black background.
 *
 * Full walkthrough: ./README.md
 */
import { useEffect, useRef } from 'react'
import type { ComponentType } from 'react'

export interface InkRidgesSlotProps {
  className?: string
  /** Spread onto the original component once detected. */
  slotProps?: Record<string, unknown>
}

type InkMod = {
  default?: ComponentType<Record<string, unknown>>
  component?: ComponentType<Record<string, unknown>>
  InkRidges?: ComponentType<Record<string, unknown>>
  InkRidgesBackground?: ComponentType<Record<string, unknown>>
}

/* Eager glob of the single expected file path. Absent file → empty object. */
const candidates = import.meta.glob<InkMod>('/src/components/ui/ink-ridges.tsx', { eager: true })
const mod: InkMod | undefined = Object.values(candidates)[0]

const component: ComponentType<Record<string, unknown>> | undefined = mod
  ? (mod.default ?? mod.component ?? mod.InkRidges ?? mod.InkRidgesBackground)
  : undefined

export function InkRidgesSlot({ className, slotProps }: InkRidgesSlotProps) {
  const warned = useRef(false)

  useEffect(() => {
    if (mod && !component && !warned.current) {
      warned.current = true
      console.warn(
        '[ink-ridges] src/components/ui/ink-ridges.tsx exists but exports nothing this adapter recognises. ' +
          'Export the component as default (or as named InkRidges), or adjust the resolution list in src/components/ui/ink-ridges/adapter.tsx.',
      )
    }
  }, [])

  if (!component) return null

  const Original = component
  return <Original className={className} {...slotProps} />
}
