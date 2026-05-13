import prisma from "@/lib/prisma";
import { normalizeGalleryImage, normalizePromo } from "@/lib/default-content";

export async function getSiteContent() {
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
    promos: promos.map((promo, index) => normalizePromo(promo, index)),
    galleryImages: galleryImages.map((image, index) =>
      normalizeGalleryImage(image, index),
    ),
  };
}
