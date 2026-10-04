"use client";

import { useCallback, useEffect, useState } from "react";
import SectionHeading from "@/components/SectionHeading";
import PortfolioFilterTabs from "@/components/PortfolioFilterTabs";
import PortfolioGrid from "@/components/PortfolioGrid";
import { PORTFOLIO_CATEGORIES, type PortfolioItem } from "@/lib/data/portfolio";

const PAGE_SIZE = 9;

export default function PortfolioPageClient() {
  const [active, setActive] = useState<string>("All");
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(false);

  const load = useCallback(async (category: string, pageNum: number, replace: boolean) => {
    setLoading(true);
    try {
      const res = await fetch(
        `/api/portfolio?category=${encodeURIComponent(category)}&page=${pageNum}&pageSize=${PAGE_SIZE}`
      );
      const data = await res.json();
      setItems((prev) => (replace ? data.items : [...prev, ...data.items]));
      setHasMore(data.hasMore);
      setPage(pageNum);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load(active, 1, true);
  }, [active, load]);

  return (
    <section className="pt-section px-5 md:px-10 pb-section bg-surface">
      <SectionHeading
        eyebrow="Full Portfolio"
        title="Every Session, Every Story"
        description="Browse the complete archive of client sessions. Filter by category, or load more to keep exploring."
      />

      <PortfolioFilterTabs categories={PORTFOLIO_CATEGORIES} active={active} onChange={setActive} />

      <PortfolioGrid items={items} />

      <div className="flex justify-center mt-14">
        {hasMore ? (
          <button
            type="button"
            onClick={() => load(active, page + 1, false)}
            disabled={loading}
            className="btn-studio-outline disabled:opacity-50"
          >
            {loading ? "Loading…" : "Load More"}
          </button>
        ) : (
          !loading && items.length > 0 && (
            <p className="text-small uppercase tracking-wider3 text-muted">
              You&apos;ve reached the end of the gallery
            </p>
          )
        )}
      </div>
    </section>
  );
}
