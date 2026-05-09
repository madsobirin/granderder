"use client";
import { MessageCircle, Phone } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";

const CTA = () => {
  return (
    <section
      id="kontak"
      className="bg-brand-navy py-20 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl text-center md:text-left"
          >
            <h2 className="text-4xl md:text-5xl text-white mb-6">
              Masih Bingung Memilih? <br />{" "}
              <span className="text-brand-gold">
                Konsultasikan dengan Marketing Kami!
              </span>
            </h2>
            <p className="text-white/60 text-lg">
              Dapatkan rekomendasi tipe rumah terbaik sesuai kebutuhan Anda.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center md:items-end gap-6"
          >
            <Link
              href="https://wa.me/6287786955568"
              target="_blank"
              className="bg-brand-gold hover:bg-white hover:text-brand-gold text-white px-10 py-5 rounded-2xl flex items-center gap-4 text-lg font-bold transition-all shadow-2xl shadow-brand-gold/30"
            >
              <MessageCircle className="w-7 h-7" />
              Hubungi via WhatsApp
            </Link>
            <div className="flex items-center gap-4 text-white/80">
              <Phone className="w-5 h-5 text-brand-gold" />
              <span className="font-mono text-xl tracking-tighter">
                0877-8695-5568
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Visual Decor */}
      <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
        <svg
          className="w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <path d="M0 100 C 20 0 50 0 100 100 Z" fill="currentColor" />
        </svg>
      </div>
    </section>
  );
};

export default CTA;
