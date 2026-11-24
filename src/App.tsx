import { useEffect, useState } from "react";
import {
  PageBackground,
  GlobalTouchEffect,
  CursorGlow,
  Navbar,
  Footer,
  Hero,
  AboutSection,
  ReviewsSection,
  ServicesSection,
  ProcessSection,
  ProjectsSection,
  PricingSection,
  FAQSection,
  ContactSection,
} from "./components/site/shared";

export default function App() {
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    const savedTheme = localStorage.getItem("portfolio-theme");
    return savedTheme === "dark" ? "dark" : "light";
  });

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.theme = theme;
    root.classList.toggle("dark", theme === "dark");
    root.style.colorScheme = theme;
    localStorage.setItem("portfolio-theme", theme);
  }, [theme]);

  return (
    <div className="site-shell">
      <CursorGlow />
      <PageBackground />
      <GlobalTouchEffect />
      <Navbar theme={theme} onThemeChange={() => setTheme(theme === "light" ? "dark" : "light")} />
      <main className="relative min-h-screen text-white overflow-x-hidden">
        <Hero />
        <AboutSection />
        <ReviewsSection />
        <ServicesSection />
        <ProcessSection />
        <ProjectsSection />
        <PricingSection />
        <FAQSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
