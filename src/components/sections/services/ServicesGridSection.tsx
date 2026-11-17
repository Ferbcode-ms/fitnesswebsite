import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { EditorialHeading } from "@/components/ui/EditorialHeading";
import { Button } from "@/components/ui/Button";
import { Check, ArrowRight } from "lucide-react";

interface ServiceItem {
  id: string;
  tag: string;
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
  primaryCtaText: string;
  primaryCtaHref: string;
  learnMoreHref?: string;
  badge?: string;
}

interface ServicesGridSectionProps {
  badge?: string;
  heading?: string;
  subtext?: string;
  services?: Array<{
    id: string;
    title: string;
    service_type: string;
    badge?: string | null;
    summary: string;
    features: string[];
    pricing_tier?: string | null;
    image_url?: string | null;
    cta_text: string;
    cta_link: string;
  }>;
}

function formatHeading(text: string) {
  if (/\bpathways?\b/i.test(text)) {
    const parts = text.split(/\bpathways?\b/i);
    return (
      <>
        {parts[0]}<em>pathway</em>{parts.slice(1).join("pathway")}
      </>
    );
  }
  return text;
}

export function ServicesGridSection({
  badge = "What We Offer",
  heading = "CHOOSE YOUR pathway",
  subtext = "Every service is backed by exercise physiology and personalized attention to help you achieve sustainable, lifelong results.",
  services: customServices,
}: ServicesGridSectionProps = {}) {
  const defaultServices: ServiceItem[] = [
    {
      id: "in-person-pt",
      tag: "Studio Coaching",
      title: "1-on-1 IN-PERSON TRAINING",
      subtitle: "Hands-on technique refinement & real-time cueing in our private suite.",
      description:
        "Designed for women who want immediate tactile feedback, barbell mastery, and maximum accountability inside an empowering, private studio setting.",
      highlights: [
        "Comprehensive 60-minute movement & joint mobility assessment",
        "Hands-on barbell, dumbbell, and kettlebell form coaching",
        "Targeted core & pelvic floor integration",
        "Custom warm-up and post-session recovery routines",
      ],
      primaryCtaText: "Book In-Person Session",
      primaryCtaHref: "/appointments",
      learnMoreHref: "/single-service",
      badge: "Limited Spots",
    },
    {
      id: "online-coaching",
      tag: "Remote Athlete",
      title: "ONLINE 1-ON-1 COACHING",
      subtitle: "Global remote programming with weekly video check-ins and direct messaging.",
      description:
        "Our flagship remote coaching container. Wherever you train—home gym, commercial gym, or traveling—your coach designs and refines your training split weekly.",
      highlights: [
        "Interactive smartphone app delivery with video exercise tutorials",
        "Weekly Loom video form analyses and biofeedback check-ins",
        "Direct coach messaging via private WhatsApp channel",
        "Flexible macro & nutritional guidance adjusted to your rate of progress",
      ],
      primaryCtaText: "Apply For Online Coaching",
      primaryCtaHref: "/single-service",
      learnMoreHref: "/single-service",
      badge: "Flagship",
    },
    {
      id: "workout-programming",
      tag: "Independent Training",
      title: "CUSTOM WORKOUT PROGRAMMES",
      subtitle: "Periodized 12-week hypertrophy and strength blueprints.",
      description:
        "For the self-directed trainee who wants an intelligently structured training split without guesswork. Built strictly around the equipment you have available.",
      highlights: [
        "Periodized 12-week phases focused on strength & muscle tone",
        "RPE and progressive overload tracking built into your dashboard",
        "Warm-up, mobility flow, and conditioning finishers included",
        "Lifetime access to your program library and exercise guide",
      ],
      primaryCtaText: "Inquire About Programming",
      primaryCtaHref: "/contact",
      learnMoreHref: "/classes",
    },
    {
      id: "nutrition-habits",
      tag: "Nutritional Architecture",
      title: "EVIDENCE-BASED NUTRITION COACHING",
      subtitle: "Fuel for performance and lean muscle with zero food guilt or crash diets.",
      description:
        "We teach sustainable eating habits tailored to women. Understand your protein needs, energy intake, menstrual cycle phases, and recovery without restrictive meal plans.",
      highlights: [
        "Personalized caloric and macronutrient targets",
        "Meal composition frameworks and grocery guides",
        "Weekly digestion, energy, and sleep biofeedback audits",
        "Strategies for dining out, social events, and holiday balance",
      ],
      primaryCtaText: "Get Nutrition Guidance",
      primaryCtaHref: "/appointments",
      learnMoreHref: "/contact",
    },
  ];

  const displayServices: ServiceItem[] =
    customServices && customServices.length > 0
      ? customServices.map((cs) => ({
          id: cs.id,
          tag: cs.service_type === "in_person" ? "Studio Coaching" : cs.service_type === "online" ? "Remote Athlete" : "Hybrid Athlete",
          title: cs.title.toUpperCase(),
          subtitle: cs.pricing_tier || "Personalized Coaching Tier",
          description: cs.summary,
          highlights: cs.features,
          primaryCtaText: cs.cta_text || "Book A Session",
          primaryCtaHref: cs.cta_link || "/appointments",
          learnMoreHref: "/single-service",
          badge: cs.badge || undefined,
        }))
      : defaultServices;

  return (
    <section className="relative w-full bg-[var(--color-cream)] text-[var(--color-burgundy)] py-16 md:py-24">
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

        <div className="mt-14 grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {displayServices.map((item) => (
            <div
              key={item.id}
              className="rounded-[10px] bg-white border border-[var(--color-burgundy)]/20 p-8 md:p-10 shadow-sm flex flex-col justify-between transition-transform duration-200 hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center justify-between gap-3">
                  <span className="font-[family-name:var(--font-mono)] text-[11px] font-bold uppercase tracking-wider text-[var(--color-burgundy)]/70 bg-[var(--color-sand)]/50 px-2.5 py-1 rounded">
                    {item.tag}
                  </span>
                  {item.badge && (
                    <span className="font-[family-name:var(--font-mono)] text-[11px] font-bold uppercase tracking-wider text-[var(--color-cream)] bg-[var(--color-burgundy)] px-2.5 py-1 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </div>

                <h3 className="mt-4 font-[family-name:var(--font-display)] text-[24px] md:text-[28px] uppercase tracking-[var(--tracking-display)] text-[var(--color-burgundy)] leading-tight">
                  {item.title}
                </h3>
                <p className="mt-2 text-[14px] font-semibold text-[var(--color-burgundy)]/80">
                  {item.subtitle}
                </p>

                <p className="mt-4 text-[15px] leading-relaxed text-[var(--color-burgundy)]/85">
                  {item.description}
                </p>

                <div className="mt-6 border-t border-[var(--color-burgundy)]/10 pt-5">
                  <span className="block font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-wider text-[var(--color-burgundy)]/60 mb-3">
                    Key Deliverables
                  </span>
                  <ul className="space-y-2.5">
                    {item.highlights.map((point, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-2.5 text-[14px] text-[var(--color-burgundy)]/90">
                        <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[var(--color-blush)] text-[var(--color-burgundy)] mt-0.5">
                          <Check className="h-2.5 w-2.5" />
                        </span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-[var(--color-burgundy)]/10 flex flex-wrap items-center justify-between gap-4">
                <Button
                  href={item.primaryCtaHref}
                  variant="primary"
                  size="md"
                  className="font-[family-name:var(--font-display)] text-[14px] tracking-[var(--tracking-display)] cursor-pointer"
                >
                  {item.primaryCtaText}
                </Button>

                {item.learnMoreHref && (
                  <Link
                    href={item.learnMoreHref}
                    className="inline-flex items-center gap-1 font-[family-name:var(--font-mono)] text-[12px] uppercase tracking-wider text-[var(--color-burgundy)] hover:underline font-semibold"
                  >
                    Details <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

