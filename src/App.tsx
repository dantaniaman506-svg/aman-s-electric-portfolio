import {
  PageBackground,
  GlobalTouchEffect,
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
  return (
    <div className="dark">
      <PageBackground />
      <GlobalTouchEffect />
      <Navbar />
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
