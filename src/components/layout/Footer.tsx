import Link from "next/link";
import { siteConfig } from "@/config/site";
import { navigationConfig } from "@/config/navigation";
import { Container } from "@/components/ui/Container";
import { EditorialHeading } from "@/components/ui/EditorialHeading";

interface FooterProps {
  settings?: {
    business_name?: string;
    coach_name?: string;
    location?: string;
    contact_email?: string;
    phone_number?: string;
    instagram_url?: string | null;
    facebook_url?: string | null;
    online_coaching_summary?: string;
    footer_text?: string | null;
  };
}

/**
 * Shared site footer recreating the reference:
 * - 3-column layout: Visual thumbnail strip, Explore links, Contact details.
 * - Deep Burgundy (#4A1C21) background with subtle blush divider.
 * - Full-bleed display wordmark in Lilita One.
 * - Honest social links and explicit placeholders.
 */
export function Footer({ settings }: FooterProps = {}) {
  const businessName = settings?.business_name || siteConfig.businessName;
  const coachName = settings?.coach_name || siteConfig.coachName;
  const location = settings?.location || siteConfig.location;
  const contactEmail = settings?.contact_email || siteConfig.contactEmail;
  const phoneNumber = settings?.phone_number || siteConfig.phoneNumber;
  const instagramUrl = settings?.instagram_url !== undefined ? settings.instagram_url : siteConfig.social.instagramUrl;
  const facebookUrl = settings?.facebook_url !== undefined ? settings.facebook_url : siteConfig.social.facebookUrl;
  const onlineSummary = settings?.online_coaching_summary || siteConfig.availability.onlineCoachingSummary;
  const footerText = settings?.footer_text || `\u00A9 ${new Date().getFullYear()} ${businessName}. All rights reserved.`;

  return (
    <footer className="border-t border-[var(--color-blush)]/20 bg-[var(--color-burgundy)] pt-16 pb-10 text-[var(--color-blush)]">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12 pb-14 border-b border-[var(--color-blush)]/20">
          {/* Column 1: Brand & Visual Preview Strip */}
          <div className="flex flex-col gap-4">
            <EditorialHeading as="h4" size="h4" className="text-[var(--color-blush)]">
              <span suppressHydrationWarning>{businessName}</span>
            </EditorialHeading>

            <p className="text-[14px] leading-[1.5] text-[var(--color-cream)]">
              {onlineSummary}
            </p>

            {/* Social Icons / Links */}
            <div className="flex items-center gap-3 pt-1 font-[family-name:var(--font-mono)] text-[13px] tracking-[var(--tracking-nav)]">
              {instagramUrl ? (
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-opacity duration-100 hover:opacity-80 underline underline-offset-4"
                >
                  Instagram
                </a>
              ) : (
                <span className="opacity-60 cursor-default" title="Instagram profile coming soon">
                  Instagram (TBA)
                </span>
              )}
              <span className="opacity-40">/</span>
              {facebookUrl ? (
                <a
                  href={facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-opacity duration-100 hover:opacity-80 underline underline-offset-4"
                >
                  Facebook
                </a>
              ) : (
                <span className="opacity-60 cursor-default" title="Facebook page coming soon">
                  Facebook (TBA)
                </span>
              )}
            </div>
          </div>

          {/* Column 2: Explore Navigation */}
          <div className="flex flex-col gap-3">
            <EditorialHeading as="h4" size="h4" className="text-[var(--color-blush)]">
              Explore
            </EditorialHeading>
            <ul className="flex flex-col gap-2 font-[family-name:var(--font-mono)] text-[14px] uppercase tracking-[var(--tracking-nav)] text-[var(--color-cream)]">
              {navigationConfig.footerNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="transition-opacity duration-100 hover:opacity-80 hover:underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-[var(--color-blush)] rounded-sm"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href={navigationConfig.bookingCta.href}
                  className="transition-opacity duration-100 hover:opacity-80 hover:underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-[var(--color-blush)] rounded-sm"
                >
                  {navigationConfig.bookingCta.label}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact & Coach Details */}
          <div className="flex flex-col gap-3">
            <EditorialHeading as="h4" size="h4" className="text-[var(--color-blush)]">
              Contact
            </EditorialHeading>
            <ul className="flex flex-col gap-2 text-[14px] leading-[1.6] text-[var(--color-cream)]">
              <li>
                <span className="font-medium text-[var(--color-blush)]">Coach:</span>{" "}
                {coachName}
              </li>
              <li>
                <span className="font-medium text-[var(--color-blush)]">Location:</span>{" "}
                {location}
              </li>
              <li>
                <span className="font-medium text-[var(--color-blush)]">Email:</span>{" "}
                <a
                  href={`mailto:${contactEmail}`}
                  className="hover:underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-[var(--color-blush)] rounded-sm"
                >
                  {contactEmail}
                </a>
              </li>
              <li>
                <span className="font-medium text-[var(--color-blush)]">Phone:</span>{" "}
                <a
                  href={`tel:${phoneNumber.replace(/[^0-9]/g, "")}`}
                  className="hover:underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-[var(--color-blush)] rounded-sm"
                >
                  {phoneNumber}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Full-Bleed Wordmark & Copyright */}
        <div className="pt-10 flex flex-col items-center text-center gap-4">
          <p
            suppressHydrationWarning
            className="font-[family-name:var(--font-display)] text-[length:var(--text-footer-wordmark-size)] leading-[0.95] uppercase tracking-[var(--tracking-display)] text-[var(--color-blush)] select-none"
          >
            {businessName}
          </p>
          <p
            suppressHydrationWarning
            className="font-[family-name:var(--font-mono)] text-[12px] uppercase tracking-[var(--tracking-nav)] text-[var(--color-blush)]/70"
          >
            {footerText}
          </p>
        </div>
      </Container>
    </footer>
  );
}
