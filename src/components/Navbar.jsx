"use client";
import { useState, useEffect } from "react";
import { Home, Phone, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const Navbar = () => {
  const [active, setActive] = useState("beranda");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      const sections = [
        "beranda",
        "tipe-rumah",
        "spesifikasi",
        "persyaratan",
        "gallery",
        "kontak",
      ];

      let current = "";
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150) {
            current = section;
          }
        }
      }

      if (current && current !== active) {
        setActive(current);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [active]);

  const scrollTo = (e, id) => {
    if (e) e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      setActive(id);
    }
  };

  const navLinks = [
    { id: "beranda", label: "Beranda" },
    { id: "tipe-rumah", label: "Promo Unit" },
    { id: "spesifikasi", label: "Spesifikasi" },
    { id: "persyaratan", label: "Persyaratan" },
    { id: "gallery", label: "Gallery" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-white/90 backdrop-blur-md border-b border-brand-dark/5 shadow-sm py-0"
          : "bg-transparent border-transparent py-2"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={(e) => scrollTo(e, "beranda")}
          >
            <div className="w-10 h-10 bg-brand-navy flex items-center justify-center rounded-lg">
              <Home className="text-brand-gold w-6 h-6" />
            </div>
            <div>
              <span className="block text-lg font-bold leading-none tracking-tight text-brand-navy uppercase font-serif">
                Grand Ender
              </span>
              <span className="block text-[10px] tracking-widest text-brand-gold uppercase font-sans">
                Residence
              </span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => scrollTo(e, link.id)}
                className={`relative text-sm font-medium transition-colors pb-1 ${
                  active === link.id
                    ? "text-brand-gold"
                    : "text-brand-navy/60 hover:text-brand-navy"
                }`}
              >
                {link.label}
                {active === link.id && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-brand-gold"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            ))}
          </div>

          <div className="hidden md:block">
            <a
              href="https://wa.me/6287786955568"
              target="_blank"
              className="flex items-center gap-2 bg-brand-gold hover:bg-brand-gold/90 text-white px-6 py-2.5 rounded-full text-sm font-medium transition-all shadow-lg shadow-brand-gold/20"
            >
              <Phone className="w-4 h-4" />
              <span>Hubungi Kami</span>
            </a>
          </div>

          <button
            className="md:hidden p-2 text-brand-navy hover:bg-brand-cream rounded-lg transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-brand-dark/5 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-2 shadow-xl">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    setIsMobileMenuOpen(false);
                    setTimeout(() => {
                      scrollTo(null, link.id);
                    }, 150);
                  }}
                  className={`block px-4 py-3 rounded-xl text-base font-medium ${
                    active === link.id
                      ? "bg-brand-gold/10 text-brand-gold"
                      : "text-brand-navy/70 hover:bg-brand-cream hover:text-brand-navy"
                  }`}
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-4 mt-2 border-t border-brand-dark/5">
                <a
                  href="https://wa.me/6287786955568"
                  target="_blank"
                  className="flex w-full justify-center items-center gap-2 bg-brand-gold hover:bg-brand-gold/90 text-white px-6 py-3.5 rounded-xl text-base font-medium transition-all shadow-lg shadow-brand-gold/20"
                >
                  <Phone className="w-5 h-5" />
                  <span>Hubungi Kami</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
