import Image from "next/image";
import {
  BadgePercent,
  Building2,
  LandPlot,
  BedDouble,
  Bath,
} from "lucide-react";

const SPEC_ICONS = {
  buildingSize: Building2,
  landSize: LandPlot,
  bedrooms: BedDouble,
  bathrooms: Bath,
};

const SPEC_LABELS = {
  buildingSize: "Luas Bangunan",
  landSize: "Luas Tanah",
  bedrooms: "Kamar Tidur",
  bathrooms: "Kamar Mandi",
};

export default function PromoPreview({ promoForm, previewStats }) {
  return (
    <aside className="2xl:sticky 2xl:top-24">
      <div className="overflow-hidden rounded-3xl border border-brand-dark/5 bg-white shadow-lg shadow-brand-navy/5">
        <div className="relative aspect-[16/10] bg-brand-cream">
          {promoForm.imageUrl ? (
            <Image
              src={promoForm.imageUrl}
              alt={promoForm.title || "Preview promo rumah"}
              fill
              sizes="(max-width: 768px) 100vw, 500px"
              className="object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center px-5 text-center text-sm text-brand-navy/50">
              Preview gambar promo
            </div>
          )}
          <div className="absolute inset-0 bg-linear-to-t from-brand-navy/25 via-transparent to-transparent" />
        </div>
        <div className="p-5 sm:p-6">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-brand-gold">
              {promoForm.category || "Kategori Promo"}
            </span>
            {promoForm.priceLabel ? (
              <span className="inline-flex items-center gap-2 rounded-full bg-brand-gold/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-navy">
                <BadgePercent className="h-3.5 w-3.5 text-brand-gold" />
                {promoForm.priceLabel}
              </span>
            ) : null}
          </div>
          <h3 className="text-xl text-brand-navy sm:text-2xl">
            {promoForm.title || "Judul promo rumah"}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-brand-navy/65">
            {promoForm.description || "Deskripsi promo akan tampil di sini."}
          </p>
          {previewStats.length || promoForm.businessLabel ? (
            <div className="mt-4 grid grid-cols-2 gap-3">
              {previewStats.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.label}
                    className="rounded-2xl border border-brand-dark/5 bg-brand-cream/60 p-3"
                  >
                    <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-full bg-white text-brand-gold">
                      <Icon className="h-4 w-4" />
                    </div>
                    <span className="block font-bold text-brand-navy">
                      {item.value}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-navy/55">
                      {item.label}
                    </span>
                  </div>
                );
              })}
              {promoForm.businessLabel ? (
                <div className="rounded-2xl bg-brand-navy p-3 text-white col-span-2">
                  <span className="block font-bold">
                    {promoForm.businessLabel}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/70">
                    Nilai Tambah
                  </span>
                </div>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    </aside>
  );
}
