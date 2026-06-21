import { createFileRoute } from "@tanstack/react-router";
import { AboutSection, PageHeader } from "@/components/site/shared";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Aman Dantani | Website Developer" },
      {
        name: "description",
        content:
          "Meet Aman Dantani — 3+ years of crafting aesthetic, fast, conversion-focused websites for doctors, founders and small businesses.",
      },
      { property: "og:title", content: "About Aman Dantani" },
      {
        property: "og:description",
        content: "3+ years building premium websites for 50+ clients.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <PageHeader
        kicker="About"
        title={
          <>
            The developer behind <span className="text-gradient">50+ websites</span>
          </>
        }
        subtitle="A bit about who I am, how I work, and why clients keep coming back."
      />
      <AboutSection />
    </>
  );
}
