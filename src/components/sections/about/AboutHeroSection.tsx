import Image from "next/image";
import { EditorialHeading } from "@/components/ui/EditorialHeading";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/config/site";
import { optimizeCloudinaryUrl } from "@/lib/utils";

interface AboutHeroSectionProps {
  headline?: string;
  subheadline?: string;
  imageSrc?: string;
  coachName?: string;
}

export function AboutHeroSection({ headline, subheadline, imageSrc: customImage, coachName }: AboutHeroSectionProps = {}) {
  const currentCoachName = coachName || siteConfig.coachName;
  const currentImage = customImage ? optimizeCloudinaryUrl(customImage, { width: 1000 }) || customImage : null;

  return (
    <section className="relative w-full overflow-hidden bg-[var(--color-blush)] text-[var(--color-burgundy)]">
      {currentImage ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[640px] lg:min-h-[780px] items-stretch">
          {/* Left Column: Portrait */}
          <div className="lg:col-span-5 relative min-h-[420px] lg:min-h-full w-full bg-[var(--color-burgundy)]/15">
            <Image
              src={currentImage}
              alt="Coach portrait"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 42vw"
              className="object-cover object-top"
            />
          </div>

          {/* Right Column: Hero Copy & CTA */}
          <div className="lg:col-span-7 flex flex-col justify-center px-6 sm:px-12 md:px-16 lg:px-20 py-16 lg:py-24">
            <div className="max-w-xl">
              <span className="font-[family-name:var(--font-mono)] text-[13px] md:text-[14px] uppercase tracking-wider text-[var(--color-burgundy)]/75">
                Meet {currentCoachName} &bull; Head Coach & Founder
              </span>

              <EditorialHeading
                as="h2"
                size="h2"
                className="mt-4 text-[var(--color-burgundy)] leading-[0.98]"
              >
                {headline ? headline : <>WE TRAIN TO <em>be</em> STRONGER.</>}
              </EditorialHeading>

              <div className="mt-6 space-y-4 text-[16px] md:text-[18px] leading-[1.6] text-[var(--color-burgundy)]/90">
                {subheadline ? (
                  <p>{subheadline}</p>
                ) : (
                  <>
                    <p>
                      Fitness for women shouldn&apos;t be built on restrictive diets, endless cardio, or feeling intimidated in the weights room.
                    </p>
                    <p>
                      As a certified strength and conditioning coach, I help women build progressive strength, optimize their metabolism, and master their movement with science-backed, empowering coaching.
                    </p>
                  </>
                )}
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Button
                  href="/appointments"
                  variant="primary"
                  size="lg"
                  className="font-[family-name:var(--font-display)] text-[16px] tracking-[var(--tracking-display)] cursor-pointer"
                >
                  Book A Consultation
                </Button>
                <Button
                  href="/services"
                  variant="secondary"
                  size="lg"
                  className="font-[family-name:var(--font-display)] text-[16px] tracking-[var(--tracking-display)] cursor-pointer"
                >
                  Explore Services
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="max-w-3xl mx-auto px-6 sm:px-12 py-20 lg:py-28 text-center flex flex-col items-center">
          <span className="font-[family-name:var(--font-mono)] text-[13px] md:text-[14px] uppercase tracking-wider text-[var(--color-burgundy)]/75">
            Meet {currentCoachName} &bull; Head Coach & Founder
          </span>

          <EditorialHeading
            as="h2"
            size="h2"
            className="mt-4 text-[var(--color-burgundy)] leading-[0.98]"
          >
            {headline ? headline : <>WE TRAIN TO <em>be</em> STRONGER.</>}
          </EditorialHeading>

          <div className="mt-6 space-y-4 text-[16px] md:text-[18px] leading-[1.6] text-[var(--color-burgundy)]/90">
            {subheadline ? (
              <p>{subheadline}</p>
            ) : (
              <>
                <p>
                  Fitness for women shouldn&apos;t be built on restrictive diets, endless cardio, or feeling intimidated in the weights room.
                </p>
                <p>
                  As a certified strength and conditioning coach, I help women build progressive strength, optimize their metabolism, and master their movement with science-backed, empowering coaching.
                </p>
              </>
            )}
          </div>

          <div className="mt-8 flex flex-wrap justify-center items-center gap-4">
            <Button
              href="/appointments"
              variant="primary"
              size="lg"
              className="font-[family-name:var(--font-display)] text-[16px] tracking-[var(--tracking-display)] cursor-pointer"
            >
              Book A Consultation
            </Button>
            <Button
              href="/services"
              variant="secondary"
              size="lg"
              className="font-[family-name:var(--font-display)] text-[16px] tracking-[var(--tracking-display)] cursor-pointer"
            >
              Explore Services
            </Button>
          </div>
        </div>
      )}
    </section>
  );
}

