"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";
import PortfolioFilterTabs from "@/components/PortfolioFilterTabs";
import PortfolioGrid from "@/components/PortfolioGrid";
import { PORTFOLIO_ITEMS, PORTFOLIO_CATEGORIES } from "@/lib/data/portfolio";

const TEASER_LIMIT = 12;

export default function PortfolioSection() {
  const [active, setActive] = useState<string>("All");

  const items = useMemo(() => {
    const filtered =
      active === "All" ? PORTFOLIO_ITEMS : PORTFOLIO_ITEMS.filter((i) => i.category === active);
    return filtered.slice(0, TEASER_LIMIT);
  }, [active]);

  return (
    <section id="portfolio" className="py-section px-5 md:px-10 bg-surface">
      <SectionHeading
        eyebrow="Selected Work"
        title="A Portfolio Shaped By Light"
        description="A glimpse into recent sessions across portraits, weddings, events, brand work and fine art. Every photograph is unedited in story, carefully edited in craft."
      />

      <PortfolioFilterTabs categories={PORTFOLIO_CATEGORIES} active={active} onChange={setActive} />

      <PortfolioGrid items={items} />

      <div className="flex justify-center mt-14">
        <Link href="/portfolio" className="btn-studio-outline">
          View Full Portfolio
        </Link>
      </div>
    </section>
  );
}
