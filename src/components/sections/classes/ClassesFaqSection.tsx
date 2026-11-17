import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { EditorialHeading } from "@/components/ui/EditorialHeading";
import { FaqAccordion, FaqItem } from "@/components/ui/FaqAccordion";

const faqItems: FaqItem[] = [
  {
    id: "faq-1",
    question: "I'VE NEVER LIFTED WEIGHTS BEFORE. ARE THESE PROGRAMMES SUITABLE FOR BEGINNERS?",
    answer:
      "Yes, absolutely. Over 60% of our clients begin with zero formal strength training experience. Every movement is regressed to your current baseline, and we prioritize joint safety, proper bracing, and barbell/dumbbell mechanics before adding load.",
  },
  {
    id: "faq-2",
    question: "WHAT IS THE DIFFERENCE BETWEEN ONLINE COACHING AND IN-PERSON TRAINING?",
    answer:
      "In-person training takes place in our private studio suite with hands-on coaching, tactile cues, and instant feedback. Online coaching delivers your customized programming through our dedicated app with weekly video form reviews, metrics check-ins, and daily WhatsApp messaging.",
  },
  {
    id: "faq-3",
    question: "HOW MANY DAYS PER WEEK DO I NEED TO COMMIT TO SEE RESULTS?",
    answer:
      "Most of our clients achieve outstanding body recomposition and strength gains with 3 to 4 focused 45-minute training sessions per week. We build schedules around your real life, not an unrealistic gym marathon.",
  },
  {
    id: "faq-4",
    question: "DO YOU PROVIDE MEAL PLANS OR RESTRICTIVE DIETS?",
    answer:
      "No restrictive diets or rigid meal plans that leave you feeling deprived. We teach flexible nutrition, protein optimization, and sustainable eating habits that fit family dinners, dining out, and your favourite treats.",
  },
  {
    id: "faq-5",
    question: "WHAT HAPPENS IF I TRAVEL OR GET BUSY WITH WORK?",
    answer:
      "Your coaching travels with you! For online clients, workouts adapt seamlessly for hotel gyms or bodyweight/band routines. For in-person clients, sessions can be rescheduled or transitioned to remote check-ins so you never lose momentum.",
  },
];

interface ClassesFaqSectionProps {
  badge?: string;
  heading?: string;
  subtext?: string;
  imageSrc?: string;
  faqs?: FaqItem[];
}

function formatHeading(text: string) {
  if (/\banswers\.?\b/i.test(text)) {
    const parts = text.split(/\banswers\.?\b/i);
    return (
      <>
        {parts[0]}<em>answers.</em>{parts.slice(1).join("answers.")}
      </>
    );
  }
  return text;
}

export function ClassesFaqSection({
  badge = "Got Questions?",
  heading = "QUESTIONS? answers.",
  subtext = "Everything you need to know about our women's strength programmes, membership options, and coaching standards.",
  imageSrc = "/images/callout-equipment.jpg",
  faqs = faqItems,
}: ClassesFaqSectionProps = {}) {
  const displayFaqs = faqs && faqs.length > 0 ? faqs : faqItems;

  return (
    <section className="relative w-full bg-white text-[var(--color-burgundy)] py-16 md:py-24 border-t border-[var(--color-burgundy)]/15">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Heading & Side Photo */}
          <div className="lg:col-span-5 space-y-6">
            <span className="font-[family-name:var(--font-mono)] text-[12px] md:text-[13px] uppercase tracking-wider text-[var(--color-burgundy)]/75">
              {badge}
            </span>
            <EditorialHeading
              as="h2"
              size="h2"
              className="text-[var(--color-burgundy)] leading-[1.05]"
            >
              {formatHeading(heading)}
            </EditorialHeading>
            <p className="text-[15px] md:text-[17px] leading-relaxed text-[var(--color-burgundy)]/85">
              {subtext}
            </p>

            <div className="relative h-[280px] sm:h-[340px] w-full rounded-[10px] overflow-hidden border border-[var(--color-burgundy)]/20 shadow-sm mt-6">
              <Image
                src={imageSrc || "/images/callout-equipment.jpg"}
                alt="Strength coaching equipment and kettlebells"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
          </div>

          {/* Right Column: FAQ Accordion */}
          <div className="lg:col-span-7">
            <FaqAccordion items={displayFaqs} defaultOpenId={displayFaqs[0]?.id || "faq-1"} />
          </div>
        </div>
      </Container>
    </section>
  );
}

