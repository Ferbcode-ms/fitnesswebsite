export interface NavChildItem {
  label: string;
  href: string;
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavChildItem[];
}

export interface BookingCta {
  label: string;
  href: string;
}

export interface NavigationConfig {
  mainNav: NavItem[];
  bookingCta: BookingCta;
  footerNav: NavChildItem[];
}

export interface SocialLinks {
  instagramUrl: string | null;
  facebookUrl: string | null;
}

export interface CoachingAvailability {
  onlineCoachingAvailable: boolean;
  onlineCoachingSummary: string;
  inPersonTrainingAvailable: boolean;
  inPersonSummary: string;
}

export interface SiteConfig {
  businessName: string;
  coachName: string;
  tagline: string;
  description: string;
  contactEmail: string;
  phoneNumber: string;
  location: string;
  social: SocialLinks;
  availability: CoachingAvailability;
}

