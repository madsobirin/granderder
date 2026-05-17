"use client";

import { LayoutGrid, Plus, Save } from "lucide-react";
import PromoFormFields from "./PromoFormFields";
import PromoPreview from "./PromoPreview";

export default function PromoForm({
  promoForm,
  editingPromoId,
  onPromoChange,
  onImageUpload,
  onDragOver,
  onDragLeave,
  onDrop,
  onImageChange,
  uploadingImage,
  fileName,
  previewStats,
  onSubmit,
  saving,
  onCancelEdit,
}) {
  return (
    <section>
      <div className="rounded-[2rem] border border-white/80 bg-white p-6 shadow-xl shadow-brand-navy/5 sm:p-8">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-gold/10 text-brand-gold">
            <LayoutGrid className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-2xl text-brand-navy">Kelola Promo Rumah</h2>
            <p className="text-sm text-brand-navy/60">
              Tambah atau ubah kartu promo yang tampil di halaman utama.
            </p>
          </div>
        </div>

        <form
          onSubmit={onSubmit}
          className="grid gap-6 2xl:grid-cols-[minmax(0,1fr)_380px] 2xl:items-start"
        >
          <div>
            <PromoFormFields
              promoForm={promoForm}
              onPromoChange={onPromoChange}
              uploadingImage={uploadingImage}
              fileName={fileName}
              onDragOver={onDragOver}
              onDragLeave={onDragLeave}
              onDrop={onDrop}
              onImageChange={onImageChange}
            />

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center gap-2 rounded-full bg-brand-navy px-5 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-brand-navy/92 disabled:opacity-70"
              >
                {editingPromoId ? (
                  <Save className="h-4 w-4" />
                ) : (
                  <Plus className="h-4 w-4" />
                )}
                {saving
                  ? "Menyimpan..."
                  : editingPromoId
                    ? "Update Promo"
                    : "Tambah Promo"}
              </button>
              {editingPromoId ? (
                <button
                  type="button"
                  onClick={onCancelEdit}
                  className="rounded-full border border-brand-navy/10 px-5 py-3 text-sm font-medium text-brand-navy"
                >
                  Batal Edit
                </button>
              ) : null}
            </div>
          </div>

          <PromoPreview promoForm={promoForm} previewStats={previewStats} />
        </form>
      </div>
    </section>
  );
}
