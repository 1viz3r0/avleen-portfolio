/**
 * Hover Preview — integration slot. NOT a substitute.
 *
 * The original Hover Preview component
 * (https://21st.dev/@minhxthanh/components/hover-preview) could not be retrieved
 * during this build (the 21st.dev registry requires an API key and none was
 * available), so no approximation is shipped. Three things this module does:
 *
 *  1. Declares the project preview assets (original logos only) that the
 *     original component will consume once installed.
 *  2. `HoverPreviewCapable` wraps any link/element that is a hover-preview
 *     target, carrying stable data attributes so wiring later is one edit
 *     instead of a redesign.
 *  3. `resolveHoverPreview()` — glob detection identical in spirit to the
 *     ink-ridges adapter. When `src/components/ui/hover-preview.tsx` exists and
 *     exports `default` / `component` / `HoverPreview`, it is returned
 *     (already loaded). When it does not, `resolveHoverPreview()` returns
 *     `undefined` and callers render the plain accessible link.
 *
 * Installing the original:
 *   npx shadcn@latest add \
 *     "https://21st.dev/r/minhxthanh/hover-preview?api_key=$API_KEY_21ST" \
 *     --path src/components/ui/hover-preview.tsx --overwrite --yes
 * Full walkthrough: ./README.md
 *
 * Accessibility contract (per brief): on touch devices the base element is a
 * real link — the preview is a hover-only enhancement, never the only way to
 * reach a destination. Any `data-*` hooks added here are inert without the
 * original component.
 */
import type { ReactNode } from 'react'
import type { ComponentType } from 'react'

import netozeLogo from '@/assets/netoze.png'
import oneGoLogo from '@/assets/one-go.png'

export interface HoverPreviewAsset {
  /** Stable key used by `data-hover-preview`. */
  key: string
  /** Original asset only — never regenerated. */
  logo: string
  name: string
}

export const HOVER_PREVIEW_ASSETS: Record<string, HoverPreviewAsset> = {
  netoze: { key: 'netoze', logo: netozeLogo, name: 'NETOZE' },
  'one-go': { key: 'one-go', logo: oneGoLogo, name: 'One-Go' },
}

type HoverPreviewMod = {
  default?: ComponentType<Record<string, unknown>>
  component?: ComponentType<Record<string, unknown>>
  HoverPreview?: ComponentType<Record<string, unknown>>
}

const candidates = import.meta.glob<HoverPreviewMod>('/src/components/ui/hover-preview.tsx', {
  eager: true,
})

let warned = false

export function resolveHoverPreview(): ComponentType<Record<string, unknown>> | undefined {
  const mod = Object.values(candidates)[0]
  const found = mod?.default ?? mod?.component ?? mod?.HoverPreview
  if (mod && !found && !warned) {
    warned = true
    console.warn(
      '[hover-preview] src/components/ui/hover-preview.tsx exists but exports nothing this adapter ' +
        'recognises. Export the component as default (or as named HoverPreview), or update resolveHoverPreview().',
    )
  }
  return found
}

export interface HoverPreviewCapableProps {
  className?: string
  /**
   * Key into HOVER_PREVIEW_ASSETS. Emitted both as `data-hover-preview` on the
   * rendered element and (later) handed to the original component.
   */
  project: string
  children: ReactNode
}

/**
 * A plain, always-accessible child container. Today it renders children
 * unchanged with a stable data hook; once the original component is installed
 * this is the single edit point to mount it around the hovered element.
 */
export function HoverPreviewCapable({ className, project, children }: HoverPreviewCapableProps) {
  const original = resolveHoverPreview()

  if (original) {
    const Original = original
    return (
      <Original className={className} project={project}>
        {children}
      </Original>
    )
  }

  return (
    <span className={className} data-hover-preview={project}>
      {children}
    </span>
  )
}
