import Image from "next/image";
import { UploadCloud } from "lucide-react";

export default function PromoImageUpload({
  promoForm,
  uploading,
  fileName,
  onDragOver,
  onDragLeave,
  onDrop,
  onChange,
}) {
  return (
    <label
      htmlFor="promo-image-input"
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      className={`cursor-pointer rounded-3xl border border-dashed px-5 py-5 text-sm transition md:col-span-2 ${
        uploading
          ? "border-brand-gold bg-brand-gold/10"
          : "border-brand-gold/40 bg-brand-cream/30 hover:border-brand-gold"
      }`}
    >
      <input
        id="promo-image-input"
        type="file"
        accept="image/*"
        onChange={onChange}
        className="sr-only"
      />
      <div className="grid gap-4 lg:grid-cols-[180px_minmax(0,1fr)] lg:items-center">
        <div className="relative h-40 w-full overflow-hidden rounded-[1.7rem] bg-white">
          {promoForm.imageUrl ? (
            <Image
              src={promoForm.imageUrl}
              alt={promoForm.title || "Preview gambar promo"}
              fill
              className="object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-brand-gold">
              <UploadCloud className="h-10 w-10" />
            </div>
          )}
        </div>
        <div className="min-w-0">
          <span className="block text-sm font-semibold text-brand-navy sm:text-base">
            {uploading
              ? "Mengunggah gambar..."
              : "Drag & drop gambar promo atau klik untuk upload"}
          </span>
          <span className="mt-2 block max-w-md leading-6 text-brand-navy/60">
            {fileName || promoForm.imageUrl
              ? fileName || "Gambar promo sudah siap dipakai."
              : "Gambar langsung tampil sebagai preview setelah upload berhasil."}
          </span>
          <div className="mt-4 inline-flex rounded-full border border-brand-gold/25 bg-white px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-gold">
            Format terbaik: JPG atau PNG
          </div>
        </div>
      </div>
    </label>
  );
}
