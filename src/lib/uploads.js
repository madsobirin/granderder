import { mkdir, writeFile } from "fs/promises";
import path from "path";

const uploadDirectory = path.join(process.cwd(), "public", "uploads");

function sanitizeFileName(value) {
  return value.toLowerCase().replace(/[^a-z0-9.-]+/g, "-");
}

export async function saveImageFile(file) {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const extension = path.extname(file.name || "") || ".jpg";
  const baseName = sanitizeFileName(
    path.basename(file.name || "image", extension),
  );
  const fileName = `${Date.now()}-${baseName}${extension}`;

  await mkdir(uploadDirectory, { recursive: true });
  await writeFile(path.join(uploadDirectory, fileName), buffer);

  return `/uploads/${fileName}`;
}
