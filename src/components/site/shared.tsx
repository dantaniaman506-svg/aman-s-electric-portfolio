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
  Shield,
  Menu,
  X,
  ChevronDown,
  Globe,
  Monitor,
  Eye,
  Banknote,
  Flame,
  Sun,
  Moon,
  Github,
  Bot,
  Heart,
  type LucideIcon,
} from "lucide-react";

export const WHATSAPP =
  "https://wa.me/916398505806?text=Hi%20Aman%2C%20I%27m%20interested%20in%20your%20website%20development%20services.";
const BLACK_FRIDAY_WHATSAPP =
  "https://wa.me/916398505806?text=Hi%20Aman%2C%20I%27d%20like%20to%20claim%20a%20Black%20Friday%20website%20for%20%2460.";

/* ============ Smooth scroll helper ============ */
function scrollTo(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

/* ============ Hooks ============ */
export function useReveal<T extends HTMLElement>(delay = 0) {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setTimeout(() => {
              e.target.classList.add("reveal-in");
            }, delay);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);
  return ref;
}

export function useStaggerReveal<T extends HTMLElement>(delayStep = 100) {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const items = el.querySelectorAll(".rc");
          items.forEach((item, i) => {
            setTimeout(() => {
              item.classList.add("reveal-child-in");
            }, i * delayStep);
          });
          io.unobserve(el);
        }
      },
      { threshold: 0.05 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delayStep]);
  return ref;
}

/* ============ Tap / ripple effect ============ */
function useTap() {
  const [bursts, setBursts] = useState<{ x: number; y: number; id: number }[]>([]);
  const onPointerDown = (e: React.PointerEvent<HTMLElement>) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const id = performance.now();
    setBursts((b) => [...b, { x: e.clientX - rect.left, y: e.clientY - rect.top, id }]);
    setTimeout(() => setBursts((b) => b.filter((p) => p.id !== id)), 750);
  };
  const layer = bursts.map((r) => (
    <span
      key={r.id}
      aria-hidden
      className="pointer-events-none absolute z-30 rounded-full"
      style={{
        left: r.x - 14,
        top: r.y - 14,
        width: 28,
        height: 28,
        background:
          "radial-gradient(circle, rgba(61,169,255,0.9), rgba(10,132,255,0.4) 50%, transparent 70%)",
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
  sectionId,
  onClick,
  dataTestId,
  variant = "primary",
  className = "",
}: {
  children: ReactNode;
  href?: string;
  sectionId?: string;
  onClick?: () => void;
  dataTestId?: string;
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
      ? "glow-button-primary text-white shadow-[0_10px_40px_-10px_rgba(10,132,255,0.6)] hover:shadow-[0_20px_60px_-10px_rgba(10,132,255,0.95)] hover:-translate-y-0.5"
      : "glow-button-ghost text-white border border-white/15 hover:border-electric-glow/60 hover:bg-electric/10 hover:-translate-y-0.5 active:bg-electric/20";

  const inner = (
    <>
      {variant === "primary" && (
        <span
          aria-hidden
          className="absolute inset-0 -z-10"
          style={{
            background: "linear-gradient(120deg, #0a84ff, #3da9ff, #0a84ff, #1e40af)",
            backgroundSize: "300% 300%",
            animation: "gradient-shift 4s ease infinite",
          }}
        />
      )}
      <span
        aria-hidden
        className={`pointer-events-none absolute inset-0 transition-opacity duration-300 ${flash ? "opacity-100" : "opacity-0"}`}
        style={{ background: "linear-gradient(120deg, rgba(255,255,255,0.55), rgba(61,169,255,0.45))" }}
      />
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      {layer}
    </>
  );

  if (sectionId) {
    return (
      <button
        onPointerDown={handle}
        onClick={() => { scrollTo(sectionId); onClick?.(); }}
        data-testid={dataTestId}
        className={`${base} ${styles} ${className}`}
      >
        {inner}
      </button>
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
        data-testid={dataTestId}
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
      data-testid={dataTestId}
      className={`${base} ${styles} ${className}`}
    >
      {inner}
    </button>
  );
}

/* ============ TapCard ============ */
export function TapCard({
  children,
  className = "",
  href,
  sectionId,
}: {
  children: ReactNode;
  className?: string;
  href?: string;
  sectionId?: string;
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
      className={`pointer-events-none absolute inset-0 z-20 transition-opacity duration-300 ${flash ? "opacity-100" : "opacity-0"}`}
      style={{ background: "radial-gradient(600px circle at center, rgba(10,132,255,0.18), transparent 60%)" }}
    />
  );
  const cls = `group relative overflow-hidden transition-all duration-300 active:scale-[0.985] touch-manipulation cursor-pointer will-change-transform ${className}`;

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
    <div
      onPointerDown={handle}
      onClick={sectionId ? () => scrollTo(sectionId) : undefined}
      className={cls}
    >
      {children}
      {flashLayer}
      {layer}
    </div>
  );
}

/* ============ CursorGlow ============ */
export function CursorGlow() {
  const [pos, setPos] = useState({ x: -400, y: -400 });
  const raf = useRef<number>(0);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      cancelAnimationFrame(raf.current);
      raf.current = requestAnimationFrame(() => setPos({ x: e.clientX, y: e.clientY }));
    };
    window.addEventListener("mousemove", move, { passive: true });
    return () => { window.removeEventListener("mousemove", move); cancelAnimationFrame(raf.current); };
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed z-[9997] hidden md:block"
      style={{
        top: 0,
        left: 0,
        width: 500,
        height: 500,
        transform: `translate(${pos.x - 250}px, ${pos.y - 250}px)`,
        background: "radial-gradient(circle, rgba(10,132,255,0.055) 0%, transparent 65%)",
        transition: "transform 0.12s cubic-bezier(0.22, 1, 0.36, 1)",
        willChange: "transform",
      }}
    />
  );
}

/* ============ StatCard (animated counter) ============ */
function StatCard({ val, label, delay = 0 }: { val: string; label: string; delay?: number }) {
  const match = val.match(/^(\d+)(.*)$/);
  const num = match ? parseInt(match[1]) : null;
  const suffix = match ? match[2] : "";
  const canCount = num !== null && !val.includes("/");

  const [count, setCount] = useState(0);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); io.unobserve(el); }
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!visible || !canCount || num === null) return;
    const start = performance.now();
    const dur = 1600 + delay;
    const tick = (now: number) => {
      const t = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setCount(Math.floor(eased * num));
      if (t < 1) requestAnimationFrame(tick);
      else setCount(num);
    };
    const tid = setTimeout(() => requestAnimationFrame(tick), delay);
    return () => clearTimeout(tid);
  }, [visible, canCount, num, delay]);

  return (
    <div
      ref={ref}
      className="glass rounded-2xl p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_-8px_rgba(10,132,255,0.4)] active:scale-95 will-change-transform"
      style={{ animation: visible ? `count-up 0.6s ${delay * 0.5}ms cubic-bezier(0.22,1,0.36,1) both` : "none" }}
    >
      <div className="text-2xl sm:text-3xl font-bold text-gradient font-display">
        {canCount ? `${count}${suffix}` : val}
      </div>
      <div className="mt-1 text-xs text-white/60">{label}</div>
    </div>
  );
}

