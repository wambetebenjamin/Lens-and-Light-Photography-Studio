"use client";

import { motion } from "framer-motion";
import { Calendar, Clock, Image as ImageIcon, CheckCircle } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { PACKAGES } from "@/lib/data/packages";
import { whatsappLink } from "@/lib/data/site";

function formatKES(amount: number) {
  return new Intl.NumberFormat("en-KE", {
    style: "currency",
    currency: "KES",
    maximumFractionDigits: 0,
  }).format(amount);
}

export default function PackagesSection() {
  return (
    <section id="packages" className="py-section px-5 md:px-10 bg-surface">
      <SectionHeading
        eyebrow="Investment"
        title="Packages For Every Occasion"
        description="Transparent pricing in Kenyan Shillings. Need something custom? Message us on WhatsApp and we'll build a package around your brief."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-0 max-w-5xl mx-auto md:items-center">
        {PACKAGES.map((pkg, i) => (
          <motion.div
            key={pkg.slug}
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 }}
            className={`relative flex flex-col gap-6 p-8 lg:p-10 border border-border-softer bg-surface ${
              pkg.featured
                ? "md:-my-6 md:py-14 border-ink shadow-lg z-10"
                : "md:mx-0"
            }`}
          >
            {pkg.featured && (
              <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-ink text-white text-caption uppercase tracking-wider3 px-4 py-1.5">
                Most Popular
              </span>
            )}
            <div>
              <h3 className="text-h3 font-medium">{pkg.name}</h3>
              <p className="text-small text-body mt-1">{pkg.sessionType}</p>
            </div>

            <p className="text-h2 font-medium text-ink">{formatKES(pkg.priceKES)}</p>

            <ul className="flex flex-col gap-3 text-small text-body">
              <li className="flex items-start gap-2">
                <Clock className="w-4 h-4 mt-0.5 shrink-0 text-ink" strokeWidth={1.5} aria-hidden />
                {pkg.duration}
              </li>
              <li className="flex items-start gap-2">
                <ImageIcon className="w-4 h-4 mt-0.5 shrink-0 text-ink" strokeWidth={1.5} aria-hidden />
                {pkg.editedPhotos}
              </li>
              <li className="flex items-start gap-2">
                <Calendar className="w-4 h-4 mt-0.5 shrink-0 text-ink" strokeWidth={1.5} aria-hidden />
                {pkg.turnaround}
              </li>
              {pkg.notes && (
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-0.5 shrink-0 text-ink" strokeWidth={1.5} aria-hidden />
                  {pkg.notes}
                </li>
              )}
            </ul>

            <a
              href={whatsappLink(
                `Hi! I'd like to book the ${pkg.name} package (${formatKES(pkg.priceKES)}) with Lens and Light.`
              )}
              target="_blank"
              rel="noopener noreferrer"
              className={pkg.featured ? "btn-studio mt-auto" : "btn-studio-outline mt-auto"}
            >
              Book This Package
            </a>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
