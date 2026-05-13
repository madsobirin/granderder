import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin";
import { prisma } from "@/lib/prisma";

export async function DELETE(_request, { params }) {
  const { unauthorized } = await requireAdmin();
  if (unauthorized) return unauthorized;

  try {
    const imageId = Number((await params).id);

    await prisma.galleryImage.delete({
      where: { id: imageId },
    });

    return NextResponse.json({
      success: true,
      message: "Gambar berhasil dihapus",
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
