import Image from "next/image";
import { LayoutTemplate, PencilLine, Trash2 } from "lucide-react";

export default function PromoList({ promos, loading, onEdit, onDelete }) {
  return (
    <section>
      <div className="rounded-[2rem] border border-white/80 bg-white p-6 shadow-xl shadow-brand-navy/5 sm:p-8">
        <h2 className="mb-6 text-2xl text-brand-navy">Daftar Promo Aktif</h2>
        <div className="space-y-4">
          {loading ? (
            <p className="text-sm text-brand-navy/60">Memuat data promo...</p>
          ) : promos.length ? (
            promos.map((promo) => (
              <div
                key={promo.id}
                className="overflow-hidden rounded-3xl border border-brand-dark/5 bg-brand-cream/40"
              >
                <div className="grid gap-0 md:grid-cols-[180px_1fr]">
                  <div className="relative aspect-4/3 bg-white md:aspect-auto">
                    <Image
                      src={promo.imageUrl}
                      alt={promo.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-5">
                    <div className="mb-4 flex items-start justify-between gap-4">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-gold">
                          {promo.category}
                        </p>
                        <h3 className="mt-2 text-xl text-brand-navy">
                          {promo.title}
                        </h3>
                      </div>
                      <div className="rounded-full bg-white px-3 py-1 text-xs font-medium text-brand-navy/60">
                        Urutan {promo.displayOrder}
                      </div>
                    </div>
                    <p className="mb-3 text-sm leading-relaxed text-brand-navy/65">
                      {promo.description}
                    </p>
                    <div className="mb-4 flex flex-wrap gap-2">
                      {promo.priceLabel ? (
                        <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-brand-navy">
                          {promo.priceLabel}
                        </span>
                      ) : null}
                      {promo.buildingSize ? (
                        <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-brand-navy/70">
                          LB {promo.buildingSize}
                        </span>
                      ) : null}
                      {promo.landSize ? (
                        <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-brand-navy/70">
                          LT {promo.landSize}
                        </span>
                      ) : null}
                      {!promo.isPublished ? (
                        <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-medium text-red-600">
                          Draft
                        </span>
                      ) : null}
                    </div>
                    <div className="flex flex-wrap gap-3">
                      <button
                        type="button"
                        onClick={() => onEdit(promo)}
                        className="inline-flex items-center gap-2 rounded-full border border-brand-navy/10 bg-white px-4 py-2 text-sm font-medium text-brand-navy"
                      >
                        <PencilLine className="h-4 w-4" />
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => onDelete(promo.id)}
                        className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-4 py-2 text-sm font-medium text-red-600"
                      >
                        <Trash2 className="h-4 w-4" />
                        Hapus
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="flex min-h-72 flex-col items-center justify-center rounded-[1.8rem] border border-dashed border-brand-gold/25 bg-brand-cream/35 px-6 py-10 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-brand-gold shadow-sm">
                <LayoutTemplate className="h-7 w-7" />
              </div>
              <h3 className="mt-5 text-2xl text-brand-navy">Belum ada promo aktif</h3>
              <p className="mt-3 max-w-md text-sm leading-7 text-brand-navy/60">
                Setelah kamu menambahkan promo rumah dari form di atas, daftar konten
                aktif akan muncul rapi di area ini.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
