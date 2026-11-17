"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { EditorialHeading } from "@/components/ui/EditorialHeading";
import { Card } from "@/components/ui/Card";

/**
 * Section 1: Pain Points vs Outcomes Comparison Section
 * Background: Dusty Blush (#E9C9CF)
 * Features tactile offset cards (YOU'VE TRIED: in #F7EDE4 vs YOU WANT: in #4A1C21)
 * with multi-layered GSAP ScrollTrigger physics:
 * - Dimensional card deal entrance (asymmetric rotation + scale settle)
 * - Layered scroll parallax (differential card velocity)
 * - Sequential list item cascading reveals
 * - Organic idle breathing + scroll scrub on paper-cut stickers
 * - Spring-settling CTA conversion button
 */
interface ComparisonSectionProps {
  title?: string;
  enabled?: boolean;
}

export function ComparisonSection({ title, enabled = true }: ComparisonSectionProps = {}) {
  const sectionRef = useRef<HTMLElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const leftCardRef = useRef<HTMLDivElement>(null);
  const rightCardRef = useRef<HTMLDivElement>(null);
  const bottomCalloutRef = useRef<HTMLDivElement>(null);
  const ctaBtnRef = useRef<HTMLDivElement>(null);

  // Parallax sticker refs
  const dumbbellRef = useRef<HTMLDivElement>(null);
  const sneakerRef = useRef<HTMLDivElement>(null);
  const bandRef = useRef<HTMLDivElement>(null);
  const kettlebellRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        // ====================================================================
        // 1. Intro Section Reveal (Headline + Subcopy)
        // ====================================================================
        if (introRef.current) {
          const introChildren = introRef.current.children;
          gsap.from(introChildren, {
            scrollTrigger: {
              trigger: introRef.current,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
            y: 40,
            opacity: 0,
            stagger: 0.15,
            duration: 1,
            ease: "power3.out",
          });
        }

        // ====================================================================
        // 2. Dimensional Cards Deal Entrance (Asymmetric Rotation & Scale)
        // ====================================================================
        if (cardsContainerRef.current) {
          const cardTimeline = gsap.timeline({
            scrollTrigger: {
              trigger: cardsContainerRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          });

          // Left card enters with a gentle left tilt and settles to 0
          if (leftCardRef.current) {
            cardTimeline.from(
              leftCardRef.current,
              {
                x: -50,
                y: 65,
                rotation: -3.5,
                scale: 0.94,
                opacity: 0,
                duration: 1.1,
                ease: "power3.out",
              },
              0
            );

            // Left card list items cascade in
            const leftItems = leftCardRef.current.querySelectorAll("li");
            if (leftItems.length > 0) {
              cardTimeline.from(
                leftItems,
                {
                  opacity: 0,
                  x: -16,
                  stagger: 0.08,
                  duration: 0.5,
                  ease: "power2.out",
                },
                0.35
              );
            }
          }

          // Right card enters with a matching counter-tilt and settles
          if (rightCardRef.current) {
            cardTimeline.from(
              rightCardRef.current,
              {
                x: 50,
                y: 85,
                rotation: 3.5,
                scale: 0.94,
                opacity: 0,
                duration: 1.1,
                ease: "power3.out",
              },
              0.15
            );

            // Right card list items cascade in with checkmark highlight
            const rightItems = rightCardRef.current.querySelectorAll("li");
            if (rightItems.length > 0) {
              cardTimeline.from(
                rightItems,
                {
                  opacity: 0,
                  x: 16,
                  stagger: 0.08,
                  duration: 0.5,
                  ease: "power2.out",
                },
                0.5
              );
            }
          }

          // Differential Card Depth Scrub: Right card drifts slightly on scroll
          if (rightCardRef.current) {
            gsap.to(rightCardRef.current, {
              scrollTrigger: {
                trigger: cardsContainerRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.2,
              },
              y: -25,
              ease: "none",
            });
          }
        }

        // ====================================================================
        // 3. Multi-Layer Sticker Scroll Parallax & Organic Micro-Float
        // ====================================================================
        const stickers = [
          { ref: dumbbellRef, scrubY: -75, rot: 16, floatY: 10, floatRot: 3, dur: 3.2 },
          { ref: sneakerRef, scrubY: -55, rot: -14, floatY: 8, floatRot: -2.5, dur: 2.8 },
          { ref: bandRef, scrubY: -65, rot: 20, floatY: 9, floatRot: 3.5, dur: 3.5 },
          { ref: kettlebellRef, scrubY: -45, rot: -12, floatY: 7, floatRot: -2, dur: 2.6 },
        ];

        stickers.forEach(({ ref, scrubY, rot, floatY, floatRot, dur }) => {
          if (!ref.current) return;

          // Scroll-driven scrub parallax
          gsap.to(ref.current, {
            scrollTrigger: {
              trigger: ref.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.6,
            },
            y: scrubY,
            rotation: rot,
            ease: "none",
          });

          // Continuous organic idle breathing float
          gsap.to(ref.current, {
            y: `+=${floatY}`,
            rotation: `+=${floatRot}`,
            duration: dur,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });
        });

        // ====================================================================
        // 4. Bottom Callout & High-Converting CTA Spring Settle
        // ====================================================================
        if (bottomCalloutRef.current) {
          const calloutTl = gsap.timeline({
            scrollTrigger: {
              trigger: bottomCalloutRef.current,
              start: "top 86%",
              toggleActions: "play none none reverse",
            },
          });

          calloutTl.from(bottomCalloutRef.current.querySelectorAll("h2, p"), {
            y: 35,
            opacity: 0,
            stagger: 0.12,
            duration: 0.9,
            ease: "power3.out",
          });

          if (ctaBtnRef.current) {
            calloutTl.from(
              ctaBtnRef.current,
              {
                scale: 0.88,
                opacity: 0,
                duration: 0.8,
                ease: "back.out(1.8)",
              },
              "-=0.4"
            );
          }
        }
      }, sectionRef);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  if (!enabled) return null;

  return (
    <section
      ref={sectionRef}
      suppressHydrationWarning
      className="relative z-10 w-full overflow-hidden bg-[var(--color-blush)] text-[var(--color-burgundy)] rounded-t-[28px] md:rounded-t-[36px] pt-12 md:pt-20 pb-20 md:pb-28"
    >
      {/* Top-Right Decorative Dumbbell Sticker */}
      <div
        ref={dumbbellRef}
        aria-hidden="true"
        className="pointer-events-none absolute right-4 md:right-12 top-6 md:top-12 z-0 w-32 md:w-48 opacity-90"
      >
        <Image
          src="/images/sticker-dumbbell.svg"
          alt=""
          width={190}
          height={190}
          className="h-auto w-full drop-shadow-sm"
        />
      </div>

      <Container className="relative z-10">
        {/* Intro Centered Heading & Copy */}
        <div ref={introRef} className="mx-auto max-w-[680px] text-center">
          <EditorialHeading as="h2" size="h2" className="text-[var(--color-burgundy)]">
            {title ? (
              title
            ) : (
              <>TIRED OF WORKOUTS THAT <em>Don’t</em> WORK?</>
            )}
          </EditorialHeading>
          <p className="mt-4 md:mt-6 text-[16px] md:text-[17.456px] leading-[1.6] text-[var(--color-burgundy)]">
            We build strong bodies, sharp mindsets, and sustainable energy.
            Expect structured progressive strength training, lean muscle sculpting,
            science-backed nutrition, and that post-session glow you can&apos;t fake.
          </p>
        </div>

        {/* Comparison Cards Layout */}
        <div
          ref={cardsContainerRef}
          className="mt-14 md:mt-24 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center max-w-[1040px] mx-auto"
        >
          {/* Left Card: YOU'VE TRIED */}
          <div ref={leftCardRef} className="relative">
            {/* Sneaker sticker overlapping top-left of the card */}
            <div
              ref={sneakerRef}
              aria-hidden="true"
              className="pointer-events-none absolute -left-6 md:-left-12 -top-10 md:-top-14 z-20 w-24 md:w-36"
            >
              <Image
                src="/images/sticker-sneaker.svg"
                alt=""
                width={140}
                height={140}
                className="h-auto w-full"
              />
            </div>

            <Card
              theme="cream"
              radius="lg"
              className="relative z-10 p-8 md:p-10 border border-[var(--color-burgundy)]/10"
            >
              <h3 className="font-[family-name:var(--font-display)] text-[22px] md:text-[26px] uppercase tracking-[var(--tracking-display)] text-[var(--color-burgundy)]">
                YOU&apos;VE TRIED:
              </h3>
              <ul className="mt-6 flex flex-col gap-4 text-[15px] md:text-[17px] leading-[1.5] text-[var(--color-burgundy)]">
                <li className="flex items-start gap-3">
                  <span className="text-[var(--color-burgundy)] font-bold">•</span>
                  <span>Random gym routines with no clear plan or progression</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[var(--color-burgundy)] font-bold">•</span>
                  <span>Crash diets and quick-fix challenges that leave you drained</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[var(--color-burgundy)] font-bold">•</span>
                  <span>Feeling intimidated, overwhelmed, or bored in the free-weights area</span>
                </li>
              </ul>
            </Card>
          </div>

          {/* Right Card: YOU WANT */}
          <div ref={rightCardRef} className="relative md:translate-y-6">
            <Card
              theme="burgundy"
              radius="lg"
              className="relative z-10 p-8 md:p-10 shadow-xl"
            >
              <h3 className="font-[family-name:var(--font-display)] text-[22px] md:text-[26px] uppercase tracking-[var(--tracking-display)] text-[var(--color-blush)]">
                YOU WANT:
              </h3>
              <ul className="mt-6 flex flex-col gap-4 text-[15px] md:text-[17px] leading-[1.5] text-[var(--color-blush)]">
                <li className="flex items-start gap-3">
                  <span className="text-[var(--color-blush)] font-bold">✓</span>
                  <span>Visible muscle tone, functional strength &amp; metabolic vitality</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[var(--color-blush)] font-bold">✓</span>
                  <span>Custom workout programming that fits your real weekly schedule</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[var(--color-blush)] font-bold">✓</span>
                  <span>A coaching environment that feels empowering, supportive, and personal</span>
                </li>
              </ul>
            </Card>

            {/* Resistance Band / Plate sticker overlapping bottom-right of the card */}
            <div
              ref={bandRef}
              aria-hidden="true"
              className="pointer-events-none absolute -right-6 md:-right-10 -bottom-8 md:-bottom-12 z-20 w-24 md:w-36"
            >
              <Image
                src="/images/sticker-band.svg"
                alt=""
                width={140}
                height={140}
                className="h-auto w-full"
              />
            </div>
          </div>
        </div>

        {/* Bottom Callout & CTA */}
        <div ref={bottomCalloutRef} className="relative mt-20 md:mt-32 max-w-[760px] mx-auto text-center">
          {/* Flanking Kettlebell Sticker */}
          <div
            ref={kettlebellRef}
            aria-hidden="true"
            className="pointer-events-none absolute -left-8 md:-left-20 top-2 z-0 w-20 md:w-32 opacity-80"
          >
            <Image
              src="/images/sticker-kettlebell.svg"
              alt=""
              width={120}
              height={120}
              className="h-auto w-full"
            />
          </div>

          <EditorialHeading
            as="h2"
            size="h2"
            className="text-[var(--color-burgundy)]"
          >
            COACHING WAS BUILT for WOMEN WHO WANT RESULTS.
          </EditorialHeading>

          <p className="mt-4 text-[17px] md:text-[22.64px] font-medium leading-[1.4] text-[var(--color-burgundy)]">
            Personalised programming. Expert guidance. Maximum confidence.
          </p>

          <div ref={ctaBtnRef} className="mt-8">
            <Button
              href="/appointments"
              variant="primary"
              size="lg"
              className="font-[family-name:var(--font-display)] text-[16px] tracking-[var(--tracking-display)]"
            >
              Book Your Consultation
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}

