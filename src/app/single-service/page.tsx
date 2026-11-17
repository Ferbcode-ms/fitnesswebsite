import type { Metadata } from "next";
import { SingleServiceHeroSection } from "@/components/sections/single-service/SingleServiceHeroSection";
import { SingleServiceWhoIsThisForSection } from "@/components/sections/single-service/SingleServiceWhoIsThisForSection";
import { SingleServiceTimelineSection } from "@/components/sections/single-service/SingleServiceTimelineSection";
import { SingleServiceIncludedSection } from "@/components/sections/single-service/SingleServiceIncludedSection";
import { SingleServicePricingSection } from "@/components/sections/single-service/SingleServicePricingSection";
import { BottomSplitCtaSection } from "@/components/sections/home/BottomSplitCtaSection";
import { JsonLd } from "@/components/seo/JsonLd";

import { getPageSections } from "@/lib/cms/queries";
import type { PhaseItem } from "@/components/sections/single-service/SingleServiceTimelineSection";
import type { InclusionItem } from "@/components/sections/single-service/SingleServiceIncludedSection";
import type { CoachingContainer } from "@/components/sections/single-service/SingleServicePricingSection";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "1:1 Private Coaching Experience",
  description:
    "Apply for the comprehensive 1:1 private coaching experience. Customized training split, weekly video form audits, nutritional architecture, and direct messaging.",
  alternates: {
    canonical: "/single-service",
  },
  openGraph: {
    title: "1:1 Private Coaching Mentorship | Women's Fitness",
    description:
      "Customized training split, weekly video form audits, nutritional architecture, and direct coach messaging.",
    url: "/single-service",
    images: [{ url: "/images/card-strength.jpg", width: 800, height: 800, alt: "1:1 private coaching" }],
  },
};

export default async function SingleServicePage() {
  const sections = await getPageSections("single-service");
  const mainSection = sections.find((s) => s.section_key === "main" || s.section_key === "hero");
  const content = mainSection?.content as Record<string, unknown> | undefined;

  return (
    <>
      <JsonLd
        type="breadcrumbs"
        breadcrumbs={[
          { name: "Home", item: "/" },
          { name: "Services", item: "/services" },
          { name: "1:1 Private Coaching", item: "/single-service" },
        ]}
      />
      <JsonLd
        type="service"
        serviceName="1:1 Private Fitness Coaching Experience"
        serviceDescription="Comprehensive 1-on-1 private coaching mentorship with custom workout programming, video form feedback, and nutrition design."
      />
      <SingleServiceHeroSection
        badge={content?.heroBadge as string | undefined}
        headline={mainSection?.title}
        subtitle={mainSection?.subtitle}
        cta1Text={content?.heroCta1Text as string | undefined}
        cta1Link={content?.heroCta1Link as string | undefined}
        cta2Text={content?.heroCta2Text as string | undefined}
        cta2Link={content?.heroCta2Link as string | undefined}
        image1Src={content?.image1Src as string | undefined}
        image2Src={content?.image2Src as string | undefined}
        image3Src={content?.image3Src as string | undefined}
      />
      <SingleServiceWhoIsThisForSection
        badge={content?.whoBadge as string | undefined}
        heading={content?.whoHeading as string | undefined}
        subtext={content?.whoSubtitle as string | undefined}
        marqueeText={content?.whoMarqueeText as string | undefined}
        whoItsFor={content?.whoItsFor as string[] | undefined}
        whoItsNotFor={content?.whoItsNotFor as string[] | undefined}
      />
      <SingleServiceTimelineSection
        badge={content?.timelineBadge as string | undefined}
        heading={content?.timelineHeading as string | undefined}
        subtext={content?.timelineSubtitle as string | undefined}
        phases={content?.timelinePhases as PhaseItem[] | undefined}
      />
      <SingleServiceIncludedSection
        badge={content?.includedBadge as string | undefined}
        heading={content?.includedHeading as string | undefined}
        subtext={content?.includedSubtitle as string | undefined}
        inclusions={content?.inclusions as InclusionItem[] | undefined}
      />
      <SingleServicePricingSection
        badge={content?.pricingBadge as string | undefined}
        heading={content?.pricingHeading as string | undefined}
        subtext={content?.pricingSubtitle as string | undefined}
        marqueeText={content?.pricingMarqueeText as string | undefined}
        containers={content?.containers as CoachingContainer[] | undefined}
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
