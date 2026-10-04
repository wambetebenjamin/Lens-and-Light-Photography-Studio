"use client";

import { useEffect, useCallback } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import type { PortfolioItem } from "@/lib/data/portfolio";

interface LightboxProps {
  items: PortfolioItem[];
  index: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export default function Lightbox({ items, index, onClose, onNavigate }: LightboxProps) {
  const isOpen = index !== null;
  const current = isOpen ? items[index] : null;

  const goNext = useCallback(() => {
    if (index === null) return;
    onNavigate((index + 1) % items.length);
  }, [index, items.length, onNavigate]);

  const goPrev = useCallback(() => {
    if (index === null) return;
    onNavigate((index - 1 + items.length) % items.length);
  }, [index, items.length, onNavigate]);

  useEffect(() => {
    if (!isOpen) return;
    document.documentElement.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, onClose, goNext, goPrev]);

  return (
    <AnimatePresence>
      {isOpen && current && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[300] bg-black/95 flex items-center justify-center p-0 sm:p-10"
          role="dialog"
          aria-modal="true"
          aria-label={current.title}
          onClick={onClose}
        >
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 text-white/80 hover:text-white z-10 p-2"
          >
            <X className="w-7 h-7" strokeWidth={1.25} />
          </button>

          <button
            type="button"
            aria-label="Previous image"
            onClick={(e) => {
              e.stopPropagation();
              goPrev();
            }}
            className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 text-white/70 hover:text-white z-10 p-2"
          >
            <ChevronLeft className="w-8 h-8" strokeWidth={1.25} />
          </button>

          <motion.div
            key={current.slug}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full h-full sm:w-auto sm:h-auto sm:max-w-[88vw] sm:max-h-[86vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={current.src}
              alt={current.title}
              width={current.width}
              height={current.height}
              sizes="90vw"
              className="w-full h-full sm:w-auto sm:h-auto object-contain max-h-[100svh] sm:max-h-[86vh]"
            />
          </motion.div>

          <button
            type="button"
            aria-label="Next image"
            onClick={(e) => {
              e.stopPropagation();
              goNext();
            }}
            className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 text-white/70 hover:text-white z-10 p-2"
          >
            <ChevronRight className="w-8 h-8" strokeWidth={1.25} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
