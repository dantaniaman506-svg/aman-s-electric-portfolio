import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  Code2,
  Layers,
  Rocket,
  Wrench,
  Check,
  Star,
  ArrowRight,
  ExternalLink,
  MessageCircle,
  Mail,
  Sparkles,
  Globe,
  Shield,
  Zap,
  Menu,
  X,
} from "lucide-react";
import amanPortrait from "@/assets/aman-portrait.png.asset.json";

export const WHATSAPP =
  "https://wa.me/916398505806?text=Hi%20Aman%2C%20I%27m%20interested%20in%20your%20website%20development%20services.";

/* ============ Hooks ============ */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("reveal-in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}

/* ============ Tap effect ============ */
function useTap() {
  const [bursts, setBursts] = useState<{ x: number; y: number; id: number }[]>(
    [],
  );
  const onPointerDown = (e: React.PointerEvent<HTMLElement>) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const id = performance.now();
    setBursts((b) => [
      ...b,
      { x: e.clientX - rect.left, y: e.clientY - rect.top, id },
    ]);
    setTimeout(() => setBursts((b) => b.filter((p) => p.id !== id)), 750);
  };
  const layer = bursts.map((r) => (
    <span
      key={r.id}
      aria-hidden
      className="pointer-events-none absolute z-30 rounded-full"
      style={{
        left: r.x - 12,
        top: r.y - 12,
        width: 24,
        height: 24,
        background:
          "radial-gradient(circle, rgba(61,169,255,0.85), rgba(10,132,255,0.4) 50%, transparent 70%)",
        animation: "ripple 0.7s ease-out forwards",
      }}
    />
  ));
  return { onPointerDown, layer };
}

/* ============ GlowButton ============ */
export function GlowButton({
  children,
  href,
  to,
  onClick,
  variant = "primary",
  className = "",
}: {
  children: ReactNode;
  href?: string;
  to?: string;
  onClick?: () => void;
  variant?: "primary" | "ghost";
  className?: string;
}) {
  const { onPointerDown, layer } = useTap();
  const [flash, setFlash] = useState(false);
  const handle = (e: React.PointerEvent<HTMLElement>) => {
    onPointerDown(e);
    setFlash(true);
    setTimeout(() => setFlash(false), 300);
  };

  const base =
    "group relative inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold tracking-wide overflow-hidden transition-all duration-200 active:scale-[0.94] cursor-pointer select-none touch-manipulation will-change-transform";
  const styles =
    variant === "primary"
      ? "text-white shadow-[0_10px_40px_-10px_rgba(10,132,255,0.6)] hover:shadow-[0_20px_60px_-10px_rgba(10,132,255,0.95)] hover:-translate-y-0.5"
      : "text-white border border-white/15 hover:border-electric-glow/60 hover:bg-electric/10 hover:-translate-y-0.5 active:bg-electric/20";

  const inner = (
    <>
      {variant === "primary" && (
        <span
          aria-hidden
          className="absolute inset-0 -z-10"
          style={{
            background:
              "linear-gradient(120deg, #0a84ff, #3da9ff, #0a84ff, #1e40af)",
            backgroundSize: "300% 300%",
            animation: "gradient-shift 4s ease infinite",
          }}
        />
      )}
      {/* Flash overlay on tap */}
      <span
        aria-hidden
        className={`pointer-events-none absolute inset-0 transition-opacity duration-300 ${
          flash ? "opacity-100" : "opacity-0"
        }`}
        style={{
          background:
            "linear-gradient(120deg, rgba(255,255,255,0.55), rgba(61,169,255,0.45))",
        }}
      />
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      {layer}
    </>
  );

  if (to) {
    return (
      <Link
        to={to}
        onPointerDown={handle}
        onClick={onClick}
        className={`${base} ${styles} ${className}`}
      >
        {inner}
      </Link>
    );
  }
  if (href) {
    return (
      <a
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel="noreferrer"
        onPointerDown={handle}
        onClick={onClick}
        className={`${base} ${styles} ${className}`}
      >
        {inner}
      </a>
    );
  }
  return (
    <button
      onPointerDown={handle}
      onClick={onClick}
      className={`${base} ${styles} ${className}`}
    >
      {inner}
    </button>
  );
}

