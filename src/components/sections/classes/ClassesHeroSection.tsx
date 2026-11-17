import Image from "next/image";
import { EditorialHeading } from "@/components/ui/EditorialHeading";
import { Button } from "@/components/ui/Button";
import { optimizeCloudinaryUrl } from "@/lib/utils";

interface ClassesHeroSectionProps {
  badge?: string;
  headline?: string;
  subtitle?: string;
  ctaText?: string;
  ctaHref?: string;
  imageSrc?: string;
}

function formatHeadline(text: string) {
  if (/\bprogrammes?\b/i.test(text)) {
    const parts = text.split(/\bprogrammes?\b/i);
    return (
      <>
        {parts[0]}<em>programmes</em>{parts.slice(1).join("programmes")}
      </>
    );
  }
  return text;
}

export function ClassesHeroSection({
  badge = "Curated Training Disciplines",
  headline = "OUR programmes",
  subtitle = "Low-impact strength. High metabolic burn. Science-backed progressive overload structured for women.",
  ctaText = "Book Your Trial Session",
  ctaHref = "/appointments",
  imageSrc = "/images/card-strength.jpg",
}: ClassesHeroSectionProps = {}) {
  return (
    <section className="relative w-full overflow-hidden bg-[var(--color-burgundy)] text-[var(--color-blush)] min-h-[640px] lg:min-h-[760px] flex flex-col justify-end">
      {/* Background Image with Dark Vignette */}
      <div className="absolute inset-0 z-0">
        <Image
          src={optimizeCloudinaryUrl(imageSrc, { width: 1400 }) || "/images/card-strength.jpg"}
          alt="Women training in strength and conditioning programme"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center brightness-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-burgundy)] via-[var(--color-burgundy)]/50 to-transparent" />
      </div>

      {/* Hero Content Anchored at Bottom */}
      <div className="relative z-10 w-full max-w-[1500px] mx-auto px-6 sm:px-12 lg:px-16 pb-16 pt-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          {/* Subtitle & CTA Left */}
          <div className="lg:col-span-5 space-y-5">
            <span className="inline-block rounded-full bg-[var(--color-blush)]/20 px-3.5 py-1 font-[family-name:var(--font-mono)] text-[12px] uppercase tracking-wider text-[var(--color-blush)]">
              {badge}
            </span>
            <p className="text-[17px] md:text-[20px] font-medium leading-[1.4] text-[var(--color-cream)]">
              {subtitle}
            </p>
            <div className="pt-2">
              <Button
                href={ctaHref}
                variant="blush"
                size="lg"
                className="font-[family-name:var(--font-display)] text-[16px] tracking-[var(--tracking-display)] cursor-pointer"
              >
                {ctaText}
              </Button>
            </div>
          </div>

          {/* Big Display H1 Right */}
          <div className="lg:col-span-7 lg:text-right">
            <EditorialHeading
              as="h1"
              size="h1"
              className="text-[var(--color-blush)] leading-[0.95]"
            >
              {formatHeadline(headline)}
            </EditorialHeading>
          </div>
        </div>
      </div>
    </section>
  );
}

