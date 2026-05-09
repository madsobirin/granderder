"use client";
import { motion } from "motion/react";
import Image from "next/image";

const Gallery = () => {
  const images = [
    "/images/1Home.jpeg",
    "/images/2Home.jpeg",
    "/images/4Home.jpeg",
    "/images/9Home.jpeg",
  ];

  return (
    <section id="gallery" className="py-24 bg-brand-cream/30 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-brand-gold font-medium tracking-widest uppercase text-xs mb-3 block">
            Gallery
          </span>
          <h2 className="text-4xl md:text-5xl text-brand-navy mb-4">
            Lihat Lebih Dekat
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {images.map((img, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -10 }}
              className="aspect-square rounded-3xl overflow-hidden shadow-xl"
            >
              <Image
                src={img}
                alt={`Gallery ${idx + 1}`}
                className="w-full h-full object-cover"
                width={1080}
                height={1080}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