/* ============ TapCard — wraps a card to add ripple+flash on tap ============ */
export function TapCard({
  children,
  className = "",
  href,
  to,
}: {
  children: ReactNode;
  className?: string;
  href?: string;
  to?: string;
}) {
  const { onPointerDown, layer } = useTap();
  const [flash, setFlash] = useState(false);
  const handle = (e: React.PointerEvent<HTMLElement>) => {
    onPointerDown(e);
    setFlash(true);
    setTimeout(() => setFlash(false), 350);
  };
  const flashLayer = (
    <span
      aria-hidden
      className={`pointer-events-none absolute inset-0 z-20 transition-opacity duration-300 ${
        flash ? "opacity-100" : "opacity-0"
      }`}
      style={{
        background:
          "radial-gradient(600px circle at center, rgba(10,132,255,0.18), transparent 60%)",
      }}
    />
  );
  const cls = `group relative overflow-hidden transition-all duration-300 active:scale-[0.985] touch-manipulation ${className}`;
  if (to) {
    return (
      <Link to={to} onPointerDown={handle} className={cls}>
        {children}
        {flashLayer}
        {layer}
      </Link>
    );
  }
  if (href) {
    return (
      <a
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel="noreferrer"
        onPointerDown={handle}
        className={cls}
      >
        {children}
        {flashLayer}
        {layer}
      </a>
    );
  }
  return (
    <div onPointerDown={handle} className={cls}>
      {children}
      {flashLayer}
      {layer}
    </div>
  );
}

/* ============ SectionTitle ============ */
export function SectionTitle({
  kicker,
  title,
  subtitle,
}: {
  kicker: string;
  title: ReactNode;
  subtitle?: string;
}) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs font-medium tracking-widest text-electric-glow uppercase">
        <Sparkles className="h-3 w-3" /> {kicker}
      </div>
      <h2 className="mt-5 text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
        {title}
      </h2>
      {subtitle && <p className="mt-4 text-base text-white/60">{subtitle}</p>}
    </div>
  );
}

/* ============ Background ============ */
export function PageBackground() {
  return (
    <>
      <div className="fixed inset-0 -z-20 bg-black" />
      <div className="fixed inset-0 -z-10 grid-bg opacity-30" />
      <div
        className="fixed inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(10,132,255,0.18), transparent 60%)",
        }}
      />
    </>
  );
}

