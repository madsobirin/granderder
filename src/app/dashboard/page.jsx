"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Bath,
  BedDouble,
  Building2,
  FileImage,
  Images,
  LandPlot,
  LayoutDashboard,
  MessageSquareQuote,
  Sparkles,
} from "lucide-react";
import DashboardHeader from "@/components/admin/DashboardHeader";
import DashboardStats from "@/components/admin/DashboardStats";
import StatusMessage from "@/components/admin/StatusMessage";
import PromoForm from "@/components/admin/PromoForm";
import PromoList from "@/components/admin/PromoList";
import GalleryUploadForm from "@/components/admin/GalleryUploadForm";
import GalleryList from "@/components/admin/GalleryList";

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
      ].filter(
        (item) =>
          item.value !== null && item.value !== undefined && item.value !== "",
      ),
    [
      promoForm.bathrooms,
      promoForm.bedrooms,
      promoForm.buildingSize,
      promoForm.landSize,
    ],
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

  const sidebarItems = useMemo(
    () => [
      {
        id: "ringkasan",
        label: "Ringkasan",
        caption: "Statistik dan overview",
        icon: LayoutDashboard,
      },
      {
        id: "promo-editor",
        label: "Promo Rumah",
        caption: "Kelola kartu promosi",
        icon: Sparkles,
      },
      {
        id: "gallery-editor",
        label: "Galeri",
        caption: "Upload foto terbaru",
        icon: Images,
      },
      {
        id: "promo-list",
        label: "Daftar Promo",
        caption: "Edit konten yang tayang",
        icon: MessageSquareQuote,
      },
      {
        id: "gallery-list",
        label: "Daftar Galeri",
        caption: "Lihat semua gambar",
        icon: FileImage,
      },
    ],
    [],
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

  const handlePromoChange = (key, value) => {
    setPromoForm((current) => ({
      ...current,
      [key]: value,
    }));
  };

  const handleGalleryChange = (key, value) => {
    setGalleryForm((current) => ({
      ...current,
      [key]: value,
    }));
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
    const response = await fetch(`/api/admin/promos/${id}`, {
      method: "DELETE",
    });
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
    const response = await fetch(`/api/admin/gallery/${id}`, {
      method: "DELETE",
    });
    const data = await response.json();
    setStatusMessage(data.message);
    if (data.success) {
      await loadDashboardData();
    }
  };

  const handleCancelEdit = () => {
    setEditingPromoId(null);
    setPromoForm(emptyPromoForm);
    setPromoImageFileName("");
    setStatusMessage("Mode tambah promo aktif.");
  };

  const handleScrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);

    if (!section) return;

    section.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(197,163,104,0.12),transparent_22%),linear-gradient(180deg,#f8f5ef_0%,#fbfbf9_48%,#f6f0e7_100%)]">
      <div className="mx-auto max-w-[1500px] px-4 py-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 xl:grid-cols-[280px_minmax(0,1fr)]">
          <aside className="xl:sticky xl:top-4 xl:self-start">
            <div className="overflow-hidden rounded-[2rem] border border-white/70 bg-brand-navy text-white shadow-[0_24px_80px_rgba(15,23,42,0.22)]">
              <div className="border-b border-white/10 px-6 py-7">
                <span className="block text-[11px] font-semibold uppercase tracking-[0.35em] text-brand-gold/90">
                  Admin Workspace
                </span>
                <h2 className="mt-3 text-3xl leading-tight">
                  Dashboard
                  <br />
                  Konten Web
                </h2>
                <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/65">
                  Fokus mengelola promo rumah dan materi visual dengan tampilan yang
                  lebih rapi dan terarah.
                </p>
              </div>

              <div className="space-y-2 px-4 py-5">
                {sidebarItems.map((item) => {
                  const Icon = item.icon;

                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleScrollToSection(item.id)}
                      className="flex w-full items-start gap-3 rounded-2xl px-4 py-3 text-left transition hover:bg-white/8"
                    >
                      <div className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-brand-gold">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold tracking-[0.08em] text-white">
                          {item.label}
                        </div>
                        <div className="mt-1 text-xs leading-relaxed text-white/55">
                          {item.caption}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="border-t border-white/10 px-6 py-6">
                <div className="rounded-[1.6rem] bg-white/8 p-5">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-brand-gold/90">
                    Visual Focus
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-white/70">
                    Sidebar ini menjaga dashboard terasa lebih terstruktur, dengan
                    area kerja utama tetap lega untuk form dan preview.
                  </p>
                </div>
              </div>
            </div>
          </aside>

          <main className="space-y-6">
            <div className="overflow-hidden rounded-[2rem] border border-white/75 bg-white/75 shadow-[0_18px_60px_rgba(15,23,42,0.08)] backdrop-blur">
              <DashboardHeader />
              <div className="grid gap-6 px-5 py-6 sm:px-6 lg:grid-cols-[minmax(0,1.1fr)_340px] lg:px-8">
                <div>
                  <span className="inline-flex rounded-full bg-brand-gold/12 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.32em] text-brand-gold">
                    Admin Styling Refresh
                  </span>
                  <h2 className="mt-4 text-4xl leading-tight text-brand-navy">
                    Panel admin yang lebih editorial, lebih mudah dipindai, dan
                    lebih nyaman dipakai harian.
                  </h2>
                  <p className="mt-4 max-w-2xl text-sm leading-7 text-brand-navy/60">
                    Fokusnya sekarang ada pada pengalaman visual: navigasi kiri yang
                    jelas, blok kerja yang lebih terpisah, dan ritme layout yang
                    terasa lebih matang seperti produk internal yang premium.
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
                  <div className="rounded-[1.7rem] border border-brand-gold/15 bg-brand-gold/10 p-5">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-brand-gold">
                      Fokus Utama
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-brand-navy/70">
                      Promo rumah, upload galeri, dan daftar konten aktif.
                    </p>
                  </div>
                  <div className="rounded-[1.7rem] border border-brand-navy/8 bg-brand-navy p-5 text-white">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-brand-gold">
                      Nuansa
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-white/70">
                      Lebih tenang, elegan, dan konsisten dengan identitas landing
                      page.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <section id="ringkasan" className="space-y-6">
              <DashboardStats stats={stats} />
              <StatusMessage message={statusMessage} />
            </section>

            <div className="grid gap-8 2xl:grid-cols-[minmax(0,1.18fr)_minmax(360px,0.82fr)]">
              <section id="promo-editor">
                <PromoForm
                  promoForm={promoForm}
                  editingPromoId={editingPromoId}
                  onPromoChange={handlePromoChange}
                  onImageUpload={handlePromoImageUpload}
                  onDragOver={() => setPromoDropActive(true)}
                  onDragLeave={() => setPromoDropActive(false)}
                  onDrop={(e) => {
                    e.preventDefault();
                    setPromoDropActive(false);
                    void handlePromoImageUpload(e.dataTransfer.files?.[0]);
                  }}
                  onImageChange={(event) => {
                    void handlePromoImageUpload(event.target.files?.[0]);
                  }}
                  uploadingImage={uploadingPromoImage}
                  fileName={promoImageFileName}
                  previewStats={promoPreviewStats}
                  onSubmit={handlePromoSubmit}
                  saving={savingPromo}
                  onCancelEdit={handleCancelEdit}
                />
              </section>

              <section id="gallery-editor">
                <GalleryUploadForm
                  galleryForm={galleryForm}
                  onGalleryChange={handleGalleryChange}
                  onImageSelect={(image) =>
                    setGalleryForm((current) => ({
                      ...current,
                      image: image,
                    }))
                  }
                  uploading={uploadingImage}
                  onSubmit={handleGallerySubmit}
                />
              </section>
            </div>

            <div className="grid gap-8 2xl:grid-cols-[minmax(0,1.18fr)_minmax(360px,0.82fr)]">
              <section id="promo-list">
                <PromoList
                  promos={promos}
                  loading={loading}
                  onEdit={handleEditPromo}
                  onDelete={handleDeletePromo}
                />
              </section>

              <section id="gallery-list">
                <GalleryList
                  galleryImages={galleryImages}
                  loading={loading}
                  onDelete={handleDeleteImage}
                />
              </section>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
