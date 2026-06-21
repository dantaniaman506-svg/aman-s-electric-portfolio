import { createFileRoute } from "@tanstack/react-router";
import { ReviewsSection, PageHeader } from "@/components/site/shared";

export const Route = createFileRoute("/reviews")({
  head: () => ({
    meta: [
      { title: "Reviews — What Clients Say | Aman Dantani" },
      {
        name: "description",
        content:
          "Real feedback from doctors, founders and business owners I've worked with — five-star reviews from 50+ delivered websites.",
      },
      { property: "og:title", content: "Client Reviews — Aman Dantani" },
      {
        property: "og:description",
        content: "Five-star reviews from doctors, founders and business owners.",
      },
    ],
  }),
  component: ReviewsPage,
});

function ReviewsPage() {
  return (
    <>
      <PageHeader
        kicker="Client Love"
        title={
          <>
            Reviews from <span className="text-gradient">real clients</span>
          </>
        }
        subtitle="Honest feedback from the doctors, founders and businesses I've helped."
      />
      <ReviewsSection />
    </>
  );
}
