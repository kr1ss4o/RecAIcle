import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        
        const cookieStore = await cookies();
        const token = cookieStore.get("auth_token")?.value;

        if (!token) {
            return NextResponse.json(
                { message: "Not authenticated." },
                { status: 401 }
            );
        }

        const authSecret = process.env.AUTH_SECRET;

        if (!authSecret) {
            return NextResponse.json(
                { message: "Server configuration error." },
                { status: 500 }
            );
        }

        const secret = new TextEncoder().encode(authSecret);

        let payload;

        try {
            const result = await jwtVerify(token, secret);
            payload = result.payload;
        } catch {
            return NextResponse.json(
                { message: "Invalid or expired session." },
                { status: 401 }
            );
        }

        const userId = payload.userId;

        if (typeof userId !== "string") {
            return NextResponse.json(
                { message: "Invalid session." },
                { status: 401 }
            );
        }

        const user = await prisma.user.findUnique({
            where: {
                id: userId,
            },
            select: {
                id: true,
                name: true,
                email: true,
                createdAt: true,
            },
        });

        if (!user) {
            return NextResponse.json(
                { message: "User not found." },
                { status: 401 }
            );
        }

        return NextResponse.json(
            {
                user,
            },
            { status: 200 }
        );

    } catch (error) {
        console.error("Account error:", error);

        return NextResponse.json(
            { message: "Something went wrong." },
            { status: 500 }
        );
    }
}