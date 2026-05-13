import PromoImageUpload from "./PromoImageUpload";

export default function PromoFormFields({
  promoForm,
  onPromoChange,
  uploadingImage,
  fileName,
  onDragOver,
  onDragLeave,
  onDrop,
  onImageChange,
}) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <input
        value={promoForm.category}
        onChange={(event) => onPromoChange("category", event.target.value)}
        placeholder="Kategori, contoh: Rumah Subsidi"
        className="rounded-2xl border border-brand-navy/10 bg-brand-cream/40 px-4 py-3 outline-none focus:border-brand-gold"
        required
      />
      <input
        value={promoForm.title}
        onChange={(event) => onPromoChange("title", event.target.value)}
        placeholder="Judul promo"
        className="rounded-2xl border border-brand-navy/10 bg-brand-cream/40 px-4 py-3 outline-none focus:border-brand-gold"
        required
      />
      <textarea
        value={promoForm.description}
        onChange={(event) => onPromoChange("description", event.target.value)}
        placeholder="Deskripsi promo rumah"
        className="min-h-32 rounded-2xl border border-brand-navy/10 bg-brand-cream/40 px-4 py-3 outline-none focus:border-brand-gold md:col-span-2"
        required
      />

      <PromoImageUpload
        promoForm={promoForm}
        uploading={uploadingImage}
        fileName={fileName}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        onChange={onImageChange}
      />

      <input
        value={promoForm.priceLabel}
        onChange={(event) => onPromoChange("priceLabel", event.target.value)}
        placeholder="Label promo, contoh: DP ringan"
        className="rounded-2xl border border-brand-navy/10 bg-brand-cream/40 px-4 py-3 outline-none focus:border-brand-gold"
      />
      <input
        value={promoForm.businessLabel}
        onChange={(event) => onPromoChange("businessLabel", event.target.value)}
        placeholder="Nilai tambah, contoh: Strategis"
        className="rounded-2xl border border-brand-navy/10 bg-brand-cream/40 px-4 py-3 outline-none focus:border-brand-gold"
      />
      <input
        value={promoForm.buildingSize}
        onChange={(event) => onPromoChange("buildingSize", event.target.value)}
        placeholder="Luas bangunan"
        className="rounded-2xl border border-brand-navy/10 bg-brand-cream/40 px-4 py-3 outline-none focus:border-brand-gold"
      />
      <input
        value={promoForm.landSize}
        onChange={(event) => onPromoChange("landSize", event.target.value)}
        placeholder="Luas tanah"
        className="rounded-2xl border border-brand-navy/10 bg-brand-cream/40 px-4 py-3 outline-none focus:border-brand-gold"
      />
      <input
        value={promoForm.bedrooms}
        onChange={(event) => onPromoChange("bedrooms", event.target.value)}
        placeholder="Jumlah kamar tidur"
        className="rounded-2xl border border-brand-navy/10 bg-brand-cream/40 px-4 py-3 outline-none focus:border-brand-gold"
      />
      <input
        value={promoForm.bathrooms}
        onChange={(event) => onPromoChange("bathrooms", event.target.value)}
        placeholder="Jumlah kamar mandi"
        className="rounded-2xl border border-brand-navy/10 bg-brand-cream/40 px-4 py-3 outline-none focus:border-brand-gold"
      />
      <input
        type="number"
        value={promoForm.displayOrder}
        onChange={(event) => onPromoChange("displayOrder", event.target.value)}
        placeholder="Urutan tampil"
        className="rounded-2xl border border-brand-navy/10 bg-brand-cream/40 px-4 py-3 outline-none focus:border-brand-gold"
      />
      <label className="flex items-center gap-3 rounded-2xl border border-brand-navy/10 bg-brand-cream/40 px-4 py-3 text-sm text-brand-navy">
        <input
          type="checkbox"
          checked={promoForm.isPublished}
          onChange={(event) =>
            onPromoChange("isPublished", event.target.checked)
          }
        />
        Tampilkan di website
      </label>
    </div>
  );
}
