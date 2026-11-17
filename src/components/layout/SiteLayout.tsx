"use client";

import { usePathname } from "next/navigation";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { SmoothScroll } from "./SmoothScroll";

interface SiteSettings {
  business_name?: string;
  coach_name?: string;
  tagline?: string;
  description?: string;
  contact_email?: string;
  phone_number?: string;
  location?: string;
  logo_url?: string | null;
  instagram_url?: string | null;
  facebook_url?: string | null;
  online_coaching_summary?: string;
  in_person_summary?: string;
  footer_text?: string | null;
}

interface SiteLayoutProps {
  children: React.ReactNode;
  settings?: SiteSettings;
}

export function SiteLayout({ children, settings }: SiteLayoutProps) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <SmoothScroll />
      <Header settings={settings} />
      <main
        id="main-content"
        className="flex-1 pt-[var(--header-height-desktop)]"
        suppressHydrationWarning
      >
        {children}
      </main>
      <Footer settings={settings} />
    </>
  );
}

