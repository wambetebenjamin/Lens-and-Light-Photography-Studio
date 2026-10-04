"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";
import { PRINT_PRODUCTS } from "@/lib/data/print-shop";
import { whatsappLink } from "@/lib/data/site";

export default function PrintShopSection() {
  return (
    <section className="py-section px-5 md:px-10 bg-surface">
      <SectionHeading
        eyebrow="Print Shop"
        title="Turn Your Photos Into Prints"
        description="Bring your favourite images into your home or office — framed, on canvas, or bound into a book you'll actually open."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {PRINT_PRODUCTS.map((product, i) => (
          <motion.div
            key={product.slug}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 }}
            className="flex flex-col gap-4 bg-surface-tint"
          >
            <div className="relative w-full h-64 overflow-hidden">
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="(min-width: 1024px) 33vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="flex flex-col gap-3 p-6">
              <h3 className="text-h5 font-medium">{product.name}</h3>
              <p className="text-small text-body">{product.description}</p>
              <p className="text-small text-ink font-medium">{product.priceFrom}</p>
              <a
                href={whatsappLink(`Hi! I'd like to order a ${product.name} print with Lens and Light.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-studio-outline w-fit mt-2"
              >
                Order via WhatsApp
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
