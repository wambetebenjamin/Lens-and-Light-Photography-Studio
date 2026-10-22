"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import AnimatedHeadline from "@/components/AnimatedHeadline";
import HeroAperture from "@/components/HeroAperture";
import HeroSlideshow from "@/components/HeroSlideshow";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-ink"
    >
      <HeroSlideshow>
        {/*
          Bottom-left editorial block. The photographs are framed so their
          subjects sit in the upper two-thirds and the scrim darkens the lower
          third, which keeps this type crisp on every single slide.
        */}
        <div className="relative z-10 h-full flex flex-col justify-end text-left px-5 sm:px-8 md:px-10 pb-24 md:pb-28">
          <div className="max-w-[min(100%,860px)]">
            <p className="section-heading-eyebrow text-white/95 mb-4 md:mb-5 [text-shadow:0_1px_14px_rgba(0,0,0,0.9)]">
              Nairobi, Kenya — Photography &amp; Videography
            </p>
            <AnimatedHeadline
              text="We Capture Moments That Last."
              className="text-white font-medium leading-[1.1] text-[34px] xs:text-[38px] sm:text-[46px] md:text-[58px] lg:text-[68px] xl:text-[76px] tracking-tight text-balance [text-shadow:0_2px_30px_rgba(0,0,0,0.85),0_1px_3px_rgba(0,0,0,0.6)]"
            />
            <p className="hidden sm:block mt-5 max-w-xl text-white/90 text-body leading-relaxed [text-shadow:0_1px_18px_rgba(0,0,0,0.95)]">
              Weddings, portraits, brands and events — photographed across
              Kenya with a calm, editorial eye.
            </p>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <a
                href="#portfolio"
                className="btn-studio-outline mt-8 md:mt-9 border-white bg-black/25 text-white backdrop-blur-[2px] hover:bg-white hover:text-ink"
              >
                See Our Work
              </a>
            </motion.div>
          </div>
        </div>

        <motion.a
          href="#portfolio"
          aria-label="Scroll to portfolio"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.6 }}
          className="hidden md:flex absolute bottom-9 right-10 z-10 text-white/85 hover:text-white transition-colors duration-hover animate-bounce-slow"
        >
          <ChevronDown className="w-6 h-6" strokeWidth={1.25} />
        </motion.a>
      </HeroSlideshow>

      <HeroAperture />
    </section>
  );
}
