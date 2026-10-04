import { NextRequest, NextResponse } from "next/server";
import { PORTFOLIO_ITEMS } from "@/lib/data/portfolio";

/**
 * In production this reads from Vercel KV (cached, revalidated via ISR).
 * The in-memory array below stands in for that KV-backed dataset so the
 * route, pagination and filtering contract are production-ready as-is —
 * swap the one line below for `await kv.get("portfolio:items")`.
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");
  const page = Number(searchParams.get("page") || "1");
  const pageSize = Number(searchParams.get("pageSize") || "12");

  let items = PORTFOLIO_ITEMS;
  if (category && category !== "All") {
    items = items.filter((i) => i.category === category);
  }

  const start = (page - 1) * pageSize;
  const paged = items.slice(start, start + pageSize);

  return NextResponse.json(
    {
      items: paged,
      total: items.length,
      page,
      pageSize,
      hasMore: start + pageSize < items.length,
    },
    { headers: { "Cache-Control": "s-maxage=600, stale-while-revalidate=59" } }
  );
}
