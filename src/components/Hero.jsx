"use client";
import { useState } from "react";
import { Layout, Play, Star } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";

const Hero = () => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  return (
    <section id="beranda" className="relative pt-32 pb-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-template-columns-[1.2fr_1fr] lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="text-brand-gold font-medium tracking-widest uppercase text-xs mb-4 block">
              Grand Ender Residence
            </span>
            <h1 className="text-4xl lg:text-6xl font-serif text-brand-navy leading-[1.1] mb-6">
              Temukan Tipe Rumah <br />
              <span className="italic font-normal">Modern Minimalis</span>{" "}
              <br />
              <span className="text-brand-gold"> Bernuansa Asri</span>
            </h1>
            <p className="text-brand-navy/60 text-base md:text-lg mb-10 max-w-lg leading-relaxed">
              Miliki rumah subsidi impian Anda sekarang! Berada di lokasi yang
              strategis dengan fasilitas lengkap, dekat dengan kawasan pabrik,
              tempat ibadah, puskesmas, dan akses tol.
            </p>

            <div className="flex flex-col sm:flex-row flex-wrap gap-4">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .getElementById("tipe-rumah")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="w-full sm:w-auto justify-center bg-brand-navy text-white px-8 py-4 rounded-xl font-medium flex items-center gap-3 hover:bg-brand-navy/90 transition-all shadow-xl shadow-brand-navy/20"
              >
                <Layout className="w-5 h-5" />
                Lihat Promo Unit
              </button>
              <button
                onClick={() => setIsVideoPlaying(true)}
                className="w-full sm:w-auto justify-center bg-white text-brand-navy border border-brand-navy/10 px-8 py-4 rounded-xl font-medium flex items-center gap-3 hover:bg-brand-cream transition-all"
              >
                <Play className="w-5 h-5 fill-brand-navy" />
                Lihat Video
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 20, scale: 0.95 }}
            animate={{ y: 0, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative"
          >
            <div className="aspect-4/4 rounded-3xl overflow-hidden shadow-2xl relative bg-black">
              {!isVideoPlaying ? (
                <>
                  <Image
                    src="/images/9Home.jpeg"
                    alt="Main House"
                    width={1080}
                    height={1080}
                    className="w-full h-full object-cover"
                    priority
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-brand-navy/20 to-transparent pointer-events-none"></div>
                </>
              ) : (
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/VvOIQ2XVl9s?si=bRX80sjSGZvpVqnl"
                  title="Video Promosi"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full absolute inset-0 z-20"
                ></iframe>
              )}
            </div>

            {/* Floating Badges */}
            {!isVideoPlaying && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl border border-brand-gold/10 hidden md:flex items-center gap-4 z-30"
              >
                <div className="w-12 h-12 bg-brand-gold/10 rounded-full flex items-center justify-center">
                  <Star className="text-brand-gold w-6 h-6 fill-brand-gold" />
                </div>
                <div>
                  <div className="text-sm font-bold text-brand-navy leading-none">
                    Grand Ender
                  </div>
                  <div className="text-xs text-brand-navy/50 mt-1">
                    Prime Location
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/3 h-1/2 bg-brand-gold/5 rounded-bl-[200px] -z-10 blur-3xl"></div>
    </section>
  );
};

export default Hero;
