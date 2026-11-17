import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { MarqueeBanner } from "@/components/ui/MarqueeBanner";
import { EditorialHeading } from "@/components/ui/EditorialHeading";
import { optimizeCloudinaryUrl } from "@/lib/utils";

interface AboutProblemSectionProps {
  heading?: string;
  text?: string;
  image1Src?: string;
  image2Src?: string;
}

export function AboutProblemSection({
  heading,
  text,
  image1Src = "/images/service-collage-1.jpg",
  image2Src = "/images/test-coach.jpg",
}: AboutProblemSectionProps = {}) {
  return (
    <section className="relative w-full overflow-hidden bg-[var(--color-burgundy)] text-[var(--color-blush)]">
      {/* Marquee Banner */}
      <div className="border-b border-[var(--color-blush)]/15">
        <MarqueeBanner
          text="THE PROBLEM WE SAW"
          separator="/"
          theme="burgundy"
          repeat={4}
          ariaLabel="The problem we saw in the fitness industry"
        />
      </div>

      <Container className="py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text */}
          <div className="lg:col-span-6 space-y-6">
            <span className="font-[family-name:var(--font-mono)] text-[12px] md:text-[13px] uppercase tracking-wider text-[var(--color-blush)]/70">
              Why Traditional Fitness Fails Women
            </span>

            <EditorialHeading
              as="h2"
              size="h2"
              className="text-[var(--color-blush)] leading-[1.05]"
            >
              {heading ? heading : <>STOP SHRINKING. <em>start</em> BUILDING.</>}
            </EditorialHeading>

            <div className="space-y-4 text-[16px] md:text-[17px] leading-[1.6] text-[var(--color-blush)]/85">
              {text ? (
                <p>{text}</p>
              ) : (
                <>
                  <p>
                    For decades, the fitness industry told women that the only measure of success was shrinking themselves. We were given light pink dumbbells, endless calorie deprivation, and confusing routines that led straight to burnout.
                  </p>
                  <p>
                    We built this coaching practice to change the standard. When women train with progressive overload, prioritize protein, and learn compound movement mechanics, they don&apos;t just get strong—they feel unstoppable.
                  </p>
                </>
              )}
            </div>
          </div>

          {/* Right Duo Collage */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            <div className="relative h-[280px] sm:h-[360px] rounded-[10px] overflow-hidden border border-[var(--color-blush)]/20 shadow-md">
              <Image
                src={optimizeCloudinaryUrl(image1Src, { width: 600 }) || "/images/service-collage-1.jpg"}
                alt="Women kettlebell and barbell strength training"
                fill
                sizes="(max-width: 1024px) 50vw, 25vw"
                className="object-cover"
              />
            </div>
            <div className="relative h-[280px] sm:h-[360px] rounded-[10px] overflow-hidden border border-[var(--color-blush)]/20 shadow-md mt-6">
              <Image
                src={optimizeCloudinaryUrl(image2Src, { width: 600 }) || "/images/test-coach.jpg"}
                alt="Female fitness coach guiding proper movement form"
                fill
                sizes="(max-width: 1024px) 50vw, 25vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

