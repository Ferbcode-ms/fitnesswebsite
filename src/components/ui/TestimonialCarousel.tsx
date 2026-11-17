"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CarouselSlide {
  id: string;
  quote: string;
  author: string;
  role: string;
  rating?: number;
  avatarUrl?: string;
}

export interface TestimonialCarouselProps {
  slides: CarouselSlide[];
  className?: string;
}

/**
 * Interactive testimonial slide carousel matching reference specs:
 * Smooth slide transition, prev/next circular arrow controls, and dot indicators.
 */
export function TestimonialCarousel({
  slides,
  className,
}: TestimonialCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const prev = () => {
    setActiveIndex((current) => (current === 0 ? slides.length - 1 : current - 1));
  };

  const next = () => {
    setActiveIndex((current) => (current === slides.length - 1 ? 0 : current + 1));
  };

  const current = slides[activeIndex];

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Client Testimonials Carousel"
      className={cn("relative w-full overflow-hidden", className)}
    >
      <div className="mx-auto max-w-4xl px-4 py-8 text-center">
        {/* Star Rating */}
        <div className="flex items-center justify-center gap-1.5 text-[var(--color-burgundy)]" aria-label="5 star rating">
          {Array.from({ length: current.rating ?? 5 }).map((_, i) => (
            <Star key={i} className="h-5 w-5 fill-[var(--color-burgundy)]" />
          ))}
        </div>

        {/* Big Quote Heading */}
        <div className="mt-8 min-h-[160px] md:min-h-[140px] flex items-center justify-center">
          <blockquote className="font-[family-name:var(--font-display)] text-[24px] sm:text-[32px] md:text-[40px] uppercase leading-[1.15] tracking-[var(--tracking-display)] text-[var(--color-burgundy)] max-w-3xl">
            &ldquo;{current.quote}&rdquo;
          </blockquote>
        </div>

        {/* Author Details with optional Avatar */}
        <div className="mt-6 flex flex-col items-center justify-center gap-2">
          {current.avatarUrl && (
            <div className="relative h-14 w-14 overflow-hidden rounded-full border-2 border-[var(--color-burgundy)]">
              <Image
                src={current.avatarUrl}
                alt={current.author}
                fill
                sizes="56px"
                className="object-cover"
              />
            </div>
          )}
          <div className="font-[family-name:var(--font-mono)] text-[15px] font-semibold tracking-wide text-[var(--color-burgundy)] uppercase">
            {current.author}
          </div>
          <div className="text-[13px] text-[var(--color-burgundy)]/75">
            {current.role}
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="mt-10 flex items-center justify-center gap-6">
          <button
            type="button"
            onClick={prev}
            aria-label="Previous testimonial"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--color-burgundy)] text-[var(--color-burgundy)] transition-colors hover:bg-[var(--color-burgundy)] hover:text-[var(--color-cream)] focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          {/* Dots */}
          <div className="flex items-center gap-2">
            {slides.map((slide, index) => (
              <button
                key={slide.id}
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={`Go to slide ${index + 1}`}
                aria-current={activeIndex === index}
                className={cn(
                  "h-2.5 rounded-full transition-all duration-200",
                  activeIndex === index
                    ? "w-8 bg-[var(--color-burgundy)]"
                    : "w-2.5 bg-[var(--color-burgundy)]/30 hover:bg-[var(--color-burgundy)]/50"
                )}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={next}
            aria-label="Next testimonial"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--color-burgundy)] text-[var(--color-burgundy)] transition-colors hover:bg-[var(--color-burgundy)] hover:text-[var(--color-cream)] focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

