import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { EditorialHeading } from "@/components/ui/EditorialHeading";
import { Card } from "@/components/ui/Card";
import { optimizeCloudinaryUrl } from "@/lib/utils";

interface TestimonialCardData {
  theme: "white" | "blush" | "cream";
  headline: string;
  quote: string;
  author: string;
  clientType: string;
  avatarSrc?: string | null;
}

interface TestimonialItem {
  id?: string;
  quote: string;
  client_name: string;
  client_role: string;
  avatar_url?: string | null;
}

interface TestimonialsBentoSectionProps {
  testimonials?: TestimonialItem[];
}

/**
 * Section 2: Testimonials Bento Grid
 * Background: Deep Burgundy (#4A1C21)
 * Asymmetric layout with star rating markers, quote copy, and client initials / avatars.
 */
export function TestimonialsBentoSection({ testimonials: customTestimonials }: TestimonialsBentoSectionProps = {}) {
  if (!customTestimonials || customTestimonials.length === 0) {
    return null;
  }

  const themes: Array<"white" | "blush" | "blush" | "cream"> = ["white", "blush", "blush", "cream"];
  const displayCards: TestimonialCardData[] = customTestimonials.slice(0, 4).map((t, idx) => ({
    theme: themes[idx % themes.length],
    headline: `“${t.quote.slice(0, 48).trim().toUpperCase()}${t.quote.length > 48 ? "..." : ""}”`,
    quote: t.quote,
    author: t.client_name,
    clientType: t.client_role,
    avatarSrc: t.avatar_url ? optimizeCloudinaryUrl(t.avatar_url, { width: 120, height: 120 }) || t.avatar_url : null,
  }));

  return (
    <section className="relative w-full bg-[var(--color-burgundy)] py-20 md:py-24 text-[var(--color-burgundy)]">
      <Container>
        {/* Top Row: Title Card (Sand) + Up to 2 Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
          {/* Card 1: Title Card */}
          <Card
            theme="sand"
            radius="md"
            className="md:col-span-5 flex flex-col justify-between p-8 md:p-10 min-h-[300px] md:min-h-[360px]"
          >
            <div>
              <p className="font-[family-name:var(--font-mono)] text-[12px] uppercase tracking-[var(--tracking-nav)] text-[var(--color-espresso)] opacity-80">
                REAL CLIENT STORIES
              </p>
              <EditorialHeading
                as="h2"
                size="h2"
                className="mt-4 text-[var(--color-burgundy)] leading-[1.05]"
              >
                THE GLOW <em>is</em> REAL.
              </EditorialHeading>
            </div>

            <p className="font-[family-name:var(--font-body)] text-[15px] leading-[1.5] text-[var(--color-espresso)]">
              Real women. Real strength. Real sustainable transformations built with
              individualized care and high-touch support.
            </p>
          </Card>

          {/* Card 2 */}
          {displayCards[0] && (
            <TestimonialCard card={displayCards[0]} className={displayCards.length === 1 ? "md:col-span-7" : "md:col-span-3"} />
          )}

          {/* Card 3 */}
          {displayCards[1] && (
            <TestimonialCard card={displayCards[1]} className="md:col-span-4" />
          )}
        </div>

        {/* Bottom Row: Additional Cards if available */}
        {displayCards.length > 2 && (
          <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-5">
            {displayCards[2] && <TestimonialCard card={displayCards[2]} />}
            {displayCards[3] && <TestimonialCard card={displayCards[3]} />}
          </div>
        )}
      </Container>
    </section>
  );
}

function TestimonialCard({
  card,
  className = "",
}: {
  card: TestimonialCardData;
  className?: string;
}) {
  return (
    <Card
      theme={card.theme}
      radius="md"
      className={`flex flex-col justify-between p-8 md:p-10 min-h-[320px] ${className}`}
    >
      <div>
        {/* Star Rating Line */}
        <div
          aria-label="5 out of 5 stars"
          className="text-[18px] tracking-[0.2em] text-[var(--color-burgundy)] select-none font-bold"
        >
          ★★★★★
        </div>

        <h3 className="mt-4 font-[family-name:var(--font-display)] text-[17px] md:text-[19px] uppercase leading-[1.25] tracking-[var(--tracking-display)] text-[var(--color-burgundy)]">
          {card.headline}
        </h3>

        <p className="mt-3 text-[14px] leading-[1.6] text-[var(--color-burgundy)]/90">
          {card.quote}
        </p>
      </div>

      {/* Client Avatar & Name */}
      <div className="mt-6 flex items-center gap-3 pt-4 border-t border-[var(--color-burgundy)]/15">
        {card.avatarSrc ? (
          <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border border-[var(--color-burgundy)]/20 bg-[var(--color-burgundy)]/10">
            <Image
              src={card.avatarSrc}
              alt=""
              fill
              sizes="40px"
              className="object-cover object-center"
            />
          </div>
        ) : (
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--color-burgundy)] text-[var(--color-cream)] font-[family-name:var(--font-mono)] text-[12px] font-bold">
            {card.author ? card.author.replace(/[^a-zA-Z]/g, "").slice(0, 2).toUpperCase() || "★" : "★"}
          </div>
        )}
        <div>
          <p className="font-[family-name:var(--font-body)] text-[14px] font-bold text-[var(--color-burgundy)]">
            {card.author}
          </p>
          <p className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[var(--tracking-nav)] text-[var(--color-burgundy)]/75">
            {card.clientType}
          </p>
        </div>
      </div>
    </Card>
  );
}

