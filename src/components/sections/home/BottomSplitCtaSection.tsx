import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { EditorialHeading } from "@/components/ui/EditorialHeading";
import { optimizeCloudinaryUrl } from "@/lib/utils";

interface BottomSplitCtaSectionProps {
  headline?: string;
  ctaText?: string;
  ctaHref?: string;
  imageSrc?: string;
}

/**
 * Section 10: Bottom Split CTA Section (Desktop height ~882px)
 * Background: Dusty Blush (#E9C9CF)
 * 50/50 layout: Full-bleed photo left, high-impact CTA copy & oversized pill button right.
 */
export function BottomSplitCtaSection({ headline, ctaText, ctaHref, imageSrc: customImageSrc }: BottomSplitCtaSectionProps = {}) {
  const imageSrc = customImageSrc ? optimizeCloudinaryUrl(customImageSrc, { width: 1200 }) || customImageSrc : null;

  return (
    <section className="relative w-full overflow-hidden bg-[var(--color-blush)] text-[var(--color-burgundy)] border-t border-[var(--color-burgundy)]/15">
      {imageSrc ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[580px] lg:min-h-[760px] items-stretch">
          {/* Left Column: Full-Bleed Editorial Fitness Photo */}
          <div className="lg:col-span-6 relative min-h-[380px] lg:min-h-full w-full bg-[var(--color-burgundy)]/20">
            <Image
              src={imageSrc}
              alt="Female fitness coaching"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center"
            />
          </div>

          {/* Right Column: High-Impact Action Copy & CTA */}
          <div className="lg:col-span-6 flex flex-col justify-center px-6 sm:px-12 md:px-16 lg:px-20 py-16 lg:py-24">
            <div className="max-w-[480px]">
              <EditorialHeading
                as="h2"
                size="h2"
                className="text-[var(--color-burgundy)] leading-[1.05]"
              >
                {headline ? headline : <>READY <em>to</em> FEEL STRONG?</>}
              </EditorialHeading>

              <div className="mt-6 flex flex-col gap-2 text-[17px] md:text-[20px] font-medium leading-[1.4] text-[var(--color-burgundy)]">
                <p>Stronger body. Sharper mindset. Real, lasting energy.</p>
                <p className="opacity-80">Your customized coaching plan begins today.</p>
              </div>

              <div className="mt-10">
                <Button
                  href={ctaHref || "/appointments"}
                  variant="primary"
                  size="oval"
                  className="font-[family-name:var(--font-display)] text-[18px] md:text-[20px] tracking-[var(--tracking-display)] shadow-lg hover:scale-[1.02] transition-transform duration-100"
                >
                  {ctaText || "Start Today"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="max-w-3xl mx-auto px-6 py-20 md:py-28 text-center flex flex-col items-center">
          <EditorialHeading
            as="h2"
            size="h2"
            className="text-[var(--color-burgundy)] leading-[1.05]"
          >
            {headline ? headline : <>READY <em>to</em> FEEL STRONG?</>}
          </EditorialHeading>

          <div className="mt-6 flex flex-col gap-2 text-[17px] md:text-[20px] font-medium leading-[1.4] text-[var(--color-burgundy)]">
            <p>Stronger body. Sharper mindset. Real, lasting energy.</p>
            <p className="opacity-80">Your customized coaching plan begins today.</p>
          </div>

          <div className="mt-10">
            <Button
              href={ctaHref || "/appointments"}
              variant="primary"
              size="oval"
              className="font-[family-name:var(--font-display)] text-[18px] md:text-[20px] tracking-[var(--tracking-display)] shadow-lg hover:scale-[1.02] transition-transform duration-100"
            >
              {ctaText || "Start Today"}
            </Button>
          </div>
        </div>
      )}
    </section>
  );
}

