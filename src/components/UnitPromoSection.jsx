"use client";
import { motion } from "motion/react";
import Image from "next/image";

const UnitPromoSection = () => {
  return (
    <section id="tipe-rumah" className="py-24 bg-brand-cream relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-brand-gold font-medium tracking-widest uppercase text-xs mb-3 block">
            Pilihan Unit
          </span>
          <h2 className="text-4xl md:text-5xl text-brand-navy mb-4">
            Promo Unit & Ruko
          </h2>
        </motion.div>

        <div className="space-y-12">
          {/* DENAH HIGHLIGHT */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-3xl overflow-hidden shadow-2xl border border-brand-dark/5 flex flex-col md:flex-row items-stretch"
          >
            <div className="w-full md:w-1/2 p-6 md:p-10 bg-brand-cream/30 flex justify-center items-center">
              <Image
                src="/images/6Home.jpeg"
                alt="Denah Type 36/60"
                width={1080}
                height={1080}
                className="w-full max-w-md object-contain drop-shadow-xl hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
              <span className="text-brand-gold font-bold tracking-widest uppercase text-xs mb-2 block">
                Rumah Subsidi
              </span>
              <h3 className="text-3xl md:text-4xl font-serif text-brand-navy mb-4">
                DENAH (TYPE 36/60)
              </h3>
              <p className="text-brand-navy/70 leading-relaxed mb-8 text-lg">
                Desain tata ruang yang sangat efisien dan nyaman, memisahkan
                area istirahat dan area berkumpul keluarga secara cerdas.
                Dilengkapi lahan sisa untuk taman atau pengembangan.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-brand-cream/50 p-4 rounded-xl border border-brand-dark/5 flex flex-col items-center text-center">
                  <span className="text-2xl font-bold text-brand-navy mb-1">
                    36 m²
                  </span>
                  <span className="text-[10px] text-brand-navy/60 uppercase tracking-widest font-bold">
                    Luas Bangunan
                  </span>
                </div>
                <div className="bg-brand-cream/50 p-4 rounded-xl border border-brand-dark/5 flex flex-col items-center text-center">
                  <span className="text-2xl font-bold text-brand-navy mb-1">
                    60 m²
                  </span>
                  <span className="text-[10px] text-brand-navy/60 uppercase tracking-widest font-bold">
                    Luas Tanah
                  </span>
                </div>
                <div className="bg-brand-cream/50 p-4 rounded-xl border border-brand-dark/5 flex flex-col items-center text-center">
                  <span className="text-2xl font-bold text-brand-navy mb-1">
                    2
                  </span>
                  <span className="text-[10px] text-brand-navy/60 uppercase tracking-widest font-bold">
                    Kamar Tidur
                  </span>
                </div>
                <div className="bg-brand-cream/50 p-4 rounded-xl border border-brand-dark/5 flex flex-col items-center text-center">
                  <span className="text-2xl font-bold text-brand-navy mb-1">
                    1
                  </span>
                  <span className="text-[10px] text-brand-navy/60 uppercase tracking-widest font-bold">
                    Kamar Mandi
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* RUKO HIGHLIGHT */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-3xl overflow-hidden shadow-2xl border border-brand-dark/5 flex flex-col md:flex-row-reverse items-stretch"
          >
            <div className="w-full md:w-1/2 aspect-4/3 md:aspect-auto md:min-h-[400px] relative overflow-hidden bg-brand-cream/10">
              <Image
                src="/images/18Home.jpeg"
                alt="Unit Ruko Type 30"
                width={1080}
                height={1080}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                priority
              />
            </div>
            <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
              <span className="text-brand-gold font-bold tracking-widest uppercase text-xs mb-2 block">
                Peluang Bisnis
              </span>
              <h3 className="text-3xl md:text-4xl font-serif text-brand-navy mb-4">
                UNIT RUKO TYPE 30
              </h3>
              <p className="text-brand-navy/70 leading-relaxed mb-8 text-lg">
                Solusi cerdas untuk tempat usaha Anda. Berada tepat di titik
                terdepan perumahan yang memastikan trafik tinggi dan eksposur
                maksimal bagi bisnis Anda.
              </p>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-brand-cream/50 p-4 rounded-xl border border-brand-dark/5 flex flex-col items-center text-center">
                  <span className="text-2xl font-bold text-brand-navy mb-1">
                    30 m²
                  </span>
                  <span className="text-[10px] text-brand-navy/60 uppercase tracking-widest font-bold">
                    Luas Bangunan
                  </span>
                </div>
                <div className="bg-brand-cream/50 p-4 rounded-xl border border-brand-dark/5 flex flex-col items-center text-center">
                  <span className="text-2xl font-bold text-brand-navy mb-1">
                    Strategis
                  </span>
                  <span className="text-[10px] text-brand-navy/60 uppercase tracking-widest font-bold">
                    Posisi Usaha
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default UnitPromoSection;
