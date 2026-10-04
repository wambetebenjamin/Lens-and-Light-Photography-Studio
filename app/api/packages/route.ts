import { NextResponse } from "next/server";
import { PACKAGES } from "@/lib/data/packages";

export async function GET() {
  return NextResponse.json(
    { packages: PACKAGES },
    { headers: { "Cache-Control": "s-maxage=600, stale-while-revalidate=59" } }
  );
}
