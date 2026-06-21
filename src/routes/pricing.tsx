import { createFileRoute } from "@tanstack/react-router";
import { PricingSection, PageHeader } from "@/components/site/shared";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — Website Development from ₹4,000 | Aman Dantani" },
      {
        name: "description",
        content:
          "Transparent pricing. Website development from ₹4,000–₹6,000. Maintenance at ₹300/month or ₹3,000/year — save ₹600 with the annual plan.",
      },
      { property: "og:title", content: "Pricing — Aman Dantani" },
      {
        property: "og:description",
        content:
          "Honest pricing for business websites. From ₹4,000 one-time + ₹250/mo equivalent.",
      },
    ],
  }),
  component: PricingPage,
});

function PricingPage() {
  return (
    <>
      <PageHeader
        kicker="Pricing"
        title={
          <>
            Transparent <span className="text-gradient">Pricing Plans</span>
          </>
        }
        subtitle="No hidden fees. Pay once for development, then pick monthly or annual maintenance."
      />
      <PricingSection />
    </>
  );
}
