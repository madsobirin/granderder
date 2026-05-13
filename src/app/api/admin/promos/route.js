import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin";
import prisma from "@/lib/prisma";

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

  const promos = await prisma.promo.findMany({
    orderBy: [{ displayOrder: "asc" }, { createdAt: "desc" }],
  });

  return NextResponse.json({ success: true, promos });
}

export async function POST(request) {
  const { unauthorized } = await requireAdmin();
  if (unauthorized) return unauthorized;

  try {
    const body = await request.json();

    const promo = await prisma.promo.create({
      data: {
        category: body.category,
        title: body.title,
        description: body.description,
        imageUrl: body.imageUrl,
        priceLabel: body.priceLabel || null,
        buildingSize: body.buildingSize || null,
        landSize: body.landSize || null,
        bedrooms: parseNullableInteger(body.bedrooms),
        bathrooms: parseNullableInteger(body.bathrooms),
        businessLabel: body.businessLabel || null,
        isPublished: body.isPublished ?? true,
        displayOrder: parseNullableInteger(body.displayOrder) ?? 0,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Promo berhasil ditambahkan",
      promo,
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
