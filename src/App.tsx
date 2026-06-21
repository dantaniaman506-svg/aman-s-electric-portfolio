import {
  PageBackground,
  GlobalTouchEffect,
  Navbar,
  Footer,
  Hero,
  AboutSection,
  ServicesSection,
  ProcessSection,
  ProjectsSection,
  PricingSection,
  ReviewsSection,
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
        <ServicesSection />
        <ProcessSection />
        <ProjectsSection />
        <PricingSection />
        <ReviewsSection />
        <FAQSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