/* ============ SectionTitle ============ */
export function SectionTitle({ kicker, title, subtitle }: {
  kicker: string;
  title: ReactNode;
  subtitle?: string;
}) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div ref={ref} className="reveal mx-auto max-w-2xl text-center">
      <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs font-medium tracking-widest text-electric-glow uppercase">
        <Sparkles className="h-3 w-3" /> {kicker}
      </div>
      <h2 className="font-display mt-5 text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
        {title}
      </h2>
      {subtitle && <p className="mt-4 text-base text-white/60">{subtitle}</p>}
    </div>
  );
}

/* ============ Animated Background ============ */
export function PageBackground() {
  return (
    <>
      <div className="page-background-base fixed inset-0 -z-20" />
      <div className="fixed inset-0 -z-10 grid-bg opacity-40" />
      {/* Aurora top */}
      <div
        className="fixed -z-10 pointer-events-none"
        style={{
          top: "-20%",
          left: "10%",
          right: "10%",
          height: "55%",
          background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(10,132,255,0.22), transparent 70%)",
          animation: "aurora 12s ease-in-out infinite",
        }}
      />
      {/* Floating orbs */}
      <div
        aria-hidden
        className="fixed -z-10 rounded-full blur-[100px] pointer-events-none"
        style={{
          left: "15%",
          top: "30%",
          width: 360,
          height: 360,
          background: "rgba(10,132,255,0.18)",
          animation: "float-orb 14s ease-in-out infinite",
        }}
      />
      <div
        aria-hidden
        className="fixed -z-10 rounded-full blur-[120px] pointer-events-none"
        style={{
          right: "10%",
          top: "55%",
          width: 320,
          height: 320,
          background: "rgba(30,64,175,0.22)",
          animation: "float-orb 18s ease-in-out infinite reverse",
        }}
      />
      <div
        aria-hidden
        className="fixed -z-10 rounded-full blur-[80px] pointer-events-none"
        style={{
          left: "55%",
          top: "75%",
          width: 200,
          height: 200,
          background: "rgba(61,169,255,0.12)",
          animation: "float-orb 22s ease-in-out infinite 4s",
        }}
      />
    </>
  );
}

/* ============ Global Touch Ripple Effect ============ */
export function GlobalTouchEffect() {
  const [taps, setTaps] = useState<{ id: number; x: number; y: number }[]>([]);

  useEffect(() => {
    const handler = (e: PointerEvent) => {
      const id = performance.now() + Math.random();
      setTaps((t) => [...t, { id, x: e.clientX, y: e.clientY }]);
      setTimeout(() => setTaps((t) => t.filter((p) => p.id !== id)), 1100);
    };
    window.addEventListener("pointerdown", handler, { passive: true });
    return () => window.removeEventListener("pointerdown", handler);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999]" aria-hidden>
      {taps.map((t) => (
        <div key={t.id} style={{ position: "absolute", left: t.x, top: t.y }}>
          {/* Center dot flash */}
          <span
            className="absolute rounded-full"
            style={{
              width: 10, height: 10,
              background: "radial-gradient(circle, #fff 0%, #3da9ff 50%, transparent 80%)",
              boxShadow: "0 0 12px 4px rgba(61,169,255,0.7)",
              animation: "touch-dot 0.45s ease-out forwards",
            }}
          />
          {/* Single large expanding ring */}
          <span
            className="absolute rounded-full"
            style={{
              width: 120, height: 120,
              border: "1.5px solid rgba(61,169,255,0.85)",
              boxShadow: "0 0 10px rgba(10,132,255,0.25), inset 0 0 10px rgba(10,132,255,0.05)",
              animation: "touch-ring-3 0.75s cubic-bezier(0.2,1,0.4,1) forwards",
            }}
          />
        </div>
      ))}
    </div>
  );
}

/* ============ Navbar ============ */
const NAV_LINKS = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Services", id: "services" },
  { label: "Process", id: "process" },
  { label: "Projects", id: "projects" },
  { label: "Pricing", id: "pricing" },
  { label: "Reviews", id: "reviews" },
  { label: "FAQ", id: "faq" },
  { label: "Contact", id: "contact" },
] as const;

