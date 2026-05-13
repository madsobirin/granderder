import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import {
  defaultGalleryImages,
  defaultPromos,
  normalizeGalleryImage,
  normalizePromo,
} from "@/lib/default-content";

const dataDirectory = path.join(process.cwd(), "src", "data");
const dataFilePath = path.join(dataDirectory, "site-content.json");

async function ensureDataFile() {
  await mkdir(dataDirectory, { recursive: true });

  try {
    await readFile(dataFilePath, "utf8");
  } catch {
    await writeFile(
      dataFilePath,
      JSON.stringify({ promos: [], galleryImages: [] }, null, 2),
      "utf8",
    );
  }
}

export async function readContentStore() {
  await ensureDataFile();
  const content = await readFile(dataFilePath, "utf8");
  const parsedContent = JSON.parse(content);

  return {
    promos: Array.isArray(parsedContent.promos) ? parsedContent.promos : [],
    galleryImages: Array.isArray(parsedContent.galleryImages)
      ? parsedContent.galleryImages
      : [],
  };
}

export async function writeContentStore(content) {
  await ensureDataFile();
  await writeFile(dataFilePath, JSON.stringify(content, null, 2), "utf8");
}

export async function getStoredSiteContent() {
  const content = await readContentStore();

  return {
    promos: content.promos.length
      ? content.promos.map((promo, index) => normalizePromo(promo, index))
      : defaultPromos,
    galleryImages: content.galleryImages.length
      ? content.galleryImages.map((image, index) => normalizeGalleryImage(image, index))
      : defaultGalleryImages,
  };
}
