import { createFileRoute } from "@tanstack/react-router";
import { ProjectsSection, PageHeader } from "@/components/site/shared";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects — Live Client Websites | Aman Dantani" },
      {
        name: "description",
        content:
          "Live websites I've built for dentists, agencies and businesses. Real URLs, real screenshots, real results.",
      },
      { property: "og:title", content: "Live Projects — Aman Dantani" },
      {
        property: "og:description",
        content: "Real client websites — shipped, live and converting.",
      },
    ],
  }),
  component: ProjectsPage,
});

function ProjectsPage() {
  return (
    <>
      <PageHeader
        kicker="Selected Work"
        title={
          <>
            Real client <span className="text-gradient">websites</span>
          </>
        }
        subtitle="Tap any card to open the live site in a new tab."
      />
      <ProjectsSection />
    </>
  );
}
