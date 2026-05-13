export const defaultPromos = [
  {
    id: "default-rumah",
    category: "Rumah Subsidi",
    title: "Denah Type 36/60",
    description:
      "Desain tata ruang yang efisien dan nyaman, memisahkan area istirahat dan area berkumpul keluarga secara cerdas. Dilengkapi lahan sisa untuk taman atau pengembangan.",
    imageUrl: "/images/6Home.jpeg",
    priceLabel: "Promo subsidi siap huni",
    buildingSize: "36 m²",
    landSize: "60 m²",
    bedrooms: 2,
    bathrooms: 1,
    businessLabel: "",
    isPublished: true,
    displayOrder: 0,
  },
  {
    id: "default-ruko",
    category: "Peluang Bisnis",
    title: "Unit Ruko Type 30",
    description:
      "Solusi cerdas untuk tempat usaha Anda. Berada tepat di titik terdepan perumahan untuk memastikan trafik tinggi dan eksposur maksimal bagi bisnis Anda.",
    imageUrl: "/images/18Home.jpeg",
    priceLabel: "Cocok untuk usaha baru",
    buildingSize: "30 m²",
    landSize: "",
    bedrooms: null,
    bathrooms: 1,
    businessLabel: "Strategis",
    isPublished: true,
    displayOrder: 1,
  },
];

export const defaultGalleryImages = [
  "/images/5Home.jpeg",
  "/images/2Home.jpeg",
  "/images/4Home.jpeg",
  "/images/21Home.jpeg",
  "/images/10Home.jpeg",
  ...Array.from({ length: 29 }, (_, index) => `/images/${index + 11}Home.jpeg`),
].map((imageUrl, index) => ({
  id: `gallery-${index}`,
  title: `Galeri ${index + 1}`,
  imageUrl,
  isPublished: true,
  displayOrder: index,
}));

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
    imageUrl: sanitizeImageUrl(promo.imageUrl, "/images/6Home.jpeg"),
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
    imageUrl: sanitizeImageUrl(image.imageUrl, "/images/5Home.jpeg"),
    isPublished: image.isPublished ?? true,
    displayOrder: image.displayOrder ?? index,
  };
}
