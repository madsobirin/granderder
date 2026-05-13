import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin";
import { saveImageFile } from "@/lib/uploads";

export async function POST(request) {
  const { unauthorized } = await requireAdmin();
  if (unauthorized) return unauthorized;

  try {
    const formData = await request.formData();
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

    return NextResponse.json({
      success: true,
      message: "Gambar berhasil diunggah",
      imageUrl,
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
