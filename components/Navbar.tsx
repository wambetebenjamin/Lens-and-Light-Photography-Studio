"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Camera, Menu, X } from "lucide-react";
import { NAV_LEFT, NAV_RIGHT, SITE, whatsappLink } from "@/lib/data/site";

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 shrink-0" aria-label={`${SITE.name} home`}>
      <Camera className="w-5 h-5" strokeWidth={1.5} aria-hidden />
      <span className="font-medium tracking-wider2 text-[15px] md:text-[17px] uppercase whitespace-nowrap">
        Lens<span className="font-light">&amp;</span>Light
      </span>
    </Link>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.documentElement.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [menuOpen]);

  const isDarkHero = pathname === "/" && !scrolled;

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-[100] h-[72px] lg:h-[96px] transition-all duration-hover ease-refined ${
          scrolled ? "bg-surface/95 backdrop-blur shadow-sm" : "bg-transparent"
        }`}
      >
        <nav
          className={`container-max h-full flex items-center justify-between px-5 md:px-10 ${
            isDarkHero ? "text-white" : "text-ink"
          }`}
        >
          <div className="hidden lg:flex items-center gap-1 flex-1">
            {NAV_LEFT.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-nav uppercase tracking-wider3 px-4 py-2 transition-colors duration-hover ${
                  isDarkHero ? "text-white/90 hover:text-white" : "text-ink/80 hover:text-ink"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex-1 lg:flex-none flex justify-start lg:justify-center">
            <Logo />
          </div>

          <div className="hidden lg:flex items-center gap-1 flex-1 justify-end">
            {NAV_RIGHT.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-nav uppercase tracking-wider3 px-4 py-2 transition-colors duration-hover ${
                  isDarkHero ? "text-white/90 hover:text-white" : "text-ink/80 hover:text-ink"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-studio ml-3"
              style={
                isDarkHero
                  ? { backgroundColor: "#fff", color: "var(--color-ink)", borderColor: "#fff" }
                  : undefined
              }
            >
              Book a Session
            </a>
          </div>

          <button
            type="button"
            aria-label="Open menu"
            className="lg:hidden p-2 -mr-2"
            onClick={() => setMenuOpen(true)}
          >
            <Menu className="w-6 h-6" strokeWidth={1.5} />
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[200] bg-ink text-white flex flex-col"
          >
            <div className="flex items-center justify-between px-5 h-[72px]">
              <span className="font-medium tracking-wider2 uppercase text-[15px]">
                Lens<span className="font-light">&amp;</span>Light
              </span>
              <button
                type="button"
                aria-label="Close menu"
                className="p-2 -mr-2"
                onClick={() => setMenuOpen(false)}
              >
                <X className="w-6 h-6" strokeWidth={1.5} />
              </button>
            </div>
            <nav className="flex-1 flex flex-col items-center justify-center gap-6">
              {[...NAV_LEFT, ...NAV_RIGHT].map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    href={item.href}
                    className="text-h4 uppercase tracking-wider2 font-light"
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <motion.a
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-studio mt-4"
                style={{ backgroundColor: "#fff", color: "var(--color-ink)", borderColor: "#fff" }}
              >
                Book a Session
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
