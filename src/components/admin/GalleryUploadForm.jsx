import { ImagePlus } from "lucide-react";

export default function GalleryUploadForm({
  galleryForm,
  onGalleryChange,
  onImageSelect,
  uploading,
  onSubmit,
}) {
  return (
    <section>
      <div className="rounded-[2rem] border border-white/80 bg-white p-6 shadow-xl shadow-brand-navy/5 sm:p-8">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-gold/10 text-brand-gold">
            <ImagePlus className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-2xl text-brand-navy">Upload Gambar Galeri</h2>
            <p className="text-sm text-brand-navy/60">
              Gambar baru akan masuk ke halaman galeri secara otomatis.
            </p>
          </div>
        </div>

        <form onSubmit={onSubmit} className="grid gap-4 md:grid-cols-2">
          <input
            value={galleryForm.title}
            onChange={(event) => onGalleryChange("title", event.target.value)}
            placeholder="Judul gambar"
            className="rounded-2xl border border-brand-navy/10 bg-brand-cream/40 px-4 py-3 outline-none focus:border-brand-gold"
            required
          />
          <input
            type="number"
            value={galleryForm.displayOrder}
            onChange={(event) =>
              onGalleryChange("displayOrder", event.target.value)
            }
            placeholder="Urutan tampil"
            className="rounded-2xl border border-brand-navy/10 bg-brand-cream/40 px-4 py-3 outline-none focus:border-brand-gold"
          />
          <label className="md:col-span-2 rounded-2xl border border-dashed border-brand-gold/40 bg-brand-cream/30 px-4 py-5 text-sm text-brand-navy/70">
            <span className="mb-2 block font-medium text-brand-navy">
              Pilih file gambar
            </span>
            <input
              id="gallery-image-input"
              type="file"
              accept="image/*"
              onChange={(event) =>
                onImageSelect(event.target.files?.[0] || null)
              }
              className="block w-full text-sm"
              required
            />
          </label>
          <label className="flex items-center gap-3 rounded-2xl border border-brand-navy/10 bg-brand-cream/40 px-4 py-3 text-sm text-brand-navy md:col-span-2">
            <input
              type="checkbox"
              checked={galleryForm.isPublished}
              onChange={(event) =>
                onGalleryChange("isPublished", event.target.checked)
              }
            />
            Tampilkan di halaman galeri
          </label>
          <button
            type="submit"
            disabled={uploading}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-gold px-5 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-brand-gold/90 disabled:opacity-70"
          >
            <ImagePlus className="h-4 w-4" />
            {uploading ? "Mengunggah..." : "Upload Gambar"}
          </button>
        </form>
      </div>
    </section>
  );
}