export function Navbar({
  theme,
  onThemeChange,
}: {
  theme: "light" | "dark";
  onThemeChange: () => void;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [bannerVisible, setBannerVisible] = useState(
    () => sessionStorage.getItem("black-friday-banner-dismissed") !== "true",
  );
  const [active, setActive] = useState("home");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      const sections = NAV_LINKS.map((l) => document.getElementById(l.id));
      for (let i = sections.length - 1; i >= 0; i--) {
        const sec = sections[i];
        if (sec && sec.getBoundingClientRect().top <= 120) {
          setActive(NAV_LINKS[i].id);
          break;
        }
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? "pb-2" : "pb-4"}`}>
        {bannerVisible && (
          <div className="black-friday-banner relative flex min-h-9 w-full items-center justify-center px-10 py-1.5">
            <button
              type="button"
              onClick={() => scrollTo("black-friday")}
              data-testid="button-black-friday-banner"
              className="inline-flex items-center justify-center gap-2 text-center text-[9px] font-extrabold uppercase tracking-[0.1em] text-white sm:text-xs sm:tracking-[0.12em]"
            >
              <Flame className="h-3.5 w-3.5 flex-shrink-0" />
              <span>🔥 Black Friday 🖤 · 9 websites · $60 each</span>
              <span className="hidden rounded-full border border-white/35 px-2 py-0.5 text-[9px] sm:inline">See offer</span>
            </button>
            <button
              type="button"
              onClick={() => {
                sessionStorage.setItem("black-friday-banner-dismissed", "true");
                setBannerVisible(false);
              }}
              aria-label="Dismiss Black Friday banner"
              title="Dismiss promotion"
              data-testid="button-dismiss-black-friday-banner"
              className="black-friday-dismiss absolute right-2 inline-flex h-7 w-7 items-center justify-center rounded-full transition-colors hover:bg-white/20 sm:right-4"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        )}
        <nav className={`mx-auto flex max-w-6xl items-center justify-between rounded-full px-4 sm:px-5 py-3 mx-3 sm:mx-auto transition-all duration-500 ${scrolled ? "glass border border-white/10 shadow-[0_10px_40px_-20px_rgba(10,132,255,0.5)]" : "border border-transparent"}`}>
          <button
            onClick={() => scrollTo("home")}
            data-testid="button-home"
            className="flex items-center gap-2 group active:scale-95 transition-transform"
          >
            <span className="brand-chip relative inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-electric to-electric-deep text-white font-bold shadow-[0_0_20px_rgba(10,132,255,0.5)] transition-transform group-hover:scale-110 group-hover:rotate-3">
              AD
            </span>
            <span className="hidden sm:block text-sm font-semibold tracking-wide text-white">
              Aman Dantani
            </span>
          </button>

          <div className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((l) => (
              <button
                key={l.id}
                onClick={() => scrollTo(l.id)}
                className={`group relative px-3 py-2 text-sm transition-colors active:scale-95 ${active === l.id ? "text-electric-glow" : "text-white/70 hover:text-white"}`}
              >
                <span className="relative">
                  {l.label}
                  <span className={`absolute -bottom-1 left-0 h-px bg-electric-glow transition-all duration-300 ${active === l.id ? "w-full" : "w-0 group-hover:w-full"}`} />
                </span>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onThemeChange}
              aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
              aria-pressed={theme === "dark"}
              data-testid="button-theme-toggle"
              className="theme-toggle inline-flex h-10 w-10 items-center justify-center rounded-full glass border border-white/10 transition-transform hover:-translate-y-0.5 active:scale-90"
            >
              {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </button>
            <GlowButton href={WHATSAPP} className="!px-4 !py-2.5 !text-xs hidden sm:inline-flex">
              Hire Me <ArrowRight className="h-3.5 w-3.5" />
            </GlowButton>
            <button
              onClick={() => setOpen((o) => !o)}
              aria-label="Toggle menu"
              data-testid="button-menu-toggle"
              className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-full glass border border-white/10 text-white active:scale-90 transition-transform"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile drawer */}
      <div className={`fixed inset-0 z-40 lg:hidden transition-all duration-300 ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
        <div className="absolute inset-0 bg-black/85 backdrop-blur-xl" onClick={() => setOpen(false)} />
        <div className={`absolute right-3 left-3 top-20 rounded-3xl glass border border-white/10 p-6 transition-all duration-300 ${open ? "translate-y-0" : "-translate-y-4"}`}>
          <div className="flex flex-col gap-1">
            {NAV_LINKS.map((l) => (
              <button
                key={l.id}
                onClick={() => { scrollTo(l.id); setOpen(false); }}
                className={`rounded-2xl border px-4 py-3 text-base font-medium transition-all active:scale-[0.97] text-left ${active === l.id ? "bg-electric/15 text-electric-glow border-electric/30" : "text-white/80 border-white/5 hover:bg-white/5"}`}
              >
                {l.label}
              </button>
            ))}
            <div className="mt-3">
              <GlowButton href={WHATSAPP} onClick={() => setOpen(false)} className="w-full">
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
  const links = [
    { label: "Home", id: "home" },
    { label: "About", id: "about" },
    { label: "Projects", id: "projects" },
    { label: "Pricing", id: "pricing" },
    { label: "FAQ", id: "faq" },
  ];
  return (
    <footer className="relative border-t border-white/8 pt-12 pb-8 mt-6">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 40% at 50% 100%, rgba(10,132,255,0.07), transparent 80%)" }}
      />
      <div className="mx-auto max-w-6xl px-6">
        {/* Top row */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-8 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="brand-chip inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-electric to-electric-deep text-white font-bold text-sm shadow-[0_8px_24px_-8px_rgba(10,132,255,0.6)]">
                AD
              </span>
              <div>
                <div className="text-sm font-semibold text-white">Aman Dantani</div>
                <div className="text-[11px] text-white/40">Website Developer</div>
              </div>
            </div>
            <p className="text-xs text-white/40 max-w-xs leading-relaxed">
              Building premium websites for doctors, founders and businesses across India. Fast. Clean. Conversion-focused.
            </p>
          </div>
          {/* Nav links */}
          <div className="flex flex-wrap justify-center sm:justify-end gap-x-6 gap-y-2">
            {links.map((l) => (
              <button
                key={l.id}
                onClick={() => scrollTo(l.id)}
                className="text-sm text-white/50 hover:text-electric-glow transition-colors"
              >
                {l.label}
              </button>
            ))}
            <a href={WHATSAPP} target="_blank" rel="noreferrer" className="text-sm text-electric-glow/80 hover:text-electric-glow transition-colors font-medium">
              Hire Me →
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* Bottom row */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/30">
          <span>© {new Date().getFullYear()} Aman Dantani. All rights reserved.</span>
          <span className="flex items-center gap-1">
            Made with <span className="text-electric-glow">♥</span> using React + Tailwind
          </span>
        </div>
      </div>
    </footer>
  );
}

/* ============ Hero ============ */
export function Hero() {
  const roles = ["Business Websites", "Landing Pages", "Portfolio Sites", "Conversion UX"];
  const [idx, setIdx] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = roles[idx];
    const speed = deleting ? 40 : 75;
    const timer = setTimeout(() => {
      if (!deleting && text === current) {
        setTimeout(() => setDeleting(true), 1600);
        return;
      }
      if (deleting && text === "") {
        setDeleting(false);
        setIdx((i) => (i + 1) % roles.length);
        return;
      }
      setText(deleting ? current.slice(0, text.length - 1) : current.slice(0, text.length + 1));
    }, speed);
    return () => clearTimeout(timer);
  }, [text, deleting, idx]);

  return (
    <section id="home" className="relative isolate flex min-h-[94vh] items-center overflow-hidden pt-28 pb-20">
      <div className="mx-auto max-w-6xl px-6 text-center w-full">
        {/* Available badge */}
        <div
          className="inline-flex items-center gap-2 rounded-full border border-electric/30 bg-electric/10 px-4 py-1.5 text-xs font-medium text-electric-glow"
          style={{ animation: "fade-in 0.6s ease forwards" }}
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-electric-glow opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-electric-glow" />
          </span>
          Available for new projects
        </div>

        <h1
          className="font-display mt-6 text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.95]"
          style={{ animation: "fade-up 0.7s 0.1s ease both" }}
        >
          <span className="block text-white">Aman Dantani</span>
          <span className="block text-gradient mt-2">Website Development</span>
        </h1>

        <p
          className="mx-auto mt-6 max-w-2xl text-base sm:text-lg text-white/70"
          style={{ animation: "fade-up 0.7s 0.2s ease both" }}
        >
          I build{" "}
          <span className="text-white font-semibold">aesthetic, fast & conversion-focused</span>{" "}
          websites.{" "}
          <span className="text-electric-glow font-semibold">50+ businesses</span>{" "}
          already live online.
        </p>

        <div
          className="mt-8 flex h-8 items-center justify-center text-base sm:text-lg text-white/80"
          style={{ animation: "fade-up 0.7s 0.3s ease both" }}
        >
          <span className="text-white/50 mr-2">I craft</span>
          <span className="text-electric-glow font-semibold min-w-[2ch]">{text}</span>
          <span className="ml-0.5 inline-block h-5 w-0.5 bg-electric-glow" style={{ animation: "blink 1s steps(2) infinite" }} />
        </div>

        <div
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
          style={{ animation: "fade-up 0.7s 0.4s ease both" }}
        >
          <GlowButton sectionId="projects">
            View Projects <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </GlowButton>
          <GlowButton href={WHATSAPP} variant="ghost">
            <MessageCircle className="h-4 w-4" /> Chat on WhatsApp
          </GlowButton>
        </div>

        {/* Stats */}
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto">
          {[
            { val: "50+", label: "Websites Built",    delay: 0   },
            { val: "3+",  label: "Years Experience",  delay: 120 },
            { val: "100%",label: "Client Focus",      delay: 240 },
            { val: "24/7",label: "Support",           delay: 360 },
          ].map(({ val, label, delay }) => (
            <StatCard key={label} val={val} label={label} delay={delay} />
          ))}
        </div>

        {/* Scroll hint */}
        <div className="mt-10 flex justify-center" style={{ animation: "fade-in 1s 1s ease both" }}>
          <button
            onClick={() => scrollTo("about")}
            className="flex flex-col items-center gap-1 text-white/30 hover:text-white/60 transition-colors group"
          >
            <span className="text-[10px] tracking-widest uppercase">Scroll</span>
            <ChevronDown className="h-4 w-4 animate-bounce" />
          </button>
        </div>
      </div>
    </section>
  );
}

