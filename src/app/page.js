"use client";
import dynamic from "next/dynamic";

const HomeContent = dynamic(() => import("@/components/HomeContent"), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-brand-cream flex items-center justify-center">
      <div className="w-10 h-10 border-4 border-brand-gold border-t-transparent rounded-full animate-spin" />
    </div>
  ),
});

export default function Page() {
  return <HomeContent />;
}
