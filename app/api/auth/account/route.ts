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

export async function PATCH(request: Request) {
    try {
        // Get the login cookie
        const cookieStore = await cookies();
        const token = cookieStore.get("auth_token")?.value;

        if (!token) {
            return NextResponse.json(
                { message: "Not authenticated." },
                { status: 401 }
            );
        }

        // Get the same secret used when creating the JWT
        const authSecret = process.env.AUTH_SECRET;

        if (!authSecret) {
            return NextResponse.json(
                { message: "Server configuration error." },
                { status: 500 }
            );
        }

        const secret = new TextEncoder().encode(authSecret);

        // Verify the JWT
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

        // Get logged-in user's ID from the JWT
        const userId = payload.userId;

        if (typeof userId !== "string") {
            return NextResponse.json(
                { message: "Invalid session." },
                { status: 401 }
            );
        }

        // Get the new account information from the frontend
        const body = await request.json();

        const updateData: {
            name?: string;
            email?: string;
        } = {};

        if (body.name !== undefined) {
            if (!body.name.trim()) {
                return NextResponse.json(
                    { message: "Name cannot be empty." },
                    { status: 400 }
                );
            }

            updateData.name = body.name.trim();
        }

        if (body.email !== undefined) {
            if (!body.email.trim()) {
                return NextResponse.json(
                    { message: "Email cannot be empty." },
                    { status: 400 }
                );
            }

            // Check whether another account already uses this email
            const existingUser = await prisma.user.findUnique({
                where: {
                    email: body.email.trim()
                }
            });

            if (existingUser && existingUser.id !== userId) {
                return NextResponse.json(
                    { message: "A user with this email already exists." },
                    { status: 409 }
                );
            }

            updateData.email = body.email.trim();
        }

        // Update the logged-in user
        const updatedUser = await prisma.user.update({
            where: {
                id: userId
            },
            data: updateData,
            select: {
                id: true,
                name: true,
                email: true
            }
        });

        return NextResponse.json(
            {
                message: "Account updated successfully.",
                user: updatedUser
            },
            { status: 200 }
        );

    } catch (error) {
        console.error("Account update error:", error);

        return NextResponse.json(
            { message: "Something went wrong." },
            { status: 500 }
        );
    }
}