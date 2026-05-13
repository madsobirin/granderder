function sanitizeImageUrl(url, defaultUrl) {
  if (!url) return defaultUrl;
  let cleanUrl = url.trim();
  // hapus prefix public/ atau public\ jika ada
  if (cleanUrl.startsWith("public/") || cleanUrl.startsWith("public\\")) {
    cleanUrl = cleanUrl.substring(6);
  }
  // pastikan ada leading slash kalau bukan http
  if (!cleanUrl.startsWith("/") && !cleanUrl.startsWith("http")) {
    cleanUrl = "/" + cleanUrl;
  }
  return cleanUrl;
}

export function normalizePromo(promo, index = 0) {
  return {
    id: promo.id,
    category: promo.category || "Promo Unit",
    title: promo.title || "Unit Baru",
    description: promo.description || "",
    imageUrl: sanitizeImageUrl(promo.imageUrl, ""),
    priceLabel: promo.priceLabel || "",
    buildingSize: promo.buildingSize || "",
    landSize: promo.landSize || "",
    bedrooms: promo.bedrooms ?? null,
    bathrooms: promo.bathrooms ?? null,
    businessLabel: promo.businessLabel || "",
    isPublished: promo.isPublished ?? true,
    displayOrder: promo.displayOrder ?? index,
  };
}

export function normalizeGalleryImage(image, index = 0) {
  return {
    id: image.id,
    title: image.title || `Galeri ${index + 1}`,
    imageUrl: sanitizeImageUrl(image.imageUrl, ""),
    isPublished: image.isPublished ?? true,
    displayOrder: image.displayOrder ?? index,
  };
}
