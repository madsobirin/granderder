"use client";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import UnitPromoSection from "@/components/UnitPromoSection";
import SpesifikasiSection from "@/components/SpesifikasiSection";
import PersyaratanKPRSection from "@/components/PersyaratanKPRSection";
import Gallery from "@/components/Gallery";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function HomeContent() {
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