/* ============ Navbar ============ */
const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Services", to: "/services" },
  { label: "Projects", to: "/projects" },
  { label: "Pricing", to: "/pricing" },
  { label: "Reviews", to: "/reviews" },
  { label: "Contact", to: "/contact" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled ? "py-2" : "py-4"
        }`}
      >
        <nav
          className={`mx-auto flex max-w-6xl items-center justify-between rounded-full px-4 sm:px-5 py-3 mx-3 sm:mx-auto transition-all duration-500 ${
            scrolled
              ? "glass border border-white/10 shadow-[0_10px_40px_-20px_rgba(10,132,255,0.5)]"
              : "border border-transparent"
          }`}
        >
          <Link
            to="/"
            className="flex items-center gap-2 group active:scale-95 transition-transform"
          >
            <span className="relative inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-electric to-electric-deep text-white font-bold shadow-[0_0_20px_rgba(10,132,255,0.5)] transition-transform group-hover:scale-110 group-hover:rotate-3">
              AD
            </span>
            <span className="hidden sm:block text-sm font-semibold tracking-wide text-white">
              Aman Dantani
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                activeOptions={{ exact: true }}
                activeProps={{ className: "text-electric-glow" }}
                inactiveProps={{ className: "text-white/70 hover:text-white" }}
                className="group relative px-3 py-2 text-sm transition-colors active:scale-95"
              >
                <span className="relative">
                  {l.label}
                  <span className="absolute -bottom-1 left-0 h-px w-0 bg-electric-glow transition-all duration-300 group-hover:w-full group-data-[status=active]:w-full" />
                </span>
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <GlowButton
              href={WHATSAPP}
              className="!px-4 !py-2.5 !text-xs hidden sm:inline-flex"
            >
              Hire Me <ArrowRight className="h-3.5 w-3.5" />
            </GlowButton>
            <button
              onClick={() => setOpen((o) => !o)}
              aria-label="Toggle menu"
              className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-full glass border border-white/10 text-white active:scale-90 transition-transform"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-300 ${
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="absolute inset-0 bg-black/80 backdrop-blur-xl"
          onClick={() => setOpen(false)}
        />
        <div
          className={`absolute right-3 left-3 top-20 rounded-3xl glass border border-white/10 p-6 transition-all duration-300 ${
            open ? "translate-y-0" : "-translate-y-4"
          }`}
        >
          <div className="flex flex-col gap-1">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                activeOptions={{ exact: true }}
                activeProps={{
                  className:
                    "bg-electric/15 text-electric-glow border-electric/30",
                }}
                inactiveProps={{
                  className: "text-white/80 border-white/5 hover:bg-white/5",
                }}
                className="rounded-2xl border px-4 py-3 text-base font-medium transition-all active:scale-[0.97]"
              >
                {l.label}
              </Link>
            ))}
            <div className="mt-3">
              <GlowButton
                href={WHATSAPP}
                onClick={() => setOpen(false)}
                className="w-full"
              >
                <MessageCircle className="h-4 w-4" /> Chat on WhatsApp
              </GlowButton>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

/* ============ Footer ============ */
export function Footer() {
  return (
    <footer className="relative border-t border-white/10 py-10 mt-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 sm:flex-row">
        <div className="flex items-center gap-3">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-electric to-electric-deep text-white font-bold">
            AD
          </span>
          <div className="text-sm text-white/60">
            © {new Date().getFullYear()} Aman Dantani · Website Development
          </div>
        </div>
        <div className="flex items-center gap-4 text-sm text-white/60">
          <Link to="/pricing" className="hover:text-white transition-colors">
            Pricing
          </Link>
          <Link to="/projects" className="hover:text-white transition-colors">
            Projects
          </Link>
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noreferrer"
            className="hover:text-electric-glow transition-colors"
          >
            WhatsApp
          </a>
        </div>
      </div>
    </footer>
  );
}

/* ============ Hero ============ */
export function Hero() {
  const roles = [
    "Business Websites",
    "Landing Pages",
    "Portfolio Sites",
    "Conversion UX",
  ];
  const [idx, setIdx] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = roles[idx];
    const speed = deleting ? 40 : 80;
    const timer = setTimeout(() => {
      if (!deleting && text === current) {
        setTimeout(() => setDeleting(true), 1400);
        return;
      }
      if (deleting && text === "") {
        setDeleting(false);
        setIdx((i) => (i + 1) % roles.length);
        return;
      }
      setText(
        deleting
          ? current.slice(0, text.length - 1)
          : current.slice(0, text.length + 1),
      );
    }, speed);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, deleting, idx]);

  return (
    <section
      id="home"
      className="relative isolate flex min-h-[92vh] items-center overflow-hidden pt-28 pb-20"
    >
      <div
        aria-hidden
        className="absolute -z-10 left-1/4 top-1/3 h-72 w-72 rounded-full blur-3xl"
        style={{
          background: "rgba(10,132,255,0.35)",
          animation: "float-orb 10s ease-in-out infinite",
        }}
      />
      <div
        aria-hidden
        className="absolute -z-10 right-1/4 bottom-1/4 h-80 w-80 rounded-full blur-3xl"
        style={{
          background: "rgba(30,64,175,0.35)",
          animation: "float-orb 14s ease-in-out infinite reverse",
        }}
      />

      <div className="mx-auto max-w-6xl px-6 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-electric/30 bg-electric/10 px-4 py-1.5 text-xs font-medium text-electric-glow">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-electric-glow opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-electric-glow" />
          </span>
          Available for new projects
        </div>

        <h1 className="mt-6 text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.95]">
          <span className="block text-white">Aman Dantani</span>
          <span className="block text-gradient mt-2">Website Development</span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-white/70">
          I build{" "}
          <span className="text-white font-medium">
            aesthetic, fast & conversion-focused
          </span>{" "}
          websites.{" "}
          <span className="text-electric-glow font-semibold">
            50+ businesses
          </span>{" "}
          already live online.
        </p>

        <div className="mt-8 flex h-8 items-center justify-center text-base sm:text-lg text-white/80">
          <span className="text-white/50 mr-2">I craft</span>
          <span className="text-electric-glow font-semibold">{text}</span>
          <span
            className="ml-0.5 inline-block h-5 w-0.5 bg-electric-glow"
            style={{ animation: "blink 1s steps(2) infinite" }}
          />
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <GlowButton to="/projects">
            View Projects{" "}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </GlowButton>
          <GlowButton href={WHATSAPP} variant="ghost">
            <MessageCircle className="h-4 w-4" /> Chat on WhatsApp
          </GlowButton>
        </div>

        <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-3xl mx-auto">
          {[
            ["50+", "Websites Built"],
            ["3+", "Years Experience"],
            ["100%", "Client Focus"],
            ["24/7", "Support"],
          ].map(([k, v]) => (
            <div
              key={v}
              className="glass rounded-2xl p-4 transition-all hover:-translate-y-1 active:scale-95"
            >
              <div className="text-2xl sm:text-3xl font-bold text-gradient">
                {k}
              </div>
              <div className="mt-1 text-xs text-white/60">{v}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============ About ============ */
export function AboutSection({ compact = false }: { compact?: boolean }) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section id="about" className="relative py-20 sm:py-28">
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(10,132,255,0.12), transparent 70%)",
        }}
      />
      <div
        ref={ref}
        className="reveal mx-auto max-w-6xl px-6 grid gap-12 lg:grid-cols-2 lg:items-center"
      >
        <div className="relative mx-auto w-full max-w-md">
          <div
            aria-hidden
            className="absolute -inset-6 rounded-[2.5rem] opacity-70 blur-3xl"
            style={{
              background:
                "conic-gradient(from 0deg, #0a84ff, #3da9ff, #1e40af, #0a84ff)",
              animation: "border-spin 12s linear infinite",
            }}
          />
          <div
            className="relative rounded-[2rem] p-[2px]"
            style={{
              background:
                "conic-gradient(from 0deg, #0a84ff, #3da9ff, #1e40af, #0a84ff)",
            }}
          >
            <div className="relative overflow-hidden rounded-[1.9rem] bg-black">
              <img
                src={amanPortrait.url}
                alt="Aman Dantani — Website Developer"
                loading="lazy"
                className="block w-full h-auto object-cover aspect-[3/4] transition-transform duration-700 hover:scale-105"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, transparent 55%, rgba(0,0,0,0.85) 100%)",
                }}
              />
              <div className="absolute left-4 bottom-4 right-4 flex items-center justify-between">
                <div className="glass rounded-full px-4 py-2 text-xs font-semibold text-white flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                  </span>
                  Available
                </div>
                <div className="glass rounded-full px-4 py-2 text-xs font-semibold text-electric-glow">
                  50+ Projects
                </div>
              </div>
            </div>
          </div>
          <div
            className="absolute -left-4 top-10 glass rounded-2xl px-4 py-3 hidden sm:block"
            style={{ animation: "float-orb 6s ease-in-out infinite" }}
          >
            <div className="text-[10px] uppercase tracking-widest text-white/50">
              Stack
            </div>
            <div className="text-sm font-semibold text-white">
              React · TS · Tailwind
            </div>
          </div>
          <div
            className="absolute -right-4 bottom-16 glass rounded-2xl px-4 py-3 hidden sm:block"
            style={{ animation: "float-orb 8s ease-in-out infinite reverse" }}
          >
            <div className="text-[10px] uppercase tracking-widest text-white/50">
              Based in
            </div>
            <div className="text-sm font-semibold text-white">
              India · Remote
            </div>
          </div>
        </div>

        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs font-medium tracking-widest text-electric-glow uppercase">
            <Sparkles className="h-3 w-3" /> About Me
          </div>
          <h2 className="mt-5 text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
            Hi, I'm <span className="text-gradient">Aman Dantani</span> — a
            website developer obsessed with details.
          </h2>
          <p className="mt-5 text-base text-white/70 leading-relaxed">
            For the last 3+ years I've helped doctors, founders and small
            businesses look premium online. I write clean code, design with
            intent, and ship fast — so your website not only looks aesthetic,
            but actually brings in customers.
          </p>
          {!compact && (
            <p className="mt-3 text-base text-white/60 leading-relaxed">
              From pixel-perfect landing pages to full multi-page business
              sites with SEO and ongoing maintenance — I handle it end-to-end
              so you can focus on your business.
            </p>
          )}

          <div className="mt-7 grid grid-cols-2 gap-3 max-w-md">
            {[
              ["Pixel-perfect", "Design"],
              ["Lightning", "Fast"],
              ["Mobile-first", "Always"],
              ["Honest", "Pricing"],
            ].map(([a, b]) => (
              <div
                key={a}
                className="glass rounded-xl px-4 py-3 transition-all active:scale-95 active:bg-electric/10"
              >
                <div className="text-sm font-semibold text-white">{a}</div>
                <div className="text-xs text-electric-glow">{b}</div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <GlowButton href={WHATSAPP}>
              <MessageCircle className="h-4 w-4" /> Let's Work Together
            </GlowButton>
            <GlowButton to="/projects" variant="ghost">
              See My Work <ArrowRight className="h-4 w-4" />
            </GlowButton>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============ Services ============ */
const SERVICES = [
  {
    icon: Code2,
    title: "Business Websites",
    desc: "Modern multi-page sites that establish trust and convert visitors into customers.",
  },
  {
    icon: Rocket,
    title: "Landing Pages",
    desc: "High-converting single pages for product launches, ads and lead generation.",
  },
  {
    icon: Layers,
    title: "Portfolio Sites",
    desc: "Showcase your work with aesthetic, animation-rich personal portfolios.",
  },
  {
    icon: Wrench,
    title: "Maintenance & SEO",
    desc: "Ongoing updates, performance tuning, SSL, domain & basic on-page SEO.",
  },
];

export function ServicesSection() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section id="services" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionTitle
          kicker="Services"
          title={
            <>
              What I <span className="text-gradient">Build</span>
            </>
          }
          subtitle="Everything you need to launch a serious online presence."
        />
        <div
          ref={ref}
          className="reveal mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {SERVICES.map(({ icon: Icon, title, desc }) => (
            <TapCard
              key={title}
              className="rounded-2xl glass p-6 hover:-translate-y-2 hover:border-electric/50"
            >
              <div className="relative">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-electric to-electric-deep text-white shadow-[0_0_20px_rgba(10,132,255,0.4)] transition-transform group-hover:scale-110 group-hover:rotate-3 group-active:rotate-12">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-white">
                  {title}
                </h3>
                <p className="mt-2 text-sm text-white/60 leading-relaxed">
                  {desc}
                </p>
              </div>
            </TapCard>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============ Projects ============ */
export const PROJECTS = [
  {
    name: "Artful Smiles",
    tag: "Dental Clinic",
    url: "https://artful-smiles-web.vercel.app/",
    desc: "Elegant dental clinic website with appointment booking, services showcase and patient-friendly UX.",
  },
  {
    name: "Pristine Smiles Studio",
    tag: "Dental Studio",
    url: "https://pristine-smiles-studio.vercel.app/",
    desc: "Premium dental studio site with treatment menu, gallery and conversion-focused booking flow.",
  },
  {
    name: "Gentle Smiles Dental",
    tag: "Dental Practice",
    url: "https://gentle-smiles-dental.dantaniaman506.workers.dev/",
    desc: "Modern dental practice website hosted on edge — fast load, calming UI, clear CTAs.",
  },
  {
    name: "Pixel Perfect Pages",
    tag: "Agency Landing",
    url: "https://pixel-perfect-pages-chi.vercel.app/",
    desc: "Pixel-perfect agency landing page with rich animations, sticky nav and crisp typography.",
  },
];

function shotUrl(url: string) {
  // Free screenshot service — no API key required
  return `https://image.thum.io/get/width/1200/crop/750/noanimate/${url}`;
}

