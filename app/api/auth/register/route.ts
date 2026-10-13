import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
    try {
        const body = await request.json();

        const { name, email, password } = body;

        // Check the required fields
        if (!name || !email || !password) {
            return NextResponse.json(
                { message: "A user with this email already exists." },
                { status: 400 }
            )
        }

        // Hash password
        const passwordHash = await bcrypt.hash(password, 12);

        // Create the user
        const user = await prisma.user.create({
            data: {
                name,
                email,
                passwordHash
            }
        })

        // Success message
        return NextResponse.json(
            { message: "Account created succesfully." },
            { status: 201 }
        )

    } catch (error) {

        // Error output
        console.error("Register error:", error);

        return NextResponse.json(
            { message: "Something went wrong." },
            { status: 500 }
        )
    }
}