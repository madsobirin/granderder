"use client";
import {
  MapPin,
  ShieldCheck,
  Trees,
  Car,
  Leaf,
  Cctv,
  Store,
  Hospital,
  Route,
} from "lucide-react";
import { motion } from "motion/react";

const Features = () => {
  const items = [
    { icon: <MapPin className="w-6 h-6" />, title: "Lokasi Strategis" },
    { icon: <ShieldCheck className="w-6 h-6" />, title: "One Gate System" },
    { icon: <Trees className="w-6 h-6" />, title: "Pagar Keliling" },
    { icon: <Car className="w-6 h-6" />, title: "10 Menit Toll Kanci" },
    { icon: <Leaf className="w-6 h-6" />, title: "Lingkungan Asri & Nyaman" },
    { icon: <Cctv className="w-6 h-6" />, title: "Keamanan 24 Jam & CCTV" },
    { icon: <Store className="w-6 h-6" />, title: "Dekat Sekolah & Pasar" },
    {
      icon: <Hospital className="w-6 h-6" />,
      title: "Dekat Rumah Sakit & Klinik",
    },
    { icon: <Route className="w-6 h-6" />, title: "Akses Jalan Utama Pantura" },
  ];

  return (
    <section className="bg-white py-12 border-y border-brand-dark/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
          {items.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: (idx % 3) * 0.1 }}
              className="flex items-center gap-4 group cursor-default"
            >
              <div className="w-12 h-12 rounded-xl shrink-0 bg-brand-cream flex items-center justify-center text-brand-gold group-hover:bg-brand-gold group-hover:text-white transition-all">
                {item.icon}
              </div>
              <span className="text-sm font-semibold text-brand-navy tracking-tight leading-snug">
                {item.title}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
