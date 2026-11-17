import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { EditorialHeading } from "@/components/ui/EditorialHeading";
import { siteConfig } from "@/config/site";
import { optimizeCloudinaryUrl } from "@/lib/utils";

interface CoachBioSectionProps {
  coachName?: string;
  bioTitle?: string;
  bioImage?: string;
}

/**
 * Section 5: Founder / Coach Bio Section
 * Background: Warm Cream (#F7EDE4)
 * Two-column editorial split introducing the female coach, credentials,
 * philosophy, and driving deeper brand discovery (/about).
 */
export function CoachBioSection({ coachName: customCoachName, bioTitle, bioImage }: CoachBioSectionProps = {}) {
  const coachName = customCoachName || siteConfig.coachName;
  const imageSrc = bioImage ? optimizeCloudinaryUrl(bioImage, { width: 800 }) || bioImage : null;

  return (
    <section className="relative w-full bg-[var(--color-cream)] py-16 md:py-24 text-[var(--color-burgundy)] border-t border-[var(--color-burgundy)]/10">
      <Container>
        <div className={imageSrc ? "grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-14 items-center" : "max-w-3xl mx-auto text-center flex flex-col items-center"}>
          {/* Left / Main Column: Bio Narrative & Philosophy */}
          <div className={imageSrc ? "lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left" : "flex flex-col items-center text-center"}>
            <EditorialHeading
              as="h2"
              size="h2"
              className="text-[var(--color-burgundy)]"
            >
              {bioTitle ? bioTitle : <>Meet <em>{coachName}</em></>}
            </EditorialHeading>

            <p className="mt-2 font-[family-name:var(--font-mono)] text-[13px] md:text-[14px] uppercase tracking-[var(--tracking-nav)] text-[var(--color-burgundy)]/80">
              FOUNDER &amp; HEAD COACH
            </p>

            <div className="mt-6 flex flex-col gap-4 text-[15px] md:text-[17px] leading-[1.65] text-[var(--color-burgundy)] max-w-[580px]">
              <p>
                Fitness should build you up, not break you down. I founded this coaching
                practice to cut through the noise of toxic crash diets, extreme cardio,
                and ineffective influencer routines that leave women feeling frustrated.
              </p>
              <p>
                My approach bridges science-based progressive resistance training with
                sustainable nutrition principles. Whether we work together online or in
                the private studio, my mission is to give you the guidance, technique,
                and confidence to feel genuinely strong.
              </p>
              <p>
                No intimidation. No guesswork. Just dedicated, compassionate coaching
                that meets you where you are and helps you build a physique and mindset
                you are proud of.
              </p>
            </div>

            <div className="mt-8">
              <Button
                href="/about"
                variant="primary"
                size="md"
                className="font-[family-name:var(--font-display)] tracking-[var(--tracking-display)]"
              >
                Learn More About Coaching
              </Button>
            </div>
          </div>

          {/* Optional Right Column: Editorial Coach Portrait */}
          {imageSrc && (
            <div className="lg:col-span-5 relative aspect-[3/4] w-full max-w-[460px] mx-auto overflow-hidden rounded-[var(--radius-card-md)] bg-[var(--color-burgundy)]/10 shadow-md">
              <Image
                src={imageSrc}
                alt={`${coachName} - Female Fitness Coach`}
                fill
                sizes="(max-width: 1024px) 100vw, 460px"
                className="object-cover object-center"
              />
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}

