import { createFileRoute } from "@tanstack/react-router";
import {
  Hero,
  AboutSection,
  ProjectsSection,
  ContactSection,
} from "@/components/site/shared";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Aman Dantani — Website Development | 50+ Business Websites" },
      {
        name: "description",
        content:
          "Aman Dantani builds aesthetic, conversion-focused business websites, landing pages and portfolios. 50+ projects delivered. Transparent pricing starting ₹4,000.",
      },
      { property: "og:title", content: "Aman Dantani — Website Development" },
      {
        property: "og:description",
        content:
          "50+ business websites delivered. Aesthetic, fast, conversion-focused.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <Hero />
      <AboutSection compact />
      <ProjectsSection limit={2} />
      <ContactSection />
    </>
  );
}
