import Link from "next/link";
import { Instagram, Facebook, Twitter, MapPin, Clock, Mail, Camera } from "lucide-react";
import { SITE } from "@/lib/data/site";
import InstagramStrip from "@/components/InstagramStrip";
import NewsletterForm from "@/components/NewsletterForm";

export default function Footer() {
  return (
    <footer className="bg-ink text-white">
      <div className="py-16 px-5 md:px-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="flex flex-col gap-4 md:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <Camera className="w-5 h-5" strokeWidth={1.5} aria-hidden />
              <span className="font-medium tracking-wider2 uppercase text-[15px]">
                Lens<span className="font-light">&amp;</span>Light
              </span>
            </Link>
            <p className="text-small text-white/60 max-w-xs">{SITE.description}</p>
            <div className="flex items-center gap-4 mt-2">
              <a
                href={SITE.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 flex items-center justify-center border border-white/25 hover:bg-white hover:text-ink transition-colors duration-hover"
              >
                <Instagram className="w-4 h-4" strokeWidth={1.5} />
              </a>
              <a
                href={SITE.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-10 h-10 flex items-center justify-center border border-white/25 hover:bg-white hover:text-ink transition-colors duration-hover"
              >
                <Facebook className="w-4 h-4" strokeWidth={1.5} />
              </a>
              <a
                href={SITE.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter / X"
                className="w-10 h-10 flex items-center justify-center border border-white/25 hover:bg-white hover:text-ink transition-colors duration-hover"
              >
                <Twitter className="w-4 h-4" strokeWidth={1.5} />
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <p className="text-small uppercase tracking-wider3 text-white/50 mb-1">Studio</p>
            <div className="flex items-start gap-2 text-small text-white/80">
              <MapPin className="w-4 h-4 mt-0.5 shrink-0" strokeWidth={1.5} aria-hidden />
              <span>{SITE.address}</span>
            </div>
            <div className="flex items-start gap-2 text-small text-white/80">
              <Mail className="w-4 h-4 mt-0.5 shrink-0" strokeWidth={1.5} aria-hidden />
              <a href={`mailto:${SITE.email}`} className="hover:text-white">
                {SITE.email}
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <p className="text-small uppercase tracking-wider3 text-white/50 mb-1">Hours</p>
            {SITE.hours.map((h) => (
              <div key={h.day} className="flex items-start gap-2 text-small text-white/80">
                <Clock className="w-4 h-4 mt-0.5 shrink-0" strokeWidth={1.5} aria-hidden />
                <span>
                  {h.day}: {h.time}
                </span>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            <p className="text-small uppercase tracking-wider3 text-white/50 mb-1">
              Photography Tips &amp; Exclusive Sessions
            </p>
            <p className="text-small text-white/60 mb-1">Subscribe for occasional updates. No spam, ever.</p>
            <NewsletterForm />
          </div>
        </div>

        <div className="max-w-6xl mx-auto mb-10">
          <p className="text-small uppercase tracking-wider3 text-white/50 mb-4">@lensandlightstudio</p>
          <InstagramStrip />
        </div>

        <div className="max-w-6xl mx-auto pt-8 border-t border-white/15 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-caption text-white/50">
            © {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </p>
          <p className="text-caption text-white/50">Nairobi, Kenya</p>
        </div>
      </div>
    </footer>
  );
}
