import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin";
import prisma from "@/lib/prisma";
import { saveImageFile } from "@/lib/uploads";

function parseNullableInteger(value) {
  if (value === null || value === undefined || value === "") {
    return null;
  }

  const parsed = Number(value);
  return Number.isNaN(parsed) ? null : parsed;
}

export async function GET() {
  const { unauthorized } = await requireAdmin();
  if (unauthorized) return unauthorized;

  const galleryImages = await prisma.galleryImage.findMany({
    orderBy: [{ displayOrder: "asc" }, { createdAt: "desc" }],
  });

  return NextResponse.json({ success: true, galleryImages });
}

export async function POST(request) {
  const { unauthorized } = await requireAdmin();
  if (unauthorized) return unauthorized;

  try {
    const formData = await request.formData();
    const title = formData.get("title")?.toString() || "Galeri Baru";
    const displayOrder = parseNullableInteger(formData.get("displayOrder"));
    const isPublished = formData.get("isPublished") === "true";
    const file = formData.get("image");

    if (!(file instanceof File) || !file.size) {
      return NextResponse.json(
        {
          success: false,
          message: "File gambar wajib diisi",
        },
        { status: 400 },
      );
    }

    const imageUrl = await saveImageFile(file);

    const galleryImage = await prisma.galleryImage.create({
      data: {
        title,
        imageUrl,
        displayOrder: displayOrder ?? 0,
        isPublished,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Gambar berhasil diunggah",
      galleryImage,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 },
    );
  }
}