export function ProjectsSection({ limit }: { limit?: number }) {
  const ref = useReveal<HTMLDivElement>();
  const list = limit ? PROJECTS.slice(0, limit) : PROJECTS;
  return (
    <section id="projects" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionTitle
          kicker="Selected Work"
          title={
            <>
              Live <span className="text-gradient">Projects</span>
            </>
          }
          subtitle="Real client websites — shipped, live and converting. Tap any card to visit."
        />
        <div ref={ref} className="reveal mt-16 grid gap-6 md:grid-cols-2">
          {list.map((p) => (
            <TapCard
              key={p.url}
              href={p.url}
              className="block rounded-3xl glass hover:-translate-y-2 hover:border-electric/50 hover:shadow-[0_30px_80px_-30px_rgba(10,132,255,0.5)]"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-[#04060d]">
                <div
                  aria-hidden
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `url(${shotUrl(p.url)})`,
                    backgroundSize: "cover",
                    backgroundPosition: "top center",
                  }}
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"
                />
                <div className="absolute inset-x-4 bottom-4 flex items-center justify-between">
                  <span className="rounded-full bg-black/60 backdrop-blur px-3 py-1 text-xs text-white/90 border border-white/20">
                    {p.tag}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-electric px-3 py-1 text-xs font-semibold text-white shadow-[0_8px_30px_-6px_rgba(10,132,255,0.8)] opacity-0 group-hover:opacity-100 transition-opacity">
                    Visit <ExternalLink className="h-3 w-3" />
                  </span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-white">
                    {p.name}
                  </h3>
                  <ArrowRight className="h-5 w-5 text-white/40 transition-all group-hover:text-electric-glow group-hover:translate-x-1" />
                </div>
                <p className="mt-2 text-sm text-white/60">{p.desc}</p>
                <div className="mt-3 text-xs text-electric-glow/80 truncate">
                  {p.url.replace(/^https?:\/\//, "").replace(/\/$/, "")}
                </div>
              </div>
            </TapCard>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============ Pricing ============ */
export function PricingSection() {
  const ref = useReveal<HTMLDivElement>();
  const plans = [
    {
      kicker: "Flexible Plan",
      title: "One-Time + Monthly",
      price: "₹300",
      cycle: "/month",
      equivalent: null as string | null,
      dev: "₹4,000 – ₹6,000",
      features: [
        "Website Development (one-time)",
        "Monthly Maintenance ₹300/mo",
        "Domain Maintenance included",
        "Bug fixes & small updates",
        "Email support",
      ],
      cta: "Pay as you go",
      highlight: false,
    },
    {
      kicker: "Best Value",
      title: "One-Time + Annual",
      price: "₹3,000",
      cycle: "/year",
      equivalent: "≈ ₹250/month",
      dev: "₹4,000 – ₹6,000",
      features: [
        "Website Development (one-time)",
        "Annual Maintenance ₹3,000/yr",
        "Equivalent to just ₹250/month",
        "No monthly payments needed",
        "Priority Support",
        "Free minor design tweaks",
      ],
      cta: "Choose Annual — Save ₹600",
      highlight: true,
    },
  ];

  return (
    <section id="pricing" className="relative py-20 sm:py-28">
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(10,132,255,0.12), transparent 60%)",
        }}
      />
      <div className="mx-auto max-w-6xl px-6">
        <SectionTitle
          kicker="Pricing"
          title={
            <>
              Transparent{" "}
              <span className="text-gradient">Pricing Plans</span>
            </>
          }
          subtitle="Pick a plan. Get a beautiful website. Pay only for what you need."
        />

        <div
          ref={ref}
          className="reveal mt-16 grid gap-8 lg:grid-cols-2 lg:items-stretch"
        >
          {plans.map((p) => (
            <div
              key={p.title}
              className={`group relative rounded-3xl p-[1.5px] transition-all duration-500 ${
                p.highlight
                  ? "shadow-[0_30px_80px_-20px_rgba(10,132,255,0.55)] hover:-translate-y-2"
                  : "hover:-translate-y-1"
              }`}
              style={
                p.highlight
                  ? {
                      background:
                        "conic-gradient(from 0deg, #0a84ff, #3da9ff, #1e40af, #0a84ff)",
                    }
                  : { background: "rgba(255,255,255,0.08)" }
              }
            >
              {p.highlight && (
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 rounded-3xl opacity-50 blur-2xl"
                  style={{
                    background:
                      "conic-gradient(from 0deg, #0a84ff, #3da9ff, #1e40af, #0a84ff)",
                    animation: "border-spin 8s linear infinite",
                  }}
                />
              )}
              <div className="relative rounded-3xl bg-[#04060d] p-8 sm:p-10 h-full flex flex-col">
                {p.highlight && (
                  <div className="absolute -top-3 right-6 rounded-full bg-gradient-to-r from-electric to-electric-glow px-4 py-1 text-[11px] font-bold tracking-widest text-white shadow-[0_10px_30px_-10px_rgba(10,132,255,0.8)]">
                    ⭐ RECOMMENDED
                  </div>
                )}
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-electric-glow">
                  {p.highlight ? (
                    <Star className="h-3.5 w-3.5" />
                  ) : (
                    <Zap className="h-3.5 w-3.5" />
                  )}
                  {p.kicker}
                </div>
                <h3 className="mt-3 text-2xl font-bold text-white">
                  {p.title}
                </h3>

                <div className="mt-6 flex items-end gap-2">
                  <span className="text-5xl sm:text-6xl font-bold text-white tracking-tight">
                    {p.price}
                  </span>
                  <span className="pb-2 text-white/60">{p.cycle}</span>
                </div>
                {p.equivalent && (
                  <div className="mt-1 text-xs text-electric-glow">
                    {p.equivalent}
                  </div>
                )}

                <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.02] p-4">
                  <div className="text-[11px] uppercase tracking-widest text-white/50">
                    Website Development
                  </div>
                  <div className="mt-1 text-lg font-semibold text-white">
                    {p.dev}{" "}
                    <span className="text-xs font-normal text-white/50">
                      (one-time)
                    </span>
                  </div>
                </div>

                {p.highlight && (
                  <div className="mt-4 flex items-center gap-3 rounded-2xl border border-electric/40 bg-electric/10 p-4">
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-electric to-electric-deep text-white">
                      💰
                    </div>
                    <div>
                      <div className="text-base font-bold text-white">
                        Save ₹600
                      </div>
                      <div className="text-xs text-white/60">
                        vs monthly plan (₹3,600 → ₹3,000)
                      </div>
                    </div>
                  </div>
                )}

                <ul className="mt-6 space-y-3 flex-1">
                  {p.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-3 text-sm text-white/80"
                    >
                      <span className="mt-0.5 inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-electric/20 text-electric-glow">
                        <Check className="h-3 w-3" />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>

                <div className="mt-8">
                  <GlowButton
                    href={WHATSAPP}
                    variant={p.highlight ? "primary" : "ghost"}
                    className="w-full"
                  >
                    <MessageCircle className="h-4 w-4" /> {p.cta}
                  </GlowButton>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 rounded-2xl glass px-6 py-5 text-sm text-white/70">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-electric-glow" /> All plans include:
          </div>
          {["SSL Certificate", "Domain Setup", "Responsive Design", "Basic SEO"].map(
            (x) => (
              <span key={x} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-electric-glow" />{" "}
                {x}
              </span>
            ),
          )}
        </div>
      </div>
    </section>
  );
}

/* ============ Reviews ============ */
export const REVIEWS = [
  {
    name: "Dr. Vandana",
    role: "Oro-Dental Surgeon & Implantologist",
    site: "Artful Smiles",
    text:
      "Aman delivered exactly the look I wanted — calm, premium and trustworthy. Patients now book appointments directly from the website. Worth every rupee.",
    rating: 5,
  },
  {
    name: "Dr. Saloni Verma",
    role: "BDS · Cosmetic Dentistry",
    site: "Pristine Smiles Studio",
    text:
      "The website looks like it cost 10x what I paid. Smooth animations, beautiful layout and fast support whenever I needed a tweak. Highly recommended.",
    rating: 5,
  },
  {
    name: "Dr. Maitri Patel Kova",
    role: "BDS · Implantologist",
    site: "Gentle Smiles Dental",
    text:
      "Professional from day one. Aman understood my brand without endless meetings and built a site my patients genuinely compliment. 10/10 experience.",
    rating: 5,
  },
  {
    name: "Rohit Sharma",
    role: "Founder · Pixel Perfect Pages",
    site: "Agency Landing",
    text:
      "Crisp typography, pixel-perfect spacing and lightning fast. Aman is the rare developer who actually cares about design details.",
    rating: 5,
  },
  {
    name: "Neha Agarwal",
    role: "Boutique Owner",
    site: "E-commerce",
    text:
      "Got my store online in under a week. Sales doubled in the first month. Aman is reliable and his pricing is honest.",
    rating: 5,
  },
  {
    name: "Karan Mehta",
    role: "Real Estate Consultant",
    site: "Lead Gen Site",
    text:
      "Leads started coming in the same week we launched. Clean design, great mobile experience. Will hire again for my next project.",
    rating: 5,
  },
];

function Marquee({
  items,
  direction,
}: {
  items: typeof REVIEWS;
  direction: "left" | "right";
}) {
  const looped = [...items, ...items];
  return (
    <div className="relative">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-black to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-black to-transparent"
      />
      <div
        className="flex gap-5 w-max"
        style={{
          animation: `marquee ${direction === "left" ? "40s" : "45s"} linear infinite`,
          animationDirection: direction === "left" ? "normal" : "reverse",
        }}
      >
        {looped.map((r, i) => (
          <article
            key={i}
            className="w-[320px] sm:w-[400px] flex-shrink-0 glass rounded-2xl p-6 transition-all hover:border-electric/40 active:scale-[0.98]"
          >
            <div className="flex items-center gap-1 text-electric-glow">
              {Array.from({ length: r.rating }).map((_, k) => (
                <Star key={k} className="h-4 w-4 fill-current" />
              ))}
            </div>
            <p className="mt-3 text-sm text-white/80 leading-relaxed">
              "{r.text}"
            </p>
            <div className="mt-5 flex items-center gap-3 border-t border-white/10 pt-4">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-electric to-electric-deep text-white font-bold text-sm">
                {r.name
                  .replace("Dr. ", "")
                  .split(" ")
                  .map((s) => s[0])
                  .slice(0, 2)
                  .join("")}
              </div>
              <div>
                <div className="text-sm font-semibold text-white">{r.name}</div>
                <div className="text-xs text-white/50">{r.role}</div>
                <div className="text-[11px] text-electric-glow mt-0.5">
                  {r.site}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export function ReviewsSection() {
  const row1 = REVIEWS;
  const row2 = [...REVIEWS].reverse();
  return (
    <section id="reviews" className="relative py-20 sm:py-28 overflow-hidden">
      <div className="mx-auto max-w-6xl px-6">
        <SectionTitle
          kicker="Client Love"
          title={
            <>
              What clients <span className="text-gradient">are saying</span>
            </>
          }
          subtitle="Real feedback from doctors, founders and business owners I've worked with."
        />
      </div>

      <div className="mt-16 space-y-6">
        <Marquee items={row1} direction="left" />
        <Marquee items={row2} direction="right" />
      </div>
    </section>
  );
}

/* ============ Contact ============ */
export function ContactSection() {
  return (
    <section id="contact" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <SectionTitle
          kicker="Let's Talk"
          title={
            <>
              Ready to build{" "}
              <span className="text-gradient">something premium?</span>
            </>
          }
          subtitle="Tell me about your business — I usually reply within an hour on WhatsApp."
        />

        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          <TapCard
            href={WHATSAPP}
            className="block rounded-2xl glass p-6 text-left hover:-translate-y-1 hover:border-electric/50"
          >
            <div className="flex items-center gap-4">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-electric to-electric-deep text-white group-active:rotate-12 transition-transform">
                <MessageCircle className="h-6 w-6" />
              </div>
              <div>
                <div className="text-xs uppercase tracking-widest text-white/50">
                  WhatsApp
                </div>
                <div className="text-lg font-semibold text-white">
                  +91 6398505806
                </div>
              </div>
            </div>
          </TapCard>
          <TapCard
            href="mailto:dantaniaman506@gmail.com"
            className="block rounded-2xl glass p-6 text-left hover:-translate-y-1 hover:border-electric/50"
          >
            <div className="flex items-center gap-4">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-electric to-electric-deep text-white group-active:rotate-12 transition-transform">
                <Mail className="h-6 w-6" />
              </div>
              <div>
                <div className="text-xs uppercase tracking-widest text-white/50">
                  Email
                </div>
                <div className="text-lg font-semibold text-white break-all">
                  dantaniaman506@gmail.com
                </div>
              </div>
            </div>
          </TapCard>
        </div>

        <div className="mt-10">
          <GlowButton href={WHATSAPP} className="!px-10 !py-5 !text-base">
            <MessageCircle className="h-5 w-5" /> Message Me on WhatsApp
          </GlowButton>
        </div>
      </div>
    </section>
  );
}

/* ============ Page wrapper ============ */
export function PageHeader({
  kicker,
  title,
  subtitle,
}: {
  kicker: string;
  title: ReactNode;
  subtitle?: string;
}) {
  return (
    <section className="relative pt-36 pb-10 sm:pt-44">
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(10,132,255,0.2), transparent 70%)",
        }}
      />
      <div className="mx-auto max-w-4xl px-6 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-electric/30 bg-electric/10 px-4 py-1.5 text-xs font-medium text-electric-glow uppercase tracking-widest">
          <Sparkles className="h-3 w-3" /> {kicker}
        </div>
        <h1 className="mt-5 text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.05]">
          {title}
        </h1>
        {subtitle && (
          <p className="mx-auto mt-5 max-w-2xl text-base sm:text-lg text-white/65">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
