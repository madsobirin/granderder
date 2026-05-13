import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

function sanitizeFileName(value) {
  return value.toLowerCase().replace(/[^a-z0-9.-]+/g, "-");
}

export async function saveImageFile(file) {
  try {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const baseName = sanitizeFileName(file.name || `image-${Date.now()}`);

    // Upload ke Cloudinary
    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          public_id: `granderder/${Date.now()}-${baseName}`,
          folder: "granderder",
          resource_type: "auto",
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        },
      );

      uploadStream.end(buffer);
    });

    return result.secure_url;
  } catch (error) {
    throw new Error(`Gagal upload gambar ke Cloudinary: ${error.message}`);
  }
}
