import { HeroSection } from "@/components/sections/home/HeroSection";
import { ComparisonSection } from "@/components/sections/home/ComparisonSection";
import { TestimonialsBentoSection } from "@/components/sections/home/TestimonialsBentoSection";
import { MarqueeSection } from "@/components/sections/home/MarqueeSection";
import { ProgrammeFolderCardsSection } from "@/components/sections/home/ProgrammeFolderCardsSection";
import { CoachBioSection } from "@/components/sections/home/CoachBioSection";
import { PressStripSection } from "@/components/sections/home/PressStripSection";
import { BottomSplitCtaSection } from "@/components/sections/home/BottomSplitCtaSection";
import { getPageSections, getClasses, getTestimonials, getSiteSettings } from "@/lib/cms/queries";

export const revalidate = 3600; // ISR: 1 hour cache with on-demand revalidation on CMS publish

/**
 * Complete Homepage Composition
 * Pixel-accurate recreation of the Hot Core Pilates reference architecture
 * adapted for Women's Fitness Coaching (Online Coaching & In-Person Personal Training).
 * Dynamically wired to Supabase CMS with graceful fallbacks.
 */
export default async function HomePage() {
  const [sections, classes, testimonials, settings] = await Promise.all([
    getPageSections("home"),
    getClasses(true),
    getTestimonials("home", true),
    getSiteSettings(),
  ]);

  const heroSection = sections.find((s) => s.section_key === "hero");
  const heroContent = heroSection?.content as Record<string, unknown> | undefined;

  return (
    <>
      <HeroSection
        headline={heroSection?.title || undefined}
        subcaption={heroSection?.subtitle || undefined}
        imageSrc={heroSection?.image_url || undefined}
        ctaText={(heroContent?.ctaText as string) || undefined}
        ctaHref={(heroContent?.ctaLink as string) || undefined}
      />
      <ComparisonSection
        title={heroContent?.comparisonTitle as string | undefined}
        enabled={heroContent?.comparisonEnabled !== false}
      />
      <TestimonialsBentoSection testimonials={testimonials} />
      <MarqueeSection
        text={heroContent?.marqueeText as string | undefined}
        enabled={heroContent?.marqueeEnabled !== false}
      />
      <ProgrammeFolderCardsSection classes={classes} />
      <CoachBioSection
        coachName={settings.coach_name}
        bioTitle={heroContent?.coachBioTitle as string | undefined}
        bioImage={heroContent?.coachBioImage as string | undefined}
      />
      <PressStripSection />
      <BottomSplitCtaSection
        headline={heroContent?.bottomCtaTitle as string | undefined}
        ctaText={heroContent?.bottomCtaText as string | undefined}
      />
    </>
  );
}
