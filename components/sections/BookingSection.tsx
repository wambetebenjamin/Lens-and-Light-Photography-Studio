"use client";

import { useState } from "react";
import { Calendar, MapPin, Loader2, CheckCircle2 } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";

const SESSION_TYPES = [
  "Portrait Session",
  "Wedding Photography",
  "Corporate & Brand Photography",
  "Event Coverage",
  "Product Photography",
  "Videography & Reels",
  "Something Else",
];

type Status = "idle" | "submitting" | "success" | "error";

export default function BookingSection() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [whatsappFallback, setWhatsappFallback] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setError(null);

    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") || ""),
      email: String(data.get("email") || ""),
      phone: String(data.get("phone") || ""),
      sessionType: String(data.get("sessionType") || ""),
      date: String(data.get("date") || ""),
      location: String(data.get("location") || ""),
      notes: String(data.get("notes") || ""),
    };

    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await res.json();
      if (!res.ok || !result.ok) {
        throw new Error(result.error || "Something went wrong. Please try again.");
      }
      setStatus("success");
      setWhatsappFallback(result.whatsappFallbackLink || null);
      if (result.whatsappFallbackLink) {
        window.open(result.whatsappFallbackLink, "_blank", "noopener,noreferrer");
      }
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  return (
    <section id="booking" className="py-section px-5 md:px-10 bg-surface">
      <SectionHeading
        eyebrow="Let's Work Together"
        title="Book A Session"
        description="Tell us a little about what you have in mind. We'll confirm availability over WhatsApp or email within 24 hours."
      />

      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto flex flex-col gap-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Field label="Full Name" htmlFor="name">
            <input id="name" name="name" type="text" required className="form-input" placeholder="Jane Wanjiru" />
          </Field>
          <Field label="Email Address" htmlFor="email">
            <input id="email" name="email" type="email" required className="form-input" placeholder="jane@email.com" />
          </Field>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Field label="Phone Number" htmlFor="phone">
            <input id="phone" name="phone" type="tel" required className="form-input" placeholder="+254 7xx xxx xxx" />
          </Field>
          <Field label="Type of Session" htmlFor="sessionType">
            <select id="sessionType" name="sessionType" required className="form-input" defaultValue="">
              <option value="" disabled>
                Select a session type
              </option>
              {SESSION_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </Field>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Field label="Preferred Date" htmlFor="date" icon={<Calendar className="w-4 h-4" strokeWidth={1.5} />}>
            <input id="date" name="date" type="date" required className="form-input" />
          </Field>
          <Field label="Location or Studio Preference" htmlFor="location" icon={<MapPin className="w-4 h-4" strokeWidth={1.5} />}>
            <input id="location" name="location" type="text" required className="form-input" placeholder="Our Kilimani studio, or your venue" />
          </Field>
        </div>

        <Field label="Additional Notes" htmlFor="notes">
          <textarea id="notes" name="notes" rows={4} className="form-input resize-none" placeholder="Tell us about your vision, the number of people involved, or anything else we should know." />
        </Field>

        <button type="submit" disabled={status === "submitting"} className="btn-studio w-fit self-center mt-2 disabled:opacity-60">
          {status === "submitting" ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" /> Sending…
            </>
          ) : (
            "Submit Enquiry"
          )}
        </button>

        {status === "success" && (
          <p className="flex items-center justify-center gap-2 text-small text-ink text-center">
            <CheckCircle2 className="w-4 h-4 text-whatsapp" strokeWidth={1.5} />
            Thank you! We&apos;ve opened WhatsApp so you can send your enquiry directly, and a confirmation email is on its way.
          </p>
        )}
        {status === "error" && error && (
          <p className="text-small text-center text-red-600">{error}</p>
        )}
        {status === "success" && whatsappFallback && (
          <p className="text-caption text-center text-muted">
            WhatsApp didn&apos;t open automatically?{" "}
            <a href={whatsappFallback} target="_blank" rel="noopener noreferrer" className="underline">
              Tap here
            </a>
            .
          </p>
        )}
      </form>
    </section>
  );
}

function Field({
  label,
  htmlFor,
  icon,
  children,
}: {
  label: string;
  htmlFor: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={htmlFor} className="text-small uppercase tracking-wider3 text-ink flex items-center gap-2">
        {icon}
        {label}
      </label>
      {children}
    </div>
  );
}
