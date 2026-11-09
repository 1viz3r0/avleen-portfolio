# Avleen Singh — Personal Cybersecurity Portfolio

Production-quality personal portfolio for **Avleen Singh**
(Cybersecurity Specialist | Security Researcher, Dehradun, India), built in the
"Ink & Signal" design direction: near-black and charcoal, warm off-white
editorial type, restrained vermilion (#B5402A family), fine grain, thin
separators, controlled animation.

## Stack

- React 19 + Vite 8 + TypeScript (strict)
- Tailwind CSS v4 (`@tailwindcss/vite`, token-based theming, no config file)
- React Router v7 — `/`, `/projects`, `/projects/netoze`, `/projects/one-go`, 404
- lucide-react (brand glyphs inlined locally — lucide 1.x dropped brand icons)
- Self-hosted fonts (`Fraunces`, `IBM Plex Sans`, `IBM Plex Mono`) — no runtime
  font network calls

## Run

```bash
npm install
npm run dev        # http://127.0.0.1:5173
```

Other scripts:

```bash
npm run build      # tsc -b && vite build
npm run preview    # serve the production build (http://127.0.0.1:4173)
npm run lint       # oxlint
node scripts/smoke.mjs   # functional test suite (puppeteer-core + system Chromium, dev server must be running)
node scripts/shots.mjs   # screenshot capture for layout review (dev server must be running)
```

Honesty guarantees baked into the site: the contact form validates client-side
and then opens a pre-filled email in the visitor's own client (no backend is
configured, and the UI says so in plain words); project statuses ("In
Development", "In Testing") are stated as-is; no invented statistics,
achievements or capabilities.

## Component status (originals — per the brief)

| Component | Status |
| --- | --- |
| Interactive Hover Button | ✅ **Original installed** — retrieved verbatim from the Magic UI registry (`magicui.design/r/interactive-hover-button`), the same component referenced on 21st.dev (author: Dillion Verma, MIT). File: `src/components/ui/interactive-hover-button.tsx`. |
| Ink Ridges | ⏳ **Pending** — 21st.dev registry requires an API key; no key was available, so nothing was substituted. An adapter slot + full install walkthrough is at `src/components/ui/ink-ridges/`. |
| Hover Preview | ⏳ **Pending** — same situation; inert accessible slot at `src/components/ui/hover-preview/slot.tsx` with install walkthrough at `src/components/ui/hover-preview/README.md`. |
| header-3.tsx / gradient-menu.tsx | ➖ **Never supplied** — no matching original exists to retrieve. The sticky header and the mobile gradient-washed menu are **restrained original designs by us**, not claimed as 21st.dev components (`src/components/layout/Header.tsx`). |

### Installing the pending originals

Both install with a free 21st.dev API key from <https://21st.dev/mcp> (free
accounts get a limited number of installs per day). Then wire-up is automatic
or a single documented edit:

```bash
# Ink Ridges → src/components/ui/ink-ridges.tsx (hero background, auto-wired)
npx shadcn@latest add \
  "https://21st.dev/r/ryanonline1234/ink-ridges?api_key=$API_KEY_21ST" \
  --path src/components/ui/ink-ridges.tsx --overwrite --yes

# Hover Preview → src/components/ui/hover-preview.tsx (auto-detected by the slot)
npx shadcn@latest add \
  "https://21st.dev/r/minhxthanh/hover-preview?api_key=$API_KEY_21ST" \
  --path src/components/ui/hover-preview.tsx --overwrite --yes
```

Details: `src/components/ui/ink-ridges/README.md` and
`src/components/ui/hover-preview/README.md`.

## Structure

```
src/
  data/content.ts              # single source of truth for all public copy
  components/
    layout/                    # Header (sticky + mobile gradient menu), Footer, ScrollManager
    home/                      # Hero (Ink Ridges slot), Snapshot, FeaturedProjects,
                               # About, Experience, Expertise, Certifications, Contact
    ui/                        # interactive-hover-button.tsx (original),
                               # ink-ridges/ (slot + guide), hover-preview/ (slot + guide),
                               # brand-icons.tsx
    SectionHeading.tsx, Reveal.tsx, ThemeToggle.tsx
  pages/                       # Home, ProjectsIndex, ProjectDetail (netoze/one-go), NotFound
  hooks/                       # useTheme (dark default + light toggle), useSectionSpy, useTitle
scripts/                       # dev-only test + screenshot harness
```

## Design tokens

Ink & Signal lives in `src/index.css`: `.dark` is the default theme; light mode
is warm paper. `--accent` carries the vermilion (exact `#B5402A` in light
mode, contrast-tuned variant in dark). Reveal-on-scroll, page transitions and
all animation respect `prefers-reduced-motion`.
