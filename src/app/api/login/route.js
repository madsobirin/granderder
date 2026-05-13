import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { generateToken } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const body = await req.json();

        const { email, password } = body;

        const user = await prisma.user.findUnique({
            where: {
                email,
            },
        });

        if (!user) {
            return NextResponse.json({
                success: false,
                message: "User tidak ditemukan",
            });
        }

        const isPasswordValid = await bcrypt.compare(
            password,
            user.password
        );

        if (!isPasswordValid) {
            return NextResponse.json({
                success: false,
                message: "Password salah",
            });
        }

        const token = generateToken({
            id: user.id,
            email: user.email,
        });

        const response = NextResponse.json({
            success: true,
            message: "Login berhasil",
        });

        response.cookies.set({
            name: "token",
            value: token,
            httpOnly: true,
            path: "/",
            maxAge: 60 * 60 * 24,
            secure: false,
        });

        return response;
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: error.message,
        });
    }
}