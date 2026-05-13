"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  ArrowUpRight,
  Bath,
  BadgePercent,
  BedDouble,
  Building2,
  ImagePlus,
  LandPlot,
  LayoutGrid,
  LogOut,
  PencilLine,
  Plus,
  Save,
  Trash2,
  UploadCloud,
} from "lucide-react";

const emptyPromoForm = {
  category: "",
  title: "",
  description: "",
  imageUrl: "",
  priceLabel: "",
  buildingSize: "",
  landSize: "",
  bedrooms: "",
  bathrooms: "",
  businessLabel: "",
  displayOrder: 0,
  isPublished: true,
};

const emptyGalleryForm = {
  title: "",
  displayOrder: 0,
  isPublished: true,
  image: null,
};

export default function DashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [savingPromo, setSavingPromo] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadingPromoImage, setUploadingPromoImage] = useState(false);
  const [promos, setPromos] = useState([]);
  const [galleryImages, setGalleryImages] = useState([]);
  const [promoForm, setPromoForm] = useState(emptyPromoForm);
  const [galleryForm, setGalleryForm] = useState(emptyGalleryForm);
  const [editingPromoId, setEditingPromoId] = useState(null);
  const [statusMessage, setStatusMessage] = useState("");
  const [promoDropActive, setPromoDropActive] = useState(false);
  const [promoImageFileName, setPromoImageFileName] = useState("");

  const promoPreviewStats = useMemo(
    () =>
      [
        {
          label: "Luas Bangunan",
          value: promoForm.buildingSize,
          icon: Building2,
        },
        {
          label: "Luas Tanah",
          value: promoForm.landSize,
          icon: LandPlot,
        },
        {
          label: "Kamar Tidur",
          value: promoForm.bedrooms,
          icon: BedDouble,
        },
        {
          label: "Kamar Mandi",
          value: promoForm.bathrooms,
          icon: Bath,
        },
      ].filter((item) => item.value !== null && item.value !== undefined && item.value !== ""),
    [promoForm.bathrooms, promoForm.bedrooms, promoForm.buildingSize, promoForm.landSize],
  );

  const stats = useMemo(
    () => [
      { label: "Total Promo", value: promos.length },
      { label: "Galeri Aktif", value: galleryImages.length },
      {
        label: "Terbit",
        value: promos.filter((item) => item.isPublished).length,
      },
    ],
    [galleryImages.length, promos],
  );

  const loadDashboardData = useCallback(async () => {
    setLoading(true);

    try {
      const [promoResponse, galleryResponse] = await Promise.all([
        fetch("/api/admin/promos", { cache: "no-store" }),
        fetch("/api/admin/gallery", { cache: "no-store" }),
      ]);

      if (promoResponse.status === 401 || galleryResponse.status === 401) {
        router.push("/login");
        return;
      }

      const promoData = await promoResponse.json();
      const galleryData = await galleryResponse.json();

      if (promoData.success) {
        setPromos(promoData.promos);
      }

      if (galleryData.success) {
        setGalleryImages(galleryData.galleryImages);
      }
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      void loadDashboardData();
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [loadDashboardData]);

  const handleLogout = async () => {
    await fetch("/api/logout", {
      method: "POST",
    });

    router.push("/login");
  };

  const handlePromoSubmit = async (event) => {
    event.preventDefault();

    if (!promoForm.imageUrl) {
      setStatusMessage("Upload gambar promo dulu sebelum menyimpan.");
      return;
    }

    setSavingPromo(true);

    const endpoint = editingPromoId
      ? `/api/admin/promos/${editingPromoId}`
      : "/api/admin/promos";
    const method = editingPromoId ? "PUT" : "POST";

    const response = await fetch(endpoint, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(promoForm),
    });

    const data = await response.json();

    if (data.success) {
      setStatusMessage(data.message);
      setPromoForm(emptyPromoForm);
      setPromoImageFileName("");
      setEditingPromoId(null);
      await loadDashboardData();
    } else {
      setStatusMessage(data.message || "Gagal menyimpan promo.");
    }

    setSavingPromo(false);
  };

  const handleEditPromo = (promo) => {
    setEditingPromoId(promo.id);
    setPromoForm({
      category: promo.category || "",
      title: promo.title || "",
      description: promo.description || "",
      imageUrl: promo.imageUrl || "",
      priceLabel: promo.priceLabel || "",
      buildingSize: promo.buildingSize || "",
      landSize: promo.landSize || "",
      bedrooms: promo.bedrooms ?? "",
      bathrooms: promo.bathrooms ?? "",
      businessLabel: promo.businessLabel || "",
      displayOrder: promo.displayOrder ?? 0,
      isPublished: promo.isPublished ?? true,
    });
    setPromoImageFileName("");
    setStatusMessage("Mode edit promo aktif.");
  };

  const handleDeletePromo = async (id) => {
    const response = await fetch(`/api/admin/promos/${id}`, { method: "DELETE" });
    const data = await response.json();
    setStatusMessage(data.message);
    if (data.success) {
      await loadDashboardData();
    }
  };

  const handleGallerySubmit = async (event) => {
    event.preventDefault();
    setUploadingImage(true);

    const formData = new FormData();
    formData.append("title", galleryForm.title);
    formData.append("displayOrder", String(galleryForm.displayOrder));
    formData.append("isPublished", String(galleryForm.isPublished));

    if (galleryForm.image) {
      formData.append("image", galleryForm.image);
    }

    const response = await fetch("/api/admin/gallery", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    setStatusMessage(data.message);

    if (data.success) {
      setGalleryForm(emptyGalleryForm);
      const fileInput = document.getElementById("gallery-image-input");
      if (fileInput) {
        fileInput.value = "";
      }
      await loadDashboardData();
    }

    setUploadingImage(false);
  };

  const handlePromoImageUpload = async (file) => {
    if (!file) {
      setStatusMessage("Pilih file gambar promo dulu.");
      return;
    }

    if (!file.type.startsWith("image/")) {
      setStatusMessage("File promo harus berupa gambar.");
      return;
    }

    setUploadingPromoImage(true);
    setPromoImageFileName(file.name);

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch("/api/admin/uploads", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();

      if (data.success) {
        setPromoForm((current) => ({
          ...current,
          imageUrl: data.imageUrl,
        }));
        setStatusMessage("Foto promo berhasil diunggah.");
      } else {
        setStatusMessage(data.message || "Upload gambar promo gagal.");
      }
    } catch {
      setStatusMessage("Upload gambar promo gagal.");
    } finally {
      const input = document.getElementById("promo-image-input");
      if (input) {
        input.value = "";
      }
      setUploadingPromoImage(false);
    }
  };

  const handleDeleteImage = async (id) => {
    const response = await fetch(`/api/admin/gallery/${id}`, { method: "DELETE" });
    const data = await response.json();
    setStatusMessage(data.message);
    if (data.success) {
      await loadDashboardData();
    }
  };

  return (
    <div className="min-h-screen bg-brand-cream">
      <div className="border-b border-brand-dark/5 bg-white/85 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5 sm:px-6 lg:px-8">
          <div>
            <span className="block text-xs font-semibold uppercase tracking-[0.35em] text-brand-gold">
              Grand Ender Residence
            </span>
            <h1 className="mt-2 text-3xl text-brand-navy">Dashboard Admin</h1>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.push("/")}
              className="inline-flex items-center gap-2 rounded-full border border-brand-navy/10 bg-white px-4 py-2 text-sm font-medium text-brand-navy transition hover:border-brand-gold hover:text-brand-gold"
            >
              <ArrowUpRight className="h-4 w-4" />
              Lihat Website
            </button>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 rounded-full bg-brand-navy px-4 py-2 text-sm font-medium text-white transition hover:bg-brand-navy/90"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 grid gap-4 md:grid-cols-3">
          {stats.map((item) => (
            <div
              key={item.label}
              className="rounded-3xl border border-white/70 bg-white p-6 shadow-xl shadow-brand-navy/5"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-gold">
                {item.label}
              </p>
              <p className="mt-3 text-4xl text-brand-navy">{item.value}</p>
            </div>
          ))}
        </div>

        {statusMessage ? (
          <div className="mb-6 rounded-2xl border border-brand-gold/20 bg-brand-gold/10 px-4 py-3 text-sm text-brand-navy">
            {statusMessage}
          </div>
        ) : null}

        <div className="grid gap-8 xl:grid-cols-[1.05fr_0.95fr]">
          <section className="space-y-8">
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

              <form onSubmit={handlePromoSubmit} className="grid gap-4 md:grid-cols-2">
                <input
                  value={promoForm.category}
                  onChange={(event) =>
                    setPromoForm((current) => ({ ...current, category: event.target.value }))
                  }
                  placeholder="Kategori, contoh: Rumah Subsidi"
                  className="rounded-2xl border border-brand-navy/10 bg-brand-cream/40 px-4 py-3 outline-none focus:border-brand-gold"
                  required
                />
                <input
                  value={promoForm.title}
                  onChange={(event) =>
                    setPromoForm((current) => ({ ...current, title: event.target.value }))
                  }
                  placeholder="Judul promo"
                  className="rounded-2xl border border-brand-navy/10 bg-brand-cream/40 px-4 py-3 outline-none focus:border-brand-gold"
                  required
                />
                <textarea
                  value={promoForm.description}
                  onChange={(event) =>
                    setPromoForm((current) => ({ ...current, description: event.target.value }))
                  }
                  placeholder="Deskripsi promo rumah"
                  className="min-h-32 rounded-2xl border border-brand-navy/10 bg-brand-cream/40 px-4 py-3 outline-none focus:border-brand-gold md:col-span-2"
                  required
                />
                <label
                  htmlFor="promo-image-input"
                  onDragOver={(event) => {
                    event.preventDefault();
                    setPromoDropActive(true);
                  }}
                  onDragLeave={() => setPromoDropActive(false)}
                  onDrop={(event) => {
                    event.preventDefault();
                    setPromoDropActive(false);
                    void handlePromoImageUpload(event.dataTransfer.files?.[0]);
                  }}
                  className={`cursor-pointer rounded-2xl border border-dashed px-4 py-5 text-sm transition md:col-span-2 ${
                    promoDropActive
                      ? "border-brand-gold bg-brand-gold/10"
                      : "border-brand-gold/40 bg-brand-cream/30 hover:border-brand-gold"
                  }`}
                >
                  <input
                    id="promo-image-input"
                    type="file"
                    accept="image/*"
                    onChange={(event) => {
                      void handlePromoImageUpload(event.target.files?.[0]);
                    }}
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
                        {uploadingPromoImage
                          ? "Mengunggah gambar..."
                          : "Drag & drop gambar promo atau klik untuk upload"}
                      </span>
                      <span className="mt-1 block text-brand-navy/60">
                        {promoImageFileName || promoForm.imageUrl
                          ? promoImageFileName || "Gambar promo sudah siap dipakai."
                          : "Gambar langsung tampil sebagai preview setelah upload berhasil."}
                      </span>
                    </div>
                  </div>
                </label>
                <input
                  value={promoForm.priceLabel}
                  onChange={(event) =>
                    setPromoForm((current) => ({ ...current, priceLabel: event.target.value }))
                  }
                  placeholder="Label promo, contoh: DP ringan"
                  className="rounded-2xl border border-brand-navy/10 bg-brand-cream/40 px-4 py-3 outline-none focus:border-brand-gold"
                />
                <input
                  value={promoForm.businessLabel}
                  onChange={(event) =>
                    setPromoForm((current) => ({ ...current, businessLabel: event.target.value }))
                  }
                  placeholder="Nilai tambah, contoh: Strategis"
                  className="rounded-2xl border border-brand-navy/10 bg-brand-cream/40 px-4 py-3 outline-none focus:border-brand-gold"
                />
                <input
                  value={promoForm.buildingSize}
                  onChange={(event) =>
                    setPromoForm((current) => ({ ...current, buildingSize: event.target.value }))
                  }
                  placeholder="Luas bangunan"
                  className="rounded-2xl border border-brand-navy/10 bg-brand-cream/40 px-4 py-3 outline-none focus:border-brand-gold"
                />
                <input
                  value={promoForm.landSize}
                  onChange={(event) =>
                    setPromoForm((current) => ({ ...current, landSize: event.target.value }))
                  }
                  placeholder="Luas tanah"
                  className="rounded-2xl border border-brand-navy/10 bg-brand-cream/40 px-4 py-3 outline-none focus:border-brand-gold"
                />
                <input
                  value={promoForm.bedrooms}
                  onChange={(event) =>
                    setPromoForm((current) => ({ ...current, bedrooms: event.target.value }))
                  }
                  placeholder="Jumlah kamar tidur"
                  className="rounded-2xl border border-brand-navy/10 bg-brand-cream/40 px-4 py-3 outline-none focus:border-brand-gold"
                />
                <input
                  value={promoForm.bathrooms}
                  onChange={(event) =>
                    setPromoForm((current) => ({ ...current, bathrooms: event.target.value }))
                  }
                  placeholder="Jumlah kamar mandi"
                  className="rounded-2xl border border-brand-navy/10 bg-brand-cream/40 px-4 py-3 outline-none focus:border-brand-gold"
                />
                <input
                  type="number"
                  value={promoForm.displayOrder}
                  onChange={(event) =>
                    setPromoForm((current) => ({ ...current, displayOrder: event.target.value }))
                  }
                  placeholder="Urutan tampil"
                  className="rounded-2xl border border-brand-navy/10 bg-brand-cream/40 px-4 py-3 outline-none focus:border-brand-gold"
                />
                <label className="flex items-center gap-3 rounded-2xl border border-brand-navy/10 bg-brand-cream/40 px-4 py-3 text-sm text-brand-navy">
                  <input
                    type="checkbox"
                    checked={promoForm.isPublished}
                    onChange={(event) =>
                      setPromoForm((current) => ({
                        ...current,
                        isPublished: event.target.checked,
                      }))
                    }
                  />
                  Tampilkan di website
                </label>

                <div className="flex flex-wrap gap-3 md:col-span-2">
                  <button
                    type="submit"
                    disabled={savingPromo}
                    className="inline-flex items-center gap-2 rounded-full bg-brand-navy px-5 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-brand-navy/92 disabled:opacity-70"
                  >
                    {editingPromoId ? <Save className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                    {savingPromo ? "Menyimpan..." : editingPromoId ? "Update Promo" : "Tambah Promo"}
                  </button>
                  {editingPromoId ? (
                    <button
                      type="button"
                      onClick={() => {
                        setEditingPromoId(null);
                        setPromoForm(emptyPromoForm);
                        setPromoImageFileName("");
                        setStatusMessage("Mode tambah promo aktif.");
                      }}
                      className="rounded-full border border-brand-navy/10 px-5 py-3 text-sm font-medium text-brand-navy"
                    >
                      Batal Edit
                    </button>
                  ) : null}
                </div>

                <div className="overflow-hidden rounded-3xl border border-brand-dark/5 bg-white shadow-lg shadow-brand-navy/5 md:col-span-2">
                  <div className="relative aspect-4/3 bg-brand-cream">
                    {promoForm.imageUrl ? (
                      <Image
                        src={promoForm.imageUrl}
                        alt={promoForm.title || "Preview promo rumah"}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-sm text-brand-navy/50">
                        Preview gambar promo
                      </div>
                    )}
                    <div className="absolute inset-0 bg-linear-to-t from-brand-navy/25 via-transparent to-transparent" />
                  </div>
                  <div className="p-5">
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
                    <h3 className="text-2xl text-brand-navy">
                      {promoForm.title || "Judul promo rumah"}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-brand-navy/65">
                      {promoForm.description || "Deskripsi promo akan tampil di sini."}
                    </p>
                    {promoPreviewStats.length || promoForm.businessLabel ? (
                      <div className="mt-4 grid gap-3 sm:grid-cols-2">
                        {promoPreviewStats.map((item) => {
                          const Icon = item.icon;

                          return (
                            <div
                              key={item.label}
                              className="rounded-2xl border border-brand-dark/5 bg-brand-cream/60 p-3"
                            >
                              <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-full bg-white text-brand-gold">
                                <Icon className="h-4 w-4" />
                              </div>
                              <span className="block font-bold text-brand-navy">{item.value}</span>
                              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-navy/55">
                                {item.label}
                              </span>
                            </div>
                          );
                        })}
                        {promoForm.businessLabel ? (
                          <div className="rounded-2xl bg-brand-navy p-3 text-white">
                            <span className="block font-bold">{promoForm.businessLabel}</span>
                            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/70">
                              Nilai Tambah
                            </span>
                          </div>
                        ) : null}
                      </div>
                    ) : null}
                  </div>
                </div>
              </form>
            </div>

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

              <form onSubmit={handleGallerySubmit} className="grid gap-4 md:grid-cols-2">
                <input
                  value={galleryForm.title}
                  onChange={(event) =>
                    setGalleryForm((current) => ({ ...current, title: event.target.value }))
                  }
                  placeholder="Judul gambar"
                  className="rounded-2xl border border-brand-navy/10 bg-brand-cream/40 px-4 py-3 outline-none focus:border-brand-gold"
                  required
                />
                <input
                  type="number"
                  value={galleryForm.displayOrder}
                  onChange={(event) =>
                    setGalleryForm((current) => ({
                      ...current,
                      displayOrder: event.target.value,
                    }))
                  }
                  placeholder="Urutan tampil"
                  className="rounded-2xl border border-brand-navy/10 bg-brand-cream/40 px-4 py-3 outline-none focus:border-brand-gold"
                />
                <label className="md:col-span-2 rounded-2xl border border-dashed border-brand-gold/40 bg-brand-cream/30 px-4 py-5 text-sm text-brand-navy/70">
                  <span className="mb-2 block font-medium text-brand-navy">Pilih file gambar</span>
                  <input
                    id="gallery-image-input"
                    type="file"
                    accept="image/*"
                    onChange={(event) =>
                      setGalleryForm((current) => ({
                        ...current,
                        image: event.target.files?.[0] || null,
                      }))
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
                      setGalleryForm((current) => ({
                        ...current,
                        isPublished: event.target.checked,
                      }))
                    }
                  />
                  Tampilkan di halaman galeri
                </label>
                <button
                  type="submit"
                  disabled={uploadingImage}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-gold px-5 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-brand-gold/90 disabled:opacity-70"
                >
                  <ImagePlus className="h-4 w-4" />
                  {uploadingImage ? "Mengunggah..." : "Upload Gambar"}
                </button>
              </form>
            </div>
          </section>

          <section className="space-y-8">
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
                              <h3 className="mt-2 text-xl text-brand-navy">{promo.title}</h3>
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
                              onClick={() => handleEditPromo(promo)}
                              className="inline-flex items-center gap-2 rounded-full border border-brand-navy/10 bg-white px-4 py-2 text-sm font-medium text-brand-navy"
                            >
                              <PencilLine className="h-4 w-4" />
                              Edit
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeletePromo(promo.id)}
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
                  <p className="text-sm text-brand-navy/60">Belum ada promo tambahan.</p>
                )}
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/80 bg-white p-6 shadow-xl shadow-brand-navy/5 sm:p-8">
              <h2 className="mb-6 text-2xl text-brand-navy">Galeri Website</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {loading ? (
                  <p className="text-sm text-brand-navy/60">Memuat gambar galeri...</p>
                ) : galleryImages.length ? (
                  galleryImages.map((image) => (
                    <div
                      key={image.id}
                      className="overflow-hidden rounded-3xl border border-brand-dark/5 bg-brand-cream/40"
                    >
                      <div className="relative aspect-square">
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
                          onClick={() => handleDeleteImage(image.id)}
                          className="mt-4 inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-4 py-2 text-sm font-medium text-red-600"
                        >
                          <Trash2 className="h-4 w-4" />
                          Hapus Gambar
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-brand-navy/60">Belum ada gambar tambahan.</p>
                )}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
