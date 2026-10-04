import { NextRequest, NextResponse } from "next/server";
import { listAll, listAppend } from "@/lib/store";

interface Subscriber {
  email: string;
  subscribedAt: string;
}

export async function POST(req: NextRequest) {
  let body: { email?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const email = body.email?.trim().toLowerCase();
  if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
    return NextResponse.json({ ok: false, error: "Please enter a valid email address." }, { status: 422 });
  }

  const existing = await listAll<Subscriber>("newsletter");
  if (existing.some((s) => s.email === email)) {
    return NextResponse.json({ ok: true, message: "You're already subscribed!" });
  }

  await listAppend<Subscriber>("newsletter", { email, subscribedAt: new Date().toISOString() });

  return NextResponse.json({ ok: true, message: "Subscribed! Watch out for photography tips and exclusive sessions." });
}
