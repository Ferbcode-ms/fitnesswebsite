import { EditorialHeading } from "@/components/ui/EditorialHeading";
import { ContactForm } from "@/components/forms/ContactForm";
import { siteConfig } from "@/config/site";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

interface ContactSectionProps {
  settings?: {
    coach_name?: string;
    contact_email?: string;
    phone_number?: string;
    location?: string;
  };
}

export function ContactSection({ settings }: ContactSectionProps = {}) {
  const coachName = settings?.coach_name || siteConfig.coachName;
  const contactEmail = settings?.contact_email || siteConfig.contactEmail;
  const phoneNumber = settings?.phone_number || siteConfig.phoneNumber;
  const location = settings?.location || siteConfig.location;

  return (
    <section className="relative w-full bg-[var(--color-burgundy)] text-[var(--color-blush)] overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[720px] lg:min-h-[860px] items-stretch">
        {/* Left Column: Portrait & Studio Info */}
        <div className="lg:col-span-5 relative flex flex-col justify-between p-8 sm:p-12 lg:p-16 bg-[var(--color-burgundy)]/90 border-b lg:border-b-0 lg:border-r border-[var(--color-blush)]/15">
          <div className="relative z-10">
            <span className="font-[family-name:var(--font-mono)] text-[12px] uppercase tracking-wider text-[var(--color-blush)]/75">
              Get In Touch
            </span>
            <h2 className="mt-2 font-[family-name:var(--font-display)] text-[28px] sm:text-[34px] uppercase tracking-[var(--tracking-display)] text-[var(--color-cream)]">
              {coachName} Fitness
            </h2>
            <p className="mt-2 text-[14px] leading-relaxed text-[var(--color-blush)]/85">
              Private coaching studio suite & global remote coaching headquarters.
            </p>

            {/* Quick Contact Cards */}
            <div className="mt-8 space-y-4">
              <div className="flex items-start gap-3.5 text-[14px]">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--color-blush)]/20 text-[var(--color-blush)]">
                  <Mail className="h-4 w-4" />
                </div>
                <div>
                  <span className="block font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-wider text-[var(--color-blush)]/60">
                    Email Enquiries
                  </span>
                  <a
                    href={`mailto:${contactEmail}`}
                    className="hover:underline text-[var(--color-cream)] font-medium"
                  >
                    {contactEmail}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5 text-[14px]">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--color-blush)]/20 text-[var(--color-blush)]">
                  <Phone className="h-4 w-4" />
                </div>
                <div>
                  <span className="block font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-wider text-[var(--color-blush)]/60">
                    Phone / Text
                  </span>
                  <a
                    href={`tel:${phoneNumber.replace(/[^0-9]/g, "")}`}
                    className="hover:underline text-[var(--color-cream)] font-medium"
                  >
                    {phoneNumber}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5 text-[14px]">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--color-blush)]/20 text-[var(--color-blush)]">
                  <MapPin className="h-4 w-4" />
                </div>
                <div>
                  <span className="block font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-wider text-[var(--color-blush)]/60">
                    Studio Location
                  </span>
                  <span className="text-[var(--color-cream)]">
                    {location}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3.5 text-[14px]">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--color-blush)]/20 text-[var(--color-blush)]">
                  <Clock className="h-4 w-4" />
                </div>
                <div>
                  <span className="block font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-wider text-[var(--color-blush)]/60">
                    Studio Hours
                  </span>
                  <span className="text-[var(--color-cream)]">
                    Monday – Saturday: 6:00 AM – 7:30 PM
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Form Container */}
        <div className="lg:col-span-7 flex flex-col justify-center px-6 sm:px-12 md:px-16 lg:px-20 py-16 lg:py-24">
          <div className="max-w-xl">
            <EditorialHeading
              as="h1"
              size="h1"
              className="text-[var(--color-blush)] leading-[0.98]"
            >
              LET&apos;S GET <em>in</em> TOUCH.
            </EditorialHeading>

            <p className="mt-4 text-[15px] md:text-[17px] leading-relaxed text-[var(--color-cream)]/85 mb-8">
              Whether you have questions about our 1-on-1 private coaching, membership availability, or general fitness questions, send us a message below.
            </p>

            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
