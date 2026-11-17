import { Container } from "@/components/ui/Container";
import { MarqueeBanner } from "@/components/ui/MarqueeBanner";
import { AppointmentRequestForm } from "@/components/forms/AppointmentRequestForm";
import { CalendarCheck, ShieldCheck, Clock3 } from "lucide-react";

export function AppointmentsBookingSection() {
  return (
    <section className="relative w-full overflow-hidden bg-[var(--color-cream)] text-[var(--color-burgundy)]">
      {/* Marquee Banner matching reference */}
      <div className="border-b border-[var(--color-burgundy)]/15">
        <MarqueeBanner
          text="CHOOSE YOUR SESSION BELOW"
          separator="/"
          theme="cream"
          repeat={4}
          ariaLabel="Choose your session below"
        />
      </div>

      <Container className="py-16 md:py-24">
        {/* Trust Badges */}
        <div className="mx-auto max-w-3xl mb-12 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div className="flex flex-col items-center p-4 rounded-[8px] bg-white/70 border border-[var(--color-burgundy)]/15">
            <Clock3 className="h-6 w-6 text-[var(--color-burgundy)]" />
            <span className="mt-2 font-[family-name:var(--font-mono)] text-[12px] uppercase font-bold text-[var(--color-burgundy)]">
              Flexible Scheduling
            </span>
            <span className="text-[12px] text-[var(--color-burgundy)]/75 mt-0.5">
              Morning & evening windows
            </span>
          </div>

          <div className="flex flex-col items-center p-4 rounded-[8px] bg-white/70 border border-[var(--color-burgundy)]/15">
            <CalendarCheck className="h-6 w-6 text-[var(--color-burgundy)]" />
            <span className="mt-2 font-[family-name:var(--font-mono)] text-[12px] uppercase font-bold text-[var(--color-burgundy)]">
              No Obligation
            </span>
            <span className="text-[12px] text-[var(--color-burgundy)]/75 mt-0.5">
              100% free discovery call
            </span>
          </div>

          <div className="flex flex-col items-center p-4 rounded-[8px] bg-white/70 border border-[var(--color-burgundy)]/15">
            <ShieldCheck className="h-6 w-6 text-[var(--color-burgundy)]" />
            <span className="mt-2 font-[family-name:var(--font-mono)] text-[12px] uppercase font-bold text-[var(--color-burgundy)]">
              Personalized Plan
            </span>
            <span className="text-[12px] text-[var(--color-burgundy)]/75 mt-0.5">
              Tailored to your body & baseline
            </span>
          </div>
        </div>

        {/* Interactive Booking Island */}
        <AppointmentRequestForm />

        {/* Integration notice */}
        <div className="mt-8 text-center text-[13px] text-[var(--color-burgundy)]/60 font-[family-name:var(--font-mono)]">
          Live calendar sync enabled &bull; Instant email confirmation delivered upon submission
        </div>
      </Container>
    </section>
  );
}

