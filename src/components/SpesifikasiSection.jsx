"use client";
import { Check } from "lucide-react";
import { motion } from "motion/react";

const SpesifikasiSection = () => {
  const specs = [
    { label: "Pondasi", value: "Pasangan Batu Belah" },
    { label: "Struktur", value: "Beton Bertulang" },
    { label: "Dinding", value: "Bata Merah (Plester Aci Fin. Cat)" },
    { label: "Lantai", value: "Keramik 40x40" },
    { label: "Rangka Atap", value: "Baja Ringan" },
    { label: "Penutup Atap", value: "Genteng Metal" },
    { label: "Plafond", value: "GRC Board" },
    { label: "Kusen", value: "Kayu Mahoni / Setara" },
    { label: "Sanitair", value: "Closet Jongkok" },
    { label: "Air", value: "Sumur Bor" },
    { label: "Listrik", value: "1300 kVa" },
    { label: "Carport", value: "Rabat Beton" },
  ];

  return (
    <section id="spesifikasi" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-brand-gold font-medium tracking-widest uppercase text-xs mb-3 block">
            Kualitas Premium
          </span>
          <h2 className="text-4xl md:text-5xl text-brand-navy mb-4">
            Spesifikasi Bangunan
          </h2>
        </motion.div>

        <div className="bg-brand-cream/30 rounded-[32px] p-8 md:p-12 border border-brand-dark/5 shadow-xl max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-6">
            {specs.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="flex items-start gap-4 border-b border-brand-dark/5 pb-4 last:border-0 md:last:border-b"
              >
                <div className="mt-1 bg-brand-gold/20 text-brand-gold rounded-full p-1 shrink-0">
                  <Check className="w-4 h-4 stroke-[3px]" />
                </div>
                <div>
                  <div className="text-sm font-bold text-brand-navy mb-1">
                    {item.label}
                  </div>
                  <div className="text-brand-navy/60 text-sm leading-snug">
                    {item.value}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpesifikasiSection;
