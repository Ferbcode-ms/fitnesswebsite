import { Container } from "@/components/ui/Container";
import { EditorialHeading } from "@/components/ui/EditorialHeading";
import { Button } from "@/components/ui/Button";
import { Check, Sparkles } from "lucide-react";

export interface MembershipTier {
  id?: string;
  name: string;
  subtitle: string;
  price: string;
  cadence: string;
  isPopular?: boolean;
  features: string[];
  ctaText?: string;
  ctaHref?: string;
}

interface ClassesMembershipTiersSectionProps {
  badge?: string;
  heading?: string;
  subtext?: string;
  tiers?: MembershipTier[];
}

const DEFAULT_TIERS: MembershipTier[] = [
  {
    name: "4 SESSIONS / MONTH",
    subtitle: "Foundational Coaching Split",
    price: "$240",
    cadence: "per month",
    isPopular: false,
    features: [
      "1 weekly in-person or live video coached session",
      "Customized weekly workout programming app access",
      "Monthly progress & movement audit",
      "Standard coach email support",
    ],
  },
  {
    name: "8 SESSIONS / MONTH",
    subtitle: "Consistent Progressive Overload",
    price: "$440",
    cadence: "per month",
    isPopular: true,
    features: [
      "2 weekly in-person or live video coached sessions",
      "Full progressive strength & hypertrophy split",
      "Bi-weekly body composition & mobility check-ins",
      "Dedicated direct messaging with your coach",
      "Nutrition target guidelines & habit tracker",
    ],
  },
  {
    name: "UNLIMITED ATHLETE",
    subtitle: "Comprehensive 1-on-1 Transformation",
    price: "$680",
    cadence: "per month",
    isPopular: false,
    features: [
      "Up to 3 coached private/hybrid sessions weekly",
      "Customized evidence-based macronutrient architecture",
      "24/7 priority messaging & daily accountability",
      "Unlimited video form reviews & technique audits",
      "Quarterly functional mobility assessment",
    ],
  },
];

function formatHeading(text: string) {
  if (/\bmemberships?\b/i.test(text)) {
    const parts = text.split(/\bmemberships?\b/i);
    return (
      <>
        {parts[0]}<em>memberships</em>{parts.slice(1).join("memberships")}
      </>
    );
  }
  return text;
}

export function ClassesMembershipTiersSection({
  badge = "Flexible & Transparent",
  heading = "OUR memberships",
  subtext = "Invest in dedicated coaching with clear structures, zero hidden fees, and month-to-month flexibility.",
  tiers = DEFAULT_TIERS,
}: ClassesMembershipTiersSectionProps = {}) {
  const displayTiers = tiers && tiers.length > 0 ? tiers : DEFAULT_TIERS;

  const getGridColsClass = (count: number) => {
    if (count === 1) return "max-w-md mx-auto";
    if (count === 2) return "grid grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto gap-8 items-stretch";
    if (count === 4) return "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch";
    return "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch";
  };

  return (
    <section className="relative w-full bg-[var(--color-blush)] text-[var(--color-burgundy)] py-16 md:py-24 border-t border-[var(--color-burgundy)]/15">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <span className="font-[family-name:var(--font-mono)] text-[12px] md:text-[13px] uppercase tracking-wider text-[var(--color-burgundy)]/75">
            {badge}
          </span>
          <EditorialHeading
            as="h2"
            size="h2"
            className="mt-3 text-[var(--color-burgundy)] leading-[1.05]"
          >
            {formatHeading(heading)}
          </EditorialHeading>
          <p className="mt-4 text-[15px] md:text-[17px] leading-relaxed text-[var(--color-burgundy)]/85">
            {subtext}
          </p>
        </div>

        <div className={`mt-14 ${getGridColsClass(displayTiers.length)}`}>
          {displayTiers.map((tier, idx) => (
            <div
              key={tier.id || idx}
              className={`relative rounded-[10px] p-8 flex flex-col justify-between transition-transform duration-200 hover:-translate-y-1 ${
                tier.isPopular
                  ? "bg-[var(--color-burgundy)] text-[var(--color-cream)] shadow-xl ring-2 ring-[var(--color-burgundy)]"
                  : "bg-white text-[var(--color-burgundy)] border border-[var(--color-burgundy)]/20 shadow-sm"
              }`}
            >
              {tier.isPopular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 rounded-full bg-[var(--color-sand)] px-4 py-1 font-[family-name:var(--font-mono)] text-[11px] font-bold uppercase tracking-wider text-[var(--color-espresso)] shadow">
                  <Sparkles className="h-3 w-3" /> Most Popular
                </div>
              )}

              <div>
                <h3
                  className={`font-[family-name:var(--font-display)] text-[22px] md:text-[24px] uppercase tracking-[var(--tracking-display)] ${
                    tier.isPopular ? "text-[var(--color-blush)]" : "text-[var(--color-burgundy)]"
                  }`}
                >
                  {tier.name}
                </h3>
                <p
                  className={`mt-1 font-[family-name:var(--font-mono)] text-[12px] uppercase tracking-wider ${
                    tier.isPopular ? "text-[var(--color-cream)]/75" : "text-[var(--color-burgundy)]/70"
                  }`}
                >
                  {tier.subtitle}
                </p>

                <div className="mt-6 flex items-baseline gap-2">
                  <span
                    className={`font-[family-name:var(--font-display)] text-[44px] md:text-[50px] leading-none ${
                      tier.isPopular ? "text-[var(--color-cream)]" : "text-[var(--color-burgundy)]"
                    }`}
                  >
                    {tier.price}
                  </span>
                  <span
                    className={`text-[14px] ${
                      tier.isPopular ? "text-[var(--color-cream)]/75" : "text-[var(--color-burgundy)]/70"
                    }`}
                  >
                    / {tier.cadence}
                  </span>
                </div>

                <ul className="mt-8 space-y-3.5 border-t pt-6 border-current/15">
                  {(tier.features || []).map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-3 text-[14px] leading-snug">
                      <span
                        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full mt-0.5 ${
                          tier.isPopular
                            ? "bg-[var(--color-blush)] text-[var(--color-burgundy)]"
                            : "bg-[var(--color-burgundy)] text-[var(--color-cream)]"
                        }`}
                      >
                        <Check className="h-3 w-3" />
                      </span>
                      <span className={tier.isPopular ? "text-[var(--color-cream)]/90" : "text-[var(--color-burgundy)]/85"}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-10 pt-4">
                <Button
                  href={tier.ctaHref || "/appointments"}
                  variant={tier.isPopular ? "blush" : "primary"}
                  size="lg"
                  className="w-full font-[family-name:var(--font-display)] text-[15px] tracking-[var(--tracking-display)] cursor-pointer"
                >
                  {tier.ctaText || "Join Today"}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

