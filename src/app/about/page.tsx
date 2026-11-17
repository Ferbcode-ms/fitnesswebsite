import type { Metadata } from "next";
import { AboutHeroSection } from "@/components/sections/about/AboutHeroSection";
import { AboutProblemSection } from "@/components/sections/about/AboutProblemSection";
import { AboutStatsMissionSection, type StatItem } from "@/components/sections/about/AboutStatsMissionSection";
import { AboutPhilosophySection } from "@/components/sections/about/AboutPhilosophySection";
import { TestimonialCarousel } from "@/components/ui/TestimonialCarousel";
import { BottomSplitCtaSection } from "@/components/sections/home/BottomSplitCtaSection";
import { Container } from "@/components/ui/Container";
import { JsonLd } from "@/components/seo/JsonLd";
import { siteConfig } from "@/config/site";
import { getTestimonials, getPageSections, getSiteSettings } from "@/lib/cms/queries";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "About Our Coach & Philosophy",
  description:
    `Meet ${siteConfig.coachName}, head coach and founder. Learn our evidence-based female strength philosophy, qualifications, and empowering training methodology.`,
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: `About ${siteConfig.coachName} | Women's Fitness Coaching`,
    description:
      "Learn our evidence-based female strength philosophy, qualifications, and empowering training methodology.",
    url: "/about",
  },
};

export default async function AboutPage() {
  const [cmsTestimonials, sections, settings] = await Promise.all([
    getTestimonials("about", true),
    getPageSections("about"),
    getSiteSettings(),
  ]);

  const storySection = sections.find((s) => s.section_key === "story");
  const storyContent = storySection?.content as Record<string, unknown> | undefined;

  const displayTestimonials =
    cmsTestimonials && cmsTestimonials.length > 0
      ? cmsTestimonials.map((t) => ({
          id: t.id,
          quote: t.quote,
          author: t.client_name,
          role: t.client_role,
          avatarUrl: t.avatar_url || undefined,
        }))
      : [];

  return (
    <>
      <JsonLd
        type="breadcrumbs"
        breadcrumbs={[
          { name: "Home", item: "/" },
          { name: "About", item: "/about" },
        ]}
      />
      <AboutHeroSection
        headline={storySection?.title}
        subheadline={storySection?.subtitle}
        imageSrc={storySection?.image_url}
        coachName={settings.coach_name}
      />
      <AboutProblemSection
        heading={storyContent?.problemHeading as string | undefined}
        text={storyContent?.problemText as string | undefined}
        image1Src={storyContent?.problemImage1 as string | undefined}
        image2Src={storyContent?.problemImage2 as string | undefined}
      />
      <AboutStatsMissionSection
        badge={storyContent?.missionBadge as string | undefined}
        heading={storyContent?.missionHeading as string | undefined}
        subtext={storyContent?.missionText as string | undefined}
        stats={storyContent?.stats as StatItem[] | undefined}
      />
      <AboutPhilosophySection
        coreBeliefBadge={storyContent?.coreBeliefBadge as string | undefined}
        coreBeliefQuote={storyContent?.coreBeliefQuote as string | undefined}
        differentHeading={storyContent?.differentHeading as string | undefined}
        differentText={storyContent?.differentText as string | undefined}
        differentList={storyContent?.differentList as string[] | undefined}
        forHeading={storyContent?.forHeading as string | undefined}
        forText={storyContent?.forText as string | undefined}
        forList={storyContent?.forList as string[] | undefined}
      />

      {/* Testimonials Carousel Section */}
      {displayTestimonials.length > 0 && (
        <section className="w-full bg-[var(--color-cream)] py-16 md:py-24 border-t border-[var(--color-burgundy)]/15">
          <Container>
            <div className="text-center mb-4">
              <span className="font-[family-name:var(--font-mono)] text-[12px] uppercase tracking-wider text-[var(--color-burgundy)]/75">
                Client Transformations
              </span>
            </div>
            <TestimonialCarousel slides={displayTestimonials} />
          </Container>
        </section>
      )}

      <BottomSplitCtaSection />
    </>
  );
}
