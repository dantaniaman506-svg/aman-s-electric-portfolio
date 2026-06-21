import { createFileRoute } from "@tanstack/react-router";
import { ServicesSection, PageHeader } from "@/components/site/shared";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Website Development | Aman Dantani" },
      {
        name: "description",
        content:
          "Business websites, landing pages, portfolios, and maintenance — built fast, designed beautifully, optimized for conversions.",
      },
      { property: "og:title", content: "Services — Aman Dantani" },
      {
        property: "og:description",
        content:
          "Business websites, landing pages, portfolios and ongoing maintenance.",
      },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <>
      <PageHeader
        kicker="Services"
        title={
          <>
            Everything you need to <span className="text-gradient">go online</span>
          </>
        }
        subtitle="From a single landing page to a full business website with SEO and maintenance — handled end-to-end."
      />
      <ServicesSection />
    </>
  );
}
