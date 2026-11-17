import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { EditorialHeading } from "@/components/ui/EditorialHeading";
import { cn, optimizeCloudinaryUrl } from "@/lib/utils";

interface HeroSectionProps {
  headline?: string;
  subcaption?: string;
  ctaText?: string;
  ctaHref?: string;
  imageSrc?: string;
}

/**
 * Section 0: Hero Section (Desktop full-bleed editorial hero)
 * Recreates the Hot Core Pilates editorial reference layout:
 * - Unobstructed centered subject background photo
 * - Top transparent navigation integration
 * - Mid-lower row: Bottom-left subcaption & bottom-right pill CTA
 * - Bottom-anchored single-line display headline that never covers the background
 * - Smooth transition into Section 1
 */
function formatHeadline(text: string) {
  if (/turn\s+up\s+(the\s+)?heat\.?/i.test(text)) {
    return (
      <>
        TURN UP <em>the</em> HEAT.
      </>
    );
  }
  if (/\bstrength\b/i.test(text)) {
    const parts = text.split(/\bstrength\b/i);
    return (
      <>
        {parts[0]}<em>strength</em>{parts.slice(1).join("strength")}
      </>
    );
  }
  return text;
}

export function HeroSection({
  headline = "TURN UP the HEAT.",
  subcaption = "Sculpt Your Core. Own Your Confidence.",
  ctaText = "Start Today",
  ctaHref = "/appointments",
  imageSrc = "/images/hero-bg.jpg",
}: HeroSectionProps = {}) {
  const isLongHeadline = headline.length > 22;

  return (
    <section className="relative w-full h-screen min-h-[100dvh] overflow-hidden bg-[var(--color-burgundy)] text-[var(--color-blush)] flex flex-col justify-between">
      {/* Background Media with Soft Tonal Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src={optimizeCloudinaryUrl(imageSrc, { width: 1600 }) || "/images/hero-bg.jpg"}
          alt="Women's fitness coach training in private studio"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center contrast-[1.02]"
        />
        {/* Soft atmospheric gradient preserving natural photo clarity without muddying */}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-burgundy)]/45 via-transparent to-black/15 pointer-events-none" />
      </div>

      {/* Top spacer to ensure subject breathing room below header */}
      <div className="relative z-10 flex-1 pt-[var(--header-height-desktop)] pointer-events-none" />

      {/* Lower Hero Content: Middle Row (Subcaption & CTA) + Bottom-Anchored Headline */}
      <div className="relative z-10 w-full flex flex-col justify-end pb-6 md:pb-0">
        <Container className="w-full">
          {/* Middle Row: Left Subcaption & Right Pill CTA */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-8 pb-4 md:pb-6">
            <div className="max-w-[360px] md:max-w-[420px]">
              <p className="font-[family-name:var(--font-body)] text-[15px] sm:text-[17px] md:text-[20px] font-normal leading-[1.3] uppercase tracking-[-0.01em] text-[var(--color-cream)]">
                {subcaption}
              </p>
            </div>

            <div className="flex items-center">
              <Button
                href={ctaHref}
                variant="primary"
                size="lg"
                className="font-[family-name:var(--font-display)] text-[15px] md:text-[16px] tracking-[var(--tracking-display)] shadow-none px-7 py-3 md:px-9 md:py-3.5"
              >
                {ctaText}
              </Button>
            </div>
          </div>

          {/* Full-Width Bottom H1 Headline - Flush with bottom, single-line fit */}
          <div className="w-full overflow-hidden">
            <EditorialHeading
              as="h1"
              size="custom"
              className={cn(
                "text-[var(--color-blush)] tracking-[var(--tracking-display)] text-center md:text-left",
                isLongHeadline
                  ? "text-[clamp(2rem,7vw,6.5rem)] leading-[0.92]"
                  : "text-[clamp(2.75rem,11.5vw,5.5rem)] leading-[0.9] md:text-[clamp(4.5rem,12.5vw,11.7rem)] md:leading-[0.85] md:whitespace-nowrap"
              )}
            >
              {formatHeadline(headline)}
            </EditorialHeading>
          </div>
        </Container>
      </div>
    </section>
  );
}