/* ============ About ============ */
export function AboutSection() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section id="about" className="relative py-16 sm:py-20">
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{ background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(10,132,255,0.1), transparent 70%)" }}
      />
      <div ref={ref} className="reveal mx-auto max-w-6xl px-6 grid gap-12 lg:grid-cols-2 lg:items-center">
        {/* Photo */}
        <div className="relative mx-auto w-full max-w-sm">
          {/* Blurred glow behind card */}
          <div
            aria-hidden
            className="absolute -inset-8 rounded-[2.5rem] opacity-50 blur-3xl pointer-events-none"
            style={{ background: "radial-gradient(ellipse at center, rgba(10,132,255,0.5), rgba(30,64,175,0.3), transparent 70%)" }}
          />
          {/* Card with static animated-border */}
          <div className="relative rounded-[2rem] p-[2px] overflow-hidden">
            {/* The spinning gradient ONLY for the border — stays inside overflow:hidden */}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-[-100%] block"
              style={{
                background: "conic-gradient(from 0deg, #0a84ff 0%, #3da9ff 25%, #1e40af 50%, #3da9ff 75%, #0a84ff 100%)",
                animation: "border-spin 6s linear infinite",
              }}
            />
            {/* Static image layer — not affected by the spin */}
            <div className="relative overflow-hidden rounded-[1.85rem] bg-black">
              <img
                src="/aman.png"
                alt="Aman Dantani — Website Developer"
                loading="lazy"
                className="block w-full h-auto object-cover object-center aspect-[3/4] transition-transform duration-700 hover:scale-105"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{ background: "linear-gradient(180deg, transparent 52%, rgba(0,0,0,0.88) 100%)" }}
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
          {/* Floating badges */}
          <div
            className="absolute -left-4 top-10 glass rounded-2xl px-4 py-3 hidden sm:block border border-electric/20"
            style={{ animation: "float-orb 6s ease-in-out infinite" }}
          >
            <div className="text-[10px] uppercase tracking-widest text-white/50">Stack</div>
            <div className="text-sm font-semibold text-white">React · TS · Tailwind</div>
          </div>
          <div
            className="absolute -right-4 bottom-16 glass rounded-2xl px-4 py-3 hidden sm:block border border-electric/20"
            style={{ animation: "float-orb 8s ease-in-out infinite reverse" }}
          >
            <div className="text-[10px] uppercase tracking-widest text-white/50">Based in</div>
            <div className="text-sm font-semibold text-white">India · Remote</div>
          </div>
        </div>

        {/* Text */}
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs font-medium tracking-widest text-electric-glow uppercase">
            <Sparkles className="h-3 w-3" /> About Me
          </div>
          <h2 className="mt-5 text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
            Hi, I'm <span className="text-gradient">Aman Dantani</span> — a website developer obsessed with details.
          </h2>
          <p className="mt-5 text-base text-white/70 leading-relaxed">
            For the last 3+ years I've helped doctors, founders and small businesses look premium online. I write clean code, design with intent, and ship fast — so your website not only looks aesthetic, but actually brings in customers.
          </p>
          <p className="mt-3 text-base text-white/60 leading-relaxed">
            From pixel-perfect landing pages to full multi-page business sites with SEO and ongoing maintenance — I handle it end-to-end so you can focus on your business.
          </p>

          <div className="mt-7 grid grid-cols-2 gap-3 max-w-md">
            {[
              ["Pixel-perfect", "Design"],
              ["Lightning", "Fast"],
              ["Mobile-first", "Always"],
              ["Honest", "Pricing"],
            ].map(([a, b]) => (
              <div key={a} className="glass rounded-xl px-4 py-3 transition-all active:scale-95 hover:border-electric/30 hover:bg-electric/5">
                <div className="text-sm font-semibold text-white">{a}</div>
                <div className="text-xs text-electric-glow">{b}</div>
              </div>
            ))}
          </div>

          {/* Tech stack */}
          <div className="mt-7">
            <div className="text-[10px] uppercase tracking-widest text-white/40 mb-3">Tools I Build With</div>
            <div className="flex flex-wrap gap-2">
              {[
                { name: "JSON", mark: "{}", color: "#64748b", icon: undefined },
                { name: "Python", mark: "Py", color: "#3776ab", icon: undefined },
                { name: "GitHub", mark: "gh", color: "#24292f", icon: Github },
                { name: "Vercel", mark: "▲", color: "#111827", icon: undefined },
                { name: "Replit", mark: "R", color: "#f26207", icon: undefined },
                { name: "Lovable", mark: "♥", color: "#e85d75", icon: Heart },
                { name: "Claude Code", mark: "✳", color: "#d97757", icon: undefined },
                { name: "ChatGPT", mark: "AI", color: "#10a37f", icon: Bot },
              ].map(({ name, mark, color, icon: Icon }) => (
                <span
                  key={name}
                  data-testid={`tool-badge-${name.toLowerCase().replaceAll(" ", "-")}`}
                  className="tool-badge inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-xs font-medium text-white/75 transition-all hover:-translate-y-0.5 hover:border-electric/40"
                >
                  <span className="brand-tool-mark" style={{ color }}>
                    {Icon ? <Icon className="h-3.5 w-3.5" /> : mark}
                  </span>
                  {name}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <GlowButton href={WHATSAPP}>
              <MessageCircle className="h-4 w-4" /> Let's Work Together
            </GlowButton>
            <GlowButton sectionId="projects" variant="ghost">
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
    color: "#0a84ff",
  },
  {
    icon: Rocket,
    title: "Landing Pages",
    desc: "High-converting single pages for product launches, ads and lead generation.",
    color: "#3da9ff",
  },
  {
    icon: Layers,
    title: "Portfolio Sites",
    desc: "Showcase your work with aesthetic, animation-rich personal portfolios.",
    color: "#1e40af",
  },
  {
    icon: Wrench,
    title: "Maintenance & SEO",
    desc: "Ongoing updates, performance tuning, SSL, domain & basic on-page SEO.",
    color: "#2563eb",
  },
];

export function ServicesSection() {
  const ref = useStaggerReveal<HTMLDivElement>(90);
  return (
    <section id="services" className="relative py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <SectionTitle
          kicker="Services"
          title={<>What I <span className="text-gradient">Build</span></>}
          subtitle="Everything you need to launch a serious online presence."
        />
        <div ref={ref} className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map(({ icon: Icon, title, desc, color }) => (
            <TapCard
              key={title}
              className="rc reveal-child rounded-2xl glass p-6 hover:-translate-y-2 hover:border-electric/50 hover:shadow-[0_20px_60px_-20px_rgba(10,132,255,0.4)]"
            >
              <div className="relative">
                <div
                  className="inline-flex h-12 w-12 items-center justify-center rounded-xl text-white shadow-[0_0_20px_rgba(10,132,255,0.3)] transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6"
                  style={{ background: `linear-gradient(135deg, ${color}, ${color}88)` }}
                >
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="font-display mt-5 text-lg font-semibold text-white">{title}</h3>
                <p className="mt-2 text-sm text-white/60 leading-relaxed">{desc}</p>
                <div className="mt-4 h-px bg-gradient-to-r from-electric/30 to-transparent" />
                <div className="mt-3 text-xs text-electric-glow flex items-center gap-1 group-hover:gap-2 transition-all">
                  Learn more <ArrowRight className="h-3 w-3" />
                </div>
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
    name: "NexGen Digital Canvas",
    tag: "Digital Studio",
    url: "https://nexgen-digital-canvas.vercel.app/",
    desc: "A live digital studio website with a distinctive visual identity and a polished online experience.",
    accent: "#0a84ff",
    num: "01",
    localImg: null as string | null,
  },
  {
    name: "Advance Speech & Hearing",
    tag: "Health & Wellness",
    url: "https://www.advancespeechandhearing.com/",
    desc: "A welcoming online destination for speech and hearing care.",
    accent: "#3da9ff",
    num: "02",
    localImg: null as string | null,
  },
  {
    name: "Smile Architects Studio",
    tag: "Dental Studio",
    url: "https://smile-architects-studio.vercel.app/",
    desc: "A modern dental studio website designed to make services easy to explore.",
    accent: "#f97380",
    num: "03",
    localImg: null as string | null,
  },
  {
    name: "Glam by Dia",
    tag: "Beauty & Lifestyle",
    url: "https://glam-by-dia-website-xvwf.vercel.app/",
    desc: "A stylish beauty brand website with an elegant, easy-to-browse presentation.",
    accent: "#d946a6",
    num: "04",
    localImg: null as string | null,
  },
  {
    name: "Growth Catalyst",
    tag: "Business",
    url: "https://growth-catalyst-site-one.vercel.app/",
    desc: "A focused business website for presenting services and helping visitors take action.",
    accent: "#22c55e",
    num: "05",
    localImg: null as string | null,
  },
  {
    name: "Lunar Balance",
    tag: "Wellness",
    url: "https://lunar-balance-flux.vercel.app/auth",
    desc: "A calm, contemporary wellness experience with a dedicated sign-in page.",
    accent: "#a78bfa",
    num: "06",
    localImg: null as string | null,
  },
];

function ProjectCard({ p }: { p: typeof PROJECTS[0] }) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);
  const imgSrc = p.localImg ?? `https://image.thum.io/get/width/1200/crop/675/noanimate/${p.url}`;

  return (
    <TapCard
      href={p.url}
      className="rc reveal-child block glass overflow-hidden rounded-3xl transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_40px_100px_-30px_rgba(10,132,255,0.5)] hover:border-electric/50"
    >
      {/* Screenshot preview */}
      <div
        className="relative aspect-[16/9] overflow-hidden"
        style={{ background: `linear-gradient(135deg, #060a14 0%, ${p.accent}18 60%, #030609 100%)` }}
      >
        {/* Fallback bg pattern */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle, ${p.accent}20 1px, transparent 1px)`,
            backgroundSize: "24px 24px",
          }}
        />

        {/* Screenshot — local image or thum.io */}
        {!imgError && (
          <img
            src={imgSrc}
            alt={`${p.name} screenshot`}
            loading="lazy"
            onLoad={() => setImgLoaded(true)}
            onError={() => setImgError(true)}
            style={{ filter: p.localImg ? "none" : "brightness(0.65) saturate(1.1)" }}
            className={`absolute inset-0 w-full h-full object-cover object-top transition-all duration-700 ${imgLoaded ? "opacity-100 scale-100" : "opacity-0 scale-[1.03]"}`}
          />
        )}

        {/* Strong dark overlay — works for both light & dark site screenshots */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/65 to-black/25" />

        {/* Top browser bar */}
        <div
          className="absolute top-0 inset-x-0 h-7 flex items-center gap-2 px-3 z-10"
          style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(8px)" }}
        >
          <div className="flex gap-1.5 flex-shrink-0">
            <span className="h-2 w-2 rounded-full bg-white/20" />
            <span className="h-2 w-2 rounded-full bg-white/20" />
            <span className="h-2 w-2 rounded-full bg-white/20" />
          </div>
          <div className="flex-1 mx-2 h-3.5 rounded-full bg-white/10 flex items-center px-2 overflow-hidden">
            <span className="text-[8px] text-white/40 truncate leading-none">
              {p.url.replace(/^https?:\/\//, "").replace(/\/$/, "")}
            </span>
          </div>
          <div
            className="flex-shrink-0 flex items-center gap-1 rounded-full px-2 py-0.5 text-[9px] font-semibold text-white opacity-0 group-hover:opacity-100 transition-all duration-300"
            style={{ background: p.accent }}
          >
            <ExternalLink className="h-2.5 w-2.5" /> Open
          </div>
        </div>

        {/* Bottom meta */}
        <div className="absolute bottom-0 inset-x-0 p-4 z-10 flex items-end justify-between">
          <div>
            <span
              className="inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-semibold tracking-wide"
              style={{ background: `${p.accent}30`, color: p.accent, border: `1px solid ${p.accent}50` }}
            >
              {p.tag}
            </span>
          </div>
          <span className="text-4xl font-black text-white/10 leading-none select-none">{p.num}</span>
        </div>
      </div>

      {/* Card body */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-white leading-snug">{p.name}</h3>
            <p className="mt-1.5 text-sm text-white/55 leading-relaxed">{p.desc}</p>
          </div>
          <div
            className="flex-shrink-0 h-10 w-10 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:-rotate-6"
            style={{ background: `${p.accent}20`, border: `1px solid ${p.accent}40` }}
          >
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" style={{ color: p.accent }} />
          </div>
        </div>
        <div className="mt-4 flex items-center gap-2 text-xs text-electric-glow/60">
          <Globe className="h-3 w-3 flex-shrink-0" />
          <span className="truncate">{p.url.replace(/^https?:\/\//, "").replace(/\/$/, "")}</span>
        </div>
      </div>
    </TapCard>
  );
}

export function ProjectsSection() {
  const ref = useStaggerReveal<HTMLDivElement>(120);
  return (
    <section id="projects" className="relative py-16 sm:py-20">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 80% 50% at 50% 30%, rgba(10,132,255,0.07), transparent 70%)" }}
      />
      <div className="mx-auto max-w-6xl px-6">
        <SectionTitle
          kicker="Selected Work"
          title={<>Live <span className="text-gradient">Projects</span></>}
          subtitle="Real client websites — built, live, and converting. Click any card to visit live."
        />

        <div ref={ref} className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((p) => (
            <ProjectCard key={p.url} p={p} />
          ))}
        </div>

        <div className="mt-10 text-center">
          <p className="text-sm text-white/35">
            More projects coming soon —{" "}
            <a href={WHATSAPP} target="_blank" rel="noreferrer" className="text-electric-glow/70 hover:text-electric-glow transition-colors hover:underline underline-offset-2">
              ask me directly
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}

/* ============ Pricing ============ */
const PRICING_PLANS: {
  title: string;
  kicker: string;
  price: string;
  description: string;
  features: string[];
  featured?: boolean;
}[] = [
  {
    title: "Landing Page",
    kicker: "One-page website",
    price: "$50–$70",
    description: "A focused, polished page to introduce your business and turn visits into enquiries.",
    features: [
      "Custom design shaped around your brand",
      "Responsive layout for phones and desktops",
      "Contact or WhatsApp call-to-action",
      "Basic search and accessibility setup",
      "Launch support and one revision round",
    ],
  },
  {
    title: "Business Website",
    kicker: "Multi-page website",
    price: "$120–$180",
    description: "A complete online presence for businesses that need room to tell their story.",
    features: [
      "Up to five pages tailored to your services",
      "Consistent custom styling across the site",
      "Contact and enquiry pathways",
      "Responsive performance and basic SEO setup",
      "Launch support and two revision rounds",
    ],
  },
  {
    title: "Black Friday Website",
    kicker: "Only 9 spots",
    price: "$60",
    description: "One complete, custom website for each of the first nine clients who claim this offer.",
    features: [
      "A custom-designed, mobile-ready website",
      "Content organized around your business",
      "A clear contact or WhatsApp action",
      "Basic search-friendly page setup",
      "Help getting your site ready to launch",
      "One revision round after your review",
    ],
    featured: true,
  },
];

export function PricingSection() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section id="pricing" className="relative py-16 sm:py-20">
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{ background: "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(10,132,255,0.09), transparent 60%)" }}
      />
      <div className="mx-auto max-w-6xl px-6">
        <SectionTitle
          kicker="Pricing"
          title={<>Clear, one-time <span className="text-gradient">website pricing</span></>}
          subtitle="Straightforward project prices in USD. Choose a scope, then message me to get started."
        />

        <div
          className="black-friday-callout mt-10 mx-auto flex max-w-4xl flex-col items-center justify-between gap-4 rounded-3xl border p-5 text-center sm:flex-row sm:p-6 sm:text-left"
        >
          <div className="flex items-center gap-3">
            <div className="black-friday-flame flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl">
              <Flame className="h-5 w-5" />
            </div>
            <div>
              <div className="font-display text-base font-bold sm:text-lg">🔥 Black Friday: $60 per website</div>
              <div className="mt-0.5 text-xs">Only nine spots. No subscription or surprise fees.</div>
            </div>
          </div>
          <button
            type="button"
            onClick={() => scrollTo("black-friday")}
            data-testid="button-view-black-friday-offer"
            className="black-friday-callout-link inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold transition-transform hover:-translate-y-0.5"
          >
            Claim a spot <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        <div ref={ref} className="reveal mt-8 grid gap-6 lg:grid-cols-3 lg:items-stretch">
          {PRICING_PLANS.map((plan) => (
            <article
              key={plan.title}
              id={plan.featured ? "black-friday" : undefined}
              data-testid={`card-pricing-${plan.featured ? "black-friday" : plan.title.toLowerCase().replaceAll(" ", "-")}`}
              className={`pricing-card flex scroll-mt-32 flex-col rounded-[1.75rem] p-6 transition-all duration-300 sm:p-7 ${plan.featured ? "black-friday-card" : "glass hover:-translate-y-1 hover:border-electric/40"}`}
            >
              {plan.featured && (
                <div className="black-friday-ribbon mb-5 inline-flex w-fit items-center gap-2 rounded-full px-3.5 py-1.5 text-[10px] font-black uppercase tracking-[0.16em]">
                  <Flame className="h-3.5 w-3.5" /> Black Friday · 9 available
                </div>
              )}
              <div className={`text-xs font-bold uppercase tracking-[0.15em] ${plan.featured ? "sale-accent" : "text-electric-glow"}`}>
                {plan.kicker}
              </div>
              <h3 className="font-display mt-3 text-2xl font-bold text-white">{plan.title}</h3>
              <p className={`mt-3 min-h-12 text-sm leading-relaxed ${plan.featured ? "sale-muted" : "text-white/60"}`}>
                {plan.description}
              </p>
              <div className="mt-7 flex items-end gap-2">
                <span className={`font-display text-5xl font-extrabold tracking-tight sm:text-6xl ${plan.featured ? "sale-price" : "text-white"}`}>
                  {plan.price}
                </span>
                <span className={`pb-2 text-sm ${plan.featured ? "sale-muted" : "text-white/55"}`}>one-time</span>
              </div>
              <ul className="mt-7 flex-1 space-y-3.5">
                {plan.features.map((feature) => (
                  <li key={feature} className={`flex items-start gap-3 text-sm leading-relaxed ${plan.featured ? "sale-feature" : "text-white/75"}`}>
                    <span className={`mt-0.5 inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full ${plan.featured ? "sale-check" : "bg-electric/20 text-electric-glow"}`}>
                      <Check className="h-3 w-3" />
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <GlowButton
                  href={plan.featured ? BLACK_FRIDAY_WHATSAPP : WHATSAPP}
                  dataTestId={plan.featured ? "button-claim-black-friday" : `button-discuss-${plan.title.toLowerCase().replaceAll(" ", "-")}`}
                  variant="primary"
                  className={`w-full ${plan.featured ? "sale-cta" : ""}`}
                >
                  <MessageCircle className="h-4 w-4" />
                  {plan.featured ? "Claim one of 9 spots" : "Discuss this website"}
                </GlowButton>
              </div>
            </article>
          ))}
        </div>
        <p className="mt-6 text-center text-xs text-white/45">
          All listed prices are one-time project fees in USD. Any third-party costs are discussed before work begins.
        </p>
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
    text: "Aman delivered exactly the look I wanted — calm, premium and trustworthy. Patients now book appointments directly from the website. Worth every bit.",
    rating: 5,
  },
  {
    name: "Dr. Saloni Verma",
    role: "BDS · Cosmetic Dentistry",
    site: "Pristine Smiles Studio",
    text: "The website looks like it cost 10x what I paid. Smooth animations, beautiful layout and fast support whenever I needed a tweak. Highly recommended.",
    rating: 5,
  },
  {
    name: "Dr. Maitri Patel Kova",
    role: "BDS · Implantologist",
    site: "Gentle Smiles Dental",
    text: "Professional from day one. Aman understood my brand without endless meetings and built a site my patients genuinely compliment. 10/10 experience.",
    rating: 5,
  },
  {
    name: "Rohit Sharma",
    role: "Founder · Pixel Perfect Pages",
    site: "Agency Landing",
    text: "Crisp typography, pixel-perfect spacing and lightning fast. Aman is the rare developer who actually cares about design details.",
    rating: 5,
  },
  {
    name: "Neha Agarwal",
    role: "Boutique Owner",
    site: "E-commerce",
    text: "Got my store online in under a week. Sales doubled in the first month. Aman is reliable and his pricing is honest.",
    rating: 5,
  },
  {
    name: "Karan Mehta",
    role: "Real Estate Consultant",
    site: "Lead Gen Site",
    text: "Leads started coming in the same week we launched. Clean design, great mobile experience. Will hire again for my next project.",
    rating: 5,
  },
];

function Marquee({ items, direction }: { items: typeof REVIEWS; direction: "left" | "right" }) {
  const looped = [...items, ...items];
  return (
    <div className="relative overflow-hidden">
      <div aria-hidden className="reviews-fade-left pointer-events-none absolute inset-y-0 left-0 z-10 w-16" />
      <div aria-hidden className="reviews-fade-right pointer-events-none absolute inset-y-0 right-0 z-10 w-16" />
      <div
        className="flex gap-5 w-max"
        style={{
          animation: `marquee ${direction === "left" ? "42s" : "50s"} linear infinite`,
          animationDirection: direction === "left" ? "normal" : "reverse",
        }}
      >
        {looped.map((r, i) => (
          <article
            key={i}
            className="w-[260px] sm:w-[300px] flex-shrink-0 glass rounded-[1.5rem] border border-white/10 p-5 shadow-[0_16px_44px_-28px_rgba(10,132,255,0.5)] transition-all hover:border-electric/40 active:scale-[0.98]"
          >
            <div className="flex items-center gap-1 text-electric-glow">
              {Array.from({ length: r.rating }).map((_, k) => (
                <Star key={k} className="h-4 w-4 fill-current" />
              ))}
            </div>
            <p className="mt-3 text-sm text-white/80 leading-relaxed">"{r.text}"</p>
            <div className="mt-5 flex items-center gap-3 border-t border-white/10 pt-4">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-electric to-electric-deep text-white font-bold text-sm flex-shrink-0">
                {r.name.replace("Dr. ", "").split(" ").map((s) => s[0]).slice(0, 2).join("")}
              </div>
              <div>
                <div className="text-sm font-semibold text-white">{r.name}</div>
                <div className="text-xs text-white/50">{r.role}</div>
                <div className="text-[11px] text-electric-glow mt-0.5">{r.site}</div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export function ReviewsSection() {
  return (
    <section id="reviews" className="relative py-16 sm:py-20 overflow-hidden">
      <div className="mx-auto max-w-6xl px-6">
        <SectionTitle
          kicker="Client Love"
          title={<>What clients <span className="text-gradient">are saying</span></>}
          subtitle="Real feedback from doctors, founders and business owners I've worked with."
        />
      </div>
      <div className="mt-12 space-y-4">
        <Marquee items={REVIEWS} direction="left" />
        <Marquee items={[...REVIEWS].reverse()} direction="right" />
      </div>
    </section>
  );
}

/* ============ Process ============ */
const PROCESS_STEPS: { num: string; icon: LucideIcon; title: string; desc: string; tag: string; accent: string }[] = [
  {
    num: "01",
    icon: MessageCircle,
    title: "Share Your Business Details",
    desc: "Send a WhatsApp message with your business info — what you do, the kind of website you need, and any references you like. That's all it takes to get started.",
    tag: "Via WhatsApp",
    accent: "#0a84ff",
  },
  {
    num: "02",
    icon: Monitor,
    title: "Free Demo Website",
    desc: "I build a fully working demo site at zero cost — so you can actually see what your website will look like before making any decision or commitment.",
    tag: "Zero Cost",
    accent: "#3da9ff",
  },
  {
    num: "03",
    icon: Eye,
    title: "Review & Give Feedback",
    desc: "Browse the demo, show it to your team or family. Love it? We move forward. Want changes? No problem — no pressure, no deadline, no rush.",
    tag: "No Pressure",
    accent: "#0a84ff",
  },
  {
    num: "04",
    icon: Banknote,
    title: "Transparent Pricing Talk",
    desc: "Once you approve the demo, we discuss the budget and features openly. Every cost is clear upfront — no hidden charges or surprises.",
    tag: "No Hidden Fees",
    accent: "#3da9ff",
  },
  {
    num: "05",
    icon: Globe,
    title: "Final Edits & Domain Setup",
    desc: "Last refinements applied exactly as you want. We choose your domain name together — your business name becomes your permanent online address.",
    tag: "Your Domain",
    accent: "#0a84ff",
  },
  {
    num: "06",
    icon: Shield,
    title: "50% Advance Payment",
    desc: "Just 50% upfront to begin building the final version. The remaining 50% is paid only after you see the finished website and are fully satisfied.",
    tag: "Secure Payment",
    accent: "#3da9ff",
  },
  {
    num: "07",
    icon: Rocket,
    title: "Live Website Delivered",
    desc: "Your website goes live and is shared with you on WhatsApp — fast, mobile-ready and beautiful. Pay the balance. You are officially online.",
    tag: "Live & Ready",
    accent: "#0a84ff",
  },
];

export function ProcessSection() {
  const ref = useStaggerReveal<HTMLDivElement>(80);
  return (
    <section id="process" className="relative py-16 sm:py-20">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(10,132,255,0.07), transparent 70%)" }}
      />
      <div className="mx-auto max-w-5xl px-6">
        <SectionTitle
          kicker="How It Works"
          title={<>From idea to <span className="text-gradient">live website</span></>}
          subtitle="7 simple steps — transparent, pressure-free, done entirely on WhatsApp."
        />

        <div ref={ref} className="mt-12 relative">
          {/* Vertical timeline line */}
          <div
            aria-hidden
            className="absolute left-[22px] sm:left-[27px] top-4 bottom-4 w-px"
            style={{ background: "linear-gradient(to bottom, rgba(10,132,255,0.5) 0%, rgba(10,132,255,0.15) 85%, transparent 100%)" }}
          />

          <div className="space-y-4">
            {PROCESS_STEPS.map((step, i) => {
              const Icon = step.icon;
              const isLast = i === PROCESS_STEPS.length - 1;
              return (
                <div key={step.num} className="rc reveal-child relative flex items-start gap-5 sm:gap-6">
                  {/* Step circle on timeline */}
                  <div className="relative z-10 flex-shrink-0 mt-5">
                    <div
                      className="h-11 w-11 sm:h-[54px] sm:w-[54px] rounded-full flex items-center justify-center text-xs sm:text-sm font-bold text-white"
                      style={{
                        background: `linear-gradient(135deg, ${step.accent}, #1e3a8a)`,
                        boxShadow: `0 0 0 3px rgba(10,132,255,0.12), 0 0 18px rgba(10,132,255,0.25)`,
                      }}
                    >
                      {step.num}
                    </div>
                    {!isLast && (
                      <div
                        aria-hidden
                        className="absolute left-1/2 top-full -translate-x-1/2 w-px h-4"
                        style={{ background: `${step.accent}30` }}
                      />
                    )}
                  </div>

                  {/* Card */}
                  <div
                    className="group flex-1 glass rounded-2xl p-5 sm:p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-electric/40 hover:shadow-[0_16px_48px_-16px_rgba(10,132,255,0.35)] cursor-default mb-1"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        {/* Icon box */}
                        <div
                          className="flex-shrink-0 h-9 w-9 sm:h-10 sm:w-10 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
                          style={{ background: `${step.accent}18`, border: `1px solid ${step.accent}35` }}
                        >
                          <Icon className="h-4 w-4 sm:h-5 sm:w-5" style={{ color: step.accent }} />
                        </div>
                        <h3 className="font-display text-base sm:text-lg font-bold text-white leading-snug">{step.title}</h3>
                      </div>
                      {/* Tag */}
                      <span
                        className="hidden sm:inline-flex flex-shrink-0 items-center rounded-full px-3 py-1 text-[10px] font-semibold tracking-wider whitespace-nowrap"
                        style={{ background: `${step.accent}15`, color: step.accent, border: `1px solid ${step.accent}30` }}
                      >
                        {step.tag}
                      </span>
                    </div>
                    <p className="mt-3 text-sm text-white/60 leading-relaxed pl-[52px] sm:pl-[52px]">{step.desc}</p>
                    {/* Mobile tag */}
                    <div className="mt-3 pl-[52px] sm:hidden">
                      <span
                        className="inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-semibold tracking-wider"
                        style={{ background: `${step.accent}15`, color: step.accent, border: `1px solid ${step.accent}30` }}
                      >
                        {step.tag}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <p className="text-sm text-white/45 mb-5">Ready to get started? Drop a message — I handle everything from here.</p>
          <GlowButton href={WHATSAPP} className="!px-10 !py-4 !text-base">
            <MessageCircle className="h-5 w-5" /> Start with a Free Demo
          </GlowButton>
        </div>
      </div>
    </section>
  );
}

