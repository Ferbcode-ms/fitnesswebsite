import type { SiteConfig } from "@/types";

/**
 * Centralized site configuration for the women's fitness coaching business.
 * Unprovided coach, location, pricing, and contact details use explicit placeholders
 * and must not be replaced with invented claims.
 */
export const siteConfig: SiteConfig = {
  businessName: "heatheririving",
  coachName: "Heather Irving",
  tagline: "Women's Strength & Conditioning",
  description:
    "Personalised women's fitness coaching offering both online fitness coaching and in-person personal training to build strength, fitness, and confidence.",
  contactEmail: "coach@fitness.com",
  phoneNumber: "+1 (555) 234-5678",
  location: "Private Studio & Online Global",
  social: {
    instagramUrl: null,
    facebookUrl: null,
  },
  availability: {
    onlineCoachingAvailable: true,
    onlineCoachingSummary:
      "Accepting applications for 1:1 online coaching clients worldwide.",
    inPersonTrainingAvailable: true,
    inPersonSummary:
      "Limited private 1:1 coaching slots available in our boutique facility.",
  },
};

