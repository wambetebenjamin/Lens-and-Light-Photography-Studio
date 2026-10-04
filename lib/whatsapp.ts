import { SITE } from "@/lib/data/site";

interface BookingWhatsappInput {
  name: string;
  phone: string;
  sessionType: string;
  date: string;
  location: string;
  notes?: string;
}

export function buildBookingWhatsappMessage(input: BookingWhatsappInput) {
  return [
    `New booking enquiry — ${SITE.name}`,
    `Name: ${input.name}`,
    `Phone: ${input.phone}`,
    `Session: ${input.sessionType}`,
    `Preferred date: ${input.date}`,
    `Location: ${input.location}`,
    input.notes ? `Notes: ${input.notes}` : null,
  ]
    .filter(Boolean)
    .join("\n");
}

/**
 * Attempts to notify the studio's WhatsApp number via the WhatsApp Cloud
 * API when credentials are configured (WHATSAPP_TOKEN, WHATSAPP_PHONE_ID).
 * Without credentials this is a no-op — the booking form already opens a
 * pre-filled wa.me link client-side as the primary, zero-config
 * notification path to +254112272061.
 */
export async function notifyStudioWhatsapp(input: BookingWhatsappInput) {
  const { WHATSAPP_TOKEN, WHATSAPP_PHONE_ID } = process.env;
  if (!WHATSAPP_TOKEN || !WHATSAPP_PHONE_ID) {
    console.log("[whatsapp:dev-fallback] Would notify studio WhatsApp", {
      to: SITE.whatsappNumber,
      message: buildBookingWhatsappMessage(input),
    });
    return { delivered: false, reason: "WhatsApp Cloud API not configured" };
  }

  const res = await fetch(
    `https://graph.facebook.com/v19.0/${WHATSAPP_PHONE_ID}/messages`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${WHATSAPP_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        to: SITE.whatsappNumber,
        type: "text",
        text: { body: buildBookingWhatsappMessage(input) },
      }),
    }
  );

  return { delivered: res.ok };
}
