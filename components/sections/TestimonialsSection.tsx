"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Star } from "lucide-react";
import { TESTIMONIALS } from "@/lib/data/testimonials";

export default function TestimonialsSection() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => {
      setIndex((i) => (i + 1) % TESTIMONIALS.length);
    }, 5000);
    return () => clearInterval(t);
  }, [paused]);

  const current = TESTIMONIALS[index];

  return (
    <section
      className="py-section px-5 md:px-10 bg-ink text-white"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="max-w-3xl mx-auto text-center flex flex-col items-center gap-8 min-h-[340px] justify-center">
        <div className="flex gap-1 text-white" aria-hidden>
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="w-4 h-4" strokeWidth={1.25} fill="currentColor" />
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="flex flex-col items-center gap-6"
          >
            <p className="text-h3 sm:text-h2 font-medium italic text-balance leading-snug">
              &ldquo;{current.quote}&rdquo;
            </p>
            <div className="text-small uppercase tracking-wider3 text-white/60">
              <span className="text-white">{current.name}</span> — {current.shootType} · {current.date}
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="flex gap-2 mt-2" role="tablist" aria-label="Choose testimonial">
          {TESTIMONIALS.map((t, i) => (
            <button
              key={t.name}
              role="tab"
              aria-selected={i === index}
              aria-label={`Testimonial from ${t.name}`}
              onClick={() => setIndex(i)}
              className={`w-2 h-2 rounded-full transition-colors duration-hover ${
                i === index ? "bg-white" : "bg-white/30"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
