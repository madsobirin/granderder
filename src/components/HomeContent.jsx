"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import UnitPromoSection from "@/components/UnitPromoSection";
import SpesifikasiSection from "@/components/SpesifikasiSection";
import PersyaratanKPRSection from "@/components/PersyaratanKPRSection";
import Gallery from "@/components/Gallery";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import { defaultGalleryImages, defaultPromos } from "@/lib/default-content";

export default function HomeContent() {
  const [promos, setPromos] = useState(defaultPromos);
  const [galleryImages, setGalleryImages] = useState(defaultGalleryImages);

  useEffect(() => {
    async function loadContent() {
      try {
        const response = await fetch("/api/content", {
          cache: "no-store",
        });
        const data = await response.json();

        if (data.success) {
          setPromos(data.promos?.length ? data.promos : defaultPromos);
          setGalleryImages(
            data.galleryImages?.length ? data.galleryImages : defaultGalleryImages,
          );
        }
      } catch {
        setPromos(defaultPromos);
        setGalleryImages(defaultGalleryImages);
      }
    }

    loadContent();
  }, []);

  return (
    <div className="min-h-screen selection:bg-brand-gold selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <UnitPromoSection promos={promos} />
        <SpesifikasiSection />
        <PersyaratanKPRSection />
        <Gallery images={galleryImages} />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
