"use client";

import { useState } from "react";
import { Mail, Loader2 } from "lucide-react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || "Please try again.");
      setStatus("done");
      setMessage(data.message);
      setEmail("");
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Please try again.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <div className="flex items-center gap-2 border-b border-white/30 focus-within:border-white pb-2">
        <Mail className="w-4 h-4 text-white/60 shrink-0" strokeWidth={1.5} aria-hidden />
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@email.com"
          aria-label="Email address"
          className="bg-transparent flex-1 text-small text-white placeholder:text-white/40 outline-none py-1"
        />
        <button type="submit" disabled={status === "loading"} className="text-small uppercase tracking-wider3 text-white/80 hover:text-white shrink-0 disabled:opacity-50">
          {status === "loading" ? <Loader2 className="w-4 h-4 animate-spin" /> : "Subscribe"}
        </button>
      </div>
      {message && (
        <p className={`text-caption ${status === "error" ? "text-red-300" : "text-white/60"}`}>{message}</p>
      )}
    </form>
  );
}
