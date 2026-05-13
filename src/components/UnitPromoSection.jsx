"use client";

import { motion } from "motion/react";
import Image from "next/image";
import {
  Bath,
  BadgePercent,
  BedDouble,
  Building2,
  LandPlot,
  Home,
} from "lucide-react";

const UnitPromoSection = ({ promos = [] }) => {
  const promoItems = promos;

  const getStats = (promo) =>
    [
      {
        label: "Luas Bangunan",
        value: promo.buildingSize,
        icon: Building2,
      },
      {
        label: "Luas Tanah",
        value: promo.landSize,
        icon: LandPlot,
      },
      {
        label: "Kamar Tidur",
        value: promo.bedrooms,
        icon: BedDouble,
      },
      {
        label: "Kamar Mandi",
        value: promo.bathrooms,
        icon: Bath,
      },
    ].filter(
      (item) =>
        item.value !== null && item.value !== undefined && item.value !== "",
    );

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
            Promo Unit & Rumah Favorit
          </h2>
        </motion.div>

        {promoItems.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center justify-center py-20"
          >
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-brand-gold/10">
              <Home className="h-10 w-10 text-brand-gold" />
            </div>
            <h3 className="text-2xl md:text-3xl font-serif text-brand-navy mb-3">
              Belum Ada Data Promo
            </h3>
            <p className="text-brand-navy/60 text-center max-w-md">
              Silakan tambahkan promo unit melalui dashboard admin untuk
              ditampilkan di sini.
            </p>
          </motion.div>
        ) : (
          <div className="space-y-12">
            {promoItems.map((promo, index) => {
              const reverseLayout = index % 2 === 1;
              const stats = getStats(promo);

              return (
                <motion.div
                  key={promo.id ?? index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: index * 0.08 }}
                  className={`bg-white rounded-3xl overflow-hidden shadow-2xl border border-brand-dark/5 flex flex-col ${
                    reverseLayout ? "md:flex-row-reverse" : "md:flex-row"
                  } items-stretch`}
                >
                  <div className="w-full md:w-1/2 aspect-4/3 md:aspect-auto md:min-h-[420px] relative overflow-hidden bg-brand-cream/20 flex items-center justify-center">
                    {promo.imageUrl ? (
                      <>
                        <Image
                          src={promo.imageUrl}
                          alt={promo.title}
                          width={1080}
                          height={1080}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                          priority={index < 2}
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-brand-navy/25 via-transparent to-transparent" />
                      </>
                    ) : (
                      <div className="text-center">
                        <div className="text-6xl mb-3">🏠</div>
                        <p className="text-lg font-semibold text-brand-navy">
                          Belum ada gambar rumah
                        </p>
                        <p className="text-sm text-brand-navy/60 mt-2">
                          Gambar akan ditampilkan setelah upload
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      <span className="text-brand-gold font-bold tracking-widest uppercase text-xs block">
                        {promo.category}
                      </span>
                      {promo.priceLabel ? (
                        <span className="inline-flex items-center gap-2 rounded-full bg-brand-gold/10 px-4 py-2 text-xs font-semibold tracking-[0.2em] uppercase text-brand-navy">
                          <BadgePercent className="h-4 w-4 text-brand-gold" />
                          {promo.priceLabel}
                        </span>
                      ) : null}
                    </div>

                    <h3 className="text-3xl md:text-4xl font-serif text-brand-navy mb-4">
                      {promo.title}
                    </h3>
                    <p className="text-brand-navy/70 leading-relaxed mb-8 text-lg">
                      {promo.description}
                    </p>

                    <div className="grid grid-cols-2 gap-4">
                      {stats.map((item) => {
                        const Icon = item.icon;

                        return (
                          <div
                            key={`${promo.id}-${item.label}`}
                            className="bg-brand-cream/60 p-4 rounded-2xl border border-brand-dark/5 flex flex-col items-center text-center"
                          >
                            <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-white text-brand-gold shadow-sm">
                              <Icon className="h-5 w-5" />
                            </div>
                            <span className="text-xl font-bold text-brand-navy mb-1">
                              {item.value}
                            </span>
                            <span className="text-[10px] text-brand-navy/60 uppercase tracking-widest font-bold">
                              {item.label}
                            </span>
                          </div>
                        );
                      })}

                      {promo.businessLabel ? (
                        <div className="bg-brand-navy text-white p-4 rounded-2xl border border-brand-navy/20 flex flex-col items-center text-center col-span-2 sm:col-span-1">
                          <span className="text-xl font-bold mb-1">
                            {promo.businessLabel}
                          </span>
                          <span className="text-[10px] text-white/70 uppercase tracking-widest font-bold">
                            Nilai Tambah
                          </span>
                        </div>
                      ) : null}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default UnitPromoSection;
