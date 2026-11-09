# Ink Ridges — integration point (original component, not yet installed)

The original **Ink Ridges** component — a WebGL2 sumi-e mountain background by
[@ryanonline1234](https://21st.dev/@ryanonline1234) (MIT) — could not be retrieved
during this build because the 21st.dev registry requires an API key
(`Registry: authentication required`), and no key was available.

No substitute, approximation or recreation was written: this folder ships only
an **adapter** (`adapter.tsx`) that stays empty until the original file exists.

## 1. Get the original component

Create a free API key at <https://21st.dev/mcp> (a free account is enough —
free accounts can install a limited number of components per day), then run
from the project root:

```bash
npx shadcn@latest add \
  "https://21st.dev/r/ryanonline1234/ink-ridges?api_key=$API_KEY_21ST" \
  --path src/components/ui/ink-ridges.tsx \
  --overwrite --yes
```

If your CLI version does not support `--path`, run it without and rename/move
the produced file to `src/components/ui/ink-ridges.tsx`.

Alternatively, copy the source directly from the component page:
<https://21st.dev/@ryanonline1234/components/ink-ridges> → "Install/Code" tab,
and paste it into `src/components/ui/ink-ridges.tsx`.

## 2. Wiring (usually zero edits needed)

`adapter.tsx` uses a Vite eager glob on exactly
`/src/components/ui/ink-ridges.tsx`. As soon as that file exists:

- dev server picks it up (restart the server if it was running);
- the file gets bundled automatically;
- the adapter renders it **full-bleed behind the hero** (`-z-10`, `absolute`,
  `inset-0`, `aria-hidden`, plus a readability gradient on top — see
  `src/components/home/Hero.tsx`).

Accepted export names, in order: `default`, `component`, `InkRidges`,
`InkRidgesBackground`. If the installed component exports a different name,
either add `export default InkRidges` at the bottom of
`ink-ridges.tsx`, or extend the resolution list in `adapter.tsx`.

If the installed component needs extra props (seed, tint, etc.), pass them via
the `slotProps` prop on `<InkRidgesSlot />` in `Hero.tsx`.

## 3. Behaviour guarantees for the original

Whatever ships inside `ink-ridges.tsx` is rendered unmodified — the adapter
only passes `className` + `slotProps`. Do not edit the original's internals;
register them here instead if theming is needed.

## Why an adapter instead of a placeholder background?

The brief forbids approximations. A CSS "ink ridges" lookalike would silently
diverge from the real component's animation, seeds and scroll behaviour. The
adapter approach keeps the hero honest (plain near-black surface until the
original lands) and makes the real integration a file-drop rather than a
re-implementation.
