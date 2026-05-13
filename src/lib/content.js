import prisma from "@/lib/prisma";
import {
  defaultGalleryImages,
  defaultPromos,
  normalizeGalleryImage,
  normalizePromo,
} from "@/lib/default-content";

export async function getSiteContent() {
  try {
    const [promos, galleryImages] = await Promise.all([
      prisma.promo.findMany({
        where: { isPublished: true },
        orderBy: [{ displayOrder: "asc" }, { createdAt: "desc" }],
      }),
      prisma.galleryImage.findMany({
        where: { isPublished: true },
        orderBy: [{ displayOrder: "asc" }, { createdAt: "desc" }],
      }),
    ]);

    return {
      promos: promos.length
        ? promos.map((promo, index) => normalizePromo(promo, index))
        : defaultPromos,
      galleryImages: galleryImages.length
        ? galleryImages.map((image, index) =>
            normalizeGalleryImage(image, index),
          )
        : defaultGalleryImages,
    };
  } catch {
    return {
      promos: defaultPromos,
      galleryImages: defaultGalleryImages,
    };
  }
}
