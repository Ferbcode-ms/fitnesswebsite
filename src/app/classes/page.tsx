import type { Metadata } from "next";
import { ClassesHeroSection } from "@/components/sections/classes/ClassesHeroSection";
import { MarqueeBanner } from "@/components/ui/MarqueeBanner";
import { ProgrammeFolderCardsSection } from "@/components/sections/home/ProgrammeFolderCardsSection";
import { TestimonialsBentoSection } from "@/components/sections/home/TestimonialsBentoSection";
import { ClassesMembershipTiersSection, type MembershipTier } from "@/components/sections/classes/ClassesMembershipTiersSection";
import { ClassesFaqSection } from "@/components/sections/classes/ClassesFaqSection";
import { BottomSplitCtaSection } from "@/components/sections/home/BottomSplitCtaSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { getClasses, getTestimonials, getPageSections } from "@/lib/cms/queries";
import type { FaqItem } from "@/components/ui/FaqAccordion";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Fitness Programmes & Memberships",
  description:
    "Explore our women's strength coaching programmes: Foundations, Strength & Sculpt, and Hybrid Athlete. View membership pricing tiers and FAQs.",
  alternates: {
    canonical: "/classes",
  },
  openGraph: {
    title: "Fitness Programmes & Memberships | Women's Coaching",
    description:
      "Explore our women's strength coaching programmes: Foundations, Strength & Sculpt, and Hybrid Athlete. View membership tiers.",
    url: "/classes",
  },
};

export default async function ClassesPage() {
  const [classes, testimonials, sections] = await Promise.all([
    getClasses(true),
    getTestimonials("classes", true),
    getPageSections("classes"),
  ]);

  const classesSection = sections.find((s) => s.section_key === "main" || s.section_key === "hero");
  const content = classesSection?.content as Record<string, unknown> | undefined;

  return (
    <>
      <JsonLd
        type="breadcrumbs"
        breadcrumbs={[
          { name: "Home", item: "/" },
          { name: "Programmes", item: "/classes" },
        ]}
      />
      <ClassesHeroSection
        badge={content?.heroBadge as string | undefined}
        headline={classesSection?.title}
        subtitle={classesSection?.subtitle}
        imageSrc={classesSection?.image_url}
        ctaText={content?.heroCtaText as string | undefined}
        ctaHref={content?.heroCtaLink as string | undefined}
      />

      {/* Intro Marquee Banner */}
      <div className="w-full bg-[var(--color-cream)] border-y border-[var(--color-burgundy)]/15">
        <MarqueeBanner
          text={(content?.marqueeText as string) || "FIND YOUR FIRE / CHOOSE YOUR PROGRAMME"}
          separator="/"
          theme="cream"
          repeat={4}
          ariaLabel="Find your fire and choose your programme"
        />
      </div>

      {/* 3 Manila Folder Cards Section */}
      <ProgrammeFolderCardsSection classes={classes} />

      {/* Bento Testimonials Grid */}
      <TestimonialsBentoSection testimonials={testimonials} />

      {/* 3-Tier Membership Section */}
      <ClassesMembershipTiersSection
        badge={content?.membershipBadge as string | undefined}
        heading={content?.membershipHeading as string | undefined}
        subtext={content?.membershipSubtext as string | undefined}
        tiers={content?.membershipTiers as MembershipTier[] | undefined}
      />

      {/* FAQ Accordion Section */}
      <ClassesFaqSection
        badge={content?.faqBadge as string | undefined}
        heading={content?.faqHeading as string | undefined}
        subtext={content?.faqSubtext as string | undefined}
        imageSrc={content?.faqImage as string | undefined}
        faqs={content?.faqs as FaqItem[] | undefined}
      />

      {/* Final Split CTA */}
      <BottomSplitCtaSection
        headline={content?.bottomCtaTitle as string | undefined}
        ctaText={content?.bottomCtaText as string | undefined}
        ctaHref={content?.bottomCtaLink as string | undefined}
        imageSrc={content?.bottomCtaImage as string | undefined}
      />
    </>
  );
}
