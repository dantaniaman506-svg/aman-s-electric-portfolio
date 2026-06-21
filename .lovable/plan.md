# Aman Dantani — Portfolio Website Plan

A single-page, scroll-driven portfolio in **pure black + deep electric blue**, Poppins typography, with rich micro-interactions on every button and section.

## Theme & Design Tokens

- **Background:** pure black `#000000` with subtle radial deep-blue glow.
- **Primary (electric blue):** `#0A84FF` with glow `#3DA9FF`.
- **Accent gradient:** `linear-gradient(135deg, #0A84FF, #1E40AF)`.
- **Text:** white `#FFFFFF`, muted `#8A93A6`.
- **Font:** Poppins (300/400/500/600/700) loaded via `<link>` in `__root.tsx`.
- **Surfaces:** glassy cards `bg-white/[0.03]` with `border-white/10`, `backdrop-blur`.
- Animated grid + glow background, soft noise overlay for premium feel.

## Sections (single page, smooth-scroll nav)

1. **Sticky Navbar** — "AD" monogram logo, links (Home, Services, Projects, Pricing, Testimonials, Contact), animated underline on hover, "Hire Me" button → WhatsApp.
2. **Hero**
  - Headline: "Aman Dantani — Website Development" with animated gradient text + typing rotator ("Business Websites • Landing Pages • Portfolios").
  - Sub: "I've built 50+ business websites that convert."
  - CTAs: "View Projects" (scroll) + "Chat on WhatsApp" (glowing button).
  - Background: animated grid + floating blue orbs.
3. **About / Stats** — 4 animated counters: 50+ Websites, 3+ Years, 100% Client Focus, 24/7 Support.
4. **Services** — 4 glass cards (Business Websites, Landing Pages, Portfolio Sites, Maintenance & SEO) with hover tilt + border-beam glow.
5. **Projects**
  - Featured live project: **Pixel Perfect Pages** → [https://pixel-perfect-pages-chi.vercel.app/](https://pixel-perfect-pages-chi.vercel.app/) (live screenshot via iframe preview or generated image).
  - Plus 3 placeholder cards (user can swap later) with hover zoom + "Visit" button.
6. **Pricing** (two plans, exactly per your direction)
  - **Flexible Plan — One-Time + Monthly**
    - Website Development: ₹4,000 – ₹6,000 (one-time)
    - Monthly Maintenance: **₹300/month**
    - Domain Maintenance: Included
    - CTA: "Pay as you go" → WhatsApp
  - **Best Value — One-Time + Annual** (recommended ribbon, gold accent on blue)
    - Website Development: ₹4,000 – ₹6,000 (one-time)
    - Annual Maintenance: **₹3,000/year** (≈ ₹250/month)
    - **Save ₹600 vs monthly** (12×300 − 3,000)
    - No monthly payments • Priority Support
    - CTA: "Choose Annual — Save ₹600" → WhatsApp
  - "All plans include: SSL • Domain Setup • Responsive Design • Basic SEO"
  - Cards animate in on scroll, recommended card has animated gradient border + subtle pulse.
7. **Testimonials** — auto-scrolling marquee of 5–6 client quotes (placeholders, editable).
8. **Contact**
  - WhatsApp: +91 6398505806 → `https://wa.me/916398505806`
  - Email: [dantaniaman506@gmail.com](mailto:dantaniaman506@gmail.com) → `mailto:`
  - Big glowing "Message on WhatsApp" button.
9. **Footer** — monogram, social row, © Aman Dantani 2026.

## Animations (every button/section)

- Page load: stagger fade-up via `animate-fade-in`.
- Buttons: gradient shift + glow ring + scale on hover, ripple/flash on click (CSS keyframes), color swap (blue → lighter blue) with 200ms ease.
- Cards: hover lift (`-translate-y-1`), border glow (Magic UI border-beam style implemented in pure CSS).
- Hero background: animated grid + floating orbs (pure CSS), gradient text animation.
- Section reveals: IntersectionObserver hook → fade-up.
- Counters: count-up on enter.
- Smooth scroll for nav anchors.

## WhatsApp Redirect

All primary CTAs (Hero "Chat", both pricing buttons, Navbar "Hire Me", Contact button) open:  
`https://wa.me/916398505806?text=Hi%20Aman%2C%20I'm%20interested%20in%20your%20website%20development%20services.`  
in a new tab.

## Technical Build

- Single route `src/routes/index.tsx` composed of section components in `src/components/sections/` (Navbar, Hero, Stats, Services, Projects, Pricing, Testimonials, Contact, Footer).
- Reusable primitives in `src/components/ui-custom/`: `GlowButton`, `GlassCard`, `AnimatedGrid`, `GradientText`, `CountUp`, `Marquee`, `SectionReveal`.
- Design tokens in `src/styles.css` under `@theme` (electric-blue scale, glow shadows, gradient vars) + keyframes (`glow-pulse`, `gradient-shift`, `float`, `grid-pan`, `ripple`).
- Poppins loaded with `<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap">` in `__root.tsx` head; `--font-sans: "Poppins", sans-serif` in `@theme`.
- SEO: update `index.tsx` head — title "Aman Dantani — Website Development | 50+ Business Websites", meta description, og:title/description.
- Fully responsive (mobile-first, grid → flex breakpoints per responsive-layout rules).
- No backend needed (no forms; CTAs go to WhatsApp).

## Out of scope (ask later if needed)

- Real screenshots for placeholder projects (generated stylized previews used for now).
- Contact form with email delivery (currently WhatsApp + mailto only).
- Blog / CMS.

&nbsp;

Project links [https://artful-smiles-web.vercel.app/](https://artful-smiles-web.vercel.app/)

[https://pristine-smiles-studio.vercel.app/](https://pristine-smiles-studio.vercel.app/)

[https://pixel-perfect-pages-chi.vercel.app/](https://pixel-perfect-pages-chi.vercel.app/)

[https://gentle-smiles-dental.dantaniaman506.workers.dev/](https://gentle-smiles-dental.dantaniaman506.workers.dev/)

&nbsp;

Sun and rivew bhi add kardio tu in sb ke jutth jutth apne hisaab se badiya se riviews 

&nbsp;

Sbse uppar phele unnki website aur innke riviews ho rivew ki jagah 

Dr. Vandana

Oro-Dental Surgeon & Implantologist

&nbsp;

Dr. Saloni Verma

&nbsp;

Dr. Maitri Patel Kova

&nbsp;

BDS · Implantologist

&nbsp;

Baki ke tu apne hisaab se likh dio aur viviews bhi baki ke aur real lage bahut acha lage smjha 