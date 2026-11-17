import type { Metadata } from "next";
import { AppointmentsHeroSection } from "@/components/sections/appointments/AppointmentsHeroSection";
import { AppointmentsBookingSection } from "@/components/sections/appointments/AppointmentsBookingSection";
import { BottomSplitCtaSection } from "@/components/sections/home/BottomSplitCtaSection";
import { JsonLd } from "@/components/seo/JsonLd";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Schedule A Consultation or Session",
  description:
    "Request your complimentary 15-minute discovery consultation or reserve an in-person movement screen and personal training assessment.",
  alternates: {
    canonical: "/appointments",
  },
  openGraph: {
    title: "Schedule A Consultation | Women's Fitness Appointments",
    description:
      "Request your complimentary 15-minute consultation or reserve an in-person movement screen and personal training assessment.",
    url: "/appointments",
    images: [{ url: "/images/guide-left.jpg", width: 800, height: 600, alt: "Consultation and session booking" }],
  },
};

export default function AppointmentsPage() {
  return (
    <>
      <JsonLd
        type="breadcrumbs"
        breadcrumbs={[
          { name: "Home", item: "/" },
          { name: "Appointments", item: "/appointments" },
        ]}
      />
      <AppointmentsHeroSection />
      <AppointmentsBookingSection />
      <BottomSplitCtaSection />
    </>
  );
}
