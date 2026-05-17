import Image from "next/image";
import { Trash2 } from "lucide-react";

export default function GalleryList({ galleryImages, loading, onDelete }) {
  return (
    <section>
      <div className="rounded-[2rem] border border-white/80 bg-white p-6 shadow-xl shadow-brand-navy/5 sm:p-8">
        <h2 className="mb-6 text-2xl text-brand-navy">Galeri Website</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {loading ? (
            <p className="text-sm text-brand-navy/60">
              Memuat gambar galeri...
            </p>
          ) : galleryImages.length ? (
            galleryImages.map((image) => (
              <div
                key={image.id}
                className="overflow-hidden rounded-3xl border border-brand-dark/5 bg-brand-cream/40 shadow-sm"
              >
                <div className="relative aspect-[4/3]">
                  <Image
                    src={image.imageUrl}
                    alt={image.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg text-brand-navy">{image.title}</h3>
                  <p className="mt-1 text-xs uppercase tracking-[0.25em] text-brand-gold">
                    Urutan {image.displayOrder}
                  </p>
                  <button
                    type="button"
                    onClick={() => onDelete(image.id)}
                    className="mt-4 inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-4 py-2 text-sm font-medium text-red-600"
                  >
                    <Trash2 className="h-4 w-4" />
                    Hapus Gambar
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-brand-navy/60">
              Belum ada gambar tambahan.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