/* ============ FAQ ============ */
const FAQ_ITEMS = [
  {
    q: "How long does a website take to build?",
    a: "Most projects are ready in 5–10 business days. A simple landing page can be done in 3 days; complex multi-page sites may take up to 3 weeks. I'll give you a clear timeline upfront.",
  },
  {
    q: "What do I need to get started?",
    a: "Just a WhatsApp message. I'll guide you through everything — content, logo, color palette, hosting and launch. You don't need any technical knowledge.",
  },
  {
    q: "Is the website mobile-friendly?",
    a: "100%. Every site I build is fully responsive and looks pixel-perfect on phones, tablets and desktops. Mobile-first is my default approach.",
  },
  {
    q: "How many revisions do I get?",
    a: "Each website package includes its stated revision rounds. We'll agree on the scope and revision details before work begins.",
  },
  {
    q: "What is included in the website price?",
    a: "Each package lists its pages, design, launch support and revision rounds. Any third-party costs are discussed and agreed before work begins.",
  },
  {
    q: "Can you redesign my existing website?",
    a: "Absolutely. I can redesign any existing website and make it modern, fast and conversion-focused. Just share the current URL and I'll suggest improvements.",
  },
  {
    q: "Do you provide hosting?",
    a: "I'll help you publish your site on suitable hosting. Domain and other third-party costs are discussed separately before work begins.",
  },
  {
    q: "What if I'm not happy with the result?",
    a: "That hasn't happened yet! But if it does, I'll keep revising until you're satisfied. Your happiness is the only metric I care about.",
  },
];

