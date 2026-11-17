import { Container } from "@/components/ui/Container";
import { EditorialHeading } from "@/components/ui/EditorialHeading";
import { Check } from "lucide-react";

interface AboutPhilosophySectionProps {
  coreBeliefBadge?: string;
  coreBeliefQuote?: string;
  differentHeading?: string;
  differentText?: string;
  differentList?: string[];
  forHeading?: string;
  forText?: string;
  forList?: string[];
}

const DEFAULT_DIFFERENTIATORS = [
  "Individualized progressive overload tailored to your limb lengths & posture",
  "Evidence-based nutrition planning with no restrictive crash diets",
  "Dedicated weekly video form reviews and biomechanics audits",
  "Direct WhatsApp / messaging access with your coach for daily support",
  "Holistic approach respecting sleep, stress management, and female physiology",
];

const DEFAULT_WHO_ITS_FOR = [
  "Women tired of spinning their wheels with generic HIIT and endless cardio",
  "Beginners who want to master barbell and dumbbell lifting safely",
  "Busy professionals needing efficient, high-yield 45-minute training structures",
  "Mothers returning to fitness seeking postpartum core and pelvic floor strength",
  "Anyone looking for lifelong consistency and lasting mental resilience",
];

export function AboutPhilosophySection({
  coreBeliefBadge = "Our Core Belief",
  coreBeliefQuote = "STRENGTH IS NOT ABOUT SHRINKING YOURSELF. IT'S ABOUT TAKING UP SPACE, LIFTING HEAVIER, AND FUELING YOUR BODY WITH INTENTION.",
  differentHeading = "WHAT MAKES US different",
  differentText = "Unlike generic templates or one-size-fits-all influencer guides, we treat every client as an individual athlete.",
  differentList = DEFAULT_DIFFERENTIATORS,
  forHeading = "WHO THIS IS for",
  forText = "Designed for women at every stage who want sustainable, empowering strength coaching.",
  forList = DEFAULT_WHO_ITS_FOR,
}: AboutPhilosophySectionProps = {}) {
  const displayDifferentList = differentList && differentList.length > 0 ? differentList : DEFAULT_DIFFERENTIATORS;
  const displayForList = forList && forList.length > 0 ? forList : DEFAULT_WHO_ITS_FOR;

  return (
    <section className="relative w-full bg-[var(--color-cream)] text-[var(--color-burgundy)] py-16 md:py-24 border-t border-[var(--color-burgundy)]/15">
      <Container>
        {/* Pull Quote */}
        <div className="mx-auto max-w-4xl text-center pb-16 border-b border-[var(--color-burgundy)]/15">
          <span className="font-[family-name:var(--font-mono)] text-[12px] md:text-[13px] uppercase tracking-wider text-[var(--color-burgundy)]/75">
            {coreBeliefBadge}
          </span>
          <blockquote className="mt-6 font-[family-name:var(--font-display)] text-[26px] sm:text-[36px] md:text-[44px] uppercase leading-[1.15] tracking-[var(--tracking-display)] text-[var(--color-burgundy)]">
            &ldquo;{coreBeliefQuote}&rdquo;
          </blockquote>
        </div>

        {/* 2 Feature Cards */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Card 1 */}
          <div className="rounded-[10px] bg-white p-8 md:p-10 border border-[var(--color-burgundy)]/20 shadow-sm">
            <EditorialHeading
              as="h3"
              size="h3"
              className="text-[var(--color-burgundy)] leading-tight"
            >
              {differentHeading.includes("different") ? (
                <>
                  {differentHeading.split("different")[0]}
                  <em>different</em>
                  {differentHeading.split("different")[1]}
                </>
              ) : (
                differentHeading
              )}
            </EditorialHeading>
            <p className="mt-3 text-[15px] leading-relaxed text-[var(--color-burgundy)]/80">
              {differentText}
            </p>

            <ul className="mt-6 space-y-3.5">
              {displayDifferentList.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-[15px] text-[var(--color-burgundy)]/90">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--color-blush)] text-[var(--color-burgundy)] mt-0.5">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Card 2 */}
          <div className="rounded-[10px] bg-[var(--color-blush)]/40 p-8 md:p-10 border border-[var(--color-burgundy)]/20 shadow-sm">
            <EditorialHeading
              as="h3"
              size="h3"
              className="text-[var(--color-burgundy)] leading-tight"
            >
              {forHeading.includes("for") ? (
                <>
                  {forHeading.split("for")[0]}
                  <em>for</em>
                  {forHeading.split("for")[1]}
                </>
              ) : (
                forHeading
              )}
            </EditorialHeading>
            <p className="mt-3 text-[15px] leading-relaxed text-[var(--color-burgundy)]/80">
              {forText}
            </p>

            <ul className="mt-6 space-y-3.5">
              {displayForList.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-[15px] text-[var(--color-burgundy)]/90">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--color-burgundy)] text-[var(--color-cream)] mt-0.5">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}

