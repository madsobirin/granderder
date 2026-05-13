"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { defaultGalleryImages } from "@/lib/default-content";

const Gallery = ({ images = defaultGalleryImages }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const galleryItems = images.length ? images : defaultGalleryImages;

  useEffect(() => {
    if (selectedImage !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedImage]);

  const handleNext = useCallback(
    (event) => {
      if (event) event.stopPropagation();
      setSelectedImage((previousValue) => {
        if (previousValue === null) return null;
        return (previousValue + 1) % galleryItems.length;
      });
    },
    [galleryItems.length],
  );

  const handlePrev = useCallback(
    (event) => {
      if (event) event.stopPropagation();
      setSelectedImage((previousValue) => {
        if (previousValue === null) return null;
        return (previousValue - 1 + galleryItems.length) % galleryItems.length;
      });
    },
    [galleryItems.length],
  );

  useEffect(() => {
    if (selectedImage === null) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") setSelectedImage(null);
      if (event.key === "ArrowRight") handleNext(event);
      if (event.key === "ArrowLeft") handlePrev(event);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImage, handleNext, handlePrev]);

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
          <p className="text-brand-gold font-bold tracking-widest uppercase text-md mb-8 block">
            Update foto terbaru proyek dan rumah contoh
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {galleryItems.map((image, index) => (
            <motion.div
              key={image.id ?? index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: (index % 4) * 0.1 }}
              whileHover={{ y: -10 }}
              onClick={() => setSelectedImage(index)}
              className="aspect-square rounded-3xl overflow-hidden shadow-xl cursor-pointer group"
            >
              <div className="relative w-full h-full">
                <Image
                  src={image.imageUrl}
                  alt={image.title || `Gallery ${index + 1}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  width={600}
                  height={600}
                />
                <div className="absolute inset-0 bg-brand-navy/0 group-hover:bg-brand-navy/20 transition-colors duration-500 flex items-center justify-center">
                  <div className="bg-white/90 text-brand-navy px-4 py-2 rounded-full font-medium text-sm opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 shadow-lg">
                    Lihat Detail
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-100 flex items-center justify-center bg-black/90 p-4 sm:p-8 backdrop-blur-md"
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 md:top-8 md:right-8 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-2 transition-all z-110"
            >
              <X className="w-6 h-6 md:w-8 md:h-8" />
            </button>

            <button
              onClick={handlePrev}
              className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-3 transition-all z-110 hidden sm:block"
            >
              <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
            </button>

            <button
              onClick={handleNext}
              className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-3 transition-all z-110 hidden sm:block"
            >
              <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
            </button>

            <motion.div
              key={selectedImage}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-5xl max-h-[85vh] flex items-center justify-center rounded-2xl overflow-hidden"
              onClick={(event) => event.stopPropagation()}
            >
              <Image
                src={galleryItems[selectedImage].imageUrl}
                alt={
                  galleryItems[selectedImage].title ||
                  `Gallery Details ${selectedImage + 1}`
                }
                className="w-auto h-auto max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl"
                width={1920}
                height={1080}
                priority
              />
            </motion.div>

            <div className="absolute bottom-6 left-0 right-0 flex items-center justify-center gap-4 z-110 sm:hidden">
              <button
                onClick={handlePrev}
                className="text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-3 transition-all"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <div className="text-white/60 font-medium tracking-widest text-sm bg-black/50 px-4 py-2 rounded-full">
                {selectedImage + 1} / {galleryItems.length}
              </div>
              <button
                onClick={handleNext}
                className="text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-3 transition-all"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            <div className="hidden sm:block absolute bottom-6 left-0 right-0 text-center text-white/60 font-medium tracking-widest text-sm pointer-events-none">
              {selectedImage + 1} / {galleryItems.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery;