function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);
  const ref = useReveal<HTMLDivElement>(index * 60);
  return (
    <div ref={ref} className="reveal">
      <button
        onClick={() => setOpen((o) => !o)}
        className={`w-full flex items-center justify-between gap-4 rounded-2xl px-6 py-5 text-left transition-all duration-300 glass border hover:border-electric/40 active:scale-[0.99] touch-manipulation ${open ? "border-electric/40 bg-electric/5" : "border-white/8"}`}
      >
        <span className="text-sm sm:text-base font-medium text-white">{q}</span>
        <ChevronDown
          className={`h-5 w-5 flex-shrink-0 text-electric-glow transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${open ? "max-h-60 opacity-100" : "max-h-0 opacity-0"}`}
      >
        <div className="px-6 pt-3 pb-5 text-sm text-white/65 leading-relaxed">
          {a}
        </div>
      </div>
    </div>
  );
}

export function FAQSection() {
  return (
    <section id="faq" className="relative py-16 sm:py-20">
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{ background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(10,132,255,0.08), transparent 70%)" }}
      />
      <div className="mx-auto max-w-3xl px-6">
        <SectionTitle
          kicker="FAQ"
          title={<>Common <span className="text-gradient">Questions</span></>}
          subtitle="Everything you need to know before we start working together."
        />
        <div className="mt-12 space-y-3">
          {FAQ_ITEMS.map((item, i) => (
            <FAQItem key={i} q={item.q} a={item.a} index={i} />
          ))}
        </div>
        <div className="mt-10 text-center">
          <p className="text-sm text-white/50 mb-4">Still have questions?</p>
          <GlowButton href={WHATSAPP}>
            <MessageCircle className="h-4 w-4" /> Ask me on WhatsApp
          </GlowButton>
        </div>
      </div>
    </section>
  );
}

