"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const ApertureScene = dynamic(() => import("@/components/three/ApertureScene"), {
  ssr: false,
});

/**
 * Three.js camera-aperture iris, decorative, positioned behind the hero
 * text on the right side on desktop only. Pauses animation when out of
 * the viewport and is skipped entirely on mobile and for users who
 * prefer reduced motion.
 */
export default function HeroAperture() {
  const containerRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef(true);
  const [shouldMount, setShouldMount] = useState(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
    setShouldMount(isDesktop && !prefersReduced);
  }, []);

  useEffect(() => {
    if (!shouldMount || !containerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        activeRef.current = entry.isIntersecting && !document.hidden;
      },
      { threshold: 0.05 }
    );
    observer.observe(containerRef.current);
    const onVisibility = () => {
      if (document.hidden) activeRef.current = false;
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [shouldMount]);

  if (!shouldMount) return null;

  return (
    <div
      ref={containerRef}
      aria-hidden
      className="hidden lg:block absolute right-[2%] top-1/2 -translate-y-1/2 w-[46vw] h-[46vw] max-w-[720px] max-h-[720px] pointer-events-none z-[1]"
    >
      <ApertureScene activeRef={activeRef} />
    </div>
  );
}
