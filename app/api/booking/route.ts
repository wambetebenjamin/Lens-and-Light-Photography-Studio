import { NextRequest, NextResponse } from "next/server";
import { listAppend } from "@/lib/store";
import { sendBookingConfirmationEmail } from "@/lib/email";
import { notifyStudioWhatsapp, buildBookingWhatsappMessage } from "@/lib/whatsapp";
import { whatsappLink } from "@/lib/data/site";

export interface BookingPayload {
  name: string;
  email: string;
  phone: string;
  sessionType: string;
  date: string;
  location: string;
  notes?: string;
}

function validate(body: Partial<BookingPayload>): string | null {
  if (!body.name || body.name.trim().length < 2) return "Please enter your full name.";
  if (!body.email || !/^\S+@\S+\.\S+$/.test(body.email)) return "Please enter a valid email address.";
  if (!body.phone || body.phone.trim().length < 7) return "Please enter a valid phone number.";
  if (!body.sessionType) return "Please choose a session type.";
  if (!body.date) return "Please choose a preferred date.";
  if (!body.location) return "Please tell us a location or studio preference.";
  return null;
}

export async function POST(req: NextRequest) {
  let body: Partial<BookingPayload>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  const error = validate(body);
  if (error) {
    return NextResponse.json({ ok: false, error }, { status: 422 });
  }

  const payload = body as BookingPayload;
  const record = { ...payload, createdAt: new Date().toISOString() };

  await listAppend("bookings", record);

  const [emailResult, whatsappResult] = await Promise.allSettled([
    sendBookingConfirmationEmail(payload),
    notifyStudioWhatsapp(payload),
  ]);

  return NextResponse.json({
    ok: true,
    message: "Booking enquiry received. We'll confirm shortly.",
    emailDelivered: emailResult.status === "fulfilled" ? emailResult.value.delivered : false,
    whatsappDelivered: whatsappResult.status === "fulfilled" ? whatsappResult.value.delivered : false,
    whatsappFallbackLink: whatsappLink(buildBookingWhatsappMessage(payload)),
  });
}
