"use client";
import { useState, useEffect } from "react";
import {
  Phone,
  Play,
  ChevronLeft,
  ChevronRight,
  Check,
  MapPin,
  ShieldCheck,
  Star,
  MessageCircle,
  Home,
  Bath,
  Maximize,
  Layout,
  Car,
  Utensils,
  Trees,
  Award,
  Users,
  BadgePercent,
  Menu,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";

// --- Data ---

const HOUSE_TYPES = [
  {
    id: "36",
    name: "Tipe 36",
    subName: "36/72",
    image: "/images/grand-ender-unit-front.jpeg",
    specs: {
      luasTanah: "72 m²",
      luasBangunan: "36 m²",
      kamarTidur: 2,
      kamarMandi: 1,
      carport: 1,
      ruangTamu: true,
      dapur: true,
      taman: true,
      hargaMulai: "Rp 325 JT",
    },
  },
  {
    id: "45",
    name: "Tipe 45",
    subName: "45/90",
    image: "/images/grand-ender-unit-alt.jpeg",
    specs: {
      luasTanah: "90 m²",
      luasBangunan: "45 m²",
      kamarTidur: 2,
      kamarMandi: 1,
      carport: 1,
      ruangTamu: true,
      dapur: true,
      taman: true,
      hargaMulai: "Rp 425 JT",
    },
  },
  {
    id: "55",
    name: "Tipe 55",
    subName: "55/105",
    image: "/images/5Home.jpeg",
    specs: {
      luasTanah: "105 m²",
      luasBangunan: "55 m²",
      kamarTidur: 3,
      kamarMandi: 2,
      carport: 1,
      ruangTamu: true,
      dapur: true,
      taman: true,
      hargaMulai: "Rp 525 JT",
    },
  },
  {
    id: "60",
    name: "Tipe 60",
    subName: "60/120",
    image:
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=2070&auto=format&fit=crop",
    specs: {
      luasTanah: "120 m²",
      luasBangunan: "60 m²",
      kamarTidur: 3,
      kamarMandi: 2,
      carport: 2,
      ruangTamu: true,
      dapur: true,
      taman: true,
      hargaMulai: "Rp 625 JT",
    },
  },
  {
    id: "70",
    name: "Tipe 70",
    subName: "70/140",
    image: "/images/2Home.jpeg",
    specs: {
      luasTanah: "140 m²",
      luasBangunan: "70 m²",
      kamarTidur: 4,
      kamarMandi: 2,
      carport: 2,
      ruangTamu: true,
      dapur: true,
      taman: true,
      hargaMulai: "Rp 725 JT",
    },
  },
];

// --- Components ----

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
          // Adjust offset to account for navbar height
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
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Navbar height
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

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
            <button
              onClick={(e) => scrollTo(e, "kontak")}
              className="flex items-center gap-2 bg-brand-gold hover:bg-brand-gold/90 text-white px-6 py-2.5 rounded-full text-sm font-medium transition-all shadow-lg shadow-brand-gold/20"
            >
              <Phone className="w-4 h-4" />
              <span>Hubungi Kami</span>
            </button>
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
                    scrollTo(e, link.id);
                    setIsMobileMenuOpen(false);
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
                <button
                  onClick={(e) => {
                    scrollTo(e, "kontak");
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex w-full justify-center items-center gap-2 bg-brand-gold hover:bg-brand-gold/90 text-white px-6 py-3.5 rounded-xl text-base font-medium transition-all shadow-lg shadow-brand-gold/20"
                >
                  <Phone className="w-5 h-5" />
                  <span>Hubungi Kami</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
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
              <button className="w-full sm:w-auto justify-center bg-white text-brand-navy border border-brand-navy/10 px-8 py-4 rounded-xl font-medium flex items-center gap-3 hover:bg-brand-cream transition-all">
                <Play className="w-5 h-5 fill-brand-navy" />
                Lihat Video
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-4/4 rounded-3xl overflow-hidden shadow-2xl relative">
              <Image
                src="/images/9Home.jpeg"
                alt="Main House"
                width={1080}
                height={1080}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-brand-navy/20 to-transparent"></div>
            </div>

            {/* Floating Badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl border border-brand-gold/10 hidden md:flex items-center gap-4"
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
          </motion.div>
        </div>
      </div>

      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/3 h-1/2 bg-brand-gold/5 rounded-bl-[200px] -z-10 blur-3xl"></div>
    </section>
  );
};

const Features = () => {
  const items = [
    { icon: <MapPin className="w-6 h-6" />, title: "Lokasi Strategis" },
    { icon: <ShieldCheck className="w-6 h-6" />, title: "One Gate System" },
    { icon: <Trees className="w-6 h-6" />, title: "Pagar Keliling" },
    { icon: <Car className="w-6 h-6" />, title: "10 Menit Toll Kanci" },
  ];

  return (
    <section className="bg-white py-12 border-y border-brand-dark/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {items.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="flex items-center gap-4 group cursor-default"
            >
              <div className="w-12 h-12 rounded-xl bg-brand-cream flex items-center justify-center text-brand-gold group-hover:bg-brand-gold group-hover:text-white transition-all">
                {item.icon}
              </div>
              <span className="text-sm font-semibold text-brand-navy tracking-tight">
                {item.title}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const UnitPromoSection = () => {
  const units = [
    {
      id: "36",
      name: "DENAH (TYPE 36/60)",
      subName: "Rumah Subsidi",
      image: "/images/6Home.jpeg",
      desc: "Desain minimalis dengan lingkungan yang asri, cocok untuk keluarga baru yang mencari hunian nyaman dan strategis.",
    },
    {
      id: "30",
      name: "UNIT RUKO TYPE 30",
      subName: "Komersial",
      image: "/images/1Home.jpeg",
      desc: "Lokasi strategis di pintu masuk perumahan, ideal untuk tempat usaha dan investasi masa depan Anda.",
    },
  ];

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
                src="/images/1Home.jpeg"
                alt="Unit Ruko Type 30"
                width={1080}
                height={1080}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
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
            <button className="bg-brand-gold hover:bg-white hover:text-brand-gold text-white px-10 py-5 rounded-2xl flex items-center gap-4 text-lg font-bold transition-all shadow-2xl shadow-brand-gold/30">
              <MessageCircle className="w-7 h-7" />
              Hubungi via WhatsApp
            </button>
            <div className="flex items-center gap-4 text-white/80">
              <Phone className="w-5 h-5 text-brand-gold" />
              <span className="font-mono text-xl tracking-tighter">
                0812-3456-7890
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

const Footer = () => {
  return (
    <footer className="bg-brand-dark py-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-brand-navy flex items-center justify-center rounded-lg border border-brand-gold/30">
              <Home className="text-brand-gold w-5 h-5" />
            </div>
            <div className="text-white">
              <span className="block text-base font-bold leading-none tracking-tight font-serif">
                Grand Ender
              </span>
              <span className="block text-[8px] tracking-widest text-brand-gold uppercase font-sans opacity-70">
                Residence
              </span>
            </div>
          </div>

          <div className="text-white/40 text-sm">
            © 2026 Grand Ender Residence. All Rights Reserved.
          </div>

          <div className="flex gap-6">
            {["Instagram", "Facebook", "YouTube"].map((social) => (
              <a
                key={social}
                href="#"
                className="text-white/40 hover:text-brand-gold transition-colors text-xs uppercase tracking-widest font-semibold"
              >
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <div className="min-h-screen selection:bg-brand-gold selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <UnitPromoSection />
        <SpesifikasiSection />
        <PersyaratanKPRSection />
        <Gallery />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
