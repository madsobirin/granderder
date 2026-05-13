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
      className={`cursor-pointer rounded-2xl border border-dashed px-4 py-5 text-sm transition md:col-span-2 ${
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
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative h-32 w-full overflow-hidden rounded-2xl bg-white sm:w-44">
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
        <div className="min-w-0 flex-1">
          <span className="block font-semibold text-brand-navy">
            {uploading
              ? "Mengunggah gambar..."
              : "Drag & drop gambar promo atau klik untuk upload"}
          </span>
          <span className="mt-1 block text-brand-navy/60">
            {fileName || promoForm.imageUrl
              ? fileName || "Gambar promo sudah siap dipakai."
              : "Gambar langsung tampil sebagai preview setelah upload berhasil."}
          </span>
        </div>
      </div>
    </label>
  );
}
