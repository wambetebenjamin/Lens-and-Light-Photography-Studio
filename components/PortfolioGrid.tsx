"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import type { PortfolioItem } from "@/lib/data/portfolio";
import Lightbox from "@/components/Lightbox";

export default function PortfolioGrid({ items }: { items: PortfolioItem[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <>
      <div className="columns-2 md:columns-3 lg:columns-4 gap-4 md:gap-5">
        {items.map((item, i) => (
          <motion.button
            type="button"
            key={item.slug}
            onClick={() => setActiveIndex(i)}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{
              duration: 0.5,
              ease: [0.22, 1, 0.36, 1],
              delay: (i % 12) * 0.08,
            }}
            className="group relative block w-full mb-4 md:mb-5 break-inside-avoid overflow-hidden bg-surface-tint"
            aria-label={`Open ${item.title} in lightbox`}
          >
            <Image
              src={item.src}
              alt={item.title}
              width={item.width}
              height={item.height}
              sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
              className="w-full h-auto object-cover transition-transform duration-[600ms] ease-refined group-hover:scale-[1.04]"
            />
            <span className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-hover ease-refined" />
          </motion.button>
        ))}
      </div>

      <Lightbox
        items={items}
        index={activeIndex}
        onClose={() => setActiveIndex(null)}
        onNavigate={setActiveIndex}
      />
    </>
  );
}
