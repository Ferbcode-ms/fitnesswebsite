import type { Metadata } from "next";
import { ContactSection } from "@/components/sections/contact/ContactSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { getSiteSettings } from "@/lib/cms/queries";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Contact & Studio Inquiries",
  description:
    "Get in touch with our coaching team. Inquire about 1-on-1 personal training, online coaching, or studio availability.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact & Studio Inquiries | Women's Fitness Coaching",
    description:
      "Get in touch with our coaching team. Inquire about 1-on-1 personal training, online coaching, or studio availability.",
    url: "/contact",
  },
};

export default async function ContactPage() {
  const settings = await getSiteSettings();

  return (
    <>
      <JsonLd
        type="breadcrumbs"
        breadcrumbs={[
          { name: "Home", item: "/" },
          { name: "Contact", item: "/contact" },
        ]}
      />
      <ContactSection settings={settings} />
    </>
  );
}
