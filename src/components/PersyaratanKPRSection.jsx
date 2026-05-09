"use client";
import { Check } from "lucide-react";
import { motion } from "motion/react";

const PersyaratanKPRSection = () => {
  const requirements = [
    { item: "F.C KTP Suami Istri", k: true, w: true },
    { item: "F.C Kartu Keluarga", k: true, w: true },
    { item: "F.C Buku Nikah / Akte Cerai", k: true, w: true },
    { item: "F.C NPWP", k: true, w: true },
    { item: "Surat Ket. Belum Memiliki Rumah", k: true, w: true },
    { item: "Pas Photo Berwarna (3x4)", k: true, w: true },
    { item: "Surat Keterangan Bekerja", k: true, w: false },
    { item: "Slip Gaji 3 Bulan Terakhir", k: true, w: false },
    { item: "Surat Keterangan Usaha", k: false, w: true },
    { item: "Photo Usaha", k: false, w: true },
    { item: "Denah Lokasi Usaha", k: false, w: true },
    { item: "Buku Tabungan", k: true, w: true },
    { item: "Rekening Koran Bulan Terakhir", k: true, w: true },
    { item: "Materai 10.000", k: true, w: true },
  ];

  return (
    <section id="persyaratan" className="py-24 bg-brand-cream relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-brand-gold font-medium tracking-widest uppercase text-xs mb-3 block">
            Dukungan Bank BTN
          </span>
          <h2 className="text-4xl md:text-5xl text-brand-navy mb-4">
            Persyaratan KPR
          </h2>
          <p className="text-brand-navy/60 max-w-2xl mx-auto">
            Uang Tanda Jadi (Booking Fee) Tidak dapat Ditarik Kembali Dengan
            Alasan Apapun.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8 }}
          className="bg-white rounded-[32px] overflow-hidden shadow-2xl border border-brand-dark/5 max-w-4xl mx-auto"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[600px] text-sm md:text-base">
              <thead>
                <tr className="bg-brand-navy text-white text-sm tracking-widest uppercase">
                  <th className="p-6 font-medium border-r border-white/10 w-3/5">
                    Dokumen Persyaratan
                  </th>
                  <th className="p-6 font-medium text-center border-r border-white/10 w-1/5">
                    Karyawan
                  </th>
                  <th className="p-6 font-medium text-center w-1/5">
                    Wiraswasta
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-dark/5">
                {requirements.map((req, idx) => (
                  <tr
                    key={idx}
                    className="hover:bg-brand-cream/30 transition-colors"
                  >
                    <td className="p-4 px-6 text-sm text-brand-navy border-r border-brand-dark/5 font-medium">
                      {req.item}
                    </td>
                    <td className="p-4 text-center border-r border-brand-dark/5">
                      {req.k ? (
                        <Check className="w-5 h-5 mx-auto text-brand-gold" />
                      ) : (
                        <span className="text-brand-navy/20">-</span>
                      )}
                    </td>
                    <td className="p-4 text-center">
                      {req.w ? (
                        <Check className="w-5 h-5 mx-auto text-brand-gold" />
                      ) : (
                        <span className="text-brand-navy/20">-</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PersyaratanKPRSection;
