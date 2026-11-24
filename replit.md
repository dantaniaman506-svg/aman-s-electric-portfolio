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
  aman.png             — Aman's updated portrait photo
  pristine-preview.jpg — Pristine Smiles Studio project screenshot
index.html             — HTML entry
vite.config.ts         — Vite config (port 5000, host 0.0.0.0)
vercel.json            — SPA rewrite rules for Vercel deployment
```

## Running

```bash
bun run dev      # Replit preview dev server on port 5000
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

- Light theme by default with a user-controlled dark mode; electric blue accents
- One-time USD website pricing only; Black Friday offers nine websites at $60 each
- Single-page site with smooth scroll (no page routing)
- Professional, premium aesthetic — not a "kids website"
- Mobile-first responsive design
- Touch/tap ripple animations on all interactive elements
- Animated grid background with floating orbs
- Black Friday website offer: $60 each for the first nine claimed spots
