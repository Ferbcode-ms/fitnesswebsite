import Image from "next/image";
import { EditorialHeading } from "@/components/ui/EditorialHeading";

export function AppointmentsHeroSection() {
  return (
    <section className="relative w-full overflow-hidden bg-[var(--color-blush)] text-[var(--color-burgundy)] py-16 md:py-24 border-b border-[var(--color-burgundy)]/15">
      <div className="max-w-[1500px] mx-auto px-6 sm:px-12 lg:px-16 text-center">
        <span className="inline-block rounded-full bg-[var(--color-burgundy)] px-4 py-1.5 font-[family-name:var(--font-mono)] text-[12px] uppercase tracking-wider text-[var(--color-blush)]">
          Online & In-Person Bookings
        </span>

        <EditorialHeading
          as="h1"
          size="h1"
          className="mt-6 text-[var(--color-burgundy)] leading-[0.98] max-w-4xl mx-auto"
        >
          YOUR strongest <em>self</em> STARTS HERE.
        </EditorialHeading>

        <p className="mt-6 text-[17px] md:text-[20px] leading-relaxed text-[var(--color-burgundy)]/90 max-w-2xl mx-auto">
          Schedule your complimentary consultation or reserve a 1-on-1 personal training assessment with our head coaching team.
        </p>

        {/* Centered Editorial Visual Badge */}
        <div className="mt-10 mx-auto max-w-md relative h-[220px] sm:h-[260px] rounded-[10px] overflow-hidden border border-[var(--color-burgundy)]/20 shadow-md">
          <Image
            src="/images/guide-left.jpg"
            alt="Female fitness coach ready for consultation"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 440px"
            className="object-cover object-center"
          />
        </div>
      </div>
    </section>
  );
}

