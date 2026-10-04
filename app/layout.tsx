import type { Metadata } from "next";
import "@fontsource/poppins/300.css";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import PageTransition from "@/components/PageTransition";
import { SITE } from "@/lib/data/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} | Photography & Videography in Nairobi, Kenya`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  keywords: [
    "Nairobi photographer",
    "Kenya wedding photography",
    "corporate headshots Nairobi",
    "event photography Nairobi",
    "product photography Kenya",
    "videography Nairobi",
  ],
  openGraph: {
    title: `${SITE.name} | Photography & Videography in Nairobi, Kenya`,
    description: SITE.description,
    url: SITE.url,
    siteName: SITE.name,
    images: [{ url: "/images/hero/hero-wedding.jpg", width: 1200, height: 1500 }],
    locale: "en_KE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} | Photography & Videography in Nairobi, Kenya`,
    description: SITE.description,
    images: ["/images/hero/hero-wedding.jpg"],
  },
};

function JsonLd() {
  const json = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["LocalBusiness", "Photographer"],
        "@id": `${SITE.url}/#business`,
        name: SITE.name,
        description: SITE.description,
        image: `${SITE.url}/images/hero/hero-wedding.jpg`,
        url: SITE.url,
        telephone: SITE.phone,
        email: SITE.email,
        priceRange: "KES 15,000 - KES 85,000+",
        address: {
          "@type": "PostalAddress",
          streetAddress: SITE.address,
          addressLocality: "Nairobi",
          addressCountry: "KE",
        },
        sameAs: Object.values(SITE.social),
      },
    ],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased bg-surface text-body">
        <JsonLd />
        <Navbar />
        <main>
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
