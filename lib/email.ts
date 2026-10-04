import nodemailer from "nodemailer";
import { SITE } from "@/lib/data/site";

interface BookingEmailInput {
  name: string;
  email: string;
  phone: string;
  sessionType: string;
  date: string;
  location: string;
  notes?: string;
}

function getTransport() {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) return null;
  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT || 587),
    secure: Number(SMTP_PORT) === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });
}

/**
 * Sends a booking confirmation email to the client.
 * Falls back to a console log when SMTP credentials are not configured
 * (e.g. in local/sandbox environments), so the booking flow never breaks —
 * it just doesn't dispatch real mail until SMTP_* env vars are set.
 */
export async function sendBookingConfirmationEmail(input: BookingEmailInput) {
  const transport = getTransport();
  const subject = `We've received your booking request — ${SITE.name}`;
  const html = `
    <div style="font-family: Poppins, Arial, sans-serif; color:#1d1d1d; max-width:560px; margin:auto;">
      <h2 style="letter-spacing:0.08em; text-transform:uppercase; font-weight:500;">${SITE.name}</h2>
      <p>Hi ${input.name},</p>
      <p>Thank you for your booking enquiry. Here's what we received:</p>
      <table style="width:100%; border-collapse:collapse; font-size:14px;">
        <tr><td style="padding:6px 0; color:#838383;">Session type</td><td style="padding:6px 0;">${input.sessionType}</td></tr>
        <tr><td style="padding:6px 0; color:#838383;">Preferred date</td><td style="padding:6px 0;">${input.date}</td></tr>
        <tr><td style="padding:6px 0; color:#838383;">Location</td><td style="padding:6px 0;">${input.location}</td></tr>
        <tr><td style="padding:6px 0; color:#838383;">Notes</td><td style="padding:6px 0;">${input.notes || "—"}</td></tr>
      </table>
      <p style="margin-top:24px;">Our team will confirm availability on WhatsApp or by phone within 24 hours.</p>
      <p>— The ${SITE.name} team<br/>${SITE.address}</p>
    </div>
  `;

  if (!transport) {
    console.log("[email:dev-fallback] Would send booking confirmation email", {
      to: input.email,
      subject,
    });
    return { delivered: false, reason: "SMTP not configured" };
  }

  await transport.sendMail({
    from: `"${SITE.name}" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
    to: input.email,
    subject,
    html,
  });
  return { delivered: true };
}
