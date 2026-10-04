"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import AnimatedHeadline from "@/components/AnimatedHeadline";
import HeroAperture from "@/components/HeroAperture";

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Parallax at 0.25 of scroll speed.
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);

  return (
    <section
      ref={ref}
      id="hero"
      className="relative h-[100svh] min-h-[560px] w-full overflow-hidden bg-ink"
    >
      <motion.div
        style={prefersReduced ? undefined : { y }}
        className="absolute inset-0 h-[130%] -top-[15%]"
      >
        <Image
          src="/images/hero/hero-wedding.jpg"
          alt="An East African couple sharing a joyful moment in their wedding portraits, photographed by Lens and Light Photography Studio"
          fill
          priority
          quality={92}
          sizes="100vw"
          className="object-cover object-[center_25%]"
        />
      </motion.div>

      {/* Minimal gradient for legibility only — the photograph is the hero. */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-black/25" />

      <HeroAperture />

      <div className="relative z-10 h-full flex flex-col items-center justify-end md:justify-center text-center px-5 pb-24 md:pb-0">
        <p className="section-heading-eyebrow text-white/80 mb-5">
          Nairobi, Kenya — Photography &amp; Videography
        </p>
        <AnimatedHeadline
          text="We Capture Moments That Last."
          className="text-white font-medium leading-tight max-w-4xl text-[36px] sm:text-[48px] md:text-display-sm lg:text-display tracking-tight text-balance"
        />
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <a
            href="#portfolio"
            className="btn-studio-outline mt-10 border-white text-white hover:bg-white hover:text-ink"
          >
            See Our Work
          </a>
        </motion.div>
      </div>

      <motion.a
        href="#portfolio"
        aria-label="Scroll to portfolio"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.6 }}
        className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-white/80 hover:text-white transition-colors duration-hover animate-bounce-slow"
      >
        <ChevronDown className="w-6 h-6" strokeWidth={1.25} />
      </motion.a>
    </section>
  );
}
