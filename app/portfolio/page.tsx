import type { Metadata } from "next";
import PortfolioPageClient from "@/components/sections/PortfolioPageClient";

export const revalidate = 600;

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Browse the full Lens & Light Photography Studio portfolio — portraits, weddings, events, commercial, fine art and behind-the-scenes photography from Nairobi, Kenya.",
  openGraph: {
    title: "Portfolio | Lens & Light Photography Studio",
    description:
      "Browse the full Lens & Light Photography Studio portfolio — portraits, weddings, events, commercial, fine art and behind-the-scenes photography from Nairobi, Kenya.",
    images: [{ url: "/images/portfolio/weddings-4.jpg", width: 500, height: 750 }],
  },
};

export default function PortfolioPage() {
  return <PortfolioPageClient />;
}
