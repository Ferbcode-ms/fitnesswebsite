import type { Metadata } from "next";
import { ServicesHeroSection } from "@/components/sections/services/ServicesHeroSection";
import { ServicesGridSection } from "@/components/sections/services/ServicesGridSection";
import {
  ServicesComparisonTableSection,
  type ComparisonRowItem,
  type ServicesComparisonTableSectionProps,
} from "@/components/sections/services/ServicesComparisonTableSection";
import { BottomSplitCtaSection } from "@/components/sections/home/BottomSplitCtaSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { getServices, getPageSections } from "@/lib/cms/queries";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Coaching Services & Comparison",
  description:
    "Comprehensive female fitness services: 1-on-1 in-person personal training, online coaching, custom workout programming, and nutrition design.",
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: "Coaching Services & Formats | Women's Fitness",
    description:
      "Explore 1-on-1 in-person training, online coaching, custom programming, and nutrition design.",
    url: "/services",
  },
};

export default async function ServicesPage() {
  const [services, sections] = await Promise.all([
    getServices(true),
    getPageSections("services"),
  ]);

  const mainSection = sections.find((s) => s.section_key === "main" || s.section_key === "hero");
  const content = mainSection?.content as Record<string, unknown> | undefined;

  return (
    <>
      <JsonLd
        type="breadcrumbs"
        breadcrumbs={[
          { name: "Home", item: "/" },
          { name: "Services", item: "/services" },
        ]}
      />
      <JsonLd
        type="service"
        serviceName="Women's Fitness & Strength Coaching"
        serviceDescription="1-on-1 in-person personal training and remote online coaching designed for female biomechanics."
      />
      <ServicesHeroSection
        badge={content?.heroBadge as string | undefined}
        headline={mainSection?.title}
        subtitle={mainSection?.subtitle}
        cta1Text={content?.heroCta1Text as string | undefined}
        cta1Link={content?.heroCta1Link as string | undefined}
        cta2Text={content?.heroCta2Text as string | undefined}
        cta2Link={content?.heroCta2Link as string | undefined}
      />
      <ServicesGridSection
        services={services}
        badge={content?.servicesBadge as string | undefined}
        heading={content?.servicesHeading as string | undefined}
        subtext={content?.servicesSubtext as string | undefined}
      />
      <ServicesComparisonTableSection
        badge={content?.compBadge as string | undefined}
        heading={content?.compHeading as string | undefined}
        subtext={(content?.compSubtitle as string) || (content?.compSubtext as string) || undefined}
        columns={content?.compColumns as ServicesComparisonTableSectionProps["columns"]}
        rows={content?.compRows as ComparisonRowItem[] | undefined}
      />
      <BottomSplitCtaSection
        headline={content?.bottomCtaTitle as string | undefined}
        ctaText={content?.bottomCtaText as string | undefined}
        ctaHref={content?.bottomCtaLink as string | undefined}
        imageSrc={content?.bottomCtaImage as string | undefined}
      />
    </>
  );
}
