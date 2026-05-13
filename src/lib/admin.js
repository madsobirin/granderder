import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";

export async function getSessionUser() {
  const token = (await cookies()).get("token")?.value;

  if (!token) {
    return null;
  }

  return verifyToken(token);
}

export async function requireAdmin() {
  const user = await getSessionUser();

  if (!user) {
    return {
      user: null,
      unauthorized: NextResponse.json(
        {
          success: false,
          message: "Sesi admin tidak valid. Silakan login lagi.",
        },
        { status: 401 },
      ),
    };
  }

  return { user, unauthorized: null };
}
