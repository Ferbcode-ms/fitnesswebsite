import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { EditorialHeading } from "@/components/ui/EditorialHeading";
import { Button } from "@/components/ui/Button";
import { Check, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

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
  const displayServices: ServiceItem[] =
    customServices && customServices.length > 0
      ? customServices.map((cs) => ({
          id: cs.id,
          tag:
            cs.service_type === "in_person"
              ? "Studio Coaching"
              : cs.service_type === "online"
              ? "Remote Athlete"
              : "Hybrid Athlete",
          title: cs.title.toUpperCase(),
          subtitle: cs.pricing_tier || "Personalized Coaching Tier",
          description: cs.summary,
          highlights: cs.features,
          primaryCtaText: cs.cta_text || "Book A Session",
          primaryCtaHref: cs.cta_link || "/appointments",
          learnMoreHref: "/single-service",
          badge: cs.badge || undefined,
        }))
      : [];

  if (displayServices.length === 0) {
    return null;
  }

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

        <div
          className={cn(
            "mt-14 grid grid-cols-1 gap-8 items-stretch",
            displayServices.length === 3
              ? "md:grid-cols-2 lg:grid-cols-3"
              : "lg:grid-cols-2"
          )}
        >
          {displayServices.map((item) => (
            <div
              key={item.id}
              className="rounded-[10px] bg-white border border-[var(--color-burgundy)]/20 p-8 shadow-sm flex flex-col justify-between transition-transform duration-200 hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center justify-between gap-3 mb-4">
                  <span className="font-[family-name:var(--font-mono)] text-[11px] font-bold uppercase tracking-wider text-[var(--color-burgundy)]/70 bg-[var(--color-sand)]/50 px-2.5 py-1 rounded">
                    {item.tag}
                  </span>
                  {item.badge && (
                    <span className="font-[family-name:var(--font-mono)] text-[11px] font-bold uppercase tracking-wider text-[var(--color-cream)] bg-[var(--color-burgundy)] px-2.5 py-1 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </div>

                <h3 className="font-[family-name:var(--font-display)] text-[22px] md:text-[24px] uppercase tracking-[var(--tracking-display)] text-[var(--color-burgundy)] leading-tight">
                  {item.title}
                </h3>
                <p className="mt-1.5 font-[family-name:var(--font-mono)] text-[12px] uppercase tracking-wider font-semibold text-[var(--color-burgundy)]/75">
                  {item.subtitle}
                </p>

                <p className="mt-3.5 text-[14px] md:text-[15px] leading-relaxed text-[var(--color-burgundy)]/85">
                  {item.description}
                </p>

                <div className="mt-6 border-t border-[var(--color-burgundy)]/10 pt-5">
                  <span className="block font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-wider text-[var(--color-burgundy)]/60 mb-3">
                    Key Deliverables
                  </span>
                  <ul className="space-y-2">
                    {item.highlights.map((point, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-2.5 text-[13px] md:text-[14px] text-[var(--color-burgundy)]/90">
                        <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[var(--color-blush)] text-[var(--color-burgundy)] mt-0.5">
                          <Check className="h-2.5 w-2.5" />
                        </span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8 pt-5 border-t border-[var(--color-burgundy)]/10 flex flex-wrap items-center justify-between gap-3">
                <Button
                  href={item.primaryCtaHref}
                  variant="primary"
                  size="md"
                  className="font-[family-name:var(--font-display)] text-[13px] tracking-[var(--tracking-display)] cursor-pointer px-5 py-2.5"
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
