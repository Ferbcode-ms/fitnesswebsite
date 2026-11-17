import type { Metadata, Viewport } from "next";
import {
  La_Belle_Aurore,
  Lilita_One,
  Roboto,
  Sometype_Mono,
} from "next/font/google";
import { siteConfig } from "@/config/site";
import { getSiteSettings } from "@/lib/cms/queries";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { JsonLd } from "@/components/seo/JsonLd";
import "./globals.css";

const lilitaOne = Lilita_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-lilita-one",
  display: "swap",
});

const sometypeMono = Sometype_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-sometype-mono",
  display: "swap",
});

const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-roboto",
  display: "swap",
});

const laBelleAurore = La_Belle_Aurore({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-la-belle-aurore",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";

export const viewport: Viewport = {
  themeColor: "#4A1C21",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteConfig.businessName} | Women's Fitness Coaching`,
    template: `%s | ${siteConfig.businessName}`,
  },
  description: siteConfig.description,
  keywords: [
    "Women's fitness coaching",
    "female personal trainer",
    "online fitness coaching",
    "in-person personal training",
    "female strength coach",
    "progressive overload",
    "body recomposition for women",
  ],
  authors: [{ name: siteConfig.coachName }],
  creator: siteConfig.coachName,
  publisher: siteConfig.businessName,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: siteConfig.businessName,
    title: `${siteConfig.businessName} | Women's Fitness Coaching`,
    description: siteConfig.description,
    images: [
      {
        url: "/images/hero-bg.jpg",
        width: 1200,
        height: 630,
        alt: `${siteConfig.businessName} - Strength & Fitness Coaching Studio`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.businessName} | Women's Fitness Coaching`,
    description: siteConfig.description,
    images: ["/images/hero-bg.jpg"],
    creator: `@${siteConfig.coachName.replace(/\s+/g, "").toLowerCase()}`,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSiteSettings();

  return (
    <html
      lang="en"
      className={`${lilitaOne.variable} ${sometypeMono.variable} ${roboto.variable} ${laBelleAurore.variable} no-scrollbar`}
    >
      <head>
        <link rel="preconnect" href="https://res.cloudinary.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
        <JsonLd type="website" />
        <style
          dangerouslySetInnerHTML={{
            __html: `
              html, body, * {
                scrollbar-width: none !important;
                -ms-overflow-style: none !important;
              }
              *::-webkit-scrollbar, html::-webkit-scrollbar, body::-webkit-scrollbar {
                display: none !important;
                width: 0 !important;
                height: 0 !important;
                background: transparent !important;
              }
            `,
          }}
        />
      </head>
      <body className="flex min-h-screen flex-col no-scrollbar">
        <SiteLayout settings={settings}>{children}</SiteLayout>
      </body>
    </html>
  );
}
