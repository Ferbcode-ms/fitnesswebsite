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
  avatarSrc: string;
}

const defaultTestimonials: TestimonialCardData[] = [
  {
    theme: "white",
    headline: "“I FINALLY FEEL STRONG AND IN CONTROL”",
    quote:
      "Working 1-on-1 with my coach transformed my relationship with fitness. The progressive strength plans are challenging yet empowering, and I've never been more consistent.",
    author: "[Client Name Placeholder]",
    clientType: "Online Coaching Client",
    avatarSrc: "/images/avatar-1.jpg",
  },
  {
    theme: "blush",
    headline: "“THIS COACHING CHANGED MORE THAN JUST MY BODY.”",
    quote:
      "I used to feel intimidated in the weights section. Now, I lift with proper technique, my energy is through the roof, and I actually look forward to every training session.",
    author: "[Client Name Placeholder]",
    clientType: "Personal Training Client",
    avatarSrc: "/images/avatar-2.jpg",
  },
  {
    theme: "blush",
    headline: "“THE PROGRESSION IS REAL — AND SO ARE THE RESULTS.”",
    quote:
      "Having a structured blueprint and weekly form feedback made all the difference. No more guessing exercises or falling off track after three weeks.",
    author: "[Client Name Placeholder]",
    clientType: "1-on-1 Transformation Client",
    avatarSrc: "/images/avatar-3.jpg",
  },
  {
    theme: "cream",
    headline: "“THE ONLY PROGRAM I’VE EVER STAYED CONSISTENT WITH.”",
    quote:
      "She creates training routines that genuinely fit around a busy professional lifestyle. Sustainable nutrition guidance without restrictive dieting was the game changer.",
    author: "[Client Name Placeholder]",
    clientType: "Hybrid Coaching Client",
    avatarSrc: "/images/avatar-4.jpg",
  },
];

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
 * Asymmetric 5-card layout with 10px corner radii, star rating markers,
 * quote copy, and circular client avatars.
 */
export function TestimonialsBentoSection({ testimonials: customTestimonials }: TestimonialsBentoSectionProps = {}) {
  const themes: Array<"white" | "blush" | "blush" | "cream"> = ["white", "blush", "blush", "cream"];
  const displayCards: TestimonialCardData[] =
    customTestimonials && customTestimonials.length > 0
      ? customTestimonials.slice(0, 4).map((t, idx) => ({
          theme: themes[idx % themes.length],
          headline: `“${t.quote.slice(0, 48).trim().toUpperCase()}${t.quote.length > 48 ? "..." : ""}”`,
          quote: t.quote,
          author: t.client_name,
          clientType: t.client_role,
          avatarSrc: optimizeCloudinaryUrl(t.avatar_url, { width: 120, height: 120 }) || `/images/avatar-${(idx % 4) + 1}.jpg`,
        }))
      : defaultTestimonials;

  return (
    <section className="relative w-full bg-[var(--color-burgundy)] py-20 md:py-24 text-[var(--color-burgundy)]">
      <Container>
        {/* Top Row: Title Card (Sand) + 2 Testimonial Cards */}
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

          {/* Card 2: White Card */}
          <TestimonialCard card={displayCards[0] || defaultTestimonials[0]} className="md:col-span-3" />

          {/* Card 3: Blush Card */}
          <TestimonialCard card={displayCards[1] || defaultTestimonials[1]} className="md:col-span-4" />
        </div>

        {/* Bottom Row: 2 Wider Testimonial Cards */}
        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Card 4: Blush Card */}
          <TestimonialCard card={displayCards[2] || defaultTestimonials[2]} />

          {/* Card 5: Cream Card */}
          <TestimonialCard card={displayCards[3] || defaultTestimonials[3]} />
        </div>
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
        <div className="relative h-10 w-10 overflow-hidden rounded-full border border-[var(--color-burgundy)]/20 bg-[var(--color-burgundy)]/10">
          <Image
            src={card.avatarSrc}
            alt=""
            fill
            sizes="40px"
            className="object-cover object-center"
          />
        </div>
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

