import { Container } from "@/components/ui/Container";
import { MarqueeBanner } from "@/components/ui/MarqueeBanner";
import { EditorialHeading } from "@/components/ui/EditorialHeading";
import { Button } from "@/components/ui/Button";
import { Check, Sparkles } from "lucide-react";

export interface CoachingContainer {
  id?: string;
  name: string;
  cadence: string;
  price: string;
  subprice: string;
  description: string;
  features: string[];
  isPopular?: boolean;
}

interface SingleServicePricingSectionProps {
  badge?: string;
  heading?: string;
  subtext?: string;
  marqueeText?: string;
  containers?: CoachingContainer[];
}

const DEFAULT_CONTAINERS: CoachingContainer[] = [
  {
    name: "3-MONTH INTENSIVE",
    cadence: "12 Weeks of Focused Coaching",
    price: "$997",
    subprice: "or 3 monthly payments of $349",
    description:
      "Ideal for the woman who wants to overhaul her lifting mechanics, establish an unbreakable routine, and kickstart significant body recomposition.",
    features: [
      "Full 12-week custom progressive strength split",
      "Weekly Loom video form analysis reviews",
      "Tailored caloric and macronutrient targets",
      "Direct coach WhatsApp messaging (Mon-Fri)",
      "Bi-weekly performance & habit audits",
    ],
    isPopular: false,
  },
  {
    name: "6-MONTH TRANSFORMATION",
    cadence: "24 Weeks of Comprehensive Mentorship",
    price: "$1,897",
    subprice: "or 6 monthly payments of $329",
    description:
      "Our most comprehensive container. Allows for two distinct periodized training phases, reverse dieting if needed, and true lifelong physical mastery.",
    features: [
      "Two periodized 12-week training cycles (Hypertrophy + Strength Peak)",
      "Weekly Loom video form audits with zero turnaround lag",
      "Phase-by-phase nutrition adjustments & reverse dieting protocol",
      "24/7 priority direct coach access",
      "Monthly 30-minute private 1-on-1 strategy video call",
      "Lifetime access to our complete movement exercise vault",
    ],
    isPopular: true,
  },
];

function formatHeading(text: string) {
  if (/\bcontainers?\b/i.test(text)) {
    const parts = text.split(/\bcontainers?\b/i);
    return (
      <>
        {parts[0]}<em>containers</em>{parts.slice(1).join("containers")}
      </>
    );
  }
  return text;
}

export function SingleServicePricingSection({
  badge = "Investment & Commitment",
  heading = "COACHING containers",
  subtext = "Transparent pricing with flexible payment plans. Application is required to ensure coach-client alignment.",
  marqueeText = "CHOOSE YOUR COACHING CONTAINER",
  containers = DEFAULT_CONTAINERS,
}: SingleServicePricingSectionProps = {}) {
  const displayContainers = containers && containers.length > 0 ? containers : DEFAULT_CONTAINERS;

  return (
    <section id="pricing" className="relative w-full overflow-hidden bg-[var(--color-burgundy)] text-[var(--color-cream)]">
      {/* Marquee Banner */}
      <div className="border-b border-[var(--color-blush)]/15">
        <MarqueeBanner
          text={marqueeText}
          separator="/"
          theme="burgundy"
          repeat={4}
          ariaLabel="Choose your coaching container"
        />
      </div>

      <Container className="py-16 md:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <span className="font-[family-name:var(--font-mono)] text-[12px] md:text-[13px] uppercase tracking-wider text-[var(--color-blush)]">
            {badge}
          </span>
          <EditorialHeading
            as="h2"
            size="h2"
            className="mt-3 text-[var(--color-blush)] leading-[1.05]"
          >
            {formatHeading(heading)}
          </EditorialHeading>
          <p className="mt-4 text-[15px] md:text-[17px] leading-relaxed text-[var(--color-cream)]/85">
            {subtext}
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch max-w-5xl mx-auto">
          {displayContainers.map((c, idx) => (
            <div
              key={idx}
              className={`relative rounded-[10px] p-8 md:p-10 flex flex-col justify-between transition-transform duration-200 hover:-translate-y-1 ${
                c.isPopular
                  ? "bg-[var(--color-sand)] text-[var(--color-espresso)] shadow-2xl ring-2 ring-[var(--color-blush)]"
                  : "bg-[var(--color-cream)]/10 text-[var(--color-cream)] border border-[var(--color-blush)]/20 shadow-md"
              }`}
            >
              {c.isPopular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 rounded-full bg-[var(--color-burgundy)] px-4 py-1 font-[family-name:var(--font-mono)] text-[11px] font-bold uppercase tracking-wider text-[var(--color-blush)] shadow">
                  <Sparkles className="h-3 w-3" /> Most Recommended
                </div>
              )}

              <div>
                <h3
                  className={`font-[family-name:var(--font-display)] text-[24px] md:text-[28px] uppercase tracking-[var(--tracking-display)] ${
                    c.isPopular ? "text-[var(--color-espresso)]" : "text-[var(--color-blush)]"
                  }`}
                >
                  {c.name}
                </h3>
                <p
                  className={`mt-1 font-[family-name:var(--font-mono)] text-[12px] uppercase tracking-wider ${
                    c.isPopular ? "text-[var(--color-espresso)]/75" : "text-[var(--color-cream)]/70"
                  }`}
                >
                  {c.cadence}
                </p>

                <div className="mt-6">
                  <div
                    className={`font-[family-name:var(--font-display)] text-[46px] md:text-[54px] leading-none ${
                      c.isPopular ? "text-[var(--color-espresso)]" : "text-[var(--color-cream)]"
                    }`}
                  >
                    {c.price}
                  </div>
                  <div
                    className={`mt-1 text-[13px] ${
                      c.isPopular ? "text-[var(--color-espresso)]/70" : "text-[var(--color-cream)]/70"
                    }`}
                  >
                    {c.subprice}
                  </div>
                </div>

                <p
                  className={`mt-6 text-[14px] leading-relaxed border-t pt-4 ${
                    c.isPopular
                      ? "text-[var(--color-espresso)]/85 border-[var(--color-espresso)]/15"
                      : "text-[var(--color-cream)]/80 border-[var(--color-cream)]/15"
                  }`}
                >
                  {c.description}
                </p>

                <ul className="mt-6 space-y-3">
                  {c.features.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-3 text-[14px]">
                      <span
                        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full mt-0.5 ${
                          c.isPopular
                            ? "bg-[var(--color-burgundy)] text-[var(--color-sand)]"
                            : "bg-[var(--color-blush)] text-[var(--color-burgundy)]"
                        }`}
                      >
                        <Check className="h-3 w-3" />
                      </span>
                      <span className={c.isPopular ? "text-[var(--color-espresso)]/90" : "text-[var(--color-cream)]/90"}>
                        {feat}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-10 pt-4">
                <Button
                  href="/appointments"
                  variant={c.isPopular ? "primary" : "blush"}
                  size="lg"
                  className="w-full font-[family-name:var(--font-display)] text-[16px] tracking-[var(--tracking-display)] cursor-pointer"
                >
                  Apply For This Container
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