/* ============ Contact ============ */
export function ContactSection() {
  return (
    <section id="contact" className="relative py-16 sm:py-20">
      {/* Background glow */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 70% 60% at 50% 60%, rgba(10,132,255,0.13), transparent 70%)" }}
      />
      <div className="mx-auto max-w-4xl px-6">
        {/* Hero CTA card */}
        <div className="relative rounded-3xl overflow-hidden">
          {/* Spinning border */}
          <div className="absolute inset-0 rounded-3xl overflow-hidden">
            <span
              aria-hidden
              className="pointer-events-none absolute inset-[-100%] block"
              style={{
                background: "conic-gradient(from 0deg, #0a84ff 0%, #3da9ff 25%, #1e40af 50%, #3da9ff 75%, #0a84ff 100%)",
                animation: "border-spin 8s linear infinite",
              }}
            />
          </div>
          <div className="relative m-[1.5px] rounded-[calc(1.5rem-1.5px)] bg-[#04060d] px-8 py-12 text-center overflow-hidden">
            {/* Inner glow */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{ background: "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(10,132,255,0.18), transparent 70%)" }}
            />
            <div className="relative">
              <div className="inline-flex items-center gap-2 rounded-full border border-electric/30 bg-electric/10 px-4 py-1.5 text-xs font-medium text-electric-glow mb-6">
                <Sparkles className="h-3 w-3" /> Let's Work Together
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
                Ready to build <span className="text-gradient">something premium?</span>
              </h2>
              <p className="mt-4 text-base text-white/60 max-w-xl mx-auto">
                Tell me about your business — I usually reply within an hour on WhatsApp.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <GlowButton href={WHATSAPP} className="!px-8 !py-4 !text-base">
                  <MessageCircle className="h-5 w-5" /> Message on WhatsApp
                </GlowButton>
                <GlowButton href="mailto:dantaniaman506@gmail.com" variant="ghost" className="!px-8 !py-4 !text-base">
                  <Mail className="h-5 w-5" /> Send an Email
                </GlowButton>
              </div>
            </div>
          </div>
        </div>

        {/* Contact info cards */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <TapCard
            href={WHATSAPP}
            className="block rounded-2xl glass p-5 text-left hover:-translate-y-1 hover:border-electric/50 hover:shadow-[0_20px_50px_-20px_rgba(10,132,255,0.35)]"
          >
            <div className="flex items-center gap-4">
              <div className="inline-flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-electric to-electric-deep text-white group-hover:rotate-6 transition-transform duration-300 shadow-[0_8px_20px_-6px_rgba(10,132,255,0.5)]">
                <MessageCircle className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <div className="text-[10px] uppercase tracking-widest text-white/40">WhatsApp</div>
                <div className="text-base font-semibold text-white">+91 6398505806</div>
              </div>
              <ArrowRight className="h-4 w-4 text-white/20 ml-auto flex-shrink-0 transition-all group-hover:text-electric-glow group-hover:translate-x-1" />
            </div>
          </TapCard>
          <TapCard
            href="mailto:dantaniaman506@gmail.com"
            className="block rounded-2xl glass p-5 text-left hover:-translate-y-1 hover:border-electric/50 hover:shadow-[0_20px_50px_-20px_rgba(10,132,255,0.35)]"
          >
            <div className="flex items-center gap-4">
              <div className="inline-flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-electric to-electric-deep text-white group-hover:rotate-6 transition-transform duration-300 shadow-[0_8px_20px_-6px_rgba(10,132,255,0.5)]">
                <Mail className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <div className="text-[10px] uppercase tracking-widest text-white/40">Email</div>
                <div className="text-sm font-semibold text-white truncate">dantaniaman506@gmail.com</div>
              </div>
              <ArrowRight className="h-4 w-4 text-white/20 ml-auto flex-shrink-0 transition-all group-hover:text-electric-glow group-hover:translate-x-1" />
            </div>
          </TapCard>
        </div>
      </div>
    </section>
  );
}
