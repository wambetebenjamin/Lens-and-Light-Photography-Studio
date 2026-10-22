"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

export type HeroSlide = {
  /** Image path inside /public */
  src: string;
  alt: string;
  /** CSS object-position tuned per photograph so faces are never cropped. */
  position: string;
  /** ~20px inline preview so the photograph resolves softly instead of popping. */
  blurDataURL: string;
};

export const HERO_SLIDES: HeroSlide[] = [
  {
    src: "/images/hero/slide-01-wedding.jpg",
    blurDataURL:
      "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAUAA0DASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwCC1gYPukVCnBDF9vGPSmS6XNKRJGqSIemGHFNs5EkAWVdrBiAV6j2/Kty1jijtYwryKpJI2nrk1PKJSsrnP2mDfbCAV83ofrWjrE0iXKhG2jb0HFFFaS+FHPI//9k=",
    alt: "A bride and groom embracing beneath a flowering bougainvillea on their wedding day in Nairobi",
    position: "50% 34%",
  },
  {
    src: "/images/hero/slide-02-culture.jpg",
    blurDataURL:
      "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAANABQDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDIaTzLUxxM21ssxY8cckVdjjC2BePaqheuPvZpBbxvEMKAB2xUkS7yEGFVR0ArFSW508hn2ySmEfv3x9BRV65URylUwB9KKz5maKEbH//Z",
    alt: "Portrait of a Samburu woman in layered beaded regalia, northern Kenya",
    position: "58% 28%",
  },
  {
    src: "/images/hero/slide-03-couples.jpg",
    blurDataURL:
      "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAUAA0DASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwCq+rRBikcbxlvmk8vv6fzrOkdFPzhixJJNXbaELp9xdKoysqKob1A//VUEsKPh/MTDZPQ1k5WE6fu8yLxAHhcgf3t345rIZiQO3HY4oopvoP8A5d/M/9k=",
    alt: "A couple laughing together in a lush garden during a pre-wedding portrait session",
    position: "50% 21%",
  },
  {
    src: "/images/hero/slide-04-portrait.jpg",
    blurDataURL:
      "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAUAA0DASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwCe7vZLcII9rMecZ+9x2qE63Pn5bYAe7Vi+fIZEYkkKeMU5p5GclH2D0wKhyHYqiRsHmoTI3rRRUok//9k=",
    alt: "Fashion portrait of a woman in Maasai-inspired beaded dress holding a white parasol in golden-hour light",
    position: "50% 24%",
  },
  {
    src: "/images/hero/slide-05-golden-hour.jpg",
    blurDataURL:
      "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAUAA0DASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwBNV1COxl8lIvNl272GcBR71aiWO4iWWEhkYZBFcdqF6b+9e5aMIXAyoOe2KmtNYurO3EETDYCSM+9TYDPpaKKoD//Z",
    alt: "Silhouette of a couple facing each other against a warm sunset sky",
    position: "50% 40%",
  },
];

const SLIDE_DURATION = 6500; // ms each photograph stays on screen

type Props = {
  /** Foreground content (headline, CTA) rendered above the legibility scrims. */
  children: React.ReactNode;
};

