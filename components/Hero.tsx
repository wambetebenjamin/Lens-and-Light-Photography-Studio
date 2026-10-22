"use client";

import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import AnimatedHeadline from "@/components/AnimatedHeadline";
import HeroAperture from "@/components/HeroAperture";
import HeroSlideshow from "@/components/HeroSlideshow";
import { whatsappLink } from "@/lib/data/site";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-ink"
    >
      <HeroSlideshow>
        {/*
          Bottom-left editorial block. The photographs are framed so their
          subjects sit in the upper half, and the scrim system darkens the
          lower corner plus the top band — which keeps this type crisp on
          every slide of the rotation.
        */}
        <div className="relative z-10 flex h-full w-full flex-col justify-end px-5 pb-20 text-left sm:px-8 md:px-10 md:pb-24">
          <div className="max-w-[min(100%,1000px)]">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.05 }}
              className="mb-5 flex items-center gap-3 md:mb-6 md:gap-4"
            >
              <span aria-hidden className="h-px w-8 shrink-0 bg-white/70 md:w-12" />
              <p className="section-heading-eyebrow text-white/95 [text-shadow:0_1px_14px_rgba(0,0,0,0.9)]">
                Nairobi, Kenya · Photography &amp; Videography
              </p>
            </motion.div>

            <AnimatedHeadline
              text="We Capture Moments That Last."
              emphasis={["Last."]}
              className="hero-title text-white"
            />

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.7, ease: EASE }}
              className="mt-5 hidden max-w-xl text-white/90 text-body leading-relaxed [text-shadow:0_1px_18px_rgba(0,0,0,0.95)] sm:block md:mt-6"
            >
              Weddings, portraits, brands and events. Photographed across
              Kenya with a calm, editorial eye.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.15, duration: 0.6, ease: EASE }}
              className="mt-7 flex flex-wrap items-center gap-3 md:mt-9 md:gap-4"
            >
              <a href="#portfolio" className="hero-btn hero-btn-solid">
                See Our Work
              </a>
              <span className="hidden sm:block">
                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hero-btn hero-btn-ghost"
                >
                  Book a Session
                  <ArrowRight
                    aria-hidden
                    className="hero-btn-arrow h-4 w-4"
                    strokeWidth={1.5}
                  />
                </a>
              </span>
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
