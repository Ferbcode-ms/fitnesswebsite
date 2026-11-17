import Image from "next/image";
import { EditorialHeading } from "@/components/ui/EditorialHeading";
import { Button } from "@/components/ui/Button";

interface SingleServiceHeroSectionProps {
  badge?: string;
  headline?: string;
  subtitle?: string;
  cta1Text?: string;
  cta1Link?: string;
  cta2Text?: string;
  cta2Link?: string;
  image1Src?: string;
  image2Src?: string;
  image3Src?: string;
}

function formatHeadline(text: string) {
  if (/\bpersonally\b/i.test(text)) {
    const parts = text.split(/\bpersonally\b/i);
    return (
      <>
        {parts[0]}<em>personally</em>{parts.slice(1).join("personally")}
      </>
    );
  }
  return text;
}

export function SingleServiceHeroSection({
  badge = "Flagship Private Mentorship",
  headline = "STRONGER. SCULPTED. personally GUIDED.",
  subtitle = "The comprehensive 1:1 coaching experience engineered for women who want individualized strength programming, bespoke nutrition guidance, and direct daily coach accountability.",
  cta1Text = "Apply For 1:1 Coaching",
  cta1Link = "/appointments",
  cta2Text = "View Coaching Containers",
  cta2Link = "#pricing",
  image1Src = "/images/card-strength.jpg",
  image2Src = "/images/service-collage-1.jpg",
  image3Src = "/images/test-coach.jpg",
}: SingleServiceHeroSectionProps = {}) {
  return (
    <section className="relative w-full overflow-hidden bg-[var(--color-burgundy)] text-[var(--color-blush)] py-16 md:py-24 border-b border-[var(--color-blush)]/15">
      <div className="max-w-[1500px] mx-auto px-6 sm:px-12 lg:px-16">
        <div className="mx-auto max-w-4xl text-center">
          <span className="inline-block rounded-full bg-[var(--color-blush)]/20 px-4 py-1 font-[family-name:var(--font-mono)] text-[12px] uppercase tracking-wider text-[var(--color-blush)]">
            {badge}
          </span>

          <EditorialHeading
            as="h1"
            size="h1"
            className="mt-6 text-[var(--color-blush)] leading-[0.98]"
          >
            {formatHeadline(headline)}
          </EditorialHeading>

          <p className="mt-6 text-[17px] md:text-[20px] leading-relaxed text-[var(--color-cream)]/90 max-w-2xl mx-auto">
            {subtitle}
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button
              href={cta1Link}
              variant="blush"
              size="lg"
              className="font-[family-name:var(--font-display)] text-[16px] tracking-[var(--tracking-display)] cursor-pointer"
            >
              {cta1Text}
            </Button>
            <Button
              href={cta2Link}
              variant="outline-cream"
              size="lg"
              className="font-[family-name:var(--font-display)] text-[16px] tracking-[var(--tracking-display)] cursor-pointer"
            >
              {cta2Text}
            </Button>
          </div>
        </div>

        {/* Media Collage Strip */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="relative h-[260px] sm:h-[320px] rounded-[10px] overflow-hidden border border-[var(--color-blush)]/20 shadow-md">
            <Image
              src={image1Src || "/images/card-strength.jpg"}
              alt="Client strength lifting with barbell"
              fill
              priority
              sizes="(max-width: 640px) 100vw, 33vw"
              className="object-cover"
            />
          </div>
          <div className="relative h-[260px] sm:h-[320px] rounded-[10px] overflow-hidden border border-[var(--color-blush)]/20 shadow-md sm:-translate-y-4">
            <Image
              src={image2Src || "/images/service-collage-1.jpg"}
              alt="Female fitness coach observing form"
              fill
              sizes="(max-width: 640px) 100vw, 33vw"
              className="object-cover"
            />
          </div>
          <div className="relative h-[260px] sm:h-[320px] rounded-[10px] overflow-hidden border border-[var(--color-blush)]/20 shadow-md">
            <Image
              src={image3Src || "/images/test-coach.jpg"}
              alt="Personal training dumbbell movement check"
              fill
              sizes="(max-width: 640px) 100vw, 33vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

