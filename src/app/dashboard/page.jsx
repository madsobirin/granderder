"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Bath, BedDouble, Building2, LandPlot } from "lucide-react";
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

  return (
    <div className="min-h-screen bg-brand-cream">
      <DashboardHeader />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <DashboardStats stats={stats} />
        <StatusMessage message={statusMessage} />

        <div className="grid gap-8 xl:grid-cols-[1.05fr_0.95fr]">
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

          <PromoList
            promos={promos}
            loading={loading}
            onEdit={handleEditPromo}
            onDelete={handleDeletePromo}
          />

          <GalleryList
            galleryImages={galleryImages}
            loading={loading}
            onDelete={handleDeleteImage}
          />
        </div>
      </div>
    </div>
  );
}
