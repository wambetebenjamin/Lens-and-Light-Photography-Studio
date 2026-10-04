"use client";

import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { whatsappLink } from "@/lib/data/site";

export default function WhatsAppFloat() {
  const [hover, setHover] = useState(false);

  return (
    <div className="fixed bottom-5 right-5 md:bottom-7 md:right-7 z-[90] flex items-center gap-3">
      <span
        role="tooltip"
        className={`hidden sm:block bg-ink text-white text-small px-4 py-2 whitespace-nowrap transition-all duration-hover ease-refined ${
          hover ? "opacity-100 translate-x-0" : "opacity-0 translate-x-2 pointer-events-none"
        }`}
      >
        Ask about a session or check availability
      </span>
      <a
        href={whatsappLink()}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        aria-label="Ask about a session or check availability on WhatsApp"
        className="relative w-14 h-14 rounded-full bg-whatsapp text-white flex items-center justify-center shadow-md transition-transform duration-hover ease-refined hover:scale-105"
      >
        <span className="absolute inset-0 rounded-full bg-whatsapp animate-whatsapp-pulse motion-reduce:hidden" />
        <MessageCircle className="w-7 h-7 relative" strokeWidth={1.75} fill="currentColor" />
      </a>
    </div>
  );
}
