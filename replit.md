# Aman Dantani — Portfolio Website

Professional portfolio and business website for Aman Dantani, a website developer.

## Stack

- **Framework:** Vite + React 19 (SPA)
- **Styling:** Tailwind CSS v4 + tw-animate-css
- **Icons:** Lucide React
- **Package Manager:** Bun
- **Deploy:** Vercel (static SPA)

## Structure

```
src/
  App.tsx              — root app component, assembles all sections
  main.tsx             — React entry point
  styles.css           — Tailwind + custom animations/utilities
  components/site/
    shared.tsx         — ALL site components: Navbar, Hero, About, Services,
                         Projects, Pricing, Reviews, FAQ, Contact, Footer
public/
  aman.jpg             — Aman's portrait photo
  pristine-preview.jpg — Pristine Smiles Studio project screenshot
index.html             — HTML entry
vite.config.ts         — Vite config (port 5000, host 0.0.0.0)
vercel.json            — SPA rewrite rules for Vercel deployment
```

## Running

```bash
bun dev          # dev server on port 5000
bun run build    # production build → dist/
```

## Sections (single-page, anchor-based)

`#home` → `#about` → `#services` → `#projects` → `#pricing` → `#reviews` → `#faq` → `#contact`

## Deploying to Vercel

1. Connect the GitHub repo to Vercel
2. Build command: `bun run build`
3. Output directory: `dist`
4. No environment variables required

## User Preferences

- Dark theme only (black background, electric blue accents)
- Single-page site with smooth scroll (no page routing)
- Professional, premium aesthetic — not a "kids website"
- Mobile-first responsive design
- Touch/tap ripple animations on all interactive elements
- Animated grid background with floating orbs
