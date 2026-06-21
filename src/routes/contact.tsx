import { createFileRoute } from "@tanstack/react-router";
import { ContactSection, PageHeader } from "@/components/site/shared";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Aman Dantani | WhatsApp +91 6398505806" },
      {
        name: "description",
        content:
          "Get in touch with Aman Dantani for your website project. WhatsApp +91 6398505806 or email dantaniaman506@gmail.com — usually replies within an hour.",
      },
      { property: "og:title", content: "Contact Aman Dantani" },
      {
        property: "og:description",
        content: "Reach out on WhatsApp +91 6398505806 — replies within the hour.",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <>
      <PageHeader
        kicker="Contact"
        title={
          <>
            Let's build <span className="text-gradient">something premium</span>
          </>
        }
        subtitle="WhatsApp is the fastest way to reach me. I usually reply within an hour."
      />
      <ContactSection />
    </>
  );
}
