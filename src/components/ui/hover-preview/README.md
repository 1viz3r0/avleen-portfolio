# Hover Preview — integration point (original component, not yet installed)

The original **Hover Preview** component — image previews above text links, by
[@minhxthanh](https://21st.dev/@minhxthanh/components/hover-preview) — could not
be retrieved during this build: the 21st.dev registry requires an API key
(`Registry: authentication required`), and no key was available.

No substitute was written. This folder ships only:

- `slot.tsx` — an inert, accessible wrapper (`HoverPreviewCapable`) around the
  project link markup, plus the declared preview assets (the original NETOZE
  and One-Go logos supplied by the user — never regenerated).

## 1. Get the original component

Get a free API key at <https://21st.dev/mcp>, then from the project root:

```bash
npx shadcn@latest add \
  "https://21st.dev/r/minhxthanh/hover-preview?api_key=$API_KEY_21ST" \
  --path src/components/ui/hover-preview.tsx \
  --overwrite --yes
```

If your CLI version has no `--path`, run it and move the produced file to
`src/components/ui/hover-preview.tsx`

## 2. Wiring

`slot.tsx` uses the same eager-glob detection as the ink-ridges adapter:
as soon as `src/components/ui/hover-preview.tsx` exists, `resolveHoverPreview()`
returns it and `HoverPreviewCapable` mounts the original instead of the plain
container.

Accepted exports: `default`, `component`, `HoverPreview`.

Because the original component's exact prop API cannot be known without the
source, the delegation here passes a single `project` prop (a key into
`HOVER_PREVIEW_ASSETS`) and children. When the original is installed:

1. open `src/components/ui/hover-preview/slot.tsx`;
2. in `HoverPreviewCapable`, map the `project` key to the original's expected
   props (e.g. its image/previews config), keeping `HOVER_PREVIEW_ASSETS`
   (original NETOZE / One-Go logos) as the asset source;
3. done — the featured-project links in the homepage and `/projects` already
   wrap their logos/names in `HoverPreviewCapable`.

## 3. Behaviour requirements (from the brief)

- Prevent hover previews from clipping outside the viewport — guard with the
  original component's positioning behaviour; the project cards sit in broad
  viewports but mobile/tablet edges should still be respected.
- Touch devices: with the original installed, expose an accessible interaction
  (tap target keeps working because `HoverPreviewCapable` wraps a real
  `<Link>`/`<a>`; add the original's focus/tap support once its API is known).