export default function HeroSlideshow({ children }: Props) {
  const prefersReduced = useReducedMotion();
  const [active, setActive] = useState(0);
  const [mountedThrough, setMountedThrough] = useState(2);
  const [cycle, setCycle] = useState(0);
  const [hoverPaused, setHoverPaused] = useState(false);
  const [hidden, setHidden] = useState(false);
  const regionRef = useRef<HTMLDivElement>(null);
  const paused = hoverPaused || hidden;

  const { scrollYProgress } = useScroll({
    target: regionRef,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "6.5%"]);

  const goTo = useCallback((index: number) => {
    setActive(((index % HERO_SLIDES.length) + HERO_SLIDES.length) % HERO_SLIDES.length);
  }, []);

  // Load two photographs ahead rather than downloading all five up front.
  useEffect(() => {
    setMountedThrough((current) => Math.max(current, Math.min(active + 2, HERO_SLIDES.length - 1)));
  }, [active]);

  // Autoplay. Disabled entirely for users who prefer reduced motion.
  useEffect(() => {
    if (prefersReduced || paused) return;
    const timer = window.setTimeout(
      () => setActive((current) => (current + 1) % HERO_SLIDES.length),
      SLIDE_DURATION
    );
    return () => window.clearTimeout(timer);
  }, [active, paused, prefersReduced]);

  // Every time the autoplay clock (re)starts, restart the matching progress bar
  // so the indicator and the timer can never drift apart.
  useEffect(() => {
    if (prefersReduced) return;
    setCycle((current) => current + 1);
  }, [active, paused, prefersReduced]);

  // Stop rotating while the tab is in the background.
  useEffect(() => {
    const onVisibility = () => setHidden(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  return (
    <div
      ref={regionRef}
      className="absolute inset-0"
      onMouseEnter={() => setHoverPaused(true)}
      onMouseLeave={() => setHoverPaused(false)}
    >
      {/* Photographs — stacked and cross-faded, each with a slow Ken Burns push. */}
      <motion.div
        style={prefersReduced ? undefined : { y }}
        className="absolute inset-x-0 -top-[8%] h-[116%] overflow-hidden"
      >
        {HERO_SLIDES.map((slide, index) => {
          const isActive = index === active;
          if (index > mountedThrough) return null;
          return (
            <div
              key={slide.src}
              aria-hidden={!isActive}
              className={`absolute inset-0 transition-opacity duration-[1400ms] ease-[cubic-bezier(0.33,1,0.68,1)] will-change-[opacity] ${
                isActive ? "opacity-100" : "opacity-0"
              }`}
            >
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                priority={index === 0}
                loading={index === 0 ? "eager" : "lazy"}
                sizes="100vw"
                quality={88}
                placeholder="blur"
                blurDataURL={slide.blurDataURL}
                style={{ objectPosition: slide.position }}
                className={`object-cover select-none ${
                  isActive && !prefersReduced ? "animate-hero-ken-burns" : ""
                }`}
              />
            </div>
          );
        })}
      </motion.div>

      {/*
        Legibility system — stacked, deliberately gentle layers so the headline
        stays crisp on every photograph without flattening the image:
        1. an even veil that holds contrast on bright skies and white dresses
        2. a top-down gradient so the navigation stays readable
        3. a bottom-weighted gradient behind the headline and CTA
      */}
      <div aria-hidden className="absolute inset-0 hero-scrim-veil" />
      <div aria-hidden className="absolute inset-0 hero-scrim-top" />
      {/* The bottom third carries the headline — this is what keeps white type
          legible over a white wedding dress or a blown-out sky. */}
      <div aria-hidden className="absolute inset-0 hero-scrim-bottom" />

      {children}

      {/* Slide indicators — thin editorial rules, in the template's language. */}
      <div className="absolute z-20 left-1/2 -translate-x-1/2 md:left-10 md:translate-x-0 bottom-6 md:bottom-9 flex items-center gap-4">
        <span className="hidden sm:block text-white/85 text-caption tabular-nums tracking-wider3">
          {String(active + 1).padStart(2, "0")}
          <span className="text-white/45"> / {String(HERO_SLIDES.length).padStart(2, "0")}</span>
        </span>
        <div className="flex items-center gap-2" role="group" aria-label="Hero photographs">
          {HERO_SLIDES.map((slide, index) => {
            const isActive = index === active;
            return (
              <button
                key={slide.src}
                type="button"
                aria-label={`Show photograph ${index + 1} of ${HERO_SLIDES.length}`}
                aria-current={isActive ? "true" : undefined}
                onClick={() => goTo(index)}
                className="group relative h-6 w-10 md:w-14 flex items-center cursor-pointer"
              >
                <span
                  className={`relative block h-[2px] w-full overflow-hidden transition-colors duration-hover ${
                    isActive ? "bg-white/30" : "bg-white/35 group-hover:bg-white/75"
                  }`}
                >
                  {isActive && (
                    <span
                      key={`${active}-${cycle}-${prefersReduced}`}
                      className="absolute inset-y-0 left-0 block bg-white"
                      style={{
                        animation: prefersReduced
                          ? undefined
                          : `hero-slide-progress ${SLIDE_DURATION}ms linear forwards`,
                        animationPlayState: paused ? "paused" : "running",
                        width: prefersReduced ? "100%" : undefined,
                      }}
                    />
                  )}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
