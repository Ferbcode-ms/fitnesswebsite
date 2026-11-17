import { siteConfig } from "@/config/site";

interface JsonLdProps {
  type?: "website" | "service" | "breadcrumbs";
  breadcrumbs?: Array<{ name: string; item: string }>;
  serviceName?: string;
  serviceDescription?: string;
}

export function JsonLd({
  type = "website",
  breadcrumbs,
  serviceName,
  serviceDescription,
}: JsonLdProps) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";

  // Base Organization / SportsActivityLocation Schema (Uses authentic placeholders from siteConfig)
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "SportsActivityLocation",
    name: siteConfig.businessName,
    description: siteConfig.description,
    url: baseUrl,
    email: siteConfig.contactEmail,
    telephone: siteConfig.phoneNumber,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.location,
    },
    founder: {
      "@type": "Person",
      name: siteConfig.coachName,
      jobTitle: "Head Coach & Founder",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Women's Fitness Coaching Offerings",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Online 1-on-1 Fitness Coaching",
            description: "Personalized remote strength and progressive overload coaching.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "In-Person Personal Training",
            description: "Hands-on biomechanics and barbell technique in a private studio.",
          },
        },
      ],
    },
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.businessName,
    url: baseUrl,
    description: siteConfig.description,
  };

  if (type === "service" && serviceName) {
    const serviceSchema = {
      "@context": "https://schema.org",
      "@type": "Service",
      name: serviceName,
      description: serviceDescription ?? siteConfig.description,
      provider: {
        "@type": "SportsActivityLocation",
        name: siteConfig.businessName,
      },
      areaServed: ["Worldwide", "Local Studio"],
      serviceType: "Fitness & Strength Coaching",
    };

    return (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
    );
  }

  if (type === "breadcrumbs" && breadcrumbs) {
    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: breadcrumbs.map((crumb, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: crumb.name,
        item: `${baseUrl}${crumb.item}`,
      })),
    };

    return (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    );
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
}
