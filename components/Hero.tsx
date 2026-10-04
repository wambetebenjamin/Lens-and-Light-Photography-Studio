"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import AnimatedHeadline from "@/components/AnimatedHeadline";
import HeroAperture from "@/components/HeroAperture";

const HERO_IMAGES = [
  {
    src: "/images/hero/hero-wedding.jpg",
    alt: "An East African couple sharing a joyful moment in their wedding portraits",
  },
  {
    src: "/images/hero/hero-portrait-maasai.jpg",
    alt: "A portrait captured during a cultural photography session in Kenya",
  },
  {
    src: "/images/portfolio/weddings-2.jpg",
    alt: "A joyful wedding celebration captured by Lens and Light",
  },
  {
    src: "/images/portfolio/fine-art-3.jpg",
    alt: "A golden-hour portrait from the Lens and Light portfolio",
  },
];

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();
  const [activeImage, setActiveImage] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);

  useEffect(() => {
    if (prefersReduced) return;
    const timer = window.setInterval(() => {
      setActiveImage((current) => (current + 1) % HERO_IMAGES.length);
    }, 5600);
    return () => window.clearInterval(timer);
  }, [prefersReduced]);

  return (
    <section ref={ref} id="hero" className="relative h-[100svh] min-h-[560px] w-full overflow-hidden bg-ink">
      <motion.div style={prefersReduced ? undefined : { y }} className="absolute inset-0 h-[130%] -top-[15%]">
        <AnimatePresence initial={false} mode="sync">
          <motion.div
            key={HERO_IMAGES[activeImage].src}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.015 }}
            transition={{ duration: 1.25, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <Image
              src={HERO_IMAGES[activeImage].src}
              alt={HERO_IMAGES[activeImage].alt}
              fill
              priority={activeImage === 0}
              quality={92}
              sizes="100vw"
              className="object-cover object-[center_25%]"
            />
          </motion.div>
        </AnimatePresence>
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-black/30" />
      <HeroAperture />

      <div className="hero-copy relative z-10 h-full flex flex-col items-center justify-end md:justify-center text-center px-5 pb-24 md:pb-0">
        <p className="section-heading-eyebrow !text-white/90 mb-5">Nairobi, Kenya — Photography &amp; Videography</p>
        <AnimatedHeadline
          text="We Capture Moments That Last."
          className="!text-white font-medium leading-tight max-w-4xl text-[36px] sm:text-[48px] md:text-display-sm lg:text-display tracking-tight text-balance"
        />
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.4, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
          <a href="#portfolio" className="btn-studio-outline mt-10 border-white !text-white hover:bg-white hover:!text-ink">
            See Our Work
          </a>
        </motion.div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2" aria-label="Hero image slides">
        {HERO_IMAGES.map((image, index) => (
          <button
            key={image.src}
            type="button"
            aria-label={`Show image ${index + 1}`}
            aria-current={activeImage === index}
            onClick={() => setActiveImage(index)}
            className={`h-px transition-all duration-500 ${activeImage === index ? "w-10 bg-white" : "w-5 bg-white/45 hover:bg-white/80"}`}
          />
        ))}
      </div>

      <motion.a href="#portfolio" aria-label="Scroll to portfolio" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8, duration: 0.6 }} className="hidden md:flex absolute bottom-8 right-8 z-10 text-white/80 hover:text-white transition-colors duration-hover animate-bounce-slow">
        <ChevronDown className="w-6 h-6" strokeWidth={1.25} />
      </motion.a>
    </section>
  );
}
