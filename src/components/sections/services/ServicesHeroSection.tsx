import { EditorialHeading } from "@/components/ui/EditorialHeading";
import { Button } from "@/components/ui/Button";

interface ServicesHeroSectionProps {
  badge?: string;
  headline?: string;
  subtitle?: string;
  cta1Text?: string;
  cta1Link?: string;
  cta2Text?: string;
  cta2Link?: string;
}

function formatHeadline(text: string) {
  if (/\bservices?\b/i.test(text)) {
    const parts = text.split(/\bservices?\b/i);
    return (
      <>
        {parts[0]}<em>services</em>{parts.slice(1).join("services")}
      </>
    );
  }
  return text;
}

export function ServicesHeroSection({
  badge = "Online & In-Person Solutions",
  headline = "OUR services",
  subtitle = "Tailored fitness coaching built on female biomechanics, progressive strength training, and sustainable lifestyle design.",
  cta1Text = "Book Free Strategy Call",
  cta1Link = "/appointments",
  cta2Text = "1:1 Private Coaching Deep-Dive",
  cta2Link = "/single-service",
}: ServicesHeroSectionProps = {}) {
  return (
    <section className="relative w-full overflow-hidden bg-[var(--color-burgundy)] text-[var(--color-blush)] py-20 lg:py-28 border-b border-[var(--color-blush)]/15">
      <div className="max-w-[1500px] mx-auto px-6 sm:px-12 lg:px-16 text-center">
        <span className="inline-block rounded-full bg-[var(--color-blush)]/20 px-4 py-1.5 font-[family-name:var(--font-mono)] text-[12px] uppercase tracking-wider text-[var(--color-blush)]">
          {badge}
        </span>

        <EditorialHeading
          as="h1"
          size="h1"
          className="mt-6 text-[var(--color-blush)] leading-[0.98] max-w-4xl mx-auto"
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
    </section>
  );
}

